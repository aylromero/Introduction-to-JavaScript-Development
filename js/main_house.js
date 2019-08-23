function tableHouse(){
    document.getElementById("house_data").innerHTML = tbody();
}
function selectState(){
    document.getElementById("states").innerHTML = availStates();
}
selectState();
tableHouse();

function selectedState() {
    return document.querySelector('#states').value;
}

function tbody(){
    let tbody = "";
    let stateF= selectedState();
    let checked = checkedBoxes();
    

    for(let i=0; i<data.results[0].num_results; i++) {
        if(checked.indexOf(data.results[0].members[i].party) > -1) {
            if(stateF === 'ALL') {
                           tbody += "<tr>" +
                                    '<td> <a href="'+ data.results[0].members[i].url +'" target="_blank">'+ data.results[0].members[i].last_name +', '+ data.results[0].members[i].first_name +'</a></td>' +
                                    "<td>" + data.results[0].members[i].party + "</td>" +
                                    "<td>" + data.results[0].members[i].state + "</td>" +
                                    "<td>" + data.results[0].members[i].seniority + "</td>" +
                                    "<td>" + data.results[0].members[i].votes_with_party_pct + "%</td>" +
                        "</tr>";              
            }else if(data.results[0].members[i].state === stateF) {

                            tbody += "<tr>" +
                                    '<td> <a href="'+ data.results[0].members[i].url +'"target="_blank">'+ data.results[0].members[i].last_name +', '+ data.results[0].members[i].first_name +'</a></td>' +
                                    "<td>" + data.results[0].members[i].party + "</td>" +
                                    "<td>" + data.results[0].members[i].state + "</td>" +
                                    "<td>" + data.results[0].members[i].seniority + "</td>" +
                                    "<td>" + data.results[0].members[i].votes_with_party_pct + "%</td>" +
                        "</tr>";              
                 } 
            } 
        } 
    return tbody
}

function checkedBoxes() {
    var values = [];
    var checked = document.querySelectorAll("input[name=party]:checked");
    for(let i=0; i<checked.length;i++) {
        values.push(checked[i].value);    
    }
return values;   // return array
}

function availStates() {
    var value= '<option value="ALL" selected>All</option>';
    let estados= [];
    
    for(let i=0;i<data.results[0].num_results;i++) {
        if(estados.indexOf(data.results[0].members[i].state) === -1) {
            estados.push(data.results[0].members[i].state);
        }
    }
    estados.sort(function(x,y) {return x.localeCompare(y)});
    for(let i=0; i<estados.length; i++) {
        value += '<option value="'+ estados[i] +'">'+ estados[i] +'</option>';
    }
    return value;
}