import Application from '@glimmer/application';
import Resolver, { ResolverConfiguration, BasicModuleRegistry } from '@glimmer/resolver';
import config from './config/environment';
import moduleMap from './config/module-map';
import Router from './router';

const resolverConfiguration: ResolverConfiguration = {
  app: { name: config.modulePrefix, rootName: config.modulePrefix },
  types: config.moduleConfiguration.types,
  collections: config.moduleConfiguration.collections
};

console.log('resolverConfiguration', resolverConfiguration);
console.log('moduleMap', moduleMap);

export default class App extends Application {
  router: Router;
  constructor() {
    let moduleRegistry = new BasicModuleRegistry(moduleMap);
    let resolver = new Resolver(resolverConfiguration, moduleRegistry);

    super({
      rootName: config.modulePrefix,
      resolver
    });

    this.router = new Router();
  }
}
