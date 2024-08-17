import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaCalendarPlus } from "react-icons/fa";
import { OrderState } from "../Contexts";

const BookAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { setIsLoggedIn } = OrderState();

  // Show the button only if the current path starts with "/physician"
  const isPhysicianRoute = location.pathname.startsWith("/user");

  const handleNavigate = () => {
    navigate("/user/docsearch");
  };

  return (
    <Wrapper>
      {isPhysicianRoute && setIsLoggedIn && (
        <div className="top-btn" onClick={handleNavigate}>
          <FaCalendarPlus className="top-btn--icon" />
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .top-btn {
    font-size: 1.5rem;
    width: 50px;
    height: 50px;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.btn};
    box-shadow: ${({ theme }) => theme.colors.shadow};
    border-radius: 50%;
    position: fixed;
    bottom: 9rem; /* Adjust this to be just above the Go to Top button */
    right: 80px;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.helper}; /* Change color on hover */
      box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .top-btn {
      right: 0;
      left: 40%;
    }
  }
`;

export default BookAppointment;
