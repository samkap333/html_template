import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registration } from '../services/api';

function SignUp() {
	
	const [formData, setFormData] = useState({
		name: '',
		phoneNumber: '',
		gender: '',
		email: '',
		password: '',
		userType: 'admin'
		
	});

	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			
			
			
			const response = await registration(formData,formData.userType);
			
			console.log(response);
			
			navigate('/login'); 
			console.log("Your email is registered")
		} catch (error) {
			console.log('Some issue while signup - ',error.response);
		}
		setIsSubmitting(false);
	};
	return (
		<main className="d-flex w-100">
			<div className="container d-flex flex-column">
				<div className="row vh-100">
					<div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
						<div className="d-table-cell align-middle">

							<div className="text-center mt-4">
								<h1 className="h2">Get started</h1>
								<p className="lead">
									Start creating the best possible user experience for you customers.
								</p>
							</div>

							<div className="card">
								<div className="card-body">
									<div className="m-sm-4">
										<form onSubmit={handleSubmit}>
											<div className="mb-3">
												<label htmlFor="name" className="form-label">Name</label>
												<input
													type="text"
													className="form-control"
													id="name"
													name="name"
													value={formData.name}
													onChange={handleInputChange}
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="phoneNumber" className="form-label">Phone Number</label>
												<input
													type="number"
													className="form-control"
													id="phoneNumber"
													name="phoneNumber"
													value={formData.phoneNumber}
													onChange={handleInputChange}
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="gender" className="form-label">Gender</label>
												<input
													type="text"
													className="form-control"
													id="gender"
													name="gender"
													value={formData.gender}
													onChange={handleInputChange}
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="email" className="form-label">Email address</label>
												<input
													type="email"
													className="form-control"
													id="email"
													name="email"
													value={formData.email}
													onChange={handleInputChange}
												/>
											</div>
											<div className="mb-3">
												<label htmlFor="password" className="form-label">Password</label>
												<input
													type="password"
													className="form-control"
													id="password"
													name="password"
													value={formData.password}
													onChange={handleInputChange}
												/>
											</div>
											<div className="text-center mt-3">
												<button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
													{isSubmitting ? 'Submitting...' : 'Sign up'}
												</button>
												<br /><br />
												Already have account?
												<a onClick={() => navigate('/login')} className="btn btn-lg btn-primary">Sign in</a>

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


export default SignUp;
