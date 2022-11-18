import React from "react"
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    ChakraProvider,
    Container,
    Flex,
    Heading,
    Stack,
    StackDivider,
    Text,
    VStack,
} from "@chakra-ui/react"
import AppBody from "src/components/share/app/AppBody"
import Header from "src/components/transaction/paymenthistory/header"
import PaymentHistory from "src/components/transaction/paymenthistory/paymentHistory"

const historyTransaction = () => {
    return (
        <>
            <AppBody />
            <Box bg="#FFF2E5" w="1280" h="3580px" p="auto">
                <Header />
                <PaymentHistory />
            </Box>
        </>

        // {/* <Box mt="7px" p="20px" bg="white" borderRadius={"10px"} shadow="xl" mb="30px" textAlign="center">
        //     <div>
        //         <h2>My Purchase</h2>
        //     </div>
        // </Box>

        // <Box >
        //     <Container>
        //         There are many benefits to a joint design and development system. Not only does it bring benefits to the design team, but it also
        //         brings benefits to engineering teams. It makes sure that our experiences have a consistent look and feel, not just in our design
        //         specs, but in production
        //     </Container>
        // </Box> */}
    )
}

export default historyTransaction
