import React from 'react';
import firebase from '../authentication/firebase';

const ForgotwithEmail = () => {

  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleReset = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h1>Reset your password</h1>
      {!success ? (
        <form onSubmit={handleReset}>
          {error && <div>{error}</div>}
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <button type="submit">Reset</button>
        </form>
      ) : (
        <div>
          <p>
            Password reset email has been sent to {email}. Please follow the instructions in the email to reset your password.
          </p>
          <p>Go back to <a href="/">login</a> page.</p>
        </div>
      )}
    </div>
  );
};

export default ForgotwithEmail;
