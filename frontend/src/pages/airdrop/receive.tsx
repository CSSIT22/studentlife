import React from "react"
import AppBody from "../../components/share/app/AppBody"
import { HiUpload, HiDownload } from "react-icons/hi"
import { MdOutlineHistory, MdImage } from "react-icons/md"
import { Container, Flex, HStack, Icon, Text, VStack, Box, Divider } from "@chakra-ui/react"
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
            <Flex
                backgroundColor={"snow"}
                borderRadius={"50px"}
                minHeight={"auto"}
                px={10}
                py={"5%"}
                flexDirection={"column"}
                w={["100%"]}
                m={"auto"}
                // change height later
                h={"60vh"}
                shadow={"md"}
                mt={["25%", "15%", "5%"]}
                border={"1px"}
                borderColor={"gray.200"}
            >
                <Box mb={5}>
                    <Text fontSize={"3xl"}>Receive Files</Text>
                </Box>
                {/* dummydatawill map to this component */}
                <Divider w={'30%'}/>
                <Flex direction={"row"} justifyContent={"space-around"}>
                    <Box as={dummyData[0].icon} size={"3rem"} />
                    <Text>{dummyData[0].name}</Text>
                    <Text>{dummyData[0].sender}</Text>
                    <Box> Button Group</Box>
                </Flex>
                <Flex direction={"row"} justifyContent={"space-around"}>
                    <Box as={dummyData[0].icon} size={"3rem"} />
                    <Text>{dummyData[0].name}</Text>
                    <Text>{dummyData[0].sender}</Text>
                    <Box> Button Group</Box>
                </Flex>
                <Divider/>
            </Flex>
            {/* <BottomNav/> */}
        </AppBody>
    )
}
