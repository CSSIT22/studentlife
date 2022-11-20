import { Center, Text } from "@chakra-ui/react"
import { FC } from "react"

const DatingCheckMobileDetails: FC<{ isMobile: boolean | undefined; Fname: string; Lname: string }> = ({ isMobile, Fname, Lname }) => {
    return (
        <Center>
            {isMobile ? (
                <></>
            ) : (
                <Text color="black" mt="6px" fontWeight="400" fontSize="18px" lineHeight="150%">
                    {Fname.length > 11 ? Fname.substring(0, 11) + "..." : Fname} {Lname.substring(0, 1)}.
                </Text>
            )}
        </Center>
    )
}

export default DatingCheckMobileDetails
