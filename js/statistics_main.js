$(function () {
  fetch(url, {
    method: 'GET',
    headers: new Headers ({
      "X-API-Key": "dX8d821ubEXE1lay83zuuZqsl4bj4GSMK2QMgnu2"
    })
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    app.members = json.results[0].members;
    calculate(json.results[0].members);
  }).catch(function (error) {
    if (app.members == undefined) {
      console.log(error.message);
    } 
  })
});
if (x == "senate") {
  url = "https://api.propublica.org/congress/v1/113/senate/members.json";
} else {
  url = "https://api.propublica.org/congress/v1/113/house/members.json";
}
let statistics = {
                  "numberRep": 0,
                  "numberDem": 0,
                  "numberInd": 0,
                  "total": 0,
                  "least_engaged": [],
                  "most_engaged": [],
                  "least_loyal": [],
                  "most_loyal": [],
                }
function calculate(data) {
  let members = data;

  let membersRep = members.filter(filterR);
    let membersDem = members.filter(filterD);
  let membersInd = members.filter(filterI);
  // filters
  function filterR(members) {
    return members.party == "R";
  };
  function filterD(members) {
    return members.party == "D";
  };
  function filterI(members) {
    return members.party == "I";
  };
  totD = membersDem.length;
  numberDem = averageVotes(membersDem);
  totR = membersRep.length;
  numberRep = averageVotes(membersRep);
  totI = membersInd.length;
  numberInd = averageVotes(membersInd);
  totals = members.length;
  total = averageVotes(members);
  // %
  function averageVotes(array) {
    var sumVotes = 0;
    var sumPorc = 0;
    for (let i = 0; i < array.length; i++) {
      sumPorc += (array[i].total_votes * array[i].votes_with_party_pct);
      sumVotes += (array[i].total_votes);
    }
    return (array != null && array != undefined && array.length != 0) ? (sumPorc / sumVotes).toFixed(2) : 0;
  }
  statistics.totD = totD;
  statistics.totR = totR;
  statistics.totI = totI;
  statistics.totals = totals;
  statistics.numberDem = numberDem;
  statistics.numberRep = numberRep;
  statistics.numberInd = numberInd;
  statistics.total = total;

  let arrAuxEng = members;
  let mostEngaged = [];
  let leastEngaged = [];
  let arrAuxLoy = members;
  let mostLoyal = [];
  let leastLoyal = [];
  let PNecesario = (members.length * 0.1);

  function missedVotesPct(array) {
    array.sort(function (x, y) {
      return (y.missed_votes_pct - x.missed_votes_pct)
    })
  }
  function engaged(array, arrayAuxiliar) {
    while (array.length < PNecesario) {
      for (let i = array.length; i < PNecesario || arrayAuxiliar[i - 1].missed_votes_pct == arrayAuxiliar[i].missed_votes_pct; i++) {
        array.push(arrayAuxiliar[i]);
      }
    }
  }
  function missedVotesPctLessToMore(array) {
    array.sort(function (a, b) {
      return (a.missed_votes_pct - b.missed_votes_pct)
    })
  }
  function missedVotesPctMoreToLess(array) {
    array.sort(function (a, b) {
      return (b.missed_votes_pct - a.missed_votes_pct)
    })
  }
  function orderByPartyVotesPctLessToMore(array) {
    array.sort(function (a, b) {
      return (b.votes_with_party_pct - a.votes_with_party_pct)
    })
  }
  function orderByPartyVotesPctMoreToLess(array) {
    array.sort(function (a, b) {
      return (a.votes_with_party_pct - b.votes_with_party_pct)
    })
  }
  missedVotesPctLessToMore(arrAuxEng);
  engaged(mostEngaged, arrAuxEng);
  missedVotesPctMoreToLess(arrAuxEng);
  engaged(leastEngaged, arrAuxEng);
  orderByPartyVotesPctMoreToLess(arrAuxEng);
  engaged(leastLoyal, arrAuxEng);
  orderByPartyVotesPctLessToMore(arrAuxEng);
  engaged(mostLoyal, arrAuxEng);

  statistics.least_engaged = leastEngaged;
  statistics.most_engaged = mostEngaged;
  statistics.least_loyal = leastLoyal;
  statistics.most_loyal = mostLoyal;
}
var app = new Vue ({
  el: '#app',
  data: {
    members: [],
    states: [],
    checkedParties:["R","D","I"],
    selectedState: "ALL",
    statTotal: statistics,
  }
});