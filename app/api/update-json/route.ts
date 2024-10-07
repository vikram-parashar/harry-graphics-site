import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to your JSON file
const jsonFilePath = path.join(process.cwd(), 'public', 'products.json');

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Read the existing data
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    // Modify the JSON data with the new data from the request
    const updatedData = { ...jsonData, ...data };

    // Write the updated data back to the file
    fs.writeFileSync(jsonFilePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({ success: true, message: 'JSON updated successfully!' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error updating JSON file', error });
  }
}
