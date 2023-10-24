export const chartData = (categories: Array<string>, totals: Array<number>) => {
  return {
    labels: categories,
    datasets: [
      {
        label: 'Expenses',
        data: totals,
        backgroundColor: [
          'red',
          'blue',
          'green',
          'yellow',
          'purple',
          'gray',
          'orange',
          'pink',
        ]
      }
    ]
  }
};