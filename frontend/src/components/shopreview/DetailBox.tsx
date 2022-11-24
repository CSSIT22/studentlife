import { VStack, Heading, Box, Flex, Link } from "@chakra-ui/react"
import React, { FC } from "react"
import { useNavigate } from "react-router-dom"
import AmountRate from "./AmountRate"
import AmountReview from "./AmountReview"

const DetailBox: FC<{ heading: String; image: String; rate: String; amo_re: String }> = ({ heading, image, rate, amo_re }) => {
    const navigate = useNavigate()
    const navigateShopDetail = () => {
        navigate("/shopreview/shopdetails")
    }
    return (
        <Box _hover={{ cursor: "pointer", transform: "translate(0, -3px)", shadow: "xl" }} transitionDuration="300ms" onClick={navigateShopDetail} as="button" p={3} h={32} background={`url('${image}')`} shadow={"md"} rounded={"2xl"}>
            <Flex>
                <Heading overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"} size="md" textAlign={"left"} color="black">
                    {heading}
                </Heading>
            </Flex>
            <br></br>
            <br></br>
            <Flex direction="row" justifyContent={"space-between"} alignItems="flex-end">
                <Heading color="white">
                    <AmountRate ratting={rate} />
                    {/* ดีงข้อมูลมาจาก database */}
                </Heading>
                <Heading backdropFilter="auto" backdropContrast="30%" overflow={"hidden"} whiteSpace={"nowrap"} size={"xs"} color="white">
                    <AmountReview am_re={amo_re} />
                    {/* ดีงข้อมูลมาจาก database */}
                </Heading>
            </Flex>
        </Box>
    )
}

export default DetailBox
