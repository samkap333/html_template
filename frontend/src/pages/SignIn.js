import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../components/Authcontext';
import { Login } from '../services/api';

function SignIn() {
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let loginn;
      let type;
      if (emailOrPhoneNumber.includes('@')) {
        type = 'email';
        loginn = await Login({
          email: emailOrPhoneNumber,
          password,
        });
      } else {
        type = 'phone';
        loginn = await Login({
          phoneNumber: emailOrPhoneNumber,
          password,
        });
      }

      navigate('/dashboard');
      localStorage.setItem(`token`, loginn?.data?.token);
      console.log('user logged in', loginn.data);

      localStorage.setItem('loggedInUserId', loginn?.data?.user?._id);
      localStorage.setItem('loggedInUserRole', loginn?.data?.user?.userType);
      localStorage.setItem('Name', loginn?.data?.user?.name);

      login();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <main className="d-flex w-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">Welcome back</h1>
                <p className="lead">Sign in to your account to continue</p>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="m-sm-4">
                    <div className="text-center">
                      <img
                        src="adminkit/img/avatars/avatar.jpg"
                        alt="Charles Hall"
                        className="img-fluid rounded-circle"
                        width="132"
                        height="132"
                      />
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Email or Mobile number</label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          name="emailOrPhoneNumber"
                          placeholder="Enter your email or mobile number"
                          value={emailOrPhoneNumber}
                          onChange={(e) => setEmailOrPhoneNumber(e.target.value)}
                        />
                      </div>

                   


											<div className="mb-3">
												<label className="form-label">Password</label>
												<input
													className="form-control form-control-lg"
													type="password"
													name="password"
													placeholder="Enter your password"
													value={password}
													onChange={(e) => setPassword(e.target.value)}
												/>
												<small>
													<a onClick={() => navigate('/mobileverify')}>Forgot password?</a>
												</small>
											</div>
											{errorMessage && (
												<div className="alert alert-danger">{errorMessage}</div>
											)}
											<div>
												<label className="form-check">
													<input
														className="form-check-input"
														type="checkbox"
														value="remember-me"
														name="remember-me"
														checked
													/>
													<span className="form-check-label">Remember me next time</span>
												</label>
											</div>
											<div className="text-center mt-3">
												<button type="submit" className="btn btn-lg btn-primary">
													Sign in
												</button>


												<br></br>
												<br></br> Don't have account? <tab></tab><tab></tab>
												<a onClick={() => navigate('/register')} className="btn btn-lg btn-primary">Sign up</a>


											</div>
										</form>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default SignIn;