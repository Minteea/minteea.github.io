import { useState } from "preact/hooks";
import type { VideoData } from "@utils/types";

function getVideoSrc(source: string, data: VideoData, part: number = 1) {
  switch (source) {
    case "bilibili": {
      const av = data.links.av;
      const bv = data.links.bv;
      return `//player.bilibili.com/player.html?${av ? `aid=${av}&` : ""}${
        bv ? `bvid=${bv}&` : ""
      }page=${part}`;
    }
    case "acfun": {
      const ac = data.links.ac;
      return `https://www.acfun.cn/player/ac${ac}`;
    }
    default:
      return "";
  }
}

function getAvailableSources(data: VideoData) {
  const sources: string[] = [];
  (data.links.av || data.links.bv) && sources.push("bilibili");
  data.links.ac && sources.push("acfun");
  return sources;
}

export default function VideoSourcePlayer({ data }: { data: VideoData }) {
  const availableSources = getAvailableSources(data);
  const [source, setSource] = useState(availableSources[0] || "bilibili");
  const src = getVideoSrc(source, data);
  return (
    <div>
      <iframe
        id="video-player-source"
        src={src}
        scrolling="no"
        frameBorder="no"
        allowFullScreen={true}
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: "16/9",
        }}
      ></iframe>
      <hr />
      <div class="flex px-2">
        <div>播放源：</div>
        <ul class="flex gap-2">
          {availableSources.map((s) => (
            <li
              key={s}
              onClick={() => {
                setSource(s);
              }}
              class={`${source == s ? "font-bold" : ""} cursor-pointer`}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
