import { Box, Button, Collapse, Flex, Heading, Link, Spacer, Stack, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import AmountLike from "./AmountLike"
import AmountRate from "./AmountRate"
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const ReviewDetail: FC<{ image: String; name: String; ment: String; date: String; amo_rate: String; amo_like: String; reviewId: String; }> = ({ image, name, ment, date, amo_rate, amo_like, reviewId }) => {
    const [show, setShow] = React.useState(false)
    const handleToggle = () => setShow(!show)

    const navigate = useNavigate()
    const navigateReview = () => {
        navigate("/shopreview/review")
        window.scrollTo(0, 0)
    }
    return (
        <Box _hover={{ cursor: "pointer", transform: "translate(0, -3px)", shadow: "xl" }} transitionDuration="300ms" p={3} minHeight={32} maxHeight={"1000px"} background={"white"} shadow={"md"} rounded={"2xl"}>
            <Stack mb={3} direction={"row"} spacing={"24px"}>
                <Avatar name="" src={`url('${image}')`} />
                {/* ดีงข้อมูลมาจาก database */}
                <Flex direction={"column"}>
                    <Text as={"b"} color="black" textAlign={"start"} size={"sm"}>
                        {name}
                    </Text>
                    <Text color="gray" size={"sm"}>
                        {date}
                    </Text>
                </Flex>
                {/* ดีงข้อมูลมาจาก database */}
                <Spacer onClick={navigateReview} as="button"></Spacer>
            </Stack>
            <Flex direction={"row"} alignItems={"flex-start"}>
                <Box as="button">
                    <Text overflow={"hidden"} whiteSpace={"nowrap"} textOverflow={"ellipsis"} as={"b"} color={"black"} mb={3} size={"sm"}>
                        {ment}
                    </Text>
                </Box>
            </Flex>
            {/* <Button _hover={{ background: "gray.500", color: "white" }} mb={4} size="sm" onClick={handleToggle} mt="1rem">
                Show {show ? "Less" : "More"}
            </Button> */}
            {/* ดีงข้อมูลมาจาก database */}
            <Flex mt={3} direction={"row"} justifyContent={"flex-end"}>
                <Box>
                    <img
                        style={{ width: 20 }}
                        src="https://toppng.com/public/uploads/thumbnail/white-location-icon-png-location-logo-png-white-11562856661b4wsud8br0.png"
                    ></img>
                </Box>
                <AmountLike am_like={amo_like} reviewId={reviewId} />
                {/* ดีงข้อมูลมาจาก database */}
                <AmountRate ratting={amo_rate} />
                {/* ดีงข้อมูลมาจาก database */}
            </Flex>
        </Box>
    )
}

export default ReviewDetail
