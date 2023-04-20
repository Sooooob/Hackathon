import { useSession } from "next-auth/react";
import React from "react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { getUsersTopAlbums } from "~/lib/spotify";
import { Album } from "~/lib/spotify";

export interface GameContextState {
  albums: Album[];
  highscore: number;
  guessAlbum(albumId: string, albumName: string): void;
  guessArtist(albumId: string, artistName: string): void;
}

const GameContext = React.createContext({} as GameContextState);

const useGameContext = () => useContext(GameContext);

const GameContextProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const session = useSession();

  const [albums, setAlbums] = useState<Album[]>([]);
  const [highscore, setHighscore] = useState<number>(0);

  useEffect(() => {
    // @ts-ignore
    if (session?.data?.accessToken) {
      // @ts-ignore
      getUsersTopAlbums(session?.data?.accessToken).then((x) => setAlbums(x));
    }
  }, [session]);

  return (
    <GameContext.Provider
      value={{
        albums,
        highscore,
        guessAlbum: (albumId: string, albumName: string) => {
          const album = albums.find((x) => x.albumId === albumId);
          // if (album?.name === albumName) {
          //     setScore(score + 1);
          // }
        },
        guessArtist: (albumId: string, artistName: string) => {
          const album = albums.find((x) => x.albumId === albumId);
          // if (album?.artists[0].name === artistName) {
          //     setScore(score + 1);
          // }
        },
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { useGameContext, GameContextProvider };
