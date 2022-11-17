import { Box, Flex, Grid, GridItem, Heading, Select, Show, Spacer, Stack, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { GrClose } from "react-icons/gr"
import { Link, useParams } from "react-router-dom"
import AppBody from "../../../components/share/app/AppBody"
import { postInfoTest } from "../postInfoTest"
import {languageInfo} from '@apiType/announcement'


export let langInfos:languageInfo[]  = [
    {lang_id:1000, langName:"English"},
    {lang_id:1001,langName:"Thai"},
    {lang_id:1002,langName:"Korea"},
    {lang_id:1003,langName:"Japaneses"}
]

const detail = () => {
    // อย่าลืมเพิ่มส่วนที่ apply ข้อมูลตาม announcement ที่คลิก
    const params = useParams().postId
    // console.log(params)
    const post = postInfoTest.filter((el) => {
        return el.postId == parseInt(params + "")
    })
    // console.log(post)
    
    const selectLangName = (lang_id:number) => {
        const lang = langInfos.filter((el) => el.lang_id == lang_id) 
        return lang[0].langName
    }
    const [lang, setlang] = useState<number>(1000);
    // console.log(lang);
    const otherLang = post.map((el) => el.addMoreLang)
    // console.log(otherLang[0]);
    const selectLang = (lang:number ) =>{
        const selected = otherLang[0].filter((el) => el.lang_id == lang)
        // console.log(selected);
        
        if(lang != 1000){
            return (
                <>
                <Heading as="h2" size="xl">
                {selected.map((el) => {
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
                    {selected.map((el) => {
                        return el.detail
                    })}
                </Text>
            </Box>
            </>
            )
        }else if(lang == 1000){
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
            <Grid templateColumns={{base:"1fr 1fr",lg:"1fr 3fr"}} my={5}>
                <GridItem>
                    <Select placeholder="select language" bg="blue.600" color="white" onChange={(el) => setlang( parseInt(el.target.value+""))}>
                        {otherLang[0].map((el) => {
                            return <option value={el.lang_id}>{selectLangName(el.lang_id)}</option>
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
