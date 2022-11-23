import AppBody from "../../components/share/app/AppBody"
import { Box, extendTheme, Flex, Grid, GridItem } from "@chakra-ui/react"
import Bill from "../../components/transaction/Bill"

function index() {
    const breakpoints = {
        sm: "320px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
    }

    // 3. Extend the theme
    const theme = extendTheme({ breakpoints })
    return (
        <>
            <Box bg="orange.50">
                <Flex display="flex" position="static">
                    <AppBody />
                </Flex>
                <Bill />
            </Box>
        </>
    )
}
export default index
