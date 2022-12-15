import { Center, Heading, Spinner, useBoolean } from "@chakra-ui/react"
import { useEffect } from "react"
import API from "src/function/API"

function convertCurrency(amount: number) {
    return "฿" + amount.toFixed(2)
}
export function dateFormat(date: Date): string {
    let hours = date.getHours() % 12
    let amPm = date.getHours() > 12 ? "PM" : " AM"
    let timeF = hours + ":" + date.getMinutes() + amPm
    return date.toDateString() + " at " + timeF 
    
}

export function setDataAPI(path: string, setData: Function) {
    /**
     * Uses the setData function to set the data to the response from API of provided path
     */
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const getData = API.get(path)
    useEffect(() => {
        getData.then((res) => setData(res.data)).catch((err) => on()).finally(() => off())
    }, [])
    if (isError) {
        return <Heading>There is an Error! Please Try Again Later</Heading>
    }
    if (isLoading) {
        return <Center><Spinner /></Center>
    }
    return true
}
export function updateDataAPI(path: string, setData: Function) {
    /**
     * Uses the setData function to set the data to the response from API of provided path
     */
    let isError = false, isLoading = false
    const getData = API.get(path)
    getData.then((res) => setData(res.data)).catch((err) => isError = true).finally(() => isLoading = false)
    if (isError) {
        return <Heading>There is an Error! Please Try Again Later</Heading>
    }
    if (isLoading) {
        return <Center><Spinner /></Center>
    }
    return true
}

export default convertCurrency
