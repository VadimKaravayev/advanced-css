import { pizzaData } from "../data";
import Pizza from "./Pizza";

function Menu() {
  const pizzas = [...pizzaData];
  return (
    <main className="menu">
      <h2>Our menu</h2>

      {pizzas.length ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven. All organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzaData.map(
              ({ name, ingredients, price, photoName, soldOut }) => (
                <Pizza
                  key={name}
                  name={name}
                  ingredients={ingredients}
                  price={price}
                  photoName={photoName}
                  soldOut={soldOut}
                />
              )
            )}
          </ul>
        </>
      ) : (
        <p>We are working on our menu. Follow the news in our social media.</p>
      )}
    </main>
  );
}

export default Menu;
