import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto'
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import EmployeSideBar from '../Common/EmployeSideBar';

const Dashboard: React.FC = () => {
    // Static Data
    const barChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Monthly Sales',
            data: [12, 19, 3, 5, 2, 3, 7],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
        }],
    };

    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Monthly Revenue',
            data: [400, 450, 300, 500, 400, 600, 700],
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.3,
            borderWidth: 2,
        }],
    };

    const pieChartData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Distribution',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
        }],
    };

    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDateRange(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex h-screen">
            <EmployeSideBar />

            <main className="flex flex-col gap-6 ml-10">
                {/* Card Layouts */}
                <div className="flex flex-col  md:flex-row gap-6 mb-6">
                    <div className="w-full md:w-1/3 bg-gradient-to-r from-blue-500 to-teal-400 p-6 rounded-lg shadow-xl text-white">
                        <h2 className="text-2xl font-semibold mb-4">Total Sales</h2>
                        <p className="text-5xl font-bold">1,250</p>
                        <p className="text-lg">Sales made this month</p>
                    </div>
                    <div className="w-full md:w-1/3 bg-gradient-to-r from-green-400 to-teal-300 p-6 rounded-lg shadow-xl text-white">
                        <h2 className="text-2xl font-semibold mb-4">Total Revenue</h2>
                        <p className="text-5xl font-bold">$9,500</p>
                        <p className="text-lg">Revenue generated this month</p>
                    </div>
                    <div className="w-full md:w-1/3 bg-gradient-to-r from-red-500 to-orange-400 p-6 rounded-lg shadow-xl text-white">
                        <h2 className="text-2xl font-semibold mb-4">Total Customers</h2>
                        <p className="text-5xl font-bold">320</p>
                        <p className="text-lg">New customers this month</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-3xl font-semibold mb-6">Charts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Bar Chart</h3>
                            <Bar data={barChartData} />
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Line Chart</h3>
                            <Line data={lineChartData} />
                        </div>
                        <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Pie Chart</h3>
                            <Pie data={pieChartData} />
                        </div>
                    </div>
                </div>

                {/* Date Range Filter */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold mb-4">Filter by Date Range</h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="date"
                            name="start"
                            value={dateRange.start}
                            onChange={handleDateRangeChange}
                            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="date"
                            name="end"
                            value={dateRange.end}
                            onChange={handleDateRangeChange}
                            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Apply Filter
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
