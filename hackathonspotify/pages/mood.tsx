import Image from 'next/image'
// @ts-ignore
import { Pixelify } from "react-pixelify";

import Emo from '../public/emo.png'
import React, { useEffect, useState } from "react";
import { RulesModal } from "~/components/RulesModal";
import { AlbumModal } from "~/components/AlbumModal";
import { useSession } from "next-auth/react";
import { Album, getUsersTopAlbums } from "~/lib/spotify";

const SpotifyAlbums = [
    { id: 1, domainantColour: '#000000', image: "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png?20140818215455" },
    { id: 2, domainantColour: '#000000', image: "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png?20140818215455", },
    { id: 3, domainantColour: '#000000', image: "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png?20140818215455", },
    { id: 4, domainantColour: '#000000', image: "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png?20140818215455" },
    { id: 5, domainantColour: '#000000', image: "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png?20140818215455", },
    { id: 6, domainantColour: '#000000', image: "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png?20140818215455", },
    { id: 7, domainantColour: '#000000', image: "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png?20140818215455", },
    { id: 8, domainantColour: '#000000', image: "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png?20140818215455", },
    { id: 9, domainantColour: '#000000', image: "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png?20140818215455", },
    { id: 10, domainantColour: '#000000', image: "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png?20140818215455", }
];

export default function Mood() {
    const session = useSession({ required: true });

    const [play, setPlay] = useState(true);
    const [time, setTime] = useState({ m: 0, s: 0 });
    const [selectedAlbum, setSelectedAlbum] = useState<any>(undefined);
    const [albumData, setAlbumData] = useState<Album[]>();
    const [openRulesModal, setOpenRulesModal] = useState(false)

    const getAlbumData = async () => {
        // @ts-ignore
        const accessToken = session?.data?.accessToken;
        if (accessToken) {
            const data = await getUsersTopAlbums(accessToken);
            setAlbumData(data);
        }
    }

    useEffect(() => {
        getAlbumData();
    }, [session]);

    useEffect(() => {
        const interval = setInterval(function () {
            if(play) {
                if (time.s === 59) {
                    setTime({ s: 0, m: time.m + 1 });
                } else {
                    setTime({ s: time.s + 1, m: time.m })
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [time, play]);

    const togglePlay = () => {
        setPlay(!play);
    }

    const toggleRulesModal = () => {
        togglePlay();
        setOpenRulesModal(!openRulesModal);
    }

    function removeSelectedAlbum() {
        setSelectedAlbum(null);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between py-16 px-8 lg:px24 transition-all">
            <div className="flex w-full justify-between items-center">
                <div className="flex items-center">
                    <span className="material-icons-outlined !text-4xl hover:text-gray-500 transition-all">timer</span>
                    <span className="pl-4 font-bold">{time.m.toString().padStart(2, '0')}: {time.s.toString().padStart(2, '0')}</span>
                </div>

                <h2 className="flex flex-grow items-center justify-center text-center text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    M
                    <Image
                        src={Emo}
                        alt="o"
                        className="px-1 pt-4"
                        width={50}
                        height={14}
                    />odify</h2>

                <div className="flex gap-3 items-center">
                    <button
                        className="border rounded-full w-12 h-12 hover:text-gray-500 transition-all"
                        onClick={toggleRulesModal}
                    >
                        <span className="material-icons-outlined !text-3xl">question_mark</span>
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
                        {albumData && albumData.map((album, index) => {
                            return(
                                <div
                                    key={album.albumId}
                                    className="w-52 h-52 card"
                                    style={{ animationDelay: `${((index + 1) * 100) / 2}ms` }}
                                >
                                    <button
                                        type="button"
                                        className={`flex justify-center items-center w-52 h-52 bg-contain shadow-inner hover:shadow-lg relative overflow-hidden cardInner opacity-0 `}
                                        onClick={() => setSelectedAlbum(album)}
                                        style={{ animationDelay: `${((index + 1) * 100) / 2}ms`, animationFillMode: "forwards", imageRendering: "pixelated", }}

                                    >
                                        <Pixelify
                                            src={album.artworkUrl}
                                            pixelSize={25}
                                        />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <RulesModal open={openRulesModal} close={toggleRulesModal} />
            {selectedAlbum && <AlbumModal album={selectedAlbum} open={!!selectedAlbum} close={removeSelectedAlbum} />}
        </main>
    )
}
