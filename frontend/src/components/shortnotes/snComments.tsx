import { Box, Button, Flex, Heading, Textarea, useBoolean, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from 'src/function/API'
import CmList from './cmList'
import Lottie from "lottie-react";
import loading from "./lottie/loading.json";

const snComments = () => {
    const [comments, setComments] = useState<any>([])
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
                    <Textarea h={150} mb={2} py={4} placeholder={"What are your thoughts ?"} value={comm} onChange={(e) => setComm(e.target.value)} />
                    <Flex direction={"row"} justifyContent={"end"}>
                        <Button colorScheme={"orange"} onClick={() => {
                            (
                                comment(),
                                toast({
                                    title: 'Commented',
                                    description: "Your commented complete. ",
                                    status: 'success',
                                    duration: 4000,
                                    isClosable: true,
                                })
                            )
                        }}>Comment</Button>
                    </Flex>
                </Box>
            </Box>
            {cmLoad ? <Box><Lottie style={style} animationData={loading}></Lottie></Box>

                :
                <VStack gap={4}>
                    {comments.map((cm: any) => (
                        <CmList
                            name={cm.commentor.fName + " " + cm.commentor.lName}
                            desc={cm.comment}
                            date={cm.commentedAt}
                        />
                    ))}
                </VStack>
            }

        </Box>

    )
}

export default snComments