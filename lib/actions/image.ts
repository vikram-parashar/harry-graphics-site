'use client'

import { createClient } from "@/supabase/utils/client"

export const reduceSize = async (file: File, targetWidth: number, targetHeight: number): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const aspectRatio = img.width / img.height;

        let newWidth = targetWidth;
        let newHeight = targetHeight;

        // Maintain aspect ratio
        if (img.width > img.height) {
          newHeight = targetWidth / aspectRatio;
        } else {
          newWidth = targetHeight * aspectRatio;
        }

        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(newWidth);
        canvas.height = Math.round(newHeight);

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context.'));
          return;
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert canvas back to a file
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to convert canvas to blob.'));
            return;
          }
          const newFile = new File([blob], file.name, { type: file.type });
          resolve(newFile);
        }, file.type);
      };

      img.onerror = () => {
        reject(new Error('Error loading image.'));
      };
    };

    reader.onerror = () => {
      reject(new Error('Error reading file.'));
    };

    reader.readAsDataURL(file);
  });
};

export const uploadImage = async (folder: string, id: string, file: File | undefined, width: number, height: number) => {
  const supabase = createClient()

  try {
    if (!file) {
      alert('image not selected!!')
      return {
        success: false,
      }
    }
    const reducedFile=await reduceSize(file, width, height)
    const fileExt = reducedFile.name.split('.').pop()
    const filePath = `${folder}/${id}.${fileExt}`

    const { data, error: uploadError } = await supabase.storage.from('images')
      .upload(filePath, reducedFile, { upsert: true })

    if (uploadError) {
      throw uploadError
    }
    return {
      success: true,
      path: data.path,
    }
  } catch (error) {
    console.log(error)
    alert('Error uploading image!')
    return {
      success: false,
    }
  }
}
