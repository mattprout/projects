/* global d3 */

function barChart() {

    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = 400,
      height = 400,
      innerWidth = width - margin.left - margin.right,
      innerHeight = height - margin.top - margin.bottom,
      xValue = function (d) { return d[0]; },
      yValue = function (d) { return d[1]; },
      xScale = d3.scaleBand().padding(0.1),
      yScale = d3.scaleLinear(),
      onMouseOver = function () { },
      onMouseOut = function () { };

    function chart(selection) {
        selection.each(function (data) {

            // Select the svg element, if it exists.
            var svg = d3.select(this).selectAll("svg").data([data]);

            // Otherwise, create the skeletal chart.
            var svgEnter = svg.enter().append("svg");
            var gEnter = svgEnter.append("g");

            // Add an x-axis label
            gEnter.append("g").attr("class", "x axis")
              .append("text")
              .attr("class", "x label")
              .attr("text-anchor", "end")
              .attr("x", width / 2)
              .attr("y", 25)
              .text("Cups/Day");

            // Add a y-axis label
            gEnter.append("g").attr("class", "y axis")
              .append("text")
              .attr("class", "y label")
              .attr("text-anchor", "end")
              .attr("x", -height / 2 + 30)
              .attr("y", -30)
              .attr("dy", ".75em")
              .attr("transform", "rotate(-90)")
              .text("Count");

            innerWidth = width - margin.left - margin.right,
            innerHeight = height - margin.top - margin.bottom,

            // Update the outer dimensions.
            svg.merge(svgEnter).attr("width", width)
              .attr("height", height);

            // Update the inner dimensions.
            var g = svg.merge(svgEnter).select("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Configure range and domain for scales
            xScale.rangeRound([0, innerWidth])
              .domain(data.map(xValue));
            yScale.rangeRound([innerHeight, 0])
              .domain([0, d3.max(data, yValue)]);

            // Create x and y axis
            g.select(".x.axis")
                 .attr("transform", "translate(0," + innerHeight + ")")
                 .call(d3.axisBottom(xScale));
            g.select(".y.axis")
                .call(d3.axisLeft(yScale).ticks(d3.max(data, yValue)));

            var bars = g.selectAll(".bar")
              .data(function (d) { return d; });

            // Color scale for coffee (light to dark coffee color)
            var color_scale = d3.scaleLinear().domain([0, 6]).range([d3.rgb("#CC6600"), d3.rgb("#441100")]);

            //
            // Create new bars
            //
            var newBars = bars
                        .enter()
                        .append("rect")
                        .attr("class", "bar");

            //
            // Add tooltips to the bars
            //
            newBars.append("title")
                   .attr("class", "tooltip")
                   .text(function (d) { return d.value; })

            //
            // Merge the existing bars with the new bars
            //
            newBars.merge(bars)
                .attr("x", X)
                .attr("y", Y)
                .attr("width", xScale.bandwidth())
                .attr("height", function (d) { return innerHeight - Y(d); })
                .attr("fill", function (d) { return color_scale(d.value); })
                .on("mouseover", onMouseOver)
                .on("mouseout", onMouseOut)
                .select(".tooltip")
                .text(function (d) { return d.value; })

            bars.exit().remove();
        });

    }

    // The x-accessor for the path generator; xScale ∘ xValue.
    function X(d) {
        return xScale(xValue(d));
    }

    // The y-accessor for the path generator; yScale ∘ yValue.
    function Y(d) {
        return yScale(yValue(d));
    }

    chart.margin = function (_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
    };

    chart.width = function (_) {
        if (!arguments.length) return width;
        width = _;
        return chart;
    };

    chart.height = function (_) {
        if (!arguments.length) return height;
        height = _;
        return chart;
    };

    chart.x = function (_) {
        if (!arguments.length) return xValue;
        xValue = _;
        return chart;
    };

    chart.y = function (_) {
        if (!arguments.length) return yValue;
        yValue = _;
        return chart;
    };

    chart.onMouseOver = function (_) {
        if (!arguments.length) return onMouseOver;
        onMouseOver = _;
        return chart;
    };

    chart.onMouseOut = function (_) {
        if (!arguments.length) return onMouseOut;
        onMouseOut = _;
        return chart;
    };

    return chart;
}
