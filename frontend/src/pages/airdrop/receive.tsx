import React, { useState, useEffect, useRef, FC, createContext } from "react"
import AppBody from "../../components/share/app/AppBody"
import PageBox from "../../components/airdrop/pageBox"
import FileComment from "src/components/airdrop/FileComment"
import FileList from "src/components/airdrop/FileList"
import { HiUpload, HiDownload } from "react-icons/hi"
import { MdOutlineHistory } from "react-icons/md"
import API from "src/function/API"
import { Text, Box, Divider, useDisclosure, Fade, useBoolean, useToast, Spinner, Flex, Button } from "@chakra-ui/react"
import axios from "axios"
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
    const [isLoading, { off }] = useBoolean(true)
    const [isError, { on }] = useBoolean(false)
    const { isOpen, onToggle } = useDisclosure()
    const [fileList, setFileList] = useState<any>([])
    const [filePagination, setFilePagination] = useState<any>([])
    const [filePage, setFilePage] = useState(0)
    const [pageAmount, setPageAmount] = useState<number>(0)
    // item per page = 6
    //get file function
    const fetchAllFile = async () => {
        const res = await API.get("/airdrop/file/getallfile", {
            withCredentials: true,
        })
            .then((res) => {
                if (fileList.length === 0 || res.data.length !== fileList.length) {
                    setFileList(res.data)
                    setPageAmount(Math.ceil(res.data.length / 6))
                    if (filePagination != null) {
                        //inital pagination data
                        setFilePagination(res.data.slice(0, 6))
                    }
                }
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
    // cronjob update file
    useEffect(() => {
        const interval = setInterval(() => {
            fetchAllFile()
        }, 1000)
        return () => clearInterval(interval)
    })
    //
    //fileLIst in pagination change when page change
    useEffect(() => {
        console.log(filePage)
        setFilePagination([...fileList.slice(filePage * (filePage + 1), filePage * 6 - 1)])
        console.log(filePagination)
    }, [filePage])
    return (
        <AppBody secondarynav={linkMenu}>
            <PageBox pageName="receive">
                <Box mb={5}>
                    <Text fontSize={"3xl"}>Receive Files</Text>
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
                        <>
                            {pageAmount > 0 ? (
                                <>
                                    {filePagination?.map((item: any, key: any) => {
                                        return (
                                            <Fade in={isOpen} unmountOnExit key={key}>
                                                <FileList info={item} key={key} elementid={key} fadeToggle={onToggle} />
                                            </Fade>
                                        )
                                    })}
                                </>
                            ) : (
                                <>
                                    {fileList?.map((item: any, key: any) => {
                                        return (
                                            <Fade in={isOpen} unmountOnExit key={key}>
                                                <FileList info={item} key={key} elementid={key} fadeToggle={onToggle} />
                                            </Fade>
                                        )
                                    })}
                                </>
                            )}
                            {/* //pagination with chakra ui */}
                            <Flex justifyContent={"center"} flexDirection={"row"} alignItems={"center"} gap={"3"} mt={"4"} position={"revert"}>
                                {pageAmount > 1 ? (
                                    <>
                                        {
                                            //map button from pageAmount number
                                            [...Array(pageAmount)].map((_: any, key: any) => {
                                                return (
                                                    <Button
                                                        key={key}
                                                        onClick={() => {
                                                            if (key != 1) {
                                                                setFilePage(0)
                                                            } else {
                                                                setFilePage(key + 1)
                                                            }
                                                        }}
                                                        rounded={"3xl"}
                                                        size={"md"}
                                                        _hover={{
                                                            transform: "scale(1.1)",
                                                            color: "white",
                                                            bg: "orange.500",
                                                            shadow: "xl",
                                                        }}
                                                        {...(key + 1 == filePage
                                                            ? {
                                                                  bg: "orange.500",
                                                                  color: "white",
                                                              }
                                                            : null)}
                                                    >
                                                        {key + 1}
                                                    </Button>
                                                )
                                            })
                                        }
                                    </>
                                ) : (
                                    <></>
                                )}
                            </Flex>
                        </>
                    )}
                </fileListContext.Provider>
            </PageBox>
        </AppBody>
    )
}
