const slogan = "A cup of Minteea 🍵";

export function getPageTitle(title: string) {
  return title ? `${title} - ${slogan}` : slogan;
}
