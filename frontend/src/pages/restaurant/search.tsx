import { Open, Restaurant2 } from "@apiType/restaurant"
import { Box, Button, Flex, Grid, GridItem, Heading, Input, Menu, MenuButton, MenuItem, MenuList, useBoolean } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import FavoriteContent from "src/components/restaurant/FavoriteContent"
import API from "src/function/API"
import Searchbar from "../../components/restaurant/searchbar"
import Searchcontent from "../../components/restaurant/searchcontent"
import AppBody from "../../components/share/app/AppBody"
import Lottie from 'lottie-react'
import loading1 from './animation/loading1.json'
import notloading2 from './animation/notloading2.json'
const search = () => {
    const location = useLocation()
    // const params = useParams()
    const [search, setsearch] = useState<Restaurant2[]>([])
    const [open, setopen] = useState<Open>();
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)

    useEffect(() => {
        API.get("/restaurant/search?name=" + new URLSearchParams(location.search).get("name")).then((item) => setsearch(item.data))
            .catch((err) => on())
            .finally(off)
    }, [new URLSearchParams(location.search).get("name")])



    if (isLoading)
        return (
            <AppBody
                secondarynav={[
                    { name: "Like or Nope", to: "/restaurant" },
                    { name: "My Favorite", to: "/restaurant/favorite" },
                    { name: "My History", to: "/restaurant/history" },
                ]}
            >
                <Box w={"100%"} h={"100%"}>
                    <Flex justifyContent={"center"} alignItems={"center"} w={"100%"} h={"100%"}>
                        <Lottie animationData={loading1} style={{ scale: 1 }} />
                    </Flex>
                </Box>
            </AppBody>
        )

    if (isError) return (
        <AppBody
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
            <Box width="100%" height="100%">
                <Flex justifyContent={"center"} alignItems={"center"} width="100%" height="100%" mt={"8rem"}>
                    <Lottie animationData={notloading2} style={{ scale: 1 }} />
                </Flex>
            </Box>
        </AppBody>
    )

    return (
        <AppBody
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
            <Searchbar />

            <Heading mt={"20px"} textAlign="center">
                Search Result
            </Heading>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={"6"}>
                {search.map((e1: any) => {
                    return (
                        <GridItem>
                            <Link to={`/restaurant/detail/${e1.resId}`}>



                                <Searchcontent
                                    resName={e1.name}
                                    phone={e1.phone}
                                    open={e1.opening}
                                    close={e1.opening}
                                    website={e1.website}
                                    img={e1.photos}
                                    link={`/restaurant/detail/${e1.placeId}`}
                                    resid={e1.placeId}
                                />
                            </Link>
                        </GridItem>
                    )
                })}
            </Grid>
        </AppBody>
    )
}

export default search
