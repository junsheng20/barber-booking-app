import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

// EditBookingModal component
export default function EditBookingModal({
  booking,
  show,
  handleClose,
  setBookings,
  setModalShow,
}) {
  // Populate form fields with booking details when the modal is shown
  const hours = Array.from({ length: 9 }, (_, i) => 9 + i);
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [barber, setBarber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleEdit = (e) => {
    e.preventDefault();
    const data = {
      location,
      service,
      barber,
      date,
      time,
    };

    axios
      .put(
        `https://booking-system-api-leejunsheng7.sigma-school-full-stack.repl.co/booking/${booking.id}`,
        data
      )
      .then((response) => {
        console.log(response);
        // Assuming response.data contains the updated booking details
        const updatedBooking = response.data;

        // Update the bookings state with the modified booking
        setBookings((prevBookings) => {
          // Map through the existing bookings array and replace the updated booking
          return prevBookings.map((booking) => {
            if (booking.id === updatedBooking.id) {
              return updatedBooking; // Replace the modified booking
            }
            return booking; // Return other bookings as they were
          });
        });
        setModalShow(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (show && booking) {
      console.log(booking);
      setLocation(booking.location);
      setService(booking.service);
      setBarber(booking.barber);
      setDate(booking.date.substring(0, 10));
      setTime(booking.time);
    }
  }, [show, booking, setLocation, setService, setBarber, setDate, setTime]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="custom-form" onSubmit={handleEdit}>
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
                value={date}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="timeInput">
              <Form.Label>Select Time</Form.Label>
              <Form.Select
                aria-label="Select Time"
                onChange={(e) => setTime(e.target.value)}
                value={time}
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
      </Modal.Body>
    </Modal>
  );
}
