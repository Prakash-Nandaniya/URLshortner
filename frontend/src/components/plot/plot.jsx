import React, { useEffect, useState, useCallback } from "react";
import Plotly from "react-plotly.js";
import "./plot.css";

const PieChart = ({ data }) => {
  const [plotlyInterval, setPlotlyInterval] = useState("1m"); // Default to 1 minute
  const [plotlyData, setPlotlyData] = useState([]);

  // Aggregate timestamps by interval
  const aggregateTimestampsByInterval = useCallback((timestamps, interval) => {
    if (!timestamps || !Array.isArray(timestamps) || timestamps.length === 0)
      return [];

    const validTimestamps = timestamps.filter(
      (ts) => ts && !isNaN(new Date(ts))
    );
    if (validTimestamps.length === 0) return [];

    const sortedTimestamps = validTimestamps.sort(
      (a, b) => new Date(a) - new Date(b)
    );
    const aggregatedData = {};

    sortedTimestamps.forEach((timestamp) => {
      const time = new Date(timestamp);
      let key;

      switch (interval) {
        case "1s":
          key = time.toISOString().slice(0, 19).replace("T", " ");
          break; // Seconds
        case "1m":
          key = time.toISOString().slice(0, 16).replace("T", " ");
          break; // Minutes
        case "1h":
          key = time.toISOString().slice(0, 13).replace("T", " ");
          break; // Hours
        case "1d":
          key = time.toISOString().slice(0, 10);
          break; // Days
        default:
          key = time.toISOString().slice(0, 13).replace("T", " "); // Default to hours
      }

      if (!aggregatedData[key]) {
        aggregatedData[key] = { time: key, count: 0 };
      }
      aggregatedData[key].count++;
    });

    return Object.values(aggregatedData);
  }, []);

  // Update plotlyData when data or interval changes
  useEffect(() => {
    const aggregatedData = aggregateTimestampsByInterval(data, plotlyInterval);
    const times = aggregatedData.map((d) => d.time);
    const counts = aggregatedData.map((d) => d.count);
    setPlotlyData([
      {
        x: times,
        y: counts,
        type: "scatter",
        mode: "lines+markers",
        name: "Clicks over Timeline",
        line: { color: "#EB568E" }, // Pink connecting line
        marker: { color: "#d50c56", size: 10 }, // Bright pink markers
      },
    ]);
  }, [data, plotlyInterval, aggregateTimestampsByInterval]);

  return (
    <div className="abc">
      <div className="graph-container">
        <div className="plot-header">
          <h1>Click Timeline</h1>
          <select
            value={plotlyInterval}
            onChange={(e) => setPlotlyInterval(e.target.value)}
            className="time-interval-selector"
          >
            <option value="1s">1 Second</option>
            <option value="1m">1 Minute</option>
            <option value="1h">1 Hour</option>
            <option value="1d">1 Day</option>
          </select>
        </div>
        <Plotly
          data={plotlyData}
          layout={{
            height: 700,
            width: 1800,
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            font: { color: "#56f556" }, // Green text for axes/titles
            xaxis: {
              title: {
                text: "Timeline",
                font: { size: 16, color: "#b2bec3" },
                standoff: 30, // Increased to lower the title
              },
              tickangle: -45,
              color: "#b2bec3",
              gridcolor: "#a3d1a330",
              gridwidth: 0.5,
              zeroline: true,
              showgrid: true,
            },
            yaxis: {
              title: {
                text: "Clicks",
                font: { size: 16, color: "#b2bec3" },
              },
              color: "#b2bec3",
              gridcolor: "#a3d1a330",
              gridwidth: 0.5,
              zeroline: true,
              showgrid: true,
              range: [0, Math.max(...(plotlyData[0]?.y || [0])) * 1.1], // Dynamic range
              autorange: false,
            },
            legend: {
              x: 1,
              y: 1,
              xanchor: "right",
              yanchor: "top",
              font: { color: "#b2bec3", size: 12 },
              bgcolor: "rgba(16, 18, 36, 0.8)", // Matches dark theme #101224
              bordercolor: "#b2bec3",
              borderwidth: 1,
            },
            margin: { t: 20, r: 30, b: 100, l: 50 }, // Increased bottom margin for title space
          }}
          config={{
            displayModeBar: false, // Remove hover toolbar
            responsive: true,
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default PieChart;