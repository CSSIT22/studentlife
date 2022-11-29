import { ArrowBackIcon, ArrowDownIcon } from "@chakra-ui/icons"
import { Box, Center, Heading, IconButton, Stack, useMediaQuery } from "@chakra-ui/react"
import React from "react"
import AppBody from "../../../components/share/app/AppBody"
import ShowUser from "../../../components/transaction/TransactionShowUser"
import TransferPay from "../../../components/transaction/transfer/TransferPayInvoice"

const transferInvoice = () => {
    return (
        <AppBody>
            <IconButton size="lg" variant="unstyled" colorScheme="orange" aria-label="back" icon={<ArrowBackIcon boxSize={"2em"} />} />
            <Stack spacing={4}>
                <Box bg="#E67F45" w="100%" p={4} color="white">
                    <Heading fontSize={{ base: "lg", lg: "xl" }}>Transfer</Heading>
                    <Heading fontSize={{ base: "md", lg: "lg" }}>Invoice Transfer</Heading>
                </Box>
                <Box bg="#FFFFFF" w="100%" p={4} color="black">
                    <ShowUser userId={"DummyUser02"} userEmail={"dummy2@hotmail.com"}></ShowUser>
                    <Center padding={2}>
                        <ArrowDownIcon aria-label="Sent to" boxSize={"2em"} />
                    </Center>
                    <ShowUser userId={"DummyUser01"} userEmail={"dummy1@hotmail.com"}></ShowUser>
                </Box>
                {/* <TransferPay /> */}
            </Stack>
        </AppBody>
    )
}

export default transferInvoice
