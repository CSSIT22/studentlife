import { Heading, Box, Grid, GridItem, Button } from "@chakra-ui/react"
import React from "react"
import { Link, useParams } from "react-router-dom"
import FavoriteContent from "../../components/restaurant/FavoriteContent"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import { Restaurant } from "./data/restaurant"

function favorite() {
    const showfv = Restaurant.filter((e1) => e1.status === true)
    return (
        <AppBody
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
            <Searchbar />

            <Heading color={"#E65300"} mt={"20px"} textAlign="center">
                Favorite
            </Heading>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={"6"}>
                {showfv.map((e1) => {
                    return (
                        <GridItem>
                            <FavoriteContent
                                id={e1.id}
                                resName={e1.resName}
                                phone={e1.phone}
                                open={e1.open}
                                close={e1.close}
                                website={e1.website}
                                link={`/restaurant/detail/${e1.id}`}
                                img={e1.img[0]}
                            />
                        </GridItem>
                    )
                })}
            </Grid>
        </AppBody>
    )
}

export default favorite
