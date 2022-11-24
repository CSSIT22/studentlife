import { Box, Button, Flex, GridItem, Heading, Textarea, useBoolean, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppBody from 'src/components/share/app/AppBody'
import CmList from 'src/components/shortnotes/cmList'
import SnDetail from 'src/components/shortnotes/snDetail'
import SnComments from 'src/components/shortnotes/snComments'
import API from 'src/function/API'

const index = () => {
    const param = useParams()
    const [shortnote, setShortnote] = useState<any>([])
    const [comments, setComments] = useState<any>([])
    const [owner, setOwner] = useState<any>([])
    const [load, setLoad] = useBoolean(true)

    useEffect(() => {
        API.get("shortnotes/getShortnoteDetail/" + param.id).then((item) => {
            setShortnote(item.data)
        }).finally(setLoad.off)
    }, [])                                                                                     // ถ้าเลือกไลบรารี่แล้วกดออกมันจะไม่รีเซ็ต
    useEffect(() => {
        setOwner(shortnote.owner)
        setComments(shortnote.comments)
    }, [shortnote])
    if (load) {
        return (
            <AppBody></AppBody>
        )
    }
    return (

        <AppBody>
            <Box p={6} bg={"white"} boxShadow={"xl"} rounded={8} mb={4}>
                <SnDetail
                    topic={shortnote.snName}
                    course={shortnote.courseId}
                    desc={shortnote.snDesc}
                    link={shortnote.snLink}
                    owner={shortnote.owner.fName + " " + shortnote.owner.lName}
                />
            </Box>
            <Box bg={"white"} boxShadow={"xl"} rounded={8}>
                <GridItem p={6}>

                    <SnComments />
                    {/* <Box mb={4} boxShadow={"base"} rounded={8} p={4}>
                        <Box>
                            <Heading size={"md"} mb={1}>
                                Comments
                            </Heading>
                            <Textarea h={150} mb={2} py={4} placeholder={"What are your thoughts ?"} />
                            <Flex direction={"row"} justifyContent={"end"}>
                                <Button colorScheme={"orange"}>Comment</Button>
                            </Flex>
                        </Box>
                    </Box>
                    <VStack gap={4}>
                        {comments.map((cm: any) => (
                            <CmList
                                name={cm.commentor.fName}
                                desc={cm.comment}
                            />
                        ))}
                    </VStack> */}
                </GridItem>
            </Box>
        </AppBody>
    )
}

export default index