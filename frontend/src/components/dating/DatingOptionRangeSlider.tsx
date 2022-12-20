import {
    Box,
    Center,
    Checkbox,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderMark,
    RangeSliderThumb,
    RangeSliderTrack,
    Tooltip,
} from "@chakra-ui/react"
import React, { FC } from "react"

const DatingOptionRangeSlider: FC<{
    sliderValue: number[]
    useAgeValue: boolean
    setUseAgeValue: React.Dispatch<React.SetStateAction<boolean>>
    setSliderValue: React.Dispatch<React.SetStateAction<number[]>>
}> = ({ sliderValue, useAgeValue, setUseAgeValue, setSliderValue }) => {
    function handleAge() {
        //Passing data + debug
        globalThis.age = sliderValue
    }

    function handleCheck() {
        //Passing data + debug
        globalThis.useAge = !useAgeValue
    }

    return (
        <Center bg="#E65300" h={20} borderRadius="15px" boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)">
            {/* Is user use age as criteria? */}
            <Tooltip label="Use age as a criteria?" aria-label="A tooltip">
                <span tabIndex={0}>
                    <Checkbox
                        colorScheme="white"
                        defaultChecked={true}
                        checked={useAgeValue}
                        isChecked={useAgeValue}
                        p="30px"
                        size="lg"
                        iconSize="5lg"
                        onChange={() => {
                            handleCheck()
                            setUseAgeValue(!useAgeValue)
                        }}
                    ></Checkbox>
                </span>
            </Tooltip>

            {/* Age min and Age max */}
            <RangeSlider
                aria-label={["min", "max"]}
                min={18}
                max={40}
                defaultValue={[19, 25]}
                value={sliderValue}
                onChange={(val) => {
                    handleAge()
                    setSliderValue(val)
                }}
                ml={"20px"}
                mr={"45px"}
            >
                <RangeSliderMark value={sliderValue[0]} textAlign="center" color="white" mt="-8" ml={{ base: "-6", md: "-5" }} w="12" fontWeight="700"
                    fontSize={{ base: "14px", md: "16px" }}
                    lineHeight="120%">
                    {sliderValue[0]}
                </RangeSliderMark>
                <RangeSliderMark value={sliderValue[1]} textAlign="center" color="white" mt="-8" ml={{ base: "-6", md: "-5" }} w="12" fontWeight="700"
                    fontSize={{ base: "14px", md: "16px" }}
                    lineHeight="120%">
                    {sliderValue[1]}
                </RangeSliderMark>
                <RangeSliderTrack bg="#FFF2E5">
                    <RangeSliderFilledTrack bg="#E69C73" />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={4} index={0}>
                    <Box color="#FFF2E5" />
                </RangeSliderThumb>
                <RangeSliderThumb boxSize={4} index={1}>
                    <Box color="#FFF2E5" />
                </RangeSliderThumb>
            </RangeSlider>
        </Center >
    )
}

export default DatingOptionRangeSlider
