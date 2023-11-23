export default function Contact() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>123 Street Name, City</p>
            <p>Email: junsheng@jbarber.com</p>
            <p>Phone: +1234567890</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#locations">Locations</a>
              </li>
              <li>
                <a href="#bookhaircut">Book Haircut</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="social-icons">
              <li>
                <a href="#" className="facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#" className="twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" className="instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
