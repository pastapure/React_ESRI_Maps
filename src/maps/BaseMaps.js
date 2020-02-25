import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

export const BaseMaps = () => {
  const mapRef = useRef();

  useEffect(() => {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      ["esri/Map", "esri/views/MapView", "esri/widgets/BasemapGallery"],
      { css: true }
    ).then(([ArcGISMap, MapView, BasemapGallery]) => {
      const map = new ArcGISMap({
        basemap: "gray"
      });

      // load the map view at the ref's DOM node
      const view = new MapView({
        container: mapRef.current,
        map: map,
        center: [78, 22],
        zoom: 5
      });
      var basemapGallery = new BasemapGallery({
        view: view
      });

      view.ui.add(basemapGallery, {
        position: "top-right"
      });

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
