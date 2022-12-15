import { Box, Heading, Text, Flex, Spacer, HStack, SimpleGrid, VStack, Select, useDisclosure, Stack, Collapse, SlideFade, useBoolean, Input } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import AppBody from "../../components/share/app/AppBody"
import Rsn from "../../components/shortnotes/rsnList"
import SnList from "../../components/shortnotes/snList"
import Li from "../../components/shortnotes/liList"
import BtnMl from "../../components/shortnotes/btnMyLibrary"
import BtnNs from "../../components/shortnotes/btnNewShortnote"
import { FaLock, FaLockOpen, FaUnlock } from "react-icons/fa"
import API from "src/function/API"
import Lottie from "lottie-react";
import loading from "./lottie/loading.json";
const index = () => {
    const [sn, setSn] = useState([])
    useEffect(() => {
        API.get("/shortnotes/getShortnotes").then((item) => {
            setSn(item.data)
            //setSsn(item.data)
            //console.log(item.data)
        }).finally(() => {
            setsnLoad.off()
            onToggle()
        })
    }, [])

    const [rsn, setRsn] = useState([])
    useEffect(() => {
        API.get("/shortnotes/getResentShortnotes").then((item) => {
            setRsn(item.data)
            //console.log(item.data)

        }).finally(() => {
            setRsnLoad.off()
            rsnOnToggle()
        })
    }, [])

    const [course, setCourse] = useState([])
    useEffect(() => {
        API.get("/shortnotes/getCourses").then((item) => {
            setCourse(item.data)
            //console.log(item.data)
        })
    }, [])

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

    const { isOpen: mlIsOpen, onOpen: mlOnOpen, onClose: mlOnClose } = useDisclosure()
    const { isOpen: nlIsOpen, onOpen: nlOnOpen, onClose: nlOnClose } = useDisclosure()
    const { isOpen: nsIsOpen, onOpen: nsOnOpen, onClose: nsOnClose } = useDisclosure()
    const { isOpen, onToggle } = useDisclosure()
    const { isOpen: rsnIsOpen, onToggle: rsnOnToggle } = useDisclosure()

    const btnRef = React.useRef()

    const [useRadio, setRadio] = useState("Public")

    const closeSnModal = () => {
        nsOnClose()
        setRadio("Public")
    }

    const [searchSn, setSearchSn] = useState("")

    const [snPicked, setSnPicked] = useState("")

    const [coursePicked, setCoursePicked] = useState("")

    const [snByCourse, setSnByCourse] = useState<any>([])

    // useEffect(() => {
    //     setSnByCourse(sn.filter((items: any) => items.courseId == coursePicked)) //what to do
    // }, [coursePicked]) // what to track

    useEffect(() => {
        setSsn(sn.filter((items: any) => {
            return (
                items.snName.toLowerCase().includes(searchSn)
            )
        }))
    }, [searchSn])

    useEffect(() => {
        setSsn(sn.filter((items: any) => items.courseId == coursePicked))
    }, [coursePicked])

    const picked = (e: any) => {
        //console.log(e.target.value);
        setCoursePicked(e.target.value)
    }
    const navigate = useNavigate()
    const [ssn, setSsn] = useState<any>([])
    const [rsnLoad, setRsnLoad] = useBoolean(true)
    const [snLoad, setsnLoad] = useBoolean(true)
    const style = {
        height: 100,
    };
    return (
        <AppBody>
            {/*Recent view list section*/}
            <HStack mt={10}>
                <Heading size={"sm"} alignSelf={"end"}>
                    Recent view
                </Heading>
                <Spacer />
                <BtnMl />
            </HStack>
            {rsnLoad ?
                <Box h={152}>

                    <Lottie style={style} animationData={loading}></Lottie>
                </Box>
                :
                <SlideFade in={isOpen} offsetY='20px'>
                    <Box mt={4} mb={12}>
                        <SimpleGrid columns={{ base: 1, sm: 3 }} gap={{ base: 4, sm: 4 }} textAlign={"center"}>
                            {rsn.map((rsn: any, key) => (
                                <Box as="button" onClick={() => {
                                    navigate({
                                        pathname: "./" + rsn.shortNote.snId,
                                    })
                                }}>
                                    {accessId.includes(rsn.shortNote.snId) ?
                                        <Rsn key={key} topic={rsn.shortNote.snName} viewAt={rsn.viewedAt} lock={rsn.shortNote.isPublic ? "" : <FaUnlock />}></Rsn>
                                        :
                                        <Rsn key={key} topic={rsn.shortNote.snName} viewAt={rsn.viewedAt} lock={rsn.shortNote.isPublic ? "" : <FaLock />}></Rsn>

                                    }
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Box>
                </SlideFade>
            }

            {/*Shortnote list section*/}
            <Flex alignItems={"end"}>
                <BtnNs />
                <Input variant={"filled"} focusBorderColor="orange.500" bg={"gray.50"} borderColor={"gray.200"} placeholder={"Search here."} mx={8} onChange={(e) => setSearchSn(e.target.value)}></Input>
                <Stack direction={"row"}>
                    <VStack>
                        <Text alignSelf={"start"}>Sort by</Text>
                        <Select w={"110px"} _focus={{ bg: '#f5f5f5' }} _hover={{ cursor: "pointer", bg: 'gray.200' }} focusBorderColor="orange.500" variant="filled" placeholder="None">
                            <option value="option1">Name</option>
                            <option value="option2">Newest</option>
                            <option value="option2">Oldest</option>
                        </Select>
                    </VStack>
                    <VStack>
                        <Text alignSelf={"start"}>Course</Text>
                        <Select w={"110px"} _focus={{ bg: '#f5f5f5' }} _hover={{ cursor: "pointer", bg: 'gray.200' }} focusBorderColor="orange.500" variant="filled" placeholder="All" onChange={(e) => picked(e)}>
                            {course.map((course: any, key) => (
                                <option key={key} value={course.courseId}>{course.courseName}</option>
                            ))}
                        </Select>
                    </VStack>
                </Stack>
            </Flex>
            {snLoad ? <Lottie style={style} animationData={loading}></Lottie>
                :
                <Collapse in={rsnIsOpen} animateOpacity>
                    <VStack gap={2} pt={4} mb={4}>
                        {coursePicked == "" && searchSn == "" ? (
                            <>
                                {sn.map((sn: any, key: any) => (
                                    <Box
                                        as="button"
                                        w={"100%"}
                                        onClick={() => {
                                            setSnPicked(sn.id)
                                            navigate({
                                                pathname: "./" + sn.snId,
                                            })
                                            //console.log(snPicked)
                                        }}
                                    >
                                        {accessId.includes(sn.snId) ?
                                            <SnList key={key} topic={sn.snName} course={sn.course.courseName} date={sn.created} lock={sn.isPublic ? "" : <FaUnlock />} />
                                            :
                                            <SnList key={key} topic={sn.snName} course={sn.course.courseName} date={sn.created} lock={sn.isPublic ? "" : <FaLock />} />
                                        }

                                    </Box>
                                ))}
                            </>
                        ) : (
                            <>
                                {ssn.map((sn: any, key: any) => (
                                    <Box
                                        as="button"
                                        w={"100%"}
                                        onClick={() => {
                                            setSnPicked(sn.id)
                                            navigate({
                                                pathname: "./" + sn.snId,
                                            })
                                            console.log(snPicked)
                                        }}
                                    >
                                        {accessId.includes(sn.snId) ?
                                            <SnList key={key} topic={sn.snName} course={sn.course.courseName} date={sn.created} lock={sn.isPublic ? "" : <FaUnlock />} />
                                            :
                                            <SnList key={key} topic={sn.snName} course={sn.course.courseName} date={sn.created} lock={sn.isPublic ? "" : <FaLock />} />
                                        }
                                    </Box>
                                ))}
                            </>
                        )}
                    </VStack>
                </Collapse>
            }

        </AppBody>
    )
}

export default index
