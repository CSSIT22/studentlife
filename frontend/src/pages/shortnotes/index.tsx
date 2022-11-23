import { Box, Heading, Text, Flex, Spacer, HStack, SimpleGrid, VStack, Select, useDisclosure, Stack } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import AppBody from "../../components/share/app/AppBody"
import Rsn from "../../components/shortnotes/rsnList"
import SnList from "../../components/shortnotes/snList"
import Li from "../../components/shortnotes/liList"
import BtnMl from "../../components/shortnotes/btnMyLibrary"
import BtnNs from "../../components/shortnotes/btnNewShortnote"
import { FaLock } from "react-icons/fa"
import API from "src/function/API"
const index = () => {
    const [sn, setSn] = useState([])
    useEffect(() => {
        API.get("/shortnotes/getShortnotes").then((item) => {
            setSn(item.data)
            //console.log(item.data)
        })
    }, [])

    const [rsn, setRsn] = useState([])
    useEffect(() => {
        API.get("/shortnotes/getResentShortnotes").then((item) => {
            setRsn(item.data)
            //console.log(item.data)
        })
    }, [])

    const [course, setCourse] = useState([])
    useEffect(() => {
        API.get("/shortnotes/getCourses").then((item) => {
            setCourse(item.data)
            //console.log(item.data)
        })
    }, [])
    const { isOpen: mlIsOpen, onOpen: mlOnOpen, onClose: mlOnClose } = useDisclosure()
    const { isOpen: nlIsOpen, onOpen: nlOnOpen, onClose: nlOnClose } = useDisclosure()
    const { isOpen: nsIsOpen, onOpen: nsOnOpen, onClose: nsOnClose } = useDisclosure()

    const btnRef = React.useRef()

    const [useRadio, setRadio] = useState("Public")

    const closeSnModal = () => {
        nsOnClose()
        setRadio("Public")
    }

    const [snPicked, setSnPicked] = useState("")

    const [coursePicked, setCoursePicked] = useState("")

    const [filtered, setFiltered] = useState<any>([])
    useEffect(() => {
        dataFiltered() //what to do
    }, [coursePicked]) // what to track
    const picked = (e: any) => {
        setCoursePicked(e.target.value)
    }
    const dataFiltered = () => {
        setFiltered(sn.filter((items: any) => items.courseId == coursePicked))
    }
    const navigate = useNavigate()

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
            <Box mt={4} mb={12}>
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 4, sm: 6 }} textAlign={"center"}>
                    {rsn.map((rsn: any, key) => (
                        <Box as="button" onClick={() => {
                            navigate({
                                pathname: "./" + "s/" + rsn.shortNote.snId,
                            })
                        }}>
                            <Rsn key={key} topic={rsn.shortNote.snName} viewAt={rsn.viewedAt}></Rsn>

                        </Box>
                    ))}
                </SimpleGrid>
            </Box>

            {/*Shortnote list section*/}
            <Flex alignItems={"end"}>
                <BtnNs />
                <Spacer />
                <Stack direction={"row"}>
                    <VStack>
                        <Text alignSelf={"start"}>Sort by</Text>
                        <Select focusBorderColor="orange.500" variant="filled" placeholder="None">
                            <option value="option1">Name</option>
                            <option value="option2">Newest</option>
                            <option value="option2">Oldest</option>
                        </Select>
                    </VStack>
                    <VStack>
                        <Text alignSelf={"start"}>Course</Text>
                        <Select focusBorderColor="orange.500" variant="filled" placeholder="All" onChange={(e) => picked(e)}>
                            {course.map((course: any, key) => (
                                <option value={course.courseName}>{course.courseName}</option>
                            ))}
                        </Select>
                    </VStack>
                </Stack>
            </Flex>
            <VStack gap={2} pt={4}>
                {coursePicked == "" ? (
                    <>
                        {sn.map((sn: any) => (
                            <Box
                                as="button"
                                w={"100%"}
                                onClick={() => {
                                    setSnPicked(sn.id)
                                    navigate({
                                        pathname: "./" + "s/" + sn.snId,
                                    })
                                    console.log(snPicked)
                                }}
                            >
                                <SnList topic={sn.snName} course={sn.courseId} date={sn.created} lock={sn.isPublic ? "" : <FaLock />} />
                            </Box>
                        ))}
                    </>
                ) : (
                    <>
                        {filtered.map((sn: any) => (
                            <Box
                                as="button"
                                w={"100%"}
                                onClick={() => {
                                    setSnPicked(sn.id)
                                    navigate({
                                        pathname: "./" + "s/" + sn.snId,
                                    })
                                    console.log(snPicked)
                                }}
                            >
                                <SnList topic={sn.snName} course={sn.courseId} date={sn.created} lock={sn.isPublic ? "" : <FaLock />} />
                            </Box>
                        ))}
                    </>
                )}
            </VStack>
        </AppBody>
    )
}

export default index
