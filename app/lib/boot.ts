// Tiny scripts inlined in <head> so they run before first paint. They live in a plain
// module (not a "use client" file) because the server layout needs them as strings.

export const THEME_KEY = "theme";
export const LOADER_KEY = "seen-hey";

// Saved theme, else the device setting. Avoids a light flash for dark-mode visitors.
const theme = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

// Returning visitors (same tab session) skip the "Hey!" loader.
const loader = `try{if(sessionStorage.getItem("${LOADER_KEY}"))document.documentElement.classList.add("skip-loader");else document.documentElement.classList.add("is-loading")}catch(e){}`;

export const bootScript = theme + loader;
