import axios from 'axios'

const config = {
    apiV1: "/api/v1",
    apiV2: "/api/v2",
    baseUrl: "https://hackerbot.st0n3.xyz:9000",
    baseUrlDev: "https://127.0.0.1:9101",
};

const clientV1 = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? config.baseUrlDev + config.apiV1 : config.baseUrl + config.apiV1,
    json: true,
    withCredentials: true
});

export default {
    config: {
        json: true,
        withCredentials: true,
    },
    client: {},
    initClient(baseURL = "/") {
        this.config.baseURL = baseURL
        this.client = axios.create(this.config)
    },
    exec(method, path, params, data) {
        return this.client({
            url: path, method: method, params: params, data: data
        }).then(req => {
            return req.data
        })
    },
    post(path, params, data) {
        return this.exec('post', path, params, data)
    },
    clientV2: axios.create({
        baseURL: process.env.NODE_ENV === 'development' ? config.baseUrlDev + config.apiV2 : config.baseUrl + config.apiV2,
        json: true,
        withCredentials: true
    }),
    async execute(client, method, resource, data, params) {
        return client({
            method,
            url: resource,
            params: params,
            data
        }).then(req => {
            return req.data
        })
    },
    executeClientV1(resource, method, data = {}, params = {}) {
        return this.execute(clientV1, method, resource, data, params)
    },
    listResources(resource, data = {}, params = {}, c = clientV1) {
        return this.execute(c, 'get', resource, data, params)
    },
    createResource(resource, data, c = clientV1) {
        return this.execute(c, 'post', resource, data)
    },
    deleteResource(resource, id, data, c = clientV1) {
        return this.execute(c, 'delete', resource + '/' + id, data)
    },
    updateResource(resource, id, data, c = clientV1) {
        return this.execute(c, 'put', resource + '/' + id, data)
    },
    parse_source(feed_url, c = clientV1) {
        return this.execute(c, 'post', 'sources/parse', "", {
            "feed_url": feed_url
        })
    },
    add_source(feed_url, category_id, c = clientV1) {
        return this.execute(c, 'post', 'sources', {
            "feed_url": feed_url,
            "category_id": category_id,
        })
    },
    generateCategoriesCursive(parent, categories) {
        parent.children = [];
        for (let i = 0; i < categories.length; i++) {
            let category = categories[i];
            category.parent = parseInt(category.parent);
            parent.id = parseInt(parent.id);
            if (category.parent === parent.id) {
                category.label = category.name;
                parent.children.push(category);
            }
        }
        for (let i = 0; i < parent.children.length; i++) {
            let child = parent.children[i];
            child = this.generateCategoriesCursive(child, categories);
            parent.children[i] = child;
        }
        return parent
    },
    generateDataSource(parent, categories, level) {
        let group_name = "level" + level;
        parent[group_name] = [];
        for (let i = 0; i < categories.length; i++) {
            let category = categories[i];
            category.parent = parseInt(category.parent);
            parent.id = parseInt(parent.id);
            if (category.parent === parent.id) {
                category.Name = category.name;
                category.Population = 1;
                parent[group_name].push(category);
                // parent[group_name].push({
                //     "Name": category.name,
                //     "Population": 1,
                // });
            }
        }
        for (let i = 0; i < parent[group_name].length; i++) {
            let child = parent[group_name][i];
            child = this.generateDataSource(child, categories, level + 1);
            parent[group_name][i] = child;
        }
        return parent
    },
    refreshLastUpdate() {
        return this.execute(clientV1, 'get', 'resources/last_update');
    },
    refresh() {
        return this.execute(clientV1, 'post', 'resources/refresh');
    },
    submit_comment(id, comment) {
        let data = {'comment': comment};
        return this.execute(clientV1, 'post', 'resources/comment/' + id, data)
    },
    submit_todo(id, todo, todo_type) {
        let data = {'todo': todo};
        // eslint-disable-next-line no-console
        console.log("todo_type", todo_type);
        let resource = todo_type === 0 ? 'resources' : 'todo';
        resource += '/todo/' + id;
        return this.execute(clientV1, 'post', resource, data)
    }
}
