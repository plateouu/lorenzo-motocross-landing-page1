import { Instrument_Serif, DM_Sans, Montserrat } from "next/font/google";

export const bodyFont = Montserrat({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
});

export const displayFont = Instrument_Serif({
    weight: "400",
    subsets: ["latin"],
    style: "italic", // Correct property
    variable: "--font-display",
    display: "swap",
});
