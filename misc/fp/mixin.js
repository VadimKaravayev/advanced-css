/**
 * Favor composition over inheritance.
 * Mixin is a type of composition where mixin props become object props
 * Vanila ice cream principle
 */

const chocolate = {
  hasChocolote: () => true,
};

const caramelSwirl = {
  hasCaramelSwirl: () => true,
};

const pecans = {
  hasPecans: () => true,
};

const iceCream = Object.assign({}, chocolate, caramelSwirl, pecans);

/**
 * Functional mixin is a composable function.
 * It mix new props into an existing object.
 * You simply pass an arbitrary obj into mixin func and the obj gets extended
 */

//mixin example
//the mixin takes and extends an obj with mixin's props.
const flying = (o = {}) => {
  let isFlying = false;
  return Object.assign({}, o, {
    fly() {
      isFlying = true;
      return this;
    },
    isFlying: () => isFlying,
    land() {
      isFlying = false;
      return this;
    },
  });
};

const bird = flying();

const withLogger = (logger) => (o) => {
  return Object.assign({}, o, {
    log(msg) {
      logger(msg);
    },
  });
};

const birdWithLogger = withLogger(console.log)(bird);
birdWithLogger.log(birdWithLogger.isFlying());
birdWithLogger.log("hello birdie");
