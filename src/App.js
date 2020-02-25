import React, { useState } from "react";
import "./styles.css";
import { WebMapView } from "./maps/WebMapView";
import { BaseMaps } from "./maps/BaseMaps";
import { DrawMapView } from "./maps/Draw";
import { Editor } from "./maps/Editor";

export default function App() {
  const [Mapitems] = useState([
    <WebMapView />,
    <BaseMaps />,
    <DrawMapView />,
    <Editor />
  ]);

  const [items] = useState([
    { label: "Simple Map View", value: 0 },
    { label: "Base Map Gallery", value: 1 },
    { label: "Draw Map", value: 2 },
    { label: "Editor Map", value: 3 }
  ]);

  const [value, setValue] = useState(0);
  return (
    <>
      <div style={{ height: "3vh" }}>
        <b>React ESRI Map Examples --> </b>
        <select onChange={e => setValue(e.currentTarget.value)}>
          {items.map(item => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      {Mapitems[value]}
    </>
  );
}
