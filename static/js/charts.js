//load data
queue()
    .defer(d3.json, "/topz")
    .await(makeGraphs);

function makeGraphs(error, playersJson) {
  var players = playersJson;
  console.log("players : " + playersJson);
  //create crossfilter instance
  var ndx = crossfilter(players);
  //define data dimensions
  var coeffVarDim = ndx.dimension(function(d) { return d["coeff_var"]; });
  var meanDim = ndx.dimension(function(d) { return d["mean"]; });
  var nameDim = ndx.dimension(function(d) { return d["name"]; });

  //data groups
  var all = ndx.groupAll();
  var playersByCoeffVar = coeffVarDim.group();
  var playersByMean = meanDim.group();
  var playersByName = nameDim.group();

  var minMean = meanDim.bottom(1)[0]["mean"];//bottom player, by mean
  var maxMean = meanDim.top(1)[0]["mean"];//top player, by mean
  console.log("var : " + maxMean);

  // var meanChart = dc.bubbleChart("#mean-chart", "chartGroup");

  // meanChart
  //     .width(990) //(optional) define chart width, :default = 200
  //     .height(250) // (optional) define chart height, :default = 200
  //     .margins({top: 10, right: 50, bottom: 30, left: 50})
  //     .transitionDuration(1500) // (optional) define chart transition duration, :default = 750
  //     .margins({top: 10, right: 50, bottom: 30, left: 40})
  //     .dimension(meanDim)
  //     .group(playersByMean)
  //     .colors(colorbrewer.RdYlGn[9])
  //     .colorDomain([-500, 500])
  //     .colorAccessor(function (d) {
  //           return d.value.absGain;
  //       });

  var meanChart = dc.rowChart("#mean-chart");

  meanChart
      .width(500)
      .height(350)
      .margins({top: 20, left: 10, right: 10, bottom: 20})
      .group(playersByName)
      .dimension(coeffVarDim)
      .title(function (d) {
            return d.value;
        })
      .elasticX(true)
      .xAxis().ticks(4);

  dc.renderAll();

};
