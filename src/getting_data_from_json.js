let json = require('../guideline_data/asthma');
//console.log(json);


function get_vertices() {
    for (let i=0; i<json["entity-model"].vertex.length; i++)
        return son["entity-model"].vertex[i].name;
}

function get_patient() {
    let patient = json["entity-instance1"].vertex[0].name;
    return patient;
}

function get_breathing_condition() {
    let patient = json["entity-instance4"];
    for (let i=0; i<patient.vertex.length; i++) {
        if(patient.vertex[i].type==="Breathing-Condition")
            return patient.vertex[i].name.toLowerCase();
    }
}

function get_symptoms() {
    let patient = json["entity-instance4"];
    let symptoms_string = "";
    for (let i=0; i<patient.vertex.length; i++) {
        if(patient.vertex[i].name==="True")
            symptoms_string += patient.vertex[i].type +  ", ";
        else if (patient.vertex[i].type==="Oxygen saturation")
            symptoms_string += patient.vertex[i].type + " " + patient.vertex[i].name + ", ";
    }
    // Remove last ', ' and lower case
    return symptoms_string.substr(0, symptoms_string.length-2).toLowerCase();
}

export const get_description = function(){
    // Observations such as blue finger nails?
    let description = "An adult comes to the hospital with a child. The child has ";
    description += get_breathing_condition();
    description += ". After making some quik observations you find symptoms such as ";
    description += get_symptoms();
    description += ". What diagnosis would you suggest?";
    return description;
};

const get_answers = function() {
    let patient = json["entity-instance4"];
    let answers = new Array(3);
    answers[0] = ['','',''];
    answers[1] = ['','',''];
    answers[2] = ['','',''];
    for (let i=0; i<patient.vertex.length; i++) {
        if(patient.vertex[i].type === 'Severity') {
            if (patient.vertex[i].constraint.includes('Q'))
                answers[0][0] = patient.vertex[i].name;
            else if (patient.vertex[i].constraint.includes('A1'))
                answers[1][0] = patient.vertex[i].name;
            else if (patient.vertex[i].constraint.includes('A2'))
                answers[2][0] = patient.vertex[i].name;
        }
        else if (patient.vertex[i].type === 'Diagnosis-Name') {
            if (patient.vertex[i].constraint.includes('Q')) {
                answers[0][1] = patient.vertex[i].name;
                answers[0][2] = 'Correct!';
            }
            else if (patient.vertex[i].constraint.includes('A1')) {
                answers[1][1] = patient.vertex[i].name;
                answers[1][2] = 'Wrong!';
            }
            else if (patient.vertex[i].constraint.includes('A2')) {
                answers[2][1] = patient.vertex[i].name;
                answers[2][2] = 'Wrong!';
            }
        }
    }
    return answers;
};

