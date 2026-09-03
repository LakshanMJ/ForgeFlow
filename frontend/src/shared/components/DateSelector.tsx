'use client';

import { ReactNode } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DateSelectorProps {
    label?: string;
    required?: boolean;
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    minDate?: string;
    maxDate?: string;
}

export default function DateSelector({
    label,
    required = false,
    placeholder = 'Select date...',
    value = '',
    onChange,
    disabled = false,
    minDate,
    maxDate,
}: DateSelectorProps) {
    const dateValue = value ? dayjs(value) : null;

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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={dateValue}
                    disabled={disabled}
                    minDate={minDate ? dayjs(minDate) : undefined}
                    maxDate={maxDate ? dayjs(maxDate) : undefined}
                    onChange={(newValue: Dayjs | null) => {
                        onChange(
                            newValue
                                ? newValue.format('YYYY-MM-DD')
                                : ''
                        );
                    }}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            placeholder,
                        },
                    }}
                />
            </LocalizationProvider>
        </div>
    );
}
