import type { ChangeEvent } from "react";

import AnalyticsCards from "../analytics/AnalyticsCards";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  categories: string[];
  setCategories: (value: string[]) => void;

  priorities: string[];
  setPriorities: (value: string[]) => void;

  departments: string[];
  setDepartments: (value: string[]) => void;

  totalComplaints: number;
  visibleComplaints: number;
  criticalComplaints: number;
  clusterCount: number;
};

export default function FilterPanel({
  search,
  setSearch,

  categories,
  setCategories,

  priorities,
  setPriorities,

  departments,
  setDepartments,

  totalComplaints,
  visibleComplaints,
  criticalComplaints,
  clusterCount,
}: Props) {
  function toggleCategory(category: string) {
    if (categories.includes(category)) {
      setCategories(categories.filter((c) => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  }

  function togglePriority(priority: string) {
    if (priorities.includes(priority)) {
      setPriorities(priorities.filter((p) => p !== priority));
    } else {
      setPriorities([...priorities, priority]);
    }
  }

  function toggleDepartment(department: string) {
    if (departments.includes(department)) {
      setDepartments(departments.filter((d) => d !== department));
    } else {
      setDepartments([...departments, department]);
    }
  }

  return (
    <div
      style={{
        width: 320,
        background: "#ffffff",
        borderRight: "1px solid #ddd",
        padding: 20,
        overflowY: "auto",
        boxSizing: "border-box",
        height: "100vh",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          color: "#2563eb",
        }}
      >
        CivicVoice AI
      </h2>

      <AnalyticsCards
        total={totalComplaints}
        visible={visibleComplaints}
        critical={criticalComplaints}
        clusters={clusterCount}
      />

      <input
        type="text"
        placeholder="🔍 Search complaints..."
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginTop: "20px",
          marginBottom: "20px",
          boxSizing: "border-box",
        }}
      />

      <h3>Categories</h3>

      {["Road", "Water", "Electricity", "Garbage", "Sewage"].map((category) => (
        <label
          key={category}
          style={{
            display: "block",
            marginBottom: 8,
          }}
        >
          <input
            type="checkbox"
            checked={categories.includes(category)}
            onChange={() => toggleCategory(category)}
          />{" "}
          {category}
        </label>
      ))}

      <hr />

      <h3>Priority</h3>

      {["Critical", "High", "Medium", "Low"].map((priority) => (
        <label
          key={priority}
          style={{
            display: "block",
            marginBottom: 8,
          }}
        >
          <input
            type="checkbox"
            checked={priorities.includes(priority)}
            onChange={() => togglePriority(priority)}
          />{" "}
          {priority}
        </label>
      ))}

      <hr />

      <h3>Department</h3>

      {["Public Works", "Water Board", "Electricity Board", "Sanitation"].map(
        (department) => (
          <label
            key={department}
            style={{
              display: "block",
              marginBottom: 8,
            }}
          >
            <input
              type="checkbox"
              checked={departments.includes(department)}
              onChange={() => toggleDepartment(department)}
            />{" "}
            {department}
          </label>
        ),
      )}
    </div>
  );
}
