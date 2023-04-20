import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Pixelify } from "react-pixelify";

type Props = {
    album?: any,
    open: boolean,
    close: () => void
}

const AlbumModal = ({ album, open, close }: Props) => {
    console.log(album)
    return (
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
                                className="relative transform overflow-hidden rounded-lg bg-gray-900 px-6 pb-6 pt-7 text-left shadow-xl
                                transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
                                <div>

                                    <div className="flex flex-col items-center mt-3 text-center sm:mt-5 w-full">
                                        <h3 className="text-base font-semibold leading-6 text-gray-100 text-3xl mb-4">
                                            Guess the Album
                                        </h3>
                                        <div className="mt-2 relative">
                                            <div className="mx-auto overflow-hidden flex items-center justify-center">
                                                <Pixelify
                                                    src={album.artworkUrl}
                                                    pixelSize={30}
                                                    width={450}
                                                    height={450}
                                                />
                                            </div>

                                            <p className="mt-8 text-gray-300">
                                                Select you Answer:
                                            </p>
                                            <ul>
                                                <li>Taylor</li>
                                                <li>Miley</li>
                                                <li>Ed</li>
                                                <li>Frank</li>
                                                <li>Billy</li>
                                            </ul>

                                            <button
                                                className=""
                                            >
                                                Go
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold transition-all text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
}

export { AlbumModal };