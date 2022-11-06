function getNav(document) {
  return document.querySelector('.side-nav');
}

function removeActiveClass(nav) {
  const activeClass = 'side-nav__item--active';
  const activeItem = nav.querySelector('.' + activeClass);
  activeItem.classList.remove(activeClass);
}

function addActiveClass(item) {
  item.classList.add('side-nav__item--active');
}

function getNavItems(nav) {
  return nav.querySelectorAll('.side-nav__item');
}

(function (nav) {
  console.log('hello world');

  getNavItems(nav).forEach((item) => {
    item.addEventListener('click', () => {
      removeActiveClass(nav);
      addActiveClass(item);
    });
  });
})(getNav(document));
