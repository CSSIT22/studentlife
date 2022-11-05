import { useState,useEffect} from "react"
import AppBody from "../../components/share/app/AppBody"
import SecondaryNav from "../../components/share/navbar/SecondaryNav"
import { HiDownload, HiUpload, HiUser } from "react-icons/hi"
import { MdOutlineHistory } from "react-icons/md"
import {
    Container,
    Flex,
    Box,
    Text,
    Input,
    VStack,
    Button,
    HStack,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Select,
    Checkbox,
} from "@chakra-ui/react"
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
const dummyData2 = [
    {
        name: "MR.ABC DEF",
    },
    {
        name: "MR.GHI JKL",
    },
    {
        name: "MR.MNO PQR",
    },
    {
        name: "MR.STU VWX",
    },
    {
        name: "MR.STU VWX",
    },
    {
        name: "MR.STU VWX",
    },
]
const openModal = () => {}
export default function Index() {
    // state for file upload
    const [files, setFiles] = useState([])
    //state for modal
    const { isOpen, onOpen, onClose } = useDisclosure()
    // state for user select
    const [selectedType, setSelectedType] = useState("everyone")
    //state for select receiver
    const [selectedReceiver, setSelectedReceiver] = useState("")

    useEffect(()=>{
        setSelectedType("everyone")
    },[isOpen]);

    const updateFile = (file: any) => {
        setFiles(file)
        console.log(file)
    }
    return (
        <AppBody secondarynav={linkMenu}>
            <Flex
                backgroundColor={"snow"}
                borderRadius={"50px"}
                minHeight={"auto"}
                px={"0"}
                py={"5%"}
                flexDirection={"row"}
                justifyContent={"center"}
                w={["100%", "90%", "80%", "70%"]}
                m={"auto"}
                mt={["25%", "15%", "5%"]}
                shadow={"md"}
                border={"1px"}
                borderColor={"gray.200"}
                // transition={"all 0.2s ease-in-out"}
                // _focusWithin={{ transform: "scale(1.02)" }}
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
                                    type={""}
                                    placeholder={"Select Receiver"}
                                    variant={"outline"}
                                    borderColor={"gray.400"}
                                    onClick={onOpen}
                                    rounded={"2xl"}
                                    value={selectedReceiver?selectedReceiver:"Please select Receiver"}
                                    textAlign={"center"}
                                    _focus={{
                                        borderColor: "gray.400",
                                    }}
                                ></Input>
                            </HStack>
                        </Box>
                        {/* select receiver modal */}
                        <Modal isOpen={isOpen} onClose={onClose} isCentered size={["sm", "md"]}>
                            <ModalOverlay bg={"none"} />
                            <ModalContent>
                                <ModalHeader>
                                    <Text align={"center"}>Select Receiver</Text>
                                </ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Flex flexDirection={"column"} justifyContent={"space-around"} w={"80%"} m={"auto"} gap={4}>
                                        <HStack spacing={5}>
                                            <Text fontSize={"lg"}>Type: </Text>
                                            <Select
                                                rounded={"xl"}
                                                textAlign={"center"}
                                                onChange={(e) => {
                                                    setSelectedType(e.target.value)
                                                }}
                                                
                                            >
                                                <option value="everyone">Everyone</option>
                                                <option value="community">Community</option>
                                                <option value="department">Department</option>
                                                <option value="specific">Specific receiver</option>
                                            </Select>
                                        </HStack>
                                        {selectedType == "everyone" ? null : (
                                            <>
                                                <Input
                                                    type={""}
                                                    placeholder={"Search by name"}
                                                    variant={"outline"}
                                                    borderColor={"gray.200"}
                                                    onClick={onOpen}
                                                    rounded={"2xl"}
                                                    
                                                    textAlign={"center"}
                                                    _focus={{
                                                        borderColor: "gray.400",
                                                    }}
                                                ></Input>
                                                <Select size="3" multiple onChange={(e)=>{setSelectedReceiver(e.target.value)}}>
                                                {
                                                    dummyData2.map((data)=>{
                                                        return(
                                                            <option value={data.name}>{data.name}</option>
                                                        )
                                                    })
                                                }
                                                </Select>
                                                

                                            </>
                                        )}
                                    </Flex>
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme="blue" mr={3} onClick={onClose} alignItems={"center"} alignSelf={"center"}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
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
