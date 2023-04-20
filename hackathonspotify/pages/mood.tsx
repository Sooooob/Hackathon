import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
]
export default function Mood() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between py-16 px-24">
            <div></div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Moodify</h2>
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
