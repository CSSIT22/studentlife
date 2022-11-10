import { Heading, Box, Grid, GridItem } from "@chakra-ui/react"
import React from "react"
import FavoriteContent from "../../components/restaurant/FavoriteContent"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"

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
                <GridItem>
                <FavoriteContent
                    resName={"Kitchen Cheif's"}
                    phone={"0919191911"}
                    open={"10.00 am - 9.00 pm"}
                    website={"https://www.facebook.com/pugkitchenchef"}
                />
                </GridItem>
                <GridItem>
                <FavoriteContent
                    resName={"Kitchen Cheif's"}
                    phone={"0919191911"}
                    open={"10.00 am - 9.00 pm"}
                    website={"https://www.facebook.com/pugkitchenchef"}
                />
                </GridItem>
                <GridItem>
                <FavoriteContent
                    resName={"Kitchen Cheif's"}
                    phone={"0919191911"}
                    open={"10.00 am - 9.00 pm"}
                    website={"https://www.facebook.com/pugkitchenchef"}
                />
                </GridItem>
            </Grid>
        </AppBody>
    )
}

export default favorite
