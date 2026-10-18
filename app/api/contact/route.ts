import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

// Sends "Hire me" form submissions from your own Gmail account to your inbox.
// Needs GMAIL_APP_PASSWORD (Google Account → Security → 2-Step Verification → App passwords).
// GMAIL_USER defaults to the email in site.ts; CONTACT_TO defaults to GMAIL_USER.

export const runtime = "nodejs";

const MAX = { name: 100, email: 200, company: 120, budget: 60, message: 5000 };

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const field = (k: keyof typeof MAX) => String(body[k] ?? "").trim().slice(0, MAX[k]);
  const name = field("name").replace(/[\r\n]+/g, " ");
  const email = field("email");
  const company = field("company");
  const budget = field("budget");
  const message = field("message");
  const reason = String(body.reason ?? "").replace(/[\r\n]+/g, " ").slice(0, 40);

  // Honeypot: real people never fill the hidden "website" field.
  if (body.website) return NextResponse.json({ ok: true });

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please add your name, a valid email and a message." }, { status: 400 });
  }

  const user = process.env.GMAIL_USER || site.email;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!pass) {
    return NextResponse.json({ error: "not-configured" }, { status: 503 });
  }

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Reason", reason],
    ["Company", company],
    ["Timeline / budget", budget],
  ].filter(([, v]) => v);

  const html = `
    <div style="font-family:system-ui,sans-serif;color:#3c3728">
      <h2 style="margin:0 0 12px">New message from your portfolio</h2>
      <table style="border-collapse:collapse;margin-bottom:16px">
        ${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#8a8270">${k}</td><td>${escape(v)}</td></tr>`).join("")}
      </table>
      <p style="white-space:pre-wrap;line-height:1.6">${escape(message)}</p>
    </div>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`;

  try {
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await transporter.sendMail({
      // Gmail only sends as the signed-in account; replying goes to the visitor.
      from: { name: `${name} via Portfolio`, address: user },
      to: process.env.CONTACT_TO || user,
      replyTo: { name, address: email },
      subject: `👋 ${reason || "Hey"} from ${name}`,
      text,
      html,
    });
  } catch (err) {
    console.error("Gmail send failed:", err);
    return NextResponse.json({ error: "Couldn't send right now." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
