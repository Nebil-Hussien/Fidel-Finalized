import { Check, Close } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "../Button/Button";

const Upload = ({ fileType, onSubmit, isUploading, cleanFile }) => {
  let accept =
    fileType === "document"
      ? "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint ,text/plain, application/pdf"
      : "image/png, image/jpg, image/jpeg";

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const inputRef = useRef();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: accept,

    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!file && fileType === "document") {
      setPreviewUrl(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }, [file, fileType, cleanFile]);
  return (
    <div className="upload" {...getRootProps()}>
      <input
        {...getInputProps()}
        accept={accept}
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="upload__filecontainer">
        <div
          onClick={file ? () => {} : () => inputRef.current.click()}
          className="upload__filecontainer-choose"
          style={{
            borderWidth: isDragActive && 2,
            cursor: file ? "unset" : "pointer",
          }}
        >
          {file ? (
            fileType === "document" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p className="paragraph">{file.name}</p>
                <p
                  onClick={() => setFile(null)}
                  className="paragraph link danger"
                >
                  cancel
                </p>
              </div>
            ) : (
              <div className="upload__filecontainer-file">
                <Close
                  onClick={() => {
                    setFile(null);
                  }}
                  className="upload__filecontainer-file--close"
                />
                <img src={previewUrl} alt="img" />
              </div>
            )
          ) : (
            <>
              <p>
                {isDragActive ? "Drop now" : `Click here or drag ${fileType}`}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="upload__button">
        <Button
          disabled={!file || isUploading}
          loading={isUploading}
          onClick={() => onSubmit(file)}
        >
          <Check className="btn__icon small" />
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Upload;
