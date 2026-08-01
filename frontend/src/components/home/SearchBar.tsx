import { Search, SlidersHorizontal } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  onOpenFilters: () => void;
};

export default function SearchBar({
  search,
  setSearch,
  onOpenFilters,
}: Props) {
  return (
    <div className="mb-6 flex items-center gap-4">

      {/* Search Box */}

      <div className="flex flex-1 items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

        <Search
          size={20}
          className="mr-3 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search complaints..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
        />

      </div>

      {/* Filter Button */}

      <button
        onClick={onOpenFilters}
        className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        <SlidersHorizontal size={18} />
        Filters
      </button>

    </div>
  );
}