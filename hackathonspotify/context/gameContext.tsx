import { useSession } from "next-auth/react";
import React from "react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { getUsersTopAlbums } from "~/lib/spotify";
import { Album } from "~/lib/spotify";

export interface GuessResult {
  correct: boolean;
}

export interface GameContextState {
  albums: Album[];
  artistNames: string[];
  highscore: number;
  guessAlbum(albumId: string, albumName: string): GuessResult;
  guessArtist(albumId: string, artistName: string): GuessResult;
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
        artistNames: albums.map((x) => x.artistName),
        guessAlbum: (albumId: string, albumName: string) => {
          const album = albums.find((x) => x.albumId === albumId);
          const isCorrect = album?.name === albumName;

          if (isCorrect) {
            setHighscore((x) => x + 1);
          }

          return {
            correct: isCorrect,
          };
        },
        guessArtist: (albumId: string, artistName: string) => {
          const album = albums.find((x) => x.albumId === albumId);
          const isCorrect = album?.artistName === artistName;

          if (isCorrect) {
            setHighscore((x) => x + 1);
          }

          return {
            correct: isCorrect,
          };
        },
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { useGameContext, GameContextProvider };
