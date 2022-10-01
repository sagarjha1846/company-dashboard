import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

const CompanyTable = ({ setViewType, viewType }) => {
  const headers = [
    {
      filter: 'agTextColumnFilter',
      headerName: 'S.No',
      field: 'id',
      width: '70px',
    },
    { filter: 'agTextColumnFilter', headerName: 'CIN', field: 'cin' },
    {
      filter: 'agTextColumnFilter',
      headerName: 'Company Name',
      field: 'company_name',
    },
    {
      filter: 'agTextColumnFilter',
      headerName: 'Company Status',
      field: 'company_status',
    },
    {
      filter: 'agTextColumnFilter',
      headerName: 'Company Type',
      field: 'company_type',
    },
    {
      filter: 'agTextColumnFilter',
      headerName: 'Date Of Registration',
      field: 'date_of_registration',
    },
    { filter: 'agTextColumnFilter', headerName: 'Email', field: 'email' },
    {
      filter: 'agTextColumnFilter',
      field: 'activity_code',
      headerName: 'Activity Code',
    },
    {
      filter: 'agTextColumnFilter',
      headerName: 'Activity Description',
      field: 'activity_description',
    },
    {
      filter: 'agTextColumnFilter',
      headerName: 'Authorized Capital',
      field: 'authorized_capital',
    },
    { filter: 'agTextColumnFilter', headerName: 'Category', field: 'category' },
    { filter: 'agTextColumnFilter', headerName: 'Class', field: 'class' },
    {
      filter: 'agTextColumnFilter',
      headerName: 'Month Name',
      field: 'month_name',
    },
    {
      filter: 'agTextColumnFilter',
      headerName: 'PaidUp Capital',
      field: 'paidup_capital',
    },
    {
      filter: 'agTextColumnFilter',
      headerName: 'Registered Office Address',
      field: 'registered_office_address',
    },
    { filter: 'agTextColumnFilter', headerName: 'ROC', field: 'roc' },
    { filter: 'agTextColumnFilter', headerName: 'State', field: 'state' },
  ];

  const onGridReady = useCallback((params) => {
    params.api.setServerSideDatasource(dataSource);
  }, []);

  const dataSource = {
    rowCount: null,
    getRows(params) {
      console.log('asking for ' + params.startRow + ' to ' + params.endRow);
      const { filterModel, sortModel } = params.request;
      console.log('====================================');
      console.log(filterModel);
      console.log('====================================');
      let url = `http://localhost:8000/v1/api/company/filter?`;
      //Sorting
      if (sortModel.length) {
        const { colId, sort } = sortModel[0];
        url += `_sort=${colId}&_order=${sort}&`;
      }
      //Filtering
      const filterKeys = Object.keys(filterModel);
      filterKeys.forEach((filter) => {
        url += `${filter}=${filterModel[filter].filter}&`;
      });
      //Pagination
      url += `_start=${0}&_end=${10}`;
      fetch(url)
        .then((httpResponse) => httpResponse.json())
        .then((response) => {
          params.successCallback(response, 499);
        })
        .catch((error) => {
          console.error(error);
          params.failCallback();
        });
    },
  };

  return (
    <div className='shadow-lg bg-white  rounded-lg flex p-2 flex-center items-center align-middle flex-col w-full h-full  md:w-11/12 md:h-max'>
      <div class='mt-8 flex w-full justify-between flex-wrap p-2 flex-center items-center align-middle  lg:mt-0 lg:flex-shrink-0 m-2'>
        <h1 className=' text-2xl'>Company Records</h1>
        <div className='flex flex-wrap items-center align-middle'>
          <div class=' inline-flex rounded-md m-2 shadow'>
            <button
              class='inline-flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-5 py-3 text-base font-medium hover:bg-indigo-50'
              onClick={() => setViewType('forms')}>
              Add More Records
            </button>
          </div>
        </div>
      </div>
      <div className='p-2 ag-theme-alpine' style={{ width: '100%' }}>
        <AgGridReact
          columnDefs={headers}
          pagination={true}
          paginationPageSize={10}
          cacheBlockSize={10}
          domLayout='autoHeight'
          rowModelType='serverSide'
          onGridReady={onGridReady}
          cacheOverflowSize={2}
          maxConcurrentDatasourceRequests={1}
          infiniteInitialRowCount={1000}
          maxBlocksInCache={10}
          defaultColDef={{ filter: true, floatingFilter: true, sortable: true }}
        />
      </div>
    </div>
  );
};

export default CompanyTable;
