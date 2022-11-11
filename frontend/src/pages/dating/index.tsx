import { Box, useBreakpointValue } from "@chakra-ui/react"
import { CARD_QUEUE } from "src/components/dating/shared/card_queue"
import { INTERESTS } from "src/components/dating/shared/interests"
import DatingRandomizationDesktopPage from "../../components/dating/DatingRandomizationDesktopPage"
import DatingRandomizationMobilePage from "../../components/dating/DatingRandomizationMobilePage"

const DatingRandomization = () => {
    const isMobile = useBreakpointValue({
        base: false,
        md: true,
    })

    return <Box>{isMobile ? <DatingRandomizationDesktopPage /> : <DatingRandomizationMobilePage CARD_QUEUE={CARD_QUEUE} INTERESTS={INTERESTS} />}</Box>
}

export default DatingRandomization
