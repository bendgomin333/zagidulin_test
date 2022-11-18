import styled from "@emotion/styled"
import { Button, FormHelperText, Modal, OutlinedInput } from "@mui/material"
import { useState, useEffect } from 'react';
import { updateRow } from "../../../../app/api";
import { addRow } from './../../../../app/api/index';

const validate = (text) => {
  const errors = []
  if (!text.match(/^[a-zA-Z]*$/)) errors.push('Only [a-zA-Z] letters')
  if (text.length < 1 || text.length > 25) errors.push('From 1 to 25 symbols')
  return errors
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 320px;
  height: 200px;
  background-color: #fff;
  border: 1px solid #000;
  boxShadow: 24;
  padding: 4px;
`

const ModalInner = ({ gridApi, setOpen, query, fetchData, children, id }) => {


  const [firstname, setFirstname] = useState('')
  const [secondname, setSecondname] = useState('')
  const [firstnameErrors, setFirstnameErrors] = useState([])
  const [secondnameErrors, setSecondnameErrors] = useState([])
  const [fromError, setFormError] = useState('')

  useEffect(() => {
    if (!id) return
    const { firstname, secondname } = gridApi.getRowNode(id).data
    setFirstname(firstname)
    setSecondname(secondname)
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await query({ id, firstname, secondname })
    const { status, error } = await res.json()
    if (error) setFormError(error)
    else if (!error && res.status !== 200) setFormError('Unexpected error')
    else if (res.status === 200 && status === 'success') {
      setOpen(false)
      fetchData()
    }
  }

  const handleChange = (e) => {
    const errors = validate(e.target.value)
    let text = e.target.value
    if (text.length > 0) text = text[0].toUpperCase() + text.slice(1)
    if (e.target.id === 'firstname') {
      setFirstnameErrors(errors)
      setFirstname(text)
    }
    if (e.target.id === 'secondname') {
      setSecondnameErrors(errors)
      setSecondname(text)
    }
  }

  return (
    <>
      {children}
      <form onSubmit={handleSubmit}>
        <OutlinedInput
          id='firstname'
          required
          fullWidth
          value={firstname}
          size='small'
          onChange={handleChange}
          error={firstnameErrors.length > 0}
        />
        <FormHelperText>{firstnameErrors.length > 0 ? firstnameErrors[0] : ''}</FormHelperText>
        <OutlinedInput
          id='secondname'
          required
          fullWidth
          value={secondname}
          size='small'
          onChange={handleChange}
          error={secondnameErrors.length > 0}
        />
        <FormHelperText>{secondnameErrors.length > 0 ? secondnameErrors[0] : ''}</FormHelperText>
        {fromError}
        <Button type='submit'>Submit</Button>
      </form>
    </>
  )
}


export const EditModal = ({ gridApi, fetchData, id, fetching }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  return (
    <>
      <Button disabled={!id || fetching} onClick={handleClick}>Edit</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalWrapper>
          <ModalInner gridApi={gridApi} setOpen={setOpen} query={updateRow} fetchData={fetchData} id={id}>
            Edit row
          </ModalInner>
        </ModalWrapper>
      </Modal>
    </>
  )
}

export const AddModal = ({ gridApi, fetchData, fetching }) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  return (
    <>
      <Button onClick={handleClick} disabled={fetching}>Add</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalWrapper>
          <ModalInner gridApi={gridApi} setOpen={setOpen} query={addRow} fetchData={fetchData} id={undefined}>
            Add row
          </ModalInner>
        </ModalWrapper>
      </Modal>
    </>
  )
}