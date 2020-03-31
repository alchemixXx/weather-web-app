const request = require('request');

const mapBoxPublicToken =
  'pk.eyJ1IjoiYWxjaGVtaXN0OTEiLCJhIjoiY2s4MDF2cnhzMGNmejNpbnFiYzVwYXYzdSJ9.WI8_yg8kay9h12C1AQIQ-w';

const LIMIT = 1;
const geocode = (adress, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adress,
  )}.json?access_token=${mapBoxPublicToken}&limit=${LIMIT}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Some troubles occured;\n', undefined);
    } else if (body.features.length === 0) {
      callback('The error is: Unappropriate search value', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
