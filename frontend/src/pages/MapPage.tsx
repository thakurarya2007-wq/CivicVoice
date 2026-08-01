import { useEffect, useMemo, useState } from "react";

import MainLayout from "../layout/MainLayout";

import ComplaintMap from "../components/map/ComplaintMap";
import AnalyticsGrid from "../components/analytics/AnalyticsGrid";
import SearchBar from "../components/home/SearchBar";

import { getComplaintMapData } from "../services/complaintApi";
import type { Complaint } from "../types/complaint";
import FilterDrawer from "../components/home/FilterDrawer";

export default function MapPage() {
  // =========================
  // Complaint Data
  // =========================

  const [complaints, setComplaints] = useState<Complaint[]>([]);

  // =========================
  // Search
  // =========================

  const [search, setSearch] = useState("");

  // =========================
  // Filters
  // =========================

  const [categories, setCategories] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);

  // =========================
  // Load Complaints
  // =========================

  useEffect(() => {
    async function loadComplaints() {
      try {
        const data = await getComplaintMapData();
        setComplaints(data);
      } catch (error) {
        console.error("Failed to load complaints:", error);
      }
    }

    loadComplaints();
  }, []);

  // =========================
  // Filter Complaints
  // =========================

  const filteredComplaints = useMemo(() => {
    const query = search.trim().toLowerCase();

    return complaints.filter((complaint) => {
      const matchesSearch =
        query === "" ||
        complaint.title.toLowerCase().includes(query) ||
        complaint.category.toLowerCase().includes(query) ||
        complaint.department.toLowerCase().includes(query) ||
        complaint.priority.toLowerCase().includes(query);

      const matchesCategory =
        categories.length === 0 ||
        categories.includes(complaint.category);

      const matchesPriority =
        priorities.length === 0 ||
        priorities.includes(complaint.priority);

      const matchesDepartment =
        departments.length === 0 ||
        departments.includes(complaint.department);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPriority &&
        matchesDepartment
      );
    });
  }, [
    complaints,
    search,
    categories,
    priorities,
    departments,
  ]);

  // =========================
  // Dashboard Analytics
  // =========================

  const totalComplaints = complaints.length;

  const criticalComplaints = complaints.filter(
    (complaint) =>
      complaint.priority.toLowerCase() === "critical"
  ).length;

  const clusterCount = new Set(
    complaints.map((complaint) => complaint.cluster_id)
  ).size;

  // Temporary until complaint status is available
  const resolvedComplaints = 0;

  // =========================
  // Filter Drawer (Temporary)
  // =========================

  const [drawerOpen, setDrawerOpen] = useState(false);

  // =========================
  // UI
  // =========================

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Analytics */}
        <AnalyticsGrid
          total={totalComplaints}
          critical={criticalComplaints}
          clusters={clusterCount}
          resolved={resolvedComplaints}
        />

        {/* Search */}
        <SearchBar
          search={search}
          setSearch={setSearch}
          onOpenFilters={() => setDrawerOpen(true)}
        />

        {/* Map */}
        <div className="h-[calc(100vh-280px)] overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
          <ComplaintMap complaints={filteredComplaints} />
        </div>
      </div>
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        categories={categories}
        setCategories={setCategories}
        priorities={priorities}
        setPriorities={setPriorities}
        departments={departments}
        setDepartments={setDepartments}
      />
    </MainLayout>
  );
}