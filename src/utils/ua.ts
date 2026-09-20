export type BrowserName =
  | "Chrome"
  | "Firefox"
  | "Safari"
  | "Edge"
  | "Opera"
  | "IE"
  | "Unknown";

export type OSName = "Windows" | "macOS" | "iOS" | "Android" | "Linux" | "Unknown";

export interface UserAgentInfo {
  ua: string;
  browser: {
    name: BrowserName;
    version: string;
  };
  os: {
    name: OSName;
    version: string;
  };
  platform: string;
  isMobile: boolean;
}

const normalizeVersion = (value?: string): string =>
  value ? value.replace(/_/g, ".") : "Unknown";

const getRuntimeUserAgent = (): string => {
  if (typeof navigator !== "undefined" && navigator.userAgent) {
    return navigator.userAgent;
  }

  return "";
};

export function detectUserAgent(ua = getRuntimeUserAgent()): UserAgentInfo {
  const normalizedUA = ua || "";
  const isMobile = /(android|iphone|ipad|ipod|windows phone|mobile)/i.test(normalizedUA);

  let browserName: BrowserName = "Unknown";
  let browserVersion = "Unknown";

  const browserMatchers: Array<{ name: BrowserName; regex: RegExp }> = [
    { name: "Edge", regex: /Edg(?:e|A|iOS)?\/([0-9._]+)/i },
    { name: "Opera", regex: /OP(?:R|era)\/?([0-9._]+)/i },
    { name: "Chrome", regex: /(?:Chrome|CriOS)\/([0-9._]+)/i },
    { name: "Firefox", regex: /Firefox\/([0-9._]+)/i },
    { name: "Safari", regex: /Version\/([0-9._]+).*Safari/i },
    { name: "IE", regex: /MSIE\s([0-9._]+)|Trident.*rv:([0-9._]+)/i },
  ];

  for (const matcher of browserMatchers) {
    const match = normalizedUA.match(matcher.regex);

    if (match) {
      browserName = matcher.name;
      browserVersion = normalizeVersion(match[1] || match[2]);
      break;
    }
  }

  let osName: OSName = "Unknown";
  let osVersion = "Unknown";

  if (/Windows/i.test(normalizedUA)) {
    osName = "Windows";
    const match = normalizedUA.match(/Windows NT ([0-9.]+)/i);
    osVersion = normalizeVersion(match?.[1]);
  } else if (/Mac OS X/i.test(normalizedUA)) {
    osName = "macOS";
    const match = normalizedUA.match(/Mac OS X ([0-9_]+)/i);
    osVersion = normalizeVersion(match?.[1]);
  } else if (/iPhone|iPad|iPod/i.test(normalizedUA)) {
    osName = "iOS";
    const match = normalizedUA.match(/(?:iPhone OS|CPU OS|OS) ([0-9_]+)/i);
    osVersion = normalizeVersion(match?.[1]);
  } else if (/Android/i.test(normalizedUA)) {
    osName = "Android";
    const match = normalizedUA.match(/Android ([0-9.]+)/i);
    osVersion = normalizeVersion(match?.[1]);
  } else if (/Linux/i.test(normalizedUA)) {
    osName = "Linux";
  }

  const platform =
    typeof navigator !== "undefined" && navigator.platform ? navigator.platform : osName;

  return {
    ua: normalizedUA,
    browser: {
      name: browserName,
      version: browserVersion,
    },
    os: {
      name: osName,
      version: osVersion,
    },
    platform,
    isMobile,
  };
}

export const userAgentInfo = detectUserAgent();
export const browserInfo = userAgentInfo.browser;
export const osInfo = userAgentInfo.os;
export const isMobile = userAgentInfo.isMobile;
export const browserVersion = userAgentInfo.browser.version;
export const osPlatform = userAgentInfo.os.name;

export const getBrowserVersion = (): string => userAgentInfo.browser.version;
export const getOSPlatform = (): string => userAgentInfo.os.name;
export const isMobileDevice = (): boolean => userAgentInfo.isMobile;
