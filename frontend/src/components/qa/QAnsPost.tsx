import React, { FC } from "react"
import { Box, Flex } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Switch } from "@chakra-ui/react"

const QAnsPost = (props: any) => {
    return (
        <>
            <Button colorScheme="orange" size="md">
                Create Q&A
            </Button>

            <Switch size="lg" colorScheme={"gray"} />
        </>
    )
}

export default QAnsPost
