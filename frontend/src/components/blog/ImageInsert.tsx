import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonProps, ComponentWithAs, Icon, IconButton, Input, useDisclosure, } from "@chakra-ui/react"
import React, { FC, useEffect, useRef, useState } from "react"
import { CiImageOn, CiYoutube } from "react-icons/ci"

type ImageInsertProps = {
    children: React.ReactNode;
    files: File | null;
    setFiles: (files: File | null) => void;
};

const ImageInsert: FC<ImageInsertProps> = ({ children, files, setFiles }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [imageWidth, setImageWidth] = useState<number | null>(null);
    const [imageHeight, setImageHeight] = useState<number | null>(null);

    useEffect(() => {
        console.log(`previewUrl updated: ${previewUrl}`);
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
            console.log(`previewUrl before update: ${previewUrl}`);
            setPreviewUrl(URL.createObjectURL(files[0]));
            console.log(`previewUrl after update: ${previewUrl}`);
            setPreviewUrl(URL.createObjectURL(files[0]));

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

    console.log(`Button rendered: ${previewUrl}`);

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
                        top={6}
                        right={1}
                        size="lg"
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
                    marginTop="5"
                    width={imageWidth ? `${imageWidth}px` : 'auto'}
                    height={imageHeight ? `${imageHeight}px` : 'auto'}
                >
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" style={{ width: '100%' }} />
                    ) : (
                        <>
                            <CiImageOn size="50px" />
                            Upload your image or video!
                            <CiYoutube size="50px" />
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
