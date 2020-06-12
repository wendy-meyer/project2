const dropdownMenu = d3.select("#selYear");
const yearSel = dropdownMenu.property("value");
// const StatedropdownMenu = d3.select("#selDatasetstate");
// const stateSel = StatedropdownMenu.property("value");

graphit(2012,'/getStateData/Alabama/');

d3.selectAll("#selYear").on("change", getData);
d3.selectAll("#selDatasetstate").on("change", getData);

function getData() {
    var dropdownMenu = d3.select("#selYear");
    var yearSel = dropdownMenu.property("value");
    var StatedropdownMenu = d3.select("#selDatasetstate");
    var urlSel = StatedropdownMenu.property("value");
    graphit(yearSel, urlSel);
}

function graphit(yearSel, urlSel) {
    Plotly.d3.json(urlSel.concat(yearSel), (err, rows) => {
        //Filter the data by the dropdown selections
        const data = rows.filter(r => (r.party !== null));

        const trace = [{
            type: 'pie',
            values: data.map(d => d.candidatevotes),
            labels: data.map(d => d.party),
            hovertext: data.map(d => d.candidate),
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
            height: 500,
            legend: {
                'x': .75,
                'y': 0,
                'orientation': 'h'
            }
        }
        const trace2 = [{
            type: 'bar',
            x: data.map(d => d.countYear),
            y: data.map(d => d.countTotal)
        }]
        const layout2 = {
            autosize: true,
            title: "Total Number of Votes Per Year",
            width: 400,
            height: 500,
            xaxis: {
                type: 'category'
            },
            yaxis: {
                automargin: true
              }
        }

        Plotly.newPlot('pie', trace, layout1)
        Plotly.newPlot('bar', trace2, layout2)
    })
}