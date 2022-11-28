import { Heading, Box, Grid, GridItem, Button } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import FavoriteContent from "../../components/restaurant/FavoriteContent"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import API from "src/function/API"
import { key } from "localforage"
import { Restaurant2 } from "@apiType/restaurant"

function favorite() {
    // const showfv = Restaurant.filter((e1) => status === true)
    const params = useParams()
    const [property, setproperty] = React.useState<Restaurant2[]>([])
    const [status, setstatus] = useState(true)

    useEffect(() => {
        API.get("/restaurant/favorite").then((item) => setproperty(item.data))
    }, [status])

    const load = () => {
        setstatus(!status)
    }

    console.log(property)
    return (
        <AppBody
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
            <Searchbar />

            <Heading color={"##000000"} mt={"20px"} textAlign="center">
                Favorite
            </Heading>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={"6"}>
                {property.map(({ restaurant }: any) => {
                    console.log(property)
                    return (
                        <GridItem>
                            <FavoriteContent
                                id={restaurant.resId}
                                resName={restaurant.resName}
                                phone={restaurant.detail?.phoneNo ?? "-"}
                                openTime={
                                    restaurant.openAt && restaurant.closeAt && restaurant.openAt.length > 0 && restaurant.closeAt.length > 0
                                        ? `${restaurant.openAt[0]?.open} - ${restaurant.closeAt[0]?.close}`
                                        : "Closed"
                                }
                                website={restaurant.detail?.website ?? "-"}
                                link={`/restaurant/detail/${restaurant.resId}`}
                                img={restaurant.images}
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
