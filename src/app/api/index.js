export const getData = async () => {
  const res = await fetch('/getData')
  if (res.status === 200) return await res.json()
  return undefined
}

export const updateRow = async ({ id, firstname, secondname }) => await fetch('/edit', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ id, firstname, secondname })
})

export const addRow = async ({ firstname, secondname }) => await fetch('/add', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ firstname, secondname })
})

export const deleteRow = async (id) => await fetch('/delete', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({id})
})

export const getDebts = async () => {
  const res = await fetch('/getDebts')
  if (res.status === 200) return await res.json()
  return undefined
}