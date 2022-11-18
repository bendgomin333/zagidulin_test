import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { DebtsContext, PersonsContext } from ".."
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getDebts } from "../../../app/api";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const TableTitle = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`

export const Debts = () => {
  const { debtsData, setDebtsData } = useContext(DebtsContext)
  const { personsData } = useContext(PersonsContext)

  const gridRef = useRef()
  const [columnDefs] = useState([
    { field: 'personid', flex: 2, sort: 'asc', sortingOrder: ['asc', 'desc'], sortable: true },
    { field: 'amount', flex: 4, filter: true },
    { field: 'date', flex: 4, filter: true }
  ])

  const fetchData = useCallback(async () => {
    gridRef.current.api.showLoadingOverlay()
    setDebtsData(await getDebts())
    gridRef.current.api.hideOverlay()
  }, [])

  useEffect(() => {
    if (!personsData) return
    fetchData()
  }, [personsData])

  const onGridReady = useCallback(async (params) => {
    fetchData()
  }, [])

  return (
    <>
      <TableTitle>
        <Typography variant="h6">
          Debts table
        </Typography>
      </TableTitle>
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact
          onGridReady={onGridReady}
          ref={gridRef}
          rowData={debtsData}
          getRowId={params => params.data.id}
          columnDefs={columnDefs}
          rowSelection='single'
        >
        </AgGridReact>
      </div>
    </>
  )
}