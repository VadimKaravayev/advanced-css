function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentagePacked = Math.round((numPacked / numItems) * 100);

  if (!numItems) {
    return (
      <p className="footer">
        <em>Start adding some items to your packing list 🎬</em>
      </p>
    );
  }

  return (
    <footer className="stats">
      <em>
        {percentagePacked === 100
          ? "You got everything. Ready to go ✈️"
          : `💼You have ${numItems} items on your list, and you already packed
        ${numPacked}(${percentagePacked}%)`}
      </em>
    </footer>
  );
}

export default Stats;
