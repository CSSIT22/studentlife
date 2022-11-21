import { VStack, Heading, Box, Flex, Link, Avatar, Text, Center, Image } from "@chakra-ui/react"
import React, { FC } from "react"
import PhotoAlbum from "react-photo-album"
import { Autoplay } from "swiper"
import AmountRate from "./AmountRate"
import AmountReview from "./AmountReview"
const ReviewCards = () => {
    const photos = [
        {
            src: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/7a50544f-7025-484c-ab9c-b68d9a138242/Derivates/2dbce5cd-ed5d-48be-8ef5-6eb1c7b42078.jpg",
            width: 800,
            height: 600,
        },
        {
            src: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/7a50544f-7025-484c-ab9c-b68d9a138242/Derivates/2dbce5cd-ed5d-48be-8ef5-6eb1c7b42078.jpg",
            width: 800,
            height: 600,
        },
    ]
    return (
        <Box width={""} minWidth={"full"} minHeight={"auto"} alignContent={"center"}>
            <Avatar marginBottom={5} marginRight={5} name="Joe" src={`url('${"image"}')`} />
            <Text as={"b"}>Joeleely</Text>
            <PhotoAlbum layout="rows" photos={photos} />
            <Box ml={2}>
                <Heading color="white" mt={5}>
                    <AmountRate ratting={"5"} />
                </Heading>

                <Text fontSize="20px" mt={3} color={"black"}>
                    Love this so much!!!
                </Text>
                <Text color={"gray"} ml={5} fontSize={"sm"}>
                    14/11/2022
                </Text>
            </Box>

            <Center mb={3}>
                <Box mt={3} background={"#D9D9D9"} rounded={"3xl"} width={"100%"} height={"3px"}></Box>
            </Center>
        </Box>
    )
}

export default ReviewCards
