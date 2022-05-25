export const mapToBannerSrc = (map: string) => {
  const mapToBanner = {
    ancient: "ancient.jpg",
    cache: "cache.jpg",
    dustii: "dust_II.png", // "I" in key has to be lower case
    inferno: "inferno.jpg",
    mirage: "mirage.jpg",
    nuke: "nuke.jpg",
    office: "office.jpg",
    overpass: "overpass.jpg",
    train: "train.jpg",
    vertigo: "vertigo.jpg",
  };

  return (
    "/images/map_banners/" + mapToBanner[map.toLowerCase().replace(" ", "")]
  );
};

export const mapToIconSrc = (map: string) => {
  const mapToIcon = {
    ancient: "ancient.svg",
    cache: "cache.svg",
    dustii: "dust_II.svg", // "I" in key has to be lower case
    inferno: "inferno.svg",
    mirage: "mirage.svg",
    nuke: "nuke.svg",
    office: "office.svg",
    overpass: "overpass.svg",
    train: "train.svg",
    vertigo: "vertigo.svg",
  };

  return "/images/map_icons/" + mapToIcon[map.toLowerCase().replace(" ", "")];
};
