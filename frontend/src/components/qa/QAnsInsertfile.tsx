import * as React from "react";
import ReactDOM from "react-dom";
import { Dropzone, FileItem } from "@dropzone-ui/react";
function QAnsInsertfile () {
  const [files, setFiles] = React.useState<any>([]);
  const updateFiles = (incommingFiles:any) => {
    setFiles(incommingFiles);
  };
  return (
    <Dropzone onChange={updateFiles} value={files}>
      {files.map((file:any) => (
        <FileItem {...file} preview />
      ))}
    </Dropzone>
  );
}
 
export default QAnsInsertfile
