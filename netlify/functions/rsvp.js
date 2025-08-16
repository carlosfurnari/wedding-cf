exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const payload = JSON.parse(event.body);
  const response = await fetch('https://script.google.com/macros/s/AKfycbwQXq7dFbtEgTGoYtRQD8NEHxSQFnyD0JYKcnWjWqpnb5ePU2ISM-2Af53EnbEQpKYi/exec', {
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