'use client'
import { useState } from 'react';
import productData from '@/public/products.json'
import { JsonEditor } from 'json-edit-react'
import { Download, Eye, EyeOff, Key } from 'lucide-react';

const updateJson = async (newData: any) => {
  try {
    const response = await fetch('/api/update-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
    const result = await response.json();

    if (result.success) {
      alert('JSON file updated successfully!');
    } else {
      alert(`Failed to update JSON:${result.message}`);
    }
  } catch (error) {
    alert(`An error occurred:${error}`);
  }
};


export default function Page() {
  const [authorized, setAuthorized] = useState(false);
  const [jsonData, setJsonData] = useState<any>(productData);
  const [passVisible, setPassVisible] = useState(false)

  const checkPass = async (formData: FormData) => {
    const pass = formData.get("pass");
    if (pass === process.env.NEXT_PUBLIC_AUTH_PASS) {
      setAuthorized(true);
    } else {
      alert("wrong passcode")
    }
  };

  return (
    <div>
      {!authorized ? (
        <form action={checkPass} className='w-screen flex min-h-screen justify-center items-center flex-col bg-gray-800'>
          <div className='relative'>
            <input
              type={passVisible ? "text" : "password"}
              placeholder="passcode"
              name="pass"
              className='bg-gray-800 border-b-[#d2a8ff] py-3 md:text-3xl border-b-2 text-gray-300 w-[40vw]'
            />
            {passVisible ?
              <Eye className='stroke-white absolute top-1/2 -translate-y-1/2 right-5'
                onClick={() => setPassVisible(false)}
              /> :
              <EyeOff className='stroke-white absolute top-1/2 -translate-y-1/2 right-5'
                onClick={() => setPassVisible(true)}
              />
            }
          </div>
          <button type="submit" className='text-white px-5 py-2 text-3xl my-5 bg-[#56d364] rounded-3xl'>Submit <Key className='stroke-white ml-1 inline pb-1 scale-125' /></button>
        </form>
      ) : (
        <div className='bg-gray-800 py-20 min-h-screen'>
          <JsonEditor
            data={jsonData}
            setData={setJsonData}
            className='mx-auto'
            collapse={1}
            theme={'githubDark'}
            maxWidth={1080}
          />
          <button className='fixed top-5 right-28 bg-black rounded-lg text-white p-3'
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/products.json';
              link.download = 'products.json';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <Download size={16} />
          </button>
          <button className='fixed top-5 right-5 bg-black rounded-lg text-white px-6 py-2'
            onClick={() => {
              const res = updateJson(jsonData)
              console.log(res)
            }}
          >Save</button>
        </div>
      )}
    </div>
  );
}
