import { NextResponse } from "next/server";
import { getRepos } from "@/lib/github";

// Backup for the Work section: if the page was built while GitHub was unreachable,
// the browser asks here instead. Successful GitHub responses are still cached for a
// day by the fetch in getRepos; failed ones aren't cached, so this retries next time.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getRepos(12));
  } catch {
    return NextResponse.json([], { status: 502 });
  }
}
