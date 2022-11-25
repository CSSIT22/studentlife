import React, { useState, FC, useEffect, useContext } from "react"
import AppBody from "../../components/share/app/AppBody"
import PageBox from "../../components/airdrop/pageBox"
import FileComment from "src/components/airdrop/FileComment"
import { HiUpload, HiDownload } from "react-icons/hi"
import API from "src/function/API"
import { MdOutlineHistory, MdImage, MdDone, MdOutlineClose, MdInfoOutline } from "react-icons/md"
import {
    Container,
    Flex,
    Box,
    Text,
    Divider,
    Hide,
    HStack,
    IconButton,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    VStack,
    useBoolean,
    Fade,
    Spinner,
    useToast,
} from "@chakra-ui/react"
import { authContext } from "src/context/AuthContext"
const linkMenu = [
    { name: "Drop", icon: HiUpload, to: "/airdrop" },
    { name: "Receive", icon: HiDownload, to: "/airdrop/receive" },
    { name: "History", icon: MdOutlineHistory, to: "/airdrop/history" },
]
const dummyData = [
    {
        name: "pic1.jpeg",
        sender: "ABC DEF",
        type: "Download",
        date: "10/10/2021 10:41:00",
    },
    {
        name: "pic2.jpeg",
        sender: "KNL AWF",
        type: "Upload",
        date: "10/10/2021 10:43:00",
    },
    {
        name: "pic3.jpeg",
        sender: "GHI JKL",
        type: "Download",
        date: "10/10/2021 10:45:00",
    },
]
export default function Drophistory<FC>() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, { off }] = useBoolean(true)
    const [selectedHistory, setSelectedHistory] = useState<{
        historyType: string
        file: {
            fileSender: string
            fileName: string
            fileId: string
            sender: {
                fName: string
                lName: string
            }
            sendType: string
            fileExpired: string
            comments: {
                commentText: string
                commentor: {
                    fName: string | undefined
                    lName: string | undefined
                }
            }[]
        }
    }>({
        historyType: "",
        file: {
            fileSender: "",
            fileName: "",
            fileId: "",
            sender: {
                fName: "",
                lName: "",
            },
            sendType: "",
            fileExpired: "",
            comments: [],
        },
    })
    const [historyData, setHistoryData] = useState<any>(null)
    useEffect(() => {
        API.get("/airdrop/file/getHistory")
            .then((res) => {
                console.log(res.data)
                setHistoryData(res.data)
            })
            .catch((err) => { })
            .finally(() => {
                off()
            })

        return () => { }
    }, [])

    const [commentText, setComment] = useState("")
    const toast = useToast()
    const user = useContext(authContext)
    const [modalPage, setModalPage] = useState(0)
    const RenderModalComments = () => {
        const componentArr: any = []
        selectedHistory.file.comments.map((item: any) => {
            componentArr.push(
                <>
                    <FileComment name={item.commentor.fName + " " + item.commentor.lName} comment={item.commentText} />
                    <Divider />
                </>
            )
        })

        return componentArr
    }

    const handleComment = async () => {
        const comment = await API.post("/airdrop/file/comment", {
            fileId: selectedHistory.file.fileId,
            commentTxt: commentText,
        })
            .then((res) => { })
            .catch((err) => {
                console.log(err)
                toast({ title: "Comment Failed", status: "error", duration: 3000, isClosable: true })
            })
            .finally(() => {
                setComment("")
                toast({ title: "Comment Success", status: "success", duration: 3000, isClosable: true })
            })
    }
    const updateComment = async () => {
        const modifiedModalData = selectedHistory
        modifiedModalData.file.comments.push({
            commentor: {
                fName: user?.fName,
                lName: user?.lName,
            },
            commentText: commentText,
        })
        setSelectedHistory(modifiedModalData)
    }
    const renderFileHistory = () => {
        return (
            <>
                <ModalContent textAlign={"center"}>
                    <ModalHeader>{selectedHistory.historyType == "DOWNLOAD" ? "Download Information" : "Upload Information"}</ModalHeader>
                    <ModalBody>
                        <HStack>
                            <Text>Name:{"   " + selectedHistory.file.fileName}</Text>
                        </HStack>

                        <HStack>
                            <Text>Sender:{"   " + selectedHistory.file.sender.fName + " " + selectedHistory.file.sender.lName}</Text>{" "}
                        </HStack>
                        <HStack>
                            <Text>Type:{"   " + selectedHistory.file.sendType}</Text>{" "}
                        </HStack>
                        <HStack>
                            <Text>
                                Date:{"   " + new Date(selectedHistory.file.fileExpired).toLocaleString("en-Us", { timeZone: "Asia/Bangkok" })}
                            </Text>{" "}
                        </HStack>

                        <Text
                            color={"gray.600"}
                            decoration={"underline"}
                            mt={3}
                            onClick={() => {
                                setModalPage(1)
                            }}
                        >
                            See all comment
                        </Text>
                        <Text color={"gray.300"} decoration={"underline"} textAlign={"center"} mt={5}>
                            (Tap outside to close)
                        </Text>


                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </>
        )
    }

    return (
        <AppBody secondarynav={linkMenu}>
            <PageBox pageName="history">
                <Box mb={3}>
                    <Text fontSize={"3xl"}>History</Text>
                </Box>
                {isLoading ? (
                    <Fade in={isLoading} unmountOnExit={true}>
                        <Box w={"100%"} h={"30vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Spinner />
                            <Text fontSize={"2xl"}> Loading...</Text>
                        </Box>
                    </Fade>
                ) : (
                    <>
                        <Divider orientation="horizontal" />
                        {historyData?.map((item: any, index: any) => {
                            return (
                                <>
                                    <Flex direction={"row"} justifyContent={"space-around"} alignItems={"center"} py={"3"}>
                                        <Box as={MdImage} size={"3rem"} />
                                        <Hide below={"md"}>
                                            <Text>
                                                {item.file.fileName.length > 12
                                                    ? item.file.fileName.substring(0, 12) + "..."
                                                    : item.file.fileName.concat(" ")}
                                            </Text>
                                        </Hide>
                                        {item.historyType == "DOWNLOAD" ? <HiDownload fontSize={"2rem"} /> : <HiUpload fontSize={"2rem"} />}
                                        <Text color={"gray.400"}>
                                            {new Date(item.createdAt).toLocaleString("en-US", { timeZone: "Asia/Bangkok" })}
                                        </Text>
                                        <HStack>
                                            <IconButton
                                                aria-label="infomation"
                                                icon={<MdInfoOutline />}
                                                rounded={"3xl"}
                                                border={"1px"}
                                                borderColor={"gray.300"}
                                                shadow={"xs"}
                                                bgColor={"white"}
                                                onClick={() => {
                                                    onOpen()
                                                    setSelectedHistory(item)
                                                }}
                                            ></IconButton>
                                        </HStack>
                                    </Flex>
                                    <Divider orientation="horizontal" />
                                </>
                            )
                        })}
                        <Modal
                            isOpen={isOpen}
                            onClose={() => {
                                onClose()
                                setModalPage(0)
                            }}
                            isCentered
                        >

                            <ModalOverlay />
                            <ModalContent textAlign={"center"}>
                                <ModalHeader>{modalPage == 0 ? (selectedHistory.historyType == "DOWNLOAD" ? "Download Information" : "Upload Information") : "File Comment"}</ModalHeader>
                                <ModalBody>
                                    {modalPage == 0 ? (
                                        <>
                                            <HStack>
                                                <Text>Name:{"   " + selectedHistory.file.fileName}</Text>
                                            </HStack>

                                            <HStack>
                                                <Text>Sender:{"   " + selectedHistory.file.sender.fName + " " + selectedHistory.file.sender.lName}</Text>{" "}
                                            </HStack>
                                            <HStack>
                                                <Text>Type:{"   " + selectedHistory.file.sendType}</Text>{" "}
                                            </HStack>
                                            <HStack>
                                                <Text>
                                                    Date:{"   " + new Date(selectedHistory.file.fileExpired).toLocaleString("en-Us", { timeZone: "Asia/Bangkok" })}
                                                </Text>{" "}
                                            </HStack>
                                            <Text
                                                color={"gray.600"}
                                                decoration={"underline"}
                                                mt={3}
                                                onClick={() => {
                                                    setModalPage(1)
                                                }}
                                            >
                                                See all comment
                                            </Text>
                                            <Text color={"gray.300"} decoration={"underline"} textAlign={"center"} mt={5}>
                                                (Tap outside to close)
                                            </Text>
                                        </>
                                    ) : (
                                        <>
                                            <Divider />
                                            {RenderModalComments()}
                                            <HStack>
                                                <Input
                                                    type={"text"}
                                                    id="commentin"
                                                    value={commentText}
                                                    onChange={(e) => {
                                                        setComment(e.target.value)
                                                    }}
                                                />
                                                <Button
                                                    onClick={() => {
                                                        handleComment()
                                                        updateComment()
                                                    }}
                                                >
                                                    Comment{" "}
                                                </Button>
                                            </HStack>

                                            <Text
                                                color={"gray.600"}
                                                decoration={"underline"}
                                                mt={3}
                                                onClick={() => {
                                                    setModalPage(0)
                                                }}
                                            >
                                                Go back to file properties
                                            </Text>
                                            <Text color={"gray.300"} decoration={"underline"} textAlign={"center"} mt={5}>
                                                (Tap outside to close)
                                            </Text>
                                        </>
                                    )}

                                </ModalBody>
                                <ModalFooter></ModalFooter>
                            </ModalContent>
                        </Modal>
                    </>
                )}
            </PageBox>
        </AppBody>
    )
}
