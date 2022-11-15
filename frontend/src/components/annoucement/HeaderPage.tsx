import { Flex, Spacer, Heading, Box, Text, Show } from "@chakra-ui/react"
import React, { FC } from "react"
import { IconType } from "react-icons"
import { GrClose } from "react-icons/gr"
import { Link } from "react-router-dom"

const HeaderPage: FC<{
    head: string
}> = ({ head }) => {
    // const checkIcon = (Icon:IconType) => {
    //     if(Icon == null){
    //         return "";
    //     }else {
    //         return <Link to={"/announcement/create"} key="1"><Icon fontSize={"2rem"}/></Link>
    //     }
    // }
    return (
        // <Flex alignItems={"center"}>
        <>
            <Show below="lg">
                <Text as={"b"} fontSize="xl" >
                    <GrClose />
                </Text>
            </Show>
            <Spacer />
            <Heading>{head}</Heading>
            <Spacer />
        </>
        // </Flex>
    )
}

export default HeaderPage
