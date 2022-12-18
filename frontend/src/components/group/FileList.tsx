import { Text, Box, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger, Portal, useBoolean, useToast } from "@chakra-ui/react"
import React, { FC } from "react"
import { BsFillFileEarmarkTextFill, BsThreeDots } from "react-icons/bs"
import { FaDownload } from "react-icons/fa"
import { RiDeleteBinFill } from "react-icons/ri"
import { Link, useNavigate } from "react-router-dom"
import API from "src/function/API"




const FileList: FC<{ fileName: string; owner: string; type: string;fileId:string }> = ({ fileName, owner, type,fileId}) => {

    const [isDownload, { off: offDownload, on: onDownload }] = useBoolean()
    const toast = useToast()
    async function downloadFunc(data: any, name: any, type: any) {
        try {
            let fileBlob = new Blob([new Uint8Array(data)], { type: type })
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
    const handleDownload = async (name: string, sid: string, fid: string, event: any) => {
        const downloadFile = await API.get(`/airdrop/file/download/${fileId}` , {
            responseType: "arraybuffer",
        }).then((res) => {
            onDownload()
            downloadFunc(res.data, name, res.headers["content-type"])
            toast({ title: "File Downloaded", status: "success", variant: "top-accent", duration: 2000, isClosable: true })
        })
    }
    const onDelete = async () => {
        
        
        
    }


    return (
        <Flex direction={"row"} justify="space-between" alignItems={"center"} mt={2}>
            <Flex width={"100%"} direction="row" alignItems={"center"}>
                <BsFillFileEarmarkTextFill size={"30px"} />
                <Flex width={"100%"} flexDirection={{ base: "column", md: "row" }}>
                    
                    <Text fontSize={"sm"} width={{ base: "100%", md: "100%" }} ml={{ base: 2 }}>
                        {fileName}
                    </Text>

                    <Flex ml={{ base: 2, md: 0 }} gap={{ base: 1, md: "none" }} width={"100%"} direction={"row"}>
                        <Text fontSize={"sm"} width={{ base: "auto", md: "66%" }}>
                            {owner}
                        </Text>

                        <Text fontSize={"sm"} display={{ base: "none", md: "block" }} width={{ base: "100%", md: "22%" }}>
                            {type}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Popover>
                <PopoverTrigger>
                    <Box _hover={{ cursor: "pointer" }} p={2} borderRadius="md">
                        <BsThreeDots fontSize={"25px"} />
                    </Box>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent width="180px">
                        <PopoverBody>
                        
                            <Box gap={1} _hover={{ cursor: "pointer" }} display="flex" alignItems={"center"} onClick={async (e) => {
                                handleDownload( fileName, owner, fileId, e.target)
                            }}>
                                <FaDownload />
                                <Text>Download</Text>
                            </Box>

                            <Box gap={1} _hover={{ cursor: "pointer" }} display="flex" alignItems={"center"} //onClick={onDelete()}
                            >
                                <RiDeleteBinFill />
                                <Text>Delete</Text>
                            </Box>
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
        </Flex>
    )
}

export default FileList
