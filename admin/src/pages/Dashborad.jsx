import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Helper function for counting animation
const animateValue = (setValue, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    setValue(Math.floor(progress * (end - start) + start));
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

const Dashboard = () => {
  const [revenue, setRevenue] = useState(0);
  const [marketing, setMarketing] = useState(0);
  const [sales, setSales] = useState(0);
  const [subscribers, setSubscribers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [topProducts, setTopProducts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    animateValue(setRevenue, 0, 396700, 1000); // Animate revenue from 0 to 396700 in 1 second
    animateValue(setMarketing, 0, 30569, 1000); // Animate marketing from 0 to 30569 in 1 second
    animateValue(setSales, 0, 20486, 1000); // Animate sales from 0 to 20486 in 1 second
    animateValue(setSubscribers, 0, 567000, 1000); // Animate subscribers from 0 to 567000 in 1 second
    animateValue(setActiveUsers, 0, 1200, 1000); // Animate active users from 0 to 1200 in 1 second

    // Animate top products
    setTimeout(() => {
      setTopProducts([1500, 3500, 2500, 1900]);
    }, 1000);
  }, []);

  // Chart data for revenue trends
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenue',
        data: [1200, 1900, 3000, 2500, 2000, 3000, 4000],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Chart data for traffic sources (Pie chart)
  const trafficSourcesData = {
    labels: ['Direct', 'Organic Search', 'Social Media', 'Referral'],
    datasets: [
      {
        data: [300, 200, 150, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="p-0 bg-gray-50 min-h-screen">
      {/* Wrapper for scrollable dashboard content */}
      <div className="h-[80vh] overflow-y-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Dashboard</h1>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Estimated Revenue</h2>
            <p className="text-2xl sm:text-3xl font-bold text-blue-500">Rs. {revenue.toLocaleString()}</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Marketing Spend</h2>
            <p className="text-2xl sm:text-3xl font-bold text-green-500">Rs. {marketing.toLocaleString()}</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Sales Revenue</h2>
            <p className="text-2xl sm:text-2xl font-bold text-yellow-500">Rs. {sales.toLocaleString()}</p>
          </div>
        </div>

        {/* New Subscribers and Active Users */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">New Subscribers</h2>
            <p className="text-2xl sm:text-2xl font-bold text-purple-500">{subscribers.toLocaleString()}K</p>
            <p className="text-sm sm:text-base text-green-500">+3.85% than last week</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Active Users</h2>
            <p className="text-2xl sm:text-2xl font-bold text-indigo-500">{activeUsers.toLocaleString()}</p>
            <p className="text-sm sm:text-base text-green-500">+2.15% than last month</p>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Revenue Overview</h2>
          <div className="h-48 sm:h-64">
            <Line data={revenueData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Top Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topProducts.map((productSales, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-base sm:text-lg font-semibold mb-2">Product {index + 1}</h3>
                <p className="text-xl font-bold text-gray-700">Rs. {productSales}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources (Pie Chart) */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Traffic Sources</h2>
          <div className="h-48 sm:h-64">
            <Pie data={trafficSourcesData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;