import { Button, Card, Spinner } from "react-bootstrap";
import EditBookingModal from "./EditBookingModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBooking } from "../features/bookings/bookingsSlice";

const BookingCard = ({ booking }) => {
  const { location, service, barber, date, time, id } = booking;
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleModalShow = () => {
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      dispatch(deleteBooking(id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="booking-card mt-5">
      <Card>
        <Card.Body>
          <Card.Title className="text-center mb-4">Booking Details</Card.Title>
          <div>
            <div>
              <strong>Location:</strong> {location}
            </div>
            <div>
              <strong>Service:</strong> {service}
            </div>
            <div>
              <strong>Barber:</strong> {barber}
            </div>
            <div>
              <strong>Date:</strong> {new Date(date).toLocaleDateString()}
            </div>
            <div>
              <strong>Time:</strong> {time}
            </div>
          </div>
          <div className="icons mt-4">
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={handleModalShow}
            >
              <i className="far fa-edit mr-3"></i> Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              {loading ? (
                <Spinner
                  animation="border"
                  role="status"
                  style={{ height: "20px", width: "20px" }}
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <i className="far fa-trash-alt" /> // Show the trash icon when not deleting
              )}{" "}
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
      <EditBookingModal
        show={modalShow}
        handleClose={handleClose}
        booking={booking}
        setModalShow={setModalShow}
      />
    </div>
  );
};

export default BookingCard;
