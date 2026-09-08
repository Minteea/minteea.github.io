const BASE_API_URL = "https://api.minteea.site";

export function apiUrl(url: string): URL {
  return new URL(url, BASE_API_URL);
}
