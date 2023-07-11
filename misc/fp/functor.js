//Your own functor
const Identity = (value) => ({
  map: (fn) => Identity(fn(value)),
  get: () => value,
});

//helper function
const trace = (value) => {
  console.log(value);
  return value;
};

const res = Identity({ name: "Buddy" })
  .map((x) => ({ ...x, surName: "Cake" }))
  .map(trace)
  .map((x) => ({ ...x, year: 1984 }))
  .map(trace)
  .map((x) => ({ ...x, location: "Lviv" }))
  .get();

// console.log(res);

//curried mapping
const curry =
  (f, arr = []) =>
  (...args) =>
    ((a) => (a.length === f.length ? f(...a) : curry(f, a)))([...arr, ...args]);

const map = curry((fn, mappable) => mappable.map(fn));

const log = (x) => console.log(x);
const double = (n) => n * 2;
const tenTimes = (n) => n * 10;
const mdouble = map(double);

mdouble(Identity(4)).map(log);
mdouble([4, 2, 7]).map(log);

//Monads

class Maybe {
  constructor(value) {
    this.value = value;
  }

  bind = function (fn) {
    return this.value ? Maybe(fn(this.value)) : this;
  };
}
