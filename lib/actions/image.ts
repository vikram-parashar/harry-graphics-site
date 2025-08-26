'use client'

function resizeImage(imageFile: File, targetSizeKB: number): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;

      img.onload = () => {
        // Define the canvas where the image will be drawn
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject('Canvas context is not available.');
          return;
        }

        let width = img.width;
        let height = img.height;

        canvas.width = width;
        canvas.height = height;

        // Draw the image onto the canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Define function to compress the image and check file size
        const compressImage = (quality: number) => {
          const dataUrl = canvas.toDataURL('image/jpeg', quality / 100);
          const byteString = atob(dataUrl.split(',')[1]);
          const byteArray = new Uint8Array(byteString.length);

          for (let i = 0; i < byteString.length; i++) {
            byteArray[i] = byteString.charCodeAt(i);
          }

          const file = new Blob([byteArray], { type: 'image/jpeg' });
          const fileSizeKB = file.size / 1024;

          if (fileSizeKB <= targetSizeKB || quality <= 10) {
            // Once the file size is below target size, resolve the promise
            resolve(new File([file], imageFile.name, { type: 'image/jpeg' }));
          } else {
            // Reduce quality and try again
            compressImage(quality - 10);
          }
        };

        // Start with an initial quality of 100
        compressImage(100);
      };

      img.onerror = (err) => {
        reject(`Failed to load image: ${err}`);
      };
    };

    reader.onerror = (err) => {
      reject(`Failed to read file: ${err}`);
    };

    reader.readAsDataURL(imageFile);
  });
}

export const uploadImage = async (folder: string, file: File | undefined, targetSizeKB: number) => {
  if (!file) return '';

  let reducedFile = file;
  if (file.size > targetSizeKB)
    reducedFile = await resizeImage(file, targetSizeKB)

  const formData = new FormData()
  formData.append('file', reducedFile)
  formData.append('filePath', folder)

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();

  return data;
}
