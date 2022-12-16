import { Box, Button, ButtonProps, ComponentWithAs, Input, useDisclosure, } from "@chakra-ui/react"
import React, { FC, useState } from "react"
import { CiImageOn } from "react-icons/ci"




// function app() {
//     const [name, setName] = useState();
//     const [file, setFile] = useState();


// const TempUpload: FC<{ files: any, setFiles: Function}> = ({files, setFiles}) =>{
//     const[clickDrop, setClickDrop] = useState(false)

//     const[dropDuration, setDropDuration] = useState({
//         temp: true,
//         perm: false,
//     })
// }

// function FileUploadSingle() {
//     const [file, setFile] = useState<File>();

//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//       if (e.target.files) {
//         setFile(e.target.files[0]);
//       }
//     };

const ImageInsert: FC<{ children: React.ReactNode; files: any, setFiles: Function }> = ({ children, files, setFiles }) => {

    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (event.target.files) {
            setFiles(event.target.files[0]);

        }
    };
    return (
        <Box>
            <Button onClick={() => inputRef.current?.click()} rightIcon={<CiImageOn size="50px" />} colorScheme="orange" variant="outline" marginTop="5" width="330px" height="330px">

                IMAGES
                <input
                    type="file"
                    accept="image/jpeg,image/png"
                    ref={inputRef}
                    onChange={handleChange}
                    style={{ display: "none" }}

                    {...files}
                />
                {children}
            </Button>
        </Box>



    )
}

export default ImageInsert
