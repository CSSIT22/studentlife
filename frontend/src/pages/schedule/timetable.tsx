import React from "react"
import AppBody from "../../components/share/app/AppBody"
import { Box, extendTheme, SimpleGrid } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
//import { ChevronRightIcon } from "@chakra-ui/icons"
//import { AddIcon } from "@chakra-ui/icons"
const theme = extendTheme({
    colors: {
        brand: {
            "200": "#9AE6B4",
        },
    },
})

const timetable = () => {
    return (
        <AppBody>
            timetable
            <SimpleGrid columns={[1, 6]} spacing="40px">
                <IconButton aria-label="previous" icon={<ChevronLeftIcon />} />

                <Box boxShadow="md" p="6" rounded="md" bg="white">
                    Date
                </Box>
                <Box boxShadow="md" p="6" rounded="md" bg="white">
                    Month
                </Box>
                <Box boxShadow="md" p="6" rounded="md" bg="white">
                    Year
                </Box>
                <IconButton aria-label="next" icon={<ChevronRightIcon />} />
                <IconButton
                    w="60px"
                    h="62px"
                    colorScheme="green"
                    aria-label="Add event"
                    size="sm"
                    icon={<AddIcon />}
                    borderRightRadius="55"
                    borderLeftRadius="55"
                />
            </SimpleGrid>
        </AppBody>
    )
}

export default timetable
