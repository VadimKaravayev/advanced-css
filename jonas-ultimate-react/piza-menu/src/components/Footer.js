import Order from "./Order";

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>
          We welcome you to visit between {openHour}:00 and {closeHour}:00
        </p>
      )}
    </footer>
  );
}

export default Footer;
