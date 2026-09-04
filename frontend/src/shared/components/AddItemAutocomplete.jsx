import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

/**
 * AddItemAutocomplete
 *
 * A minimal "add" picker. Click it, see the list of available items,
 * pick one — it's added to `selected` (via onAdd) and immediately
 * disappears from the dropdown, since already-selected items are
 * filtered out of `options` automatically. The input never displays
 * chips or the current selection — it's purely an "add" control.
 * Render the selected list wherever you want, separately.
 *
 * Props:
 * - options: T[]                 full universe of items (e.g. all users)
 * - selected: T[]                already-added items, filtered out of the dropdown
 * - onAdd: (item: T) => void     called with the picked item
 * - getId: (item: T) => string|number     default: item.id
 * - getLabel: (item: T) => string         default: item.label
 * - disabled?: boolean
 * - placeholder?: string          default: 'Add user...'
 *
 * Example:
 *   const [assignedUsers, setAssignedUsers] = useState([]);
 *
 *   <AddItemAutocomplete
 *       options={allUsers}
 *       selected={assignedUsers}
 *       onAdd={(user) => setAssignedUsers((prev) => [...prev, user])}
 *       getLabel={(u) => `${u.firstName} ${u.lastName}`}
 *   />
 *
 *   // render the list yourself, however you like:
 *   {assignedUsers.map((u) => <div key={u.id}>{u.firstName}</div>)}
 */
export default function AddItemAutocomplete({
    options,
    selected,
    onAdd,
    getId = (item) => item?.id,
    getLabel = (item) => item?.label ?? '',
    disabled = false,
    placeholder = 'Add user...',
}) {
    // Autocomplete is always "empty" from its own point of view —
    // picking a value hands it off to onAdd and resets immediately.
    const [inputValue, setInputValue] = useState('');

    const availableOptions = options.filter(
        (option) => !selected.some((item) => getId(item) === getId(option)),
    );

    return (
        <Autocomplete
            fullWidth
            disabled={disabled}
            options={availableOptions}
            value={null}
            inputValue={inputValue}
            onInputChange={(_event, newInputValue, reason) => {
                // keep typed text while searching, clear after a pick/blur
                if (reason === 'input') setInputValue(newInputValue);
            }}
            onChange={(_event, newValue) => {
                if (newValue) {
                    onAdd(newValue);
                    setInputValue('');
                }
            }}
            getOptionLabel={getLabel}
            isOptionEqualToValue={(option, val) => getId(option) === getId(val)}
            openOnFocus
            renderInput={(params) => (
                <TextField {...params} placeholder={placeholder} />
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

                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': { border: 'none' },
                    '&.Mui-focused': { borderColor: 'var(--border-strong)' },
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
            }}
        />
    );
}
