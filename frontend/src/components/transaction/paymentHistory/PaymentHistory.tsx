import { Stack, Text } from "@chakra-ui/react"
import { FC } from "react"

const PaymentHistory: FC<{
    transID: string,
    date: string
}> = ({ transID, date }) => {
    return (

        <Stack w={"100%"} bg={"#fff2e5"} borderRadius="lg" p={"20px"} mb="10px" shadow={"lg"} >
            <Text fontSize={{ base: "md", lg: "lg" }} fontWeight={"bold"} color="black">
                Transaction ID: {transID}
            </Text>

            <Text fontSize={{ base: "md", lg: "lg" }} fontWeight={"bold"} color="black">
                Date: {date}
            </Text>
        </Stack>





        //     <Flex>
        //         <Card>
        //             <CardBody>
        //                 <Stack divider={<StackDivider />} spacing="4">
        //                     <Box as="button" h="70px" w="500px" bg="#FFF2E5" p="12px" borderWidth="1px" borderRadius="lg" textAlign="left">
        //                         <Heading size="xs" textTransform="uppercase">
        //                             Transaction ID: xxx1234567890
        //                         </Heading>
        //                         <Text pt="2" fontSize="sm">
        //                             Date: dd/mm/yy xx:xx pm
        //                         </Text>
        //                     </Box>
        //                     <Box as="button" h="70px" w="500px" bg="#FFF2E5" p="12px" borderWidth="1px" borderRadius="lg" textAlign="left">
        //                         <Heading size="xs" textTransform="uppercase">
        //                             Transaction ID: xxx1234567890
        //                         </Heading>
        //                         <Text pt="2" fontSize="sm">
        //                             Date: dd/mm/yy xx:xx pm
        //                         </Text>
        //                     </Box>
        //                     <Box as="button" h="70px" w="500px" bg="#FFF2E5" p="12px" borderWidth="1px" borderRadius="lg" textAlign="left">
        //                         <Heading size="xs" textTransform="uppercase">
        //                             Transaction ID: xxx1234567890
        //                         </Heading>
        //                         <Text pt="2" fontSize="sm">
        //                             Date: dd/mm/yy xx:xx pm
        //                         </Text>
        //                     </Box>
        //                     <Box as="button" h="70px" w="500px" bg="#FFF2E5" p="12px" borderWidth="1px" borderRadius="lg" textAlign="left">
        //                         <Heading size="xs" textTransform="uppercase">
        //                             Transaction ID: xxx1234567890
        //                         </Heading>
        //                         <Text pt="2" fontSize="sm">
        //                             Date: dd/mm/yy xx:xx pm
        //                         </Text>
        //                     </Box>
        //                     <Box as="button" h="70px" w="500px" bg="#FFF2E5" p="12px" borderWidth="1px" borderRadius="lg" textAlign="left">
        //                         <Heading size="xs" textTransform="uppercase">
        //                             Transaction ID: xxx1234567890
        //                         </Heading>
        //                         <Text pt="2" fontSize="sm">
        //                             Date: dd/mm/yy xx:xx pm
        //                         </Text>
        //                     </Box>

        //                     {/* -- แบบ button defualt เผื่อไม่สามารถลิงค์ไปหาข้อมูลได้ -- */}
        //                     {/* <Button bg="#FFF2E5" w="510px" p="35px" borderWidth="1px" borderRadius="lg">
        //                             <Text>
        //                                 Transaction ID: xxx1234567890
        //                                 <br />
        //                                 Date: dd/mm/yy xx:xx pm
        //                             </Text>
        //                         </Button> */}
        //                 </Stack>
        //             </CardBody>
        //         </Card>
        //     </Flex>

        // <Button bgColor="#E65300" p="18px" mt="15px" ml="300px" maxWidth="700px" borderWidth="1px" borderRadius="lg" _hover={{ bg: "grey" }}>
        //     <Text color="white">Show all</Text>
        // </Button>

    )
}

export default PaymentHistory
