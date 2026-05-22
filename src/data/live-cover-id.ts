export const liveCoverIdMap: Record<string, string> = {
  // 2023C
  "fallguys-2023C": "/live-cover/2023C/Minteea_FGplayer.png",
  "carto-2023C": "/live-cover/2023C/CartoCover.png",
  "eastward-2023C": "/live-cover/2023C/EastwardCover.png",
  // 2024A
  "2024-paint": "/live-cover/2024A/Minteea-paint.cover.png",
  "fallguys-2024A": "/live-cover/2024A/Minteea-2024FG.cover.png",
  "crossing-guard-joe-2024A":
    "/live-cover/2024A/Minteea-CrossingGuard.cover.png",
  "little-shark-2024A": "/live-cover/2024A/Minteea-WarmaShark.cover.png",
  "octopia-2024A": "/live-cover/2024A/EastwardOctopia.cover.png",
  // 2024C
  "2024-summer": "/live-cover/2024C/Minteea-2024Summer.png",
  "2024-summer-night": "/live-cover/2024C/Minteea-2024Summer2.png",
  "minecraft-2024C": "/live-cover/2024C/MinteeaMC2024.cover.png",
  // 2025C
  "word-game-2025C-0": "https://s2.loli.net/2025/09/02/KhUir924QB76PZs.png",
  "word-game-2025C": "https://s2.loli.net/2025/09/02/pvgyDfzYLBkwiXO.png",
  "melatonin-2025C":
    "https://i0.hdslb.com/bfs/live/new_room_cover/952d1bf8a85ddd4979757187062dde039e846512.jpg",

  // 2025D
  "2025-winter-night":
    "https://i0.hdslb.com/bfs/live/new_room_cover/e36d5b3aef0d844ae6f7dee1e4b70520e8427ddd.jpg",
  // 2026B
  "2026-spring-0":
    "https://files.seeusercontent.com/2026/04/27/6waQ/Minteea-2026Spring-A0412.png",
  "bits-and-bops-2026B": "https://i0.hdslb.com/bfs/live/new_room_cover/fec36edb7f93310bbd8ddeb21f2f24422f4176fc.jpg"
};

export function getCover(id: string) {
  return liveCoverIdMap[id];
}
