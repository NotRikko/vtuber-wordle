import React, { useState, useEffect } from 'react';

function TimeUntilReset() {
    const [timeLeft, setTimeLeft] = useState(null);

    const calculateTimeUntilMidnight = () => {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);

        const timeUntilMidnight = midnight - now;
        return timeUntilMidnight;
    };

    useEffect(() => {
        const calculateAndSetTimeLeft = () => {
            const timeUntilMidnight = calculateTimeUntilMidnight();
            setTimeLeft(timeUntilMidnight);
        };

        calculateAndSetTimeLeft();

        const intervalId = setInterval(() => {
            calculateAndSetTimeLeft();
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []); 

    if (timeLeft === null) {
        return (
            <div>
                <h2>Calculating Time Left...</h2>
            </div>
        );
    }

    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return (
        <div>
            <h2>Time Left Until Reset</h2>
            <p>{`${hours} hours ${minutes} minutes ${seconds} seconds`}</p>
        </div>
    );
}

export default TimeUntilReset;