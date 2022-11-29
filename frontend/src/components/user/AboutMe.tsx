import React, { useState } from "react"
import { Box, Flex, Spacer, Text, SimpleGrid, useMediaQuery, extendTheme, Grid, Stack } from "@chakra-ui/react"


interface AboutMeProps {
    phone: string
    sex: string
    hobbies: string
    birthdate: string
    year: number
    address: string
}

const AboutMe: React.FC<AboutMeProps> = (props) => {
    const breakpoints = {
        sm: "320px",
        md: "768px",
        lg: "1000px",
        xl: "1200px",
        "2xl": "1536px",
    }

    // 3. Extend the theme
    const theme = extendTheme({ breakpoints })

    return (
        <div>
            <Flex rounded="xl" direction="column" my={4} mx={4} bg="white" position="initial" shadow={"lg"}>
                <Text color="black" p="5" fontSize={{ base: "xl", md: "2xl" }} fontWeight="600">
                    ABOUT ME
                </Text>
                <Box id="detail" ml={5} p={5}>
                    <SimpleGrid columns={{ base: 2, md: 1, lg: 2 }} spacing={7} >
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            PHONE
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            {props.phone}
                        </Text>
                        {/* <Text color="orange.700" fontSize="md" fontWeight="500">
                            AGE
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            20
                        </Text> */}
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            SEX
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            {props.sex}
                        </Text>
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            HOBBIES
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            {props.hobbies}
                        </Text>
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            BIRTHDATE
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            {props.birthdate}
                        </Text>
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            YEARS
                        </Text>
                        <Text color="black" fontSize="lg" fontWeight="700">
                            {props.year}
                        </Text>
                    </SimpleGrid>
                    <Stack direction={{ base: "column", lg: "row" }} mt="5" spacing={{ md: "5", base: "2" }}>
                        <Text color="orange.700" fontSize="md" fontWeight="500">
                            ADDRESS
                        </Text>
                        <Text mb="5" color="black" fontSize="lg" fontWeight="700">
                            {props.address}
                        </Text></Stack>

                </Box>
            </Flex>
        </div>
    )
}

export default AboutMe
