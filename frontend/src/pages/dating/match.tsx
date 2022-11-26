import { useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "src/function/API"
import DatingAppBody from "../../components/dating/DatingAppBody"

const DatingMatch = () => {
    const didMount = useDidMount()
    const navigate = useNavigate()
    const toast = useToast()
    let count = 1
    useEffect(() => {
        if (didMount && count != 0) {
            count--
            API.get("/dating/verifyEnroll/getDatingEnroll").then((datingEnroll) => {
                API.get("/dating/verifyEnroll/getDatingOptions")
                    .then((datingOptions) => {
                        if (!datingEnroll.data.hasCompleteTutorial) {
                            toast({
                                title: "Welcome!",
                                status: "info",
                                duration: 5000,
                                isClosable: true,
                                position: "top",
                                description: "Complete the tutorial, option setting, and interests selection to start using Dating & Finding Friend."
                            })
                            navigate("/dating/tutorial");
                        }
                        else if (!datingOptions.data.userId) {
                            navigate("/dating/option")
                            toast({
                                title: "Option Setting Incomplete!",
                                status: "warning",
                                duration: 5000,
                                isClosable: true,
                                position: "top",
                                description: "You are required to set your option first before using Dating & Finding Friend."
                            })
                        }
                        else if (!datingEnroll.data.hasCompleteSetting) {
                            toast({
                                title: "Interests Selection Incomplete!",
                                status: "warning",
                                duration: 5000,
                                isClosable: true,
                                position: "top",
                                description: "You are required to skip or select your interests first before using Dating & Finding Friend."
                            })
                            navigate("/dating/interests")
                        }

                    })
            })
        }
    })

    function useDidMount() {
        const [didMount, setDidMount] = useState(true)
        useEffect(() => {
            setDidMount(false)
        }, [])

        return didMount
    }

    return <DatingAppBody>You are match with</DatingAppBody>
}

export default DatingMatch
