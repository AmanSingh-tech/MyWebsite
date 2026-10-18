import { REVALIDATE_SECONDS } from "./github";
import { site } from "./site";

export type CodingStats = {
  codeforces: { rating: number; maxRating: number; rank: string } | null;
  leetcode: { rating: number | null; topPercent: number | null; solved: number; hard: number } | null;
};

async function getCodeforces(): Promise<CodingStats["codeforces"]> {
  try {
    const res = await fetch(`https://codeforces.com/api/user.info?handles=${site.handles.codeforces}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    const json = await res.json();
    const u = json?.result?.[0];
    if (json.status !== "OK" || !u) return null;
    return { rating: u.rating, maxRating: u.maxRating, rank: u.rank };
  } catch {
    return null;
  }
}

const LC_QUERY = `query($u:String!){
  matchedUser(username:$u){ submitStatsGlobal{ acSubmissionNum{ difficulty count } } }
  userContestRanking(username:$u){ rating topPercentage }
}`;

async function getLeetcodeUser(username: string) {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
    body: JSON.stringify({ query: LC_QUERY, variables: { u: username } }),
    next: { revalidate: REVALIDATE_SECONDS },
  });
  const { data } = await res.json();
  const counts: { difficulty: string; count: number }[] =
    data?.matchedUser?.submitStatsGlobal?.acSubmissionNum ?? [];
  const get = (d: string) => counts.find((c) => c.difficulty === d)?.count ?? 0;
  return {
    rating: data?.userContestRanking?.rating ?? null,
    topPercent: data?.userContestRanking?.topPercentage ?? null,
    solved: get("All"),
    hard: get("Hard"),
  };
}

// Combines both LeetCode accounts: best contest rating, total problems solved.
async function getLeetcode(): Promise<CodingStats["leetcode"]> {
  try {
    const users = await Promise.all(site.handles.leetcode.map(getLeetcodeUser));
    const rated = users.filter((u) => u.rating != null).sort((a, b) => b.rating! - a.rating!)[0];
    return {
      rating: rated ? Math.round(rated.rating!) : null,
      topPercent: rated?.topPercent ?? null,
      solved: users.reduce((s, u) => s + u.solved, 0),
      hard: users.reduce((s, u) => s + u.hard, 0),
    };
  } catch {
    return null;
  }
}

export async function getCodingStats(): Promise<CodingStats> {
  const [codeforces, leetcode] = await Promise.all([getCodeforces(), getLeetcode()]);
  return { codeforces, leetcode };
}
