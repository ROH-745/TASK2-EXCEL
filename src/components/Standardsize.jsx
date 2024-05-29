import React from 'react'
import './Standard.css'

export default function Standardsize(props) {
  return (

      <div className="m-5">
      <h2 className='h2'>STANDARD SIZE TABLE</h2>
      <table className='table' style={{ borderCollapse: 'collapse', width: '100%' }} border="1">
        <thead>
          <tr>
            <th>no</th>
              <th>Sizes</th>
          </tr>
        </thead>
        <tbody>
          {props.standard.map((row, index) => (
            <tr key={index}>
              <td>{index +1}</td>
              <td>{row}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  )
}
