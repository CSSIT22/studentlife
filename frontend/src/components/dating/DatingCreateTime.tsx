import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { useState, FC } from "react"

const DatingCreateTime: FC<{
    setTime: any
    timePass: any
}> = ({ setTime, timePass }) => {
    const [time, setTimeInput] = useState<Date | any>(null)
    const handleInputTimeChange = (e: any) => setTimeInput(e.target.value)

    //Validate the date (I don't know why it worked, but it worked lol)
    const isNoTime = time === undefined || time === null
    let isValidTime = !isNoTime && !timePass // Use for check all Date validate
    // const [timeValid, setTimeValid] = useState<boolean>(isValidTime)

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
                    setTime(e.target.value)
                }}
                backgroundColor="white"
                size="sm"
                borderColor="black"
                errorBorderColor="red"
                isRequired
                shadow="lg"
            />
            {isNoTime && <FormErrorMessage color="red">You must provide a time.</FormErrorMessage>}
            {timePass && <FormErrorMessage color="red">The time has passed.</FormErrorMessage>}
        </FormControl>
    )
}

export default DatingCreateTime
