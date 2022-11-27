import { Box, Heading } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import AppBody from "src/components/share/app/AppBody"
import API from "src/function/API"

const index = () => {
    const [students, setstudents] = useState<any>([])
    const getData = API.get("/training/getstudents")
    useEffect(() => {
        getData.then((res) => {
            setstudents(res.data)
        })
    }, [])
    return (
        <AppBody>
            <Heading>All student</Heading>
            {students.map((item: any) => (
                <Box key={item.id} p={5} m={3} shadow="md" bg="white" rounded={"lg"}>
                    <Heading>{item.name}</Heading>
                </Box>
            ))}
        </AppBody>
    )
}
