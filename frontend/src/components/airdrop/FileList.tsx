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
    Fade,
} from "@chakra-ui/react"
import axios from "axios"
import React, { FC, useContext, useEffect, useState } from "react"
import { IconType } from "react-icons"
import { MdDone, MdOutlineClose, MdInfoOutline, MdImage, MdFileCopy } from "react-icons/md"
import FileComment from "./FileComment"
import { fileListContext } from "src/pages/airdrop/receive"

const FileList: FC<{
    elementid: number
    info: {
        fileId: string
        fileName: string
        fileSender: string
        senderId: string
        sendType: string
        comments: {
            name: string
            comment: string
        }[]
    }
    fadeToggle: any
}> = ({ elementid, info,fadeToggle }) => {
    const fileContext = useContext(fileListContext)

    const { isOpen, onOpen, onClose } = useDisclosure()
    //modal page
    const [modalPage, setModalPage] = useState(0)
    const [modalData, setModalData] = useState<{
        fileId: string
        fileName: string
        fileSender: string
        senderId: string
        sendType: string
        comments: []
    }>({
        fileId: "",
        fileName: "",
        fileSender: "",
        senderId: "",
        sendType: "",
        comments: [],
    })
    const RenderModalInfo = () => {
        const componentArr = []
        for (const [key, value] of Object.entries(modalData)) {
            if (key !== "comments" && key !== "fileId" && key !== "senderId") {
                componentArr.push(
                    <HStack>
                        {key == "fileExpired" ? (
                            <>
                                <Text fontSize={"xl"}>{key.toLowerCase()}:</Text>
                                <Text>
                                    {value == "0"
                                        ? "Permanent"
                                        : new Date(value).toLocaleString("en-US", {
                                              timeZone: "Asia/Bangkok",
                                          })}
                                </Text>
                            </>
                        ) : (
                            <>
                                <Text fontSize={"xl"}>{key.toLowerCase()}:</Text>
                                <Text>{value}</Text>
                            </>
                        )}
                    </HStack>
                )
            }
        }

        return componentArr
    }
    const RenderModalComments = () => {
        const componentArr: any = []
        modalData.comments.map((item: any) => {
            componentArr.push(
                <>
                    <FileComment name={item.name} comment={item.comment} />
                    <Divider />
                </>
            )
        })

        return componentArr
    }

    //handle function
    const handleDownload = async (type: string, name: string, sid: string, fid: string, event: any) => {
        const downloadFile = await axios.get(`http://localhost:8000/airdrop/file/download/${type}/${sid + name}`, {
            responseType: "blob",
        })
        const url = window.URL.createObjectURL(new Blob([downloadFile.data]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", name)
        document.body.appendChild(link)
        link.click()
        console.log(downloadFile)

        const hideFile = await axios.post(
            "http://localhost:8000/airdrop/file/hidefile",
            {
                fileId: fid,
            },
            {
                withCredentials: true,
            }
        )
        await fileContext.setFileList(fileContext.fileList.filter((item: any) => item.fileId !== fid))
    }
    const handleDecline = async (id: string, event: any) => {
        const  hideFile = await axios.post("http://localhost:8000/airdrop/file/hidefile",{
            fileId:id
        },{
            withCredentials:true
        })
        await fileContext.setFileList(fileContext.fileList.filter((item: any) => item.fileId !== id))
    }
    useEffect(()=>{
        console.log(info);
        
    })
    return (
        <>
            <div id={elementid.toString()}>
                <Flex direction={"row"} justifyContent={"space-between"} alignItems={"center"} px={"10"} py={"3"} gap={3}>
                    <Box as={MdFileCopy} size={"3rem"} />
                    <Hide below={"md"}>
                        <Text>{info.fileName}</Text>
                    </Hide>

                    <Text fontSize={["0.76rem", "md"]}>{info.fileSender}</Text>

                    <HStack>
                        <IconButton
                            aria-label="accept"
                            icon={<MdDone />}
                            rounded={"3xl"}
                            border={"1px"}
                            borderColor={"gray.300"}
                            shadow={"xs"}
                            bgColor={"white"}
                            onClick={async (e) => {
                                handleDownload(info.sendType, info.fileName, info.senderId, info.fileId, e.target)
                            }}
                        ></IconButton>
                        <IconButton
                            aria-label="deny"
                            icon={<MdOutlineClose />}
                            rounded={"3xl"}
                            border={"1px"}
                            borderColor={"gray.300"}
                            shadow={"xs"}
                            bgColor={"white"}
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
                            bgColor={"white"}
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
                                    <Input type={"text"} id="commentin" />
                                    <Button
                                        onClick={() => {
                                            alert("comment")
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
