import { MinusIcon, AddIcon } from '@chakra-ui/icons'
import { Box, ButtonGroup, Button, IconButton, Center, Flex } from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import API from 'src/function/API'

const QtyButton: FC<{
    productId: number,
    quantity: number,
    stock: number,
    increaseQty: (productId: number) => void,
    decreaseQty: (productId: number) => void
}> = ({ productId, quantity, stock, increaseQty, decreaseQty}) => {
    return (
        <Flex>
            <IconButton borderRadius="7px 0px 0px 7px" size="sm" variant="outline" aria-label="Add" icon={<MinusIcon />} disabled={quantity == 1 ? true : false} onClick={() => decreaseQty(productId)} />
            <Box border="1px solid #d6dbe3" borderRadius="0px" px="3" py="0" alignContent="center" fontSize="lg" fontWeight="500">{quantity}</Box>
            <IconButton borderRadius="0px 7px 7px 0px" size="sm" variant="outline" aria-label="Add" icon={<AddIcon />} disabled={quantity == stock ? true : false} onClick={() => increaseQty(productId)} />
        </Flex>
    )
}

export default QtyButton
