import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { useState, FC } from "react"

var isPassDate: boolean

const DatingCreateDate: FC<{
    setDate: any
    timePass: any
}> = ({ setDate, timePass }) => {
    const [date, setDateInput] = useState("")
    const handleInputDateChange = (e: any) => setDateInput(e.target.value)

    const isNoDate = date.length < 8
    let isValidDate = !isNoDate && !timePass // Use for check all Date validate

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
                    setDate(e.target.value)
                }}
                backgroundColor="white"
                size="sm"
                borderColor="black"
                errorBorderColor="red"
                isRequired
                shadow="lg"
            />

            {isNoDate && <FormErrorMessage color="red">You must provide a date.</FormErrorMessage>}

            {timePass &&
                <FormErrorMessage color="red">The date has passed or is too far from today.</FormErrorMessage>
            }
        </FormControl>
    )
}

export default DatingCreateDate
