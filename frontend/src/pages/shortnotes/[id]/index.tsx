import { Box, Button, Flex, GridItem, Heading, Textarea, useBoolean, VStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppBody from 'src/components/share/app/AppBody'
import CmList from 'src/components/shortnotes/cmList'
import SnDetail from 'src/components/shortnotes/snDetail'
import SnComments from 'src/components/shortnotes/snComments'
import API from 'src/function/API'
import { authContext } from 'src/context/AuthContext'
import Lottie from "lottie-react";
import loading from "../lottie/loading.json";

const index = () => {
    const user = useContext(authContext)
    //{ console.log(user?.userId) }
    const param = useParams()
    const [shortnote, setShortnote] = useState<any>([])
    const [access, setAccess] = useState<any>([])
    const [load, setLoad] = useBoolean(true)
    const [allow, setAllow] = useBoolean(false)
    const style = {
        height: 96,
    };
    const [ress, setRess] = useState<any>([])
    const resentOnclick = () => {
        API.post("/shortnotes/postResentShortnote", {
            snId: param.id
        })
    }
    useEffect(() => {
        API.get("shortnotes/getShortnoteDetail/" + param.id).then((item) => {
            resentOnclick()
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

        }).finally(setLoad.off)
        file()
    }, [])
    const file = () => {
        API.get("/shortnotes/getFile", {
            data: {
                snId: param.id
            }
        }).then((res) => {
            setRess(res.data)
            //console.log(res.data);

        })

    }
    useEffect(() => {
        ress.forEach((res: any) => {
            console.log(ress);

            API.get("/shortnotes/getEachFile", {
                data: res,

                responseType: "arraybuffer"
            }).then((res2) => {
                console.log(res2.data);

            })
        });

    }, [ress])

    if (load) {
        return (
            <AppBody><Box mt={300}><Lottie style={style} animationData={loading}></Lottie></Box></AppBody>
        )
    }
    return (
        <AppBody>
            {allow ? <Box><Box p={6} bg={"white"} boxShadow={"xl"} rounded={8} mb={4}>
                <SnDetail
                    topic={shortnote.snName}
                    course={shortnote.course.courseName}
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
                <Box mt={300}>
                    <Flex bg={"white"} rounded={8} boxShadow={"xl"} w={"100%"} h={"100%"}>
                        <Heading alignSelf={"center"} textAlign={"center"}>Sorry, you don't have the permission to access this shortnote.</Heading>
                    </Flex>
                </Box>
            }
        </AppBody>
    )
}

export default index