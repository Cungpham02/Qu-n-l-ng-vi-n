import React, { useState } from "react";
import ReactFileReader from "react-file-reader";
function ReadDocX() {
  const handleFiles = (files) => {
    console.log(files.base64);
  };
  return (
    <ReactFileReader
      fileTypes={[".csv", ".docx"]}
      base64={true}
      multipleFiles={true}
      handleFiles={handleFiles}
    >
      <button className="btn">Upload</button>
    </ReactFileReader>
  );
}

export default ReadDocX;
