import { Button, Text } from "@chakra-ui/react"
// import { useNavigate } from "react-router-dom";

// let navigate = useNavigate();
// const routeChange = () => {
//     let path = '/blog/create/';
//     navigate(path);
// }
const CreateButton = () => {
    return (
        <Button /*onClick={routeChange}*/ size="lg" colorScheme="orange" p="1" borderRadius="50%" float="right" position="fixed" right="20%" bottom="5%">
            <Text fontSize='2xl' textAlign="center"> + </Text>
        </Button>
    )
}


export default CreateButton
