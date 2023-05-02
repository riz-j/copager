import { DataContext } from "contexts/DataContext";
import React, { useContext, useMemo, useEffect } from "react";

/* This is how you use DataContext to get Messages */
const __messageDataContext: React.FC = () => {
    const messages = useContext(DataContext).messages;

    // useEffect(() => {
    //     console.log(`FROM __messageDataContext: ${JSON.stringify(messages)}`)
    // }, [useMemo(() => [messages], [messages])])

    return (
        <div>

        </div>
    )
}

export default __messageDataContext;