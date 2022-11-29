import { Flex, ContainerProps } from "@chakra-ui/react"
import React, { FC } from "react"

const PageBox: FC<{
    pageName: string
    children: React.ReactNode
}> = (props) => {
    return (
        <>
            <Flex
                backgroundColor={"white"}
                borderRadius={"50px"}
                minHeight={"auto"}
                {...(props.pageName != "drop"
                    ? {
                          px: 5,
                          py:["10%","5%"],
                          h: ["60vh","60vh", "50vh"],
                          flexDirection: "column",
                          w: ["100%"],
                          mt:["25%","13%" ,"6%", "15%"]
                      }
                    : {
                          px: 0,
                          py:["10%","5%"],
                          flexDirection: "row",
                          justifyContent:"center",
                          w: ["100%", "90%", "80%", "70%"],
                          mt:["10%","13%" ,"6%", "10%"],
                          mx:"auto"
                      })}
                shadow={"lg"}
                border={"1px"}
                borderColor={"gray.200"}
            >
                {props.children}
            </Flex>
        </>
    )
}
export default PageBox
