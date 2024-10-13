const axios = require('axios');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_API_URL = 'https://api.github.com/repos/coder-soft/Fonts/contents/';
const RAW_GITHUB_URL = 'https://raw.githubusercontent.com/coder-soft/Fonts/main/';

exports.handler = async function(event, context) {
  const path = event.path.split('/').pop();

  if (path === 'fonts') {
    try {
      const response = await axios.get(GITHUB_API_URL, {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      return {
        statusCode: 200,
        body: JSON.stringify(response.data)
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch fonts' })
      };
    }
  } else if (path === 'raw-font') {
    const fontName = event.queryStringParameters.name;
    try {
      const response = await axios.get(`${RAW_GITHUB_URL}${fontName}`, {
        responseType: 'arraybuffer'
      });
      return {
        statusCode: 200,
        headers: {
          'Content-Type': fontName.endsWith('.otf') ? 'font/opentype' : 'font/ttf',
          'Content-Disposition': `attachment; filename="${fontName}"`
        },
        body: response.data.toString('base64'),
        isBase64Encoded: true
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch font file' })
      };
    }
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Not found' })
    };
  }
};