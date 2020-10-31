import React, {useContext} from 'react';
import RobinhoodContext from '../../RobinhoodContext';
import Grid from '@material-ui/core/Grid'

const CompanyInfo = () => {
  const {asset: {companyInfo}} = useContext(RobinhoodContext);

  if(!companyInfo) {
    return null;
  }
  return(
    <Grid conatiner spacing={2}>
      <Grid item xs={4} >
        <div>CEO</div>
        <div>{companyInfo.ceo}</div>
      </Grid>
      <Grid item xs={10} >
        Description:
        {companyInfo.description}
      </Grid>
      <Grid item xs={4} >
        Industry:
        {companyInfo.industry}
      </Grid>


      <div>
        {companyInfo.sector}
        {companyInfo.name}
        {companyInfo.url}
        {companyInfo.similar.map( ticker => {
          return (
            <div key={ticker}>
              {ticker}
            </div>
          )
        })}
      </div>


    </Grid>
  )
}

export default CompanyInfo;
