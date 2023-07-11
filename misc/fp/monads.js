/*
async API exmaple with wrong and rigth approach

getUserById(id: String) => Promise(User)
hasPermission(User) => Promise(Boolean)
*/

//utilities
const compose =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x);

const trace = (label) => (value) => {
  console.log(`${label}: ${value}`);
  return value;
};

const getUserById = (id) =>
  id === 3 ? Promise.resolve({ name: "Kurt", role: "Author" }) : undefined;

//b => Promise(c)
const hasPermission = ({ role }) => Promise.resolve(role === "Author");

{
  const label = "API call composition";

  //a => Promise(b)

  //Try to compose them. It will fail.
  const authUser = compose(
    getUserById,
    trace("after getting user"),
    hasPermission
  );

  authUser(3).then(trace(label));
  console.log("================= EX ONE =================");
}

/**
 * The failure happens becuase hasPermission expects User obejct, instead it gets Promise(User)
 * To fix it, compose function should be refactored so that it know it need to use then()
 *
 * Some explanation of the syntax below
 * const a = Promise.resolve('Hello world');
 * const flatMap = 'then';
 * const log = x => console.log('logged', x);
 * a[flatMap](log);
 *
 * It basically is
 *  a.then(x => console.log('logged', x));
 *
 * expected result
 * 'logged "Hello wrold"'
 */

{
  const composeM =
    (flatMap) =>
    (...ms) =>
      ms.reduce((f, g) => (x) => g(x)[flatMap](f));

  const composePromises = composeM("then");

  const authUser = composePromises(hasPermission, getUserById);
  authUser(3).then(trace("foobar"));
}
console.log("================================");
/**
 * What monads are made of?
 * of: A type lift a => M(a)
 * map: the application of a => M(b) inside the context which yields M(M(b))
 * flatten: unwrapping of monadic layer M(M(b)) => M(b)
 */

const Monad = (value) => ({
  flatMap: (f) => f(value),
  map(f) {
    return this.flatMap((a) => Monad.of(f(a)));
  },
});

Monad.of = (x) => Monad(x);
Monad(21)
  .map((x) => x * 2)
  .map((x) => console.log("x", x));
