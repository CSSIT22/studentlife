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
            setShortnote(item.data)
        }).finally(setLoad.off)

    }, [])

    useEffect(() => {
        {
            setAccess(shortnote.userAccess)
        }
    }, [shortnote])

    {
        console.log(access);
    }

    if (load) {
        return (
            <AppBody><Heading>Loading...</Heading></AppBody>
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
                    date={shortnote.created}
                />
            </Box>
            <Box bg={"white"} boxShadow={"xl"} rounded={8} p={6}>
                <SnComments />
            </Box>
        </AppBody>
    )
}

export default index