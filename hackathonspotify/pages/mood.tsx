import Image from "next/image";
// @ts-ignore
import { Pixelify } from "react-pixelify";
import classnames from "classnames";

import Emo from "../public/emo.png";
import React, { useEffect, useState } from "react";
import { RulesModal } from "~/components/RulesModal";
import { AlbumModal } from "~/components/AlbumModal";
import { useSession } from "next-auth/react";
import { useGameContext } from "~/context/gameContext";

export default function Mood() {
  const session = useSession({ required: true });
  const { albums: albumData, guessAlbum, guessArtist } = useGameContext();

  const [play, setPlay] = useState(true);
  const [time, setTime] = useState({ m: 0, s: 0 });
  const [selectedAlbum, setSelectedAlbum] = useState<any>(undefined);
  const [openRulesModal, setOpenRulesModal] = useState(false);

  const onGuessArtist = (albumId: string, artistName: string) => {
    const result = guessArtist(albumId, artistName);
    if (result.correct) {
      // do something
    } else {
      // do something
    }
  };

  const onGuessAlbum = (albumId: string, albumName: string) => {
    const result = guessAlbum(albumId, albumName);
    if (result.correct) {
      // do something
    } else {
      // do something
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

  const toggleRulesModal = () => {
    togglePlay();
    setOpenRulesModal(!openRulesModal);
  };

  function removeSelectedAlbum() {
    setSelectedAlbum(null);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16 px-8 lg:px24 transition-all">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center">
          <span className="material-icons-outlined !text-4xl hover:text-gray-500 transition-all">
            timer
          </span>
          <span className="pl-4 font-bold">
            {time.m.toString().padStart(2, "0")}:{" "}
            {time.s.toString().padStart(2, "0")}
          </span>
        </div>

        <h2 className="flex flex-grow items-center justify-center text-center text-4xl font-bold tracking-tight text-white sm:text-6xl">
          M
          <Image
            src={Emo}
            alt="o"
            className="px-1 pt-4"
            width={50}
            height={14}
          />
          odify
        </h2>

        <div className="flex gap-3 items-center">
          <button
            className="border rounded-full w-12 h-12 hover:text-gray-500 transition-all"
            onClick={toggleRulesModal}
          >
            <span className="material-icons-outlined !text-3xl">
              question_mark
            </span>
          </button>
          <button
            onClick={togglePlay}
            className="border rounded-full w-12 h-12 hover:text-gray-200 transition-all hover:bg-gray-700"
          >
            <span className="material-icons-outlined !text-2xl">pause</span>
          </button>
        </div>
      </div>

      <div className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none mt-8 grid grid-cols-1 sm:grid-cols-2 md:grip-col-4 lg:grid-cols-5 overflow-hidden text-center ">
            {albumData &&
              albumData.map((album, index) => {
                if (index === 5) {
                  album.success = true;
                }
                return (
                  <div
                    key={album.albumId}
                    className="w-52 h-52 card relative"
                    style={{ animationDelay: `${((index + 1) * 100) / 2}ms` }}
                  >
                    <button
                      type="button"
                      className={classnames(
                        "flex justify-center items-center w-52 h-52 bg-contain shadow-inner hover:shadow-lg relative overflow-hidden cardInner opacity-0",
                        album.success &&
                          "after:content-['*'] after:bg-green-700 opacity-90"
                      )}
                      onClick={() => setSelectedAlbum(album)}
                      style={{
                        animationDelay: `${((index + 1) * 100) / 2}ms`,
                        animationFillMode: "forwards",
                        imageRendering: "pixelated",
                      }}
                      disabled={album.success}
                    >
                      <Pixelify
                        src={album.artworkUrl}
                        pixelSize={album.success ? 0 : 25}
                      />
                    </button>
                    {album.success && (
                      <div className="absolute bg-green-500 inset-0 opacity-50 flex items-center justify-center">
                        <span className="material-icons-outlined !text-5xl transition-all">
                          check
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <RulesModal open={openRulesModal} close={toggleRulesModal} />
      {selectedAlbum && (
        <AlbumModal
          album={selectedAlbum}
          open={!!selectedAlbum}
          close={removeSelectedAlbum}
        />
      )}
    </main>
  );
}
