import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

const Select = ({ data, selected, onChange, label }) => {
    return (
        <Listbox value={selected} onChange={onChange}>
            {({ open }) => (
                <>
                    <div className="relative mt-2">
                        <Listbox.Button
                            className="relative flex items-center justify-between w-full cursor-default rounded-md bg-gray-900 text-white pl-3 pr-4 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            {selected
                                ? <span className="bg-gray-900 text-white">{selected}</span>
                                : <span className="bg-gray-900 text-gray-300">{label || "..."}</span>
                            }
                            <span className="material-icons-outlined !text-3xl hover:text-gray-500 transition-all">{open ? "arrow_drop_up" : "arrow_drop_down"}</span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute border z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-900 text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {data.map((item) => (
                                    <Listbox.Option
                                        key={item.id}
                                        className="text-gray-900 border-t relative cursor-pointer hover:bg-gray-600 select-none py-2 pl-3 pr-9"
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span className={"font-normal text-white block truncate"}>
                                                  {item.name}
                                                </span>
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}

export { Select };