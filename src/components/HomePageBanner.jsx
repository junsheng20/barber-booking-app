import { Carousel } from "react-bootstrap";
import img1 from "/src/images/image1.jpg";
import img2 from "/src/images/image2.jpg";
import img3 from "/src/images/image3.jpg";

export default function HomePageBanner() {
  return (
    <Carousel pause={false} controls={false}>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src={img1}
          alt="First slide"
          style={{ height: "85vh" }}
        ></img>
        {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src={img2}
          alt="Second slide"
          style={{ height: "85vh" }}
        ></img>
        {/* <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src={img3}
          alt="Third slide"
          style={{ height: "85vh" }}
        ></img>
        {/* <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}
