import { useEffect, useState } from "react"
import API from "src/function/API"

import { Product } from "@apiType/shop"
import { useParams } from "react-router-dom"
import PageTitle from "src/components/shop/PageTitle"
import ShopAppBody from "src/components/shop/ShopAppBody"
import { Image, Text, Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Textarea, useBoolean, useDisclosure, useToast, Spacer, Center, Spinner } from "@chakra-ui/react"
import ContentBox from "src/components/shop/ContentBox"
import convertCurrency from "src/components/shop/functions/usefulFunctions"
import ReviewItem from "src/components/shop/ReviewItem"
import ThemedButton from "src/components/shop/ThemedButton"
import { Autoplay, Keyboard, Pagination, Zoom, EffectFade } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import Pill from "src/components/shop/Pill"
import { BsStarFill } from "react-icons/bs"

const index = () => {
    return (
        <ShopAppBody>
            <Box  alignItems="center" w="full" h="full" bg="red">
            <Spinner size="xl" />
            </Box>
        </ShopAppBody>
    )
}
export default index

