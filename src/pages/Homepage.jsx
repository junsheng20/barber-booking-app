import Locations from "../components/Locations";
import BookHaircut from "../components/BookHaircut";
import HomePageBanner from "../components/HomePageBanner";
import Contact from "../components/Contact";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#">
            <i className="fa-solid fa-scissors fs-2">J Barber</i>
          </Navbar.Brand>
          <Nav className="m-auto fs-5">
            <Nav.Link href="#locations">Locations</Nav.Link>
            <Nav.Link href="#bookhaircut">Book Haircut</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/profile" className="fs-4">
              <i className="fa-regular fa-user"></i>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <HomePageBanner />
      <Locations />
      <BookHaircut />
      <Contact />
    </>
  );
}
