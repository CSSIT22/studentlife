import { VStack, Heading, Box, Flex, Link } from "@chakra-ui/react"
import React, { FC } from "react"
import AmountRate from "./AmountRate"
import AmountReview from "./AmountReview"

const DetailBox: FC<{ heading: String; image: String }> = ({ heading, image }) => {
    return (
        <Box as="button" p={5} h={32} background={`url('${image}')`} shadow={"md"} rounded={"2xl"}>
            <Link style={{ textDecoration: "none" }} href="/shopreview/shopdetails">
                <Heading size="md" textAlign={"left"} color="">
                    {heading}
                </Heading>
                <br></br>
                <br></br>
                <Flex direction="row" justifyContent={"space-between"} alignItems="flex-end">
                    <Heading color="white">
                        <AmountRate ratting={"5"} />
                        {/* ดีงข้อมูลมาจาก database */}
                    </Heading>
                    <Heading size={"xs"} color="black">
                        <AmountReview am_re={"32"} />
                        {/* ดีงข้อมูลมาจาก database */}
                    </Heading>
                </Flex>
            </Link>
        </Box>
    )
}

export default DetailBox
