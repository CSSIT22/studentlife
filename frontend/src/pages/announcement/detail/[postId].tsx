import { Box, Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/react"
import React from "react"
import { GrClose } from "react-icons/gr"
import { Link, useParams } from "react-router-dom"
import AppBody from "../../../components/share/app/AppBody"
import { postInfoTest } from "../postInfoTest"

const detail = () => {
    // อย่าลืมเพิ่มส่วนที่ apply ข้อมูลตาม announcement ที่คลิก
    const params= useParams().postId;
    console.log(params);
    const post = postInfoTest.filter((el) => {return el.postId == parseInt(params+"")})
    console.log(post);
    
    return (
        <AppBody>
            <Flex alignItems={"center"}>
                <Text as={"b"} fontSize="xl" opacity={{base:100,lg:0}}>
                    <Link to="/announcement">
                        <GrClose />
                    </Link>
                </Text>
                {/* <Spacer /> */}
            </Flex>
            <Stack spacing={3} p="5">
                <Heading as="h2" size="xl">
                    {post.map((el) => {return el.topic})}
                </Heading>
                <Box>
                    <Text fontSize="md">Sender: {post.map((el) => {return el.sender})}</Text>
                    <Text fontSize="md">To: {post.map((el) => {return el.targetType})} {post.map((el) => {return el.targetValue})}</Text>
                </Box>
                <Box>
                    <Text fontSize="sm" align="justify">
                    {post.map((el) => {return el.detail})}
                    </Text>
                </Box>
            </Stack>
        </AppBody>
    )
}

export default detail
