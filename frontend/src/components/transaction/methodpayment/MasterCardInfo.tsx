import React, { FC } from "react"
import { Button, Stack, Text } from "@chakra-ui/react"

const MasterCardInfo: FC<{
    name: string
    card: number
}> = ({ name, card }) => {
    return (
        <div>
            <Button w={"100%"} bg={"#fff2e5"} borderRadius="lg" p={"50px"} mb="10px">
                <Stack>
                    <Text fontSize="md" fontWeight={"bold"} color="black">
                        Name: {name}
                    </Text>

                    <Text fontSize="md" fontWeight={"bold"} color="black">
                        Card number: {card}
                    </Text>
                </Stack>
            </Button>
        </div>
    )
}

export default MasterCardInfo
