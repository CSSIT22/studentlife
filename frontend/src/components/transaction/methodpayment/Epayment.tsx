import { useMediaQuery, Text, Stack } from "@chakra-ui/react"
import React, { FC } from "react"

const Epayment: FC<{
    bank: string
    amount: number
    payto: string
    paymentId: string
    product: string
}> = ({ bank, amount, payto, paymentId, product }) => {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    return (
        <div>
            <Stack align={"center"}>
                <Text fontSize={isSmallerThan768 ? "md" : "xl"}>Pay with {bank} </Text>
                <Text fontSize={isSmallerThan768 ? "md" : "xl"}>Amount {amount} THB </Text>
                <Text fontSize={isSmallerThan768 ? "md" : "xl"}>Pay to {payto} </Text>
                <Text fontSize={isSmallerThan768 ? "md" : "xl"}>Payment ID: {paymentId} </Text>
                <Text fontSize={isSmallerThan768 ? "md" : "xl"}>Product : {product} </Text>
            </Stack>
        </div>
    )
}

export default Epayment
