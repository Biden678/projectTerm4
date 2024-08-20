import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

const ProductChart = () => {
  const [chartData, setChartData] = useState({ labels: [], totalQuantity: [] });
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //http://localhost:5044/api/Product
        // const response = await fetch('http://localhost:9999/api/orderitems');
        // const productData = await response.json();

        //http://localhost:5044/api/Order
        const orderResponse = await fetch('http://localhost:9999/api/orderitems');
        const orderData = await orderResponse.json();

        // Filter orders from the last month
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const filteredOrders = orderData.filter(order => new Date(order.date) >= lastMonth);

        // Count the occurrences of each product in the orders
        const productQuantities = {};
        filteredOrders.forEach(order => {
          const productName = order?.item; // Assuming product name is stored in type_Insurance
          productQuantities[productName] = (productQuantities[productName] || 0) + 1;
        });

        // Sort products based on total quantity sold
        const sortedProducts = Object.entries(productQuantities)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5);

        // Separate the labels and totalQuantity for chart
        const labels = sortedProducts.map(([productName]) => productName);
        const totalQuantity = sortedProducts.map(([, quantity]) => quantity);

        setChartData({ labels, totalQuantity });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Destroy the existing chart instance
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create or update the chart when chartData changes
    const ctx = document.getElementById('productChart').getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
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
      <h2>Product Chart</h2>
      <canvas id="productChart" width="400" height="200"></canvas>
    </div>
  );
};

export default ProductChart;
