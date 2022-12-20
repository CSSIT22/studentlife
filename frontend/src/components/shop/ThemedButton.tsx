import { Button } from '@chakra-ui/react'
import React from 'react'

const ThemedButton = (props: any) => {
  return (
    <Button type={props.type ? props.type : undefined} colorScheme="orange" w= {props.width ? props.width : "100%"} maxW = {props.maxW ? props.maxW : "none"} shadow="lg" onClick = {props.onClick ? props.onClick: undefined} _hover={{transform: "scale(1.03)" }}  _active ={{transform: "scale(1.0)" }} transitionDuration="300ms"> {props.children}</Button>
  )
}

export default ThemedButton
