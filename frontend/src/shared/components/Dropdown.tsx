'use client';

import { ReactNode } from 'react';

export interface DropdownOption {
    value: string;
    label: string;
    icon?: ReactNode;
    dotColor?: string;
}

interface DropdownProps {
    label?: string;
    required?: boolean;
    placeholder?: string;
    options: DropdownOption[];
    value?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    icon?: ReactNode;
}

export default function Dropdown({
    label,
    required = false,
    placeholder = 'Select...',
    options,
    value = '',
    onChange,
    disabled = false,
}: DropdownProps) {
    return (
        <div className="form-field">
            {label && (
                <label className="form-label">
                    {label}
                    {required && (
                        <span className="required">*</span>
                    )}
                </label>
            )}

            <div className="form-select-wrapper">
                <select
                    className="form-select-btn"
                    value={value}
                    disabled={disabled}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>

                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}