'use client';

import { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+[]{}|;:,.<>?';

export default function ScrambleText({
    text,
    duration = 3000,
    className
}: {
    text: string;
    duration?: number;
    className?: string;
}) {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let interval: NodeJS.Timeout;
        const startTime = Date.now();

        interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const scrambled = text.split('').map((char, index) => {
                // If we've passed the "progress point" for this character, reveal it
                if (index / text.length < progress) {
                    return char;
                }
                // Otherwise, show a random char (if it's not a space)
                if (char === ' ') return ' ';
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            }).join('');

            setDisplayText(scrambled);

            if (progress >= 1) {
                clearInterval(interval);
            }
        }, 50); // Scramble speed

        return () => clearInterval(interval);
    }, [text, duration]);

    return <span className={`inline-block whitespace-nowrap ${className}`}>{displayText}</span>;
}
