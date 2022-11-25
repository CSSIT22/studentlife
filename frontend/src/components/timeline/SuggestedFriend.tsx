import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Container, Grid, HStack, Text } from "@chakra-ui/react"
import React from "react"

const SuggestedFriend = ({ photoUrl, year, department, faculty }: { photoUrl: string; year: number; department: string; faculty: string }) => {
    return (
        <Card align="center" minW="2xs" maxW="2xs" backgroundColor={"white"}>
            <CardHeader>
                <Grid justifyContent="center">
                    <Avatar size="xl" src={photoUrl} />
                </Grid>
            </CardHeader>
            <CardBody>
                <Text fontSize="sm">Department: {department}</Text>
                <HStack spacing="5" align="-moz-initial">
                    <Text align="left" fontSize="sm">
                        Faculty: {faculty}
                    </Text>
                    <Text align="left" fontSize="sm">
                        Year: {year}
                    </Text>
                </HStack>
            </CardBody>
            <CardFooter>
                <Grid justifyContent="center" alignItems="center">
                    <Button bgColor="orange.300" color="white">
                        Follow
                    </Button>
                </Grid>
            </CardFooter>
        </Card>
    )
}

export default SuggestedFriend
