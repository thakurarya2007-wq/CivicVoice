import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

import type { Complaint } from "../../types/complaint";

import criticalIcon from "../../assets/markers/critical.svg";
import highIcon from "../../assets/markers/high.svg";
import mediumIcon from "../../assets/markers/medium.svg";
import lowIcon from "../../assets/markers/low.svg";

type Props = {
  complaint: Complaint;
};

function getMarkerIcon(priority: string) {
  let iconUrl = lowIcon;

  switch (priority.toLowerCase()) {
    case "critical":
      iconUrl = criticalIcon;
      break;

    case "high":
      iconUrl = highIcon;
      break;

    case "medium":
      iconUrl = mediumIcon;
      break;

    case "low":
    default:
      iconUrl = lowIcon;
      break;
  }

  return L.icon({
    iconUrl,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
  });
}

function priorityColor(priority: string) {
  switch (priority.toLowerCase()) {
    case "critical":
      return "#dc2626";

    case "high":
      return "#ea580c";

    case "medium":
      return "#ca8a04";

    case "low":
    default:
      return "#16a34a";
  }
}

export default function ComplaintMarker({ complaint }: Props) {
  return (
    <Marker
      position={[complaint.latitude, complaint.longitude]}
      icon={getMarkerIcon(complaint.priority)}
    >
      <Popup minWidth={280}>
        <div
          style={{
            fontFamily: "Arial",
            minWidth: "260px",
          }}
        >
          <h3
            style={{
              margin: 0,
              marginBottom: "12px",
              color: "#2563eb",
            }}
          >
            {complaint.title}
          </h3>

          <div
            style={{
              display: "inline-block",
              background: priorityColor(complaint.priority),
              color: "#fff",
              padding: "5px 12px",
              borderRadius: "16px",
              fontSize: "13px",
              marginBottom: "12px",
            }}
          >
            {complaint.priority}
          </div>

          <table
            style={{
              width: "100%",
              fontSize: "14px",
            }}
          >
            <tbody>
              <tr>
                <td>
                  <strong>Category</strong>
                </td>
                <td>{complaint.category}</td>
              </tr>

              <tr>
                <td>
                  <strong>Department</strong>
                </td>
                <td>{complaint.department}</td>
              </tr>

              <tr>
                <td>
                  <strong>Cluster</strong>
                </td>
                <td>{complaint.cluster_id}</td>
              </tr>

              <tr>
                <td>
                  <strong>Latitude</strong>
                </td>
                <td>{complaint.latitude.toFixed(5)}</td>
              </tr>

              <tr>
                <td>
                  <strong>Longitude</strong>
                </td>
                <td>{complaint.longitude.toFixed(5)}</td>
              </tr>
            </tbody>
          </table>

          <button
            style={{
              marginTop: "16px",
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => alert(`Complaint ID: ${complaint.id}`)}
          >
            View Complaint Details
          </button>
        </div>
      </Popup>
    </Marker>
  );
}