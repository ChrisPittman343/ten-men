export const mapToBannerSrc = (map: string) => {
  const mapToBanner = {
    ancient: "ancient.jpg",
    cache: "cache.jpg",
    dustii: "dust_II.png", // Haha "I" has to be lower case
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
