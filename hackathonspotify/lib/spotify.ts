export interface Album {
  albumId: string,
  name: string,
  releaseDate: string,
  artistName: string,
  artworkUrl: string,
}

const getUsersTopItems = async (accessToken: string) => {
  const response = await get(accessToken, "https://api.spotify.com/v1/me/top/tracks?limit=50");

  //@ts-ignore
  let albums = (await response.json()).items.filter(x => x.album.album_type === "ALBUM").map((xx) => ({
    albumId: xx.id,
    name: xx.album.name,
    releaseDate: xx.album.release_date,
    artistName: xx.artists[0].name,
    artworkUrl: xx.album.images[0].url,
  }) as Album);

  return albums;

}

const getUsersSavedAlbums = async (accessToken: string) => {
  const response = await get(accessToken, "https://api.spotify.com/v1/me/albums");
}

const get = async (accessToken: string, url: string) =>
  await fetch(
    url,
    {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });


export {
  getUsersSavedAlbums,
  getUsersTopItems
};
