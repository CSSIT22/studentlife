import { Flex, Spacer, Heading, Text, Stack, Box, ButtonGroup, Button, Alert, AlertIcon } from "@chakra-ui/react"
import React, { Children, FC } from "react"
import { GrClose } from "react-icons/gr"
import { Link } from "react-router-dom"
import AppBody from "../../../components/share/app/AppBody"

const approvalDetail = () => {
    // const ALERT = () => {
    //     alert("This announcement is approved")
    //     window.history.go(-1)
    // }
    // const ALERTT = () => {
    //     alert("This announcement is approved")
    //     window.history.go(-1)
    // }
    return (
        // apply info follow the post that user click -> not done yet
        <AppBody px={{ md: "3rem" }}>
            <Flex alignItems={"center"}>
                <Text as={"b"} fontSize="xl">
                    <Link to={"/announcement/approval"}>
                        <GrClose />
                    </Link>
                </Text>
            </Flex>
            <Stack spacing={3} p="5">
                <Heading as="h2" size="xl">
                    Hello World1
                </Heading>
                <Box>
                    <Text fontSize="md">Sender: SAMO-SIT</Text>
                    <Text fontSize="md">To: everyone</Text>
                </Box>
                <Box>
                    <Text fontSize="sm" align="justify">
                        Lorem ipsum dolor sit amet. Cum error deleniti aut exercitationem exercitationem id sint eligendi. Et eaque voluptas qui
                        placeat excepturi ut quia doloremque non maiores impedit. Lorem ipsum dolor sit amet. Cum error deleniti aut exercitationem
                        exercitationem id sint eligendi. Et eaque voluptas qui placeat excepturi ut quia doloremque non maiores impedit. Lorem ipsum
                        dolor sit amet. Cum error deleniti aut exercitationem exercitationem id sint eligendi. Et eaque voluptas qui placeat excepturi
                        ut quia doloremque non maiores impedit.
                    </Text>
                </Box>
                <Box width={"80%"} textAlign="center" position={"fixed"} bottom="5rem">
                    <Flex justifyContent={"space-between"}>
                        <Button colorScheme="orange">Approve</Button>
                        <Button>Disapprove</Button>
                    </Flex>
                </Box>
            </Stack>
        </AppBody>
    )
}
export default approvalDetail
