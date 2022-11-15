import { Box, Grid, Text, VStack, StackDivider, GridItem, Avatar, Divider } from "@chakra-ui/react"
import React, { FC } from "react"
import { Md10K } from "react-icons/md"

const ReviewContent: FC<{
    name: string
    picture: string
    rate: string
    review: string
}> = ({ name, picture, rate, review }) => {
    return (
        <Box mt={{ base: 6, md: 3 }} mx={{ base: 0, md: 10 }} backgroundColor={"white"} p={"5"} borderRadius="10px" shadow={"md"}>
            <Box>
                <Grid templateRows="repeat(3, 0fr)" templateColumns="repeat(7, 3fr)" gap={1}>
                    <GridItem rowSpan={3} colSpan={1} mr={4}>
                        <Avatar size={{ base: "md", md: "lg" }} name={name} src={picture}></Avatar>
                    </GridItem>
                    <GridItem colSpan={5}>
                        <Text fontSize={"lg"} fontWeight="semibold">
                            {name}
                        </Text>
                    </GridItem>
                    <GridItem colSpan={5}>
                        <Text fontSize={"md"}> {rate} out of 5</Text>
                    </GridItem>
                    <GridItem colSpan={6}>
                        <Text fontSize={"md"}> {review}</Text>
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    )
}

export default ReviewContent
