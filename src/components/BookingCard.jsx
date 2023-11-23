import axios from "axios";
import { Button, Card } from "react-bootstrap";
import EditBookingModal from "./EditBookingModal";
import { useState } from "react";

const BookingCard = ({ booking, setBookings }) => {
  const { location, service, barber, date, time, id } = booking;
  const [modalShow, setModalShow] = useState(false);

  const handleModalShow = () => {
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://booking-system-api-leejunsheng7.sigma-school-full-stack.repl.co/booking/${id}`
      );
      setBookings((prevBookings) =>
        prevBookings.filter((bookingItem) => bookingItem.id !== id)
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="booking-card mt-5">
      <Card>
        <Card.Body>
          <Card.Title className="text-center mb-4">Booking Details</Card.Title>
          <Card.Text>
            <div className="detail">
              <strong>Location:</strong> {location}
            </div>
            <div className="detail">
              <strong>Service:</strong> {service}
            </div>
            <div className="detail">
              <strong>Barber:</strong> {barber}
            </div>
            <div className="detail">
              <strong>Date:</strong> {new Date(date).toLocaleDateString()}
            </div>
            <div className="detail">
              <strong>Time:</strong> {time}
            </div>
          </Card.Text>
          <div className="icons mt-4">
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={handleModalShow}
            >
              <i className="far fa-edit mr-3"></i> Edit
            </Button>
            <Button variant="outline-danger" onClick={handleDelete}>
              <i className="far fa-trash-alt" /> Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
      <EditBookingModal
        show={modalShow}
        handleClose={handleClose}
        booking={booking}
        setBookings={setBookings}
        setModalShow={setModalShow}
      />
    </div>
  );
};

export default BookingCard;
