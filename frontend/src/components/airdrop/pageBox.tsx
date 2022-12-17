import { Flex, ContainerProps, useMediaQuery } from "@chakra-ui/react"
import React, { FC, useEffect } from "react"

const PageBox: FC<{
    pageName: string
    children: React.ReactNode
}> = (props) => {
    const [isLargeHeight] = useMediaQuery('(min-height: 1079px)')
    return (
        <>
            <Flex
                backgroundColor={"white"}
                borderRadius={"50px"}
                minHeight={"auto"}
                {...(props.pageName != "drop"
                    ? isLargeHeight ? 
                    {
                        px: 5,
                        py: ["10%", "3%"],
                        h: ["60vh", "60vh", "60vh", "50vh"],
                        flexDirection: "column",
                        w: ["100%"],
                        mt: ["25%", "13%", "6%", "15%"]
                    }:
                    {
                        px: 5,
                        py: ["10%", "3%"],
                        h: "100%",
                        flexDirection: "column",
                        w: "auto",
                        mt: ["25%", "13%", "6%", "15%"]
                    }
                    : {
                        px: 0,
                        py: ["10%", "5%"],
                        flexDirection: "row",
                        justifyContent: "center",
                        w: ["100%", "90%", "80%", "70%"],
                        mt: ["10%", "13%", "6%", "10%"],
                        mx: "auto"
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
