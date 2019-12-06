import React, { forwardRef } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

const Button = forwardRef(
  (
    {
      as = 'button',
      color = 'primary',
      variant = 'raised',
      disabled = false,
      size = 'big',
      type = 'button',
      className,
      ...props
    },
    ref,
  ) => {
    const Component = as;

    return (
      <Component
        data-toolkit-button
        className={classNames(
          styles.button,
          styles[color],
          styles[variant],
          styles[size],
          {
            [styles.disabled]: disabled,
          },
          className,
        )}
        disabled={disabled}
        {...props}
        ref={ref}
        type={type}
      />
    );
  },
);

export default Button;