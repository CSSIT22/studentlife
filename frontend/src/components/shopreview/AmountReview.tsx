import { Box, Heading } from "@chakra-ui/react"
import React, { FC } from "react"

const AmountReview: FC<{
    am_re: String
}> = ({ am_re }) => {
    return <Box width={"80px"}>{am_re} Reviews</Box>
}

export default AmountReview
