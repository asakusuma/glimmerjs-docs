export default class Router {
  constructor(origin?: string) {
    origin = origin || location.pathname;
    
    document.addEventListener('DOMContentLoaded', () => {
      this.bind();
    });
  }
  navigate(path: string) {
    const stateObj = {};
    history.pushState(stateObj, 'some title', path);
  }
  watch() {
    //location.pathname
  }
  bind() {
    const links = document.getElementsByClassName('app-link');
    console.log(links.length);
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', (e) => {
        e.preventDefault();
        this.navigate(e.currentTarget.getAttribute('href'));
      })
    }
  }
}