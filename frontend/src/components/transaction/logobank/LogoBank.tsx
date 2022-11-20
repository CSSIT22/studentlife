import React, { FC } from "react"
import { Center, Image } from "@chakra-ui/react"
import "../logobank/logoBank.css"

const LogoBank: FC<{
    banklogo: string
}> = ({ banklogo }) => {
    return (
        <div>
            <Center>
                <Image className={banklogo} shadow={"lg"}></Image>
            </Center>
        </div>
    )
}

export default LogoBank
