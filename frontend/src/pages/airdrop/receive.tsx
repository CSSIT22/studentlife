import React, { useState, useEffect, useRef, FC, createContext } from "react"
import AppBody from "../../components/share/app/AppBody"
import PageBox from "../../components/airdrop/pageBox"
import FileComment from "src/components/airdrop/FileComment"
import FileList from "src/components/airdrop/FileList"
import { HiUpload, HiDownload, HiUser } from "react-icons/hi"
import { MdOutlineHistory, MdImage, MdDone, MdOutlineClose, MdInfoOutline } from "react-icons/md"
import {
    Container,
    Flex,
    HStack,
    Icon,
    Text,
    VStack,
    Box,
    Divider,
    Hide,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    useDisclosure,
    Button,
    ButtonGroup,
    ModalBody,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Heading,
    ModalFooter,
    Input,
    Fade,
    ScaleFade,
} from "@chakra-ui/react"
import axios from "axios"
const linkMenu = [
    { name: "Drop", icon: HiUpload, to: "/airdrop" },
    { name: "Receive", icon: HiDownload, to: "/airdrop/receive" },
    { name: "History", icon: MdOutlineHistory, to: "/airdrop/history" },
]



export const fileListContext  = createContext<any>({
    fileList: [],
    setFileList: () => {},
});
export default function Receivedrop<FC>() {
    const { isOpen, onToggle } = useDisclosure()
    const [fileList, setFileList] = useState<any>([])
    //get file function
    const fetchAllFile = async () => {
        const res = await axios.get("http://localhost:8000/airdrop/file/getallfile",{
            withCredentials: true
        });
        setFileList(res.data);
    }


    useEffect(()=>{
        fetchAllFile();
        onToggle();
    },[])
    return (
        <AppBody secondarynav={linkMenu}>
            <PageBox pageName="receive">
                <Box mb={5}>
                    <Text fontSize={"3xl"}>Receive Files</Text>
                </Box>
                {/* component for list will coming sooner */}
                <Divider />
                <fileListContext.Provider value={{fileList,setFileList}}>
                {fileList?.map((item:any, key:any) => {
                    return (
                        <Fade in={isOpen} unmountOnExit key={key}>
                        <FileList info={item} key={key} elementid={key} fadeToggle={onToggle}/>
                        </Fade>
                    )
                })}
                </fileListContext.Provider>
            </PageBox>
        </AppBody>
    )
}
