import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

interface XTooltipProps {
  active?: boolean
  payload?: any
  label?: string
}

const XTooltip = (props: XTooltipProps) => {
  const { active, payload, label } = props

  if(active && payload && payload.length > 0){
    return (
      <Box>
      <Typography>
        {label} - {payload[0].value}
      </Typography>
    </Box>
  )
  } else {
    return null
  }
}

export default XTooltip
