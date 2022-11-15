import React from "react"
import { Box, Divider, Flex, Center, Text, HStack, SimpleGrid } from "@chakra-ui/react"
import { HiDownload, HiUpload } from "react-icons/hi"
import { MdOutlineHistory } from "react-icons/md"
import { Link } from "react-router-dom"

const linkMenu = [
    { name: "Drop", icon: HiUpload, link: "/airdrop" },
    { name: "Receive", icon: HiDownload, link: "/airdrop/receive" },
    { name: "History", icon: MdOutlineHistory, link: "/airdrop/history" },
]

export default function Bottomnav() {
    return (
        <>
            <SimpleGrid columns={[1,2]} spacing={10}>
                <Box bg="tomato" height="80px"></Box>
                <Box bg="tomato" height="80px"></Box>
                <Box bg="tomato" height="80px"></Box>
                <Box bg="tomato" height="80px"></Box>
                <Box bg="tomato" height="80px"></Box>
            </SimpleGrid>
        </>
    )
}
