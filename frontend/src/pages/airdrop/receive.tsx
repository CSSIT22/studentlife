import React from "react"
import AppBody from "../../components/share/app/AppBody"
import PageBox from "../../components/airdrop/pageBox"
import { HiUpload, HiDownload } from "react-icons/hi"
import { MdOutlineHistory, MdImage, MdDone, MdOutlineClose } from "react-icons/md"
import { Container, Flex, HStack, Icon, Text, VStack, Box, Divider, Hide } from "@chakra-ui/react"
const linkMenu = [
    { name: "Drop", icon: HiUpload, to: "/airdrop" },
    { name: "Receive", icon: HiDownload, to: "/airdrop/receive" },
    { name: "History", icon: MdOutlineHistory, to: "/airdrop/history" },
]
const dummyData = [
    {
        icon: MdImage,
        name: "pic1.jpeg",
        sender: "MR.ABC DEF",
    },
    {
        icon: MdImage,
        name: "pic2.jpeg",
        sender: "MR.ABC DEF",
    },
    {
        icon: MdImage,
        name: "pic3.jpeg",
        sender: "MR.ABC DEF",
    },
]
export default function Receivedrop() {
    return (
        <AppBody secondarynav={linkMenu}>
            <PageBox pageName="receive">
                <Box mb={5}>
                    <Text fontSize={"3xl"}>Receive Files</Text>
                </Box>
                {/* component for list will coming sooner */}
                <Divider />
                <Flex direction={"row"} justifyContent={"space-around"} alignItems={"center"} py={"3"}>
                    <Box as={dummyData[0].icon} size={"3rem"} />
                    <Hide below={"md"}>
                        <Text>{dummyData[0].name}</Text>
                    </Hide>

                    <Text>{dummyData[0].sender}</Text>
                    <Box> Button Group</Box>
                </Flex>
                <Divider />
                <Flex direction={"row"} justifyContent={"space-around"} alignItems={"center"} py={"3"}>
                    <Box as={dummyData[0].icon} size={"3rem"} />
                    <Hide below={"md"}>
                        <Text>{dummyData[0].name}</Text>
                    </Hide>

                    <Text>{dummyData[0].sender}</Text>
                    <Box> Button Group</Box>
                </Flex>
                <Divider />
            </PageBox>
            {/* <BottomNav/> */}
        </AppBody>
    )
}
