import { Box, useBreakpointValue } from "@chakra-ui/react"
import DatingRandomizationDesktopPage from "../../components/dating/DatingRandomizationDesktopPage"
import DatingRandomizationMobilePage from "../../components/dating/DatingRandomizationMobilePage"

const DatingRandomization = () => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    return <Box>{isMobile ? <DatingRandomizationDesktopPage /> : <DatingRandomizationMobilePage />}</Box>
}

export default DatingRandomization
