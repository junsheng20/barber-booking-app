import { Col, Container, Row } from "react-bootstrap";

export default function Locations() {
  return (
    <Container id="locations" style={{ height: "90vh" }} className="mt-5 mb-5">
      <h1 className="text-center mt-5 fw-bold">Locations</h1>
      <Row className="mt-4">
        <Col sm={6} className="text-center">
          <h3 className="mt-5">Gamuda Walk</h3>
          <p>
            L1-20, 1st Floor, Gamuda Walk, Persisiran Anggerik Vanilla, 40460
            Seksyen 31, Shah Alam.
          </p>
          <p>Tel: 03-5131 9028</p>
          <div className="g-map mt-3">
            <iframe
              width="100%"
              height="350"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=L1-20,%201st%20Floor,%20Gamuda%20Walk,%20Persisiran%20Anggerik%20Vanilla,%2040460%20Seksyen%2031,%20Shah%20Alam.+(J%20Barber)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
        </Col>
        <Col sm={6} className="text-center">
          <h3 className="mt-5">The Hub SS2</h3>
          <p>
            Lot A-M-06, Block A Mezzanine Floor, 19 Sentral, Jalan Harapan,
            Seksyen 19, 46300, Petaling Jaya, Selangor
          </p>
          <p>Tel: 03-5524 6616</p>
          <div className="g-map mt-3">
            <iframe
              width="100%"
              height="350"
              src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=Lot%20A-M-06,%20Block%20A%20Mezzanine%20Floor,%2019%20Sentral,%20Jalan%20Harapan,%20Seksyen%2019,%2046300,%20Petaling%20Jaya,%20Selangor+(J%20Barber)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.maps.ie/population/">Population mapping</a>
            </iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
