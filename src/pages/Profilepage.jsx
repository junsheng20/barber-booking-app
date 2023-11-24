import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import axios from "axios";
import BookingCard from "../components/BookingCard";

export default function Profilepage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const uid = currentUser ? currentUser.uid : null;
  const [bookings, setBookings] = useState();
  const handleLogout = () => {
    auth.signOut();
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      try {
        // Example of a GET request using Axios
        axios
          .get(
            `https://booking-system-api-leejunsheng7.sigma-school-full-stack.repl.co/booking/${uid}`
          ) // Replace with your API endpoint
          .then((response) => {
            // Handle successful response here
            setBookings(response.data);
            console.log(response.data);
            setLoading(false);
          })
          .catch((error) => {
            // Handle errors from the request
            console.error("Error fetching data:", error);
          });
      } catch (error) {
        console.error(error);
      }
    }
  }, [currentUser, navigate, uid]);

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#">
            <i className="fa-solid fa-scissors fs-2">J Barber</i>
          </Navbar.Brand>

          <Nav className="ms-auto">
            <Nav.Link href="/" className="fs-4">
              <i className="fa-solid fa-house"></i>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {loading ? (
        // Show a loading indicator while data is being fetched
        <Container className="text-center mt-5">
          <p>Loading...</p>
        </Container>
      ) : (
        // Show bookings once data is fetched
        bookings &&
        bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            setBookings={setBookings}
          />
        ))
      )}

      <Container className="mt-5">
        <Button onClick={handleLogout} variant="dark">
          Log out
        </Button>
      </Container>
    </>
  );
}
