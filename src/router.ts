export default class Router {
  callbacks: Array<Function>;
  constructor(origin?: string) {
    this.callbacks = [];
    origin = origin || location.pathname;
    
    document.addEventListener('DOMContentLoaded', () => {
      this.bind();
    });
  }
  getPath() {
    return location.pathname;
  }
  navigate(path: string) {
    const stateObj = {};
    history.pushState(stateObj, 'some title', path);
  }
  watch(cb: Function) {
    this.callbacks.push(cb);
  }
  bind() {
    const links = document.getElementsByClassName('app-link');
    console.log(links.length);
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', (e) => {
        e.preventDefault();
        const destination = e.currentTarget.getAttribute('href');
        this.navigate(destination);
        for (let i = 0; i < this.callbacks.length; i++) {
          this.callbacks[i](destination);
        }
      })
    }
  }
}