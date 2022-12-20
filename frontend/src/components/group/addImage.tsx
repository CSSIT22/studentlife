import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonProps, ComponentWithAs, Icon, IconButton, Input, useDisclosure, } from "@chakra-ui/react"
import React, { FC, useEffect, useRef, useState } from "react"
import { CiImageOn, CiYoutube } from "react-icons/ci"

type ImageInsertProps = {
    children: React.ReactNode;
    files: any | null;
    setFiles: (files: any | null) => void;
};

const ImageInsert: FC<ImageInsertProps> = ({ children, files, setFiles }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [imageWidth, setImageWidth] = useState<number | null>(null);
    const [imageHeight, setImageHeight] = useState<number | null>(null);

    useEffect(() => {
        
        if (previewUrl) {
            const img = new Image();
            img.src = previewUrl;
            img.onload = () => {
                setImageWidth(img.naturalWidth * 0.75); // multiply by 0.5 to account for the 50% width of the image
                setImageHeight(img.naturalHeight * 0.75); // multiply by 0.5 to account for the 50% width of the image
            };
        }
    }, [previewUrl]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            
            setPreviewUrl(URL.createObjectURL(files[0]));
            
            setPreviewUrl(URL.createObjectURL(files[0]));
            setFiles(files)

            const image = new Image();
            image.src = URL.createObjectURL(files[0]);

            image.onload = () => {
                setImageWidth(image.naturalWidth);
                setImageHeight(image.naturalHeight);
            };


        }
    };


    const handleDelete = () => {
        setPreviewUrl('');
        setFiles(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };



    return (
        <Box>
            <div style={{ position: 'relative' }}>
                {previewUrl && (
                    <IconButton
                        onClick={() => {
                            handleDelete();
                            setImageWidth(null);
                            setImageHeight(null);
                        }}

                        aria-label="Delete uploaded file"

                        position="absolute"
                        top={4}
                        left={4}
                        size="sm"
                        colorScheme="red"
                        zIndex={1}
                        icon={<CloseIcon />}


                    >
                    </IconButton>
                )}
                <Button
                    onClick={() => inputRef.current?.click()}
                    colorScheme="orange"
                    variant="outline"
                    marginTop="2"
                    marginLeft="2"
                    py={'2'}
                    // boxSize={'100%'}
                    width={imageWidth ? '100px' : 'auto'}
                    height={imageHeight ? '100px' : 'auto'}
                    size="sm"
                >
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" style={{ width: '100%' }} />
                    ) : (
                        <>

                            Upload your image or video

                        </>
                    )}
                    <input
                        type="file"
                        accept="image/jpeg,image/png"
                        ref={inputRef}
                        onChange={handleChange}
                        style={{ display: 'none' }}
                        {...files}
                    />
                    {children}
                </Button>
            </div>
        </Box>
    );



};


export default ImageInsert
