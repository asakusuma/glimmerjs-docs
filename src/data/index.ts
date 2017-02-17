export function fetchDocs() {
    fetch('docs/glimmer-di.json').then(function(response) {
        if (response.status !== 200) {
            console.error('Error fetching docs');
        }
        return response.json().then((data) => {
            console.log(data);
            return data;
        });
    });
}

function injectUrlPathsOnArray(array) {
    if (array) {
        for (let i = 0; i < array.length; i++) {
            recurseInjectUrlPaths(array[i]);
        }
    }
}

function recurseInjectUrlPaths(obj) {
    if (obj) {
        obj.urlName = obj.name.replace('@', '').replace('/', '-').toLowerCase();
        injectUrlPathsOnArray(obj.modules);
        injectUrlPathsOnArray(obj.methods);
        injectUrlPathsOnArray(obj.properties);
    }
}

export function findByUrlName(obj, query) {
    if (!obj) {
        return;
    }
    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            const search = findByUrlName(obj[i], query);
            if (search) {
                return search;
            }
        }
    } else if (obj.urlName === query) {
        return obj;
    } else {
        return findByUrlName(obj.modules, query) ||
            findByUrlName(obj.methods, query) ||
            findByUrlName(obj.properties, query) ||
            findByUrlName(obj.projects, query);
    }
}

export function injectUrlPaths(obj: Object) {
    for (let i = 0; i < obj.projects.length; i++) {
        recurseInjectUrlPaths(obj.projects[i]);
    }
    return obj;
}

export function getDocs() {
    var rawContent = document.querySelector('meta[name="docs-content"]').getAttribute('content');
    return injectUrlPaths(JSON.parse(decodeURIComponent(rawContent)));
}

export default {};