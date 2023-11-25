import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { AuthContext } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Authpage() {
  const [modalShow, setModalShow] = useState(null);
  const handleShowSignUp = () => setModalShow("SignUp");
  const handleShowLogin = () => setModalShow("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const { currentUser } = useContext(AuthContext);

  const handleFacebookLogin = async (e) => {
    e.preventDefault(e);
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleClose = () => {
    setModalShow(null);
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <Container className="mt-5">
      <div className="text-center">
        <h1 className="fw-bold">J Barber</h1>
        <p>since 2023</p>
      </div>
      <div className="d-grid gap-2 text-center">
        <Button variant="outline-dark" onClick={handleGoogleLogin}>
          <i className="fa-brands fa-google"></i> Log in with Google
        </Button>
        <Button variant="outline-dark" onClick={handleFacebookLogin}>
          <i className="fa-brands fa-facebook"></i> Log in with Facebook
        </Button>
        <Button variant="outline-dark" onClick={handleShowLogin}>
          <i className="fa-solid fa-envelope"></i> Log in with Email
        </Button>
        <p className="mt-5" style={{ fontWeight: "bold" }}>
          Dont have an account?
        </p>
        <Button variant="outline-dark" onClick={handleShowSignUp}>
          Create an account
        </Button>
      </div>
      <Modal
        show={modalShow !== null}
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
              By signing up, you agree to the Terms of Service and Privacy
              Policy, including Cookie Use. J Barber may use your contact
              information, including your email address and phone number for
              purposes outlined in our Privacy Policy, like keeping your account
              seceure and personalising our services, including ads. Learn more.
              Others will be able to find you by email or phone number, when
              provided, unless you choose otherwise here.
            </p>
            <Button className="rounded-pill" type="submit">
              {modalShow === "SignUp" ? "Sign up" : "Log in"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
