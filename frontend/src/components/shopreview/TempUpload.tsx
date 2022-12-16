import { useState, useEffect, useRef } from "react"
import AppBody from "../../components/share/app/AppBody"
import PageBox from "../../components/airdrop/pageBox"
import SetDropBox from "../../components/airdrop/setDropBox"
import { HiDownload, HiUpload, HiUser } from "react-icons/hi"
import { AiFillCamera } from "react-icons/ai";
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
    Switch,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react"
import { Dropzone, FileItem } from "@dropzone-ui/react"

const openModal = () => { }
export default function Index() {

    // state for file upload
    const [files, setFiles] = useState([])
    //state for click drop
    const [clickDrop, setClickDrop] = useState(false)


    // drop duration check
    const [dropDuration, setDropDuration] = useState({
        temp: true,
        perm: false,
    })
    //state for modal
    const { isOpen, onOpen, onClose } = useDisclosure()
    // state for user select
    const [selectedType, setSelectedType] = useState("Everyone")
    //state for select receiver
    const [info, setInfo] = useState({
        receiver: "",
        description: "",
    })
    //fucntion
    const updateFile = (file: any) => {
        setFiles(file)
        console.log(file)
    }
    const updateFile2 = (file: any) => {
        console.log(file)
        const arr: any = Object.keys(file).map((key) => file[key]);
        console.log(arr)


        const newArr: any = []

        for (let i = 0; i < arr.length; i++) {
            const element: any = {};
            element.id = i
            element.file = arr[i]
            element.valid = true
            newArr.push(element)

        }
        console.log(newArr)
        setFiles(newArr)
    }

    const handleDuration = async (e: any) => {
        if (e.target.id == "temp") {
            if (e.target.checked == true) {
                setDropDuration({
                    temp: true,
                    perm: false,
                })
            } else if (e.target.checked == false) {
                setDropDuration({
                    temp: false,
                    perm: false,
                })
            }
        } else if (e.target.id == "perm") {
            if (e.target.checked) {
                setDropDuration({
                    temp: false,
                    perm: true,
                })
            } else {
                setDropDuration({
                    temp: false,
                    perm: false,
                })
            }
        }
    }

    return (
        <>
            {/* setCam */}
            <Flex flexDirection={"column"} w={"full"}  >

                <Box w={"30px"} borderRadius="full"

                >
                    <AiFillCamera size={"80%"}
                      
                        
                        align-items="center"
                        display="flex"
                        enableBackground={1} color="black"
                        onClick={() => {
                            document.getElementById("test")?.click()
                        }}>

                    </AiFillCamera>
                </Box>

                <Input type={"file"}
                    id="test" hidden multiple
                    display={"flex"} htmlSize={4}
                    onChange={(e) => {
                        updateFile2(e.target.files)
                    }}>


                </Input>


                <Dropzone onChange={updateFile2} value={files}
                    footer={false}

                    style={{
                        border: "2px solid grey"

                    }}
                >
                    {/* <Input type={"file"} id="id" multiple ></Input> */}

                    {files?.map((file: any) => (
                        <>
                            <FileItem {...file} preview />
                        </>

                    ))}
                    {files?.length == 0 ? (
                        <>

                            <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}
                            >

                                <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>

                                </Flex>

                            </Flex>
                        </>
                    ) : null}
                </Dropzone>


                {/* select receiver modal */}
                <Modal isOpen={isOpen} onClose={onClose} isCentered size={["sm", "md", "lg"]}>
                    <ModalOverlay bg={"none"} />
                    <ModalContent>
                        <ModalHeader>

                            <Text align={"center"}>{!clickDrop ? "Select Receiver" : "Set Drop Duration"}d</Text>
                        </ModalHeader>

                        <ModalCloseButton />
                        <ModalBody>
                            <Flex flexDirection={"column"} justifyContent={"space-around"} w={"80%"} m={"auto"} gap={4}>
                                {!clickDrop ? (
                                    <>
                                        <HStack spacing={5}>
                                            <Text fontSize={"lg"}>Type: </Text>

                                        </HStack>

                                    </>
                                ) : (
                                    <>
                                        <VStack spacing={5}>
                                            <SetDropBox>
                                                <HStack>
                                                    <Switch
                                                        id="temp"
                                                        isChecked={dropDuration.temp}
                                                        onChange={(e) => {
                                                            handleDuration(e)
                                                        }}
                                                    />

                                                    <Text>Temporary</Text>
                                                </HStack>
                                                <Text color={"gray.400"}>Set Timer</Text>
                                                <HStack spacing={[1, 2, 3]}>
                                                    <NumberInput
                                                        defaultValue={0}
                                                        min={0}
                                                        max={20}
                                                        placeholder={"00"}
                                                        minW={["60px", "65px"]}
                                                        size={["sm", "md"]}
                                                    >
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                    <Text>H</Text>

                                                    <NumberInput
                                                        defaultValue={0}
                                                        min={0}
                                                        max={60}
                                                        placeholder={"00"}
                                                        minW={"65px"}
                                                        size={["sm", "md"]}
                                                    >
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                    <Text>M</Text>
                                                    <NumberInput
                                                        defaultValue={0}
                                                        min={0}
                                                        max={60}
                                                        placeholder={"00"}
                                                        minW={"65px"}
                                                        size={["sm", "md"]}
                                                    >
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                    <Text>S</Text>
                                                </HStack>
                                            </SetDropBox>
                                            <SetDropBox>
                                                <HStack>
                                                    <Switch
                                                        id="perm"
                                                        isChecked={dropDuration.perm}
                                                        onChange={(e) => {
                                                            handleDuration(e)
                                                        }}
                                                    />
                                                    <Text>Permanent</Text>
                                                </HStack>
                                            </SetDropBox>
                                        </VStack>
                                    </>
                                )}
                            </Flex>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Flex>

        </>
    )
}
