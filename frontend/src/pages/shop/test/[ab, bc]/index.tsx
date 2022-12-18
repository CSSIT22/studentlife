import { DeleteIcon } from "@chakra-ui/icons"
import CartProduct from "src/components/shop/CartProduct"
import ContentBox from "src/components/shop/ContentBox"
import convertCurrency, { dateFormat } from "src/components/shop/functions/usefulFunctions"
import PageTitle from "src/components/shop/PageTitle"
import ShopAppBody from "src/components/shop/ShopAppBody"
import { Flex, Box, Image, Text, useDisclosure, Button, Spacer, Checkbox, Grid, GridItem, Avatar, Center } from "@chakra-ui/react"
import React, { FC } from "react"
import { BsStarFill } from "react-icons/bs"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { useParams } from "react-router-dom"

const index = () => {
    const params = useParams()
    const testDate = new Date(2022, 10, 10, 0, 30, 10)
    return (
        <ShopAppBody>
            <PageTitle title= "Explore" />
            {"" + params.ab + params.bc}
            {dateFormat(testDate)}
        </ShopAppBody>
    )
}
export default index
