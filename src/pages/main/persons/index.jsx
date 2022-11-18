import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useContext, useRef, useState } from "react";
import { deleteRow, getData } from '../../../app/api';
import { AddModal, EditModal } from './modal';
import { Button, Typography } from '@mui/material';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { PersonsContext } from './../index';
import styled from '@emotion/styled';

const TableTitle = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`

export const Persons = () => {
  const { personsData, setPersonsData } = useContext(PersonsContext)

  const gridRef = useRef()
  const [columnDefs] = useState([
    { field: 'id', flex: 2, sort: 'asc', sortingOrder: ['asc', 'desc'], sortable: true },
    { field: 'firstname', flex: 4, filter: true },
    { field: 'secondname', flex: 4, filter: true }
  ])

  const [selectedId, setSelectedId] = useState()
  const [fetching, setFetching] = useState(false)

  const fetchData = useCallback(async () => {
    setFetching(true)
    gridRef.current.api.showLoadingOverlay()
    setPersonsData(await getData())
    gridRef.current.api.hideOverlay()
    setFetching(false)
  }, [])

  const onGridReady = useCallback(async (params) => {
    fetchData()
  }, [])

  const handleRemove = async () => {
    const res = await deleteRow(selectedId)
    if (res.status === 200) fetchData()
  }

  const onSelect = ({ node, data }) => {
    if (node.isSelected()) setSelectedId(data.id)
    if (gridRef.current.api.getSelectedNodes().length === 0) setSelectedId('')
  }

  return (
    <>
      <TableTitle>
        <Typography variant='h6'>Persons table</Typography>
        {gridRef.current
          ? <>
            <AddModal
              fetching={fetching}
              gridApi={gridRef.current.api}
              fetchData={fetchData}
            />
            <EditModal
              id={selectedId}
              fetching={fetching}
              gridApi={gridRef.current.api}
              fetchData={fetchData}
            />
            <Button disabled={!selectedId || fetching} onClick={handleRemove}>Remove</Button>
          </>
          : ''}
      </TableTitle>
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact
          onGridReady={onGridReady}
          ref={gridRef}
          rowData={personsData}
          getRowId={params => params.data.id}
          columnDefs={columnDefs}
          rowSelection='single'
          onRowSelected={onSelect}
        >
        </AgGridReact>
      </div>
    </>
  )
}