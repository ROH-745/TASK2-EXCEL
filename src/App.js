import "./App.css";
import { useState } from "react";
import * as XLSX from "xlsx";
import Examples from "./components/Examples";
import Testing from "./components/Testing";
import Standardsize from "./components/Standardsize";
import Output from "./components/Output";

function App() {
  const [excelData, setExcelData] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const [standard, setStandard] = useState([]);
  console.log(standard);

  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = (event) => {
  //     const data = new Uint8Array(event.target.result);
  //     const workbook = XLSX.read(data, { type: 'array' });

  //     // Assuming first sheet for simplicity, change as needed
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];

  //     // Parse data
  //     const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  //     // Update state with parsed data
  //     setExcelData(parsedData);

  //   };
  //   reader.readAsArrayBuffer(file);
  // }

  const handleFileChange = (event) => {
    // Get the file from the event object

    const file = event.target.files[0];
    // Update the state with the selected file
    // intialize the filereader
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = function (e) {
      // The file's text will be printed here

      const binarydata = e.target.result;
      const workbook = XLSX.read(binarydata, { type: "binary" });
      console.log(workbook);

      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      let jsonDataCopy = [...jsonData]
      let dd=[...jsonData[3]]
      let size = dd.reverse()
      setStandard(size);
      setExcelData(jsonData);
    };
  };

  return (
    <div className="App">
      {/* <h3 className="text-center mt-4 mb-3">Prepare a Excel parser to list all items reading this table and store the data in the table</h3> */}
      <div className=" className='m-5'">
        <h2 className="text-center text-primary">BRANCH</h2>

        <div className="branch m-5">
          <input
            className="btn btn-dark mt-3 input"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
          {excelData.map((row, index) => {
            let previouscellindex = -1;
            return (
              <tr key={index}>
                {row.map((cell, cellIndex) => {
                  let isEmpty = cellIndex - previouscellindex >= 2;
                  let emtycount = cellIndex - previouscellindex - 1;
                  previouscellindex = cellIndex;

                  return isEmpty ? (
                    <>
                      {new Array(emtycount).fill(0).map((item) => (
                        <td key={cellIndex}>{"empty"}</td>
                      ))}
                      <td key={cellIndex}>{cell}</td>
                    </>
                  ) : (
                    <td key={cellIndex}>{cell}</td>
                  );
                })}
              </tr>
            );
          })}
        </div>
      </div>

      <br />
      <br />
      <Examples></Examples>
     
      <Standardsize standard={standard} />
      <Testing standard={standard} excelData={excelData}></Testing>
      
    </div>
  );
}

export default App;
