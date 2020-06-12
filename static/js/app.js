Plotly.d3.csv("../Resources/cleaned_data.csv", function(err, rows) {

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var allStateNames = unpack(rows, 'state'),
        allParties = unpack(rows, 'party'),
        allCandidates = unpack(rows, 'candidate'),
        allVotes = unpack(rows, 'candidatevotes'),
        allYear = unpack(rows, 'year'),
        listofStates = [],
        currentState = [],
        currentYear = [],
        candidate = [],
        candidatevote = [],
        partyName = [];

    for (var i = 0; i < allStateNames.length; i++) {
        if (listofStates.indexOf(allStateNames[i]) === -1) {
            listofStates.push(allStateNames[i]);
        }
    }

    function getStateData(chosenState) {
        candidatevote = [];
        partyName = [];
        candidate = [];
        currentYear = [];
        for (var i = 0; i < allStateNames.length; i++) {
            if (allStateNames[i] === chosenState) {
                candidatevote.push(allVotes[i]);
                partyName.push(allParties[i]);
                candidate.push(allCandidates[i]);
                currentYear.push();
            }
        }
    };

    // Default State Data
    setPiePlot('Alabama');

    function setPiePlot(chosenState) {
        getStateData(chosenState);


        var pieTrace = {
            values: candidatevote,
            labels: partyName,
            marker: {
                'colors': [
                    'red',
                    'blue',
                    'green',
                    'yellow',
                    'purple',
                    'orange',
                    'brown',
                    'black',
                    'grey',
                    'pink'
                ]
            },
            hovertext: candidate,
            // hoverinfo: 'hovertext',
            type: 'pie'
        };

        var pieLayout = {
            title: "Presidential Candidate Data",
            legend: {
                'x': .75,
                'y': 0,
                'orientation': 'h'
            }
        };

        // var pieID = document.getElementById('pie');
        Plotly.plot('pie', [pieTrace], pieLayout);

    };

    var stateSelector = document.querySelector("#selDatasetstate");


    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length; i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }

    assignOptions(listofStates, stateSelector);

    function updateState() {
        setPiePlot(stateSelector.value);
    }



    stateSelector.addEventListener('change', updateState, false);

});



d3.select("#selYear").on("change", test)
d3.select("#selDatasetstate").on("change", test)

async function test() {

    var data = await d3.csv("../Resources/cleaned_data.csv")


    var year = d3.select("#selYear").node().value;
    console.log(year);
    var state = d3.select("#selDatasetstate").node().value;
    console.log(state);



    var filteredData = data.filter(d => d.year === year && d.state === state && d.party !== "");
    console.log(filteredData);

    var candidatevotes = filteredData.map(d => +d.candidatevotes)
        // console.log(`Candidate Votes: ${candidatevotes}`)

    var candidates = filteredData.map(d => d.candidate)
        // console.log(`Candidates: ${candidates}`)

    var parties = filteredData.map(d => d.party)
        // console.log(`Party: ${parties}`)





    Plotly.restyle("pie", "values", [candidatevotes]);
    Plotly.restyle("pie", "labels", [parties]);
    // Plotly.restyle("pie", "title", [state]);

};