import React, { Component } from 'react';
import {View, WebView} from 'react-native';
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
    requirements: state.progressReducer.requirements
});

class ChartComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const web = ()=> {
            let scores = this.props.scores;
            let labels = "[";
            let numbers = "[";
            let requirements = "[";
            for (let i=0; i<scores.length; i++) {
                labels += "'"+scores[i].getDiscipline();
                numbers += ""+scores[i].getScore();
                requirements += ""+this.props.requirements[scores[i].getDiscipline()];
                if (i+1<scores.length) {
                    labels+="',";
                    numbers+=",";
                    requirements+=",";
                }
            }
            labels+="']";
            numbers+="]";
            requirements+="]";
            console.log("Labels" + labels);
            console.log("Numbers" + numbers);
            console.log("Requirements" + requirements);
          return (<WebView
                  originWhitelist={['*']}
                  source={{html: '<script src="https://code.highcharts.com/highcharts.js"></script>\n' +
                          '<script src="https://code.highcharts.com/modules/exporting.js"></script>\n' +
                          '<script src="https://code.highcharts.com/modules/export-data.js"></script>\n' +
                          '<div id="container" style="min-width: 300px; width: 100%; height: 100%; margin: 0 auto"></div>\n'+
                          '<script>\n' +
                          'Highcharts.chart(\'container\', {\n' +
                          '    chart: {\n' +
                          '        zoomType: \'xy\'\n' +
                          '    },\n' +
                          '    title: {\n' +
                          '        text: null\n' +
                          '    },\n' +
                          '    subtitle: {\n' +
                          '        text: null\n' +
                          '    },\n' +
                          '    exporting: {\n' +
                          '        enabled: false\n' +
                          '    },\n' +
                          '    credits: {\n' +
                          '        enabled: false\n' +
                          '    },\n' +
                          '    xAxis: [{\n' +
                          '        categories: '+ labels +',\n' +
                          '        crosshair: true\n' +
                          '    }],\n' +
                          '    yAxis: [{ // Primary yAxis\n' +
                          '        labels: {\n' +
                          '            style: {\n' +
                          '                color: Highcharts.getOptions().colors[1]\n' +
                          '            }\n' +
                          '        },\n' +
                          '        title: {\n' +
                          '            text: \'Points\',\n' +
                          '            style: {\n' +
                          '                color: Highcharts.getOptions().colors[1]\n' +
                          '            }\n' +
                          '        }\n' +
                          '    }],\n' +
                          '    tooltip: {\n' +
                          '        shared: true\n' +
                          '    },\n' +
                          '    legend: {\n' +
                          '        layout: \'vertical\',\n' +
                          '        align: \'right\',\n' +
                          '        verticalAlign: \'top\',\n' +
                          '        y: 70,\n' +
                          '        enabled: false\n' +
                          '    },\n' +
                          '    series: [{\n' +
                          '        name: \'Quiz score\',\n' +
                          '        type: \'column\',\n' +
                          '        data: '+ numbers +',\n' +
                          '    }, {\n' +
                          '        name: \'Passing score\',\n' +
                          '        type: \'spline\',\n' +
                          '        data: '+ requirements +',\n' +
                          '        color: Highcharts.getOptions().colors[8]\n' +
                          '    }]\n' +
                          '});' +
                          '</script>'
                  }}
              />
          );
        };
        return (
        <View style={{ height: 250, width: '100%',overflow:'hidden' }}>
            {web()}
        </View>
        );
    }
}
export default connect(mapStateToProps) (ChartComponent);