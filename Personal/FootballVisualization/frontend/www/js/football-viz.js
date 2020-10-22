// Shorthand for $( document ).ready()
$(function() {

    const height = 500;
    const width = 1000;
    const margin = { top: 30, right: 30, bottom: 30, left: 50};

    var dataset;
    var today = null;

    var myOptions = {
        "0": "Pass Completion Pct",
        "1": "Passing TD Pct",
        "2": "Pass Intercept Pct",
        "3": "Yds Per Pass Attempt"
    };

    var index1 = "0";
    var title1 = myOptions[index1];
    var index2 = "0";
    var title2 = myOptions[index2];

    $("#verticalAxisSelection").change(function () {
        index1 = this.value;
        title1 = this.options[this.selectedIndex].text;
        drawVisual();
    });

    $.each(myOptions, function (val, text) {
        $('#verticalAxisSelection').append(
            $('<option></option>').val(val).html(text)
        );
    });

    $("#horizontalAxisSelection").change(function () {
        index2 = this.value;
        title2 = this.options[this.selectedIndex].text;
        drawVisual();
    });

    $.each(myOptions, function (val, text) {
        $('#horizontalAxisSelection').append(
            $('<option></option>').val(val).html(text)
        );
    });

    function getPlayerField(d, index) {

        switch (index) {
            case "0":
                return +d.PassCompletionPct;
            case "1":
                return +d.PassingTDPct;
            case "2":
                return +d.PassInterceptPct;
            case "3":
                return +d.YdsPerPassAttempt;
        }
    }

    function rowConverter(d) {
        return {
            name: d.Player,
            x: getPlayerField(d, index1),
            y: getPlayerField(d, index2)
        };
    }

    function drawVisual() {
        fetch('http://localhost:80/api/QBStats')
            .then((resp) => resp.json())
            .then(function (data) {

                today = data.Date;
                $('#dataObtained').html('Data read: ' + today);

                dataset = data.Stats.map(rowConverter)

                x_scale = d3.scaleLinear()
                    .domain(d3.extent(dataset, d => d.x)).nice()
                    .range([margin.left, width - margin.right]);

                y_scale = d3.scaleLinear()
                    .domain(d3.extent(dataset, d => d.y)).nice()
                    .range([height - margin.bottom, margin.top]);

                xAxis = g => g
                    .attr("transform", `translate(0,${height - margin.bottom})`)
                    .call(d3.axisBottom(x_scale).ticks(width / 80));

                yAxis = g => g
                    .attr("transform", `translate(${margin.left},0)`)
                    .call(d3.axisLeft(y_scale));

                grid = g => g
                    .attr("stroke", "white")
                    .attr("stroke-opacity", 0.2)
                    .call(g => g.append("g")
                        .selectAll("line")
                        .data(x_scale.ticks())
                        .enter()
                        .append("line")
                        .attr("x1", d => 0.5 + x_scale(d))
                        .attr("x2", d => 0.5 + x_scale(d))
                        .attr("y1", margin.top)
                        .attr("y2", height - margin.bottom))
                    .call(g => g.append("g")
                        .selectAll("line")
                        .data(y_scale.ticks())
                        .enter()
                        .append("line")
                        .attr("y1", d => 0.5 + y_scale(d))
                        .attr("y2", d => 0.5 + y_scale(d))
                        .attr("x1", margin.left)
                        .attr("x2", width - margin.right));

                // Remove the existing SVG
                d3.select("svg").remove();

                var mysvg = d3.select("#myfigure")
                    .append("svg");

                mysvg.attr("viewBox", [0, 0, width, height]);

                mysvg.append("g")
                    .call(xAxis);

                mysvg.append("g")
                    .call(yAxis);

                mysvg.append("g")
                    .call(grid);

                mysvg.append("g")
                    .attr("fill", "brown")
                    .selectAll("ellipse")
                    .data(dataset)
                    .enter()
                    .append("ellipse")
                    .attr("cx", d => x_scale(d.x))
                    .attr("cy", d => y_scale(d.y))
                    .attr("rx", 5)
                    .attr("ry", 3)

                mysvg.append("g")
                    .attr("font-size", 10)
                    .selectAll("text")
                    .data(dataset)
                    .enter()
                    .append("text")
                    .classed("scatterplot_font", true)
                    .attr("dy", "0.35em")
                    .attr("x", d => x_scale(d.x) + 7)
                    .attr("y", d => y_scale(d.y))
                    .text(d => d.name);

                mysvg.append("text")
                    .attr("text-anchor", "middle")
                    .attr("x", width/2)
                    .attr("y", height)
                    .classed("axis_font", true)
                    .text(title2);

                mysvg.append("text")
                    .attr("text-anchor", "middle")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -margin.left + 70)
                    .attr("x", -height/2)
                    .classed("axis_font", true)
                    .text(title1)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    drawVisual();
});
