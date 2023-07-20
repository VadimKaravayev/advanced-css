import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
// import App from "./App";
// import "./index.css";
import StarRating from "./components/StarRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={["terrible", "bad", "ok", "good", "excellent"]}
    />
    <Test />
  </React.StrictMode>
);
