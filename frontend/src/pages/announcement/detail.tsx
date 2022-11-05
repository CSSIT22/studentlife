import { Box, Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/react"
import React from "react"
import { GrClose } from "react-icons/gr"
import { Link } from "react-router-dom"
import AppBody from "../../components/share/app/AppBody"

const detail = () => {
    // อย่าลืมเพิ่มส่วนที่ apply ข้อมูลตาม announcement ที่คลิก
    return (
        <AppBody>
            <Flex alignItems={"center"}>
                <Text as={"b"} fontSize="xl">
                    <Link to="/announcement">
                        <GrClose />
                    </Link>
                </Text>
                {/* <Spacer /> */}
            </Flex>
            <Stack spacing={3} p="5">
                <Heading as="h2" size="xl">
                    Hello World1
                </Heading>
                <Box>
                    <Text fontSize="md">Sender: SAMA-SIT</Text>
                    <Text fontSize="md">To: everyone</Text>
                </Box>
                <Box>
                    <Text fontSize="sm" align="justify">
                        Lorem ipsum dolor sit amet. Cum error deleniti aut exercitationem exercitationem id sint eligendi. Et eaque voluptas qui
                        placeat excepturi ut quia doloremque non maiores impedit.
                    </Text>
                </Box>
            </Stack>
        </AppBody>
    )
}

export default detail
