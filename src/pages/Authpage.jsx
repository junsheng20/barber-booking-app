import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { AuthContext } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { EmailAuthModal } from "../components/EmailAuthModal";
import PhoneAuthModal from "../components/PhoneAuthModal";

export default function Authpage() {
  const [modalShow, setModalShow] = useState(null);
  const handleShowSignUp = () => setModalShow("SignUp");
  const handleShowLogin = () => setModalShow("Login");
  const handleShowPhone = () => setModalShow("Phone");
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
        <Button variant="outline-dark" onClick={handleShowPhone}>
          <i className="fa-solid fa-phone"></i> Log in with Phone Number
        </Button>
        <p className="mt-5" style={{ fontWeight: "bold" }}>
          Dont have an account?
        </p>
        <Button variant="outline-dark" onClick={handleShowSignUp}>
          Create an account
        </Button>
      </div>
      <EmailAuthModal modalShow={modalShow} handleClose={handleClose} />
      <PhoneAuthModal modalShow={modalShow} handleClose={handleClose} />
    </Container>
  );
}
