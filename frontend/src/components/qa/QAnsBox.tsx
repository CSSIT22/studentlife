import React from "react"
import { Box, Center, Flex } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Switch } from "@chakra-ui/react"
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"
import { Grid, GridItem } from "@chakra-ui/react"

const QAnsBox = (props: any) => {
    return (
        <>
            <Flex
                backgroundColor={"white"}
                borderRadius={"50px"}
                minHeight={"auto"}
                py={"5%"}
                {...(props.pageName != "drop"
                    ? {
                          px: 10,
                          h: "60vh",
                          flexDirection: "column",
                          w: ["100%"],
                      }
                    : {
                          px: 0,
                          flexDirection: "row",
                          justifyContent: "center",
                          w: ["100%", "90%", "80%", "70%"],
                      })}
                m={"auto"}
                mt={["25%", "15%", "5%"]}
                shadow={"md"}
            >
                {props.children}
            </Flex>
        </>
    )
}

export default QAnsBox
