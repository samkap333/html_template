import React, { useState } from 'react';

import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteLoanoffer, updateLoanInfo } from "../services/api";
import {DeleteConfirm} from './DeleteConfirm.js'

function SingleList(props) {
  const { offer , setOffers } = props;
  
  const [isEdit, setIsEdit] = useState(false);
  const [amount, setAmount] = useState(offer.amount);
  const [period, setPeriod] = useState(offer.period);
  const [interest, setInterest] = useState(offer.interest);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteOffer = async (offerId) => {
    try {
      await deleteLoanoffer(offerId);
      setOffers((prevOffers) =>
        prevOffers.filter((obj) => obj._id !== offerId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const saveHandler = async () => {
    try {
      await updateLoanInfo(offer._id, { amount, period, interest });
      setIsEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <tr key={offer._id}>
        <td>
          {isEdit ? (
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          ) : (
            amount
          )}
        </td>
        <td>
          {isEdit ? (
            <input
              type="number"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            />
          ) : (
            period
          )}
        </td>
        <td>
          {isEdit ? (
            <input
              type="number"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
          ) : (
            interest
          )}
        </td>
        <td>
          {isEdit ? (
            <button onClick={saveHandler}>Save</button>
          ) : (
            <>
              <FaEdit
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={() => setIsEdit(true)}
              />
              <FaTrash
                style={{ cursor: "pointer" }}
                onClick={() => setIsDeleteModalOpen(true)}
              />
              <DeleteConfirm
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => {
                  setIsDeleteModalOpen(false);
                  handleDeleteOffer(offer._id);
                }}
              />
            </>
          )}
        </td>
      </tr>
    </>
  );
}

export default SingleList;
