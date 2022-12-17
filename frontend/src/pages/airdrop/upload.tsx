import { useEffect, useState } from "react"
import AppBody from "src/components/share/app/AppBody"
import PageBox from "src/components/airdrop/pageBox"
import { Flex, VStack, Button, Text, useToast } from "@chakra-ui/react"
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react"
import { HiUpload } from "react-icons/hi"
import API from "src/function/API"
import { useNavigate } from "react-router-dom"

export default function upload(){

    const navigate = useNavigate();
    const [queryDecode, setQueryDecode] = useState<string>("")
    const [typeDecode, setTypeDecode] = useState<string>("")
    const [idDecode, setIdDecode] = useState<string>("")
    const toast = useToast()
    const [postData,setPostData]  = useState<any>({})
    const [imageSrc, setImageSrc] = useState<any>(null)
    const [files, setFiles] = useState([])
    const handleDelete = (prop: any) => {
        setFiles(files.filter((item) => item !== prop))
    }
    const updateFile = (file: any) => {
        setFiles(file)
    }
    const handleSee = (imageSource: any) => {
        setImageSrc(imageSource)
    }
    const handleUpload = async() => {
        const fd = new FormData()
        fd.append("type", typeDecode)
        fd.append("id", idDecode)
        files.map((item: any) => {
            fd.append("upload", item.file)
        }
        ) 
        const res = await API.post("/airdrop/file/uploadother", fd, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            toast({
                title: "Upload success",
                description: "Your file has been uploaded",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            if(typeDecode == "shortnote"){
                navigate("../../shortnote/"+idDecode)
            }else if(typeDecode == "community"){
                navigate("../../groups/id/"+idDecode)
            }
        }).catch((err) => {
            toast({
                title: "Upload failed",
                description: "Something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        })
    }
    useEffect(() => {
        // dHlwZT1zaG9ydG5vdGUmaWQ9MTIzMTIzMTIz
        if(window.location.href.split("?")[1] !== undefined){
            setQueryDecode(atob(window.location.href.split("?")[1]))
        }
    }, [])
    useEffect(()=>{
        if(queryDecode !== ""){
            setTypeDecode(queryDecode.split("&")[0].split("=")[1])
            setIdDecode(queryDecode.split("&")[1].split("=")[1])
        }
    },[queryDecode])
    return (
        <AppBody>
            <PageBox pageName="drop">
                <Flex flexDirection={"column"} alignItems={"center"} alignContent={"center"} w={"80%"}>
                    <>
                        <VStack w={"full"} spacing={"5%"}>
                            <Dropzone onChange={updateFile} value={files} style={{ borderRadius: "20px", padding: "10%" }}>
                                {files &&
                                    files?.map((file: any, key) => (
                                        <FileItem
                                            {...file}
                                            preview
                                            onDelete={() => {
                                                handleDelete(file)
                                            }}
                                            hd
                                            resultOnTooltip
                                            onSee={handleSee}
                                            id={key}
                                            key={key}
                                        />
                                    ))}
                                {files.length == 0 ? (
                                    <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                                        <HiUpload fontSize={"84px"} />
                                        <Text fontSize={"2xl"}>Drop the file</Text>
                                        <Text fontSize={"md"}>Maximum file size can be up to 200MB</Text>
                                    </Flex>
                                ) : null}
                            </Dropzone>
                            <FullScreenPreview imgSource={imageSrc} openImage={imageSrc} onClose={() => handleSee(undefined)} />

                            <Button
                                colorScheme={"orange"}
                                rounded={"3xl"}
                                px={14}
                                py={[3, 6]}
                                shadow={"xl"}
                                onClick={async () => {
                                    if (files.length == 0) {
                                        alert("Please select file")
                                    } else {
                                        handleUpload()
                                    }
                                }}
                            >
                                Upload
                            </Button>
                        </VStack>
                    </>
                </Flex>
            </PageBox>
        </AppBody>
    )
}
