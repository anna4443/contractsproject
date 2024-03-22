import React, { useEffect, useRef, useState } from 'react'

const ContractsUrl = "http://localhost:3000/ugovori";

const ContractForm = ({addContract}) => {
    
    const [contracts, setContracts] = useState([]);
    const contractFormRef = useRef();

    useEffect(() => {
        fetch(ContractsUrl)
          .then(response => response.json())
          .then(data => setContracts(data))
          .catch(error => console.error('Error:', error));
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        //console.log(formData);  
        
        const contract = Object.fromEntries(formData);
        //console.log(contract);

        const newContract = {
            id: contracts.length > 0 ? String(Math.max(...contracts.map(item => item.id)) + 1) : "1",
            ...contract
        };
        console.log(newContract);

        const response = await fetch('http://localhost:3000/ugovori', {
                        method: 'POST',
                        headers: {
                                    'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newContract),
         });

        if (response.ok) {
            console.log('Success:', await response.json());
            setContracts([...contracts, newContract]);
            addContract(newContract);
        } 
        else {
        console.log('Error:', response.status);
        }
        
        //e.currentTarget.reset();
        contractFormRef.current.reset();
    }

  return (
    <>
     <h2>Form</h2>
          <form ref={contractFormRef} className='form' onSubmit={handleSubmit}>
            <div className='row'>
            <label htmlFor='kupac'>
              Kupac: 
            </label>
            <input type="text" name="kupac" id='kupac' required/>
            </div>
            <div className='row'>
            <label htmlFor='broj_ugovora'>
              Broj ugovora: 
            </label>
            <input type="text" name="broj_ugovora" id='broj_ugovora' required/>
            </div>
            <div className='row'>
            <label htmlFor='datum_akontacije'>
              Datum akontacije: 
            </label>
            <input type="date" name="datum_akontacije" id='datum_akontacije' required/>
            </div>
            <div className='row'>
            <label htmlFor='rok_isporuke'>
              Rok isporuke: 
            </label>
            <input type="date" name="rok_isporuke" id='rok_isporuke' required/>
            </div>
            <div className='row'>
            <label htmlFor='status'>
              Status: 
            </label>
            <input type="text" name="status" id='status' value='KREIRANO' readOnly/>
            </div>
            <input type="submit" value="Submit" />
          </form>
    </>
  )
}

export default ContractForm