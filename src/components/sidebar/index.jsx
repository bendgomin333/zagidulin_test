import styled from "@emotion/styled"
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, Typography } from "@mui/material"
import { useContext } from "react"
import { DrawerContext } from "../layout"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

const drawerWidth = 240

const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  & .MuiDrawer-paper {
    width: ${drawerWidth}px;
    background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));
    color: #eee;
  }
`

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 59px;
  padding: 4px 12px;
`

const Logo = styled.div`
  border-radius: 100%;
  width: 40px;
  height: 40px;
  background-color: #eee;
  margin-right: 12px;
`

const CloseBtn = styled(IconButton)`
  position: absolute;
  right: 0;
  top: 10px;
  color: white;
`

const LinkButton = styled(ListItemButton)`
  height: 45px;
  font-size: 18px;
  border-radius: 3px;
  &.Mui-selected {
    background: linear-gradient(195deg, #49a3f1, #1a73e8);
  }
`

const drawer = (
  <div>
    <SidebarHeader>
      <Logo />
      <Typography variant="h4">Logo</Typography>
    </SidebarHeader>
    <Divider sx={{ background: '#888', margin: '0 16px' }} />
    <List>
      {['Tables', 'Main', 'Mailbox', 'Graphics', 'Tasks'].map(link => {
        return (
          <ListItem key={link}>
            <LinkButton selected={link === 'Tables'}>
              {link}
            </LinkButton>
          </ListItem>
        )
      })}
    </List>
  </div>
)

export const Sidebar = () => {
  const { open, setOpen } = useContext(DrawerContext)

  return (
    <>
      <StyledDrawer
        sx={{ display: { xs: 'none', lg: 'block' } }}
        variant="persistent"
        open
      >
        {drawer}
      </StyledDrawer>
      <StyledDrawer
        sx={{ display: { xs: 'block', lg: 'none' } }}
        variant="temporary"
        open={open}
      >
        <CloseBtn onClick={() => setOpen(false)}>
          <ChevronLeftIcon></ChevronLeftIcon>
        </CloseBtn>
        {drawer}
      </StyledDrawer>
    </>
  )
}