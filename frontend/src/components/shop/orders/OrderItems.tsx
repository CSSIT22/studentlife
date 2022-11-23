import { useBreakpointValue, Flex, Hide, Text, Box, Grid } from "@chakra-ui/react"
import { FC } from "react"
import Details from "./Detials"
import { generateProducts } from "../functions/usefulFunctions"

const OrderItems: FC<{
    orderNo: string
    orderDateTime: string
    orderStatus: string
}> = ({ orderNo, orderDateTime, orderStatus }) => {
    const isMobile = useBreakpointValue({ base: false, md: false })
    return (
        <div>
            <Flex direction="column" alignItems="center" wrap="wrap" my="3">
                <Box bg="#FFFFFF" borderRadius="30" boxShadow="xl">
                    <Flex m="4" wrap="wrap" justify="space-between" gap={5}>
                        <Text>{orderNo ? orderNo + " " : "<Order No> "}</Text>
                        <Text>December, 24, 2022 at 12:00AM</Text>
                        <Text>{orderStatus ? orderStatus : "Delivered"}</Text>
                        {/* </Hide> */}
                    </Flex>
                    <Box h="min" w="full" bg="black" p="0.3"></Box>
                    <Grid>{generateProducts()}</Grid>
                    <Details
                        subtotal={10000}
                        deliveryFee={30}
                        couponDiscount={20}
                        address="No.1111, Blahxxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxxxxxxxxxx  Blah Quarter, Bangkok Thailand"
                        paymentMethod="Master Card"
                    />
                </Box>
            </Flex>
        </div>
    )
}

export default OrderItems
