import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const CustomerSummary = () => {
  const [customerData, setCustomerData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        //http://localhost:5044/api/Users
        const response = await fetch('');
        const userData = await response.json();

        setCustomerData(userData.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCustomerData();
  }, []);

  const calculateMonthlyRegistrations = () => {
    const monthlyRegistrations = Array(12).fill(0);

    customerData.forEach((user) => {
      const registrationDate = new Date(user.createAt);
      const month = registrationDate.getMonth();
      monthlyRegistrations[month]++;
    });

    return monthlyRegistrations;
  };

  const renderChart = (data) => {
    const ctx = document.getElementById('customerChart').getContext('2d');

    if (chartInstance) {
      chartInstance.destroy();
    }

    const newChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
        datasets: [{
          label: 'Customer Registrations',
          data,
          backgroundColor: data.map(count => (count > 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 255, 255, 0)')),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0,
          },
        },
      },
    });

    setChartInstance(newChartInstance);
  };

  useEffect(() => {
    if (customerData.length > 0) {
      renderChart(calculateMonthlyRegistrations());
    }
  }, [customerData]);

  return (
    <div>
      <h2>Customer Registrations by Month</h2>
      <canvas id="customerChart" width="400" height="200"></canvas>
    </div>
  );
};

export default CustomerSummary;
