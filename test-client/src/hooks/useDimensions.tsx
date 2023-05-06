import { useState, useEffect } from "react"

export const useDimensions = () => {
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);

    const handleResize = () => {
        const newScreenWidth = window.innerWidth;
        const newScreenHeight = window.innerHeight;

        if (screenWidth !== newScreenWidth) {
            setScreenWidth(newScreenWidth);
        }
        if (screenHeight !== newScreenHeight) {
            setScreenHeight(newScreenHeight);
        }
    }
    
    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [screenWidth, screenHeight]);

    return {
        screenWidth,
        screenHeight
    }
}