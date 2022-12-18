import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Container, Grid, HStack, Text } from "@chakra-ui/react"
import React from "react"
import API from "src/function/API"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const SuggestedFriend = () => {
    const [sugg, setSugg] = useState<any>([])
    // const getData = API.get("/timeline/getposts") old mockup data
    // const getPost = API.get("/timeline/getPostList") // data from database
    const getFriend = API.get("/timeline/getStudentPost")

    useEffect(() => {
        getFriend.then(res => {
            setSugg(res.data)
        })
    }, [])
    console.log(sugg)

    return (
        sugg.map((suggFS: any, index: any) =>
            <Card align="center" minW="2xs" maxW="2xs" backgroundColor={"white"}>
                <CardHeader>
                    <Grid justifyContent="center">
                        <Avatar marginLeft={"50px"} size="xl" src={import.meta.env.VITE_APP_ORIGIN + "/user/profile/" + suggFS?.postOwner.studentId} />
                        <Text fontSize={"large"}>{suggFS.postOwner.fName + " " + suggFS.postOwner.lName}</Text>
                    </Grid>
                </CardHeader>
                <CardBody>
                    <Text fontSize="sm">Department: SIT</Text>
                    <HStack spacing="5" align="-moz-initial">
                        <Text align="left" fontSize="sm">
                            Faculty: Computer Sci
                        </Text>
                        <Text align="left" fontSize="sm">
                            Year: 2
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
    )
}

export default SuggestedFriend
