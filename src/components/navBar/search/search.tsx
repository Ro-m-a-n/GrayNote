import { onSearch } from "../../../store/navBarReducer";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { memo } from "react";

export const Search = memo(() => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.navBar.searchQuery);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(onSearch(e.target.value));
  };
  return (
    <div className="search_wrap">
      <input
        type="search"
        onChange={handleChange}
        placeholder="Search"
        value={searchQuery}
      />
    </div>
  );
});
