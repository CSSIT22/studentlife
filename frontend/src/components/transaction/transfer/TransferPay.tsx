import {
    Box,
    Button,
    Center,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Textarea,
} from "@chakra-ui/react"
import React, { FC, useState } from "react"
import { Form } from "react-router-dom"

const TransferPay: FC<{ displaySize: boolean }> = ({ displaySize }, props) => {
    const amount = useState("50")

    return (
        <Box bgColor="white" padding={3} borderRadius="3xl">
            <Form>
                <FormLabel fontSize="3xl">Payment Detail</FormLabel>
                <FormControl p={4}>
                    <FormLabel>Amount</FormLabel>
                    <Textarea isDisabled placeholder={{ amount }.toString()} />
                    {displaySize ? (
                        <Box padding={4}>
                            <Text fontSize="2xl" fontWeight="bold">
                                Payment Method
                            </Text>
                            <Tabs variant="unstyled">
                                <TabList>
                                    <Tab _selected={{ color: "white", bg: "blue.500" }}>Tab 1</Tab>
                                    <Tab _selected={{ color: "white", bg: "green.400" }}>Tab 2</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <p>one!</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>two!</p>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    ) : (
                        <Button style={{ margin: 20 }} type="submit" variant="solid" bg="#E67F45" color="white" w="100%" _hover={{ bg: "green.500" }}>
                            Payment Method
                        </Button>
                    )}
                    <FormLabel paddingTop={5}>Note</FormLabel>
                    <Textarea noOfLines={3} resize={"none"} maxLength={300} />
                    <FormHelperText color="grey">* Limit 300 characters.</FormHelperText>

                    <FormControl id="confirmation">
                        <Center float={displaySize ? "right" : "none"}>
                            <Button
                                style={{ margin: 20 }}
                                type="submit"
                                variant="solid"
                                bg="#E67F45"
                                color="white"
                                w="100%"
                                _hover={{ bg: "green.500" }}
                            >
                                Confirm
                            </Button>
                        </Center>
                    </FormControl>
                </FormControl>
            </Form>
        </Box>
    )
}

export default TransferPay
