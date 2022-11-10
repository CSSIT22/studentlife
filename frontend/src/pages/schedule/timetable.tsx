import React from "react"
import AppBody from "../../components/share/app/AppBody"
import { Box, SimpleGrid } from "@chakra-ui/react"

const timetable = () => {
    return (
        <AppBody>
            timetable
            <SimpleGrid>
                <Box boxShadow="md" p="6" rounded="md" bg="white">
                    Date
                </Box>
                <Box boxShadow="md" p="6" rounded="md" bg="white">
                    Month
                </Box>
                <Box boxShadow="md" p="6" rounded="md" bg="white">
                    Year
                </Box>
            </SimpleGrid>
        </AppBody>
    )
}

export default timetable
