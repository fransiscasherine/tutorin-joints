
import { useState } from "react";
import AppIcon from "./AppIcon";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <label className="search-box">
      <AppIcon name="fa7-solid:search" size={24} />

      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Cari mentor atau mata pelajaran..."
        aria-label="Cari mentor atau mata pelajaran"
      />

      {search && (
        <button
          type="button"
          className="clear-search"
          aria-label="Hapus pencarian"
          onClick={() => setSearch("")}
        >
          <AppIcon name="solar:close-circle-bold" size={19} />
        </button>
      )}
    </label>
  );
}
