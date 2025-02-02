import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function DoctorRegister() {
	const location = useLocation();
	const [role, setRole] = useState("");

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const roleParam = searchParams.get("role");
		setRole(roleParam);
	}, [location]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();
	const navigate = useNavigate();
	// const { setLoading } = useLoading(); // Get the setLoading function from context
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const onSubmit = async (data) => {
		if (data.password !== data.confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
	
		try {
			delete data.confirmPassword;
			data.name = data.email;
			data.mobileNumber = data.phoneNumber;
			delete data.phoneNumber;
			data.role = role;
			data.status = "active";
	
			// Make the API request
			const response = await axios.post("http://localhost:5000/user/signup", data, {
				headers: {
					isvalidrequest: "twinsistech",
				},
			});
	
			// Check if the response is valid
			console.log("Response:", response);
	
			if (response.data.status === false) {
				toast.error(response.data.message || "Signup failed");
			} else {
				toast.success("Account Created Successfully");
				navigate("/login", { state: { phoneNumber: data.mobileNumber } });
			}
		} catch (error) {
			// Log the error in the console
			console.error("Error submitting form:", error);
	
			if (error.response) {
				// Server responded with a status other than 2xx
				console.error("Response error:", error.response);
				toast.error(error.response.data.message || "An error occurred during signup");
			} else if (error.request) {
				// Request was made but no response received
				console.error("Request error:", error.request);
				toast.error("No response received from the server");
			} else {
				// Something happened in setting up the request
				console.error("Error:", error.message);
				toast.error("An unexpected error occurred");
			}
		}
	};
	

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div className="main-wrapper">
			<div className="content top-space">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-8 offset-md-2">
							<div className="account-content">
								<div className="row align-items-center justify-content-center">
									<ToastContainer />
									<div className="col-md-7 col-lg-6 login-left">
										<img
											src="assets/img/bg/pic.jpg"
											className="img-fluid"
											alt="Login Banner"
										/>
									</div>
									<div className="col-md-12 col-lg-6 login-right">
										<div className="login-header">
											<h3>
												{role === "doctor"
													? "Physician Register"
													: "Patient Register"}
												{role === "user" ? (
													<Link to="/signup?role=doctor">
														{" "}
														Are you a Physician
													</Link>
												) : (
													<Link to="/signup?role=user">
														{" "}
														Not a Physician
													</Link>
												)}
											</h3>
										</div>
										<form onSubmit={handleSubmit(onSubmit)}>
											<div className="mb-2 ">
												<label className="">Email</label>
												<input
													id="email"
													type="email"
													placeholder="Email Address"
													{...register("email", {
														required: "Email is required",
														pattern: {
															value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
															message: "Invalid email address",
														},
													})}
													className="form-control floating"
												/>
												{errors.email && (
													<p className="text-red-500 text-xs italic">
														{errors.email.message}
													</p>
												)}
											</div>
											<div className="mb-2 ">
												<label className="mt-2">Mobile Number</label>
												<input
													type="text"
													placeholder="Mobile Number"
													{...register("phoneNumber", {
														required: "Phone number is required",
														pattern: {
															value: /^\d{10}$/,
															message: "Invalid phone number",
														},
													})}
													className="form-control floating"
												/>
												{errors.phoneNumber && (
													<p className="text-red-500 text-xs italic">
														{errors.phoneNumber.message}
													</p>
												)}
											</div>
											<div className="mb-2">
												<label className="mt-2">Create Password</label>
												<div className="pass-group d-flex">
													<input
														type={showPassword ? "text" : "password"}
														placeholder="Password"
														{...register("password", {
															required: "Password is required",
															pattern: {
																value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/,
																message:
																	"Password must contain at least 8 characters, one uppercase letter, one number, and one special character",
															},
														})}
														className="form-control pass-input"
													/>
													<span
														onClick={() =>
															setShowPassword(!showPassword)
														}
														className="toggle-password"
													>
														<FontAwesomeIcon
															icon={showPassword ? faEye : faEyeSlash}
														/>
													</span>
												</div>
												{errors.password && (
													<p className="text-red-500 text-xs italic">
														{errors.password.message}
													</p>
												)}
											</div>

											<div className="mb-2">
												<label className="mt-2">Confirm Password</label>
												<div className="pass-group d-flex">
													<input
														placeholder="Confirm Password"
														type={
															showConfirmPassword
																? "text"
																: "password"
														}
														{...register("confirmPassword", {
															required:
																"Confirm Password is required",
															validate: (value) =>
																value === getValues("password") ||
																"Passwords do not match",
														})}
														className="form-control pass-input"
													/>
													<span
														onClick={() =>
															setShowConfirmPassword((prev) => !prev)
														}
														className="toggle-password"
													>
														<FontAwesomeIcon
															icon={
																showConfirmPassword
																	? faEye
																	: faEyeSlash
															}
														/>
													</span>
												</div>
												{errors.confirmPassword && (
													<p className="text-red-500 text-xs italic">
														{errors.confirmPassword.message}
													</p>
												)}
											</div>

											<div className="text-end">
												<Link to={"/login"}>
													<a className="forgot-link">
														Already have an account?
													</a>
												</Link>
											</div>
											<button
												className="btn btn-primary w-100 btn-lg login-btn"
												type="submit"
											>
												Signup
											</button>
											{/* <div className="login-or">
                        <span className="or-line" />
                        <span className="span-or">or</span>
                      </div>
                      <div className="row social-login">
                        <div className="col-6">
                          <a href="#" className="btn btn-facebook w-100">
                            <i className="fab fa-facebook-f me-1" /> Login
                          </a>
                        </div>
                        <div className="col-6">
                          <a href="#" className="btn btn-google w-100">
                            <i className="fab fa-google me-1" /> Login
                          </a>
                        </div>
                      </div> */}
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
