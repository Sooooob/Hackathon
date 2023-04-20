export interface Album {
  success: boolean;
  answered: boolean;
  albumId: string;
  name: string;
  releaseDate: string;
  artistName: string;
  artworkUrl: string;
  topSong: string;
}

const getUsersTopAlbums = async (accessToken: string) => {
  const response = await get(
    accessToken,
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&&limit=50"
  );

  let albums = (await response.json()).items
    //@ts-ignore
    .filter((x) => x.album.album_type === "ALBUM")
    .map(
      //@ts-ignore
      (xx) =>
        ({
          albumId: xx.id,
          name: xx.album.name,
          releaseDate: xx.album.release_date,
          artistName: xx.artists[0].name,
          artworkUrl: xx.album.images[0].url,
        } as Album)
    );

  return albums.filter(
    //@ts-ignore
    (album, index, self) =>
      //@ts-ignore
      index === self.findIndex((t) => t.name === album.name)
  );
};

const getUsersSavedAlbums = async (accessToken: string) => {
  const response = await get(
    accessToken,
    "https://api.spotify.com/v1/me/albums"
  );
};

const get = async (accessToken: string, url: string) =>
  await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export { getUsersSavedAlbums, getUsersTopAlbums };
