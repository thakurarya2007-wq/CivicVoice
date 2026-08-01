export interface Complaint {
    id: number;
    title: string;
    cluster_id: number;
    latitude: number;
    longitude: number;
    priority: string;
    department: string;
    category: string;
}