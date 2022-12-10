import { Box, Button, Flex, Heading, Textarea, useBoolean, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from 'src/function/API'
import CmList from './cmList'
import Lottie from "lottie-react";
import loading from "./lottie/loading.json";

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
            console.log(res.data);
            console.log(newComment);
        })
    }
    const toast = useToast()
    const [cmLoad, setCmLoad] = useBoolean(true)
    const style = {
        height: 96,
    };
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
                        <CmList
                            key={key}
                            name={cm.commentor.fName + " " + cm.commentor.lName}
                            desc={cm.comment}
                            date={cm.commentedAt}
                            owner={cm.commentor.userId}
                            commentId={cm.commentId}
                        />
                    ))}
                    {newComment.map((ncm: any, key: any) => (
                        <CmList
                            key={key}
                            name={ncm.cmDetail.fName + " " + ncm.cmDetail.lName}
                            desc={ncm.cm.comment}
                            date={ncm.cm.commentedAt}
                            owner={ncm.cm.userId}
                            commentId={ncm.cm.commentId}
                        />
                    ))}
                </VStack>
            }

        </Box>

    )
}

export default snComments