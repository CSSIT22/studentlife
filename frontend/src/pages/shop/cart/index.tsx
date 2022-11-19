import { useBreakpointValue, Container, Divider, Flex, Grid, GridItem, Heading, Box, Text, Checkbox, Button, Hide, Image, LinkBox, LinkOverlay,
ButtonGroup, IconButton, Center } from "@chakra-ui/react"
import { DeleteIcon, AddIcon, MinusIcon } from "@chakra-ui/icons"
import React, { FC, useState } from "react"
import PageTitle from "../../../components/shop/PageTitle"
import ShopAppBody from "../../../components/shop/ShopAppBody"
import convertCurrency from "../../../components/shop/functions/usefulFunctions"
const Cart = () => {
    const isMobile = useBreakpointValue({ base: false, md: false })
    const handleChange = () => {
    }
    return (
        <ShopAppBody>
            <Text as='b' fontSize='xl'> <PageTitle title="Cart" /> </Text>
            <Hide breakpoint='(max-width: 400px)'>
                <Flex bg="#fff" borderRadius="lg" shadow="lg" border="#Fafafa solid 1px" width="60%">
                    <Checkbox px="5" py="1.5" fontSize="lg">Select All</Checkbox>
                    <Button variant='ghost' fontWeight='light' ml="auto"><DeleteIcon /> &nbsp; Delete</Button>
                </Flex>
            </Hide>
            <Hide breakpoint='(min-width: 400px)'>
                <Flex bg="#fff" borderRadius="lg" shadow="lg" border="#Fafafa solid 1px" width="100%">
                    <Checkbox px="5" py="1.5" fontSize="lg">Select All</Checkbox>
                    <Button variant='ghost' fontWeight='light' ml="auto"><DeleteIcon /> &nbsp; Delete</Button>
                </Flex>
            </Hide>
            <Hide breakpoint='(max-width: 400px)'>
            <Box width='60%'>
                {generateCartProducts()}
                </Box>
            </Hide>
            <Hide breakpoint='(min-width: 400px)'>
                <Box width='100%'>
                {generateCartProducts()}
                </Box>
            </Hide>
        </ShopAppBody>
    )
}

function generateCartProducts(){
    let cart = []
    for (let i = 0; i < 5; i++) {
        cart.push(
            <Flex justifyContent="center" bg='#FFFFFF' borderRadius="lg" boxShadow="lg" mt={5}>
            <input type="checkbox" ></input>
            <Box ml={2}>
            <CartProduct name="iPhone 15 Pro max"
                        price={50000}
                        quantity={2}
                        image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                        link="/shop/product/productDetail"
                        stock={15}/>
            </Box>
        </Flex>
        )
    }
    return cart
}

const CartProduct: FC<{
    name: string
    price: number
    quantity: number
    image: string
    link: string
    stock: number
}> = ({ name, price, quantity, image, link, stock }) => {
    const [inDeQuantity, setInDeQuantity] = useState(quantity);

    const increase = () => {
        setInDeQuantity((prevNum) => prevNum + 1);
    }
    const decrease = () => {
        setInDeQuantity((prevNum) => prevNum - 1);
    }
    const isMobile = useBreakpointValue({ base: false, md: false })
    return (
        <Flex  justify = {"space-evenly"} direction={"row"} wrap={"wrap"}>
            <LinkBox>
                <LinkOverlay href={link}>
                    <Box>
                        <Image
                                width={{ base: 100, xl: 135 }}
                                height={{ base: 100, xl: 118 }}
                                my= "3"
                                src={image}
                                alt="product picture"
                                placeholder="blur"
                                borderRadius="5%"
                                objectFit="cover"
                            />
                    </Box>
                </LinkOverlay>
            </LinkBox>
            {/* <Flex wrap="wrap" align="center" justify="space-around" my="5" > */}
            <Box wrap="wrap" mr="auto" my="5">
                <Box fontWeight="semibold" as="h4" lineHeight="tight" px={10}>
                    {name}
                </Box>
                <Box>
                    <Box fontWeight="semibold" as="h4" lineHeight="tight" px={10}>
                        Price: {convertCurrency(price)}
                    </Box>
                </Box>
                <Hide breakpoint='(min-width: 400px)' >
                    <Box wrap="wrap" mr="auto">
                        <ButtonGroup size='sm' isAttached variant='outline' px={10}>
                            <button disabled={inDeQuantity==0?true:false} onClick={decrease} >
                                <IconButton aria-label='Add to friends' icon={<MinusIcon />} />
                            </button>
                            <Button>{inDeQuantity}</Button>
                            <button disabled={inDeQuantity==stock?true:false} onClick={increase}>
                                <IconButton aria-label='Add to friends' icon={<AddIcon />} />
                            </button>
                        </ButtonGroup>
                    </Box>
                </Hide>
                </Box>
            <Hide breakpoint='(max-width: 400px)' >
            <Box wrap="wrap" mr="auto" my="5" alignSelf="center">
                <ButtonGroup size='sm' isAttached variant='outline' px={10}>
                    <button disabled={inDeQuantity==0?true:false} onClick={decrease} >
                        <IconButton aria-label='Add to friends' icon={<MinusIcon />} />
                    </button>
                    <Button>{inDeQuantity}</Button>
                    <button disabled={inDeQuantity==stock?true:false} onClick={increase}>
                        <IconButton aria-label='Add to friends' icon={<AddIcon />} />
                    </button>
                </ButtonGroup>
            </Box>
            </Hide>
        </Flex>
    )
}

export default Cart
