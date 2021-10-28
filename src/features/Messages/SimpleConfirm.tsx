import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { deleteList } from '../../fetches/list';
import { closeDialog, selectDialog } from '../../store/alertSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface SimpleDialogProps {
  open: boolean
  onConfirm: Function
}

const SimpleConfirm = (props: SimpleDialogProps) =>  {
  const { open } = props
  const dispatch = useAppDispatch()
  const dialog = useAppSelector(selectDialog)

  const cancelAction = () => {
    dispatch(closeDialog())
  }

  const confirmAction = () => {
    // TO DO: MODULAR OCMPONENT TO TAKE IN CALLBACK
    // redux doesn't like passing funcs thru so need another method.
    deleteList(dialog.targetId)
    dispatch(closeDialog())
  }

  return (
    <Dialog open={open}>
      <DialogTitle>{dialog.title}</DialogTitle>
      <Button onClick={cancelAction}>
        Cancel
      </Button>
      <Button onClick={confirmAction} color='warning'>
        Confirm
      </Button>
    </Dialog>
  )
}

export default SimpleConfirm
