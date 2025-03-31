import addMdToPage from './libs/addMdToPage.js';
import dbQuery from './libs/dbQuery.js';
import tableFromData from './libs/tableFromData.js';
import drawGoogleChart from './libs/drawGoogleChart.js';

addMdToPage('## Sleep and depression');

// 🟢 Hämta data utan null
let allStudents = await dbQuery(`
  SELECT sleepDuration, ROUND(AVG(depression), 2) as avgDepression
  FROM result_new
  WHERE sleepDuration IS NOT NULL
  GROUP BY sleepDuration
  ORDER BY sleepDuration;
`);

// 🟢 Visa tabell om data finns
if (allStudents.length > 0) {
  tableFromData({ data: allStudents });

  // 🟢 Bygg Google Chart-data
  let sleepChartData = [['Sleep Duration (hours)', 'Average Depression']];
  allStudents.forEach(row => {
    sleepChartData.push([
      parseFloat(row.sleepDuration),
      parseFloat(row.avgDepression)
    ]);
  });
  console.log('📊 sleepChartData:', sleepChartData);

  addMdToPage('### Diagram: Sleep Duration and Depression');
  drawGoogleChart({
    chartType: 'lineChart',
    data: sleepChartData,
    options: {
      title: 'Sleep Duration vs Average Depression',
      hAxis: { title: 'Sleep Duration in hours' },
      vAxis: { title: 'Avg Depression' },
      pointSize: 5,
      curveType: 'function',
      legend: 'none',
      height: 500
    }
  });
}
