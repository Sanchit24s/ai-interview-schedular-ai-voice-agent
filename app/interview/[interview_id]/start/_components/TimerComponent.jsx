"use client";
import React, { useEffect, useState } from "react";

function TimerComponent({ start }) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let timer;

        if (start) {
            timer = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            setSeconds(0);
        }

        return () => clearInterval(timer);
    }, [start]);

    const formatTime = (totalSeconds) => {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
            2,
            "0"
        );
        const secs = String(totalSeconds % 60).padStart(2, "0");
        return `${hours}:${minutes}:${secs}`;
    };

    return (
        <span className="flex gap-2 items-center">
            {formatTime(seconds)}
        </span>
    );
}

export default TimerComponent;
