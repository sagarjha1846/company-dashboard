import { useState } from 'react';
import CompanyTable from './components/CompanyTable';
import UploadForm from './components/UploadForm';

export default function App() {
  const [viewType, setViewType] = useState('form');
  return (
    <div className='h-screen w-screen bg-slate-50 flex flex-center justify-center items-center content-center flex-col'>
      {viewType === 'table' ? (
        <CompanyTable setViewType={setViewType} viewType={viewType} />
      ) : (
        <UploadForm setViewType={setViewType} />
      )}
    </div>
  );
}
