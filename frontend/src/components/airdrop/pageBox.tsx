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
                py={"5%"}
                {
                    ...props.pageName != "drop" ? {
                        px: 10,
                        h: "60vh",
                        flexDirection: "column",
                        w: ["100%"],
                    } : {
                        px: 0,
                        flexDirection: "row",
                        justifyContent: "center",
                        w:["100%", "90%", "80%", "70%"]
                    }
                }
                m={"auto"}
                mt={["25%", "15%", "5%"]}
                shadow={"md"}
                border={"1px"}
                borderColor={"gray.200"}
                // transition={"all 0.2s ease-in-out"}
                // _focusWithin={{ transform: "scale(1.02)" }}
            >
                {props.children}
            </Flex>
        </>
    )
}
export default PageBox
