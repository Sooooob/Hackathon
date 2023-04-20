import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Emo from "../public/emo.png";

import { signIn, signOut, useSession } from "next-auth/react";
import { getUsersTopAlbums } from "~/lib/spotify";

export default function Home() {
  var session = useSession();

  useEffect(() => {
    // @ts-ignore
    const accessToken = session?.data?.accessToken;

    if (accessToken) {
      getUsersTopAlbums(accessToken);
    }
  }, [session]);

  return (
    <main className="flex min-h-screen flex-col items-center pt-16 px-8">
      <div className="flex w-full justify-between items-center">
        <h2 className="flex flex-grow items-center justify-center text-center text-4xl font-bold  text-white sm:text-6xl">
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
      </div>
      <div className="gap-3 flex mt-20">
        {session.status === "authenticated" ? (
          <>
            <Link href="/mood">
              <button
                type="button"
                className="bg-spotify-green w-40 rounded-md px-3.5 py-2.5 text-sm font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Game
              </button>
            </Link>
            <button
              type="button"
              className="bg-spotify-green w-40 rounded-md px-3.5 py-2.5 text-sm font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={() => signOut()}
            >
              Log out
            </button>
          </>
        ) : (
          <button
            type="button"
            className="bg-spotify-green w-40 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            title="Coming soon"
            onClick={() => signIn("spotify")}
          >
            Log in
          </button>
        )}
      </div>
      <div className="flex flex-col mt-10 items-center gap-2">
        <p className="underline underline-offset-2">How to play:</p>
        <p className="flex items-center">
          M
          <Image
            src={Emo}
            alt="o"
            className="animate-bounce"
            width={17}
            height={10}
          />
          odify will randomly generate 10 album covers from your Spotify music,
        </p>
        <p>
          it will be your job to determine the correct album and artist from a
          pixilated image.
        </p>
        <p className="underline underline-offset-2 mt-4">Rules:</p>
        <p>Each tile is worth 20 points. 10 for artist, 10 for album.</p>
        <p>A hint will cost you 5 points.</p>
        <p className="flex items-center">
          G
          <Image
            src={Emo}
            alt="o"
            className="animate-bounce"
            width={17}
            height={10}
          />
          od Luck!
        </p>
      </div>
    </main>
  );
}
