import { useContext, useEffect, useState } from "react"
import { Box, Text, Flex, Stack, Hide } from "@chakra-ui/react"
import { authContext } from "src/context/AuthContext"
import Card from "../../../components/backendService/Card"
import AppBody from "../../../components/share/app/AppBody"
import RenderTokens from "src/components/backendService/RenderTokens"
import api from "../../../function/API"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

const index = () => {
    const user = useContext(authContext)
    const [tokens, setTokens] = useState<any[]>([])
    let dateLogin = new Date()

    // handle click button on revoke
    async function handleRevoke(token: string) {
        const res = await api.delete("/backendservice/revokeTokens", {
            data: {
                token: token,
                userId: tokens[0].userId,
            },
        })
        if (res.data.isLogoutCurrentDevice) {
            await api.get("auth/logout")
        } else setTokens([...tokens.filter((item) => item.token !== res.data.token)])
        console.log(res)
    }

    // fetch user's data
    async function getTokensInfo() {
        const getTokens = await api.get("/backendservice/tokens")
        let tokenArr = getTokens.data.tokens
        const currentDeviceTokenIndex = tokenArr.findIndex((item: { currentDevice: boolean }) => item.currentDevice)
        const currentDeviceToken = tokenArr[currentDeviceTokenIndex]
        tokenArr.splice(currentDeviceTokenIndex, 1)
        tokenArr.unshift(currentDeviceToken)
        setTokens(tokenArr)
        dateLogin = tokens.filter((item) => item.currentDevice)[0].detail.loginDate
    }

    useEffect(() => {
        getTokensInfo()
    }, [])

    console.log(tokens)

    return (
        <AppBody>
            <Hide below="sm">
                <Box w="100%" p={4} color="black">
                    <Flex justify={"end"}>
                        <Stack>
                            <Text as={"b"} fontSize="3xl">
                                Welcome! {user?.fName} {user?.lName}
                            </Text>
                            <Text alignSelf={"end"} fontSize="xl">
                                {dateLogin.toISOString().substring(0, 10)}
                            </Text>
                        </Stack>
                    </Flex>
                </Box>
            </Hide>
            {/* <Hide below="sm"> */}
            <Box w="100%" p={4} color="black">
                <Text as={"b"} fontSize="3xl">
                    Device Statistics
                </Text>
                <Stack direction={["column", "row"]} p={4} justify={"space-between"}>
                    <Card title={tokens.length} detail="Total Devices" />
                </Stack>
            </Box>
            {/* </Hide> */}
            <Box p={4}>
                <Text as={"b"} fontSize="3xl" color="black">
                    Overview
                </Text>
                <Box pt={8} px={[0, 0, 50, 100]}>
                    <RenderTokens tokens={tokens} handleRevoke={handleRevoke} />
                </Box>
            </Box>
        </AppBody>
    )
}

export default index
