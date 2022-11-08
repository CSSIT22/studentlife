import { useState, useEffect, useRef } from "react"
import AppBody from "../../components/share/app/AppBody"
import PageBox from "../../components/airdrop/pageBox"
import SetDropBox from "../../components/airdrop/setDropBox"
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
    Switch,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react"
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react"
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
    //ref
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    //state for img preview
    const [imageSrc, setImageSrc] = useState(undefined)
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

    //fucntion'
    const handleDelete = (prop: any) => {
        setFiles(files.filter((item) => item !== prop))
    }
    const updateFile = (file: any) => {
        setFiles(file)
        console.log(file)
    }
    const handleSee = (imageSource:any) => {
        setImageSrc(imageSource)
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

    //useEffect
    useEffect(() => {
        if (clickDrop == false) {
            setSelectedType("Everyone")
            if (selectedType === "Everyone") {
                setInfo({
                    receiver: "Everyone",
                    description: "",
                })
            }
        }
    }, [isOpen])
    return (
        <AppBody secondarynav={linkMenu}>
            <PageBox pageName="drop">
                <Flex flexDirection={"column"} alignItems={"center"} alignContent={"center"} w={"80%"}>
                    <VStack w={"full"} spacing={"5%"}>
                        <Dropzone onChange={updateFile} value={files} style={{ borderRadius: "20px", padding: "10%" }} >
                            {files.map((file: any) => (
                                <FileItem
                                    {...file}
                                    preview
                                    onDelete={() => {
                                        handleDelete(file)
                                    }}
                                    hd
                                    resultOnTooltip
                                    onSee={handleSee}
                                />
                            ))}
                            {files.length == 0 ? (
                                <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                                    <HiUpload fontSize={"84px"} />
                                    <Text fontSize={"2xl"}>Drop the file</Text>
                                    <Text fontSize={"md"}>Maximum file size can be up to 200MB</Text>
                                </Flex>
                            ) : null}
                        </Dropzone>
                        <FullScreenPreview imgSource={imageSrc} openImage={imageSrc} onClose={() => handleSee(undefined)} />

                        <Box w={"100%"} position={"relative"} mt={"10%"}>
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
                                    onClick={async () => {
                                        const wfc = await setClickDrop(false)
                                        onOpen()
                                    }}
                                    rounded={"2xl"}
                                    value={info.receiver ? info.receiver : "Please select Receiver"}
                                    textAlign={"center"}
                                    _focus={{
                                        borderColor: "gray.400",
                                    }}
                                ></Input>
                            </HStack>
                        </Box>
                        {/* select receiver modal */}
                        <Modal isOpen={isOpen} onClose={onClose} isCentered size={["sm", "md", "lg"]}>
                            <ModalOverlay/>
                            <ModalContent>
                                <ModalHeader>
                                    <Text align={"center"}>{!clickDrop ? "Select Receiver" : "Set Drop Duration"}</Text>
                                </ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Flex flexDirection={"column"} justifyContent={"space-around"} w={"80%"} m={"auto"} gap={4}>
                                        {!clickDrop ? (
                                            <>
                                                <HStack spacing={5}>
                                                    <Text fontSize={"lg"}>Type: </Text>
                                                    <Select
                                                        rounded={"xl"}
                                                        textAlign={"center"}
                                                        onChange={(e) => {
                                                            setSelectedType(e.target.value)
                                                        }}
                                                    >
                                                        <option value="Everyone">Everyone</option>
                                                        <option value="Community">Community</option>
                                                        <option value="Department">Department</option>
                                                        <option value="Specific">Specific receiver</option>
                                                    </Select>
                                                </HStack>
                                                {selectedType == "Everyone" ? null : (
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
                                                        <Select
                                                            size="1"
                                                            multiple
                                                            onChange={(e) => {
                                                                setInfo({ receiver: e.target.value, description: "" })
                                                            }}
                                                        >
                                                            {dummyData2.map((data) => {
                                                                return <option value={data.name}>{data.name}</option>
                                                            })}
                                                        </Select>
                                                    </>
                                                )}
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
                                <ModalFooter alignItems={"center"} textAlign={"center"} alignSelf={"center"}>
                                    {!clickDrop ? (
                                        <>
                                            <Button colorScheme="orange" mr={3} onClick={onClose} alignItems={"center"} alignSelf={"center"}>
                                                Close
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                colorScheme="orange"
                                                mr={3}
                                                onClick={onClose}
                                                alignItems={"center"}
                                                alignSelf={"center"}
                                                textAlign={"center"}
                                            >
                                                Confirm
                                            </Button>
                                        </>
                                    )}
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
                                value={info.description}
                                onChange={(e) => {
                                    setInfo({ ...info, description: e.target.value })
                                }}
                            ></Input>
                        </Box>
                        <Button
                            colorScheme={"orange"}
                            rounded={"3xl"}
                            px={14}
                            py={[3, 6]}
                            shadow={"xl"}
                            onClick={async () => {
                                if (files.length == 0) {
                                    alert("Please select file")
                                } else {
                                    const wfc = await setClickDrop(true)
                                    onOpen()
                                }
                            }}
                        >
                            Drop
                        </Button>
                    </VStack>
                </Flex>
            </PageBox>
        </AppBody>
    )
}
