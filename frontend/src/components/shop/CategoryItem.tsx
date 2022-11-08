import { Flex, Center, Box, Image, useColorModeValue, LinkBox, LinkOverlay } from "@chakra-ui/react"
import React, { FC } from "react"

export const CategoryItem: FC<{
    name: string
    image: string
    link: string
}> = ({ name, image, link }) => {
    return (
        <LinkBox>
         <LinkOverlay href={link}>

         
        <Box bg={"white"} w="100px" borderRadius="lg" borderWidth="0px" rounded="md" shadow="sm" position="relative" overflow={"hidden"}>
            <Box background="gray">
                <Center>
                    <Image src={image} alt={`Picture of ${name}`} h="5rem" w="6rem" p="2" objectFit="contain" />
                </Center>
            </Box>

            <Center p="4">
                <Box fontSize="lg" fontWeight="semibold" as="h4" alignContent={"center"} lineHeight="tight" noOfLines={ 2 }>
                   {name}
                </Box>
            </Center>
        </Box>
        </LinkOverlay>
        </LinkBox>
    )
}
