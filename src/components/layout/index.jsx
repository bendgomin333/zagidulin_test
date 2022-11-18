import React from 'react'
import styled from "@emotion/styled"
import IconButton from "@mui/material/IconButton"
import MenuIcon from '@mui/icons-material/Menu'
import Box from "@mui/material/Box"
import MuiAppBar from '@mui/material/AppBar';
import { useState } from "react"
import { Sidebar } from '../sidebar'
import { Typography } from '@mui/material'

export const DrawerContext = React.createContext(null)

const appBarHeight = 60

const Content = styled(Box)`
  margin-top: ${appBarHeight}px;
  padding: 32px 16px 12px 30px;
  background: #eee;
  min-height: calc(100vh - ${appBarHeight}px);
`

const AppBar = styled(MuiAppBar)`
  color: #2c394e;
  height: ${appBarHeight}px;
  align-items: end;
  flex-direction: row;
  padding: 5px 30px;
  box-shadow: none;
  background: #eee;
`

export const Layout = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      <Box sx={{ width: '100%', display: 'flex' }}>
        <AppBar sx={{ width: { xs: '100%', lg: 'calc(100% - 240px)' } }}>
          <IconButton
            sx={{
              height: '40px',
              width: '40px',
              display: { xs: 'block', lg: 'none' },
              marginRight: '12px'
            }}
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h5' sx={{ fontWeight: '700' }}>
            Tables
          </Typography>
        </AppBar>
        <Sidebar />
        <Content
          open={open}
          sx={{
            width: { xs: '100vw', lg: 'calc(100% - 240px)' },
            display: 'grid',
            gridTemplateColumns: { lg: '1fr 1fr', md: '1fr' },
            gap: '12px'
          }}>
          {children}
        </Content>
      </Box>
    </DrawerContext.Provider>
  )
}