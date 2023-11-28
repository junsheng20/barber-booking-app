import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { auth } from "../firebase";

export function EmailAuthModal({ modalShow, handleClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      console.log(res.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      show={modalShow === "SignUp" || modalShow === "Login"}
      onHide={handleClose}
      animation={false}
      centered
    >
      <Modal.Body>
        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
          {modalShow === "SignUp"
            ? "Create your account"
            : "Log in to your account"}
        </h2>
        <Form
          className="d-grip gap-2 px-5"
          onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <p style={{ fontSize: "12px" }}>
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use. J Barber may use your contact information,
            including your email address and phone number for purposes outlined
            in our Privacy Policy, like keeping your account seceure and
            personalising our services, including ads. Learn more. Others will
            be able to find you by email or phone number, when provided, unless
            you choose otherwise here.
          </p>
          <p>this is redux</p>
          <p>this is redux</p>
          <Button className="rounded-pill" type="submit">
            {modalShow === "SignUp" ? "Sign up" : "Log in"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
