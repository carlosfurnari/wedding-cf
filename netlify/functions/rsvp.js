exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: {"Access-Control-Allow-Origin": "*"}, body: "Method Not Allowed" };
  }
  const payload = JSON.parse(event.body);
  // Attach basic device metadata from headers
  const headersIn = event.headers || {};
  const meta = {
    ip: headersIn['x-forwarded-for'] || headersIn['client-ip'] || null,
    ua: payload.ua || headersIn['user-agent'] || null,
    deviceId: payload.deviceId || null,
    ts: new Date().toISOString(),
  };
  const full = { ...payload, _meta: meta };

  const response = await fetch('https://script.google.com/macros/s/AKfycbztXgOUkonDlGt5obnPqBLtJzUD-BkP6hSwB0U5g0fb0VpnXhQq9mYv5LL7ceSpMQssoA/exec', {
    method: 'POST',
    body: JSON.stringify(full),
    headers: { 'Content-Type': 'application/json' }
  });
  const text = await response.text();
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: text
  };
};