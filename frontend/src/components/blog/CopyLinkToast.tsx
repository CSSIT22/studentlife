import { useToast, Button } from "@chakra-ui/react"
import React from "react"
function CopyLinkToast() {
    const toast = useToast()
    return (
        <Button
            onClick={() =>
                toast({
                    title: "Link Copied!.",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                })
            }
        >
            CopyLink
        </Button>
    )
}

export default CopyLinkToast
