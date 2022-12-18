/* A custom multiple choose button component. */
import { chakra, useCheckbox, Flex, Box, Text } from "@chakra-ui/react"
import Checked from "./pic/checked.png"
import { motion } from "framer-motion"

export function DatingOptionMultipleChoose(props: any) {
    const { state, getCheckboxProps, getLabelProps, htmlProps } = useCheckbox(props)

    // For multiple chose of faculties
    return (
        state.isChecked ?
            <motion.div
                initial={
                    { cursor: "pointer" }
                }
                whileHover={{ scale: 1.05, }}
                whileTap={{
                    scale: 0.95,
                }}
            >
                <chakra.label
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gridColumnGap={2}
                    w="100%"
                    bg="orange.600"
                    rounded="lg"
                    borderRadius="15px"
                    px={3}
                    py={1}
                    cursor="pointer"
                    boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    {...htmlProps}
                    onClick={(e: any) => {
                        props.handelClick(props.value)
                        // console.log("Original : " + props.value)
                    }}
                >
                    <Flex alignItems="center" justifyContent="center" border="2px solid" borderColor="orange.600" w={4} h={4} {...getCheckboxProps()}>
                        <Box w={4} h={4} backgroundSize="cover"
                            backgroundPosition="center" backgroundImage={Checked} />
                    </Flex>
                    <Text color="white" pt={0.5} pb={0.5} {...getLabelProps()}>
                        {props.value}
                    </Text>

                </chakra.label></motion.div> : <motion.div
                    initial={
                        { cursor: "pointer" }
                    }
                    whileHover={{ scale: 1.05, }}
                    whileTap={{
                        scale: 0.95,
                    }}><chakra.label
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        gridColumnGap={2}
                        w="100%"
                        bg="white"
                        rounded="lg"
                        borderRadius="15px"
                        px={3}
                        py={1}
                        cursor="pointer"
                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                        {...htmlProps}
                        onClick={(e: any) => {
                            props.handelClick(props.value)
                            // console.log("Original : " + props.value)
                        }}
                    >
                    <Flex alignItems="center" justifyContent="center" border="2px solid" borderColor="white" w={4} h={4} {...getCheckboxProps()}>
                    </Flex>
                    <Text color="black" pt={0.5} pb={0.5} {...getLabelProps()}>
                        {props.value}
                    </Text>

                </chakra.label></motion.div>
    )
}
