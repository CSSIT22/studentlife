import { Grid, GridItem, Heading, useBoolean } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import FavoriteContent from "src/components/restaurant/FavoriteContent"
import API from "src/function/API"
import Historycontent from "../../components/restaurant/historycontent"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"
import { Restaurant2 } from "@apiType/restaurant"

const history = () => {
    const [property, setproperty] = React.useState<Restaurant2[]>([])
    const params = useParams()
    const [isError, {on}] = useBoolean()     
    const [isLoading, {off}] = useBoolean(true)
    useEffect(() => {
        API.get("/restaurant/history/").then((item) => setproperty(item.data))
        .catch((err) => on())
        .finally(off)
    }, [])

    // useEffect(() => {
    //     console.log(property);

    // }, [property])

    if (isLoading) 
    return    (
    <AppBody
    secondarynav={[
        { name: "Like or Nope", to: "/restaurant" },
        { name: "My Favorite", to: "/restaurant/favorite" },
        { name: "My History", to: "/restaurant/history" },
    ]}
>
     <Heading color={"black"}>Loading</Heading>
    </AppBody>
    )

    if(isError) return (
    <AppBody
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
       <Heading color={"red"}> There is an Error</Heading>
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
                History
            </Heading>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={"6"}>
                {property.map((e1: any) => {
                    //console.log(e1);
                    return (
                        <GridItem>
                            <Historycontent resName={e1.restaurant.resName} date={e1.updatedAt} status={e1.isLike} img={e1.restaurant.images} />
                        </GridItem>
                    )
                })}
            </Grid>
        </AppBody>
    )
}

export default history
