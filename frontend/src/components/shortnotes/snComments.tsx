import { Avatar, Box, Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Spacer, Textarea, Text, useBoolean, useDisclosure, useToast, VStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from 'src/function/API'
import CmList from './cmList'
import Lottie from "lottie-react";
import loading from "./lottie/loading.json";
import { authContext } from 'src/context/AuthContext'
import { HiDotsHorizontal } from 'react-icons/hi'
import { MdDeleteOutline } from 'react-icons/md'

const snComments = () => {
    const [comments, setComments] = useState<any>([])
    const [newComment, setNewComment] = useState<any>([])
    const param = useParams()

    useEffect(() => {
        API.get("shortnotes/getComments/" + param.id).then((item) => {
            setComments(item.data)
        }).finally(() => {
            setCmLoad.off()
        })
    }, [])

    const [comm, setComm] = useState("")
    const comment = () => {
        API.post("/shortnotes/postComment", {
            comment: comm,
            snId: param.id
        }).then((res) => {
            setComm("")
            let x = [...newComment, res.data]
            setNewComment(x)
            // console.log(res.data);
            // console.log(newComment);
        })
    }
    const toast = useToast()
    const [cmLoad, setCmLoad] = useBoolean(true)
    const style = {
        height: 96,
    };
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
    return (
        <Box>
            <Box mb={4} rounded={8}>
                <Box>
                    <Heading size={"md"} mb={1}>
                        Comments
                    </Heading>
                    <Textarea h={150} mb={2} py={4} focusBorderColor="orange.500" placeholder={"What are your thoughts ?"} value={comm} onChange={(e) => setComm(e.target.value)} />
                    <Flex direction={"row"} justifyContent={"end"}>
                        <Button colorScheme={"orange"} onClick={() => {
                            (
                                comment(),
                                toast({
                                    title: 'Commented',
                                    description: "You've commented on the post. ",
                                    status: 'success',
                                    duration: 4000,
                                    isClosable: true,
                                })
                            )
                        }}>Comment</Button>
                    </Flex>
                </Box>
            </Box>
            {cmLoad ?
                null

                :
                <VStack gap={4}>
                    {comments.map((cm: any, key: any) => (
                        <>
                            {/* <CmList
                            key={key}
                            name={cm.commentor.fName + " " + cm.commentor.lName}
                            desc={cm.comment}
                            date={cm.commentedAt}
                            owner={cm.commentor.userId}
                            commentId={cm.commentId}
                        /> */}
                            <Box bg={"white"} boxShadow={"base"} rounded={8} p={3} w={"100%"} >
                                <Flex>
                                    <Avatar
                                        size="sm"
                                        src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + cm.commentor.userId}
                                    ></Avatar>
                                    <Heading ml={2} size={"sm"} alignSelf={"center"}>{cm.commentor.fName + " " + cm.commentor.lName}</Heading>
                                    <Spacer />
                                    {cm.commentor.userId == user?.userId ?
                                        <Menu>
                                            <MenuButton><HiDotsHorizontal /></MenuButton>
                                            <MenuList>
                                                <MenuItem icon={<MdDeleteOutline />} onClick={() => {
                                                    setCmId(cm.commentId)
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
                                {cm.comment}
                                <Flex w={"100%"} h={"100%"} justifyContent={"end"} >
                                    <Text fontSize={"xs"} alignSelf={"end"}>
                                        {new Date(cm.commentedAt).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}
                                    </Text>
                                </Flex>
                            </Box >
                        </>
                    ))}
                    {newComment.map((ncm: any, key: any) => (
                        // <CmList
                        //     key={key}
                        //     name={ncm.cmDetail.fName + " " + ncm.cmDetail.lName}
                        //     desc={ncm.cm.comment}
                        //     date={ncm.cm.commentedAt}
                        //     owner={ncm.cm.userId}
                        //     commentId={ncm.cm.commentId}
                        // />
                        <Box bg={"white"} boxShadow={"base"} rounded={8} p={3} w={"100%"} >
                            <Flex>
                                <Avatar
                                    size="sm"
                                    src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + ncm.cm.userId}
                                ></Avatar>
                                <Heading ml={2} size={"sm"} alignSelf={"center"}>{ncm.cmDetail.fName + " " + ncm.cmDetail.lName}</Heading>
                                <Spacer />
                                {ncm.cm.userId == user?.userId ?
                                    <Menu>
                                        <MenuButton><HiDotsHorizontal /></MenuButton>
                                        <MenuList>
                                            <MenuItem icon={<MdDeleteOutline />} onClick={() => {
                                                setCmId(ncm.cm.commentId)
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
                            {ncm.cm.comment}
                            <Flex w={"100%"} h={"100%"} justifyContent={"end"} >
                                <Text fontSize={"xs"} alignSelf={"end"}>
                                    {new Date(ncm.cm.commentedAt).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}
                                </Text>
                            </Flex>
                        </Box >
                    ))}
                </VStack>
            }
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete shortnote</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure to delete this shortnote?</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            let x = comments.filter((c: any) => c.commentId != cmId)
                            let y = newComment.filter((c: any) => c.cm.commentId != cmId)
                            setComments(x)
                            setNewComment(y)
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
        </Box>

    )
}

export default snComments