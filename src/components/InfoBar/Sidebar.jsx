import React from 'react'
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Portfolio from '../Dashboard/Portfolio'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import Divider from '@material-ui/core/Divider'

export default function Sidebar({classes, drawerStatus, handleDrawer}) {

  return (
    <Drawer variant='permanent' open={drawerStatus} classes={{paper: clsx(classes.drawerPaper, !drawerStatus && classes.drawerPaperClose)}}>
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Portfolio />
    </Drawer>
  )
}