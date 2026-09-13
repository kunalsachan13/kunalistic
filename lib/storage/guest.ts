// Guest storage utilities using localStorage with fallback

const FAVORITES_KEY = "kunalistic_favorites";
const RECENT_TOOLS_KEY = "kunalistic_recent_tools";
const SAVED_OUTPUTS_KEY = "kunalistic_saved_outputs";

export function getLocalFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleLocalFavorite(slug: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const favs = getLocalFavorites();
    const index = favs.indexOf(slug);
    let isFav = false;
    if (index >= 0) {
      favs.splice(index, 1);
      isFav = false;
    } else {
      favs.push(slug);
      isFav = true;
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    window.dispatchEvent(new Event("kunalistic_storage_update"));
    return isFav;
  } catch {
    return false;
  }
}

export function recordRecentTool(slug: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(RECENT_TOOLS_KEY);
    let list: string[] = raw ? JSON.parse(raw) : [];
    list = [slug, ...list.filter((s) => s !== slug)].slice(0, 8);
    localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event("kunalistic_storage_update"));
  } catch {
    // Ignore storage errors
  }
}

export function getRecentTools(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_TOOLS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export interface LocalSavedOutput {
  id: string;
  slug: string;
  toolName: string;
  title: string;
  data: unknown;
  savedAt: string;
}

export function getLocalSavedOutputs(): LocalSavedOutput[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_OUTPUTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalOutput(item: Omit<LocalSavedOutput, "id" | "savedAt">) {
  if (typeof window === "undefined") return;
  try {
    const outputs = getLocalSavedOutputs();
    const newOutput: LocalSavedOutput = {
      ...item,
      id: `saved-${Date.now()}`,
      savedAt: new Date().toISOString(),
    };
    outputs.unshift(newOutput);
    localStorage.setItem(SAVED_OUTPUTS_KEY, JSON.stringify(outputs.slice(0, 20)));
    window.dispatchEvent(new Event("kunalistic_storage_update"));
  } catch {
    // Ignore storage errors
  }
}
