const maxWidth = 400;
const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
const container = document.querySelector(".container");
const [item2, item3, item4, item5] = [
  ".item2",
  ".item3",
  ".item4",
  ".item5",
].map((selector) => container.querySelector(selector));

const replaceNodes = (cond) =>
  [item2, item3].forEach((item) =>
    container.insertBefore(item, cond ? item5 : item4)
  );

const handleChange = ({ matches }) => replaceNodes(matches);

const handleLoad = () => replaceNodes(maxWidth >= window.innerWidth);

window.addEventListener("load", handleLoad);
mq.addEventListener("change", handleChange);
