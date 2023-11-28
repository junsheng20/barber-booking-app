import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { auth } from "../firebase";

export default function PhoneAuthModal({ modalShow, handleClose }) {
  const [phoneNumber, setPhoneNumber] = useState("+60");
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  // Recaptcha verifier
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      }
    );
  };

  // Request OTP
  const handleSubmit = (e) => {
    e.preventDefault();
    setExpandForm(true);
    generateRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        console.error(error);
      });
  };

  // Verify OTP
  const verifyOTP = (e) => {
    // Close error message
    setErrorMessage(false);
    // Check if OTP is 6 digit
    const inputValue = e.target.value;
    setOTP(inputValue);

    // Check if the input value has reached the OTP length (6 digits)
    if (inputValue.length === 6) {
      setLoading(true);
      const confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(inputValue)
        .then(() => {
          // User signed in successfully.
          setLoading(false);
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          console.error(error);
          setLoading(false);
          setErrorMessage(true);
        });
    }
  };

  // Close Modal
  const handleHide = () => {
    handleClose();
    setPhoneNumber("+60");
    setExpandForm(false);
  };

  return (
    <Modal
      show={modalShow === "Phone"}
      onHide={handleHide}
      animation={false}
      centered
    >
      <Modal.Body>
        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
          Login with phone number
        </h2>

        <Form className="d-grip gap-2 px-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter your phone number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>
          {!expandForm ? (
            <Button type="submit">Request OTP</Button>
          ) : loading ? (
            <Spinner
              animation="border"
              role="status"
              style={{ height: "20px", width: "20px" }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter the OTP sent to your phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter OTP"
                value={OTP}
                onChange={verifyOTP}
              />
              {errorMessage ? (
                <p className="mt-2" style={{ color: "red" }}>
                  Wrong OTP, please try again
                </p>
              ) : null}
            </Form.Group>
          )}

          <div id="recaptcha-container"></div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
