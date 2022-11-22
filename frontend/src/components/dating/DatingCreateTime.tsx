import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react"
import React, { useState, FC } from "react"

const DatingCreateTime: FC<{
    getTime: any
    getValidTime: any
    selectDate: string
}> = ({ getTime, getValidTime, selectDate }) => {
    const [time, setTimeInput] = useState<Date>()
    const [timePass, setTimePass] = useState(false)
    const handleInputTimeChange = (e: any) => setTimeInput(e.target.value)

    //Validate the date (I don't know why it worked, but it worked lol)
    const isNoTime = time === undefined || time === null
    let isValidTime = !isNoTime && !timePass // Use for check all Date validate

    function isInTimePast(d: any, t: string) {
        const today = new Date()
        const chosenDate = new Date(d)

        //Check if user pick the same date as today or not
        if (
            chosenDate.getDate() === today.getDate() &&
            chosenDate.getMonth() === today.getMonth() &&
            chosenDate.getFullYear() === today.getFullYear()
        ) {
            //If user pick the same date check if the time have pass
            if (
                (today.getHours() === parseInt(t.substring(0, 2)) && today.getMinutes() >= parseInt(t.substring(3, 5))) ||
                today.getHours() > parseInt(t.substring(0, 2))
            ) {
                return true
            }
        }
        return false
    }
    {
        /* Time input & error control */
    }
    return (
        <FormControl isInvalid={!isValidTime} isRequired>
            <FormLabel>Time</FormLabel>
            <Input
                borderRadius={"6px"}
                id="time"
                type="time"
                value={time + ""}
                onChange={(e) => {
                    handleInputTimeChange(e)
                    getTime(e.target.value)
                    setTimePass(isInTimePast(selectDate, e.target.value))
                    getValidTime(isInTimePast(selectDate, e.target.value))
                }}
                backgroundColor="white"
                size="sm"
                borderColor="black"
                errorBorderColor="red"
                isRequired
                shadow="lg"
            />
            {!isNoTime ? <FormHelperText></FormHelperText> : <FormErrorMessage color="red">You must provide a time.</FormErrorMessage>}
            {!timePass ? <FormHelperText></FormHelperText> : <FormErrorMessage color="red">The time has passed.</FormErrorMessage>}
        </FormControl>
    )
}

export default DatingCreateTime
