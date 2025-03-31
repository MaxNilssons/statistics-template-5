import addMdToPage from './libs/addMdToPage.js';
import dbQuery from './libs/dbQuery.js';
import tableFromData from './libs/tableFromData.js';
import drawGoogleChart from './libs/drawGoogleChart.js';

addMdToPage('## Dietary habits and depression');

// 🥗 Hämta data
let dietaryDepression = await dbQuery(`
  SELECT dietaryHabits, ROUND(AVG(depression), 2) as depressionRate, COUNT(*) as total 
  FROM result_new 
  GROUP BY dietaryHabits 
  ORDER BY dietaryHabits;
`);

// 🥗 Visa tabell
tableFromData({ data: dietaryDepression });

// 🥗 Förbered chart-data
let dietChartData = [['Dietary Habits', 'Depression Rate']];
dietaryDepression.forEach(row => {
  if (row.dietaryHabits !== null && row.depressionRate !== null) {
    dietChartData.push([
      parseInt(row.dietaryHabits),
      parseFloat(row.depressionRate)
    ]);
  }
});

// 🥗 Rita diagram
addMdToPage('### Diagram: Dietary Habits and Depression');
drawGoogleChart({
  chartType: 'ColumnChart',
  data: dietChartData,
  options: {
    title: 'Dietary Habits and Average Depression',
    hAxis: {
      title: 'Diet Quality (1=Unhealthy, 3=Healthy)',
      format: '0',
      gridlines: { count: 3 }
    },
    vAxis: {
      title: 'Depression Rate'
    },
    bar: { groupWidth: '20%' },
    height: 400,
    legend: 'none'
  }
});
