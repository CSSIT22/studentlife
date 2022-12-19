import React, { useState, useEffect, useRef, FC, createContext } from "react"
import AppBody from "../../components/share/app/AppBody"
import PageBox from "../../components/airdrop/pageBox"
import FileComment from "src/components/airdrop/FileComment"
import FileList from "src/components/airdrop/FileList"
import { HiUpload, HiDownload } from "react-icons/hi"
import { MdOutlineHistory } from "react-icons/md"
import socket from "src/function/socket"
import API from "src/function/API"
import { Text, Box, Divider, useDisclosure, Fade, useBoolean, useToast, Spinner, Flex, Button } from "@chakra-ui/react"
import axios from "axios"
import Lottie from "lottie-react"
import receive from "../../components/airdrop/animation/receive.json"
import download from "../../components/airdrop/animation/download.json"

const linkMenu = [
    { name: "Drop", icon: HiUpload, to: "/airdrop" },
    { name: "Receive", icon: HiDownload, to: "/airdrop/receive" },
    { name: "History", icon: MdOutlineHistory, to: "/airdrop/history" },
]

export const fileListContext = createContext<any>({
    fileList: [],
    setFileList: () => {},
})
export default function Receivedrop<FC>() {
    const toast = useToast()
    const [socketIO] = useState(socket())
    const [isLoading, { off }] = useBoolean(true)
    const [isError, { on }] = useBoolean(false)
    const { isOpen, onToggle } = useDisclosure()
    const [fileList, setFileList] = useState<any>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [filePerPage] = useState(6)
    // item per page = 6
    //filelist slice in page

    const lastIndex = currentPage * filePerPage
    const firstIndex = lastIndex - filePerPage
    const currentFileList = [...fileList].slice(firstIndex, lastIndex)
    //get file function
    const fetchAllFile = async () => {
        const res = await API.get("/airdrop/file/getallfile", {
            withCredentials: true,
        })
            .then((res) => {
                setFileList(res.data)    
            })
            .catch((err) => {
                on()
            })
            .finally(() => {
                off()
            })
    }
    // initial get file
    useEffect(() => {
        fetchAllFile()
        onToggle()
    }, [])
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
    // socket update file
    useEffect(() => {
        socketIO.on("newupload", () => {
            fetchAllFile()
            fetchAllFile()
        })
    }, [socketIO])

    return (
        <AppBody secondarynav={linkMenu}>
            <PageBox pageName="receive">
                <Box mb={4} ml={5}>
                    <Text fontSize={"3xl"} display={"flex"} alignItems={"center"}>
                        Receive Files
                        <Box w={["20%", "10%", "10%", "10%"]} display={"inline-flex"} ml={"1rem"}>
                            <Lottie animationData={receive} loop={false}></Lottie>
                        </Box>
                    </Text>
                </Box>
                {/* component for list will coming sooner */}
                <Divider />
                <fileListContext.Provider value={{ fileList, setFileList }}>
                    {isLoading ? (
                        <Fade in={isLoading} unmountOnExit={true}>
                            <Box w={"100%"} h={"30vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                <Spinner />
                                <Text fontSize={"2xl"}> Loading...</Text>
                            </Box>
                        </Fade>
                    ) : (
                        <Box>
                            {currentFileList?.map((item: any, key: any) => {
                                return (
                                    <Fade in={isOpen} unmountOnExit key={key}>
                                        <FileList info={item} key={key} elementid={key} fadeToggle={onToggle} />
                                    </Fade>
                                )
                            })}
                        </Box>
                    )}
                </fileListContext.Provider>
            </PageBox>
            {/* //pagination*/}
            <Flex justifyContent={"center"} flexDirection={"row"} alignItems={"center"} gap={"3"} mt={"4"}>
                {Array(...new Array(Math.ceil(fileList.length / filePerPage)).fill("")).map((item, key) => {
                    return (
                        <Button
                            key={key}
                            onClick={() => {
                                setCurrentPage(key + 1)
                            }}
                            bg={"whiteAlpha.800"}
                            rounded={"3xl"}
                            size={"md"}
                            _hover={{
                                transform: "scale(1.1)",
                                color: "white",
                                bg: "orange.500",
                                shadow: "xl",
                            }}
                            {...(currentPage === key + 1 && {
                                bg: "orange.500",
                                color: "white",
                            })}
                            shadow={"md"}
                        >
                            {key + 1}
                        </Button>
                    )
                })}
            </Flex>
        </AppBody>
    )
}
