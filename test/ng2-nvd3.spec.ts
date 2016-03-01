import {bootstrap} from 'angular2/platform/browser';
import {Component, OnInit} from 'angular2/core';
import {nvD3} from '../lib/ng2-nvd3';

declare let describe, beforeEach, it, expect, d3: any;
declare let currentChartType: string;
const chartTypes = [
  'lineChart',
  'discreteBarChart',
  'pieChart',
  'scatterChart',
  'multiBarChart',
  'multiBarHorizontalChart',
  'candlestickBarChart',
  'ohlcBarChart',
  'boxPlotChart',
  'multiChart',
  'sunburstChart',
  'stackedAreaChart'
];

//
// Define Main Component
//
@Component({
  selector: 'main',
  directives: [nvD3],
  template: `
    <div>
      <h1 class="type">{{options.chart.type}}</h1>
      <nvd3 [options]="options" [data]="data"></nvd3>
    </div>
  `
})

class Main {
  options;
  data;
  ngOnInit(){
    this.options = allOptions[currentChartType];
    this.data = allData[currentChartType];
  }
}

//
// Define Tests
//
const prepare = () => {
  document.body.innerHTML = '';

  let main = document.createElement('main');
  main.setAttribute('class', 'main')
  document.body.appendChild(main);
}

const runTests = () => {
  describe('ng2-nvd3 tests:', () => {

    beforeEach(prepare);

    it('true is true', () => {
      expect(true).toEqual(true)
    });

    it('main element should be created', () => {
      expect(document.querySelectorAll('.main').length).toEqual(1);
    })

    chartTypes.forEach((type) => {
      it(type + ' chart type should be created correctly', (done) => {
        currentChartType = type;
        bootstrap(Main)
          .then((main) => {
            let options = main.instance.options;
            let h1 = document.querySelector('.type');
            expect(h1.textContent).toEqual(options.chart.type);

            let nvd3 = document.querySelector('nvd3');
            expect(nvd3).toBeDefined();

            let svg = nvd3.querySelector('svg');
            expect(svg).toBeDefined();
            expect(svg.getAttribute('height')).toEqual(options.chart.height + 'px');

            done();
          })
          .catch(err => console.error(err));
      })
    });

  });
}

runTests();

//
// Options and Data definitions
//
const allOptions = {
  lineChart:{
    chart: {
      type: 'lineChart',
      height: 450,
      x: function(d){ return d.x; },
      y: function(d){ return d.y; }
    }
  },
  discreteBarChart: {
    chart: {
      type: 'discreteBarChart',
      height: 450,
      x: function(d){return d.label;},
      y: function(d){return d.value;}
    }
  },
  pieChart: {
    chart: {
      type: 'pieChart',
      height: 500,
      x: function(d){return d.key;},
      y: function(d){return d.y;}
    }
  },
  scatterChart: {
    chart: {
      type: 'scatterChart',
      height: 450
    }
  },
  multiBarChart: {
    chart: {
      type: 'multiBarChart',
      height: 450,
      stacked: true
    }
  },
  candlestickBarChart: {
    chart:{
      type: 'candlestickBarChart',
      height: 450,
      x: function(d){ return d['date']; },
      y: function(d){ return d['close']; }
    }
  },
  ohlcBarChart: {
    chart: {
      type: 'ohlcBarChart',
      height: 450,
      x: function(d){ return d['date']; },
      y: function(d){ return d['close']; }
    }
  },
  boxPlotChart: {
    chart: {
      type: 'boxPlotChart',
      height: 450,
      x: function(d){return d.label;}
    }
  },
  multiChart: {
    chart: {
      type: 'multiChart',
      height: 450
    }
  },
  sunburstChart: {
    chart: {
      type: 'sunburstChart',
      height: 450
    }
  },
  stackedAreaChart: {
    chart: {
      type: 'stackedAreaChart',
      height: 450,
      x: function(d){return d[0];},
      y: function(d){return d[1];}
    }
  },
  multiBarHorizontalChart: {
    chart: {
      type: 'multiBarHorizontalChart',
      height: 450,
      x: function(d){return d.label;},
      y: function(d){return d.value;}
    }
  }
}

