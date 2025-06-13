import { Search } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";

import Input from "@shared/ui/Input/Input";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
};

const SearchInput = memo<SearchInputProps>(
  ({
    value,
    onChange,
    placeholder = "트랙, 아티스트, 앨범 검색...",
    debounceMs = 300,
  }) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        onChange(inputValue);
      }, debounceMs);

      return () => clearTimeout(timer);
    }, [inputValue, onChange, debounceMs]);

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      },
      [],
    );

    return (
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        leftIcon={<Search size={20} />}
        className="h-10"
        autoComplete="off"
        spellCheck={false}
      />
    );
  },
);

export default SearchInput;
