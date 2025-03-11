import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/infoheader/header";
import Plot from "../../components/plot/plot";
import Map from "../../components/map/map";
import PieChart from "../../components/piechart/chart";
import "./info.css";
const BE_URL = import.meta.env.VITE_BE_URL;

const UrlInfoPage = () => {
  const { id } = useParams();
  const [urlInfo, setUrlInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headerInfo, setHeaderInfo] = useState({}); // { original_url, short_url, clicks_count }
  const [clickHistory, setClickHistory] = useState([]); // [timestamp1, timestamp2, ...]
  const [mapCoordinates, setMapCoordinates] = useState([]); // [[lat, lon], ...]
  const [browsers, setBrowsers] = useState([]); // [{ browser: "Chrome", count: 5 }, ...]
  const [devices, setDevices] = useState([]); // [{ device: "Desktop", count: 5 }, ...]
  const [countries, setCountries] = useState([]); // [{ country: "US", count: 5 }, ...]
  const [referers, setReferers] = useState([]); // [{ referer: "google.com", count: 5 }, ...]

  //Extract referers from click history
  const extractReferers = useCallback((clicks) => {
    if (!clicks || !Array.isArray(clicks)) return [];
    return clicks
      .filter((click) => click.referer)
      .map((click) => click.referer);
  }, []);

  //Extract countries from click history
  const extractCountries = useCallback((clicks) => {
    if (!clicks || !Array.isArray(clicks)) return [];
    return clicks
      .filter((click) => click.country)
      .map((click) => click.country);
  }, []);

  //Extract devices from click history
  const extractDevices = useCallback((clicks) => {
    if (!clicks || !Array.isArray(clicks)) return [];
    return clicks.filter((click) => click.device).map((click) => click.device);
  }, []);

  //Extract browsers from click history
  const extractBrowsers = useCallback((clicks) => {
    if (!clicks || !Array.isArray(clicks)) return [];
    return clicks
      .filter((click) => click.browser)
      .map((click) => click.browser);
  }, []);

  // Extract timestamps from click history
  const extractTimestamps = useCallback((clicks) => {
    if (!clicks || !Array.isArray(clicks)) return [];

    return clicks
      .filter((click) => click.timestamp && !isNaN(new Date(click.timestamp)))
      .map((click) => new Date(click.timestamp).toISOString());
  }, []);

  // Extract coordinates from click history
  const extractCoordinates = useCallback((clicks) => {
    if (!clicks || !Array.isArray(clicks)) return [];

    return clicks
      .filter((click) => click.latitude != null && click.longitude != null)
      .map((click) => [click.latitude, click.longitude]);
  }, []);

  // Fetch URL info and update states
  useEffect(() => {
    const fetchUrlInfo = async () => {
      try {
        const response = await fetch(`${BE_URL}user/url/info/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        setUrlInfo(data);
        console.log("URL info:", data);

        // Update headerInfo
        setHeaderInfo({
          original_url: data.original_url,
          short_url: data.short_url,
          clicks_count: data.click_history?.length || 0,
        });
        // Update clickHistory with timestamps only
        const timestamps = extractTimestamps(data.click_history);
        setClickHistory(timestamps);
        // Update referers
        const refererData = extractReferers(data.click_history);
        setReferers(refererData);
        // Update countries
        const countryData = extractCountries(data.click_history);
        setCountries(countryData);
        // Update mapCoordinates
        const coords = extractCoordinates(data.click_history);
        setMapCoordinates(coords);
        // Update devices
        const deviceData = extractDevices(data.click_history);
        setDevices(deviceData);
        // Update browsers
        const browserData = extractBrowsers(data.click_history);
        setBrowsers(browserData);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching URL info:", err);
        setError("Failed to load URL information.");
        setLoading(false);
      }
    };
    fetchUrlInfo();
  }, [id, extractTimestamps, extractCoordinates]);

  if (loading) return <h1 className="loading-text">Loading...</h1>;
  if (error) return <h1 className="error-text">{error}</h1>;

  return (
    <div id="url-info-container">
      <Header headerInfo={headerInfo} />
      <Plot data={clickHistory} />
      <Map coordinates={mapCoordinates} />
      <div className="chart-card">
        <h5>Pie charts</h5>
        <div className="app-container">
          <div className="pie-chart-grid">
            <PieChart data={browsers} title="Browsers" dataKey="browser" />
            <PieChart data={devices} title="Devices" dataKey="device" />
            <PieChart data={countries} title="Countries" dataKey="country" />
            <PieChart data={referers} title="Referers" dataKey="referer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlInfoPage;
