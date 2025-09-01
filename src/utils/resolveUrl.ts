const WER_PLUS_API_KEY = "DvTS5PplDLz0mM8LmQWQHjjy2R";
export async function resolveUrl(url: string, signal?: AbortSignal) {
  if (new URL(url).hostname.includes("ilanzou.com")) {
    const res = await fetch(
      `https://api2.wer.plus/api/lanzpro?key=${WER_PLUS_API_KEY}&url=${url}`,
      { signal }
    ).then((r) => r.json());
    if (res.code == 200) {
      return res.data.download;
    } else {
      console.error(res);
      return "";
    }
  } else {
    return url;
  }
}
