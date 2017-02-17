import Component from '@glimmer/component';
import Router from './../../router';

export default class BaseComponent extends Component {
  mutate(callback: Function) {
    callback();
    this.__owner__.rerender();
  }
  getRouter(): Router {
    return this.__owner__.router;
  }
};
