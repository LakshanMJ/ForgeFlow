'use client';

import {
    ChevronDown,
    Check,
} from 'lucide-react';
import {
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';

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
    value,
    onChange,
    disabled = false,
    icon,
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(
        (option) => option.value === value,
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(
                    event.target as Node,
                )
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener(
            'mousedown',
            handleClickOutside,
        );

        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside,
            );
        };
    }, []);

    const handleSelect = (option: DropdownOption) => {
        onChange(option.value);
        setIsOpen(false);
    };

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

            <div
                className="form-select-wrapper"
                ref={dropdownRef}
            >
                <button
                    type="button"
                    className="form-select-btn"
                    disabled={disabled}
                    onClick={() =>
                        setIsOpen((previous) => !previous)
                    }
                >
                    <span className="form-select-btn-left">
                        {selectedOption?.dotColor ? (
                            <span
                                className="select-dot"
                                style={{
                                    backgroundColor:
                                        selectedOption.dotColor,
                                }}
                            />
                        ) : (
                            selectedOption?.icon ?? icon
                        )}

                        {selectedOption?.label ??
                            placeholder}
                    </span>

                    <ChevronDown
                        size={14}
                        className={`chevron ${
                            isOpen ? 'open' : ''
                        }`}
                    />
                </button>

                {isOpen && (
                    <div className="form-dropdown-menu">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                className="form-dropdown-option"
                                onClick={() =>
                                    handleSelect(option)
                                }
                            >
                                <span className="form-dropdown-option-left">
                                    {option.dotColor ? (
                                        <span
                                            className="select-dot"
                                            style={{
                                                backgroundColor:
                                                    option.dotColor,
                                            }}
                                        />
                                    ) : (
                                        option.icon
                                    )}

                                    {option.label}
                                </span>

                                {option.value === value && (
                                    <Check size={14} />
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}