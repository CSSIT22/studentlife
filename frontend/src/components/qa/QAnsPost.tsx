import React, { FC } from "react"
import { Box, Flex, FormControl, FormLabel } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Switch } from "@chakra-ui/react"

const QAnsPost = (props: any) => {
    return (
        <>

            <FormControl display="flex" alignItems="right">
                <FormLabel htmlFor="email-alerts" mb="0">
                    🕵
                </FormLabel>
                <Switch id="email-alerts" size="lg" colorScheme={"gray"} />
            </FormControl>
            
            
        </>
    )
}

export default QAnsPost
