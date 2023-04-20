import Image from 'next/image'

import Emo from '../public/emo.png'


const SpotifyAlbums = [
    { id: 1, domainantColour: '#000000', },
    { id: 2, domainantColour: '#000000', },
    { id: 3, domainantColour: '#000000', },
    { id: 4, domainantColour: '#000000', },
    { id: 5, domainantColour: '#000000', },
    { id: 6, domainantColour: '#000000', },
    { id: 7, domainantColour: '#000000', },
    { id: 8, domainantColour: '#000000', },
    { id: 9, domainantColour: '#000000', },
    { id: 10, domainantColour: '#000000', },
    { id: 11, domainantColour: '#000000', },
    { id: 12, domainantColour: '#000000', },
    { id: 13, domainantColour: '#000000', },
    { id: 14, domainantColour: '#000000', },
    { id: 15, domainantColour: '#000000', },
    { id: 16, domainantColour: '#000000', },
    { id: 17, domainantColour: '#000000', },
    { id: 18, domainantColour: '#000000', },
    { id: 19, domainantColour: '#000000', },
    { id: 20, domainantColour: '#000000', },
    { id: 21, domainantColour: '#000000', },
]
export default function Mood() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between py-16 px-24">
            <h2 className="flex text-4xl font-bold tracking-tight text-white sm:text-6xl">
                M
                <Image
                src={Emo}
                alt="o"
                className="px-1 pt-4"
                width={50}
                height={14}
            />odify</h2>
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-none mt-8 grid grid-cols-1 gap-0.5 overflow-hidden text-center sm:grid-cols-2 lg:grid-cols-6">
                        {SpotifyAlbums.map((album) => (
                            <div
                                key={album.id}
                                className="flex justify-center items-center w-40 h-40 bg-white/5 p-8 border"
                            >
                                here
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
