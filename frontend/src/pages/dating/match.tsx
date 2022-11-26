import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "src/function/API"
import DatingAppBody from "../../components/dating/DatingAppBody"

const DatingMatch = () => {
    const didMount = useDidMount()
    const navigate = useNavigate()

    useEffect(() => {
        if (didMount) {
            API.get("/dating/verifyEnroll/getDatingEnroll").then((datingEnroll) => {
                API.get("/dating/verifyEnroll/getDatingOptions").then((datingOptions) => {
                    if (!datingEnroll.data.hasCompleteSetting) {
                        navigate("/dating/interests")
                        if (!datingOptions.data.userId) {
                            // navigate("/dating/option")
                            if (!datingEnroll.data.hasCompleteTutorial) {
                                navigate("/dating/tutorial")
                            }
                        }
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
