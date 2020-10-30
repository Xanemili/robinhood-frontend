import React, {useContext} from 'react';
import RobinhoodContext from '../../RobinhoodContext';

const CompanyNews = () => {

  const {asset: {companyNews}} = useContext(RobinhoodContext);

  if(!companyNews){
    return null;
  }
  return (
    <div>
      {companyNews.map( story => (
        <div>
          {story.image}
          {story.title}
          {story.url}
        </div>
      ))}
    </div>
  )
}

export default CompanyNews;
