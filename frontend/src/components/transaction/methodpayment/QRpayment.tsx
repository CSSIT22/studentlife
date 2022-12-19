import { Text, Stack, useMediaQuery } from "@chakra-ui/react"
import React, { FC } from "react"

const QRpayment: FC<{
    total: string
    paywithin: number
}> = ({ total, paywithin }) => {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    let min = Math.floor(paywithin / 60)
    let sec = Math.floor(paywithin % 60)

    return (
        <div>
            <Stack align={"center"}>
                <Text fontSize={isSmallerThan768 ? "md" : "xl"} fontWeight={"bold"}>
                    Payment Information
                </Text>
                <Text fontSize={isSmallerThan768 ? "md" : "xl"}>Total Payment: {total}</Text>
                <Text fontSize={isSmallerThan768 ? "md" : "xl"}>Payment within: {min} minute {sec} seconds</Text>
                <Text fontSize={isSmallerThan768 ? "md" : "xl"}></Text>
                <Text fontSize={isSmallerThan768 ? "md" : "xl"}></Text>
            </Stack>
        </div>
    )
}

export default QRpayment
