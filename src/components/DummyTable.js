import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import React, { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

export const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const headers = [
    { headerName: 'S.No', field: 'id', width: '70px' },
    { headerName: 'CIN', field: 'cin' },
    { headerName: 'Company Name', field: 'company_name' },
    { headerName: 'Company Status', field: 'company_status' },
    { headerName: 'Company Type', field: 'company_type' },
    { headerName: 'Date Of Registration', field: 'date_of_registration' },
    { headerName: 'Email', field: 'email' },
    { field: 'activity_code', headerName: 'Activity Code' },
    { headerName: 'Activity Description', field: 'activity_description' },
    { headerName: 'Authorized Capital', field: 'authorized_capital' },
    { headerName: 'Category', field: 'category' },
    { headerName: 'Class', field: 'class' },
    { headerName: 'Month Name', field: 'month_name' },
    { headerName: 'PaidUp Capital', field: 'paidup_capital' },
    {
      headerName: 'Registered Office Address',
      field: 'registered_office_address',
    },
    { headerName: 'ROC', field: 'roc' },
    { headerName: 'State', field: 'state' },
  ];
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      minWidth: 100,
      sortable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('http://localhost:8000/v1/api/company/filter')
      .then((resp) => resp.json())
      .then((data) => {
        const dataSource = {
          rowCount: undefined,
          getRows: (params) => {
            console.log(
              'asking for ' + params.startRow + ' to ' + params.endRow
            );

            console.log(data);

            setTimeout(function () {
              const rowsThisPage = data.slice(params.startRow, params.endRow);

              let lastRow = -1;
              if (data.length <= params.endRow) {
                lastRow = data.length;
              }
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          },
        };
        params.api.setDatasource(dataSource);
      });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className='ag-theme-alpine'>
        <AgGridReact
          columnDefs={headers}
          defaultColDef={defaultColDef}
          rowBuffer={0}
          rowSelection={'multiple'}
          rowModelType={'infinite'}
          cacheBlockSize={10}
          cacheOverflowSize={2}
          maxConcurrentDatasourceRequests={1}
          infiniteInitialRowCount={1000}
          maxBlocksInCache={10}
          onGridReady={onGridReady}></AgGridReact>
      </div>
    </div>
  );
};
