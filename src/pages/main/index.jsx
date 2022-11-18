import React, { useState } from "react";
import { Layout } from "../../components/layout"
import { Debts } from "./debts";
import { Persons } from "./persons";

export const PersonsContext = React.createContext()
export const DebtsContext = React.createContext()

export const MainPage = () => {
  const [personsData, setPersonsData] = useState('')
  const [debtsData, setDebtsData] = useState('')

  return (
    <PersonsContext.Provider value={{ personsData, setPersonsData }}>
      <DebtsContext.Provider value={{ debtsData, setDebtsData }}>
        <div style={{ flexGrow: 1 }}>
          <Persons />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Debts />
        </div>
      </DebtsContext.Provider>
    </PersonsContext.Provider>
  )
}