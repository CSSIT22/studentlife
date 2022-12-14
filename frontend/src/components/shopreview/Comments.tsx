import { Box, Button, Collapse, Flex, Heading, Link, Spacer, Stack, Text, Image, Show, Hide, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, useToast, useDisclosure } from "@chakra-ui/react"
import React, { FC, useContext, useState } from "react"
import AmountLike from "./AmountLike"
import AmountRate from "./AmountRate"
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import EditReview from "./EditReview"
import EditComment from "./EditComment"
import { authContext } from "src/context/AuthContext"
import API from "src/function/API"

const Comments: FC<{ reviewId: String; commentId: number; image: String; name: String; ment: String; date: String; am_like: String; }> = ({ commentId, image, name, ment, date, am_like, reviewId, }) => {

    const [active, setActive] = useState(false)
    const handleClick = () => {
        setActive(!active)
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<HTMLButtonElement>(null);
    const toast = useToast()
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
        setIsHovering(true);
    };
    const handleMouseOut = () => {
        setIsHovering(false);
    };


    const deletecomment = () => {
        try {
            // หาcommentId
            API.delete("/shopreview/deletecomment", { data: { commentId: commentId } }).then((res) => {
                // console.log(res)
                window.location.reload()
            })
        }
        catch (e) {

        }

    }
    return (
        <Box _hover={{ cursor: "pointer", transform: "translate(0, -3px)", shadow: "xl" }} transitionDuration="300ms" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} p={3} minHeight={32} maxHeight={"1000px"} background={"white"} shadow={"md"} rounded={"2xl"}>
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
                {/* ดีงข้อมูลมาจาก database */}
                <Spacer width={"100%"}></Spacer>
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
                                <EditComment commentId={commentId} />

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
                                                    Delete Comment
                                                </AlertDialogHeader>

                                                <AlertDialogBody>
                                                    Are you sure? You can't undo this action afterwards.
                                                </AlertDialogBody>


                                                <AlertDialogFooter>
                                                    <Button ref={cancelRef} onClick={onClose}>
                                                        Cancel
                                                    </Button>
                                                    <Button colorScheme='red' onClick={() => {

                                                        deletecomment()

                                                        toast({
                                                            title: 'Already deleted',
                                                            description: "Delete this comment",
                                                            status: 'success',
                                                            duration: 9000,
                                                            isClosable: true,
                                                        })
                                                        // console.log(commentId)
                                                    }
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
            <Flex direction={"row"} alignItems={"flex-start"}>
                <Box>
                    <Text overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"} as={"b"} color={"black"} mb={3} size={"sm"}>
                        {ment}
                    </Text>
                </Box>
                {/* <Spacer width={"100%"} as="button"></Spacer> */}
            </Flex>
            {/* ดีงข้อมูลมาจาก database */}
            {/* <Flex mt={3} direction={"row"} justifyContent={"flex-end"}>
                <AmountLike reviewId={reviewId} am_like={am_like} /> */}
            {/* ดีงข้อมูลมาจาก database */}
            {/* </Flex> */}
        </Box>
    )
}

export default Comments
