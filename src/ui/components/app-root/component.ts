import { getDocs } from './../../../data';
import Component from '@glimmer/component';

export default class AppRoot extends Component {
  content: Object;
  constructor(args) {
    super(args);
    this.content = getDocs();
  }
};
