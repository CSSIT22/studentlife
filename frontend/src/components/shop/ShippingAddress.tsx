import React from 'react'
import { Box, FormControl, FormLabel, Input, Link } from "@chakra-ui/react"
import ThemedButton from 'src/components/shop/ThemedButton'

const ShippingAddress = () => {
    return (
        <div>
            <Box my="5" boxShadow='lg' bg="#FFFFFF" borderRadius='lg'>
                <FormControl p="3" isRequired>
                    <FormLabel>Street 1</FormLabel>
                    <Input placeholder='Street 1' />
                </FormControl>
                <FormControl p="3">
                    <FormLabel>Street 2</FormLabel>
                    <Input placeholder='Street 2' />
                </FormControl>
                <FormControl p="3" isRequired>
                    <FormLabel>City</FormLabel>
                    <Input placeholder='City' />
                </FormControl>
                <FormControl p="3" isRequired>
                    <FormLabel>State</FormLabel>
                    <Input placeholder='State' />
                </FormControl>
                <FormControl p="3" isRequired>
                    <FormLabel>Country</FormLabel>
                    <Input placeholder='Country' />
                </FormControl>
            </Box>
            <Box mt='10' mb='20'>
                <Link to="../shop/confirm_order/">
                    <ThemedButton>
                        Next
                    </ThemedButton>
                </Link>
            </Box>
        </div>
    )
}

export default ShippingAddress


