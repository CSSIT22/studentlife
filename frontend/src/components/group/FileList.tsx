import { Text, Box, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger, Portal, useBoolean, useToast, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import React, { FC, useEffect } from "react"
import { BsFillFileEarmarkTextFill, BsThreeDots } from "react-icons/bs"
import { FaDownload } from "react-icons/fa"
import { RiDeleteBinFill } from "react-icons/ri"
import { Link, useNavigate } from "react-router-dom"
import API from "src/function/API"




const FileList: FC<{
    fileName: string;
    owner: string;
    userRole?: string;
    checkRole?: string;
    type: string;
    fileId: string
    checkId?: string;
    userId?: string;
    checkName?: string;
    fetchFile: any;
}> = ({ checkId, userId, checkRole, userRole, fileName, owner, type, fileId, checkName, fetchFile }) => {

    const [isDownload, { off: offDownload, on: onDownload }] = useBoolean()
    const [isDelete, { off: offDelete, on: onDelete }] = useBoolean()
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
            
        }
    }
    const handleDownload = async (name: string, sid: string, fid: string, event: any) => {
        const downloadFile = await API.get(`/airdrop/file/download/${fileId}`, {
            responseType: "arraybuffer",
        }).then((res) => {
            onDownload()
            downloadFunc(res.data, name, res.headers["content-type"])
            toast({ position: "top", title: "File Downloaded", status: "success", variant: "top-accent", duration: 2000, isClosable: true })
        })
    }
    const handleDelete = async () => {
        await API.delete(`/group/deleteFile`,
            { data: { fileId: fileId } })
        onDelete()
        toast({ position: "top", title: "File Deleted", status: "success", variant: "top-accent", duration: 2000, isClosable: true })
        fetchFile()
        
    }
    const threeDots = [
        {
            icon: <FaDownload size={"20px"} />,
            text: "Download",
            onClick: async (e: any) =>
                handleDownload(fileName, owner, fileId, e.target),
            conditions: true,
        },
        {
            icon: <RiDeleteBinFill size={"20px"} />,
            text: "Delete",
            onClick: () => handleDelete(),
            conditions: checkRole == "OWNER" || checkRole == "ADMIN" || owner.toLowerCase() == checkName?.toLowerCase(),
        }
    ]



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
            <Box>
                <Menu>
                    <MenuButton>
                        <BsThreeDots fontSize='25px' />
                    </MenuButton>
                    <MenuList>
                        {
                            threeDots
                                .filter((item) => item.conditions)
                                .map((item, index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            icon={item.icon}
                                            onClick={item.onClick}>
                                            {item.text}
                                        </MenuItem>
                                    )
                                })
                        }
                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    )
}

export default FileList
