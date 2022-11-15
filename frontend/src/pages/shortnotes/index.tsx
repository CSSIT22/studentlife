import { Box, Heading, Text, Flex, Spacer, HStack, SimpleGrid, VStack, Select, useDisclosure, Stack } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AppBody from "../../components/share/app/AppBody"
import Rsn from "../../components/shortnotes/rsnList"
import SnList from "../../components/shortnotes/snList"
import Li from "../../components/shortnotes/liList"
import BtnMl from "../../components/shortnotes/btnMyLibrary"
import BtnNs from "../../components/shortnotes/btnNewShortnote"
import { FaLock } from "react-icons/fa"
const index = () => {
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
        setFiltered(data.sn.filter((items) => items.course == coursePicked))
    }

    const data = {
        sn: [
            {
                id: "9b1deb4d-3b7d-4bad-fb78-2b0d7b3dcb6d",
                topic: "How to make ER diagram in 10 minutes.",
                course: "CSC218",
                owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
                createAt: "10-6-22",
                isPublic: false,
            },
            {
                id: "f6hjk89o-d458-4bad-9bdd-j8fklg0d9ifh",
                topic: "Network foro eginner.",
                course: "CSC220",
                owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
                createAt: "10-6-22",
                isPublic: true,
            },
            {
                id: "fvb4h8l6-3b7d-f5jv-grt7-lfepgb9ogldg",
                topic: "Productive with agile.",
                course: "CSC218",
                owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
                createAt: "10-6-22",
                isPublic: true,
            },
            {
                id: "9b1deb4d-3b7d-4bad-fb78-2b0d7b3dcb6d",
                topic: "How to make ER diagram in 10 minutes.",
                course: "CSC218",
                owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
                createAt: "10-6-22",
                isPublic: false,
            },
            {
                id: "f6hjk89o-d458-4bad-9bdd-j8fklg0d9ifh",
                topic: "Network foro eginner.",
                course: "CSC220",
                owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
                createAt: "10-6-22",
                isPublic: true,
            },
            {
                id: "fvb4h8l6-3b7d-f5jv-grt7-lfepgb9ogldg",
                topic: "Productive with agile.",
                course: "CSC218",
                owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
                createAt: "10-6-22",
                isPublic: true,
            },
        ],

        rsn: [
            {
                id: "9b1deb4d-3b7d-4bad-fb78-2b0d7b3dcb6d",
                topic: "How to make ER diagram in 10 minutes.",
                course: "CSC218",
                owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
                createAt: "10-6-22",
                isPublic: true,
            },
            {
                id: "f6hjk89o-d458-4bad-9bdd-j8fklg0d9ifh",
                topic: "Shortest path",
                course: "CSC210",
                owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
                createAt: "10-6-22",
                isPublic: false,
            },
            {
                id: "fvb4h8l6-3b7d-f5jv-grt7-lfepgb9ogldg",
                topic: "Java programming",
                course: "CSC110",
                owner: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
                createAt: "10-6-22",
                isPublic: true,
            },
        ],

        course: ["CSC210", "CSC213", "CSC218", "CSC220", "CSC110", "MTH110"],
    }
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
                <SimpleGrid columns={{ base: 1, sm: 3 }} gap={{ base: 4, sm: 6 }} textAlign={"center"}>
                    {data.rsn.map((rsn, key) => (
                        <Rsn key={key} topic={rsn.topic}></Rsn>
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
                            {data.course.map((course, key) => (
                                <option value={course}>{course}</option>
                            ))}
                        </Select>
                    </VStack>
                </Stack>
            </Flex>
            <VStack gap={2} pt={4}>
                {/* {data.sn.map((sn, key) => (
                    <Box
                        as="button"
                        w={"100%"}
                        onClick={() => {
                            setSnPicked(sn.id)
                            console.log(snPicked)
                        }}
                    >
                        <SnList key={key} topic={sn.topic} course={sn.course} date={sn.createAt} lock={sn.isPublic ? "" : <FaLock />} />
                    </Box>
                ))} */}

                {coursePicked == "" ? (
                    <>
                        {data.sn.map((sn: any) => (
                            <Box
                                as="button"
                                w={"100%"}
                                onClick={() => {
                                    setSnPicked(sn.id)
                                    console.log(snPicked)
                                }}
                            >
                                <SnList topic={sn.topic} course={sn.course} date={sn.createAt} lock={sn.isPublic ? "" : <FaLock />} />
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
                                    console.log(snPicked)
                                }}
                            >
                                <SnList topic={sn.topic} course={sn.course} date={sn.createAt} lock={sn.isPublic ? "" : <FaLock />} />
                            </Box>
                        ))}
                    </>
                )}
            </VStack>
        </AppBody>
    )
}

export default index
