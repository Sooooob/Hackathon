import Image from 'next/image'
// @ts-ignore

import Emo from '../public/emo.png'
import React from "react";
import { useSession } from "next-auth/react";

export default function Finished() {
    const session = useSession({ required: true });

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
                    />odify</h2>
            </div>

            <div className="py-8 mt-8">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 flex">
                    <div className="border-r pt-16 pr-16 w-1/2 flex flex-col items-center">
                        <h4 className="mb-4">Current Score</h4>
                        <span className="material-icons-outlined bg-green-600 rounded-lg !text-9xl">check_circle</span>
                        <p className="!text-9xl pt-8">250</p>

                    </div>
                    <div className="border-l pt-16 pb-12 pl-16 w-1/2 flex flex-col items-center">
                        <h4 className="mb-4">High Score</h4>
                        <span className="material-icons bg-green-600 rounded-lg !text-9xl">contactless</span>

                        <p className="!text-9xl pt-8">250</p>
                    </div>
                </div>
                <button className="w-32 mt-8 mx-auto max-w-7xl px-6 flex items-center justify-center bg-white text-black py-3 rounded-full text-2xl font-bold tracking-tight hover:bg-gray-100 transition-all">
                    Logout
                </button>
            </div>
        </main>
    )
}
