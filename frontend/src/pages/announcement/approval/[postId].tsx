import {
    Flex,
    Spacer,
    Heading,
    Text,
    Stack,
    Box,
    ButtonGroup,
    Button,
    Alert,
    AlertIcon,
    useControllableState,
    Show,
    useBoolean,
    Grid,
    GridItem,
    Select,
} from "@chakra-ui/react"
import React, { Children, FC, useEffect } from "react"
import { GrClose } from "react-icons/gr"
import { Link, useParams } from "react-router-dom"
import ModalForEvent from "../../../components/annoucement/ModalForEvent"
import AppBody from "../../../components/share/app/AppBody"
import { post, announcement_language, post_to_language, announcement } from "@apiType/announcement"
import { postInfoTest } from "../postInfoTest"
import API from "src/function/API"
import AnnounceLoading from "src/components/annoucement/AnnounceLoading"
import AnnounceError from "src/components/annoucement/lotties/AnnounceError"

const approvalDetail = () => {
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const params = useParams()

    const [post, setpost] = React.useState<announcement[]>([])
    const [targetType, setTargetType] = React.useState()
    const [targetValue, setTargetValue] = React.useState()
    const [topic, setTopic] = React.useState()
    const [sender, setSender] = React.useState<string>("")
    const [detail, setDetail] = React.useState()
    const [toggle, settoggle] = React.useState(false)
    const [langInfos, setlanginfos] = React.useState<announcement_language[]>([])

    async function getPost() {
        await API.get("/announcement/getdetailedit/" + params.postId).then((item) => {
            setpost(item.data)
            setTargetType(item.data[0].annFilter.filterType)
            setTargetValue(item.data[0].annFilter.value)
            setTopic(item.data[0].annLanguage[0].annTopic)
            const name = item.data[0].annCreator.fName + " " + item.data[0].annCreator.lName
            setSender(name)
            setDetail(item.data[0].annLanguage[0].annDetail)
        }).catch(err => on()).finally(off)
        const lang = await API.get("/announcement/getotherlang")
        setlanginfos(lang.data)
    }



    useEffect(() => {
        getPost()
    }, [toggle])

    const reload = () => {
        settoggle(!toggle)
    }

    const [lang, setlang] = React.useState<number>(1000)
    const selectLangName = (lang_id: number) => {
        const lang = langInfos.filter((el) => el.languageId == lang_id)
        return lang[0]?.language

    }
    const otherLang = post.map((el) => el.annLanguage)


    const selectLang = (lang: number) => {
        const selected = otherLang[0]?.filter((el) => el.languageId == lang)

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

    const changeStatus = (status: string) => {
        if (status == "Approve") {
            API.post<post>("/announcement/editstatusonapprove", { postId: params.postId, status: status, isapprove: true })
            API.post<post>("/announcement/gettargetgroup", { postId: params.postId, targetType: targetType, targetValue: targetValue })
            reload()
        } else if (status == "Disapprove") {
            API.post<post>("/announcement/editstatusonapprove", { postId: params.postId, status: status, isapprove: false })
            reload()
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
            {(() => {
                if (isLoading && !isError) {
                    return <AnnounceLoading />
                } else {
                    if (isError) {
                        return <AnnounceError />
                    } else {
                        return (
                            <>
                                <Flex alignItems={"center"}>
                                    <Show below="lg">
                                        <Text as={"b"} fontSize="xl">
                                            <Link to="/announcement/approval">
                                                <GrClose />
                                            </Link>
                                        </Text>
                                    </Show>
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
                                <Box width="100%" p="5" mt="14">
                                    <Flex justifyContent={"space-between"}>
                                        <Link to={"/announcement/approval"}>
                                            <Button bg={"#38A169"} color={"white"} shadow={"md"} onClick={() => changeStatus("Approve")} >
                                                Approve
                                            </Button>
                                        </Link>
                                        <Link to={"/announcement/approval"}>
                                            <Button bg={"#E53E3E"} color={"white"} shadow={"md"} onClick={() => changeStatus("Disapprove")}>
                                                Disapprove
                                            </Button>
                                        </Link>
                                    </Flex>
                                </Box>
                            </>
                        )
                    }
                }
            })()}

        </AppBody>
    )
}
export default approvalDetail
