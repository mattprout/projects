/* global d3, crossfilter, timeSeriesChart, barChart */

// 2015-05-01 00:43:28
var dateFmt = d3.timeParse("%Y-%m-%d %H:%M:%S");

// Time series chart of cups of coffee per day
var chartTimeline = timeSeriesChart()
  .width(1000)
  .x(function (d) { return d.key; })
  .y(function (d) { return d.value; });

// Bar chart for histogram of cups/day for selected time period
var barChartDistribution = barChart()
  .width(400)
  .height(200)
  .x(function (d) { return d.key; })
  .y(function (d) { return d.value; });

var dateFormat = d3.timeParse("%m/%d/%Y");

d3.csv("data/Data.csv",
  function (d) {
      return { key: dateFormat(d.Day), value: +d.Value };
  },
  function (err, data) {
      if (err) throw err;

      var subsetData = data;
      var coffeeDistribution = [];
      var averageCups = 0;

      //
      // Callback for when a time period is selected
      //
      chartTimeline.onBrushed(function (selected) {

          subsetData = [];
          var max = 0;
          coffeeDistribution = [];

          //
          // Get a list of the key/value pairs in the selected time period.
          // Also find the maximum value in this time period in order to set
          //  the length of the data structure to hold the count of cups/day.
          //
          for (var index = 0; index < data.length; index++) {

              if ((data[index].key >= selected[0]) && (data[index].key <= selected[1])) {

                  subsetData.push(data[index]);

                  if (data[index].value > max) {
                      max = data[index].value;
                  }
              }
          }

          //
          // Data structure to hold the count of cups/day
          //
          var coffeeCupsCount = Array(max + 1).fill(0);

          //
          // Total cups of coffee for a time period. This is used to compute the average.
          //
          var cupsCount = 0;

          //
          // Fill in the data structure that holds the count of cups/day
          //
          for (var index = 0; index < subsetData.length; index++) {
              coffeeCupsCount[subsetData[index].value]++;
              cupsCount = cupsCount + subsetData[index].value;
          }

          //
          // Compute the average cups/day
          //
          if (subsetData.length > 0) {
              averageCups = cupsCount / subsetData.length;
              averageCups = Math.round(averageCups * 10) / 10;
          }

          for (var index = 0; index < coffeeCupsCount.length; index++) {
              coffeeDistribution.push({ key: String(index), value: coffeeCupsCount[index] });
          }

          update();
      });

      // Callback for when a time period is un-selected
      chartTimeline.onBrushedDone(function (selected) {

          //
          // Clear the histogram and average cups of coffee
          //
          coffeeDistribution = [];
          averageCups = 0;

          update();
      });

      function update() {

          d3.select("#timeline")
            .datum(data)
            .call(chartTimeline);

          d3.select("#cupsCoffee")
          .datum(coffeeDistribution)
          .call(barChartDistribution);

          d3.select("#avgCupsCoffee").text("Average Cups for the Selected Range: " + String(averageCups));
      }

      update();
  }
);
