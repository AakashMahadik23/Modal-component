// Modal.js
import React, { useState, useRef } from "react";
import "../styles/modal.scss"; // Import your SCSS file
import closeIcon from "../assets/close.png";
import Otpdata from "../assets/data.json";
import whitetick from "../assets/white-tick.png"
import tickicon from "../assets/tickicon.png";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const otpInputRefs = Array.from({ length: 6 }, () => useRef(null));
  const [isIncorrectOtp, setIsIncorrectOtp] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsIncorrectOtp(false);
    setIsOtpVerified(false);
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (!isNaN(value) && value !== "") {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });

      if (index < 5) {
        // Move focus to the next input
        otpInputRefs[index + 1].current.focus();
      }
    }
  };

  const handleResendClick = () => {
    // Add your logic for resending OTP
    console.log("Resend OTP");
  };

  const handleVerifyOtpClick = () => {
    const enteredOtp = otp.join("");
    const isCorrectOtp = Otpdata.correctOtps.includes(enteredOtp);

    if (isCorrectOtp) {
      setIsIncorrectOtp(false);
      setIsOtpVerified(true);
      console.log("OTP is correct!");
    } else {
      setIsIncorrectOtp(true);
      setIsOtpVerified(false);
      console.log("Incorrect OTP!");
    }
  };

  return (
    <div>
      {!isOtpVerified ? (
        <>
          <button onClick={openModal}>Open Modal</button>

          {isOpen && (
            <div className="modal-overlay " onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={closeModal} className="close-button">
                  Close
                  <img
                    src={closeIcon}
                    alt="Close Icon"
                    className="close-icon"
                    onClick={closeModal}
                  />
                </button>

                <h2 className="modal-heading">Email Verification</h2>
                <p className="modal-subheading">
                  We've sent you a 6-Digit One-Time Password to your requested mail
                </p>

                <div className="otp-label-container">
                  <label htmlFor="otp" className="otp-label">
                    Enter OTP :
                  </label>
                </div>

                <div className="otp-input-container">
                  {otp.map((value, index) => (
                    <input
                      className={`otp-box ${isIncorrectOtp ? 'incorrect-otp' : ''}`}
                      key={index}
                      type="text"
                      maxLength="1"
                      value={value}
                      onChange={(e) => handleOtpChange(e, index)}
                      ref={otpInputRefs[index]}
                    />
                  ))}
                </div>

                <div className="resend-link" onClick={handleResendClick}>
                  Didn’t Receive? <span className="resend-name">Resend</span>
                </div>

                <button
                  onClick={handleVerifyOtpClick}
                  className="verify-otp-button"
                >
                  Verify OTP
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="modal-overlay" onClick={closeModal}>
        <div className="verification-message-container " onClick={(e) => e.stopPropagation()}>
          <button
            onClick={closeModal}
            className="close-button-verify"
          >
            Close
            <img
              src={closeIcon}
              alt="Close Icon"
              className="close-icon-verify"
              onClick={closeModal}
            />
          </button>
          <h2 className="verification-heading">Email Verification</h2>
          <div className="ellipse">
          <img
              src={whitetick}
              alt="White Tick Icon"
              className="tick-icon"
            />
          </div>
          <div>
            <p className="verify-subheading">Verified Sucessfully</p>
          </div>
          <button className="Goback-button" onClick={() => setIsOtpVerified(false)}>Back to Login</button>
        </div>
      </div>
    )}
    </div>
  );
};

export default Modal;
