import { Box, Button, Flex, Heading, Textarea, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from 'src/function/API'
import CmList from './cmList'

const snComments = () => {
    const [comments, setComments] = useState<any>([])
    const param = useParams()

    useEffect(() => {
        API.get("shortnotes/getComments/" + param.id).then((item) => {
            setComments(item.data)
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
                                    duration: 9000,
                                    isClosable: true,
                                })
                            )
                        }}>Comment</Button>
                    </Flex>
                </Box>
            </Box>
            <VStack gap={4}>
                {comments.map((cm: any) => (
                    <CmList
                        name={cm.commentor.fName + " " + cm.commentor.lName}
                        desc={cm.comment}
                        date={cm.commentedAt}
                    />
                ))}
            </VStack>
        </Box>

    )
}

export default snComments