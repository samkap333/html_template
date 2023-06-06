
import React from 'react';
import Modal from 'react-modal';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addLoanoffer } from '../services/api'

export default function AddModal(props) {

  const { modalIsOpen, setIsOpen } = props
  const [formData, setFormData] = React.useState({
    amount: '',
    period: '',
    interest: '',
  });



  function closeModal() {
    setIsOpen(false);
  }
  function handleSubmit(event) {
    event.preventDefault();
    addLoanoffer(formData).then(() => {
      console.log('Loan offer added successfully');
      closeModal();
    });
  }



  return (



    <>
      <Modal
        isOpen={modalIsOpen}
        className="custom-modal"

      >

        <h2>Add Loan Offers</h2>
        <div className="close-icon" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="amount">Amount</label>
          <br></br><br></br>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter Amount"
            required
            pattern="[0-9]+"
            value={formData.amount}
            onChange={(event) =>
              setFormData({ ...formData, amount: event.target.value })
            }
          />
          <br></br><br></br>

          <label htmlFor="period">Period</label>
          <br></br><br></br>

          <input
            type="number"
            id="period"
            name="period"
            placeholder="Enter Period"
            required
            pattern="[0-9]+"
            value={formData.period}
            onChange={(event) =>
              setFormData({ ...formData, period: event.target.value })
            }
          />
          <br></br><br></br>
          <label htmlFor="interest">Interest</label><br></br><br></br>
          <input
            type="number"
            id="interest"
            name="interest"
            placeholder="Enter Interest"
            required
            pattern="[0-9]+"
            value={formData.interest}
         
            onChange={(event) =>
              setFormData({ ...formData, interest: event.target.value })
            }
          />
          <br></br>
          <br></br>
          <button type="submit" className="center-button" style={{ width: '150px' }}>Add Now</button>
        </form>
      </Modal>

    </>
  );
} 