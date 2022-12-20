import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Container, Grid, HStack, SimpleGrid, Text } from "@chakra-ui/react"
import React from "react"
import API from "src/function/API"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"

export const SuggestedFriend = () => {
    const [sugg, setSugg] = useState<any>([])
    // const getData = API.get("/timeline/getposts") old mockup data
    // const getPost = API.get("/timeline/getPostList") // data from database
    const getFriend = API.get("/timeline/getSuggestion")
    // NEED TO USE getPostList
    useEffect(() => {
        getFriend.then(res => {
            setSugg(res.data)
        })
    }, [])
    // console.log(sugg)
    // const suggValue = [...sugg.value()]
    // console.log(suggValue)
    const [isFollow, setIsFollow] = useState<boolean>()
    const [followerCount, setFollowerCount] = useState<number>(0)

    async function handleClickFollow() {
        if (isFollow) {
            setIsFollow(!isFollow)
        } else {
            setIsFollow(!isFollow)
        }
    }

    return (
        sugg.map((suggFS: any, index: any) =>
            <Link to={"/user/" + suggFS?.postOwner.userId}>
                <div key={index}>
                    <Card align="center" minW="2xs" maxW="2xs" backgroundColor={"white"}>
                        <CardHeader>
                            <Grid justifyContent="center">
                                <Avatar marginLeft={"30px"} size="xl" src={import.meta.env.VITE_APP_ORIGIN + "/user/profile/" + suggFS?.postOwner.userId} />
                                <Text fontSize={"small"}>{suggFS.postOwner.fName + " " + suggFS.postOwner.lName}</Text>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Text fontSize="sm">{suggFS.postOwner.majorId}</Text>
                            <HStack spacing="5" align="-moz-initial">
                                <Text align="left" fontSize="sm">
                                    {/* Faculty: Computer Sci */}
                                </Text>
                                <Text align="left" fontSize="sm">
                                    {/* Year: 2 */}
                                </Text>
                            </HStack>
                        </CardBody>
                        <CardFooter>
                            <Grid justifyContent="center" alignItems="center">
                                {/* <Button bgColor="orange.300" color="white" onClick={() => {
                                handleClickFollow()
                            }}>
                                Follow
                            </Button> */}
                            </Grid>
                        </CardFooter>
                    </Card>
                </div>
            </Link>
        )
    )
}

export default SuggestedFriend
