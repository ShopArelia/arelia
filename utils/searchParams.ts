/**
 * Build a href for `path` by applying `overrides` on top of the params already
 * in the URL. Anything not overridden is carried through, so a filter link
 * can't silently drop the active sort, merch type or search term.
 *
 * A `null` or `""` override removes the key.
 */
export function buildHref(
    path: string,
    current: { toString(): string },
    overrides: Record<string, string | null | undefined>,
) {
    const params = new URLSearchParams(current.toString());

    for (const [key, value] of Object.entries(overrides)) {
        if (value === null || value === undefined || value === "") {
            params.delete(key);
        } else {
            params.set(key, value);
        }
    }

    const query = params.toString();
    return query ? `${path}?${query}` : path;
}
