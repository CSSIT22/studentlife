import { Box, Button, Flex, GridItem, Heading, Textarea, useBoolean, VStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppBody from 'src/components/share/app/AppBody'
import CmList from 'src/components/shortnotes/cmList'
import SnDetail from 'src/components/shortnotes/snDetail'
import SnComments from 'src/components/shortnotes/snComments'
import API from 'src/function/API'
import { authContext } from 'src/context/AuthContext'

const index = () => {
    const user = useContext(authContext)
    //{ console.log(user?.userId) }
    const param = useParams()
    const [shortnote, setShortnote] = useState<any>([])
    const [access, setAccess] = useState<any>([])
    const [load, setLoad] = useBoolean(true)
    const [allow, setAllow] = useBoolean(false)
    let userAccess: any = []

    useEffect(() => {
        API.get("shortnotes/getShortnoteDetail/" + param.id).then((item) => {
            if (item.data.isPublic) {
                setAllow.on()
                setShortnote(item.data)
            } else {
                setAccess(item.data.userAccess)
                const acc = item.data.userAccess
                const x: any = []
                acc.map((ac: any) => (
                    x.push(ac.userId)
                ))
                setAccess(x)

                if (x.includes(user?.userId)) {
                    setAllow.on()
                }
                setShortnote(item.data)
            }

            // console.log(user?.userId)
            // console.log(x)
            // console.log(x.includes(user?.userId));
            // console.log(allow);
            // console.log(item.data.isPublic);



        }).finally(setLoad.off)

    }, [])
    if (load) {
        return (
            <AppBody><Heading>Loading...</Heading></AppBody>
        )
    }
    return (
        <AppBody>
            {allow ? <Box><Box p={6} bg={"white"} boxShadow={"xl"} rounded={8} mb={4}>
                <SnDetail
                    topic={shortnote.snName}
                    course={shortnote.courseId}
                    desc={shortnote.snDesc}
                    link={shortnote.snLink}
                    owner={shortnote.owner.fName + " " + shortnote.owner.lName}
                    date={shortnote.created}
                />
            </Box>
                <Box bg={"white"} boxShadow={"xl"} rounded={8} p={6}>
                    <SnComments />
                </Box>
            </Box>
                :
                <Box>
                    <Flex bg={"white"} rounded={8} boxShadow={"xl"} w={"100%"} h={"100%"}>
                        <Heading alignSelf={"center"} textAlign={"center"}>Sorry, you don't have a permission to access this shortnote.</Heading>
                    </Flex>
                </Box>
            }
        </AppBody>
    )
}

export default index