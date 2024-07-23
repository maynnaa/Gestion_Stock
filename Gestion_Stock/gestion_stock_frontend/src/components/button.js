// components/button.js
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const DynamicButton = ({ size, children, onMouseEnter, onMouseLeave, hovered }) => {
  const styles = {
    button: {
      width: size === 'large' ? '100%' : size === 'small' ? '50%' : '75%', 
      padding: '10px',
      margin: '10px 0',
      borderRadius: '20px', 
      fontSize: '18px',
      border: '1px solid transparent',
      transition: 'box-shadow 0.3s',
      cursor: 'pointer',
      boxShadow: hovered ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
      borderColor: hovered ? '#ccc' : 'transparent',
    },
  };

  return (
    <Button
      variant="outline-secondary"
      style={styles.button}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Button>
  );
};

DynamicButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  children: PropTypes.node.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  hovered: PropTypes.bool,
};

DynamicButton.defaultProps = {
  size: 'medium',
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  hovered: false,
};

export default DynamicButton;
