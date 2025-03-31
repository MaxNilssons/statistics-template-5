import addMdToPage from './libs/addMdToPage.js';
import dbQuery from './libs/dbQuery.js';
import tableFromData from './libs/tableFromData.js';
import drawGoogleChart from './libs/drawGoogleChart.js';

addMdToPage('## Academic pressure and depression');

// 🔹 Hämta data
let pressureAndDepression = await dbQuery(`
  SELECT academicPressure, ROUND(AVG(depression), 2) as depressionRate, COUNT(*) as total 
  FROM result_new 
  GROUP BY academicPressure 
  ORDER BY academicPressure;
`);

// 🔹 Visa tabell
tableFromData({ data: pressureAndDepression });

// 🔹 Bygg Google Chart-data
let pressureChartData = [['Academic Pressure', 'Depression Rate']];
pressureAndDepression.forEach(row => {
  if (row.academicPressure !== null && row.depressionRate !== null) {
    pressureChartData.push([
      parseFloat(row.academicPressure),
      parseFloat(row.depressionRate)
    ]);
  }
});

// 🔹 Rita diagram
addMdToPage('### Diagram: Academic Pressure and Depression');
drawGoogleChart({
  chartType: 'LineChart',
  data: pressureChartData,
  options: {
    title: 'Academic Pressure vs Average Depression',
    hAxis: { title: 'Academic Pressure (0–5)' },
    vAxis: { title: 'Depression Rate' },
    pointSize: 5,
    height: 500,
    curveType: 'function',
    legend: 'none'
  }
});
