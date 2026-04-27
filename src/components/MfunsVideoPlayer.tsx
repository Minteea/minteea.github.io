import { onMount, onCleanup, createSignal, createEffect, For } from "solid-js";
import {
  Player,
  version as playerVersion,
} from "../scripts/mfuns-player-meon/standard-player.es.js";
import type * as MfunsPlayer from "mfuns-player-meon/mfuns-player/video-page-player.js";
import { resolveUrl } from "@utils/resolveUrl.js";

declare global {
  interface Window {
    player: MfunsPlayer.Player | null;
  }
}

const ONEDRIVE_LINK =
  "https://1drv.ms/f/c/9cbbc6587979cba7/Et5m_Eie70hJsjApLGj6gGUBmUiswDbQYIRT4Lnne3Se5w?e=3H8JrC";

const ILANZOU_LINK = "https://www.ilanzou.com/s/6uUzvFdX";

export default function VideoPlayer({
  title,
  videoParts,
  themeColor,
}: {
  title: string;
  videoParts: string[];
  themeColor?: string;
}) {
  let container: HTMLDivElement | undefined;
  const [urls, setUrls] = createSignal<string[] | null>(null);
  const [currentUrl, setCurrentUrl] = createSignal<string>("");
  const [currentPart, setCurrentPart] = createSignal<number>(0);
  const isLanzou = () =>
    videoParts[currentPart() && currentPart() - 1]
      ? new URL(
          videoParts[currentPart() && currentPart() - 1],
        ).hostname.includes("ilanzou.com")
      : false;

  // Load URLs
  onMount(() => {
    const abortController = new AbortController();
    (async () => {
      const resolvedUrls = await Promise.all(
        videoParts.map((url) => resolveUrl(url, abortController.signal)),
      );
      setUrls(resolvedUrls);
    })();

    onCleanup(() => {
      abortController.abort();
    });
  });

  // Initialize player
  createEffect(() => {
    const urlList = urls();
    if (!urlList) return;

    let player: MfunsPlayer.Player | null =
      new (Player as any as typeof MfunsPlayer.Player)({
        container: container,
        video: {
          title: title,
          list: urlList.map((u) => ({
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
                  : player.toast!("视频下载链接不存在！", 5000);
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
    setCurrentUrl(player.getVideoInfo().url ?? "");
    setCurrentPart(player.getVideoInfo().part ?? 0);
    player.on("videoChange", (info) => {
      setCurrentUrl(info.url ?? "");
      setCurrentPart(info.part ?? 0);
    });
    window.player = player;

    onCleanup(() => {
      player?.destroy();
      player = null;
      window.player = null;
    });
  });

  return (
    <div class="cursor-default">
      <div
        id="video-player-container"
        ref={container}
        style={{
          width: "100%",
          height: "100%",
          "aspect-ratio": "16/9",
        }}
      ></div>
      <hr />
      <div class="flex px-2 justify-between">
        <div class="flex gap-4">
          <a href={isLanzou() ? ILANZOU_LINK : ONEDRIVE_LINK} target="_blank">
            网盘
          </a>
          <a href={currentUrl()} target="_blank">
            下载当前视频
          </a>
          <span class="text-gray-400">|</span>
          <ul class="flex gap-2">
            <For each={urls()}>
              {(url, i) => (
                <a
                  onClick={() => window.player?.plugins.part!.set(i() + 1)}
                  style={{
                    "font-weight":
                      i() + 1 == currentPart() ? "bold" : undefined,
                    cursor: "pointer",
                  }}
                >
                  {"P" + (i() + 1).toString().padStart(2, "0")}
                </a>
              )}
            </For>
          </ul>
        </div>
        <div class="flex gap-2">建议使用电脑浏览器播放</div>
      </div>
    </div>
  );
}
