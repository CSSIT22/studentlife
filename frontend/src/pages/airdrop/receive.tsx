import React from "react"
import AppBody from "../../components/share/app/AppBody"
import PageBox from "../../components/airdrop/pageBox"
import { HiUpload, HiDownload } from "react-icons/hi"
import { MdOutlineHistory, MdImage, MdDone, MdOutlineClose, MdInfoOutline } from "react-icons/md"
import { Container, Flex, HStack, Icon, Text, VStack, Box, Divider, Hide, IconButton } from "@chakra-ui/react"
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
                <Flex direction={"row"} justifyContent={"space-around"} alignItems={"center"} py={"3"} gap={3}>
                    <Box as={dummyData[0].icon} size={"3rem"} />
                    <Hide below={"md"}>
                        <Text>{dummyData[0].name}</Text>
                    </Hide>

                    <Text fontSize={["0.76rem","md"]}>{dummyData[0].name}</Text>

                    <HStack>
                        <IconButton
                            aria-label="accept"
                            icon={<MdDone />}
                            rounded={"3xl"}
                            border={"1px"}
                            borderColor={"gray.300"}
                            shadow={"xs"}
                            bgColor={"white"}
                        ></IconButton>
                        <IconButton
                            aria-label="deny"
                            icon={<MdOutlineClose />}
                            rounded={"3xl"}
                            border={"1px"}
                            borderColor={"gray.300"}
                            shadow={"xs"}
                            bgColor={"white"}
                        ></IconButton>
                        <IconButton
                            aria-label="infomation"
                            icon={<MdInfoOutline />}
                            rounded={"3xl"}
                            border={"1px"}
                            borderColor={"gray.300"}
                            shadow={"xs"}
                            bgColor={"white"}
                        ></IconButton>
                    </HStack>
                </Flex>
                <Divider />
                <Flex direction={"row"} justifyContent={"space-around"} alignItems={"center"} py={"3"} w={"100%"}>
                    <Box as={dummyData[0].icon} size={"3rem"} />
                    <Hide below={"md"}>
                        <Text>{dummyData[0].name}</Text>
                    </Hide>

                    <Text fontSize={["0.76rem","md"]}>{dummyData[0].name}</Text>
                    <HStack>
                        <IconButton
                            aria-label="accept"
                            icon={<MdDone />}
                            rounded={"3xl"}
                            border={"1px"}
                            borderColor={"gray.300"}
                            shadow={"xs"}
                            bgColor={"white"}
                        ></IconButton>
                        <IconButton
                            aria-label="deny"
                            icon={<MdOutlineClose />}
                            rounded={"3xl"}
                            border={"1px"}
                            borderColor={"gray.300"}
                            shadow={"xs"}
                            bgColor={"white"}
                        ></IconButton>
                        <IconButton
                            aria-label="infomation"
                            icon={<MdInfoOutline />}
                            rounded={"3xl"}
                            border={"1px"}
                            borderColor={"gray.300"}
                            shadow={"xs"}
                            bgColor={"white"}
                            
                        ></IconButton>
                    </HStack>
                </Flex>
                <Divider />
            </PageBox>
            {/* <BottomNav/> */}
        </AppBody>
    )
}
