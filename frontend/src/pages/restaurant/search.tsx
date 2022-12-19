import { Open, Restaurant2 } from "@apiType/restaurant"
import { Box, Button, Flex, Grid, GridItem, Heading, Input, Menu, MenuButton, MenuItem, MenuList, useBoolean } from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
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
    const [page, setPage] = useState(1)
    const [open, setopen] = useState<Open>();
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const [radius, setradius] = useState(500);
    const [isAll, setIsAll] = useState(false);

    const selectRadius = (radius: number) => {
        setradius(radius)
    }

    // console.log('rerender!')

    // useEffect(() => {

    // }, []);

    const fetchRestaurant = async () => {
        if (isAll) return;
        return API.get("/restaurant/search?name=" + new URLSearchParams(location.search).get("name") + "&page=" + page).then((item) => {
            if (item.data.length != 0) {
                setsearch([...search, ...item.data])
            } else {
                setIsAll(true)
                window.removeEventListener('scroll', onScroll)
            }
        })
            .catch((err) => on())
            .finally(off)
    }
    const isFetching = useRef(false);

    useEffect(() => {
        console.log('name reredered!')
        fetchRestaurant().then(() => isFetching.current = false)
    }, [new URLSearchParams(location.search).get("name"), page])

    function onScroll(event: Event) {
        console.log("scroll", window.scrollY, document.body.scrollHeight - window.innerHeight);

        if (window.scrollY > document.body.scrollHeight - window.innerHeight - 80) {
            if (!isFetching.current) {
                console.log("Fetched");
                setPage(page => page + 1)
                isFetching.current = true;
            }
        }
    }

    useEffect(() => {
        const target = window;
        if (!target) return () => { };
        target.addEventListener('scroll', onScroll);
        return () => target.removeEventListener('scroll', onScroll);
    }, []);

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
            id="container"
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
            onScroll={(e) => console.log("scroll")}
        >
            <Searchbar selectRadius={selectRadius} />

            <Heading mt={"20px"} textAlign="center">
                Search Result
            </Heading>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={"6"}>
                {search.map((e1: any) => {
                    return (
                        <GridItem>
                            {/* <Link to={`/restaurant/detail?resId=${e1.placeId}&id=0`}> */}

                            <Searchcontent
                                resName={e1.name}
                                phone={e1.phone}
                                open={e1.opening}
                                close={e1.opening}
                                website={e1.website}
                                img={e1.photos}
                                link={`/restaurant/detail?resId=${e1.placeId}&id=0`}
                                resid={e1.placeId}
                            />
                            {/* </Link> */}
                        </GridItem>
                    )
                })}
            </Grid>
        </AppBody >
    )
}

export default search
