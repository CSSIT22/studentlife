import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonProps, ComponentWithAs, Icon, IconButton, Input, useDisclosure, } from "@chakra-ui/react"
import React, { FC, useEffect, useRef, useState } from "react"
import { CiImageOn, CiYoutube } from "react-icons/ci"

type ImageInsertProps = {
    children: React.ReactNode;
    files: File | null;
    setFiles: (files: File | null) => void;
    // fileinsert: (value: number) => void;
};

const FileUpload: FC<ImageInsertProps> = ({ children, files, setFiles }) => {
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
                setImageWidth(img.naturalWidth * 0.45); // multiply by 0.5 to account for the 50% width of the image
                setImageHeight(img.naturalHeight * 0.45); // multiply by 0.5 to account for the 50% width of the image
            };
        }
    }, [previewUrl]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (event.target.files) {
            setFiles(event.target.files[0]);
            console.log(`previewUrl before update: ${previewUrl}`);
            setPreviewUrl(URL.createObjectURL(event.target.files[0]));
            console.log(`previewUrl after update: ${previewUrl}`);
            setPreviewUrl(URL.createObjectURL(event.target.files[0]));

            const file = event.target.files[0];
            if (file.type.startsWith('image/')) {
                setPreviewUrl(URL.createObjectURL(file));
            } else if (file.type.startsWith('video/')) {
                // create a video element to get the first frame of the video as preview
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                video.addEventListener('loadeddata', function () {
                    // get the first frame of the video as canvas
                    const canvas = document.createElement('canvas');
                    canvas.height = video.videoHeight * 1.5;
                    canvas.width = video.videoWidth * 1.5;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    }
                    // get the data URL of the canvas as preview
                    setPreviewUrl(canvas.toDataURL());
                });
            }

            console.log(`previewUrl after update: ${previewUrl}`);
            setPreviewUrl(URL.createObjectURL(event.target.files[0]));

            const image = new Image();
            image.src = URL.createObjectURL(event.target.files[0]);

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
                    position="relative"
                >
                    {previewUrl ? (
                        <>
                            {files?.type.startsWith('video/') && (
                                <Box position="absolute" top={"container.lg"} left={"container.lg"}>Your video was successfully uploaded!</Box>
                            )}
                            <img src={previewUrl} alt="Preview" style={{ width: '100%' }} />
                        </>
                    ) : (
                        <>
                            <CiImageOn size="50px" />
                            Upload your image or video!
                            <CiYoutube size="50px" />
                        </>
                    )}
                    <input
                        type="file"
                        accept="image/jpg,image/jpeg,image/png,video/mp4"
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


export default FileUpload
