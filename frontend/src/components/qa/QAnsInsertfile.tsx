import { useState } from "react"
import { Dropzone, FileItem } from "@dropzone-ui/react"

function QAnsInsertfile() {
    const [files, setFiles] = useState<any>([])
    const updateFiles = (incomingFiles: any) => {
        setFiles(incomingFiles)
    }

    return (
        <Dropzone onChange={updateFiles} value={files} maxFileSize={2097152} accept={".jpg, .pdf, .zip, .png, .jpeg"}>
            {files.map((file: any) => (
                <FileItem {...file} preview />
            ))}
        </Dropzone>
    )
}

export default QAnsInsertfile
