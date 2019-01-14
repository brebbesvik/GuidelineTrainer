const EntityInstanceGraph = require('../Graph/EntityInstanceGraph');
const json = require('../../Data/email');
class Template {
    constructor() {
        this._re = /<%([a-zA-Z0-9_\-.]+)%>/g;
        this._entityGraph = null;
    }
    generateEntityGraph(instance) {
        const graph = new EntityInstanceGraph();
        graph.buildGraph(json[instance]);
        this._entityGraph = graph;
    }

    _getTags(template) {
        let tags = [];
        let match;
        while ((match = this._re.exec(template))) {
            tags.push(match[1]);
        }
        return tags;
    }
    transformTemplate(template) {
        let tags = this._getTags(template);
        let tpl = template;
        for(let i=0; i<tags.length; i++) {
            let regex = new RegExp("<%" + tags[i] + "%>", "g");
            tpl = tpl.replace(regex, this._entityGraph.getTextFromPath(tags[i]));
        }
        return tpl;
    }
}
module.exports = Template;