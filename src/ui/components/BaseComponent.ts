import Component from '@glimmer/component';

export default class BaseComponent extends Component {
  mutate(callback: Function) {
    callback();
    this.__owner__.rerender();
  }
};
