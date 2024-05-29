import React from "react";
import { useState } from "react";
import * as XLSX from "xlsx";
import Output from "./Output";

function Testing({ standard,excelData }) {
  console.log(excelData);
  const [convertedData, setConvertedData] = useState([]);
  // const [toggle,setToggle] = useState(true)

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet);

      const converted = convertData(excelData);
      
      setConvertedData(converted);
    };

    reader.readAsArrayBuffer(file);
  };

  const convertData = (data) => {
    const converted = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      console.log(item);
      var toggle = true;
      // find range 0.5-2 => 5
      let from = item.FROM
      let to = item.TO


      const countSizeRange = (from, to) => {
        // Ensure `from` is less than or equal to `to`
        const start = Math.min(from, to);
        const end = Math.max(from, to);
        let s=null
        // Filter the sizes and return the count
        const filteredSizesCount = standard.filter((size, index) => {

        //standerd size [0.5,0.75,1,2,4,5,8,12,24] 
          if (size >= start && size <= end) {
            if (s == null) {
              s=index
            }
            return true
          }
        }).length;
        
        return {
          range: filteredSizesCount,
          start:s
        };
      };
      const sizeCount = countSizeRange(from, to);
      
      const start=sizeCount.start
      
      //standerd size [0.5,0.75,1,2,4,5,8,12,24] //3
      for (let j = start + 0; j < start + sizeCount.range; j++) {
    
        const size1 = standard[j]
        
        const newItem = {
          item_type: item["ITEM TYPE"],
          size1,//2
          p1: item["GEOMETRIC STANDARD"],
          p2: item["EDS/VDS"],
          p3: item["END CONN1"],
          p4: item["END CONN2"],
          p5: item["MATERIAL DESCR."],
        };
        converted.push(newItem);
        toggle = false;
      }
    }
    return converted;
  };

  return (
    <div>
      <h2 className="text-center text-primary">SPEC OUTPUT</h2>
      <div className="m-5">
        <input
          className="btn btn-dark"
          type="file"
          onChange={handleFileUpload}
        />
        <table className="table">
          <thead>
            <tr>
              <th>No:</th>
              <th>Item Type</th>
              <th>Size 1</th>
              <th>Geometric Standard</th>
              <th>EDS/VDS</th>
              <th>End Conn1</th>
              <th>End Conn2</th>
              <th>Material Descr.</th>
            </tr>


          </thead>
          <tbody>
            {convertedData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item["item_type"]}</td>
                <td>{item["size1"]}</td>
                <td>{item["p1"]}</td>
                <td>{item["p2"]}</td>
                <td>{item["p3"]}</td>
                <td>{item["p4"]}</td>
                <td>{item["p5"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Output excelData={excelData} convertedData={convertedData} />
    </div>
  );
}

export default Testing;
