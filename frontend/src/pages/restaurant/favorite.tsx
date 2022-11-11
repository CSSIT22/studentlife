import { Heading, Box, Grid, GridItem } from "@chakra-ui/react"
import React from "react"
import FavoriteContent from "../../components/restaurant/FavoriteContent"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import { Restaurant } from "./restaurant"

const favorite = () => {
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
                Favorite
            </Heading>
            <Grid templateColumns={{base:'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}} gap={"6"}>
               {Restaurant.map((e1) => {
                return <GridItem>
                    <FavoriteContent resName={e1.resName} phone={e1.phone} open={e1.open} close={e1.close} website={e1.website}/>
                </GridItem>
               })}
            </Grid>
        </AppBody>
    )
}

export default favorite
