import React, { useEffect, useRef } from "react";
import Plotly from "plotly.js-dist-min";
import * as XLSX from "xlsx";
import "./chart.css"; // Updated CSS

const PieChart = ({ data, title, dataKey }) => {
  const chartRef = useRef(null);

  // Process data into counts
  const processData = (dataArray) => {
    const counts = dataArray.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  };

  // Calculate percentages and sort for top 5
  const getChartData = (processedData) => {
    const total = processedData.reduce((sum, { count }) => sum + count, 0);
    const withPercentages = processedData.map((item) => ({
      ...item,
      percentage: ((item.count / total) * 100).toFixed(1),
    }));
    return withPercentages.sort((a, b) => b.count - a.count);
  };

  // Download Excel file
  const downloadExcel = (chartData) => {
    const worksheet = XLSX.utils.json_to_sheet(
      chartData.map((item) => ({
        [dataKey.charAt(0).toUpperCase() + dataKey.slice(1)]: item.name,
        Count: item.count,
        Percentage: `${item.percentage}%`,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title);
    XLSX.writeFile(workbook, `${title.toLowerCase()}_data.xlsx`);
  };

  useEffect(() => {
    if (!data || data.length === 0) return;

    const processedData = processData(data);
    const chartData = getChartData(processedData);
    const top5 = chartData.slice(0, 5);

    // Pie chart data with dull colors and transparency
    const plotlyData = [
      {
        values: chartData.map((item) => item.count),
        labels: chartData.map((item) => item.name),
        text: chartData.map((item) => `${item.count}`),
        textinfo: "text",
        hovertemplate: `%{label}: %{percent} (%{text})`,
        type: "pie",
        marker: {
          colors: [
            "#2D1B2E", // Deep Charcoal with a Pink Hue  
            "#3E2C41", // Dark Purple-Grey  
            "#5A3D5C", // Muted Mauve Grey  
            "#704F69", // Dusty Rose Grey  
            "#8A6B83", // Faded Pinkish Grey  
            "#A48B9E", // Soft Muted Pink  
        ]             
        },
        textfont: { color: "#d3d3d3" }, // Light gray text for counts
      },
    ];

    const layout = {
      height: 400, // Larger size
      width: 400, // Larger size
      showlegend: false,
      margin: { t: 40, b: 0, l: 0, r: 0 },
      title: {
        text: title,
        font: { color: "#d3d3d3", size: 20 }, // Light gray title
      },
      paper_bgcolor: "rgba(16, 18, 36, 0)", // Slightly transparent #101224
      font: { color: "#d3d3d3" }, // Light gray for hover text
    };
    const config = {displayModeBar: false };
    Plotly.newPlot(chartRef.current, plotlyData, layout, config);
  }, [data, title]);

  // Render top 5 and download button
  const processedData = processData(data || []);
  const chartData = getChartData(processedData);
  const top5 = chartData.slice(0, 5);

  return (
    <div className="pie-chart-container">
      <div className="chart-and-legend">
        <div ref={chartRef} className="pie-chart"></div>
        <div className="top-5-list">
          <h3>Top 5 {title}</h3>
          <ul>
            {top5.map((item, index) => (
              <li key={index}>
                {item.name}: {item.count}
              </li>
            ))}
          </ul>
          <button
            onClick={() => downloadExcel(chartData)}
            className="download-button"
          >
            Download {title} Data (Excel)
          </button>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
