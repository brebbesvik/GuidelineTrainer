const Vertex = require('./Vertex');
const Edge = require('./Edge');

class Graph {
    constructor() {
        this._vertices = [];
        this._edges = [];
    }
    addVertex(o) {
        let vertex = new Vertex(o, this._vertices.length);
        this._vertices[vertex.getPosition()] = new Vertex(o, vertex.getPosition());
        return vertex;
    }
    addEdge(v, w, o) {
        this._vertices[v.getPosition()].increaseOutgoingEdges();
        this._vertices[w.getPosition()].increaseIncomingEdges();
        let edge = new Edge(v.getPosition(), w.getPosition(), o, this._edges.length);
        this._edges[edge.getPosition()] = new Edge(v.getPosition(), w.getPosition(), o, edge.getPosition());
        return edge;
    }
    getAdjacentVertices(v) {
        let array = [];
        for (let i=0; i<this._edges.length; i++) {
            if(this._edges[i].getOrigin() === v.getPosition()) {
                array.push(this._vertices[this._edges[i].getDestination()]);
            }
            else if (this._edges[i].getDestination() === v.getPosition())
                array.push(this._vertices[this._edges[i].getOrigin()]);
        }
        return array;
    }
    numVertices() {
        return this._vertices.length;
    }
    numEdges() {
        return this._edges.length;
    }
    getVertices() {
        return this._vertices;
    }
    getEdges() {
        return this._edges;
    }
}
module.exports = Graph;