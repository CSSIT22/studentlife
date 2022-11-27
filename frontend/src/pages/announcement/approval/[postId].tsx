import {
    Flex,
    Spacer,
    Heading,
    Text,
    Stack,
    Box,
    ButtonGroup,
    Button,
    Alert,
    AlertIcon,
    useControllableState,
    Show,
    useBoolean,
} from "@chakra-ui/react"
import React, { Children, FC, useEffect } from "react"
import { GrClose } from "react-icons/gr"
import { Link, useParams } from "react-router-dom"
import ModalForEvent from "../../../components/annoucement/ModalForEvent"
import AppBody from "../../../components/share/app/AppBody"
import { post } from "@apiType/announcement"
import { postInfoTest } from "../postInfoTest"
import API from "src/function/API"

const approvalDetail = () => {
    const [isError, { on }] = useBoolean()
    const params = useParams()
    // console.log(params)
    // const postId = parseInt(params + "")
    // const post = postInfoTest.filter((el) => {
    //     return el.postId == parseInt(params + "")
    // }

    const [post, setpost] = React.useState<post[]>([])
    const [targetType, setTargetType] = React.useState()
    const [targetValue, setTargetValue] = React.useState()
    const [topic, setTopic] = React.useState()
    const [sender, setSender] = React.useState<string>("")
    const [detail, setDetail] = React.useState()

    async function getPost() {
        const getData = await API.get("/announcement/getdetailedit/" + params.postId)
        // console.log("test3")
        // console.log(getData.data[0].annFilter.filterType)
        setTargetType(getData.data[0].annFilter.filterType)
        setTargetValue(getData.data[0].annFilter.value)
        setTopic(getData.data[0].annLanguage[0].annTopic)
        const name = getData.data[0].annCreator.fName +" "+ getData.data[0].annCreator.lName
        // console.log(getData.data[0].annCreator.fName)
        setSender(name)
        setDetail(getData.data[0].annLanguage[0].annDetail)
        // console.log(detail)
    }

    useEffect(() => {
        getPost()
    }, [])

    // useEffect(() => {
    //     getData.then((item) => setpost(item.data)).catch((err) => on())
    // }, [])

    // const targetType = post.map((el) => el.targetType)
    // const targetValue = post.map((el)=> el.targetValue)
    // console.log(targetType[0], targetValue[0])

    const changeStatus = (status: string) => {
        if (status == "Approve") {
            API.post<post>("/announcement/editstatusonapprove", { postId: params.postId, status: status, isapprove: true })
            API.post<post>("/announcement/gettargetgroup", { postId: params.postId, targetType: targetType, targetValue: targetValue })
        } else if (status == "Disapprove") {
            API.post<post>("/announcement/editstatusonapprove", { postId: params.postId, status: status, isapprove: false })
        }
    }

    return (
        <AppBody
            secondarynav={[
                { name: "Announcement", to: "/announcement" },
                { name: "Approval", to: "/announcement/approval" },
                { name: "History", to: "/announcement/history" },
                { name: "Recycle bin", to: "/announcement/recyclebin" },
            ]}
            p={{ md: "3rem" }}
        >
            <Flex alignItems={"center"}>
                <Show below="lg">
                    <Text as={"b"} fontSize="xl">
                        <Link to="/announcement/approval">
                            <GrClose />
                        </Link>
                    </Text>
                </Show>
                {/* <Spacer /> */}
            </Flex>
            <Stack spacing={3} p="5">
                <Heading as="h2" size="xl">
                    {topic}
                </Heading>
                <Box>
                    <Text fontSize="md">Sender: {sender}</Text>
                    <Text fontSize="md">
                        To: {targetType} {targetValue}
                    </Text>
                </Box>
                <Box>
                    <Text fontSize="sm" align="justify">
                        {detail}
                    </Text>
                </Box>
            </Stack>
            <Box width="100%" p="5" mt="14">
                <Flex justifyContent={"space-between"}>
                    <Link to={"/announcement/approval"}>
                        <Button bg={"#38A169"} color={"white"} shadow={"md"} onClick={() => changeStatus("Approve")} >
                            Approve
                        </Button>
                    </Link>
                    <Link to={"/announcement/approval"}>
                        <Button bg={"#E53E3E"} color={"white"} shadow={"md"} onClick={() => changeStatus("Disapprove")}>
                            Disapprove
                        </Button>
                    </Link>
                </Flex>
            </Box>
        </AppBody>
    )
}


{/* <Box width="100%" p="5" mt="14">
<Flex justifyContent={"space-between"}>
    <Link to={"/announcement/approval"}>
        <Button bg={"#38A169"} color={"white"} shadow={"md"} onClick={() => changeStatus("Approve")}>
            Approve
        </Button>
    </Link>
    <Link to={"/announcement/approval"}>
        <Button bg={"#E53E3E"} color={"white"} shadow={"md"} onClick={() => changeStatus("Disapprove")}>
            Disapprove
        </Button>
    </Link>
</Flex>
</Box>
</AppBody> */}
export default approvalDetail
