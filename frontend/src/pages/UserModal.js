
import React from 'react';
import Modal from 'react-modal';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { registration } from '../services/api'

export default function UserModal(props) {

  const { popupIsOpen, setpopupIsOpen } = props
  const [formData, setFormData] = React.useState({
    name: '',
    age: '',
    phoneNumber: '',
    email: '',
    password:'',
    userType:'user'
  });



  function closeModal() {
    setpopupIsOpen(false);
  }
  function handleSubmit(event) {
    event.preventDefault();
    registration(formData,formData.userType).then(() => {
      console.log('User added successfully');
      closeModal();
    }).catch(error => {
      console.log('Error registering user: ', error);
      if (error.response && error.response.data) {
        console.log('Server error:', error.response.data);
      } else {
        console.log('Network error:', error.message);
      }
    });
  }



  return (



    <>
      <Modal
        isOpen={popupIsOpen}
        className="custom-modal"

      >

        <h2>Add New User</h2>
        <div className="close-icon" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name"> Name</label>
          <br></br><br></br>
          <input
            type="String"
            id="name"
            name="name"
            placeholder="Enter Name"
            required
            pattern="[A-Za-z]+"
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
          />
          <br></br><br></br>

          <label htmlFor="gender">Gender</label>
          <br></br><br></br>

          <input
            type="String"
            id="gender"
            name="gender"
            placeholder="Enter gender"
            value={formData.gender}
            onChange={(event) =>
              setFormData({ ...formData, gender: event.target.value })
            }
          />
          <br></br><br></br>
          <label htmlFor="phoneNumber">Phone Number</label>
          <br></br><br></br>

          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            
            value={formData.phoneNumber}
            onChange={(event) =>
              setFormData({ ...formData, phoneNumber: event.target.value })
            }
          />
           <br></br><br></br>
          <label htmlFor="email">E-mail</label><br></br><br></br>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter E-mail"
            required
            pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            value={formData.interest}
         
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
            }
          />
          <br></br>
          <br></br>
          <label htmlFor="password">Set Password</label><br></br><br></br>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            minLength="8"
            required
            pattern="(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
           
            value={formData.password}
         
            onChange={(event) =>
              setFormData({ ...formData, password: event.target.value })
            }
          />
            <br></br><br></br>
          <button type="submit" className="center-button" style={{ width: '150px' }} >Add User</button>
        </form>
      </Modal>

    </>
  );
} 