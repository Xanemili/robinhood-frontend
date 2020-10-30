import React, {useContext} from 'react';
import RobinhoodContext from '../../RobinhoodContext';

const CompanyInfo = () => {
  const {asset: {companyInfo}} = useContext(RobinhoodContext);

  return(
    <div>
      <div>
        {companyInfo.ceo}
      </div>
      <div>
        {companyInfo.description}
        {companyInfo.industry}
        {companyInfo.sector}
        {companyInfo.name}
        {companyInfo.url}
        {companyInfo.similar.map( ticker => {
          return (
            <div>
              {ticker}
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default CompanyInfo;
