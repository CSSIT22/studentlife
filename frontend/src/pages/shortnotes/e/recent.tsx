import React, { FC, useContext, useEffect, useState } from "react"
import { Box, Heading, VStack } from "@chakra-ui/react"
import { Link, useNavigate, useParams } from "react-router-dom"
import API from "src/function/API"
import AppBody from "src/components/share/app/AppBody"
import ExtraRsnList from "src/components/shortnotes/extraRsnList"
import { FaLock, FaLockOpen, FaUnlock } from "react-icons/fa"
import { TiLockClosed, TiLockOpen } from "react-icons/ti"
const extraRsn = () => {
    useEffect(() => {
        API.get("/shortnotes/getExtraRsn").then((item) => {
            setRecent(item.data)
            console.log(item.data)
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
    return (
        <AppBody>
            <Heading fontSize={"2xl"}>Recent View</Heading>
            <br></br>
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
        </AppBody>
    )
}

export default extraRsn;
