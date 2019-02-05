const d3 = require('d3')
const topojson = require('topojson')
const queue = require('queue')

(function() {

  const width = 960,
        height = 600;

  const svg = d3.select("#graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const projection = d3.geo.albersUsa()
    .scale(1280)
    .translate([width/2, height/2]),
    path = d3.geo.path().projection(projection);

  const stateIdMap = d3.map({
  })

  queue()
    .defer(d3.json, "us.json")
    .await(function(err, US) {
        const states = svg.append("g")
          .attr("class", "states")
          .selectAll("g")
          data(topojson.feature(US, US.objects.states).features)
          .enter()
          .append("g");

        states.append("path")
          .attr("d", path)
      })

})
