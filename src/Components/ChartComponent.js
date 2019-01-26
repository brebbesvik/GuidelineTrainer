import React, { Component } from 'react';
import {View, WebView} from 'react-native';
import Skill from '../Model/Skill';
class ChartComponent extends Component {
    constructor(props) {
        super(props);
    };
    skills = ()=> {
        let scores = [];
      for (let i=0; i<5; i++) {
          let score = new Skill();
          score.setScore(i+1);
          score.setDiscipline("Ja" + i);
          scores[i] = score;
      }
      return scores;
    };
    render() {
        const web = ()=> {
            let tab = this.props.scores;
            let tekst = "[";
            let tall = "[";
            for (let i=0; i<tab.length; i++) {
                tekst+="'"+tab[i].getDiscipline();
                tall+=""+tab[i].getScore();
                if (i+1<tab.length) {
                    tekst+="',";
                    tall+=",";

                }
            }
            tekst+="']";
            tall+="]";
            console.log("Tabell: "+ tekst);
            console.log("Tekst: "+ tall);
          return (<WebView
                  originWhitelist={['*']}
                  source={{html: '<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>\n' +
                          '    <script src="https://code.highcharts.com/highcharts.js"></script>\n' +
                          '    <script src="https://code.highcharts.com/highcharts-more.js"></script>\n' +
                          '    <script src="https://code.highcharts.com/modules/exporting.js"></script>\n' +
                          '    <script src="https://code.highcharts.com/modules/export-data.js"></script>' +
                          '<div id="container" style="min-width: 250px; max-width: 250px; height: 250px; margin: 0 auto"></div>\n' +
                          '<script>\n' +
                          'Highcharts.chart(\'container\', {\n' +
                          '\n' +
                          'chart: {\n' +
                          'polar: true,\n' +
                          'type: \'line\'\n' +
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
                          'size: \'45%\'\n' +
                          '},\n' +
                          '\n' +
                          'xAxis: {\n' +
                          'categories: ' + tekst +',\n' +
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
                          '        data: '+ tall + ',\n' +
                          '        pointPlacement: \'on\'\n' +
                          '    }]\n' +
                          '\n' +
                          '});\n' +
                          '</script>'}}
              />
          );
        };
        return (
        <View style={{ height: 250, width: 300,overflow:'hidden' }}>
            {web()}
        </View>
        );
    }
}
export default ChartComponent;