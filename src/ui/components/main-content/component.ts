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
    this.routeTo(router.getPath());
    router.watch((path: string) => {
      this.mutate(() => {
        this.routeTo(path);
      });
    });
  }
  routeTo(path: string) {
      // Assumes that every url name is unqiue. Does not actually look at full path
      let segs = path.split('/');
      let query = segs.pop();
      if (!query) {
        query = segs.pop();
      }
      console.log(query);
      const content = findByUrlName(this.originalContent, query);
      this.title = content.name;
    }
};
