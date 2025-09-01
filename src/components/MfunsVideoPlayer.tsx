import { useEffect, useRef, useState } from "preact/hooks";
import {
  Player,
  version as playerVersion,
} from "../scripts/mfuns-player-meon/standard-player.es.js";
import type * as MfunsPlayer from "mfuns-player-meon/mfuns-player/video-page-player.js";
import { resolveUrl } from "@utils/resolveUrl.js";

declare global {
  interface Window {
    player: any;
  }
}

const ONEDRIVE_LINK =
  "https://1drv.ms/f/c/9cbbc6587979cba7/Et5m_Eie70hJsjApLGj6gGUBmUiswDbQYIRT4Lnne3Se5w?e=3H8JrC";

export default function VideoPlayer({
  title,
  videoParts,
  themeColor,
}: {
  title: string;
  videoParts: string[];
  themeColor?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [urls, setUrls] = useState<string[]>(null);
  useEffect(() => {
    const abortController = new AbortController();
    (async () =>
      setUrls(
        await Promise.all(
          videoParts.map((url) => resolveUrl(url, abortController.signal))
        )
      ))();
    return () => {
      abortController.abort();
    };
  }, [videoParts]);
  useEffect(() => {
    if (!urls) return;
    let player = new (Player as any as typeof MfunsPlayer.Player)({
      container: container.current,
      video: {
        title: title,
        list: urls.map((u) => ({
          url: u,
        })),
      },
      autoPart: true,
      autoplay: true,
      contextMenu: {
        list: [
          {
            content: "下载视频...",
            onClick: (player) => {
              const url = player.getVideoInfo().url;
              url
                ? window.open(url)
                : player.toast("视频下载链接不存在！", 5000);
            },
          },
          {
            content: "快捷键说明",
            onClick: (player) => {
              player.plugins.hotkeyInfo?.toggle(true);
            },
          },
          {
            content: `Mfuns Player v${playerVersion}`,
            onClick: (player) => {
              (player.plugins as any).about?.toggle(true);
            },
          },
        ],
      },
      modal: {
        panels: ["about", "hotkeyInfo"],
      },
      theme: themeColor
        ? {
            primaryColor: themeColor,
            secondaryColor: themeColor,
          }
        : undefined,
    });
    window.player = player;
    return () => {
      player.destroy();
      player = null;
      window.player = null;
    };
  }, [urls]);
  return (
    <div class="cursor-default">
      <div
        id="video-player-container"
        ref={container}
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: "16/9",
        }}
      ></div>
      <hr />
      <div class="flex px-2 justify-between">
        <div class="flex gap-4">
          <a href={ONEDRIVE_LINK}>网盘</a>
          <div class="flex">
            <span>下载视频：</span>
            <ul class="flex gap-2">
              {urls?.map((url, i) => (
                <a href={url}>{"P" + (i + 1).toString().padStart(2, "0")}</a>
              ))}
            </ul>
          </div>
        </div>
        <div class="flex gap-2">建议使用电脑浏览器播放</div>
      </div>
    </div>
  );
}
