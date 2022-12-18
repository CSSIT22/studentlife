import React, { FC, useContext, useEffect, useState } from "react"
import { Box, Heading, useBoolean, VStack } from "@chakra-ui/react"
import { Link, useNavigate, useParams } from "react-router-dom"
import API from "src/function/API"
import AppBody from "src/components/share/app/AppBody"
import ExtraRsnList from "src/components/shortnotes/extraRsnList"
import { FaLock, FaLockOpen, FaUnlock } from "react-icons/fa"
import { TiLockClosed, TiLockOpen } from "react-icons/ti"
import loading from "../lottie/loading.json";
import Lottie from "lottie-react"

const extraRsn = () => {
    useEffect(() => {
        API.get("/shortnotes/getExtraRsn").then((item) => {
            setRecent(item.data)
        }).then((res) => {
            setIsLoad.off()
        })
    }, [])
    const [recent, setRecent] = useState<any>([])

    const [access, setAccess] = useState<any>([])
    const [accessId, setAccessId] = useState<any[]>([])

    useEffect(() => {
        API.get("/shortnotes/getAccess").then((item) => {
            setAccess(item.data)
        })
    }, [])
    useEffect(() => {
        access.forEach((a: any) => {
            //console.log(a.snId);
            setAccessId((accessId: any) => [...accessId, a.snId])

        })
    }, [access])

    const navigate = useNavigate()

    const [isLoad, setIsLoad] = useBoolean(true)
    const style = {
        height: 100,
    };
    return (
        <AppBody>
            <Heading fontSize={"2xl"}>Recent View</Heading>
            <br></br>
            {isLoad ?
                <Box h={180}>
                    <Lottie style={style} animationData={loading}></Lottie>
                </Box>
                :
                <VStack gap={2}>
                    {recent.map((recent: any, key: any) => (
                        <Box as="button"
                            w={"100%"} onClick={() => {

                                navigate({
                                    pathname: "../shortnotes/" + recent.shortNote.snId,
                                })
                            }}>
                            {accessId.includes(recent.shortNote.snId) ?
                                <ExtraRsnList key={key} topic={recent.shortNote.snName} course={recent.shortNote.course.courseName} date={recent.viewedAt} lock={recent.shortNote.isPublic ? "" : <TiLockOpen />}></ExtraRsnList>
                                :
                                <ExtraRsnList key={key} topic={recent.shortNote.snName} course={recent.shortNote.course.courseName} date={recent.viewedAt} lock={recent.shortNote.isPublic ? "" : <TiLockClosed />}></ExtraRsnList>

                            }
                        </Box>
                    ))}
                </VStack>
            }

        </AppBody>
    )
}

export default extraRsn;
