export const handleSubmit = async (data : any) => {
  console.log('data:',data);
  const response = await fetch('/api/symptoms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const result = await response.json();
  console.log('rez:',result);
}