import { onMount, onCleanup, createSignal, createEffect, For } from "solid-js";
import {
  Player,
  version as playerVersion,
} from "../../scripts/mfuns-player-meon/standard-player.es.js";
import type * as MfunsPlayer from "mfuns-player-meon/mfuns-player/video-page-player.js";
import { netdiskLink } from "@utils/resolveLink.js";
import "./video-player.scss";

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
      ? videoParts[currentPart() && currentPart() - 1].includes("ilanzou") ||
        videoParts[currentPart() && currentPart() - 1].includes("qaiu.top")
      : false;

  // Load URLs
  onMount(() => {
    const abortController = new AbortController();
    (async () => {
      const resolvedUrls = await Promise.all(
        videoParts.map((url) => netdiskLink(url, abortController.signal)),
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
    <div class="videoplayer videoplayer--meon">
      <div id="videoplayer-container" ref={container}></div>
      <hr />
      <div class="videoplayer-toolbar">
        <div
          class="videoplayer-toolbar-group videoplayer-toolbar-group--left"
          data-layout="left"
        >
          <a
            href={isLanzou() ? ILANZOU_LINK : ONEDRIVE_LINK}
            target="_blank"
            title="网盘"
          >
            <i class="ti ti-cloud"></i>
            <span class="videoplayer-toolbar-link-text">网盘</span>
          </a>
          <a href={currentUrl()} target="_blank" title="下载当前视频">
            <i class="ti ti-download"></i>
            <span class="videoplayer-toolbar-link-text">下载当前视频</span>
          </a>
          <span class="videoplayer-toolbar-separator">|</span>
          <ul class="videoplayer-toolbar-parts">
            <For each={urls()}>
              {(url, i) => (
                <a
                  class={i() + 1 == currentPart() ? "is-current" : ""}
                  onClick={() => window.player?.plugins.part!.set(i() + 1)}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {"P" + (i() + 1).toString().padStart(2, "0")}
                </a>
              )}
            </For>
          </ul>
        </div>
      </div>
    </div>
  );
}
