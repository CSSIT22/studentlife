import { Box, IconButton, Link, Stack } from "@chakra-ui/react"
import React, { useState } from "react"
import AppBody from "../../../components/share/app/AppBody"
import ShowUser from "../../../components/transaction/TransactionShowUser"
import { useMediaQuery } from "@chakra-ui/react"
import SenderForm from "../../../components/transaction/transfer/TransferSenderForm"
import { ArrowBackIcon } from "@chakra-ui/icons"


const createTransfer = () => {
    const [isSmallerThan768] = useMediaQuery("(min-width: 768px)")
    
    return (
        <AppBody>{isSmallerThan768?"":
        <IconButton size="lg" variant="unstyled" colorScheme="orange" aria-label="back" icon={<ArrowBackIcon boxSize={"2em"} />} />}
            
            <Stack spacing={4}>
                <Box bg="#E67F45" w="100%" p={4} color="white">
                    <div style={{ fontSize: isSmallerThan768 ? "35px" : "30px" }}>Transfer</div>
                    <div style={{ fontSize: "15px" }}>Setting Transfer</div>
                </Box>
                <Box bg="#FFFFFF" w="100%" p={4} color="black">
                    <ShowUser userId={"DummyUser01"} userEmail={"dummy@hotmail.com"}></ShowUser>
                </Box>
                <SenderForm displaySize={isSmallerThan768} />
            </Stack>
        </AppBody>
    )
}

export default createTransfer
