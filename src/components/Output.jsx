import React, { useState, useEffect } from "react";
import "./Output.css";

function Output({ excelData, convertedData }) {
  const [outputdata, setOutputData] = useState([]);

  useEffect(() => {
    if (excelData.length > 0 && convertedData.length > 0) {
      let data = combineData(excelData, convertedData);
      setOutputData(data);
    }
  }, [excelData, convertedData]);

  function combineData(excelData, convertedData) {
    let data = excelData[3];
    const index = createIndexMap(data);
    let output = [];
    for (let i = 0; i < convertedData.length; i++) {
      let item = convertedData[i];

      if (itemDescription[item.item_type] == undefined) {
        output.push(item);
      } else {
        let key = itemDescription[item.item_type];
        let size1 = item.size1;
        let index_of_size1 = index[size1];

        for (let j = 4; j <= excelData.length - 3; j++) {
          let have_key = false;
          let size2 = undefined;
          let branchdata = excelData[j];
          //if key ==wl ? size2=size1
          if (key == "TR") {
            debugger;
          }

          if (
            branchdata.length >= index_of_size1 &&
            branchdata[index_of_size1] !== undefined &&
            branchdata[index_of_size1] == key
          ) {
            have_key = true;
            size2 = branchdata[1];
            let newItem = {
              ...item,
              size2,
            };

            output.push(newItem);
          }
        }
      }
    }

    return output;
  }

  let itemDescription = {
    WELDOLET: "WOL",
    THREADOLET: "TR",
    "STRAIGHT TEE": "WT",
    "REDUCING TEE": "WRT",
    "REINFORCED NIPOFLANGE": "WOF",
  };

  function createIndexMap(arr) {
    let indexMap = {};
    // Iterate over the array
    arr.forEach((element, index) => {
      // Only add entries for defined elements
      if (element !== undefined) {
        indexMap[element] = index;
      }
    });
    return indexMap;
  }

  return (
    <div className="m-5">
      <h1 className="h2">COMBINED OUTPUT</h1>
      <table className="table">
        <thead>
          <tr>
            <th>No:</th>
            <th>SIZE 1</th>
            <th>SIZE 2</th>
            <th>ITEM TYPE</th>
            <th>Geometric Standard</th>
            <th>EDS/VDS</th>
            <th>End Conn1</th>
            <th>End Conn2</th>
            <th>Material Descr.</th>
          </tr>
        </thead>
        <tbody>
          {outputdata?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item["size1"]}</td>
              <td>{item["size2"]}</td>
              <td>{item["item_type"]}</td>
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
  );
}

export default Output;
