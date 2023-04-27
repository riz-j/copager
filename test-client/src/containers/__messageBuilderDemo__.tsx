import { useMessageBuilder } from "hooks/useMessageBuilder"

const __messageBuilderDemo__: React.FC = () => {
    const { textMessageBuilder } = useMessageBuilder();

    const sampleMessage = textMessageBuilder({
        type: "text",
        message: "Hello there!",
        from: "182379hahwkj419238hakwe1",
        room: "khb23b1hj2b31b31231b123b1"
    })

    const handleClick = () => {
        console.log(sampleMessage);
    }
    
    return (
        <>
            <div>Demo Message Builder</div>
            <button onClick={handleClick}>Try click me and see console</button>
        </>
    )
}

export default __messageBuilderDemo__;