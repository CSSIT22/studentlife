import { Heading, Box, Grid, GridItem, Button, useBoolean, Flex } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FavoriteContent from "../../components/restaurant/FavoriteContent"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import API from "src/function/API"
import { Restaurant2 } from "@apiType/restaurant"
import Lottie from 'lottie-react'
import loading1 from './animation/loading1.json'
import notloading2 from './animation/notloading2.json'
function favorite() {
    // const showfv = Restaurant.filter((e1) => status === true)
    const params = useParams()
    const [property, setproperty] = React.useState<Restaurant2[]>([])
    const [status, setstatus] = useState(true)
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const getFav = API.get("/restaurant/favorite")
    const [radius, setradius] = useState(500);
    const selectRadius = (radius: number) => {
        setradius(radius)
    }
    useEffect(() => {
        getFav.then((item) => setproperty(item.data))
            .catch((err) => on())
            .finally(off)

    }, [status])

    const load = () => {
        setstatus(!status)
    }

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
            <Searchbar selectRadius={selectRadius} />

            <Heading color={"##000000"} mt={"20px"} textAlign="center">
                Favorite
            </Heading>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={"6"}>
                {property.map(({ restaurant }: any) => {

                    return (
                        <GridItem>
                            <FavoriteContent
                                id={restaurant.resId}
                                resName={restaurant.resName}
                                phone={restaurant.detail?.phoneNo ?? "-"}
                                openTime={
                                    restaurant.openAt && restaurant.closeAt && restaurant.openAt.length > 0 && restaurant.closeAt.length > 0
                                        ? `${restaurant.openAt[0]?.open.substring(0, 2)}:${restaurant.openAt[0]?.open.substring(2, 4)} - ${restaurant.closeAt[0]?.close.substring(0, 2)}:${restaurant.closeAt[0]?.close.substring(2, 4)}`
                                        : "Closed"
                                }
                                website={restaurant.detail?.website ?? "-"}
                                link={`/restaurant/detail?resId=${restaurant.resId}&id=0`}
                                img={restaurant.images[0].image}
                                load={load}
                            />
                        </GridItem>
                    )
                })}
            </Grid>
        </AppBody>
    )
}

export default favorite
