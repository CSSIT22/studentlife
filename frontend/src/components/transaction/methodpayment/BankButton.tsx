import { Button, Link, Text } from "@chakra-ui/react"
import React, { FC } from "react"

const BankButton:FC<{
    bank:string
}> = ({bank}) => {
    return (
        <div>
            <Link href="#">
                <Button w={"100%"} bg={"#e67f45"} borderRadius="lg" p={"20px"} mb="10px" h={"50px"} shadow={"lg"}>
                    <Text fontSize="lg"  color="white">
                        {bank}
                    </Text>
                </Button>
            </Link>
        </div>
    )
}

export default BankButton
