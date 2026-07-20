export async function onRequest(context) {
  return new Response('function ok', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}
