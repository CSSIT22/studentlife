import { Box, Spacer, Stack } from "@chakra-ui/react"
import React from "react"
import AppBody from "src/components/share/app/AppBody"
import TransactionKmuttPoint from "src/components/transaction/KmuttPoint/TransactionKmuttPoint"
import TransactionPointHistory from "src/components/transaction/KmuttPoint/TransactionPointHistory"

const KmuttPoint = () => (
    <AppBody>
        <Box padding={5}>
            <Stack>
                <TransactionKmuttPoint />
                <TransactionPointHistory />
            </Stack>
        </Box>
    </AppBody>
)

export default KmuttPoint
