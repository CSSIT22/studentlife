import { FC } from "react"
import { Flex, Grid } from "@chakra-ui/react"

const QAnsBoxPost = (props: any) => {
    return (
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
            border={"1px"}
            borderColor={"gray.200"}
        >
            {props.children}
        </Flex>
    )
}

export default QAnsBoxPost
