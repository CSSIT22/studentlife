import React, { useEffect, useRef, useState } from "react"
import { Box, Flex, Spacer, Text, Container, extendTheme } from "@chakra-ui/react"
import Feeduser from "../timeline/userfeed"
import Postuser from "../timeline/getuserpost";




function BlogHistory() {
    const [isLoading, setLoading] = useState(false);
    const [postset, setpostset] = useState(1)

    const handleScroll = () => {
        if (isLoading) return
        const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
        // user scrolled enough
        if (windowRelativeBottom <= document.documentElement.clientHeight) {
            // fetch 20 post every 5000 px
            setpostset(prev => prev + 1);
        }
        // console.log(postset, currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    });

    const breakpoints = {
        sm: "400px",
        md: "800px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
    }

    const theme = extendTheme({ breakpoints })
    return (
        <Flex rounded="xl" direction="column" mt={{ base: "2", md: "4" }} mx={4} bg={{ base: "", sm: "white" }} p={2} position="initial" shadow={{ base: "", md: "lg" }}>
            <Text color="Black" p="3" fontSize={{ base: "xl", md: "2xl" }} fontWeight="500">
                BLOG HISTORY
            </Text>

            <Flex padding="2" mx={{ base: "10", md: "2" }} alignContent="center" alignSelf="center">
                {/* {[...Array(postset).keys()].map(item => <Postuser i={item} key={item} isLoading={isLoading} setLoading={setLoading} />)} */}
                <Feeduser />
            </Flex>
        </Flex>
    )
}

export default BlogHistory
