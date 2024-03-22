import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ItemsList from '../ItemsList';

const ContractDetails = () => {

    const { id } = useParams();
    const [contract, setContract] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/ugovori/${id}`)
          .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
            //console.log(response);
            return response.json();
          })
          .then(data => {
            if (data) {
                setContract(data);
              } else {
                console.log('There is no data');
              }
            })
          .catch(error => console.error('Error:', error));
      }, [id]);

      //console.log(contract);

    return (
        <div>
            <h2>Detalji</h2>
            {contract &&   
            <table>
            <thead>
               <tr>
               <th>Kupac</th>
               <th>Broj ugovora</th>
               <th>Datum akontacije</th>
               <th>Rok isporuke</th>
               <th>Status</th>
               </tr>
           </thead>
           <tbody>
               <tr>
                   <td>{contract.kupac}</td>
                   <td>{contract.broj_ugovora}</td>
                   <td>{contract.datum_akontacije}</td>
                   <td>{contract.rok_isporuke}</td>
                   <td style={{ color: contract.status === 'KREIRANO' ? 'green' : contract.status === "ISPORUČENO" ? 'grey' : 'yellow'}}>{contract.status}</td>
               </tr>
            </tbody>
           </table>}

           {id === "1"  && <ItemsList/>}
        </div>
    );
}

export default ContractDetails