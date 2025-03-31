import addMdToPage from './libs/addMdToPage.js';
import dbQuery from './libs/dbQuery.js';
import tableFromData from './libs/tableFromData.js';
import drawGoogleChart from './libs/drawGoogleChart.js';

addMdToPage('## Gender and depression');


let genderDepression = await dbQuery(`
  SELECT gender, ROUND(AVG(depression), 2) as depressionRate, COUNT(*) as total
  FROM result_new
  GROUP BY gender;
`);

//  Byt 0/1 mot Kvinna/Man
const genderMap = { 0: 'Kvinna', 1: 'Man' };
genderDepression.forEach(row => {
  row.gender = genderMap[row.gender] || 'Annat';
});

tableFromData({ data: genderDepression });


let genderChartData = [['Gender', 'Depression Rate']];
genderDepression.forEach(row => {
  genderChartData.push([row.gender, parseFloat(row.depressionRate)]);
});

addMdToPage('### Diagram: Gender and Depression');
drawGoogleChart({
  chartType: 'ColumnChart',
  data: genderChartData,
  options: {
    title: 'Gender vs Average Depression',
    hAxis: { title: 'Gender' },
    vAxis: { title: 'Depression Rate' },
    height: 400,
    legend: 'none',
    bar: { groupWidth: '40%' }
  }
});
