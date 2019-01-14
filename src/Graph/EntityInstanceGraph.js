const Graph = require('./Graph');

class EntityInstanceGraph extends Graph {
    constructor() {
        super();
    }
    buildGraph(json) {
        let v = json.vertex;
        let e = json.edges;
        for (let i=0; i<v.length; i++) {
            this.addVertex({name: v[i].name, type: v[i].type});
        }
        for (let i=0; i<e.length; i++) {
            if(e[i].constraint==null)
                this.addEdge(this.getVertexFromType(e[i].src), this.getVertexFromType(e[i].trg), {name: e[i].name});
            else
                this.addEdge(this.getVertexFromType(e[i].src), this.getVertexFromType(e[i].trg), {name: e[i].name, constraint: e[i].constraint});
        }
    }
    getVertexFromType(type) {
        for(let i=0; i<this._vertices.length; i++) {
            if (this._vertices[i].getObject().type === type)
                return this._vertices[i];
        }
    }
    getVertexFromName(name) {
        for(let i=0; i<this._vertices.length; i++) {
            if (this._vertices[i].getObject().name === name)
                return this._vertices[i];
        }
    }
    getEdge(origin, name) {
        for(let i=0; i<this._edges.length; i++) {
            if (this._edges[i].getObject().name === name && this._edges[i].getOrigin() === origin)
                return this._edges[i];
        }
        return null;
    }
    getEdges(origin, name) {
        let edges = [];
        for(let i=0; i<this._edges.length; i++) {
            if (this._edges[i].getObject().name === name && this._edges[i].getOrigin() === origin)
                edges.push(this._edges[i]);
        }
        return edges;
    }

    /*
    getValueFromPath(path) {
        let pathArray = path.split(".");
        let vertex = null;
        // Path refers to a vertex/source
        if (pathArray.length === 1){
            vertex = this.getVertexFromType(pathArray[0]);
        }
        // Path is complete with a source and edges
        else {
            let edge = this.getEdge(this.getVertexFromType(pathArray[0]).getPosition(), pathArray[1]);
            for (let i = 2; i < pathArray.length; i++) {
                edge = this.getEdge(edge.getDestination(), pathArray[i]);
            }
            vertex = this.vertices[edge.getDestination()];
        }
        // Return presentation vertex if there is one
        let presentationEdge = this.getEdge(vertex.getPosition(), "hasPresentation");
        return (presentationEdge==null ? vertex.getObject().name : this.vertices[presentationEdge.getDestination()].getObject().name);
    }*/
    _getVertexFromPath(path) {
        let pathArray = path.split(".");
        let vertex = null;
        let edge = null;
        for (let i = 0; i < pathArray.length; i++) {
            let v = this.getVertexFromType(pathArray[i]);
            if (v == null) {
                let edges = this.getEdges(vertex.getObject().type, pathArray[i]);
                if (edges.length === 1)
                    edge = edges[0];

                else {
                    for (let j=0; j<edges.length; j++) {
                        if (edges[j].getDestination() === pathArray[i + 1]) {
                            edge = edges[j];
                            i++;
                        }
                    }
                }
            }
            else
                vertex = v;
        }
        if (edge == null) return vertex;
        return (edge.getDestination() === vertex.getObject().type ? vertex : this.getVertices()[edge.getDestination()].getObject().name);
    }

    _getVertexPresentation(vertex){
        let edge = this.getEdge(vertex.getPosition(), 'hasMeasurement');
        if (edge == null)
            edge = this.getEdge(vertex.getPosition(), "hasPresentation");
        else
            edge =this.getEdge(edge.getDestination(), "hasPresentation");
        return (edge == null ? vertex.getObject().name : this.getVertices()[edge.getDestination()].getObject().name);

    }

    getTextFromPath(path) {
        let vertex = this._getVertexFromPath(path);
        return this._getVertexPresentation(vertex);


    }

    // Patient -> underGoesExamination -> Wheeze
}
module.exports = EntityInstanceGraph;