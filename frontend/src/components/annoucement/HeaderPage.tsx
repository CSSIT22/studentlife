import { Flex, Spacer, Heading, Box, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { IconType } from "react-icons"
import { GrClose } from "react-icons/gr"

const HeaderPage: FC<{
    head: string,
    Icon:IconType
}> = ({ head,Icon }) => {
    const checkIcon = (Icon:IconType) => {
        if(Icon == null){
            return "";
        }else {
            return <Icon fontSize={"2rem"}/>
        }
    }
    return (
        <Flex alignItems={"center"}>
            <Text as={"b"} fontSize="xl">
                <GrClose />
            </Text>
            <Spacer />
            <Heading>{head}</Heading>
            <Spacer />
            <Box>
                {checkIcon(Icon)}
            </Box>
        </Flex>
    )
}

export default HeaderPage
