import React, { FC } from "react"
import {
    Box,
    Center,
    Flex,
    FormControl,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Spacer,
    Stack,
    Text,
    useMediaQuery,
} from "@chakra-ui/react"

const UsePoint: FC<{
    point: number
}> = ({ point }) => {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    return (
        <div>
            <Box bg="#fff2e5" borderRadius="10px" shadow={"lg"}>
                <Center p="10px">
                    <Flex>
                        <Stack>
                            <Text fontSize={isSmallerThan768 ? "md" : "lg"} fontWeight={"bold"} color="black">
                                Total Balance Point
                            </Text>
                            <Text fontSize={isSmallerThan768 ? "md" : "lg"} fontWeight={"bold"} color="black" align={"center"}>
                                {point}
                            </Text>
                        </Stack>
                        <Spacer />
                        <Stack bg={"#e67f45"} color="white" borderRadius="10px" shadow={"lg"} w={"40%"}>
                            <FormControl>
                                <Center>
                                    <FormLabel>Use Point</FormLabel>
                                </Center>

                                <NumberInput defaultValue={0} min={0}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </Stack>
                    </Flex>
                </Center>
            </Box>
        </div>
    )
}

export default UsePoint
