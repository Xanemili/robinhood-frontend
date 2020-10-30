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

      </div>

    </div>
  )
}

export default CompanyInfo;
