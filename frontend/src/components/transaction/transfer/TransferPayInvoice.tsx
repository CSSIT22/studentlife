import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Hide,
    Input,
    Show,
    Spacer,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Textarea,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { Form, Link } from "react-router-dom"
import EbankModal from "../methodpayment/Ebank"
import MasterCardModal from "../methodpayment/MasterCard"

const TransferPay = () => {
    const amount = useState("50")

    return (
        <Box bgColor="white" padding={3} borderRadius="3xl">
            <Form>
                <FormLabel fontSize="3xl">Payment Detail</FormLabel>
                <FormControl p={4}>
                    <FormLabel>Amount</FormLabel>
                    <Show below="md">
                        <Flex>
                            <Center>
                                <Stack direction={"column"}>
                                    <Text fontSize="md" fontWeight={"bold"}>
                                        Total payment 123,123
                                    </Text>
                                    <Text fontSize="md" fontWeight={"bold"}>
                                        Payment Method: ....
                                    </Text>
                                </Stack>
                            </Center>
                            <Spacer />
                            <Center>
                                <Box>
                                    <Button colorScheme="whiteAlpha" shadow={"lg"}>
                                        <Link to="shoptransaction/selectmethod">
                                            <Text fontSize="sm" fontWeight={"bold"} color="black">
                                                Select Method
                                            </Text>
                                        </Link>
                                    </Button>
                                </Box>
                            </Center>
                        </Flex>
                    </Show>
                    <Hide below="md">
                        <Flex>
                            <Text fontSize="lg" fontWeight={"bold"}>
                                Payment Method
                            </Text>
                            <Spacer />
                            <MasterCardModal />
                            <Spacer />
                            <EbankModal />
                            <Spacer />
                        </Flex>
                    </Hide>
                </FormControl>
            </Form>
        </Box>
    )
}

export default TransferPay
