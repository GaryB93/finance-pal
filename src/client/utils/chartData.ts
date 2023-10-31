export const chartData = (categories: Array<string>, totals: Array<number>) => {
  return {
    labels: categories,
    datasets: [
      {
        label: 'Expenses',
        data: totals,
        backgroundColor: [
          '#1a312a',
          '#204339',
          '#306454',
          '#3f826e',
          '#51a68c',
          '#4fc19f',
          '#5bdfb7',
          '#92e2ca',
        ]
      }
    ]
  }
};