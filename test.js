// test.js - Quick test of the SDK

const { SGDataClient } = require('./dist/index.js');

async function test() {
  console.log('🧪 Testing SGData SDK...\n');

  const client = new SGDataClient();

  try {
    // Test 1: Carpark Availability
    console.log('📍 Test 1: Fetching carpark availability...');
    const carparks = await client.getCarparkAvailability();
    console.log('✅ Success! Found', carparks.items[0].carpark_data.length, 'carparks');
    console.log('Sample:', carparks.items[0].carpark_data[0]);
    console.log('');

    // Test 2: Weather Forecast
    console.log('🌤️  Test 2: Fetching 2-hour weather forecast...');
    const weather = await client.getWeatherForecast2H();
    console.log('✅ Success! Forecast for', weather.items[0].forecasts.length, 'areas');
    console.log('Sample:', weather.items[0].forecasts[0]);
    console.log('');

    // Test 3: PSI
    console.log('💨 Test 3: Fetching PSI (air quality)...');
    const psi = await client.getPSI();
    console.log('✅ Success! National PSI:', psi.items[0].readings.psi_twenty_four_hourly.national);
    console.log('');

    // Test 4: Temperature
    console.log('🌡️  Test 4: Fetching temperature...');
    const temp = await client.getTemperature();
    console.log('✅ Success! Reading from', temp.items[0].readings.length, 'stations');
    console.log('Sample:', temp.items[0].readings[0]);
    console.log('');

    console.log('🎉 All tests passed!');
    console.log('\n✨ Your SDK is working perfectly!\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('\nFull error:', error);
  }
}

test();