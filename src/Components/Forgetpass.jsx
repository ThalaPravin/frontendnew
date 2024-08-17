import React, { useState } from 'react';
import axios from 'axios';

export default function Forgetpass() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true upon form submission
    try {
      const response = await axios.post(
        'https://healthcare-backend-o4vb.onrender.com/user/forget-password',
        { email }, // Send email as an object
        {
          headers: {
            isvalidrequest: 'twinsistech',
          },
        }
      );
      console.log(response);
      const user = response?.data?.result?.user;
      setMessage('Password reset link sent to your email');
      setError('');
    } catch (error) {
      console.error(error);
      setError('Failed to send password reset link');
      setMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="content top-space">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="account-content">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-7 col-lg-6 login-left">
                    <img
                      src="assets/img/bg/pic.jpg"
                      className="img-fluid"
                      alt="Login Banner"
                    />
                  </div>
                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header">
                      <h3>Forgot Password?</h3>
                      <p className="small text-muted">
                        Enter your email to get a One Time Password(OTP123)
                      </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3 form-focus">
                        <input
                          type="email"
                          className="form-control floating"
                          value={email}
                          onChange={handleEmailChange}
                          required
                        />
                        <label className="focus-label">Email</label>
                      </div>
                      <div className="text-end">
                        <a className="forgot-link" href="login.html">
                          Remember your password?
                        </a>
                      </div>
                      <button
                        className="btn btn-primary w-100 btn-lg login-btn"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Loading...' : 'Reset Password'}
                      </button>
                    </form>
                    {message && <p className="mt-3 text-success">{message}</p>}
                    {error && <p className="mt-3 text-danger">{error}</p>}
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
