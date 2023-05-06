import { ReactNode, useState, useEffect, createContext } from "react";
import close_circle from "assets/close-button.svg"

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

        return () => {
            console.log("AAAND I'M OUT");
        }
    }, []);

    const handleCloseSheet = () => {
        setIsShown(false);
        setTimeout(() => {
            props.setShowSheet(false);
        }, 500);
    }

    return (                                                                           
        <div className={`fixed bottom-0 w-full h-screen bg-pink-200 transition-transform 
                        duration-500 border-2 ${isShown ? 'translate-y-0' : 'translate-y-full'}`}>
            <img 
                src={close_circle}
                onClick={handleCloseSheet}
                className="absolute top-5 right-5 z-30 w-12 h-12 cursor-pointer
                            lg:right-auto lg:left-5"
            />

            <SheetWrapperContext.Provider value={{ handleCloseSheet }}>
                {props.children}
            </SheetWrapperContext.Provider>
        </div>
    )

}

export default SheetWrapper;