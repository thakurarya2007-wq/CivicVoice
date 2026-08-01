import type { Complaint } from "../types/complaint";

const API_URL = "http://127.0.0.1:8000/api/v1/complaints/map";

export async function getComplaintMapData(): Promise<Complaint[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch map data");
    }

    return await response.json();
}