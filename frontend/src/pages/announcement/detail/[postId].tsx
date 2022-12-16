import { Box, Divider, Flex, Grid, GridItem, Heading, Icon, Select, Show, Spacer, Stack, Text, useBoolean } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { GrClose } from "react-icons/gr"
import { Link, useParams } from "react-router-dom"
import AppBody from "../../../components/share/app/AppBody"
import { postInfoTest } from "../postInfoTest"
import { announcement, announcement_language } from "@apiType/announcement"
import API from "src/function/API"
import AnnounceLoading from "src/components/annoucement/AnnounceLoading"
import AnnounceError from "src/components/annoucement/lotties/AnnounceError"
import AnnounceNav from "src/components/annoucement/AnnounceNav"
import { IoIosCalendar } from "react-icons/io"
import { GiHumanTarget } from "react-icons/gi"
import Detail from "src/components/annoucement/Detail"


const detail = () => {
    const params = useParams()
    const [langInfos, setlanginfos] = useState<announcement_language[]>([])
    const getData = API.get("/announcement/getdetailedit/" + params.postId)
    const newData = API.get("/announcement/getotherlang")

    useEffect(() => {
        newData.then(res => setlanginfos(res.data))
        getData.then((item) => setpost(item.data)).catch((err) => on()).finally(off)
    }, [])


    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const [post, setpost] = useState<announcement[]>([])

    const selectLangName = (lang_id: number) => {
        const lang = langInfos.filter((el) => el.languageId == lang_id)
        return lang[0].language
    }
    const [lang, setlang] = useState<number>(1000)
    const otherLang = post.map((el) => el.annLanguage)
    const selectLang = (lang: number) => {
        const selected = otherLang[0]?.filter((el) => el.languageId == lang)
        const sender = post.map((el) => (el.annCreator.fName + " " + el.annCreator.lName))
        const targetType = post.map((el) => (el.annFilter.filterType))
        const targetValue = post.map((el) => (el.annFilter.value))

        if (lang != 1000) {
            const topic = selected.map((el) => (el.annTopic))
            const detail = selected.map((el) => (el.annDetail))
            const eventAnddate = post.map((el) => (el.annLanguage[0].annDetail.split("~")))
            return (
                <>
                    <Detail annTopic={topic[0]} filterType={targetType[0]} filterValue={targetValue[0]} annDetail={detail[0]} eventDate={new Date(eventAnddate[0][0])} sender={sender[0]} />
                </>
            )
        } else if (lang == 1000) {
            const topic = post.map((el) => (el.annLanguage[0].annTopic))
            const eventAnddate = post.map((el) => (el.annLanguage[0].annDetail.split("~")))
            return (
                <>
                    <Detail annTopic={topic[0]} filterType={targetType[0]} filterValue={targetValue[0]} annDetail={eventAnddate[0][1]} eventDate={new Date(eventAnddate[0][0])} sender={sender[0]} />
                </>
            )
        }
    }

    return (
        <AnnounceNav>
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
                                            <Link to="/announcement">
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
                            </>
                        )
                    }
                }
            })()}
        </AnnounceNav>
    )
}

export default detail
