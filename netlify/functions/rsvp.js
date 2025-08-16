exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const payload = JSON.parse(event.body);
  const response = await fetch('https://script.google.com/macros/s/AKfycbztXgOUkonDlGt5obnPqBLtJzUD-BkP6hSwB0U5g0fb0VpnXhQq9mYv5LL7ceSpMQssoA/exec', {
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