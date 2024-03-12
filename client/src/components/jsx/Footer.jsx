import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__lists">
        <ul className="footer__list">
          <li className="footer__list-item">Flights</li>
          <li className="footer__list-item">Restaurants</li>
        </ul>
        <ul className="footer__list">
          <li className="footer__list-item">FAQ</li>
          <li className="footer__list-item">Privacy Policy</li>
        </ul>
        <ul className="footer__list">
          <li className="footer__list-item">About Us</li>
          <li className="footer__list-item">Contact Us</li>
        </ul>
        <ul className="footer__list">
          <li className="footer__list-item">Terms of Use</li>
          <li className="footer__list-item">Car Rentals</li>
        </ul>
      </div>
      <div className="footer__text">© 2024 UCodeByUs. All rights reserved.</div>
    </footer>
  );
};

export default Footer;