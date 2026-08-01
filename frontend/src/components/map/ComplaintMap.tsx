import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import MarkerClusterGroup from "react-leaflet-cluster";

import ComplaintMarker from "./ComplaintMarker";
import type { Complaint } from "../../types/complaint";

type Props = {
  complaints: Complaint[];
};

export default function ComplaintMap({ complaints }: Props) {
  return (
    <MapContainer
      center={[28.6129332, 77.2294928]}
      zoom={17}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup
        chunkedLoading
        showCoverageOnHover={false}
      >
        {complaints.map((complaint) => (
          <ComplaintMarker
            key={complaint.id}
            complaint={complaint}
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}