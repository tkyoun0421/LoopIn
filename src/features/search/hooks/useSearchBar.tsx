import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";

import useDebounce from "@shared/hooks/useDebounce";

const SEARCH_DEBOUNCE_DELAY_MS = 500;

const useSearchBar = (): UseSearchBar => {
  const { keyword: urlKeyword } = useParams<{ keyword: string }>();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const debouncedKeyword = useDebounce(keyword, SEARCH_DEBOUNCE_DELAY_MS);
  const isUserInputRef = useRef(false);

  useEffect(() => {
    if (!isUserInputRef.current) {
      setKeyword(urlKeyword || "");
    }
    isUserInputRef.current = false;
  }, [urlKeyword]);

  const handleKeywordChange = (value: string) => {
    isUserInputRef.current = true;
    setKeyword(value);
    console.log("keyword: ", value);
  };

  useEffect(() => {
    if (isUserInputRef.current) {
      if (debouncedKeyword.length === 0) {
        navigate("/search");
      } else if (debouncedKeyword.trim()) {
        navigate(`/search/${debouncedKeyword}`);
      }
    }
  }, [debouncedKeyword, navigate]);

  return {
    keyword,
    handleKeywordChange,
  };
};

export default useSearchBar;

type UseSearchBar = {
  keyword: string;
  handleKeywordChange: (value: string) => void;
};
