import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Remove from '@mui/icons-material/Remove'
import ContentPaste from '@mui/icons-material/ContentPaste';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { openDialog, selectDialog, } from '../../store/alertSlice';
import { deleteList } from '../../fetches/list';

interface SimpleListIconMenuProps {
  id: number,
}

export default function ListIconMenu(props: SimpleListIconMenuProps) {
  const { id } = props
  const dispatch = useAppDispatch()

  return (
    <>
      <MenuItem onClick={() =>
        dispatch(openDialog({
          title: 'new dialog',
          description: 'a new dialog',
          open: true,
          action: 'lists/deleteListById',
          targetId: id})
          )}>
        <ListItemIcon>
          <Remove fontSize="small" color="warning"/>
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <ContentPaste fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
        <Typography variant="body2" color="text.secondary">

        </Typography>
      </MenuItem>
    </>
  );
}
