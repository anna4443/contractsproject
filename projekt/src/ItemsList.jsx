import React, { useEffect, useState } from 'react'

const urlItems = "http://localhost:3000/artikli";
const ItemsList = () => {

    const [items, setItems] = useState(null);

    useEffect(() => {
        fetch(urlItems)
        .then(response => response.json())
        .then(data => {
        console.log(data); 
         setItems(data);
        })
        .catch(error => console.error('Error:', error));
      }, []);

    if (!items) {
        return <div>Loading...</div>;
    }

  return (
   <>
   <h2>Artikli</h2>
<table>
    <thead>
        <tr>
          <th>Naziv</th>
          <th>Dobavljač</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {items.map((d, i) => (
          <tr key={i} className='table-row'>
            <td>{d.naziv}</td>
            <td>{d.dobavljač}</td>
            <td style={{ color: d.status === 'KREIRANO' ? 'green' : d.status === "ISPORUČENO" ? 'grey' : 'yellow'}}>{d.status}</td>
          </tr>
        ))}
      </tbody>
      </table>
   </>
  )
}

export default ItemsList