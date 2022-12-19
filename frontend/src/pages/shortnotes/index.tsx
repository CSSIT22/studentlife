import { Box, Heading, Text, Flex, Spacer, HStack, SimpleGrid, VStack, Select, useDisclosure, Stack, Collapse, SlideFade, useBoolean, Input, Button, Show, Hide, Grid, GridItem } from "@chakra-ui/react"
import React, { useEffect, useMemo, useState } from "react"
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
import extraRsnList from "./e/recent"
import { BsBoxArrowInRight } from "react-icons/bs"
import { TiLockClosed, TiLockOpen } from "react-icons/ti"
import { AiOutlineArrowRight, AiOutlineHistory } from "react-icons/ai"
const index = () => {
    const { isOpen, onToggle } = useDisclosure()
    const { isOpen: rsnIsOpen, onToggle: rsnOnToggle } = useDisclosure()
    const [sn, setSn] = useState([])
    const [snByName, setSnByName] = useState([])
    const [snByNewest, setSnByNewest] = useState([])
    const [snByOldest, setSnByOldest] = useState([])
    const [snOg, setSnOg] = useState([])
    useEffect(() => {
        API.get("/shortnotes/getOgShortnotes").then((item) => {
            setSnOg(item.data)
            setSsn(item.data)
        }).then(() => {
            API.get("/shortnotes/getShortnotes").then((item) => {
                setSn(item.data)
            })
        }).then(() => {
            API.get("/shortnotes/getShortnotesByName").then((item) => {
                setSnByName(item.data)
            })

        }).then(() => {
            API.get("/shortnotes/getShortnotesByOldest").then((item) => {
                setSnByOldest(item.data)
            })
        }).then(() => {
            API.get("/shortnotes/getShortnotesByNewest").then((item) => {
                setSnByNewest(item.data)
            })
        }).finally(() => {
            setsnLoad.off()
            onToggle()
        })

    }, [])

    const [rsn, setRsn] = useState([])
    useEffect(() => {
        API.get("/shortnotes/getResentShortnotes").then((item) => {
            setRsn(item.data)

        }).finally(() => {
            setRsnLoad.off()
            rsnOnToggle()
        })
    }, [])

    const [course, setCourse] = useState([])
    useEffect(() => {
        API.get("/shortnotes/getCourses").then((item) => {
            setCourse(item.data)
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
            setAccessId((accessId: any) => [...accessId, a.snId])

        })
    }, [access])



    const [sortType, setSortType] = useState("")

    const [searchSn, setSearchSn] = useState("")

    const [snPicked, setSnPicked] = useState("")

    const [coursePicked, setCoursePicked] = useState("")

    const [snByCourse, setSnByCourse] = useState<any>([])

    const picked = (e: any) => {
        setCoursePicked(e.target.value)
    }
    const navigate = useNavigate()
    const [ssn, setSsn] = useState<any>([])
    const [rsnLoad, setRsnLoad] = useBoolean(true)
    const [snLoad, setsnLoad] = useBoolean(true)
    const style = {
        height: 100,
    };

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(5)
    let indexOfLastSn = currentPage * postsPerPage
    let indexOfFirstSn = indexOfLastSn - postsPerPage
    let currentSn = ssn.slice(indexOfFirstSn, indexOfLastSn)
    let pageNumbers = []
    for (let i = 1; i <= Math.ceil(ssn.length / postsPerPage); i++) {
        pageNumbers.push(i)

    }

    const filteredSn = useMemo(() => {
        let filteredSn = snOg;

        if (sortType || sortType == "") {
            if (sortType === "") {
                filteredSn = snOg
            } else if (sortType === "1") {
                filteredSn = snByOldest
            } else if (sortType === "2") {
                filteredSn = snByNewest
            } else if (sortType === "3") {
                filteredSn = snByName
            }
        }

        if (searchSn) {
            filteredSn = filteredSn.filter((items: any) => items.snName.toLowerCase().includes(searchSn.toLowerCase()));
        }

        if (coursePicked) {
            filteredSn = filteredSn.filter((items: any) => items.courseId == coursePicked);
        }

        return filteredSn;
    }, [sn, searchSn, coursePicked, sortType]);

    useEffect(() => {
        setSsn(filteredSn);
    }, [filteredSn]);
    return (
        <AppBody>
            {/*Recent view list section*/}
            <HStack mt={4}>
                <Heading size={"xs"} alignSelf={"end"} mb={-3}>
                    Recent view
                </Heading>
                <Spacer />
                <BtnMl />
            </HStack>
            {rsnLoad ?
                <Box h={180}>

                    <Lottie style={style} animationData={loading}></Lottie>
                </Box>
                :
                <>
                    <SlideFade in={isOpen} offsetY='20px'>
                        <Box mt={4} mb={9}>
                            <SimpleGrid columns={{ base: 1, sm: 3 }} gap={{ base: 4, sm: 4 }} textAlign={"center"}>
                                {rsn.map((rsn: any, key) => (
                                    <Box key={key} as="button" onClick={() => {
                                        navigate({
                                            pathname: "./" + rsn.shortNote.snId,
                                        })
                                    }}>
                                        {accessId.includes(rsn.shortNote.snId) ?
                                            <Rsn topic={rsn.shortNote.snName} viewAt={rsn.viewedAt} lock={rsn.shortNote.isPublic ? "" : <TiLockOpen />}></Rsn>
                                            :
                                            <Rsn topic={rsn.shortNote.snName} viewAt={rsn.viewedAt} lock={rsn.shortNote.isPublic ? "" : <TiLockClosed />}></Rsn>

                                        }
                                    </Box>
                                ))}
                            </SimpleGrid>
                            {rsn.length == 3 ?
                                <Flex justifyContent={{ base: "center", sm: " right" }}>
                                    <Button mt={2} rightIcon={<AiOutlineArrowRight />} variant={"ghost"} size={"sm"} onClick={() => {
                                        navigate({
                                            pathname: "./e/" + "recent",
                                        })
                                    }}>See more</Button>
                                </Flex>
                                :
                                null
                            }
                        </Box>
                    </SlideFade>
                </>
            }

            {/*Shortnote list section*/}
            <Flex alignItems={"end"}>
                <BtnNs />
                <Spacer />
                <Show above="md">
                    <Input variant={"filled"} focusBorderColor="orange.500" bg={"gray.50"} borderColor={"gray.200"} placeholder={"Search here."} mx={4} onChange={(e) => setSearchSn(e.target.value)}></Input>
                </Show>
                <Stack direction={"row"}>
                    <VStack>
                        <Text alignSelf={"start"}>Sort by</Text>
                        <Select w={"110px"} _focus={{ bg: '#f5f5f5' }} _hover={{ cursor: "pointer", bg: 'gray.200' }} focusBorderColor="orange.500" variant="filled" placeholder="None" onChange={((e: any) => setSortType(e.target.value))}>
                            <option value="1">Oldest</option>
                            <option value="2">Newest</option>
                            <option value="3">Name</option>
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
            <Hide above="md">
                <Input variant={"filled"} focusBorderColor="orange.500" bg={"gray.50"} borderColor={"gray.200"} placeholder={"Search here."} mt={4} onChange={(e) => setSearchSn(e.target.value)}></Input>

            </Hide>

            {
                snLoad ?
                    <Box mt={100}>
                        <Lottie style={style} animationData={loading}></Lottie>

                    </Box>
                    :
                    <Collapse in={rsnIsOpen} animateOpacity>
                        <VStack gap={2} pt={4} mb={4}>
                            {coursePicked == "" && searchSn == "" ? (
                                <>
                                    {currentSn.map((sn: any, key: any) => (
                                        <Box
                                            key={key}
                                            as="button"
                                            w={"100%"}
                                            onClick={() => {
                                                setSnPicked(sn.id)
                                                navigate({
                                                    pathname: "./" + sn.snId,
                                                })
                                            }}
                                        >
                                            {accessId.includes(sn.snId) ?
                                                <SnList topic={sn.snName} course={sn.course.courseName} date={sn.created} lock={sn.isPublic ? "" : <TiLockOpen />} />
                                                :
                                                <SnList topic={sn.snName} course={sn.course.courseName} date={sn.created} lock={sn.isPublic ? "" : <TiLockClosed />} />
                                            }

                                        </Box>
                                    ))}
                                    <Flex w={"100%"} justifyContent={"center"} mb={4}>
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
                                </>
                            ) : (
                                <>
                                    {ssn.map((sn: any, key: any) => (
                                        <Box
                                            key={key}
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
                                                <SnList topic={sn.snName} course={sn.course.courseName} date={sn.created} lock={sn.isPublic ? "" : <TiLockOpen />} />
                                                :
                                                <SnList topic={sn.snName} course={sn.course.courseName} date={sn.created} lock={sn.isPublic ? "" : <TiLockClosed />} />
                                            }
                                        </Box>
                                    ))}
                                </>
                            )}
                        </VStack>
                    </Collapse>
            }
        </AppBody >
    )
}

export default index
