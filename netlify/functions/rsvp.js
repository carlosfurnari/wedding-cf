exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const payload = JSON.parse(event.body);
  const response = await fetch('https://script.google.com/macros/s/AKfycbx_4nzgJMTK-PMOhT7lch69ZvrGv4HVPNAbkBmfX9KDoWiFXRvo6MozIfZ8vzNlDx8xaQ/exec', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  });
  const text = await response.text();
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: text
  };
};