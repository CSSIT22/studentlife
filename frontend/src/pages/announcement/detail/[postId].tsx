import { Box, Flex, Grid, GridItem, Heading, Select, Show, Spacer, Stack, Text, useBoolean } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { GrClose } from "react-icons/gr"
import { Link, useParams } from "react-router-dom"
import AppBody from "../../../components/share/app/AppBody"
import { postInfoTest } from "../postInfoTest"
import { announcement, announcement_language } from "@apiType/announcement"
import API from "src/function/API"


const detail = () => {
    const [langInfos, setlanginfos] = useState<announcement_language[]>([])
    const newData = API.get("/announcement/getotherlang")
    useEffect(() => {
        newData.then(res => setlanginfos(res.data))
    }, [])

    const params = useParams()
    // console.log(params.postId)
    // const post = postInfoTest.filter((el) => {
    //     return el.postId == parseInt(params.postId + "")
    // })
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const [post, setpost] = useState<announcement[]>([])
    const getData = API.get("/announcement/getdetailedit/" + params.postId)

    useEffect(() => {
        getData.then((item) => setpost(item.data)).catch((err) => on()).finally(off)
        // console.log(post)
        // console.log("hello")
    }, [])
    if (isError)
        return <AppBody><Heading color={"red"}>There is an Error</Heading></AppBody>


    const selectLangName = (lang_id: number) => {
        const lang = langInfos.filter((el) => el.languageId == lang_id)
        return lang[0].language
    }
    const [lang, setlang] = useState<number>(1000)
    // console.log(lang);
    const otherLang = post.map((el) => el.annLanguage)
    // console.log(otherLang);
    const selectLang = (lang: number) => {
        const selected = otherLang[0]?.filter((el) => el.languageId == lang)
        // console.log(selected);

        if (lang != 1000) {
            return (
                <>
                    <Heading as="h2" size="xl">
                        {selected?.map((el) => {
                            return el.annTopic
                        })}
                    </Heading>
                    <Box>
                        <Text fontSize="md">
                            Sender:{" "}
                            {post.map((el) => {
                                return el.annCreator.fName + " " + el.annCreator.lName
                            })}
                        </Text>
                        <Text fontSize="md">
                            To:{" "}
                            {post.map((el) => {
                                return el.annFilter.filterType
                            })}{" "}
                            {post.map((el) => {
                                return el.annFilter.value
                            })}
                        </Text>
                    </Box>
                    <Box>
                        <Text fontSize="sm" align="justify">
                            {selected?.map((el) => {
                                return el.annDetail
                            })}
                        </Text>
                    </Box>
                </>
            )
        } else if (lang == 1000) {
            return (
                <>
                    <Heading as="h2" size="xl">
                        {post.map((el) => {
                            return el.annLanguage[0].annTopic
                        })}
                    </Heading>
                    <Box>
                        <Text fontSize="md">
                            Sender:{" "}
                            {post.map((el) => {
                                return el.annCreator.fName + " " + el.annCreator.lName
                            })}
                        </Text>
                        <Text fontSize="md">
                            To:{" "}
                            {post.map((el) => {
                                return el.annFilter.filterType
                            })}{" "}
                            {post.map((el) => {
                                return el.annFilter.value
                            })}
                        </Text>
                    </Box>
                    <Box>
                        <Text fontSize="sm" align="justify">
                            {post.map((el) => {
                                return el.annLanguage[0].annDetail
                            })}
                        </Text>
                    </Box>
                </>
            )
        }
    }

    return (
        <AppBody
            secondarynav={[
                { name: "Announcement", to: "/announcement" },
                { name: "Approval", to: "/announcement/approval" },
                { name: "History", to: "/announcement/history" },
                { name: "Recycle bin", to: "/announcement/recyclebin" },
            ]}
            p={{ md: "3rem" }}
        >
            <Flex alignItems={"center"}>
                <Show below="lg">
                    <Text as={"b"} fontSize="xl">
                        <Link to="/announcement">
                            <GrClose />
                        </Link>
                    </Text>
                </Show>
                {/* <Spacer /> */}
            </Flex>

            <Stack spacing={3} p="5">
                <Grid templateColumns={{ base: "1fr 1fr", lg: "1fr 3fr" }} my={5}>
                    <GridItem>
                        <Select
                            placeholder="select language"
                            bg="blue.600"
                            color={"white"}
                            onChange={(el) => setlang(parseInt(el.target.value + ""))}
                        >
                            {/* <option value={1000}>English</option> */}
                            {otherLang[0]?.map((el, index) => {
                                return (
                                    <option value={el.languageId} key={index} style={{ background: "#FFF", color: "#000" }}>
                                        {selectLangName(el.languageId)}
                                    </option>
                                )
                            })}
                        </Select>
                    </GridItem>
                </Grid>
                {selectLang(lang)}
            </Stack>
        </AppBody>
    )
}

export default detail
