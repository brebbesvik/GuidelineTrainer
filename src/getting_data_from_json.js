let json = require('../guideline_data/asthma');
//console.log(json);

function print_vertices() {
    for (i=0; i<json["entity-model"].vertex.length; i++)
        console.log(json["entity-model"].vertex[i].name);
}

function print_patient() {
    let patient = json["entity-instance1"].vertex[0].name;
    console.log(patient);
}

print_patient();

