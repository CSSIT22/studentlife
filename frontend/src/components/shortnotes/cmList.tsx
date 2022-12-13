import { Box, Grid, GridItem, Text, Flex, Spacer, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast, Avatar } from "@chakra-ui/react"
import React, { FC, useContext, useEffect, useState } from "react"
import { HiDotsHorizontal } from "react-icons/hi"
import { MdDeleteOutline } from "react-icons/md"
import { authContext } from "src/context/AuthContext"
import API from "src/function/API"
import { user } from "../transaction/shared/testuser"

const cmList: FC<{
    name: String
    desc: String
    date: String | any
    owner: string
    commentId: string
}> = ({ name, desc, date, owner, commentId }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [cmId, setCmId] = useState("")
    const user = useContext(authContext)
    const deleteCm = () => {
        API.delete("/shortnotes/deleteComment", {
            data: {
                commentId: cmId
            }
        })
    }
    const toast = useToast()
    return (
        <Box bg={"white"} boxShadow={"base"} rounded={8} p={3} w={"100%"} >
            <Flex>
                <Avatar
                    size="sm"
                    src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + owner}
                ></Avatar>
                <Heading ml={2} size={"sm"} alignSelf={"center"}>{name}</Heading>
                <Spacer />
                {owner == user?.userId ?
                    <Menu>
                        <MenuButton><HiDotsHorizontal /></MenuButton>
                        <MenuList>
                            <MenuItem icon={<MdDeleteOutline />} onClick={() => {
                                setCmId(commentId)
                                onOpen()
                            }}>
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    :
                    null
                }

            </Flex>
            {desc}
            <Flex w={"100%"} h={"100%"} justifyContent={"end"} >
                <Text fontSize={"xs"} alignSelf={"end"}>
                    {new Date(date).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}
                </Text>
            </Flex>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete comment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure to delete this comment?</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            deleteCm()
                            onClose()
                            toast({
                                title: 'Comment deleted',
                                description: "You've deleted your comment.",
                                status: 'success',
                                duration: 4000,
                                isClosable: true,
                            })
                        }} colorScheme={"red"}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box >
    )
}

export default cmList
