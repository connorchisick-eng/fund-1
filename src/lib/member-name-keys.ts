// Roster names and DB rows can drift (e.g. "Chao-Hsun (Benny) Teng" in
// the roster vs "Benny Teng" in an older seed). To keep the View-profile
// link reliable, every name produces a small set of normalized keys; the
// lookup map is populated with all of them.

function strip(s: string): string {
  return s.toLowerCase().replace(/[^a-z]/g, "");
}

/**
 * Returns deduped lookup keys for a person's name. For "Chao-Hsun (Benny)
 * Teng" this includes both the full form ("chaohsunbennyteng" → after
 * stripping parens: "chaohsunteng") and the parenthetical form
 * ("benny teng" → "bennyteng"), so a DB row stored under either variant
 * still resolves.
 */
export function nameKeys(name: string): string[] {
  const keys = new Set<string>();
  keys.add(strip(name));

  // Without parentheticals: "Chao-Hsun (Benny) Teng" → "Chao-Hsun  Teng"
  const withoutParens = name.replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
  if (withoutParens) keys.add(strip(withoutParens));

  // Parenthetical content + last token (preferred Western name + surname):
  // "Chao-Hsun (Benny) Teng" → "Benny Teng"
  const parenMatch = name.match(/\(([^)]+)\)/);
  if (parenMatch) {
    const tokens = name.split(/\s+/).filter(Boolean);
    const last = tokens[tokens.length - 1];
    if (last && !/^\(.*\)$/.test(last)) {
      keys.add(strip(`${parenMatch[1]} ${last}`));
    }
    keys.add(strip(parenMatch[1]));
  }

  return Array.from(keys).filter(Boolean);
}
