export interface Game {
    id: string;
    title: string;
    type: "remote" | "game" | "tool";
    targetUrl?: string;
    thumbnail: string;
    category: "New" | "Trending" | "Top Popular" | "Favorite Games" | "Featured";
}

export const GAMES: Game[] = [
    // --- CORE APPS ---
    {
        id: "585285885",
        title: "Steam Deck Remote",
        type: "remote",
        thumbnail: "/games/steam_share_image.jpg",
        category: "New"
    },
    {
        id: "calculator",
        title: "Graphing Calculator",
        type: "tool",
        targetUrl: "https://www.desmos.com/calculator",
        thumbnail: "/games/desmos.png",
        category: "Featured"
    },

    // --- LOCAL ASSET GAMES ---
    {
        id: "slope",
        title: "Slope",
        type: "game",
        targetUrl: "https://slopegame-online.com/",
        thumbnail: "/games/slope.webp",
        category: "Trending"
    },
    {
        id: "2048",
        title: "2048",
        type: "game",
        targetUrl: "https://www.2048.org/",
        thumbnail: "/games/2048.avif",
        category: "Featured"
    },
    {
        id: "tetris",
        title: "Tetris",
        type: "game",
        targetUrl: "https://tetris.com/play-tetris",
        thumbnail: "/games/tetris.avif",
        category: "Featured"
    },
    {
        id: "polytrack",
        title: "Polytrack",
        type: "game",
        targetUrl: "https://www.kodub.com/apps/polytrack",
        thumbnail: "/games/polytrack-m546x307.webp",
        category: "New"
    },
    {
        id: "582910321",
        title: "Minecraft",
        type: "game",
        targetUrl: "https://eaglercraft.com/",
        thumbnail: "/games/Official_Minecraft_Trailer.webp",
        category: "Top Popular"
    },
    {
        id: "582847720",
        title: "Dashmetry",
        type: "game",
        targetUrl: "https://dashmetry.com/",
        thumbnail: "/games/dashmetry-game.png",
        category: "Trending"
    },
    {
        id: "582403886",
        title: "Retro Bowl",
        type: "game",
        targetUrl: "https://retrobowl.me/",
        thumbnail: "/games/retrobowl.avif",
        category: "Top Popular"
    },
    {
        id: "582281664",
        title: "Cookie Clicker",
        type: "game",
        targetUrl: "https://cookie-clicker2.com/",
        thumbnail: "/games/cookie-clicker.jpg",
        category: "Favorite Games"
    },
    {
        id: "krunker",
        title: "Krunker.io",
        type: "game",
        targetUrl: "https://krunker.io/",
        thumbnail: "/games/krunker.jfif", // UPDATED with user provided image
        category: "Trending"
    },
];

export const getGameById = (id: string) => GAMES.find(g => g.id === id);
