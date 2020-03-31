const request = require('request');
const darkNetAccessToken = 'e3db34e2f9745a38b528acd089a24de1';

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/${darkNetAccessToken}/${latitude},${longitude}?units=si&lang=uk`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Some troubles occured;\n' + error, undefined);
    } else if (body.error) {
      callback(
        {
          errorMessage: 'The error is: ' + body.error,
          errorCode: 'The code is: ' + body.code,
        },
        undefined,
      );
    } else {
      callback(undefined, {
        today: {
          summury: `${body.daily.data[0].summary}`,
          // righNow: `It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`,
          righNow: `${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`,
          inOneHour: `${body.hourly.data[1].summary}. Will be ${body.hourly.data[1].temperature} degrees out and ${body.hourly.data[1].precipProbability}% chance of rain.`,
          inFourHours: `${body.hourly.data[3].summary}. Will be ${body.hourly.data[3].temperature} degrees out and ${body.hourly.data[3].precipProbability}% chance of rain.`,
          inEightHours: `${body.hourly.data[7].summary}. Will be ${body.hourly.data[7].temperature} degrees out and ${body.hourly.data[7].precipProbability}% chance of rain.`,
        },
        tommorow: {
          summury: `${body.daily.data[1].summary}`,
          forecast: `Temparature from ${body.daily.data[1].temperatureLow} to ${body.daily.data[1].temperatureHigh}. There is ${body.daily.data[1].precipProbability}% chance of ${body.daily.data[1].precipType}.`,
        },
      });
    }
  });
};


module.exports = forecast;
