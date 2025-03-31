import createMenu from './libs/createMenu.js';



createMenu('Depression i Indien', [
  { name: 'Sömn och depression', script: 'sleep-depression.js' },
  { name: 'Akademisk press', script: 'academic-pressure.js' },
  { name: 'Kostvanor', script: 'dietary-habits.js' },
  { name: 'Tidigare psykisk ohälsa', script: 'mental-history.js' },
  { name: 'Jobbnöjdhet', script: 'job-satisfaction.js' },
  { name: 'Studienöjdhet', script: 'study-satisfaction.js' },
  { name: 'CGPA och depression', script: 'cgpa-depression.js' },
  { name: 'Kön och depression', script: 'gender-depression.js' },
  { name: 'Antal timmar och depression', script: 'studyhours-depression.js' }

]);
