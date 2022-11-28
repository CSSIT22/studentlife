import React, { FC, useState } from 'react'
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import ThemedButton from 'src/components/shop/ThemedButton'
type formInputs = {
    al1: string,
    al2: string,
    dst: string,
    pvn: string,
    ctry: string
}
const ShippingAddress:FC<{
    couponDiscount: number
}> = ({couponDiscount}) => {
    const [inputs, setInputs] = useState<formInputs>({
        al1: "",
        al2: "",
        dst: "",
        pvn: "Bangkok",
        ctry: "Thailand"
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
      const handleSubmit = (event: React.FormEvent<HTMLAnchorElement>) => {
        event.preventDefault();
      }
    return (
        <div>
            <Box my="5" boxShadow='lg' bg="#FFFFFF" borderRadius='lg'>
                <FormControl p="3" isRequired>
                    <FormLabel>Address Line 1</FormLabel>
                    <Input placeholder='Address Line 1' name="al1" value={inputs.al1} 
        onChange={handleChange}/>
                </FormControl>
                <FormControl p="3">
                    <FormLabel>Address Line 2</FormLabel>
                    <Input placeholder='Address Line 2' name="al2" value={inputs.al2} onChange={handleChange}/>
                </FormControl>
                <FormControl p="3" isRequired>
                    <FormLabel>District</FormLabel>
                    <Input placeholder='District' name="dst" value={inputs.dst} onChange={handleChange}/>
                </FormControl>
                <FormControl p="3" isRequired>
                    <FormLabel>Province</FormLabel>
                    <Input placeholder='Province' name="pvn" value={inputs.pvn} onChange={handleChange}/>
                </FormControl>
                <FormControl p="3">
                    <FormLabel>Country</FormLabel>
                    <Input name="ctry" value={inputs.ctry} onChange={handleChange} disabled/>
                </FormControl>
            </Box>
            <Box mt='10' mb='20'>
                <Link onSubmit={handleSubmit} to='../shop/confirm_order' state={{add: inputs.al1 + " \n" + inputs.al2 + "\n " + inputs.dst + ", " + inputs.pvn + ", " + inputs.ctry, couponDiscount: couponDiscount}}>
                    <ThemedButton >Next</ThemedButton>
                </Link>
            </Box>
        </div>
    )
}

export default ShippingAddress


