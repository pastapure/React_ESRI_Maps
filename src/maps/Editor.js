import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

export const Editor = () => {
  const mapRef = useRef();

  useEffect(() => {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(["esri/WebMap", "esri/views/MapView", "esri/widgets/Editor"], {
      css: true
    }).then(([WebMap, MapView, Editor]) => {
      // Create a map from the referenced webmap item id
      let webmap = new WebMap({
        portalItem: {
          id: "6c5d657f1cb04a5eb78a450e3c699c2a"
        }
      });

      let view = new MapView({
        container: mapRef.current,
        map: webmap
      });

      view.when(function() {
        view.popup.autoOpenEnabled = false; //disable popups

        // Create the Editor
        let editor = new Editor({
          view: view
        });

        // Add widget to top-right of the view
        view.ui.add(editor, "top-right");
      });
      return () => {
        if (view) {
          // destroy the map view
          view.container = null;
        }
      };
    });
  });

  return (
    <>
      <div className="webmap" ref={mapRef} /> <div id="editorDiv" />
    </>
  );
};
