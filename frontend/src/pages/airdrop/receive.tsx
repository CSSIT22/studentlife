import React, { useState, useEffect, useRef } from "react"
import AppBody from "../../components/share/app/AppBody"
import PageBox from "../../components/airdrop/pageBox"
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
} from "@chakra-ui/react"
const linkMenu = [
    { name: "Drop", icon: HiUpload, to: "/airdrop" },
    { name: "Receive", icon: HiDownload, to: "/airdrop/receive" },
    { name: "History", icon: MdOutlineHistory, to: "/airdrop/history" },
]
const dummyData = {
    allfile: [
        {
            icon: MdImage,
            name: "pic1.jpeg",
            sender: "MR.ABC DEF",
            comments: [
                {
                    name: "MR.ABC DEF",
                    comment: "great work",
                },
                {
                    name: "MR.ABC GGG",
                    comment: "Love it",
                },
            ],
        },
        {
            icon: MdImage,
            name: "pic2.jpeg",
            sender: "MR.ABC DEF",
            comments: [
                {
                    name: "MR.ABC DEF",
                    comment: "great work",
                },
                {
                    name: "MR.ABC GGG",
                    comment: "Love it",
                },
            ],
        },
        {
            icon: MdImage,
            name: "pic3.jpeg",
            sender: "MR.ABC DEF",
            comments: [
                {
                    name: "MR.ABC DEF",
                    comment: "GGEZ",
                },
                {
                    name: "MR.ABC GGG",
                    comment: "DDDD",
                },
            ],
        },
    ],
}
export default function Receivedrop() {
    const ref1 = useRef();
    const { isOpen, onOpen, onToggle, onClose } = useDisclosure()
    //modal page
    const [modalPage, setModalPage] = useState(0)
    const [modalData, setModalData] = useState({})

    const RenderModalInfo = () => {
        const componentArr = []
        for (const [key, value] of Object.entries(modalData)) {
            if (key !== "comments") {
                componentArr.push(
                    <HStack>
                        <Text fontSize={"xl"}>{key}:</Text>
                        <Text>{value}</Text>
                    </HStack>
                )
            }
        }

        return componentArr
    }
    const RenderModalComments = () => {
        const componentArr = []
        modalData.comments.map((item) => {
            componentArr.push(
                <>
                    <HStack p={3}>
                        <HiUser fontSize={"2.5rem"} />
                        <VStack>
                            <Text fontSize={"xl"}>{item.name}</Text>
                            <Text>{item.comment}</Text>
                        </VStack>
                    </HStack>
                    <Divider />
                </>
            )
        })

        return componentArr
    }

    return (
        <AppBody secondarynav={linkMenu}>
            <PageBox pageName="receive">
                <Box mb={5}>
                    <Text fontSize={"3xl"}>Receive Files</Text>
                </Box>
                {/* component for list will coming sooner */}
                <Divider />
                {dummyData.allfile.map((item, index) => {
                    return (
                        <>
                            <Flex direction={"row"} justifyContent={"space-around"} alignItems={"center"} py={"3"} gap={3}>
                                <Box as={item.icon} size={"3rem"} />
                                <Hide below={"md"}>
                                    <Text>{item.name}</Text>
                                </Hide>

                                <Text fontSize={["0.76rem", "md"]}>{item.sender}</Text>

                                <HStack>
                                    <IconButton
                                        aria-label="accept"
                                        icon={<MdDone />}
                                        rounded={"3xl"}
                                        border={"1px"}
                                        borderColor={"gray.300"}
                                        shadow={"xs"}
                                        bgColor={"white"}
                                    ></IconButton>
                                    <IconButton
                                        aria-label="deny"
                                        icon={<MdOutlineClose />}
                                        rounded={"3xl"}
                                        border={"1px"}
                                        borderColor={"gray.300"}
                                        shadow={"xs"}
                                        bgColor={"white"}
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
                                            const setModal = await setModalData(item)
                                            onOpen()
                                        }}
                                    ></IconButton>
                                </HStack>
                            </Flex>
                            <Divider />
                        </>
                    )
                })}

                {/* //this section is for modal */}
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
                                        <Button onClick={()=>{alert("comment")}}>Comment </Button>
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
                                (Tap any where to close)
                            </Text>
                        </ModalBody>
                        <ModalFooter>
                           
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                {/* <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={onClose} placement="right" closeOnBlur={false}>
                    <PopoverContent>
                        <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>Are you sure you want to continue with your action?</PopoverBody>
                        <PopoverFooter display="flex" justifyContent="flex-end">
                            <ButtonGroup size="sm">
                                <Button variant="outline">Cancel</Button>
                                <Button colorScheme="red">Apply</Button>
                            </ButtonGroup>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover> */}
            </PageBox>
            {/* <BottomNav/> */}
        </AppBody>
    )
}
