import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { X } from 'lucide-react';

export default function UserAssigneePicker({
    options,
    value,
    onChange,
    disabled = false,
    placeholder = 'Add users...',
    getOptionLabel = (user) => `${user.firstName} ${user.lastName}`,
}) {
    const handleRemove = (userId) => {
        onChange(value.filter((user) => user.id !== userId));
    };

    // Only show users who haven't already been assigned
    const availableUsers = options.filter(
        (user) => !value.some((selected) => selected.id === user.id)
    );

    const handleAdd = (user) => {
        if (!user) return;

        onChange([...value, user]);
    };

    return (
        <div className="assigned-users-row">
            <Autocomplete
                fullWidth
                options={availableUsers}
                value={null}
                disabled={disabled}
                onChange={(_event, user) => handleAdd(user)}
                getOptionLabel={getOptionLabel}
                isOptionEqualToValue={(option, val) =>
                    option.id === val.id
                }
                openOnFocus
                clearOnBlur
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                    />
                )}
                renderOption={(props, user) => (
                    <li
                        {...props}
                        key={user.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <span
                            className="owner-avatar"
                            style={{
                                background: user.accent,
                                color: '#fff',
                            }}
                        >
                            {user.initials}
                        </span>

                        <span className="selected-member-chip-info">
                            <span className="selected-member-chip-name">
                                {getOptionLabel(user)}
                            </span>

                            <span className="selected-member-chip-role">
                                {user.role}
                            </span>
                        </span>
                    </li>
                )}
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
                }}
            />

            {/* Selected users live OUTSIDE the Autocomplete */}
            <div className="assigned-users">
                {value.map((user) => (
                    <div
                        key={user.id}
                        className="selected-member-chip"
                    >
                        <span
                            className="owner-avatar"
                            style={{
                                background: user.accent,
                                color: '#fff',
                            }}
                        >
                            {user.initials}
                        </span>

                        <span className="selected-member-chip-info">
                            <span className="selected-member-chip-name">
                                {getOptionLabel(user)}
                            </span>

                            <span className="selected-member-chip-role">
                                {user.role}
                            </span>
                        </span>

                        {!disabled && (
                            <button
                                type="button"
                                className="selected-member-chip-remove"
                                aria-label={`Remove ${getOptionLabel(user)}`}
                                onClick={() => handleRemove(user.id)}
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}