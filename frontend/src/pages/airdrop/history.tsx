import React, { useState, FC, useEffect } from "react"
import AppBody from "../../components/share/app/AppBody"
import PageBox from "../../components/airdrop/pageBox"
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
} from "@chakra-ui/react"
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
    const [selectedHistory, setSelectedHistory] = useState<any>({
        historyType: "",
        file: {
            fileSender: "",
            sender: {
                fName: "",
                lName: "",
            },
            sendType: "",
            fileExpired: "",
        }

    })
    const [historyData, setHistoryData] = useState<any>(null)
    useEffect(() => {
        API.get("/airdrop/file/getHistory").then((res) => {
            console.log(res.data)
            setHistoryData(res.data)
        })

        return () => {

        }
    }, [])

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
                            <Text>Date:{"   " + selectedHistory.file.fileExpired}</Text>{" "}
                        </HStack>

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
                {/* component for list will coming sooner */}
                <Divider orientation="horizontal" />
                {historyData?.map((item: any, index: any) => {
                    return (
                        <>
                            <Flex direction={"row"} justifyContent={"space-around"} alignItems={"center"} py={"3"}>
                                <Box as={MdImage} size={"3rem"} />
                                <Hide below={"md"}>
                                    <Text>{item.file.fileName}</Text>
                                </Hide>
                                {item.historyType == "DOWNLOAD" ? <HiDownload fontSize={"2rem"} /> : <HiUpload fontSize={"2rem"} />}
                                <Text color={"gray.400"}>{item.createdAt}</Text>
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
                    }}
                    isCentered
                >
                    <ModalOverlay />
                    {renderFileHistory()}
                </Modal>
            </PageBox>
        </AppBody>
    )
}
