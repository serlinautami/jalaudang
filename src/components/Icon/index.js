import React from 'react';
import PropTypes from 'prop-types';
import { icons } from '../../assets';

const Icon = ({ icon, ...props }) => {
  if(!icon) return null;
  
  const RenderIcon = icons[icon];
  
  return <RenderIcon {...props} />
}

Icon.propTypes = {
  icon: PropTypes.string,
}
Icon.defaultProps = {
  icon: null
}

export default React.memo(Icon);