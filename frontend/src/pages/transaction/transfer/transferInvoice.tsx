import { ArrowBackIcon, ArrowDownIcon } from "@chakra-ui/icons"
import { Box, Center, IconButton, Stack, useMediaQuery } from "@chakra-ui/react"
import React from "react"
import AppBody from "../../../components/share/app/AppBody"
import ShowUser from "../../../components/transaction/TransactionShowUser"
import TransferPay from "../../../components/transaction/transfer/TransferPayInvoice"

const transferInvoice = () => {
    const [desktopthan1280] = useMediaQuery("(min-width: 800px)")
    
    return (
        <AppBody>
            <IconButton size="lg" variant="unstyled" colorScheme="orange" aria-label="back" icon={<ArrowBackIcon boxSize={"2em"} />} />
            <Stack spacing={4}>
                <Box bg="#E67F45" w="100%" p={4} color="white">
                    <div style={{ fontSize: desktopthan1280 ? "35px" : "30px" }}>Transfer</div>
                    <div style={{ fontSize: "15px" }}>Invoice Transfer</div>
                </Box>
                <Box bg="#FFFFFF" w="100%" p={4} color="black">
                    <ShowUser userId={"DummyUser02"} userEmail={"dummy2@hotmail.com"}></ShowUser>
                    <Center padding={2}>
                        <ArrowDownIcon aria-label="Sent to" boxSize={"2em"} />
                    </Center>
                    <ShowUser userId={"DummyUser01"} userEmail={"dummy1@hotmail.com"}></ShowUser>
                </Box>
                {/* <TransferPay displaySize={desktopthan1280} /> */}
            </Stack>
        </AppBody>
    )
}

export default transferInvoice
