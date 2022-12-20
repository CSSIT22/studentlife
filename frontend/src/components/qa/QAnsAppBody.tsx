import { useBreakpointValue } from "@chakra-ui/react"
import { useContext } from "react"
import AppBody from "../share/app/AppBody"
import { authContext } from "src/context/AuthContext"

const QAnsAppBody = (props: any) => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    const user = useContext(authContext);

    return (
        <AppBody
            secondarynav={[
                {
                    name: "Q&A Feed",
                    to: "/qa",
                },
                {
                    name: "Create Q&A",
                    to: "/qa/create",
                },
                {
                    name: "My Questions",
                    to: `/qa/myquestions/${user.userId}`,
                },
            ]}
        >
            {props.children}
        </AppBody>
    )
}

export default QAnsAppBody
