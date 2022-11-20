import { MinusIcon, AddIcon } from "@chakra-ui/icons"
import { useBreakpointValue, Flex, LinkBox, LinkOverlay, Hide, ButtonGroup, IconButton, Button, Box, Image } from "@chakra-ui/react"
import React, { FC, useState } from "react"
import convertCurrency from "./functions/usefulFunctions"

const CartProduct: FC<{
    name: string
    price: number
    quantity: number
    image: string
    link: string
    stock: number
}> = ({ name, price, quantity, image, link, stock }) => {
    const [inDeQuantity, setInDeQuantity] = useState(quantity)

    const increase = () => {
        setInDeQuantity((prevNum) => prevNum + 1)
    }
    const decrease = () => {
        setInDeQuantity((prevNum) => prevNum - 1)
    }
    const isMobile = useBreakpointValue({ base: false, md: false })
    return (
        <Flex justifyContent="center" bg="#FFFFFF" borderRadius="lg" boxShadow="lg" mt={5}>
            <input type="checkbox"></input>
            <Box ml={2}>
                <Flex justify={"space-evenly"} direction={"row"} wrap={"wrap"}>
                    <LinkBox>
                        <LinkOverlay href={link}>
                            <Box>
                                <Image
                                    width={{ base: 100, xl: 135 }}
                                    height={{ base: 100, xl: 118 }}
                                    my="3"
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
                        <Hide breakpoint="(min-width: 400px)">
                            <Box wrap="wrap" mr="auto">
                                <ButtonGroup size="sm" isAttached variant="outline" px={10}>
                                    <button disabled={inDeQuantity == 0 ? true : false} onClick={decrease}>
                                        <IconButton aria-label="Add to friends" icon={<MinusIcon />} />
                                    </button>
                                    <Button>{inDeQuantity}</Button>
                                    <button disabled={inDeQuantity == stock ? true : false} onClick={increase}>
                                        <IconButton aria-label="Add to friends" icon={<AddIcon />} />
                                    </button>
                                </ButtonGroup>
                            </Box>
                        </Hide>
                    </Box>
                    <Hide breakpoint="(max-width: 400px)">
                        <Box wrap="wrap" mr="auto" my="5" alignSelf="center">
                            <ButtonGroup size="sm" isAttached variant="outline" px={10}>
                                <button disabled={inDeQuantity == 0 ? true : false} onClick={decrease}>
                                    <IconButton aria-label="Add to friends" icon={<MinusIcon />} />
                                </button>
                                <Button>{inDeQuantity}</Button>
                                <button disabled={inDeQuantity == stock ? true : false} onClick={increase}>
                                    <IconButton aria-label="Add to friends" icon={<AddIcon />} />
                                </button>
                            </ButtonGroup>
                        </Box>
                    </Hide>
                </Flex>
            </Box>
        </Flex>
    )
}

export default CartProduct
