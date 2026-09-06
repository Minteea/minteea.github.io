// 访问量统计

function getHostname(host: string) {
  if (host.startsWith("[")) {
    return host.slice(1, host.indexOf("]"));
  }

  return host.split(":")[0];
}

export function isIntranetHost(host: string) {
  const hostname = getHostname(host).toLowerCase();
  const ipv4Parts = hostname.split(".").map(Number);

  if (hostname === "localhost" || hostname.endsWith(".localhost")) {
    return true;
  }

  if (
    ipv4Parts.length === 4 &&
    ipv4Parts.every((part) => Number.isInteger(part) && part >= 0 && part <= 255)
  ) {
    const [first, second] = ipv4Parts;
    return (
      first === 10 ||
      first === 127 ||
      (first === 172 && second >= 16 && second <= 31) ||
      (first === 192 && second === 168) ||
      (first === 169 && second === 254)
    );
  }

  return hostname === "::1" || hostname.startsWith("fc") || hostname.startsWith("fd") || hostname.startsWith("fe80:");
}

export async function webCounter() {
  if (isIntranetHost(window.location.host)) {
    const a = await fetch("https://w.saobby.com/api/visit/aarrin6b").then((r) => r.json()).catch(() => ({ success: false }));
    if (a.success) {
      console.log(`检测到内网地址，开发模式访问用户数为${a.data.ips}，访问量为${a.data.visits}。`);
    } else {
      console.error(`检测到内网地址，无法获取本网站访问统计数据。`);
    }
    return a;

  } else {
    const a = await fetch("https://w.saobby.com/api/visit/5ulrscno").then((r) => r.json()).catch(() => ({ success: false }));
    if (a.success) {
      console.log(`本网站访问用户数为${a.data.ips}，访问量为${a.data.visits}。`);
    } else {
      console.error(`无法获取本网站访问统计数据。`);
    }
    return a;
  }
}

