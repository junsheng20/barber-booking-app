import { getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import BookingCard from "../components/BookingCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingsByUser } from "../features/bookings/bookingsSlice";

export default function Profilepage() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser ? currentUser.uid : null;

  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  const loading = useSelector((state) => state.bookings.loading);

  const handleLogout = () => {
    auth.signOut();
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      dispatch(fetchBookingsByUser(uid));
    }
  }, [currentUser, dispatch, navigate, uid]);

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

      <div>
        {loading ? (
          // Show a loading indicator while data is being fetched
          <Container className="text-center mt-5">
            <p>Loading...</p>
          </Container>
        ) : (
          // Show bookings once data is fetched
          bookings &&
          bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        )}
      </div>

      <Container className="mt-5">
        <Button onClick={handleLogout} variant="dark">
          Log out
        </Button>
      </Container>
    </>
  );
}
