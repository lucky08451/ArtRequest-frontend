<template>
  <div class="chart-container">
    <Line :data="userChartData" :options="chartOptions" />
    <Line :data="orderChartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

// Register chart components
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

// Simulated data for User Count
const userChartData = ref({
  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
  datasets: [
    {
      label: '使用者人數',
      data: [100, 200, 150, 300, 250, 350],
      fill: false,
      borderColor: '#42A5F5',
      tension: 0.1,
    },
  ],
})

// Simulated data for Order Count
const orderChartData = ref({
  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
  datasets: [
    {
      label: '訂單數量',
      data: [50, 80, 60, 120, 100, 150],
      fill: false,
      borderColor: '#66BB6A',
      tension: 0.1,
    },
  ],
})

// Chart options
const chartOptions = ref({
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: '統計圖表',
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`
        },
      },
    },
  },
})
</script>

<style scoped>
.chart-container {
  max-width: 800px;
  margin: auto;
}
</style>
