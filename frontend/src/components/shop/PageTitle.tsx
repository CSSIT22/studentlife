import { Center, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const PageTitle: FC<{ title: string; p?: string }> = ({ title, p }) => {
    return (
        <Center pb={p ? p : 7}>
            <Text fontSize={"4xl"} as="h1" fontWeight="700">
                {title}
            </Text>
        </Center>
    )
}
export default PageTitle
