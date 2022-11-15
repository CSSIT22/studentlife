import { Box, Button, Flex, Grid, Heading, SimpleGrid, Spacer } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"
import AppBody from "../../../components/share/app/AppBody"
import LiList from "../../../components/shortnotes/liList"

const library = () => {
    return (
        <AppBody>
            <SimpleGrid columns={3} gap={4} mb={4} mt={10}>
                <Spacer />
                <Heading size={"lg"} textAlign={"center"}>
                    My library
                </Heading>
                <Link to={"./newLibrary"}>
                    <Flex justifyContent={"end"}>
                        <Button boxShadow={"md"} colorScheme="orange" size={"md"}>
                            New library
                        </Button>
                    </Flex>
                </Link>
            </SimpleGrid>

            <SimpleGrid columns={3} gap={4}>
                <LiList name={"midterm y2/1"}></LiList>
                <LiList name={"Network"}></LiList>
                <LiList name={"Algo p1"}></LiList>
                <LiList name={"Java"}></LiList>
            </SimpleGrid>
        </AppBody>
    )
}

export default library
