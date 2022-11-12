import { Grid, GridItem, Heading } from "@chakra-ui/react"
import React from "react"
import FavoriteContent from "src/components/restaurant/FavoriteContent"
import Historycontent from "../../components/restaurant/historycontent"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import { detailHistory } from "./data/detailHistory"

const history = () => {
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
                History
            </Heading>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={"6"}>
                {detailHistory.map((e1) => {
                    return (
                        <GridItem>
                            
                            <Historycontent resName={e1.resName} date={e1.date} status={e1.status} />
                        </GridItem>
                    )
                })}
            </Grid>
        </AppBody>
    )
}

export default history
