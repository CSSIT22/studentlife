import React, { useState } from "react"
import AppBody from "../../components/share/app/AppBody"
import PageBox from "../../components/airdrop/pageBox"
import { HiUpload, HiDownload } from "react-icons/hi"
import { MdOutlineHistory, MdImage } from "react-icons/md"
import { Container, Flex, Box, Text, Divider, Hide } from "@chakra-ui/react"
const linkMenu = [
    { name: "Drop", icon: HiUpload, to: "/airdrop" },
    { name: "Receive", icon: HiDownload, to: "/airdrop/receive" },
    { name: "History", icon: MdOutlineHistory, to: "/airdrop/history" },
]
const dummyData = [
    {
        icon: MdImage,
        name: "pic1.jpeg",
        type: HiDownload,
        date: "10/10/2021 10:43:00",
    },
]
export default function Drophistory() {
    return (
        <AppBody secondarynav={linkMenu}>
            <PageBox pageName="history"
            >
                <Box mb={3}>
                    <Text fontSize={"3xl"}>History</Text>
                </Box>
                {/* component for list will coming sooner */}
                <Divider orientation="horizontal" />
                <Flex direction={"row"} justifyContent={"space-around"} alignItems={"center"} py={"3"}>
                    <Box as={dummyData[0].icon} size={"3rem"} />
                    <Hide below={"md"}>
                        <Text>{dummyData[0].name}</Text>
                    </Hide>
                    <Box as={dummyData[0].type} size={"2rem"} />
                    <Text color={"gray.400"}>{dummyData[0].date}</Text>
                    <Box> info</Box>
                </Flex>
                <Divider orientation="horizontal" />
                <Flex direction={"row"} justifyContent={"space-around"} alignItems={"center"} py={"3"}>
                    <Box as={dummyData[0].icon} size={"3rem"} />
                    <Hide below={"md"}>
                        <Text>{dummyData[0].name}</Text>
                    </Hide>
                    <Box as={HiUpload} size={"2rem"} />
                    <Text color={"gray.400"}>{dummyData[0].date}</Text>
                    <Box> info</Box>
                </Flex>
                <Divider orientation="horizontal" />
                <Flex direction={"row"} justifyContent={"space-around"} alignItems={"center"} py={"3"}>
                    <Box as={dummyData[0].icon} size={"3rem"} />
                    <Hide below={"md"}>
                        <Text>{dummyData[0].name}</Text>
                    </Hide>
                    <Box as={dummyData[0].type} size={"2rem"} />
                    <Text color={"gray.400"}>{dummyData[0].date}</Text>
                    <Box> info</Box>
                </Flex>

                <Divider orientation="horizontal" />
            </PageBox>
        </AppBody>
    )
}
