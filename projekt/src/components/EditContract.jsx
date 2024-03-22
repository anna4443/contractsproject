import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const EditContract = () => {

    const {id} = useParams();
    const [editedContract, setEditedContract] = useState(null);
    const [selectedStatus, setStatus] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3000/ugovori/${id}`)
          .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
            console.log(response);
            return response.json();
          })
          .then(data => {
            if (data) {
                setEditedContract(data);
              } else {
                console.log('There is no data');
              }
            })
          .catch(error => console.error('Error:', error));
      }, [id]);

      const handleOnChange = (e) => {
        setEditedContract(prevState => ({
            ...prevState,
            rok_isporuke: e.target.value
          }));
      }

      const handleChange = (e) => {
            //console.log(e.target.value);
            setEditedContract(prevState => ({
                ...prevState,
                status: e.target.value
              }));
      }

      //console.log(editedContract);

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(editedContract);
        fetch(`http://localhost:3000/ugovori/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editedContract),
        })
      }   

  return (
    <div>
       <h2>Uređivanje ugovora</h2> 
       <Link to="/">Natrag</Link>
       {editedContract && 
        <form className='edit-form' onSubmit={handleSubmit}>
        <div className='row'>
        <label htmlFor='kupac'>
          Kupac: 
        </label>
            {editedContract.kupac}
        </div>
        <div className='row'>
        <label htmlFor='broj_ugovora'>
          Broj ugovora: 
        </label>
           {editedContract.broj_ugovora}
        </div>
        <div className='row'>
        <label htmlFor='datum_akontacije'>
          Datum akontacije: 
        </label>
            {editedContract.datum_akontacije}
        </div>
        <div className='row'>
        <label htmlFor='rok_isporuke'>
          Rok isporuke: 
        </label>
        <input type="date" name="rok_isporuke" id='rok_isporuke' value={editedContract.rok_isporuke} onChange={handleOnChange}/>
        </div>
        <div className='row'>
        <label htmlFor='status'>
          Status: 
        </label>
         <span>{editedContract.status}</span>
        </div>
        <div className='row'>
            <label>Promijeni status:</label>
            <select value={selectedStatus} onChange={handleChange}>
                <option>Status</option>
                {editedContract.status === 'KREIRANO' ?  <option value="NARUČENO">NARUČENO</option> : editedContract.status === 'NARUČENO' ? <option value="ISPORUČENO">ISPORUČENO</option> : <option value="ISPORUČENO">ISPORUČENO</option>}
            </select>
        </div>
        <input type="submit" value="Submit" />
      </form>}
    </div>
  )
}

export default EditContract