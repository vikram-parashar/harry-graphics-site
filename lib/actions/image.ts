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

        // Set the dimensions of the canvas
        const maxWidth = 1000; // Max width for resizing the image (optional)
        const maxHeight = 1000; // Max height for resizing the image (optional)
        let width = img.width;
        let height = img.height;

        // Scale down if image dimensions exceed maxWidth/maxHeight
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }

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

  if (!file) {
    return '';
  }
  const reducedFile = await resizeImage(file, targetSizeKB)
  const fileExt = reducedFile.name.split('.').pop()
  const filePath = `${folder}/${crypto.randomUUID()}.${fileExt}`

  const formData = new FormData()
  formData.append('file', reducedFile)
  formData.append('filePath', filePath)

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();

  return data;
}
