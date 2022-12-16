import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react"
import React, { useState, FC } from "react"

var isPassDate: boolean

const DatingCreateDate: FC<{
    getDate: any
    getValidDate: any
}> = ({ getDate, getValidDate }) => {
    const [date, setDateInput] = useState("")
    const handleInputDateChange = (e: any) => setDateInput(e.target.value)

    const isNoDate = date.length < 8
    let isValidDate = !isNoDate && !isInThePast(date) // Use for check all Date validate

    function isInThePast(d: any) {
        const today = new Date()
        //today.setHours(0, 0, 0, 0)
        const previous = new Date(today.getTime())
        previous.setDate(today.getDate() - 1)
        today.toLocaleDateString("th-TH", { timeZone: "Asia/Bangkok" })
        const date = new Date(d)
        //date.setHours(0, 0, 0, 0)
        date.toLocaleDateString("th-TH", { timeZone: "Asia/Bangkok" })
        // IDK Why it worked
        // It should be (date > previous && date !== previous) === true
        isPassDate = ((date < previous && date !== previous) || date.getFullYear() - today.getFullYear() > 1) === true // Set value for validation
        //console.log(today + " & " + date)
        return ((date < previous && date !== previous) || date.getFullYear() - today.getFullYear() > 1) === true
    }
    {
        /* Date input & error control */
    }
    return (
        <FormControl isInvalid={!isValidDate} isRequired>
            <FormLabel>Date</FormLabel>
            <Input
                borderRadius={"6px"}
                id="date"
                type="date"
                value={date}
                onChange={(e) => {
                    handleInputDateChange(e)
                    getDate(e.target.value)
                    getValidDate(isInThePast(e.target.value))
                }}
                backgroundColor="white"
                size="sm"
                borderColor="black"
                errorBorderColor="red"
                isRequired
                shadow="lg"
            />

            {isInThePast(date) ? <FormHelperText></FormHelperText> : <FormErrorMessage color="red">You must provide a date.</FormErrorMessage>}

            {isNoDate ? (
                <FormHelperText></FormHelperText>
            ) : (
                <FormErrorMessage color="red">The date has passed or is too far from today.</FormErrorMessage>
            )}
        </FormControl>
    )
}

export default DatingCreateDate
