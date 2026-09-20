import { createSignal, For } from "solid-js";
import type { VideoData } from "@utils/types";
import "./video-player.scss";

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
  const [source, setSource] = createSignal(availableSources[0] || "bilibili");

  return (
    <div class="videoplayer videoplayer--source">
      <iframe
        id="videoplayer-embed"
        src={getVideoSrc(source(), data)}
        scrolling="no"
        frameborder="no"
        allowfullscreen={true}
      ></iframe>
      <hr />
      <div class="videoplayer-toolbar">
        <div
          class="videoplayer-toolbar-group videoplayer-toolbar-group--left"
          data-layout="left"
        >
          <div>播放源：</div>
          <ul class="videoplayer-toolbar-sources">
            <For each={availableSources}>
              {(s) => (
                <li
                  onClick={() => {
                    setSource(s);
                  }}
                  class={source() === s ? "is-active" : ""}
                >
                  {s}
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </div>
  );
}
