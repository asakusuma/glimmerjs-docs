import BaseComponent from '../BaseComponent';

export default class HelloWorld extends BaseComponent {
  name: string;
  constructor(args) {
    super(args);
    this.name = 'my name is';
  }
};