const allData = {
  lineChart: [
    { key: 'key1', values: [{x: 0, y: 0},{x: 1, y: 1}] },
    { key: 'key2', values: [{x: 1, y: 1},{x: 0, y: 0}] }
  ],
  discreteBarChart: [
    {
      key: "Cumulative Return",
      values: [
        { "label" : "A" , "value" : 10 },
        { "label" : "B" , "value" : 20 }
      ]
    }
  ],
  pieChart: [
    { key: "One", y: 5 },
    { key: "Two", y: 2 }
  ],
  scatterChart: [
    { key: 'key1', values: [{x: 0, y: 0},{x: 1, y: 1}] },
    { key: 'key2', values: [{x: 1, y: 1},{x: 0, y: 0}] }
  ],
  multiBarChart: [
    {
      key: 'Sent',
      values: [{x: 0, y: 1}, {x: 1, y: 2}]
    },
    {
      key: 'Received',
      values: [{x: 0, y: 2}, {x: 1, y: 3}]
    },
    {
      key: 'Spam',
      values: [{x: 0, y: 3}, {x: 1, y: 5}]
    }
  ],
  candlestickBarChart: [{
    values: [
      {"date": 15854, "open": 165.42, "high": 165.8, "low": 164.34, "close": 165.22, "volume": 160363400, "adjusted": 164.35},
      {"date": 15855, "open": 165.35, "high": 166.59, "low": 165.22, "close": 165.83, "volume": 107793800, "adjusted": 164.96}
    ]}
  ],
  ohlcBarChart: [{
    values: [
      {"date": 15707, "open": 145.11, "high": 146.15, "low": 144.73, "close": 146.06, "volume": 192059000, "adjusted": 144.65},
      {"date": 15708, "open": 145.99, "high": 146.37, "low": 145.34, "close": 145.73, "volume": 144761800, "adjusted": 144.32},
    ]}
  ],
  boxPlotChart: [
    {
      label: "Sample A",
      values: {
        Q1: 180,
        Q2: 200,
        Q3: 250,
        whisker_low: 115,
        whisker_high: 400,
        outliers: [50, 100, 425]
      }
    }
  ],
  multiChart: [
    {
      key: 'Stream1',
      type: 'area',
      yAxis: 1,
      values: [{x: 0, y: 1}, {x: 1, y: 2}]
    },
    {
      key: 'Stream2',
      type: 'area',
      yAxis: 1,
      values: [{x: 0, y: 2}, {x: 1, y: 3}]
    },
    {
      key: 'Stream3',
      type: 'line',
      yAxis: 1,
      values: [{x: 0, y: 3}, {x: 1, y: 5}]
    },
    {
      key: 'Stream4',
      type: 'line',
      yAxis: 2,
      values: [{x: 0, y: 3}, {x: 1, y: 5}]
    },
    {
      key: 'Stream4',
      type: 'bar',
      yAxis: 2,
      values: [{x: 0, y: 3}, {x: 1, y: 5}]
    }
  ],
  sunburstChart: [{
    "name": "flare",
    "children": [
      {
        "name": "analytics",
        "children": [
          {
            "name": "cluster",
            "children": [
              {"name": "AgglomerativeCluster", "size": 3938},
              {"name": "CommunityStructure", "size": 3812},
              {"name": "HierarchicalCluster", "size": 6714},
              {"name": "MergeEdge", "size": 743}
            ]
          },
          {
            "name": "graph",
            "children": [
              {"name": "BetweennessCentrality", "size": 3534},
              {"name": "LinkDistance", "size": 5731},
              {"name": "MaxFlowMinCut", "size": 7840},
              {"name": "ShortestPaths", "size": 5914},
              {"name": "SpanningTree", "size": 3416}
            ]
          },
          {
            "name": "optimization",
            "children": [
              {"name": "AspectRatioBanker", "size": 7074}
            ]
          }
        ]
      }
    ]
  }],
  stackedAreaChart: [
    {
      "key" : "North America" ,
      "values" : [ [ 1025409600000 , 23.041422681023] , [ 1028088000000 , 19.854291255832] ]
    },
    {
      "key" : "Africa" ,
      "values" : [ [ 1025409600000 , 7.9356392949025] , [ 1028088000000 , 7.4514668527298] ]
    }
  ],
  multiBarHorizontalChart: [
    {
      "key": "Series1",
      "values": [
        {
          "label" : "Group A" ,
          "value" : -1.8746444827653
        } ,
        {
          "label" : "Group B" ,
          "value" : -8.0961543492239
        }
      ]
    },
    {
      "key": "Series2",
      "values": [
        {
          "label" : "Group A" ,
          "value" : 25.307646510375
        } ,
        {
          "label" : "Group B" ,
          "value" : 16.756779544553
        }
      ]
    }
  ]
}
