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
import API from "src/function/API"
import shopId from "src/pages/shopreview/shopdetails/shop/[shopId]"
import DetailBox from "../../components/shopreview/DetailBox"
import AmountLike from "./AmountLike"
import AmountRate from "./AmountRate"
import EditReview from "./EditReview"
import RatingStar from "./RatingStar"
import ShopName from "./ShopName"

const Myreview: FC<{  shopId:number;reviewId: String; shopName: String; image: String; name: String; ment: String; date: String; am_like: String; ratting: String }> = ({
    shopId ,
    reviewId,
    image,
    name,
    ment,
    date,
    am_like,
    ratting,
    shopName,
    

}) => {
    const [show, setShow] = React.useState(false)
    const handleToggle = () => setShow(!show)

    const navigate = useNavigate()
    const navigateReview = () => {
        navigate("/shopreview/review")
    }
    function Navigate(target: any) {
        navigate(`/shopreview/review/${target}`)
        window.scrollTo(0, 0)
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()




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

    const deletereview = () => {
        try {
            // หาreviewId
            API.delete("/shopreview/deletereview", { data: { reviewId: reviewId } }).then((res) => {
                console.log(res)
                window.location.reload()
            })
        }
        catch (e) {

        }
    }
    return (
        <>
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
                                <Box onClick={(e: any) => { e.stopPropagation() }} as="button">
                                    <Image width={15} src="https://cdn1.iconfinder.com/data/icons/web-and-user-interface-21/512/30-512.png"></Image>
                                </Box>

                            </PopoverTrigger>
                            <PopoverContent onClick={(e: any) => { e.stopPropagation() }} width={"100px"}>
                                {/* <PopoverCloseButton /> */}
                                <PopoverHeader textAlign={"center"}>
                                    <Box onClick={onModalOpen} width={"100%"} as="button">

                                        <Flex direction={"row"} justifyContent={"center"} alignItems={"center"}>
                                            <EditIcon mr={2} />
                                            Edit
                                        </Flex>
                                    </Box>

                                </PopoverHeader>
                                <PopoverBody textAlign={"center"}>
                                    <Box color={"red"} width={"100%"} as="button">
                                        <Flex direction={"row"} justifyContent={"center"} alignItems={"center"}>

                                            <Box onClick={onOpen}>
                                                {/* delete button */}
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
                                                        <Button colorScheme='red'
                                                            onClick={() => {
                                                                deletereview()
                                                                toast({
                                                                    title: 'Already deleted',
                                                                    description: "Delete this review from your review",
                                                                    status: 'success',
                                                                    duration: 9000,
                                                                    isClosable: true,
                                                                })
                                                            }
                                                            } ml={3}>
                                                            Deleted
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


                <Flex direction={"row"} alignItems={"flex-start"}>
                    <Text overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"} as={"b"} color={"black"} size={"sm"}>
                        {ment}
                    </Text>
                </Flex>


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
                    <ShopName name={shopName} />
                    <AmountLike am_like={am_like} />
                    {/* ดีงข้อมูลมาจาก database */}
                    <AmountRate ratting={ratting} />
                    {/* ดีงข้อมูลมาจาก database */}
                </Flex>

            </Box>

            <EditReview shopId = {shopId} reviewId={reviewId} isOpen={isModalOpen} onClose={onModalClose} />
        </>
    )
}

export default Myreview
