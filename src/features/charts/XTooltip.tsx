import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"

interface XTooltipProps {
  active?: boolean
  payload?: any
  label?: string
}

const XTooltip = (props: XTooltipProps) => {
  const { active, payload, label } = props

  if(active && payload && payload.length > 0){
    return (
      <Paper color='primary' sx={{ padding: '1rem', border: 'black 1px solid'}}>
        <Typography>
          {`${label} - ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(payload[0].value)}`}
        </Typography>
      </Paper>
  )
  } else {
    return null
  }
}

export default XTooltip
