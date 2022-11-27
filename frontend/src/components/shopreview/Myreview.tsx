import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import {
    Avatar,
    Box,
    Flex,
    Heading,
    Stack,
    Text,
    Image,
    Spacer,
    Button,
    Collapse,
    useDisclosure,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Link,
    background,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useToast,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
} from "@chakra-ui/react"
import React, { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import DetailBox from "../../components/shopreview/DetailBox"
import AmountLike from "./AmountLike"
import AmountRate from "./AmountRate"
import EditReview from "./EditReview"
import RatingStar from "./RatingStar"
import ShopName from "./ShopName"

const Myreview: FC<{ image: String; name: String; ment: String; date: String; am_like: String; ratting: String }> = ({
    image,
    name,
    ment,
    date,
    am_like,
    ratting,
}) => {
    const [show, setShow] = React.useState(false)
    const handleToggle = () => setShow(!show)

    const navigate = useNavigate()
    const navigateReview = () => {
        navigate("/shopreview/review")
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<HTMLButtonElement>(null);
    const inputField = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const toast = useToast()

    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
        setIsHovering(true);
    };
    const handleMouseOut = () => {
        setIsHovering(false);
    };
    return (
        <Box onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} _hover={{ cursor: "pointer", transform: "translate(0, -3px)", shadow: "xl" }} transitionDuration="300ms" p={3} minHeight={32} maxHeight={"1000px"} background={"white"} shadow={"md"} rounded={"2xl"}>
            <Stack mb={3} direction={"row"} spacing={"24px"}>
                <Avatar name="" src={`url('${image}')`} />
                {/* ดีงข้อมูลมาจาก database */}
                <Flex direction={"column"}>
                    <Text as={"b"} color="black" textAlign={"start"} size={"sm"}>
                        {name}
                    </Text>
                    <Text color="gray" size={"sm"}>
                        {date}
                    </Text>
                </Flex>
                <Spacer width={"100%"} as="button" onClick={navigateReview}></Spacer>
                <Flex direction={"column"} justifyContent={"flex-start"}>
                    {isHovering && <Popover placement="bottom">
                        <PopoverTrigger>
                            {/* on this way  */}
                            <Box as="button">
                                <Image width={15} src="https://cdn1.iconfinder.com/data/icons/web-and-user-interface-21/512/30-512.png"></Image>
                            </Box>

                        </PopoverTrigger>
                        <PopoverContent width={"100px"}>
                            {/* <PopoverCloseButton /> */}
                            <PopoverHeader textAlign={"center"}>
                                <EditReview />

                            </PopoverHeader>
                            <PopoverBody textAlign={"center"}>
                                <Box color={"red"} width={"100%"} as="button">
                                    <Flex direction={"row"} justifyContent={"center"} alignItems={"center"}>

                                        <Box onClick={onOpen}>

                                            <DeleteIcon mr={2} />
                                            Delete
                                        </Box>
                                    </Flex>
                                    <AlertDialog
                                        isOpen={isOpen}
                                        leastDestructiveRef={cancelRef}
                                        onClose={onClose}
                                    >
                                        <AlertDialogOverlay>
                                            <AlertDialogContent>
                                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                                    Delete Review
                                                </AlertDialogHeader>

                                                <AlertDialogBody>
                                                    Are you sure? You can't undo this action afterwards.
                                                </AlertDialogBody>

                                                <AlertDialogFooter>
                                                    <Button ref={cancelRef} onClick={onClose}>
                                                        Cancel
                                                    </Button>
                                                    <Button colorScheme='red' onClick={() =>
                                                        toast({
                                                            title: 'Already deleted',
                                                            description: "Delete this review from your review",
                                                            status: 'success',
                                                            duration: 9000,
                                                            isClosable: true,
                                                        })
                                                    } ml={3}>
                                                        Delete
                                                    </Button>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialogOverlay>
                                    </AlertDialog>
                                </Box>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>}
                </Flex>

            </Stack>


            <Collapse startingHeight={20} in={show}>
                <Flex direction={"row"} alignItems={"flex-start"}>
                    <Text overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"} as={"b"} color={"black"} size={"sm"}>
                        {ment}
                    </Text>
                </Flex>
            </Collapse>

            {/* <Button _hover={{ background: "gray.500", color: "white" }} mb={4} size="sm" onClick={handleToggle} mt="1rem">
                Show {show ? "Less" : "More"}
            </Button> */}
            {/* ดีงข้อมูลมาจาก database */}
            <Flex mt={3} direction={"row"} justifyContent={"flex-end"}>
                <Box>
                    <img
                        style={{ width: 20 }}
                        src="https://toppng.com/public/uploads/thumbnail/white-location-icon-png-location-logo-png-white-11562856661b4wsud8br0.png"
                    ></img>
                    { }
                </Box>
                <ShopName name="ข้าวมันไก่ป้าตุ๊ก" />
                <AmountLike am_like={am_like} />
                {/* ดีงข้อมูลมาจาก database */}
                <AmountRate ratting={ratting} />
                {/* ดีงข้อมูลมาจาก database */}
            </Flex>
        </Box>
    )
}

export default Myreview
