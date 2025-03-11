(async () => {
    const fetch = (await import('node-fetch')).default;
  
    async function getGeolocation(ip) {
      try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();
  
        if (data.status === "success") {
          console.log(`IP: ${ip}`);
          console.log(`Country: ${data.country}`);
          console.log(`Region: ${data.regionName}`);
          console.log(`City: ${data.city}`);
          console.log(`Latitude: ${data.lat}`);
          console.log(`Longitude: ${data.lon}`);
        } else {
          console.error("Failed to fetch geolocation:", data.message);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  
    // Replace '172.31.76.204' with the target IP address
    await getGeolocation("220.158.144.58");
  })();
  