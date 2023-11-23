import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import img5 from "/Users/junsheng/Desktop/barber-booking-app/src/images/image5.jpg";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import Contact from "../components/Contact";
import axios from "axios";

export default function Bookingpage() {
  const hours = Array.from({ length: 9 }, (_, i) => 9 + i);
  const navigate = useNavigate();
  const currentUser = useContext(AuthContext).currentUser;
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [barber, setBarber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [uid, setUid] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      location,
      service,
      barber,
      date,
      time,
      uid,
    };

    try {
      const response = await axios.post(
        "https://booking-system-api-leejunsheng7.sigma-school-full-stack.repl.co/booking",
        data
      );
      console.log(response);
      alert("Booking successful");
    } catch (error) {
      console.error(error);
      alert("Booking unsuccessful");
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      setUid(currentUser.uid);
    }
  }, [currentUser, navigate]);
  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#">
            <i className="fa-solid fa-scissors fs-2">J Barber</i>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/" className="fs-4">
              <i className="fa-solid fa-house"></i>
            </Nav.Link>{" "}
            <Nav.Link href="/profile" className="fs-4">
              <i className="fa-regular fa-user"></i>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Banner  */}
      <div
        style={{
          backgroundImage: `url(${img5})`,
          backgroundSize: "cover",
          height: "70vh",
          display: "flex",
          alignItems: "center" /* Center vertically */,
          justifyContent: "center" /* Center horizontally */,
          textAlign: "center" /* Center text inside */,
        }}
      >
        <h1 className="fw-bold">Book your appointment!</h1>
      </div>

      {/* Form starts here  */}
      <Container className="mt-5 mb-5">
        {/* <h2 className="text-center mb-4">Book an Appointment</h2> */}
        <Form className="custom-form" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="locationSelect">
              <Form.Label>Select Location</Form.Label>
              <Form.Select
                aria-label="Select Location"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                required
              >
                <option value="" disabled hidden>
                  Choose a location
                </option>
                <option value="Gamuda Walk">Gamuda Walk</option>
                <option value="The Hub SS2">The Hub SS2</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="serviceSelect">
              <Form.Label>Select Service</Form.Label>
              <Form.Select
                aria-label="Select Service"
                onChange={(e) => setService(e.target.value)}
                value={service}
                required
              >
                <option value="" disabled hidden>
                  Choose a service
                </option>
                <option value="Haircut">Haircut</option>
                <option value="Major Makeover Haircut">
                  Major Makeover Haircut
                </option>
                <option value="Haircut with Beard Trim">
                  Haircut with Beard Trim
                </option>
                <option value="Beard Trim with Hairline Clean-up">
                  Beard Trim with Hairline Clean-Up
                </option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="barberSelect">
              <Form.Label>Select Barber</Form.Label>
              <Form.Select
                aria-label="Select Barber"
                onChange={(e) => setBarber(e.target.value)}
                value={barber}
                required
              >
                <option value="" disabled hidden>
                  Choose a barber
                </option>
                <option value="Brian">Brian</option>
                <option value="Jackson">Jackson</option>
                <option value="YK">YK</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="dateInput">
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                className="custom-date-input"
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="timeInput">
              <Form.Label>Select Time</Form.Label>
              <Form.Select
                aria-label="Select Time"
                onChange={(e) => setTime(e.target.value)}
                required
              >
                {hours.map((hour) => (
                  <option key={hour} value={`${hour}:00:00`}>
                    {hour}:00
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
      <Contact />
    </>
  );
}
