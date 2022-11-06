import { Button } from '@chakra-ui/react'
import React, { FC } from 'react'

const DatingInterestDynamicButton: FC<{numOfInterest: number, handleSubmit: () => void}> = ({numOfInterest, handleSubmit}) => {
  return (
    numOfInterest == 0 ? (
        <Button colorScheme="gray" size="lg" borderRadius="full" float="right">
            Skip
        </Button>
    ) : (
        <Button colorScheme="gray" size="lg" borderRadius="full" float="right" onClick={handleSubmit}>
            Done
        </Button>
    )
  )
}

export default DatingInterestDynamicButton