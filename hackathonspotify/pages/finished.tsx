import Image from "next/image";
import Emo from "../public/emo.png";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useGameContext } from "~/context/gameContext";
import Link from "next/link";
import { useTimeContext } from "~/context/timeContext";
import { useRouter } from "next/router";

export default function Finished() {
  const router = useRouter();
  const session = useSession({ required: true });
  const { highscore, currentScore, reset } = useGameContext();
  const { toggleTimer, currentTimer } = useTimeContext();

  useEffect(() => {
    toggleTimer();
  }, []);

  const onClickHome = () => {
    reset();
    router.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center pt-16 px-8 transition-all">
      <div className="flex w-full justify-between items-center">
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
      </div>

      <div className="pb-4 mt-8 font-bold">
        Congratulations, here are your scores:
      </div>

      <div className="mt-2">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex">
          <div className="border-r pt-16 pr-16 w-1/2 flex flex-col items-center">
            <h4 className="mb-4">Current Score</h4>
            <span className="material-icons-outlined bg-green-600 p-2 rounded-lg !text-9xl">
              check_circle
            </span>
            <p className="!text-9xl pt-8">{currentScore}</p>
            <p className="!text-1xl italic pt-8">Time taken: {currentTimer}</p>
          </div>

          <div className="border-l pt-16 pb-20 pl-16 w-1/2 flex flex-col items-center">
            <h4 className="mb-4">High Score</h4>
            <span className="material-icons bg-green-600 p-2 rounded-lg !text-9xl">
              star
            </span>

            <p className="!text-9xl pt-8">{highscore}</p>
            <p className="!text-1xl italic pt-8">Total time: {currentTimer}</p>
          </div>
        </div>

        <div className="flex justify-center gap-16">
          <button
            onClick={() => onClickHome()}
            className="w-32 mt-8 max-w-7xl px-6 flex items-center justify-center bg-white text-black py-3 rounded-full text-2xl font-bold tracking-tight hover:bg-gray-100 transition-all"
          >
            Home
          </button>

          <div>
            <button className="w-32 mt-8 max-w-7xl px-6 flex items-center justify-center bg-white text-black py-3 rounded-full text-2xl font-bold tracking-tight hover:bg-gray-100 transition-all">
              Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
