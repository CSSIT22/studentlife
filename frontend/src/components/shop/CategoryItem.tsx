import { Flex, Center, Box, Image, useColorModeValue, LinkBox, LinkOverlay } from "@chakra-ui/react"
import  { FC } from "react"
import { createSearchParams, Link, useNavigate } from "react-router-dom"
export const CategoryItem: FC<{
    id: number
    name: string
    image: string
    link?: string
}> = ({ id, name, image, link }) => {
    

    return (
        <LinkBox>
        <Link  
        to = {link? link : "/shop/categories/categoryDetails"}
        state = {{cat_id: id, cat_name: name}}
         >
        <Box bg={"white"} w="9rem" h="11rem" borderRadius="lg" rounded="md" shadow="md" position="relative" overflow={"hidden"}>
            <Box pt= "5" px="5">
                <Center >
                    <Image src={image} alt={`Picture of ${name}`} h="7rem" w="9rem" p="0" objectFit="contain" />
                </Center>
            </Box>

            <Center pt=" 2" pb = "4" px="4">
                <Box fontSize="lg" fontWeight="semibold" as="h4" alignContent={"center"} lineHeight="tight" noOfLines={ 1}>
                   {name}
                </Box>
            </Center>
        </Box>
        </Link>
        {/* </LinkOverlay> */}
        </LinkBox>
    )
}
