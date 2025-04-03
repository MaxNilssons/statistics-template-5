import addMdToPage from './libs/addMdToPage.js';
import dbQuery from './libs/dbQuery.js'; // 👈 den här saknas!
import drawGoogleChart from './libs/drawGoogleChart.js';




let depressionValues = await dbQuery(`
  SELECT depression 
  FROM result_new;
`);


let histogramBins = Array(10).fill(0);

depressionValues.forEach(row => {
  let index = Math.floor(row.depression * 10);
  if (index === 10) index = 9;
  histogramBins[index]++;
});

let chartData = [['Depressionsnivå (grupp)', 'Antal']];
for (let i = 0; i < 10; i++) {
  let label = `${(i / 10).toFixed(1)} - ${(i / 10 + 0.1).toFixed(1)}`;
  chartData.push([label, histogramBins[i]]);
}


addMdToPage('### Histogram: Fördelning av depression');
drawGoogleChart({
  type: 'ColumnChart',
  data: chartData,
  options: {
    title: 'Fördelning av depression bland studenter',
    hAxis: { title: 'Depressionsnivå' },
    vAxis: { title: 'Antal studenter' },
    height: 400,
    bar: { groupWidth: '90%' },
    legend: 'none'
  }
});
