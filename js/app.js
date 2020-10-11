// @TODO: YOUR CODE HERE!

d3.csv("data/data.csv").then(function(data) {

    console.log(data);

    //create a scatter plot between two of the data 
    //variables such as Healthcare vs. Poverty or Smokers vs. Age.
    // income vs. obesity

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 660 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3.scaleLinear()
    .domain([30000, 80000])
    .range([ 0, width ]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 45])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    var dots = svg.append('g')
                    .selectAll("dot")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("class", "dot")
                    .attr("cx", function (d) { return x(d.income); } )
                    .attr("cy", function (d) { return y(d.obesity); } )
                    .attr("r", 10)
                    .style("fill", "#ffcc33");

    dots.append("text")
        .text(function(d) { return d.abbr; })
        .attr("x", function(d) { return x(d.income); })
        .attr("y", function (d) { return y(d.obesity); });

});