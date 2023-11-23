import { Button } from "react-bootstrap";
import img4 from "/src/images/image4.jpg";

export default function BookHaircut() {
  return (
    <div
      id="bookhaircut"
      className="text-center text-white"
      style={{
        backgroundImage: `url(${img4})`,
        backgroundSize: "cover",
        height: "60vh",
        padding: "100px",
      }}
    >
      <h1 className="fw-bold">Book Haircut</h1>
      <h5 className="mt-5">
        Personal, individually tailored haircuts and beard trims.
      </h5>
      <Button variant="outline-light fs-5 mt-3" href="/booking">
        Book Now
      </Button>
    </div>
  );
}
