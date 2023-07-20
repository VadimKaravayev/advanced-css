import { useState } from "react";

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const generateOptions = (qty) => {
    const arr = Array.from({ length: qty }, (_, i) => i + 1);
    return arr.map((num) => (
      <option value={num} key={num}>
        {num}
      </option>
    ));
  };

  const clearFields = () => {
    setDescription("");
    setQuantity(1);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    onAddItems(newItem);
    clearFields();
    console.log(newItem);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <form onSubmit={handleSumbit} className="add-form">
      <h3>What do you need for your 😀 trip?</h3>
      <select value={quantity} onChange={handleQuantityChange}>
        {generateOptions(20)}
      </select>
      <input
        type="text"
        placeholder="Item ..."
        value={description}
        onChange={handleDescriptionChange}
      />
      <button>Add</button>
    </form>
  );
}

export default Form;
