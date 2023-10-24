import { categories } from "../constants/categories";

export const chartData = () => {
  return {
    labels: categories,
    datasets: [
      {
        label: 'Expenses',
        data: [12, 19, 3, 5, 0, 2, 7, 8],
        backgroundColor: [
          'red',
          'blue',
          'green',
          'yellow',
          'purple',
          'gray',
          'blue',
          'blue',
        ]
      }
    ]
  }
};