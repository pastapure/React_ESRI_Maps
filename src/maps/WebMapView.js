import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

export const WebMapView = () => {
  const mapRef = useRef();

  useEffect(() => {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      ["esri/Map", "esri/views/MapView", "esri/widgets/CoordinateConversion"],
      { css: true }
    ).then(([ArcGISMap, MapView, CoordinateConversion]) => {
      const map = new ArcGISMap({
        basemap: "topo-vector"
      });

      // load the map view at the ref's DOM node
      const view = new MapView({
        container: mapRef.current,
        map: map,
        center: [78, 22],
        zoom: 5
      });

      var ccWidget = new CoordinateConversion({
        view: view
      });

      view.ui.add(ccWidget, "bottom-left");

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
