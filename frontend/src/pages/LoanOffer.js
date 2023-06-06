import { useState, useEffect } from "react";

import React from 'react';
import {loanInfo} from '../services/api'
import AddModal from "./AddModal";
import SingleList from "./SingleList";

import { useAuth } from '../components/Authcontext';

function LoanOffer() {
  
  const [offers, setOffers] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false); 
  
  

  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('token');




  useEffect(() => {
    
    if (isAuthenticated) {
      
        loanInfo()
        .then(data => {

          setOffers(data.data)
        })
        .catch(error => console.error(error));
    }
  }, [isAuthenticated, setOffers, token , modalIsOpen]);




  function openModal() {
    setIsOpen(true);
  }


  return (
    <>
    
    <>
      { modalIsOpen && <AddModal 
        modalIsOpen={modalIsOpen} 
        setIsOpen={setIsOpen}
      /> }
    
      <div style={{ position: "relative" }}>
        <button style={{ position: "absolute", top: 0, right: 0 }} onClick={openModal}>
          + Add Loan Offer
        </button>
        
        <h1 style={{ fontWeight: "bold", color: "grey", margin: "20px" }}>
          Create Offers
        </h1>

        <table className="table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Period</th>
              <th>Interest</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {offers.map((offer) => (
            
            <SingleList offer={offer}
            offers={offers}
            setOffers={setOffers}/>
            
          ))}

          </tbody>
        </table>
        <br />
        <br />
        <button onClick={openModal}>+ Add Loan Offer</button>
      </div>
    </>
  </>
   

  );
}

export default LoanOffer;


