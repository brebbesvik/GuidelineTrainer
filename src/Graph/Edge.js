class Edge {
    constructor(v, w, o, p) {
        this._object = o;
        this._origin = v;
        this._destination = w;
        this._position = p;
    }
    getPosition() {
        return this._position;
    }

    getObject() {
        return this._object;
    }

    getOrigin() {
        return this._origin;
    }

    getDestination() {
        return this._destination;
    }
}
module.exports = Edge;