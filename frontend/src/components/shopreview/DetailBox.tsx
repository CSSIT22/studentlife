import { VStack, Heading, Box, Flex, Link } from "@chakra-ui/react"
import React, { FC } from "react"
import { useNavigate } from "react-router-dom"
import AmountRate from "./AmountRate"
import AmountReview from "./AmountReview"

const DetailBox: FC<{ heading: String; image: String }> = ({ heading, image }) => {
    const navigate = useNavigate()
    const navigateShopDetail = () => {
        navigate("/shopreview/shopdetails")
    }
    return (
        <Box onClick={navigateShopDetail} as="button" p={5} h={32} background={`url('${image}')`} shadow={"md"} rounded={"2xl"}>
            <Heading overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"} size="md" textAlign={"left"} color="black">
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
        </Box>
    )
}

export default DetailBox
