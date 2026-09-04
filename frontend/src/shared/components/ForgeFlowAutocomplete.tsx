'use client';

import { ReactNode } from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface ForgeFlowAutocompleteProps<T> {
    options: T[];
    value: T[];
    onChange: (value: T[]) => void;

    getOptionLabel: (option: T) => string;
    getOptionKey: (option: T) => string;

    renderOption?: (option: T) => ReactNode;
    renderValue?: (option: T) => ReactNode;

    placeholder?: string;
    placeholderSelected?: string;
    disabled?: boolean;
    onRemove?: (option: T) => void;
}

export default function ForgeFlowAutocomplete<T>({
    options,
    value,
    onChange,
    getOptionLabel,
    getOptionKey,
    renderOption,
    renderValue,
    placeholder = 'Select...',
    placeholderSelected = 'Add another...',
    disabled = false,
    onRemove,
}: ForgeFlowAutocompleteProps<T>) {
    return (
        <Autocomplete
            multiple
            fullWidth
            options={options}
            value={value}
            disabled={disabled}
            onChange={(_event, newValue) => {
                onChange(newValue);
            }}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(option, selected) =>
                getOptionKey(option) === getOptionKey(selected)
            }
            filterSelectedOptions
            openOnFocus
            disableCloseOnSelect
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={
                        value?.length === 0
                            ? placeholder
                            : placeholderSelected
                    }
                />
            )}
            renderOption={(props, option) => (
                <li
                    {...props}
                    key={getOptionKey(option)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    {renderOption
                        ? renderOption(option)
                        : getOptionLabel(option)}
                </li>
            )}
            renderValue={(selected, getItemProps) =>
                selected.map((option, index) => {
                    const { key, ...itemProps } =
                        getItemProps({ index });

                    return (
                        <div
                            {...itemProps}
                            key={key}
                        >
                            {renderValue
                                ? renderValue(option)
                                : getOptionLabel(option)}

                            {onRemove && !disabled && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemove(option);
                                    }}
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    );
                })
            }
            sx={{
                '& .MuiOutlinedInput-root': {
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '13px',
                    color: 'var(--text)',
                    fontFamily: 'inherit',
                    outline: 'none',
                    width: '100%',

                    '& fieldset': {
                        border: 'none',
                    },

                    '&:hover fieldset': {
                        border: 'none',
                    },

                    '&.Mui-focused fieldset': {
                        border: 'none',
                    },

                    '&.Mui-focused': {
                        borderColor: 'var(--border-strong)',
                    },
                },

                '& .MuiAutocomplete-input': {
                    padding: '6px 4px !important',
                    fontSize: '13px',
                    color: 'var(--text)',

                    '&::placeholder': {
                        color: 'var(--text-tertiary)',
                        opacity: 1,
                    },
                },

                '& .MuiAutocomplete-inputRoot': {
                    padding: '3px 8px !important',
                },

                '& .MuiAutocomplete-tag': {
                    margin: 0,
                },
            }}
        />
    );
}