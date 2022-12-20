import { Box, Flex, Heading } from "@chakra-ui/react"
import React, { FC, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "src/function/API"

const AmountLike: FC<{ am_like: String; reviewId: String }> = ({ am_like, reviewId, }) => {
    const [like, setLike] = useState(false)

    let param = useParams()
    const navigate = useNavigate()
    function submitHandler() {
        try {
            API.post(`/shopreview/${reviewId}`).then(i => {
                window.location.reload()
            }
            )
        } catch (err) {
            // API.post(`/shopreview/comlike/${commentId}`).then(i => {
            //     window.location.reload()
            // })
            console.log("y")
        }
    }

    // const handleClick = () => {
    //     setLike((prevLike) => !prevLike)
    // }
    return (

        <Box as="button" p={1} mr={1} width={"60px"} height={"25px"} px={2} rounded={"2xl"} background={"#E68E5C"}>
            <Flex onClick={(e: any) => { e.stopPropagation() }} mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                <img onClick={submitHandler}
                    style={{ maxWidth: 18 }}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png"
                ></img>
                <Heading onClick={submitHandler} ml={1} size={"xs"} color={"white"}>
                    {am_like}
                    {/* {am_like} */}
                    {/* ดีงข้อมูลมาจาก database */}
                </Heading>
            </Flex>
        </Box>
    )
}

export default AmountLike
