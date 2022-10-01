import React, { useState } from 'react';
import * as xlsx from 'xlsx';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const UploadForm = ({ setViewType }) => {
  const endpoint = 'http://localhost:8000/v1/api';
  const [file, setFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function changeKeys(data) {
    data.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        var replacedKey = key.trim().toLowerCase().replace(/\s+/g, '_');
        if (key !== replacedKey) {
          obj[replacedKey] = obj[key];
          delete obj[key];
        }
      });
    });

    return data;
  }

  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        const formatedData = changeKeys(json);
        setFile(formatedData);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${endpoint}/company`, file)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className=' shadow-lg bg-white rounded-lg flex justify-evenly flex-center items-center align-middle flex-col w-full h-1/2  md:w-1/2 md:h-1/2'>
      <h1 className='p-3 text-3xl text-center '>Upload Company Data</h1>
      <form class='flex justify-evenly flex-center items-center align-middle  space-x-6'>
        <label class='block'>
          <span class='sr-only'>Choose profile photo</span>
          <input
            type='file'
            onChange={handleFileChange}
            class='block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    '
          />
        </label>
      </form>
      <div class='mt-8 flex lg:mt-0 lg:flex-shrink-0'>
        <div class=' inline-flex rounded-md shadow'>
          <button
            class='inline-flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-5 py-3 text-base font-medium hover:bg-indigo-50'
            onClick={() => setViewType('table')}>
            Go to table view
          </button>
        </div>
        <div class='ml-3 inline-flex rounded-md shadow'>
          <button
            class='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700 disabled:opacity-25'
            disabled={!isLoading ? (file.length === 0 ? true : false) : true}
            onClick={handleUpload}>
            <span className='mr-2'>
              {isLoading && <ClipLoader color='white' size={23} />}
            </span>
            {!isLoading ? 'Upload Records' : 'Uploading...'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
