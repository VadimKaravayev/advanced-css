import { useState } from "react";
import Button from "./Button";

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");

  const defaultImage = "https://i.pravatar.cc/48";
  const [image, setImage] = useState(defaultImage);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!(name && image)) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage(defaultImage);

    console.log(newFriend);
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👯‍♀️Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <label>🎇Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => {
          setImage(e.target.value);
        }}
      />
      <Button>Add</Button>
    </form>
  );
}

export default FormAddFriend;
