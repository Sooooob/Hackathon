import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import classnames from "classnames";

const Select = ({ data, selected, onChange, label }) => {
    return (
        <Listbox value={selected} onChange={onChange}>
            {({ open }) => (
                <>
                    <div className="relative mt-2">
                        <Listbox.Button
                            className={classnames(
                                "relative cursor-pointer flex items-center justify-between w-full cursor-default rounded-md bg-black text-white pl-3 pr-4 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6",
                                open && "ring-green-600"
                            )}
                        >
                            {selected
                                ? <span className="bg-black text-white">{selected}</span>
                                : <span className="bg-black text-gray-300">{label || "..."}</span>
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
                                className="absolute mb-4 border z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-black text-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {data.map((item) => (
                                    <Listbox.Option
                                        key={item.id}
                                        className="text-black border-t relative cursor-pointer hover:bg-gray-600 select-none py-2 pl-3 pr-9"
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