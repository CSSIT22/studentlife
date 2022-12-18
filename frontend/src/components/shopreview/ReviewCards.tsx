import { VStack, Heading, Box, Flex, Link, Avatar, Text, Center, Image, Spacer } from "@chakra-ui/react"
import React, { FC } from "react"
import PhotoAlbum from "react-photo-album"
import { Autoplay } from "swiper"
import AmountLike from "./AmountLike"
import AmountRate from "./AmountRate"
import AmountReview from "./AmountReview"
const ReviewCards: FC<{ image: []; name: String; ment: String; date: String; amo_rate: String; amo_like: String }> = ({ image, name, ment, date, amo_rate, amo_like }) => {
    //console.log(image)
    return (
        <Box width={""} minWidth={"full"} minHeight={"auto"} alignContent={"center"}>
            <Avatar marginBottom={5} marginRight={5} />
            <Text as={"b"}>{name}</Text>
            {image?.map((item: any) => {
                console.log(item)
                return <Image width={"50%"} height={"100%"} src={`https://staging-api.modlifes.me/airdrop/file/getfile/${item.fileId}`} />
            })}
            <Box ml={2}>
                <Heading color="white" mt={5}>
                    <Flex direction={"row"} alignItems={"flex-start"}>
                        <Box mr={3}>
                            <AmountRate ratting={amo_rate} />
                        </Box>
                        <AmountLike am_like={amo_like} />
                    </Flex>
                </Heading>

                <Text fontSize="20px" mt={3} color={"black"}>
                    {ment}
                </Text>
                <Text color={"gray"} ml={5} fontSize={"sm"}>
                    {date}
                </Text>
            </Box>

            <Center mb={3}>
                <Box mt={3} background={"#D9D9D9"} rounded={"3xl"} width={"100%"} height={"3px"}></Box>
            </Center>
        </Box>
    )
}

export default ReviewCards
