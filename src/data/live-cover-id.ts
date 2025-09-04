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
};

export function getCover(id: string) {
  return liveCoverIdMap[id];
}
