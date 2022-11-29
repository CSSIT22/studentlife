import { FC } from "react"
import { FormControl, FormLabel, Switch } from "@chakra-ui/react"

const QAnsAnonyButton: FC<{}> = ({}) => {
    return (
        <FormControl display="flex" alignItems="right">
            <FormLabel htmlFor="email-alerts" mb="0">
                🕵
            </FormLabel>
            <Switch id="anony" size="lg" colorScheme={"gray"} />
        </FormControl>
    )
}

export default QAnsAnonyButton
