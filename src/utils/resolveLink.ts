/** 解析短链接 */

import { apiUrl } from "./api";

const NetdiskLinkNamespaceSet = new Set<string>([
  "onedrive", "ilanzou"
]);


/** 解析视频链接（含网盘linkKey） */
export async function netdiskLink(link: string, signal?: AbortSignal) {
  const [ns] = link.split(":");
  if (NetdiskLinkNamespaceSet.has(ns)) {
    return await resolveNetdiskLink(link, signal);
  } else if (link.startsWith("https://www.ilanzou.com/s/")) {
    return await resolveNetdiskLink(`ilanzou:${link.split('/').pop()}`, signal);
  } else {
    return link;
  }
}


/** 解析网盘linkKey */
export async function resolveNetdiskLink(linkKey: string, signal?: AbortSignal) {

  const res = await fetch(
    apiUrl(`/netdisk/getlink/${linkKey}`).toString(),
    { signal },
  ).then((r) => r.json());
  if (res.success) {
    return res.data.directLink;
  } else {
    throw new Error(res.message);
  }
}

/** 获取网盘重定向链接 */
export function getNetdiskRedirectLink(linkKey: string) {
  return apiUrl(`/netdisk/link/${linkKey}`).toString();
}
