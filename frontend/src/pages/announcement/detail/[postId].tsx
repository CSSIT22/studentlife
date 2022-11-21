import { Box, Flex, Grid, GridItem, Heading, Select, Show, Spacer, Stack, Text, useBoolean } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { GrClose } from "react-icons/gr"
import { Link, useParams } from "react-router-dom"
import AppBody from "../../../components/share/app/AppBody"
import { postInfoTest } from "../postInfoTest"
import { languageInfo, post } from "@apiType/announcement"
import API from "src/function/API"

export let langInfos: languageInfo[] = [
    { lang_id: 1000, langName: "English" },
    { lang_id: 1001, langName: "Thai" },
    { lang_id: 1002, langName: "Korea" },
    { lang_id: 1003, langName: "Japaneses" },
]

const detail = () => {
    const [isError, { on }] = useBoolean()
    const params = useParams()
    // console.log(params.postId)
    // const post = postInfoTest.filter((el) => {
    //     return el.postId == parseInt(params.postId + "")
    // })
    const [post, setpost] = useState<post[]>([])
    const getData = API.get("/announcement/getdetail/" + params.postId)
    useEffect(() => {
        getData.then((item) => setpost(item.data)).catch((err) => on())
    }, [])
    // console.log(p);
    if (isError)
        return (
            <AppBody>
                <Heading color={"red"}>There is an Error</Heading>
            </AppBody>
        )
    // const otlang = p.map((el) => el.addMoreLang)
    // console.log(otlang[0]);
    // const slt = otlang[0]?.filter((el) => el.lang_id == 1001);
    // console.log(slt);

    const selectLangName = (lang_id: number) => {
        const lang = langInfos.filter((el) => el.lang_id == lang_id)
        return lang[0].langName
    }
    const [lang, setlang] = useState<number>(1000)
    // console.log(lang);
    const otherLang = post.map((el) => el.addMoreLang)
    // console.log(otherLang);
    const selectLang = (lang: number) => {
        const selected = otherLang[0]?.filter((el) => el.lang_id == lang)
        // console.log(selected);

        if (lang != 1000) {
            return (
                <>
                    <Heading as="h2" size="xl">
                        {selected?.map((el) => {
                            return el.topic
                        })}
                    </Heading>
                    <Box>
                        <Text fontSize="md">
                            Sender:{" "}
                            {post.map((el) => {
                                return el.sender
                            })}
                        </Text>
                        <Text fontSize="md">
                            To:{" "}
                            {post.map((el) => {
                                return el.targetType
                            })}{" "}
                            {post.map((el) => {
                                return el.targetValue
                            })}
                        </Text>
                    </Box>
                    <Box>
                        <Text fontSize="sm" align="justify">
                            {selected?.map((el) => {
                                return el.detail
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
                            return el.topic
                        })}
                    </Heading>
                    <Box>
                        <Text fontSize="md">
                            Sender:{" "}
                            {post.map((el) => {
                                return el.sender
                            })}
                        </Text>
                        <Text fontSize="md">
                            To:{" "}
                            {post.map((el) => {
                                return el.targetType
                            })}{" "}
                            {post.map((el) => {
                                return el.targetValue
                            })}
                        </Text>
                    </Box>
                    <Box>
                        <Text fontSize="sm" align="justify">
                            {post.map((el) => {
                                return el.detail
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
                        <Select placeholder="select language" bg="blue.600" color={"white"} onChange={(el) => setlang(parseInt(el.target.value + ""))}>
                            <option value={1000}>English</option>
                            {otherLang[0]?.map((el) => {
                                return (
                                    <option value={el.lang_id} key={el.id} style={{ background: "#FFF", color: "#000" }}>
                                        {selectLangName(el.lang_id)}
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
