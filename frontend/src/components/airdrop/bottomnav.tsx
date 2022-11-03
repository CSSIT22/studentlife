import React from "react"
import { Box, Divider, Flex, Center, Text } from "@chakra-ui/react"
import { HiDownload, HiUpload } from "react-icons/hi"
import { MdOutlineHistory } from "react-icons/md"
import { Link } from "react-router-dom"

const linkMenu = [
    { name: "Drop", icon: HiUpload, link: "/airdrop" },
    { name: "Receive", icon: HiDownload, link: "/airdrop/receive" },
    { name: "History", icon: MdOutlineHistory, link: "/airdrop/history" }
    
]

export default function Bottomnav() {
    return (
        <>
            <Flex align={"center"} justify={"center"}>
                <Flex
                    justifyContent={"space-around"}
                    alignItems={"center"}
                    flexDirection={"row"}
                    border={"1px"}
                    borderRadius={"50px"}
                    borderColor={"blackAlpha.300"}
                    w={"65%"}
                >
                    {linkMenu.map((item, index) => (
                        <Link to={item.link} key={index}>
                            <Center
                                flexDirection={"column"}
                                p={2}
                                borderRadius={"50px"}
                                _hover={{
                                    bg: "blackAlpha.100",
                                }}
                            >
                                <Box as={item.icon} size={"1.5rem"} />
                                <Text fontSize={"md"}>{item.name}</Text>
                            </Center>
                        </Link>
                    ))}
                </Flex>
            </Flex>
        </>
    )
}
