var app = new Vue ({ 
	el: '#app', // elemento
	data: {
		members: [],
		states: [],
    	checkedParties:["R","D","I"],
    	selectedState: "ALL",
	},
	methods: {
		filterMembers: function() {
            return (app != undefined) ? app.members.filter(member => app.checkedParties.indexOf(member.party)>-1).filter(member => (app.selectedState === "ALL" || app.selectedState === member.state)) : null
		}
	}
});

let key = { 	
			method: 'GET',
            headers: {"X-API-Key": "dX8d821ubEXE1lay83zuuZqsl4bj4GSMK2QMgnu2"},
          };
			let senate = "https://api.propublica.org/congress/v1/115/senate/members.json";
			let house = "https://api.propublica.org/congress/v1/115/house/members.json";

function load(arr) {
	arr.forEach(i => (app.states.indexOf(i.state) === -1 ) ? app.states.push(i.state) : null); // cargar estados
	app.states.sort((x,y) => x.localeCompare(y)); 
}

const data = function (url,apiKey) { // request
		  fetch(url,apiKey).then(function(response) {
              if(response.ok) { // promesa
                return response.json(); 
              }
              throw new Error(response.statusText);
            }).then(function(json) { 
			  console.log(json);
			  app.members = json.results[0].members;
			  load(app.members);
            }).catch(function(error) { // en caso de q no sea existosa pasa al catch
              console.log(error.message);
            });
		}
