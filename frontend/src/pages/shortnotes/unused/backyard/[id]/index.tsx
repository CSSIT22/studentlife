import { Box, Button, Drawer, Flex, GridItem, Heading, Textarea, useBoolean, VStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppBody from 'src/components/share/app/AppBody'
import CmList from 'src/components/shortnotes/cmList'
import SnDetail from 'src/components/shortnotes/snDetail'
import SnComments from 'src/components/shortnotes/snComments'
import API from 'src/function/API'
import { authContext } from 'src/context/AuthContext'
import { BiLibrary } from 'react-icons/bi'

const pg = () => {
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
            setAccess(shortnote.userAccess)
            const acc = item.data.userAccess
            const x: any = []
            acc.map((ac: any) => (
                x.push(ac.userId)
            ))
            setAccess(x)

            if (x.includes(user?.userId)) {
                setAllow.on()
            }
            console.log(user?.userId)
            console.log(x)
            console.log(x.includes(user?.userId));
            console.log(allow);


            // x.forEach((x: any) => {
            //     console.log(x == user?.userId);
            //     if (x == user) {
            //         setAllow.on
            //     }
            // })
            // console.log(user?.userId);

            // console.log(allow)

        }).finally(setLoad.off)

    }, [])

    // useEffect(() => {
    //     setAccess(shortnote.userAccess)
    // }, [shortnote])

    return (
        <AppBody>
            {allow ? "Yes" : "No"}
        </AppBody>
    )
}

export default pg
