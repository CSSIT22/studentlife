import { MinusIcon, AddIcon } from '@chakra-ui/icons'
import { Box, ButtonGroup, Button, IconButton, Center, Flex } from '@chakra-ui/react'
import React, { FC, useState } from 'react'

const QtyButton: FC<{
    productId: number,
    quantity: number,
    stock: number
}> = ({ productId, quantity, stock }) => {
    const [qty, setQty] = useState(quantity)
    // Add function to update PUT qty in backend
    const increaseQty = () => (setQty(qty + 1))
    const decreaseQty = () => (setQty(qty - 1))
    return (

        <Flex>
            <IconButton borderRadius="7px 0px 0px 7px" size="sm" variant="outline" aria-label="Add" icon={<MinusIcon />} disabled={qty == 0 ? true : false} onClick={decreaseQty} />
            <Box border="1px solid #d6dbe3" borderRadius="0px" px="3" py="0" alignContent="center" fontSize="lg" fontWeight="500">{qty}</Box>
            <IconButton borderRadius="0px 7px 7px 0px" size="sm" variant="outline" aria-label="Add" icon={<AddIcon />} disabled={qty == stock ? true : false} onClick={increaseQty} />
        </Flex>
    )
}

export default QtyButton