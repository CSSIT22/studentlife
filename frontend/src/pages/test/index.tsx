import { AiFillAccountBook } from "react-icons/ai"
import AppBody from "../../components/share/app/AppBody"

const Test = () => {
    return (
        <AppBody
            secondarynav={[
                {
                    name: "Test",
                    to: "/ad",
                    Icon: AiFillAccountBook,
                    subNav: [{ name: "Sub1", to: "/asd", Icon: AiFillAccountBook }],
                },
            ]}
        ></AppBody>
    )
}

export default Test
