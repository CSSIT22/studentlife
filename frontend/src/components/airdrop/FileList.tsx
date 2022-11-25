import {
    Flex,
    Hide,
    HStack,
    IconButton,
    Divider,
    Text,
    Box,
    useDisclosure,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast,
    useBreakpointValue,
} from "@chakra-ui/react"
import API from "src/function/API"
import React, { FC, useContext, useEffect, useRef, useState } from "react"
import { MdDone, MdOutlineClose, MdInfoOutline, MdImage, MdFileCopy } from "react-icons/md"
import FileComment from "./FileComment"
import { fileListContext } from "src/pages/airdrop/receive"
import { authContext } from "src/context/AuthContext"
import axios from "axios"

const FileList: FC<{
    elementid: number
    info: {
        fileId: string
        fileName: string
        fileSender: string
        senderId: string
        sendType: string
        fileDesc: string
        fileExpired: string
        comments: {
            commentor: {
                fName: string
                lName: string
            }
            commentText: string
        }[]
        sender: {
            userId: string
            fName: string
            lName: string
        }
    }
    fadeToggle: any
}> = ({ elementid, info, fadeToggle }) => {
    const [commentText, setComment] = useState("")
    const toast = useToast()
    const fileContext = useContext(fileListContext)
    const user = useContext(authContext)
    const initRef = useRef(null)
    const [senderImg, setSenderImg] = useState<string>("")
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { isOpen: proOpen, onOpen: proOpenFunc, onClose: proCloseFunc } = useDisclosure()
    //modal page
    const [modalPage, setModalPage] = useState(0)
    const [senderProfile, setSenderProfile] = useState<{
        fName: string
        lName: string
        studentId: string
        majorId: string
        image: string
    }>({
        fName: "",
        lName: "",
        studentId: "",
        majorId: "",
        image: "",
    })
    const [modalData, setModalData] = useState<{
        fileId: string
        fileName: string
        fileSender: string
        senderId: string
        sendType: string
        fileDesc: string
        fileExpired: string
        comments: {
            commentor: {
                fName: string | undefined
                lName: string | undefined
            }
            commentText: string
        }[]
        sender: {
            userId: string
            fName: string
            lName: string
        }
    }>({
        fileId: "",
        fileName: "",
        fileSender: "",
        senderId: "",
        sendType: "",
        fileDesc: "",
        fileExpired: "",
        comments: [],
        sender: {
            userId: "",
            fName: "",
            lName: "",
        },
    })
    const senderNameModal = useBreakpointValue({
        base: senderProfile.fName,
        md: senderProfile.fName + " " + senderProfile.lName,
    })
    const senderName = useBreakpointValue({
        base: info.sender.fName,
        md: info.sender.fName + " " + info.sender.lName,
    })
    const fetchSenderProfile = async () => {
        const res = await API.get(`/airdrop/user/userprofile/${info.sender.userId}`)
        setSenderProfile(res.data)
        const base64String = btoa(String.fromCharCode(...new Uint8Array(res.data.image.data)))
        setSenderImg(base64String)
    }
    const RenderModalInfo = () => {
        return (
            <>
                <HStack>
                    <Text fontSize={"xl"}>File Name:</Text>
                    <Text>{modalData.fileName.split(".")[0]}</Text>
                </HStack>
                <HStack>
                    <Text fontSize={"xl"}>File Type:</Text>
                    <Text>{modalData.fileName.split(".")[1]}</Text>
                </HStack>
                <HStack ref={initRef}>
                    <Text fontSize={"xl"}>File Sender:</Text>
                    <Box
                        fontSize={"lg"}
                        onMouseEnter={() => {
                            proOpenFunc()
                            fetchSenderProfile()
                            setTimeout(() => {
                                proCloseFunc()
                            }, 2000)
                        }}
                    >
                        <Text decoration={"underline"}>{modalData.sender.fName + " " + modalData.sender.lName}</Text>
                    </Box>
                    <Modal initialFocusRef={initRef} isOpen={proOpen} onClose={onClose} size={"2xl"}>
                        <ModalOverlay bg={"none"} />
                        <ModalContent position={"sticky"}>
                            <ModalHeader></ModalHeader>
                            <ModalBody pb={6}>
                                {senderProfile && (
                                    <>
                                        <Flex justify={"space-around"} gap={5} flexDirection={"row"} alignItems={"center"} flexWrap={"wrap"}>
                                            <img src={`data:image/jpg;base64,${senderImg}`} alt="" />
                                            <Text>{senderNameModal}</Text>
                                            <Text>{senderProfile.studentId}</Text>
                                            <Text>{senderProfile.majorId + " Student"}</Text>
                                        </Flex>
                                    </>
                                )}
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </HStack>
                <HStack>
                    <Text fontSize={"xl"}>File Description:</Text>
                    <Text>{modalData.fileDesc}</Text>
                </HStack>
                <HStack>
                    <Text fontSize={"xl"}>Expired Time:</Text>
                    <Text>
                        {modalData.fileExpired == "0"
                            ? "Permanent"
                            : new Date(modalData.fileExpired).toLocaleString("en-US", {
                                  timeZone: "Asia/Bangkok",
                              })}
                    </Text>
                </HStack>
            </>
        )
    }

    const RenderModalComments = () => {
        const componentArr: any = []
        modalData.comments.map((item: any) => {
            componentArr.push(
                <>
                    <FileComment name={item.commentor.fName + " " + item.commentor.lName} comment={item.commentText} />
                    <Divider />
                </>
            )
        })

        return componentArr
    }

    //handle function
    async function downloadFunc(data: any,name:any,type:any) {
        try {
            let fileBlob = new Blob([new Uint8Array(data)],{type:type})
            const urlCreator = window.URL || window.webkitURL
            const blobUrl = urlCreator.createObjectURL(fileBlob)
            const a = document.createElement("a")
            a.download = name
            a.href = blobUrl
            document.body.appendChild(a)
            a.click()
            a.remove()
        } catch (error) {
            console.log(error)
        }
    }
    const handleDownload = async (type: string, name: string, sid: string, fid: string, event: any) => {
        const downloadFile = await API.get(`/airdrop/file/download/${fid}`,{
            responseType: 'arraybuffer',
        }).then((res) => {
            downloadFunc(res.data,name,res.headers["content-type"])
        })

        const hideFile = await API.post("/airdrop/file/hidefile", {
            fileId: fid,
        })
        await fileContext.setFileList(fileContext.fileList.filter((item: any) => item.fileId !== fid))
    }
    const handleDecline = async (id: string, event: any) => {
        const hideFile = await API.post("/airdrop/file/hidefile", {
            fileId: id,
        })
        await fileContext.setFileList(fileContext.fileList.filter((item: any) => item.fileId !== id))
    }
    const handleComment = async () => {
        const comment = await API.post("/airdrop/file/comment", {
            fileId: modalData.fileId,
            commentTxt: commentText,
        })
            .then((res) => {})
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
        const modifiedModalData = modalData
        modifiedModalData.comments.push({
            commentor: {
                fName: user?.fName,
                lName: user?.lName,
            },
            commentText: commentText,
        })
        setModalData(modifiedModalData)
    }

    return (
        <>
            <img id="test"/>
            <div id={elementid.toString()}>
                <Flex
                    direction={"row"}
                    justifyContent={{
                        base: "space-evenly",
                        md: "space-between",
                        lg: "space-between",
                    }}
                    alignItems={"center"}
                    px={"10"}
                    py={"3"}
                    gap={3}
                >
                    <Box as={MdFileCopy} size={"2rem"} />
                    <Hide below={"md"}>
                        <Text>{info.fileName.length > 12 ? info.fileName.slice(0, 12) + "..." : info.fileName}</Text>
                    </Hide>

                    <Text fontSize={["0.76rem", "md"]}>{senderName}</Text>

                    <HStack>
                        <IconButton
                            aria-label="accept"
                            icon={<MdDone />}
                            rounded={"3xl"}
                            border={"1px"}
                            borderColor={"gray.300"}
                            shadow={"xs"}
                            colorScheme={"green"}
                            onClick={async (e) => {
                                handleDownload(info.sendType, info.fileName, info.sender.userId, info.fileId, e.target)
                            }}
                        ></IconButton>
                        <IconButton
                            aria-label="deny"
                            icon={<MdOutlineClose />}
                            rounded={"3xl"}
                            border={"1px"}
                            borderColor={"gray.300"}
                            shadow={"xs"}
                            colorScheme={"red"}
                            onClick={async (e) => {
                                handleDecline(info.fileId, e.target)
                            }}
                        ></IconButton>
                        <IconButton
                            aria-label="infomation"
                            icon={<MdInfoOutline />}
                            rounded={"3xl"}
                            border={"1px"}
                            borderColor={"gray.300"}
                            shadow={"xs"}
                            colorScheme={"orange"}
                            size={"md"}
                            onClick={async () => {
                                const setModal = await setModalData(info)
                                onOpen()
                            }}
                        ></IconButton>
                    </HStack>
                </Flex>
                <Divider />
            </div>
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
                    <ModalHeader>{modalPage == 0 ? "File Properties" : "File Comment"}</ModalHeader>
                    <ModalBody>
                        {modalPage == 0 ? (
                            <>
                                {RenderModalInfo()}
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
                            </>
                        )}
                        <Text color={"gray.300"} decoration={"underline"} textAlign={"center"} mt={5}>
                            (Tap outside to close)
                        </Text>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default FileList
