import React, { useState } from "react"
import AppBody from "../../components/share/app/AppBody"
import { HiUpload, HiDownload } from "react-icons/hi"
import { MdOutlineHistory,MdImage} from "react-icons/md"
import { Container, Flex, Box, Text, Divider } from "@chakra-ui/react"
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
      date: "2021-10-10 10:10:10",
  },
]
export default function Drophistory() {
    return (
        <AppBody secondarynav={linkMenu}>
           <Flex
                backgroundColor={"#e4e4e4"}
                borderRadius={"50px"}
                minHeight={"auto"}
                px={10}
                py={"5%"}
                flexDirection={"column"}
                w={["100%"]}
                // change height later
                h={"60vh"}
                m={"auto"}
                mt={["25%","15%","5%"]}
            >
              <Box mb={3}>
                <Text fontSize={"3xl"}>History</Text>
              </Box>
              <Divider orientation='horizontal' />
              <Flex direction={"row"} justifyContent={"space-around"}>
                    <Box as={dummyData[0].icon} size={"3rem"} />
                    <Text>{dummyData[0].name}</Text>
                    <Box as={dummyData[0].type} size={"2rem"} />
                    <Text color={"gray.400"}>{dummyData[0].date}</Text>
                    <Box> info button</Box>
                </Flex>
                <Flex direction={"row"} justifyContent={"space-around"}>
                    <Box as={dummyData[0].icon} size={"3rem"} />
                    <Text>{dummyData[0].name}</Text>
                    <Box as={dummyData[0].type} size={"2rem"} />
                    <Text color={"gray.400"}>{dummyData[0].date}</Text>
                    <Box> info button</Box>
                </Flex>
                <Flex direction={"row"} justifyContent={"space-around"}>
                    <Box as={dummyData[0].icon} size={"3rem"} />
                    <Text>{dummyData[0].name}</Text>
                    <Box as={dummyData[0].type} size={"2rem"} />
                    <Text color={"gray.400"}>{dummyData[0].date}</Text>
                    <Box> info button</Box>
                </Flex>
                
                <Divider orientation='horizontal' />
            </Flex>
        </AppBody>
    )
}
