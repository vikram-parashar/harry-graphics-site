'use server'

export async function removeImages(urls: string[]) {
  const keys: string[] = [];
  urls.forEach(url => {
    if (url) {
      const ky = url.split('/').slice(3).join('/');
      keys.push(ky);
    }
  });

  if (keys.length) {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keys }),
    }).then(res => res.json()).catch(err => console.error('Error deleting images:', err));
  }
}
