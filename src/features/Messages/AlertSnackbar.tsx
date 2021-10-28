import {useEffect, useState} from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { selectAlerts, SnackbarAlert, removeAlert } from '../../store/alertSlice'
import { useAppSelector, useAppDispatch } from '../../store/hooks'

const AlertSnackbar = () => {

  const snackbarStack = useAppSelector(selectAlerts)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState<SnackbarAlert | null>()


  useEffect(() => {
    if(snackbarStack.length) {
      setAlert(snackbarStack[0])
      setOpen(true)
    }
  }, [snackbarStack])

  if (!alert) {
    return <></>
  }

  const handleClose = () => {
    dispatch(removeAlert(alert.id))
    setOpen(false)
    setAlert(null)
  }

  return (
    <Snackbar
      open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert severity={alert.alertType}>
        {alert.message}
      </Alert>
    </Snackbar>
  )
}

export default AlertSnackbar
