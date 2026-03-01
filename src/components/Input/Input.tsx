import cx from 'clsx';
import React from 'react';
import './Input.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };
    return (
      <div className={cx('input-container', className)} data-has-icon={!!afterSlot}>
        <input type="text" ref={ref} value={value} onChange={handleChange} {...props} />
        {afterSlot && <span className="input-icon">{afterSlot}</span>}
      </div>
    );
  }
);

export default Input;
