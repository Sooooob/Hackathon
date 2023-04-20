import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from "next/image";
import Emo from "~/public/emo.png";

type Props = {
    open: boolean,
    close: () => void
}

const RulesModal = ({ open, close }: Props) => (
    <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-500/[.95] transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel
                            className="relative transform overflow-hidden rounded-lg bg-black px-6 pb-6 pt-7 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                            <div>

                                <div className="mt-3 text-center sm:mt-5">
                                    <h3 className="text-base font-semibold leading-6 text-gray-100">
                                        How To Play
                                    </h3>
                                    <div className="flex flex-col mt-10 items-center gap-2">
                                        <p className="flex justify-center items-center">
                                            M
                                            <Image
                                                src={Emo}
                                                alt="o"
                                                className="animate-bounce"
                                                width={17}
                                                height={10}
                                            />odify

                                        </p>
                                        <p>will randomly generate 50 Album cover art images from your Spotify music,</p>
                                        <p>
                                            it will be your job to determine the correct album and artist from a pixilated image
                                        </p>
                                        <p className="underline underline-offset-2 mt-4">
                                            Rules:
                                        </p>
                                        <p>
                                            Each tile is worth 20 points. 10 for artist, 10 for album.

                                        </p>
                                        <p className="flex items-center">
                                            G
                                            <Image
                                                src={Emo}
                                                alt="o"
                                                className="animate-bounce"
                                                width={17}
                                                height={10}
                                            />od Luck!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="my-5 sm:mt-6">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-spotify-green px-3 py-2 text-sm font-semibold transition-all text-white shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={close}
                                >
                                    Close
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition.Root>
);

export { RulesModal };