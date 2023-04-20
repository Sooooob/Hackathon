import Image from "next/image";
// @ts-ignore
import { Pixelify } from "react-pixelify";
import classnames from "classnames";

import Emo from "../public/emo.png";
import React, { useState } from "react";
import { RulesModal } from "~/components/RulesModal";
import { AlbumModal } from "~/components/AlbumModal";
import { useGameContext } from "~/context/gameContext";
import useRequiredSession from "~/hooks/useRequiredSession";
import { useTimeContext } from "~/context/timeContext";

export default function Mood() {
  const { albums: albumData, currentScore } = useGameContext();
  const { toggleTimer, currentTimer } = useTimeContext();

  const [selectedAlbum, setSelectedAlbum] = useState<any>(undefined);
  const [openRulesModal, setOpenRulesModal] = useState(false);
  useRequiredSession();

  const toggleRulesModal = () => {
    toggleTimer();
    setOpenRulesModal(!openRulesModal);
  };

  function removeSelectedAlbum() {
    setSelectedAlbum(null);
  }

  return (
    <main className="flex min-h-screen flex-col items-center py-16 px-8 lg:px24 transition-all">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center">
          <span className="material-icons-outlined !text-4xl hover:text-gray-500 transition-all">
            timer
          </span>
          <span className="pl-4 font-bold">{currentTimer}</span>
        </div>

        <h2 className="flex flex-grow items-center justify-center text-center text-4xl font-bold tracking-tight text-white sm:text-6xl">
          M
          <Image
            src={Emo}
            alt="o"
            className="animate-bounce px-1 pt-4"
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
            onClick={toggleTimer}
            className="border rounded-full w-12 h-12 hover:text-gray-200 transition-all hover:bg-gray-700"
          >
            <span className="material-icons-outlined !text-2xl">pause</span>
          </button>
        </div>
      </div>

      <div className="py-8">
        <p className="text-lg font-bold">Score: {currentScore}</p>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none mt-8 grid grid-cols-1 sm:grid-cols-2 md:grip-col-4 lg:grid-cols-5 overflow-hidden text-center ">
            {albumData &&
              albumData.map((album, index) => {
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
                        album.answered &&
                          "after:content-['*'] after:bg-green-700 opacity-90"
                      )}
                      onClick={() => setSelectedAlbum(album)}
                      style={{
                        animationDelay: `${((index + 1) * 100) / 2}ms`,
                        animationFillMode: "forwards",
                        imageRendering: "pixelated",
                      }}
                      disabled={album.answered}
                    >
                      <Pixelify
                        src={album.artworkUrl}
                        pixelSize={album.answered ? 0 : 25}
                      />
                    </button>
                    {album.answered && album.success && (
                      <div className="absolute bg-green-500 inset-0 opacity-50 flex items-center justify-center">
                        <span className="material-icons-outlined !text-5xl transition-all">
                          check
                        </span>
                      </div>
                    )}
                    {album.answered && !album.success && (
                      <div className="absolute bg-red-500 inset-0 opacity-50 flex items-center justify-center">
                        <span className="material-icons-outlined !text-5xl transition-all">
                          close
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
