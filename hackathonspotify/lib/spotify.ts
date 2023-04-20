export interface Album {
    success: boolean;
    answered: boolean;
    albumId: string,
    name: string,
    releaseDate: string,
    artistName: string,
    artworkUrl: string,
}

const getUsersTopAlbums = async (accessToken: string) => {
    const response = await get(accessToken, "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&&limit=50");

    //@ts-ignore
    let albums = (await response.json()).items.filter(x => x.album.album_type === "ALBUM").map((xx) => ({
        albumId: xx.id,
        name: xx.album.name,
        releaseDate: xx.album.release_date,
        artistName: xx.artists[0].name,
        artworkUrl: xx.album.images[0].url,
    }) as Album);

    // FILTER OUT DUPLICATES BASED ON NAME
    // @ts-ignore
    return albums.filter((album, index, self) => index === self.findIndex((t) => (
        t.name === album.name
    )));
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
    getUsersTopAlbums
};
