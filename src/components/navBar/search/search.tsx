import { onSearch } from "../../../store/appReducer";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { memo } from "react";

export const Search = memo(() => {
  console.log("rerender search");
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.app.searchQuery);
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
