interface HomepageLatestVideoData {
  title: string;
  description: string;
  slug: string;
  cover: string;
}

export const latestVideo: HomepageLatestVideoData = {
  title: "【糖豆人手书】预言的勇者",
  description: "在糖豆王国，一名只会唱歌的吟游糖豆，被水晶球的预言选中为「冲破黑暗」的勇者…… \n用大风老师的歌和PV做了一个糖豆人手书，希望路过的观众朋友们看得满意⭐  ",
  slug: "202512-fallguys-brave",
  cover: "https://i2.hdslb.com/bfs/archive/9c199f20745e0f3e1b7510c6ed36574d8e67dd22.jpg"
}


export const recentProjects: { title: string; description: string, link: string }[] = [
  {
    title: "recoui",
    description: "正在开发的一款基于css可拓展组件库",
    link: "https://github.com/minteea/recoui"
  },
  {
    title: "Floating Live GUI",
    description: "弹幕记录工具（开发中）",
    link: "https://github.com/minteea/floating-live-gui"
  }
];

interface HomepageLinkData {
  platform: string;
  username: string;
  link: string;
  icon: string;
}

export const myLinks: HomepageLinkData[] = [
  {
    platform: "Bilibili",
    username: "薄茶君",
    link: "https://space.bilibili.com/308906789",
    icon: "ti-brand-bilibili",
  },
  {
    platform: "GitHub",
    username: "Minteea",
    link: "https://github.com/minteea",
    icon: "ti-brand-github",
  },
  {
    platform: "AcFun",
    username: "Minteea",
    link: "https://www.acfun.cn/u/33734912",
    icon: "ti-brand-acfun",
  },
];
