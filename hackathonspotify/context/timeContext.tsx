import React from "react";
import { ReactNode, useContext, useEffect, useState } from "react";

export interface TimeContextState {
    currentTimer: string;

    toggleTimer(): void;
}

const TimeContext = React.createContext({} as TimeContextState);

const useTimeContext = () => useContext(TimeContext);

const TimeContextProvider = ({ children, }: {
    children: ReactNode | ReactNode[];
}) => {
    const [play, setPlay] = useState(true);
    const [time, setTime] = useState({ m: 0, s: 0 });

    const handleTimeOver = () => {
        if (play) {
            setPlay(!play);
        }
    };

    useEffect(() => {
        const interval = setInterval(function () {
            if (play) {
                if (time.s === 59) {
                    setTime({ s: 0, m: time.m + 1 });
                } else {
                    setTime({ s: time.s + 1, m: time.m });
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [time, play]);

    const togglePlay = () => {
        setPlay(!play);
    };


    return (
        <TimeContext.Provider
            value={{
                currentTimer: time.m.toString().padStart(2, "0") + " " + time.s.toString().padStart(2, "0"),
                toggleTimer: togglePlay,
            }}
        >
            {children}
        </TimeContext.Provider>
    );
};

export { useTimeContext, TimeContextProvider };
