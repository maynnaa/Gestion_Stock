import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ size, children, onMouseEnter, onMouseLeave, hovered, onClick }) => {
  const buttonStyles = {
    width: size === 'large' ? '100%' : size === 'small' ? '50%' : '75%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '20px',
    fontSize: '18px',
    border: '1px solid transparent',
    backgroundColor: hovered ? '#6c757d' : '#ABEDDD', // Darker gray on hover, lighter gray otherwise
    color: hovered ? '#fff' : '#6c757d', // White text on hover, light gray otherwise
    textAlign: 'center',
    transition: 'all 0.3s ease', // Smooth transition for hover effects
    boxShadow: hovered ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
    borderColor: hovered ? '#6c757d' : 'transparent',
    cursor: 'pointer',
    outline: 'none', // Remove default outline
  };

  return (
    <button
      style={buttonStyles}
      onMouseEnter={() => onMouseEnter(true)}
      onMouseLeave={() => onMouseLeave(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  children: PropTypes.node.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  hovered: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  size: 'medium',
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  hovered: false,
  onClick: () => {},
};

export default Button;
