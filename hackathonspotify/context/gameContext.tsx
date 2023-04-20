import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { getUsersTopAlbums } from "~/lib/spotify";
import { Album } from "~/lib/spotify";

export interface GuessResult {
  correct: boolean;
}

export type HintType = "ReleaseDate" | "TopSong";

export interface Hint {
  albumId: string;
  type: HintType;
  value: string;
}

export interface GameContextState {
  albums: Album[];
  artistNames: string[];
  highscore: number;
  getAvailableHints(albumId: string): Hint[];
  currentScore: number;
  guessAlbum(albumId: string, albumName: string): GuessResult;
  guessArtist(albumId: string, artistName: string): GuessResult;
  requestHint(albumId: string): void;
  currentTimer: string;
  toggleTimer(): void;
}

const GameContext = React.createContext({} as GameContextState);

const useGameContext = () => useContext(GameContext);

const GameContextProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const session = useSession();
  const router = useRouter();

  const [hints, setHints] = useState<Hint[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [highscore, setHighscore] = useState<number>(0);
  const [currentScore, setCurrentscore] = useState<number>(0);
  const [play, setPlay] = useState(true);
  const [time, setTime] = useState({ m: 0, s: 0 });

  const handleGameOver = () => {
    if (play) {
      setPlay(!play);
    }
    if (currentScore > highscore) {
      setHighscore(currentScore);
    }
    if (albums.filter((x) => x.answered).length === albums.length) {
      router.push("/finished");
    }
  };

  useEffect(() => {
    const interval = setInterval(function () {
      if (play) {
        if (time.s === 59) {
          setTime({ s: 0, m: time.m + 1 });
        } else {
          setTime({ s: time.s + 1, m: time.m });
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [time, play]);

  const togglePlay = () => {
    setPlay(!play);
  };

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
        currentTimer:
          time.m.toString().padStart(2, "0") +
          " " +
          time.s.toString().padStart(2, "0"),
        toggleTimer: togglePlay,
        getAvailableHints: (albumId: string) => {
          return hints.filter((x) => x.albumId === albumId);
        },
        requestHint: (albumId: string) => {
          const album = albums.find((x) => x.albumId === albumId);
          const existingHints = hints.filter((x) => x.albumId === albumId);
          const existingHintTypes = existingHints.map((x) => x.type);

          if (!existingHintTypes.includes("ReleaseDate")) {
            setHints((h) => [
              ...h,
              {
                albumId,
                type: "ReleaseDate",
                value: album?.releaseDate ?? "",
              },
            ]);
            return;
          }
          if (!existingHintTypes.includes("TopSong")) {
            setHints((h) => [
              ...h,
              {
                albumId,
                type: "TopSong",
                value: album?.topSong ?? "",
              },
            ]);
            return;
          }
        },
        currentScore,
        artistNames: albums.map((x) => x.artistName),
        guessAlbum: (albumId: string, albumName: string) => {
          const album = albums.find((x) => x.albumId === albumId);
          const isCorrect = album?.name === albumName;

          if (album) album.answered = true;
          if (isCorrect) {
            setCurrentscore((x) => x + 1);
            album.success = true;
          }

          handleGameOver();

          return {
            correct: isCorrect,
          };
        },
        guessArtist: (albumId: string, artistName: string) => {
          const album = albums.find((x) => x.albumId === albumId);
          const isCorrect = album?.artistName === artistName;

          if (album) album.answered = true;
          if (isCorrect) {
            setCurrentscore((x) => x + 1);
            album.success = true;
          }

          handleGameOver();

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
