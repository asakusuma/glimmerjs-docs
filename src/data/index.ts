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