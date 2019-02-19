import React, { Component } from 'react';
import {View, WebView} from 'react-native';
class ChartComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const web = ()=> {
            let scores = this.props.scores;
            let labels = "[";
            let numbers = "[";
            for (let i=0; i<scores.length; i++) {
                labels+="'"+scores[i].getDiscipline();
                numbers+=""+scores[i].getScore();
                if (i+1<scores.length) {
                    labels+="',";
                    numbers+=",";

                }
            }
            labels+="']";
            numbers+="]";
          return (<WebView
                  originWhitelist={['*']}
                  source={{html: '<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>\n' +
                          '    <script src="https://code.highcharts.com/highcharts.js"></script>\n' +
                          '    <script src="https://code.highcharts.com/highcharts-more.js"></script>\n' +
                          '    <script src="https://code.highcharts.com/modules/exporting.js"></script>\n' +
                          '    <script src="https://code.highcharts.com/modules/export-data.js"></script>' +
                          '<div id="container" style="min-width: 300px; width: 100%; height: 100%; margin: 0 auto"></div>\n' +
                          '<script>\n' +
                          'Highcharts.chart(\'container\', {\n' +
                          '\n' +
                          'chart: {\n' +
                          'type: \'column\'\n' +
                          '},\n' +
                          '\n' +
                          'title: {\n' +
                          'text: null,\n' +
                          'x: -80\n' +
                          '},\n' +
                          '    exporting: {\n' +
                          '        enabled: false\n' +
                          '    },\n' +
                          '    credits: {\n' +
                          '        enabled: false\n' +
                          '    },\n' +
                          'pane: {\n' +
                          'size: \'66%\'\n' +
                          '},\n' +
                          '\n' +
                          'xAxis: {\n' +
                          'categories: ' + labels +',\n' +
                          'tickmarkPlacement: \'on\',\n' +
                          'lineWidth: 0\n' +
                          '},\n' +
                          '\n' +
                          '\n' +
                          'yAxis: {\n' +
                          'gridLineInterpolation: \'polygon\',\n' +
                          'lineWidth: 0,\n' +
                          'min: 0\n' +
                          '},\n' +
                          '\n' +
                          'tooltip: {\n' +
                          'shared: true,\n' +
                          'pointFormat: \'<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>\'\n' +
                          '    },\n' +
                          '\n' +
                          '    legend: {\n' +
                          '        align: \'right\',\n' +
                          '        verticalAlign: \'top\',\n' +
                          '        y: 70,\n' +
                          '        layout: \'vertical\',\n' +
                          '        enabled: false\n' +
                          '    },\n' +
                          '\n' +
                          '    series: [{\n' +
                          '        name: \'Scores\',\n' +
                          '        data: '+ numbers + ',\n' +
                          '        pointPlacement: \'on\'\n' +
                          '    }]\n' +
                          '\n' +
                          '});\n' +
                          '</script>'}}
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
export default ChartComponent;