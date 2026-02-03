import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

export const bodyFont = localFont({
    src: [
        // Upright
        { path: '../public/fonts/GT-Planar-Thin-Trial.otf', weight: '100', style: 'normal' },
        { path: '../public/fonts/GT-Planar-Light-Trial.otf', weight: '300', style: 'normal' },
        { path: '../public/fonts/GT-Planar-Regular-Trial.otf', weight: '400', style: 'normal' },
        { path: '../public/fonts/GT-Planar-Medium-Trial.otf', weight: '500', style: 'normal' },
        { path: '../public/fonts/GT-Planar-Bold-Trial.otf', weight: '700', style: 'normal' },
        { path: '../public/fonts/GT-Planar-Black-Trial.otf', weight: '900', style: 'normal' },
        // Italic (Standard 15deg)
        { path: '../public/fonts/GT-Planar-Italic-15-Thin-Trial.otf', weight: '100', style: 'italic' },
        { path: '../public/fonts/GT-Planar-Italic-15-Light-Trial.otf', weight: '300', style: 'italic' },
        { path: '../public/fonts/GT-Planar-Italic-15-Regular-Trial.otf', weight: '400', style: 'italic' },
        { path: '../public/fonts/GT-Planar-Italic-15-Medium-Trial.otf', weight: '500', style: 'italic' },
        { path: '../public/fonts/GT-Planar-Italic-15-Bold-Trial.otf', weight: '700', style: 'italic' },
        { path: '../public/fonts/GT-Planar-Italic-15-Black-Trial.otf', weight: '900', style: 'italic' },
    ],
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
