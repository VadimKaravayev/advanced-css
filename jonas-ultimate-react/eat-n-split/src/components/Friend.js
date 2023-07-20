import Button from "./Button";

function Friend({ friend, selectedFriend, onSelection }) {
  const { id, image, name, balance } = friend;
  const isSelected = id === selectedFriend?.id;

  const YouOwe = () =>
    balance < 0 && (
      <p className="red">
        You owe {name} {Math.abs(balance)}€
      </p>
    );
  const FriendOwes = () =>
    balance > 0 && (
      <p className="green">
        {name} owes you {Math.abs(balance)}€
      </p>
    );
  const YouEven = () => balance === 0 && <p>You and {name} are even</p>;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <YouOwe />
      <FriendOwes />
      <YouEven />
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

export default Friend;
