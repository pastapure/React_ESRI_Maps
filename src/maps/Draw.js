import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

export const DrawMapView = () => {
  const mapRef = useRef();

  useEffect(() => {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      [
        "esri/widgets/Sketch",
        "esri/Map",
        "esri/layers/GraphicsLayer",
        "esri/views/MapView"
      ],
      { css: true }
    ).then(([Sketch, Map, GraphicsLayer, MapView]) => {
      const layer = new GraphicsLayer();

      const map = new Map({
        basemap: "streets",
        layers: [layer]
      });

      const view = new MapView({
        container: mapRef.current,
        map: map,
        zoom: 5,
        center: [78, 22]
      });

      const sketch = new Sketch({
        layer: layer,
        view: view,
        // graphic will be selected as soon as it is created
        creationMode: "update"
      });

      view.ui.add(sketch, "top-right");

      return () => {
        if (view) {
          // destroy the map view
          view.container = null;
        }
      };
    });
  });

  return <div className="webmap" ref={mapRef} />;
};
