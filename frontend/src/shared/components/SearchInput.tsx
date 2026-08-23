import React, { InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconSize?: number;
  containerClassName?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  iconSize = 14,
  containerClassName = '',
  className = '',
  placeholder = 'Search...',
  ...props
}) => {
  return (
    <div className={`search-input ${containerClassName}`.trim()}>
      <Search size={iconSize} />
      <input
        type="text"
        placeholder={placeholder}
        className={className}
        {...props}
      />
    </div>
  );
};

export default SearchInput;