import React, { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getUsersSavedAlbums, getUsersTopItems } from "~/lib/spotify";

export default function Home() {
  var session = useSession({ required: true });

  useEffect(() => {
    // @ts-ignore
    const accessToken = session?.data?.accessToken;

    if (accessToken) {
      getUsersTopItems(accessToken);
    }
  }, [session]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-6xl">
            Welcome to Moodify!
          </h1>
        </div>
      </div>
      <div className="gap-3 flex">
        <Link href="/auth">
          <button
            type="button"
            className="w-40 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled
            title="Coming soon"
          >
            Auth
          </button>
        </Link>
        <Link href="/mood">
          <button
            type="button"
            className="w-40 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Mood board
          </button>
        </Link>
        {session.status === "authenticated" && (
          <Link href="/api/auth/signout">
            <button
              type="button"
              className="w-40 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign out
            </button>
          </Link>
        )}
      </div>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]"></div>
    </main>
  );
}
