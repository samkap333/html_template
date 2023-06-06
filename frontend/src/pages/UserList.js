import React, { useState } from 'react';

import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteUser, updateUserInfo } from "../services/api";
import {DeleteConfirm} from './DeleteConfirm.js'

function SingleList(props) {
  const { user , setUsers } = props;
  
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState(user.gender);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [email, setEmail] = useState(user.email);
 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) =>
        prevUsers.filter((obj) => obj._id !== userId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const saveHandler = async () => {
    try {
      await updateUserInfo(user._id, { name, gender, phoneNumber,email});
      setIsEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <tr key={user._id}>
        <td>
          {isEdit ? (
            <input
              type="String"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            name
          )}
        </td>
        <td>
          {isEdit ? (
            <input
              type="String"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          ) : (
            gender
          )}
        </td>
        <td>
          {isEdit ? (
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          ) : (
            phoneNumber
          )}
        </td>
        <td>
        {isEdit ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            email
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
                  handleDeleteUser(user._id);
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
