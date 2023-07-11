const Just = (value) => ({
  bind: (fn) => fn(value),
  toString: () => `Just(${value})`,
});

const Nothing = () => ({
  bind: () => Nothing(),
  toString: () => `Nothing`,
});

const maybe = (value) =>
  value === null || value === undefined ? Nothing() : Just(value);

const add = (a) => (b) => a + b;
const safeFind = (id) => (list) => {
  console.log(list.toString());
  return list.find((item) => item.id === id) || null;
};
const fetch = (id) =>
  Promise.resolve([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ]);

const main = () =>
  fetch(2)
    .then(maybe)
    .then((m) => m.bind(safeFind(2)))
    .then(maybe)
    .then((result) => result.bind(add(10)))
    .then(console.log);

main();
