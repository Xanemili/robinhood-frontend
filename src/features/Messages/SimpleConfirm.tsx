import { Button, DialogContent, DialogContentText } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { closeDialog, selectDialog } from '../../store/alertSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface SimpleDialogProps {
  open: boolean
}

const SimpleConfirm = (props: SimpleDialogProps) =>  {
  const { open } = props
  const dispatch = useAppDispatch()
  const dialog = useAppSelector(selectDialog)

  const cancelAction = () => {
    dispatch(closeDialog())
  }

  const confirmAction = () => {
    if (dialog.action) {
      dispatch(dialog.action())
      dispatch(closeDialog())
    }
  }

  return (
    <Dialog open={open}>
      <DialogTitle>{dialog.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialog.description}
        </DialogContentText>
      </DialogContent>
      <Button onClick={cancelAction}>
        Cancel
      </Button>
      <Button onClick={confirmAction} color='warning' autoFocus>
        Confirm
      </Button>
    </Dialog>
  )
}

export default SimpleConfirm
