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

         
        <Box bg={"white"} w="9rem" h="11rem" borderRadius="lg" rounded="md" shadow="md" position="relative" overflow={"hidden"}>
            <Box>
                <Center>
                    <Image src={image} alt={`Picture of ${name}`} h="7rem" w="9rem" p="0" objectFit="cover" />
                </Center>
            </Box>

            <Center p="4">
                <Box fontSize="lg" fontWeight="semibold" as="h4" alignContent={"center"} lineHeight="tight" noOfLines={ 1}>
                   {name}
                </Box>
            </Center>
        </Box>
        </LinkOverlay>
        </LinkBox>
    )
}
