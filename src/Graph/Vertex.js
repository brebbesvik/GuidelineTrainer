class Vertex {
    constructor(o, p) {
        this._incomingEdges = 0;
        this._outgoingEdges = 0;
        this._object = o;
        this._position = p;
    }
    getObject() {
        return this._object;
    }
    getPosition() {
        return this._position;
    }
    getIncomingEdges() {
        return this._incomingEdges;
    }
    getOutgoingEdges() {
        return this._outgoingEdges;
    }
    increaseOutgoingEdges() {
        this._outgoingEdges++;
    }
    increaseIncomingEdges() {
        this._incomingEdges++;
    }
}
module.exports = Vertex;