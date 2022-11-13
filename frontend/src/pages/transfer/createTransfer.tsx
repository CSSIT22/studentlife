import { Box, Button, color, IconButton, Spacer, Spinner, Stack } from "@chakra-ui/react"
import React, { useState } from "react"
import AppBody from "../../components/share/app/AppBody"
import ShowUser from "../../components/transaction/transfer/ShowUser"
import { useMediaQuery } from "@chakra-ui/react"
import SenderForm from "../../components/transaction/transfer/SenderForm"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"

const createTransfer = () => {
    const [desktopthan1280] = useMediaQuery("(min-width: 800px)")

    return (
        <AppBody>
            <IconButton size="lg" variant="unstyled" colorScheme="orange" aria-label="back" icon={<ArrowBackIcon boxSize={"2em"} />} />
            <Stack spacing={4}>
                <Box bg="#E67F45" w="100%" p={4} color="white">
                    <div style={{ fontSize: desktopthan1280 ? "35px" : "30px" }}>Transfer</div>
                    <div style={{ fontSize: "15px" }}>Setting Transfer</div>
                </Box>
                <Box bg="#FFFFFF" w="100%" p={4} color="black">
                    <ShowUser userId={"DummyUser01"} userEmail={"dummy@hotmail.com"}></ShowUser>
                </Box>
                <SenderForm displaySize={desktopthan1280} />
            </Stack>
        </AppBody>
    )
}

export default createTransfer
