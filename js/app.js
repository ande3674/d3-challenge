d3.csv("data/data.csv").then(function(data) {

    console.log(data);

    //create a scatter plot between two of the data 
    //variables such as income vs. obesity

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 680 - margin.left - margin.right,
    height = 440 - margin.top - margin.bottom;

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
    .attr("transform", "translate(0," + (height-5) + ")")
    .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 45])
    .range([(height-5), 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    var dots = svg.append('g')
                    .selectAll(null)
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("class", "dot")
                    .attr("cx", function (d) { return x(d.income); } )
                    .attr("cy", function (d) { return y(d.obesity); } )
                    .attr("r", 15)
                    .style("fill", "#BF396A");

    var abbr = svg.append('g')
                .selectAll(null)
                .data(data)
                .enter()
                .append("text")
                .attr("class", "stateText")
                .attr("x", function (d) { return x(d.income); } )
                .attr("y", function (d) { return y(d.obesity); } )
                .text( d => d.abbr );

        // Create axes labels
    var yLabel = svg.append("text")
                      .attr("transform", "rotate(-90)")
                      .attr("y", 0 - margin.left + 10)
                      .attr("x", 0 - (height / 2))
                      .attr("dy", "1em")
                      .attr("class", "axisText")
                      .text("Obesity (%)");
  
    var xLabel = svg.append("text")
                      .attr("transform", `translate(${width / 2 - 50}, ${height + margin.top + 19})`)
                      .attr("class", "axisText")
                      .text("Income ($)");

});