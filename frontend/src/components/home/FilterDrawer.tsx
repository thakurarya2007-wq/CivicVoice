import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;

  categories: string[];
  setCategories: (value: string[]) => void;

  priorities: string[];
  setPriorities: (value: string[]) => void;

  departments: string[];
  setDepartments: (value: string[]) => void;
};

const CATEGORY_OPTIONS = [
  "Road",
  "Water",
  "Electricity",
  "Garbage",
  "Sewage",
];

const PRIORITY_OPTIONS = [
  "Critical",
  "High",
  "Medium",
  "Low",
];

const DEPARTMENT_OPTIONS = [
  "Public Works",
  "Water Board",
  "Electricity Board",
  "Sanitation",
];

export default function FilterDrawer({
  open,
  onClose,
  categories,
  setCategories,
  priorities,
  setPriorities,
  departments,
  setDepartments,
}: Props) {
  if (!open) return null;

  function toggleItem(
    list: string[],
    value: string,
    setter: (items: string[]) => void
  ) {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
    } else {
      setter([...list, value]);
    }
  }

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed left-0 top-0 z-50 h-screen w-80 overflow-y-auto bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-bold">
            Filters
          </h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="space-y-8 p-6">

          <FilterSection
            title="Categories"
            options={CATEGORY_OPTIONS}
            values={categories}
            setter={setCategories}
            toggle={toggleItem}
          />

          <FilterSection
            title="Priority"
            options={PRIORITY_OPTIONS}
            values={priorities}
            setter={setPriorities}
            toggle={toggleItem}
          />

          <FilterSection
            title="Department"
            options={DEPARTMENT_OPTIONS}
            values={departments}
            setter={setDepartments}
            toggle={toggleItem}
          />

          <div className="flex gap-3">

            <button
              className="flex-1 rounded-xl border border-slate-300 p-3 hover:bg-slate-100"
              onClick={() => {
                setCategories([]);
                setPriorities([]);
                setDepartments([]);
              }}
            >
              Reset
            </button>

            <button
              className="flex-1 rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700"
              onClick={onClose}
            >
              Apply
            </button>

          </div>

        </div>
      </aside>
    </>
  );
}

type FilterSectionProps = {
  title: string;
  options: string[];
  values: string[];
  setter: (value: string[]) => void;
  toggle: (
    list: string[],
    value: string,
    setter: (items: string[]) => void
  ) => void;
};

function FilterSection({
  title,
  options,
  values,
  setter,
  toggle,
}: FilterSectionProps) {
  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold">
        {title}
      </h3>

      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3"
          >
            <input
              type="checkbox"
              checked={values.includes(option)}
              onChange={() => toggle(values, option, setter)}
            />

            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}