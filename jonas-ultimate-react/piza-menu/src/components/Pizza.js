function Pizza({ name, ingredients, price, photoName, soldOut }) {
  return (
    <li className={`pizza ${soldOut && "sold-out"}`}>
      <img src={photoName} alt="pizza spinaci" />
      <div>
        <h2>{name}</h2>
        <p>{ingredients}</p>
        <span>{soldOut ? "Sold Out" : price}</span>
      </div>
    </li>
  );
}

export default Pizza;
