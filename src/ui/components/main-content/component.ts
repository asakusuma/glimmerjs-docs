import BaseComponent from '../BaseComponent';
import { findByUrlName } from './../../../data';

export default class MainContent extends BaseComponent {
  title: string;
  filteredContent: Object;
  originalContent: Object;
  constructor(args) {
    super(args);
    const router = this.getRouter();
    this.originalContent = args.args.content;
    this.bootInitialPage();
    router.watch((path: string) => {
      this.mutate(() => {
        this.routeTo(path);
      });
    });
  }
  bootInitialPage() {
    const path = this.getRouter().getPath();
    if (!path || path === '/') {
      this.renderHome();
    } else {
      this.routeTo(path);
    }
  }
  renderHome() {
    this.title = 'Welome to the GlimmerJS API docs';
  }
  notFound() {
    this.title = '404';
  }
  routeTo(path: string) {
    // TODO: handle nested routing in a real way
    // Assumes that every url name is unqiue. Does not actually look at full path
    let segs = path.split('/');
    let query = segs.pop();
    if (!query) {
      query = segs.pop();
    }
    const content = findByUrlName(this.originalContent, query);
    if (!content) {
      this.notFound();
      return;
    }
    this.title = content.name;
    this.filteredContent = content;
    console.log(this.filteredContent);
  }
};
