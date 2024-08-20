import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

const ProductSummaryYear = () => {
  const [chartData, setChartData] = useState({ labels: [], totalQuantity: [] });
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch order items
        const orderResponse = await fetch('http://localhost:9999/api/orderitems');
        const orderData = await orderResponse.json();

        // Initialize an array to store the total quantity for each month
        const monthlyData = new Array(12).fill(0);

        // Get the current date
        const currentDate = new Date();

        // Process the order data
        orderData.forEach(order => {
          const orderDate = new Date(order.date);
          const monthsDifference = (currentDate.getFullYear() - orderDate.getFullYear()) * 12 + (currentDate.getMonth() - orderDate.getMonth());

          // Check if the order is within the last 12 months
          if (monthsDifference < 12) {
            monthlyData[11 - monthsDifference] += order.qty; // Adjust 'order.quantity' based on your order structure
          }
        });

        // Prepare labels for the past 12 months
        const labels = [];
        for (let i = 11; i >= 0; i--) {
          const date = new Date();
          date.setMonth(currentDate.getMonth() - i);
          labels.push(date.toLocaleString('default', { month: 'short', year: 'numeric' }));
        }

        setChartData({ labels, totalQuantity: monthlyData });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Destroy the existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create or update the chart when chartData changes
    const ctx = document.getElementById('productSummaryYearChart').getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Total Quantity',
            data: chartData.totalQuantity,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  }, [chartData]);

  return (
    <div>
      <h2>Product Sales Summary for the Last 12 Months</h2>
      <canvas id="productSummaryYearChart" width="400" height="200"></canvas>
    </div>
  );
};

export default ProductSummaryYear;
