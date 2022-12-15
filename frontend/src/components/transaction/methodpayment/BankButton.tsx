import { Button, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { Link } from 'react-router-dom';

const BankButton: FC<{
    bank: string
    link: string
}> = ({ bank, link }) => {
    return (
        <div>
            <Link to={link}>
                <Button w={"100%"} bg={{ base: "#e67f45", lg: "#fff2e5" }} borderRadius="lg" p={"20px"} mb="10px" h={"50px"} shadow={"lg"}>
                    <Text fontSize="lg" color={{ base: "white", lg: "black" }} fontWeight="bold">
                        {bank}
                    </Text>
                </Button>
            </Link>
        </div>
    )
}

export default BankButton
