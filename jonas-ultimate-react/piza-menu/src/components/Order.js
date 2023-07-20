function Order({ closeHour }) {
  return (
    <div className="order">
      <p>we're open until {closeHour}</p>
      <button className="btn">Order</button>
    </div>
  );
}

export default Order;
