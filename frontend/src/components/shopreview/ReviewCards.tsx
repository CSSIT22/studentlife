import { VStack, Heading, Box, Flex, Link, Avatar, Text, Center } from "@chakra-ui/react"
import React, { FC } from "react"
import { Autoplay } from "swiper"
import AmountRate from "./AmountRate"
import AmountReview from "./AmountReview"
const ReviewCards = () => {
    return (
        <Box width={''} minWidth={"full"} minHeight={"auto"} alignContent={"center"}>
                <Avatar marginBottom={5} marginRight={5} name="Joe" src={`url('${"image"}')`} />
                <Text as={"b"}>Joeleely</Text>

                <Box p={3} height={"200px"} background={"orange"} shadow={"md"} rounded={"2xl"}>
                    <Heading overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"} size="md" textAlign={"left"} color="black"></Heading>
                    <Flex direction="row" justifyContent={"space-between"} alignItems="flex-end"></Flex>
                </Box>

                <Box pl={"50px"} pr={"50px"} >
                    <Center>
                        <Heading color="white" mt={5}>
                            <AmountRate ratting={"5"} />
                        </Heading>
                    </Center>

                    <Text fontSize="20px" mb={2} mt={5} color={"black"} >
                        sdddsdlfksdlkf;l;'gkkglkfsdklfdsklgjlkdl;fks;lsddfd. dl;fld';fl;fd. s;/fldlkkgj5i.jldmg,hm.m sdsd.s dcmv0t
                    </Text>
                    <Center>
                        {" "}
                        <Text>14/11/2022</Text>
                    </Center>
                </Box>

                <Center>
                    <Box mt={5} background={"#D9D9D9"} rounded={"3xl"} width={"90%"} height={"5px"}></Box>
                </Center>
       
        </Box>
    )

}

export default ReviewCards
