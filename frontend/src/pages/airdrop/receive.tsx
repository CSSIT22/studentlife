import React, { useState, useEffect, useRef, FC, createContext } from "react"
import AppBody from "../../components/share/app/AppBody"
import PageBox from "../../components/airdrop/pageBox"
import FileComment from "src/components/airdrop/FileComment"
import FileList from "src/components/airdrop/FileList"
import { HiUpload, HiDownload } from "react-icons/hi"
import { MdOutlineHistory } from "react-icons/md"
import API from "src/function/API"
import { Text, Box, Divider, useDisclosure, Fade, useBoolean, useToast, Spinner } from "@chakra-ui/react"
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
    //get file function
    const fetchAllFile = async () => {
        const res = await API.get("/airdrop/file/getallfile", {
            withCredentials: true,
        })
            .then((res) => {
                if (fileList.length === 0) {
                    setFileList(res.data)
                } else {
                    if (res.data.length !== fileList.length) {
                        setFileList(res.data)
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
    }, [])
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
                            {fileList?.map((item: any, key: any) => {
                                return (
                                    <Fade in={isOpen} unmountOnExit key={key}>
                                        <FileList info={item} key={key} elementid={key} fadeToggle={onToggle} />
                                    </Fade>
                                )
                            })}
                        </>
                    )}
                </fileListContext.Provider>
            </PageBox>
        </AppBody>
    )
}
