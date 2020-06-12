const dropdownMenu = d3.select("#selYear");
const yearSel = dropdownMenu.property("value");
// const StatedropdownMenu = d3.select("#selDatasetstate");
// const stateSel = StatedropdownMenu.property("value");

graphit(2016,'/getStateData/Wyoming/');

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
        const filteredStates = rows.filter((x, i) => {
            return rows.findIndex(y => x.state === y.state) === i
        });
        //Filter the data by the dropdown selections
        const data = rows.filter(r => (r.party !== null));
        const filteredParty = rows.filter((x, i) => {
            return rows.findIndex(y => x.party === y.party) === i
        });
        var filteredParty2 = filteredParty.map(row =>{
            return row.party
        })

        var otherColors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF', 
        '#8A2BE2', '#F0FFFF','#7FFFD4', '#5F9EA0', '#7FFF00' ];

        var dict = {};
        filteredParty2.forEach((party, i)=> {
            dict[party] = otherColors[i];
        }
        )
        // const data = rows.filter(r => (r.state === stateSel && r.year === yearSel && r.party !== ""));
        // console.log("StateSel:");
        // console.log(stateSel);
        // console.log(rows.filter(r => (r.state === stateSel)));

        const trace = [{
            type: 'pie',
            values: data.map(d => d.candidatevotes),
            labels: data.map(d => d.party),
            hovertext: data.map(d => d.candidate),
            showlegend: true,
            marker: {
                'colors':data.map(d => {
                    if(d.party==="Democrat"){
                        return "blue"
                    }
                    else if (d.party==="Republican"){
                        return "red"
                    }
                    else {
                        return dict[d.party];
                    }})
            }
        }]

        const layout1 = {
            autosize: true,
            title: "Presidential Candidate Data",
            width: 500,
            height: 500,
            // legend: {
            //     'x': .75,
            //     'y': 0,
            //     'orientation': 'h'
            // }
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