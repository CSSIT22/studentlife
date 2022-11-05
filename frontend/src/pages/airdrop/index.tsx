import { useState } from "react"
import AppBody from "../../components/share/app/AppBody"
import BottomNav from "../../components/airdrop/BottomNav"
import SecondaryNav from "../../components/share/navbar/SecondaryNav"
import { HiDownload, HiUpload, HiUser } from "react-icons/hi"
import { MdOutlineHistory } from "react-icons/md"
import { useEffect } from "react"
import { Container, Flex, Box, Text, Input, VStack, Button, HStack } from "@chakra-ui/react"
const linkMenu = [
    { name: "Drop", icon: HiUpload, to: "/airdrop" },
    { name: "Receive", icon: HiDownload, to: "/airdrop/receive" },
    { name: "History", icon: MdOutlineHistory, to: "/airdrop/history" },
]
const dummyData = [
    {
        name: "MR.ABC DEF",
        description: "HELLOOOOOOOOOOOOOOOOOOOOOO",
    },
]

export default function Index() {
    const [files, setFiles] = useState([])
    const updateFile = (file: any) => {
        setFiles(file)
        console.log(file)
    }
    return (
        <AppBody secondarynav={linkMenu}>
            <Flex
                backgroundColor={"#e4e4e4"}
                borderRadius={"50px"}
                minHeight={"auto"}
                px={"0"}
                py={"5%"}
                flexDirection={"row"}
                justifyContent={"center"}
                w={["100%", "90%", "80%", "70%"]}
                m={"auto"}
                mt={["25%", "15%", "5%"]}
                shadow={"sm"}
                transition={"all 0.2s ease-in-out"}
                _focusWithin={{ transform: "scale(1.02)"}}
            >
                <Flex flexDirection={"column"} alignItems={"center"} alignContent={"center"} w={"80%"}>
                    <VStack w={"full"} spacing={"5%"}>
                        <Box w={"full"} h={"200px"} backgroundColor={"orange.200"} shadow={"lg"}>
                            This is for dropzone
                            {/* <Dropzone onChange={()=>{}} value={files} style={{borderRadius:"50px",padding:"10%"}}>
              {files.map((file: any) => (
                <FileItem {...file} preview />
              ))}
              {files.length == 0 ? (
                <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                  <HiUpload fontSize={"84px"} />
                  <Text fontSize={"2xl"}>Drop the file</Text>
                  <Text fontSize={"md"}>Maximum file size can be up to 200MB</Text>
                </Flex>
              ) : null}
            </Dropzone> */}
                        </Box>
                        <Box w={"100%"}>
                            <Text fontWeight={"bold"} mb={"2%"}>
                                Receiver
                            </Text>
                            <HStack spacing={5}>
                                <HiUser fontSize={"3rem"} />
                                <Input
                                    placeholder={"Select Receiver"}
                                    variant={"outline"}
                                    borderColor={"gray.400"}
                                    onClick={() => {
                                        alert("modal popup")
                                    }}
                                    rounded={"2xl"}
                                    value={dummyData[0].name}
                                    textAlign={"center"}
                                    _focus={{
                                        borderColor: "gray.400",
                                    }}
                                ></Input>
                            </HStack>
                        </Box>
                        <Box w={"100%"}>
                            <Text fontWeight={"bold"} mb={"2%"}>
                                Description
                            </Text>
                            <Input
                                variant={"outline"}
                                placeholder={"Description of the file"}
                                borderColor={"gray.400"}
                                h={16}
                                rounded={"2xl"}
                                value={dummyData[0].description}
                            ></Input>
                        </Box>
                        <Button colorScheme={"orange"} rounded={"3xl"} px={14} py={[3, 6]} shadow={"xl"}>
                            Drop
                        </Button>
                    </VStack>
                </Flex>
            </Flex>
        </AppBody>
    )
}
