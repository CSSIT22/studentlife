import React, { FC, useContext, useEffect, useState } from "react"
import { Box, Button, Flex, Heading, HStack, useBoolean, VStack } from "@chakra-ui/react"
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
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(8)
    let indexOfLastSn = currentPage * postsPerPage
    let indexOfFirstSn = indexOfLastSn - postsPerPage
    let currentSn = recent.slice(indexOfFirstSn, indexOfLastSn)
    let pageNumbers = []
    for (let i = 1; i <= Math.ceil(recent.length / postsPerPage); i++) {
        pageNumbers.push(i)

    }
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
                    {currentSn.map((recent: any, key: any) => (
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
            <Flex w={"100%"} justifyContent={"center"} mt={4}>
                <HStack >
                    {pageNumbers.map((no: any, key: any) => (
                        <Button key={key} onClick={() => { setCurrentPage(no) }} bg={"white"} rounded={"full"} size={"md"}  {...(currentPage === no && {
                            _hover: { bg: "orange.500" },
                            bg: "orange.500",
                            color: "white",
                        })}>{no}</Button>
                    ))}
                </HStack>
            </Flex>
        </AppBody>
    )
}

export default extraRsn;
