const Graph = require('./Graph');

class WorkflowGraph extends Graph {
    constructor() {
        super();
    }
    buildGraph(json) {
        let v = json.Task;
        let e = json.Flow;
        for (let i=0; i<v.length; i++) {
            this.addVertex(v[i].name);
        }
        for (let i=0; i<e.length; i++) {
            this.addEdge(this.getVertex(e[i].src),this.getVertex(e[i].trg), e[i].name);
        }
    }
    getVertex(name) {
        for(let i=0; i<this._vertices.length; i++) {
            if (this._vertices[i].object === name)
                return this._vertices[i];
        }
    }

}
module.exports = WorkflowGraph;