import { Flex, Center, Box, Image, useColorModeValue, LinkBox, LinkOverlay } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { FC } from "react"
import { createSearchParams, Link, useNavigate } from "react-router-dom"
export const CategoryItem: FC<{
    id: number
    name: string
    image: string
    link?: string
}> = ({ id, name, image, link }) => {


    return (
        <motion.div initial={{scale: 0.1}} animate={{ scale: 1}} transition={{
            default: { ease: "backOut", duration: 0.5}
          }}>
        <LinkBox>
            <Link
                to={link ? link : "/shop/categories/" + id}
                state={{ cat_id: id, cat_name: name }}
            >
                <Box bg={"white"} w="9rem" h="11rem" borderRadius="lg" rounded="md" shadow="md" position="relative" overflow={"hidden"} border='1px solid #E65300' _hover={{transform: "scale(1.1)" }} transitionDuration="300ms">
                    <Box py="2" px="5">
                        <Center >
                            <Image src={image} alt={`Picture of ${name}`} h="7rem" w="9rem" p="2" objectFit="contain" />
                        </Center>
                    </Box>
                    <Box h="min" w="full" bg="#E65300" p="0.3"></Box>
                    <Center pt=" 2" pb="4" px="4">
                        <Box color='#E65300' fontSize="lg" fontWeight="semibold" as="h4" alignContent={"center"} lineHeight="tight" noOfLines={1}>
                            {name}
                        </Box>
                    </Center>
                </Box>
            </Link>
            {/* </LinkOverlay> */}
        </LinkBox>
        </motion.div>
    )
}
