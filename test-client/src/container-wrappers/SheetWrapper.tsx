import { ReactNode, useState, useEffect, createContext } from "react";

export const SheetWrapperContext = createContext({
    handleCloseSheet: () => {}
})

interface SheetWrapperProps {
    children: ReactNode;
    setShowSheet: (showSheet: boolean) => void
}

const SheetWrapper = (props: SheetWrapperProps) => {
    const [isShown, setIsShown] = useState<boolean>(false);

    useEffect(() => {

        setIsShown(true);
    }, []);

    const handleCloseSheet = () => {
        setIsShown(false);
        setTimeout(() => {
            props.setShowSheet(false);
        }, 500);
    }

    return (
        <div className={`fixed bottom-0 w-full h-screen bg-pink-200 transition-transform 
                        duration-500 ${isShown ? 'translate-y-0' : 'translate-y-full'}`}>
            <button 
                className="absolute top-2 right-2 bg-purple-500 p-5 z-30"
                onClick={handleCloseSheet}
            >Closeee</button>

            <SheetWrapperContext.Provider value={{ handleCloseSheet }}>
                {props.children}
            </SheetWrapperContext.Provider>
        </div>
    )

}

export default SheetWrapper;