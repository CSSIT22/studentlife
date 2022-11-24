import React, { useState, useEffect, useRef, FC, useContext } from "react"
import AppBody from "../../components/share/app/AppBody"
import PageBox from "../../components/airdrop/pageBox"
import SetDropBox from "../../components/airdrop/setDropBox"
import { authContext } from "../../context/AuthContext"
import { HiDownload, HiUpload, HiUser } from "react-icons/hi"
import { MdOutlineHistory } from "react-icons/md"
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react"
import Lottie from "lottie-react"
import uploadAnimation from "../../components/airdrop/animation/upload.json"
import API from "src/function/API"
import {
    Tag,
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
    Switch,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    SimpleGrid,
    Fade,
    useBoolean,
    useToast,
} from "@chakra-ui/react"

const linkMenu = [
    { name: "Drop", icon: HiUpload, to: "/airdrop" },
    { name: "Receive", icon: HiDownload, to: "/airdrop/receive" },
    { name: "History", icon: MdOutlineHistory, to: "/airdrop/history" },
]

const dummyData22 = ["MR.ABC DEF", "MR.GHI JKL", "MR.MNO PQR", "MR.STU VWX", "MR.YZ GG", "MR.PPP PPP"]
export default function Index<FC>() {
    const toast = useToast()
    const [isError, { on }] = useBoolean(false)
    const [isLoading, { off }] = useBoolean(true)
    //useContext getuser
    const user = useContext(authContext)
    //ref
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    //userListState
    const [commuList, setCommuList] = useState<any>([])
    const [specificList, setSpecificList] = useState<any>([])
    const [departmentList, setDepartmentList] = useState<any>([])
    const [userList, setUserList] = useState<{
        everyone: string[]
        department: string[]
        group: string[]
        specific: string[]
    }>({
        everyone: [],
        department: [],
        group: [],
        specific: [],
    })
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
    const [confirmDrop, setConfirmDrop] = useState(false)
    //state for modal
    const { isOpen, onOpen, onClose } = useDisclosure()
    //for fade
    const { isOpen: isOpen2, onToggle: toggleFade } = useDisclosure()
    // state for user select
    const [selectedType, setSelectedType] = useState("Everyone")
    //state for select receiver
    const [receiver, setReceiver] = useState<string[]>([])
    //state for description
    const [description, setdescription] = useState("")
    //state for expired time
    const [expiredTime, setExpiredTime] = useState({
        h: 0,
        m: 0,
        s: 0,
    })
    //user for searching
    const [textSearch, setTextSearch] = useState("")
    const [filterReceiver, setReceiverFilter] = useState<{
        department: string[]
        community: string[]
        specific: string[]
    }>({
        department: [],
        community: [],
        specific: [],
    })

    //fucntion'
    const filterReceive = () => {
        if (selectedType == "Department") {
            setReceiverFilter({
                ...filterReceiver,
                department: userList.department.filter((item) => item.toLowerCase().includes(textSearch.toLowerCase())),
            })
        } else if (selectedType == "Community") {
            setReceiverFilter({
                ...filterReceiver,
                community: userList.group.filter((item) => item.toLowerCase().includes(textSearch.toLowerCase())),
            })
        } else if (selectedType == "Specific") {
            setReceiverFilter({
                ...filterReceiver,
                specific: userList.specific.filter((item) => item.toLowerCase().includes(textSearch.toLowerCase())),
            })
        }
    }

    const handleDelete = (prop: any) => {
        setFiles(files.filter((item) => item !== prop))
    }
    const updateFile = (file: any) => {
        setFiles(file)
    }
    const handleSee = (imageSource: any) => {
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
                    perm: true,
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
                    temp: true,
                    perm: false,
                })
            }
        }
    }
    //Function for handle file drop
    const handleDrop = async () => {
        const fd = new FormData()
        if (selectedType == "everyone") {
            fd.append("receiver", "everyone")
            fd.append("description", description)
            if (dropDuration.perm) {
                fd.append("duration", "permanent")
            } else {
                const timeNow = Date.now()
                const addTime = expiredTime.h * 60 * 60 * 1000 + expiredTime.m * 60 * 1000 + expiredTime.s * 1000
                const expired = timeNow + addTime
                const expiredDate = new Date(expired).toISOString()
                fd.append("duration", "temporary")
                fd.append("expireDate", expiredDate)
            }
        } else {
            fd.append("type", selectedType)
            receiver.map((receive: any) => {
                fd.append("receiver", receive)
            })
            fd.append("description", description)
            if (dropDuration.perm) {
                fd.append("duration", "permanent")
                fd.append("expireDate", "0")
            } else {
                const timeNow = Date.now()
                const addTime = expiredTime.h * 60 * 60 * 1000 + expiredTime.m * 60 * 1000 + expiredTime.s * 1000
                const expired = timeNow + addTime

                const expiredDate = new Date(expired).toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
                console.log(expiredDate)
                // console.log(expiredDate.toISOString());

                fd.append("duration", "temporary")
                fd.append("expireDate", expiredDate)
            }
        }
        files.map((item: any) => {
            fd.append("files", item.file)
        })

        try {
            const res = await API.post("/airdrop/file/upload", fd, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    setConfirmDrop(false)
                    on()
                })
            console.log(res)
        } catch {
            console.log("error")
        }
    }
    //useEffect
    useEffect(() => {
        if (clickDrop == false) {
            // setSelectedType("Everyone")
            if (selectedType === "Everyone") {
                setReceiver(["everyone"])
            }
        }
    }, [isOpen])
    useEffect(() => {
        if (isError) {
            toast({
                title: "Error",
                description: "Please Log In Before Using",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
    }, [isError])
    useEffect(() => {
        filterReceive()
    }, [textSearch])

    useEffect(() => {
        fetchGroup()
        fetchSpecific()
        fetchDepartment()
        toggleFade()
    }, [])
    useEffect(() => {
        setUserList({
            everyone: ["everyone"],
            department: departmentList,
            group: commuList,
            specific: specificList,
        })
    }, [departmentList])
    useEffect(() => {
        console.log(userList)
    }, [userList])
    // fetch Data
    const fetchGroup = async () => {
        const res = await API.get("/airdrop/user/getcommunity").then((res) => {
            const groupList = res.data.map((item: any) => {
                return item.communityName
            })
            setCommuList(groupList)
        })
    }
    const fetchSpecific = async () => {
        const res = await API.get("/airdrop/user/getspecific")
            .then((res) => {
                const specificList = res.data.map((item: any) => {
                    return item.fName + " " + item.lName
                })
                setSpecificList(specificList)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                off()
            })
    }
    const fetchDepartment = async () => {
        const res = await API.get("/airdrop/user/getdepartment", {
            withCredentials: true,
        })
            .then((res) => {
                const majorList = res.data.map((item: any) => {
                    return item.majorName
                })
                setDepartmentList(majorList)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <AppBody secondarynav={linkMenu}>
            <Fade in={isOpen2} unmountOnExit>
                <PageBox pageName="drop">
                    <Flex flexDirection={"column"} alignItems={"center"} alignContent={"center"} w={"80%"}>
                        {confirmDrop ? (
                            <Box py={["40%", "0%"]}>
                                <Lottie
                                    animationData={uploadAnimation}
                                    onLoopComplete={() => {
                                        window.location.reload()
                                    }}
                                />
                            </Box>
                        ) : (
                            <>
                                <VStack w={"full"} spacing={"5%"}>
                                    <Dropzone onChange={updateFile} value={files} style={{ borderRadius: "20px", padding: "10%" }}>
                                        {files.map((file: any, key) => (
                                            <FileItem
                                                {...file}
                                                preview
                                                onDelete={() => {
                                                    handleDelete(file)
                                                }}
                                                hd
                                                resultOnTooltip
                                                onSee={handleSee}
                                                id={key}
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
                                                value={
                                                    receiver
                                                        ? receiver.length > 1
                                                            ? `${receiver.length} receiver selected`
                                                            : receiver[0]
                                                        : "Please select Receiver"
                                                }
                                                textAlign={"center"}
                                                _focus={{
                                                    borderColor: "gray.400",
                                                }}
                                            ></Input>
                                        </HStack>
                                    </Box>
                                    {/* select receiver modal */}
                                    <Modal isOpen={isOpen} onClose={onClose} isCentered size={["sm", "md", "lg"]}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>
                                                <Text align={"center"}>{!clickDrop ? "Select Receiver" : "Set Drop Duration"}</Text>
                                            </ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <Flex flexDirection={"column"} justifyContent={"space-around"} w={"80%"} m={"auto"} gap={4}>
                                                    {!clickDrop ? (
                                                        // Select receiver part
                                                        <>
                                                            <HStack spacing={5}>
                                                                <Text fontSize={"lg"}>Type: </Text>
                                                                <Select
                                                                    defaultValue={selectedType}
                                                                    rounded={"xl"}
                                                                    textAlign={"center"}
                                                                    onChange={async (e) => {
                                                                        if (e.target.value == "Everyone") {
                                                                            await setSelectedType(e.target.value)
                                                                            await setReceiver(["everyone"])
                                                                        } else {
                                                                            if (e.target.value == "Department") {
                                                                                await fetchDepartment()
                                                                            }
                                                                            setSelectedType(e.target.value)
                                                                            setReceiver([])
                                                                        }
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
                                                                        value={textSearch}
                                                                        onChange={(e) => {
                                                                            setTextSearch(e.target.value)
                                                                        }}
                                                                    />
                                                                    <Select
                                                                        multiple
                                                                        onChange={(e) => {
                                                                            const receiv = e.target.value
                                                                            if (receiver.includes(receiv)) {
                                                                            } else {
                                                                                const newArr = receiver.concat(receiv)
                                                                                setReceiver(newArr)
                                                                            }
                                                                        }}
                                                                        size={"xl"}
                                                                        textAlign={"center"}
                                                                    >
                                                                        {/* //map user data into this */}
                                                                        {textSearch == ""
                                                                            ? selectedType == "Community"
                                                                                ? userList?.group.map((data, key) => {
                                                                                      return (
                                                                                          <option value={data} key={key}>
                                                                                              {data}
                                                                                          </option>
                                                                                      )
                                                                                  })
                                                                                : selectedType == "Department"
                                                                                ? userList?.department.map((data, key) => {
                                                                                      return (
                                                                                          <option value={data} key={key}>
                                                                                              {data}
                                                                                          </option>
                                                                                      )
                                                                                  })
                                                                                : selectedType == "Specific"
                                                                                ? userList?.specific.map((data, key) => {
                                                                                      return (
                                                                                          <option value={data} key={key}>
                                                                                              {data}
                                                                                          </option>
                                                                                      )
                                                                                  })
                                                                                : null
                                                                            : // text search not null
                                                                            selectedType == "Community"
                                                                            ? filterReceiver?.community.map((data, key) => {
                                                                                  return (
                                                                                      <option value={data} key={key}>
                                                                                          {data}
                                                                                      </option>
                                                                                  )
                                                                              })
                                                                            : selectedType == "Department"
                                                                            ? filterReceiver?.department.map((data, key) => {
                                                                                  return (
                                                                                      <option value={data} key={key}>
                                                                                          {data}
                                                                                      </option>
                                                                                  )
                                                                              })
                                                                            : selectedType == "Specific"
                                                                            ? filterReceiver?.specific.map((data, key) => {
                                                                                  return (
                                                                                      <option value={data} key={key}>
                                                                                          {data}
                                                                                      </option>
                                                                                  )
                                                                              })
                                                                            : null}
                                                                    </Select>
                                                                    <SimpleGrid columns={[1, 2, 3]}>
                                                                        {receiver.map((name: any) => {
                                                                            return (
                                                                                <>
                                                                                    <Box>
                                                                                        <Tag
                                                                                            onClick={() => {
                                                                                                const index = receiver.indexOf(name)
                                                                                                const newArr = receiver.filter(
                                                                                                    (item: any) => item != name
                                                                                                )
                                                                                                setReceiver(newArr)
                                                                                            }}
                                                                                            _hover={{ cursor: "pointer" }}
                                                                                            fontSize={"0.8rem"}
                                                                                        >
                                                                                            {name.split(" ")[0] + " x"}
                                                                                        </Tag>
                                                                                    </Box>
                                                                                </>
                                                                            )
                                                                        })}
                                                                    </SimpleGrid>
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        // Dropduration part
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
                                                                            id={"H"}
                                                                            defaultValue={0}
                                                                            min={0}
                                                                            max={167}
                                                                            placeholder={"00"}
                                                                            minW={["60px", "65px"]}
                                                                            size={["sm", "md"]}
                                                                            onChange={(num) => {
                                                                                setExpiredTime({ ...expiredTime, h: parseInt(num) })
                                                                            }}
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
                                                                            id={"M"}
                                                                            onChange={(num) => {
                                                                                setExpiredTime({ ...expiredTime, m: parseInt(num) })
                                                                            }}
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
                                                                            id={"S"}
                                                                            onChange={(num) => {
                                                                                setExpiredTime({ ...expiredTime, s: parseInt(num) })
                                                                            }}
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
                                                        <Button
                                                            colorScheme="orange"
                                                            mr={3}
                                                            onClick={onClose}
                                                            alignItems={"center"}
                                                            alignSelf={"center"}
                                                        >
                                                            Close
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button
                                                            colorScheme="orange"
                                                            mr={3}
                                                            alignItems={"center"}
                                                            alignSelf={"center"}
                                                            textAlign={"center"}
                                                            onClick={() => {
                                                                handleDrop()
                                                                if (isError == false) {
                                                                    setConfirmDrop(true)
                                                                } else {
                                                                    setConfirmDrop(false)
                                                                }
                                                            }}
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
                                            value={description}
                                            onChange={(e) => {
                                                setdescription(e.target.value)
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
                            </>
                        )}
                    </Flex>
                </PageBox>
            </Fade>
        </AppBody>
    )
}
