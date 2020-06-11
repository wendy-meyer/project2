const dropdownMenu = d3.select("#selYear");
const yearSel = dropdownMenu.property("value");
// const StatedropdownMenu = d3.select("#selDatasetstate");
// const stateSel = StatedropdownMenu.property("value");

graphit(yearSel,'Alabama');

d3.selectAll("#selYear").on("change", getData);
d3.selectAll("#selDatasetstate").on("change", getData);

function getData() {
    var dropdownMenu = d3.select("#selYear");
    var yearSel = dropdownMenu.property("value");
    var StatedropdownMenu = d3.select("#selDatasetstate");
    var stateSel = StatedropdownMenu.property("value");
    graphit(yearSel, stateSel);
}

function graphit(yearSel, stateSel) {
    Plotly.d3.csv("../Resources/cleaned_data.csv", (err, rows) => {
        //Filter out duplicate states
        const filteredStates = rows.filter((x, i) => {
            return rows.findIndex(y => x.state === y.state) === i
        });
        //Add the list of unique states to the drop down.
        const stateDropDown = document.getElementById('selDatasetstate');
        filteredStates.forEach(item => {
            const optionEle = document.createElement('option');
            optionEle.value = item.state;
            optionEle.textContent = item.state;
            stateDropDown.appendChild(optionEle);
        });
        //Filter the data by the dropdown selections
        const data = rows.filter(r => (r.state === stateSel && r.year === yearSel && r.party !== ""));
        console.log("StateSel:");
        console.log(stateSel);
        console.log(rows.filter(r => (r.state === stateSel)));

        const trace = [{
            type: 'pie',
            values: data.map(d => d.candidatevotes),
            labels: data.map(d => d.party),
            showlegend: true,
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
            }
        }]

        const layout1 = {
            autosize: true,
            title: "Presidential Candidate Data",
            width: 500,
            height: 500
        }
        const trace2 = [{
            type: 'bar',
            x: data.map(d => d.candidatevotes),
            y: data.map(d => d.candidate),
            orientation: 'h'
        }]
        const layout2 = {
            autosize: true,
            title: "Candidate Votes",
            width: 1000,
            height: 600,
            yaxis: {
                automargin: true
              }
        }

        Plotly.newPlot('pie', trace, layout1)
        Plotly.newPlot('bar', trace2, layout2)
    })
}


