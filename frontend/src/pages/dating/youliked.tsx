import { Box, useBreakpointValue } from "@chakra-ui/react"
import DatingAppBody from "../../components/dating/DatingAppBody"

const YouLiked = () => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })
    return <DatingAppBody>{isMobile ? <Box>People who you liked</Box> : <Box></Box>}</DatingAppBody>
}

export default YouLiked
