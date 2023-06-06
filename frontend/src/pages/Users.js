import { useState, useEffect } from "react";

import React from 'react';
import {userInfo} from '../services/api'
import UserModal from "./UserModal";
import UserList from "./UserList";

import { useAuth } from '../components/Authcontext';

function Users() {
  const [users, setUsers] = useState([]);
  const [popupIsOpen, setpopupIsOpen] = useState(false); 
  
  

  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem('token');




  useEffect(() => {
    
    if (isAuthenticated) {
      
        userInfo()
        .then(data => {

          setUsers(data.data)
        })
        .catch(error => console.error(error));
    }
  }, [isAuthenticated, setUsers, token , popupIsOpen]);




  function openModal() {
    setpopupIsOpen(true);
  }


  return (
    <>
      { popupIsOpen && <UserModal 
        popupIsOpen={popupIsOpen} 
        setpopupIsOpen={setpopupIsOpen}
      /> }
    
      <div style={{ position: "relative" }}>
        <button style={{ position: "absolute", top: 0, right: 0 }} onClick={openModal}>
          + Add Users
        </button>
        
        <h1 style={{ fontWeight: "bold", color: "grey", margin: "20px" }}>
          Add Users
        </h1>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>E-mail</th>
            
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => (
            
            <UserList user={user}
            users={users}
            setUsers={setUsers}/>
            
          ))}

          </tbody>
        </table>
       
      </div>
    </>
  );
}

export default Users;


