import React, { useEffect, useState } from 'react'
import ContractForm from './components/ContractForm';
import { Link } from 'react-router-dom';

const urlContracts = "http://localhost:3000/ugovori";

const ContractList = () => {

 const [data, setData] = useState(null);
 const [openForm, setOpenForm] = useState(false);

 const toggleForm = () => {
   setOpenForm(!openForm);
 };

  useEffect(() => {
    fetch(urlContracts)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const [options, setOptions] = useState([]);

  const handleChange = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setOptions(value);
  };

  const getFilteredItems = () => {
    if (options.length === 0) 
        return data;
    if(options.includes('Svi')) 
        return data;

    return data.filter(d => options.includes(d.status));
  };

  //console.log(getFilteredItems());

  const addContract = (contract) => {
    setData((prevState) => [...prevState, contract]);
  };

  return (
    <>
    <h1>Kupoprodajni ugovori</h1>
    <div>
        <button onClick={toggleForm} style={{marginBottom:'50px'}}>
        {openForm ? 'Zatvori formu' : 'Kreiraj ugovor'}
        </button>

    {openForm && (
        <div style={{ position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'grey', color:'white', padding: '20px', borderRadius: '10px' }}>
        <ContractForm addContract={addContract}/>
        </div>
    )}
</div>
    <div>
    {options && <p>Filter</p>}
      <select multiple={true} value={options} onChange={handleChange}>
        <option value="Svi">Svi kupci</option>
        <option value="KREIRANO">KREIRANO</option>
        <option value="ISPORUČENO">ISPORUČENO</option>
        <option value="NARUČENO">NARUČENO</option>
      </select>
    </div>
    <table>
    <thead>
        <tr>
          <th>Kupac</th>
          <th>Broj ugovora</th>
          <th>Rok isporuke</th>
          <th>Status</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {getFilteredItems() && getFilteredItems().map(d => (
          <tr key={d.id} className='table-row'>
            <td>{d.kupac}</td>
            <td>{d.broj_ugovora}</td>
            <td>{d.rok_isporuke}</td>
            <td style={{ color: d.status === 'KREIRANO' ? 'green' : d.status === "ISPORUČENO" ? 'grey' : 'yellow'}}>{d.status}</td>
            <td><Link to={`/ugovori/${d.id}`}>Detalji</Link></td>
            <td><Link to={`/edit/${d.id}`}>Uredi</Link></td>
          </tr>
        ))}
      </tbody>
      </table>
    </>
  )
}

export default ContractList;