import ProvicesCoordinates from './api/Provinces/provicesCoordinates.json' assert {type: 'json'};
import Routes from './api/Routes/routes.json' assert {type: 'json'};
import Bridges from './api/Bridges/bridges.json' assert {type: 'json'};
import Cities from './api/Cities/cities.json' assert {type: 'json'};
import Towns from './api/Towns/towns.json' assert {type: 'json'};
import Districts from './api/Districts/districts.json' assert {type: 'json'};
import Members from './api/Members/members.json' assert {type: 'json'};

require([
   "esri/config",
   "esri/Map",
   "esri/views/MapView",

   "esri/Graphic",
   "esri/layers/GraphicsLayer"

], function (esriConfig, Map, MapView, Graphic, GraphicsLayer) {

   esriConfig.apiKey = "YOUR_API_KEY";

   const map = new Map({
      basemap: "topo-vector" //Basemap layer service
   });

   const view = new MapView({
      map: map,
      center: [106.32871718359758, 9.972746628038214], //Longitude, latitude
      zoom: 13,
      container: "viewDiv"
   });

   const graphicsLayer = new GraphicsLayer();
   map.add(graphicsLayer);

   function random_rgba() {
      var o = Math.round, r = Math.random, s = 255;
      // return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
      return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.3 + ')';
   }

   function random_rgba_route() {
      var o = Math.round, r = Math.random, s = 255;
      return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 1 + ')';
   }
   
   // Các cầu
   Bridges.features.map((item) => {
      const point = {
         type: "point",
         longitude: item.geometry.coordinates.longitude,
         latitude: item.geometry.coordinates.latitude
      };

      const simpleMarkerSymbol = {
         type: "picture-marker",
         url: "./assets/icon/bridgeIcon.png",
         width: "24px",
         height: "24px"
      };

      const popupTemplate = {
         title: "Cầu {Name}",
         content: "Cầu {Description}"
      }

      const attributes = {
         Name: item.properties.ten_cau,
         Description: item.properties.ten_cau,
      }

      const pointGraphic = new Graphic({
         geometry: point,
         symbol: simpleMarkerSymbol,

         attributes: attributes,
         popupTemplate: popupTemplate
      });
      graphicsLayer.add(pointGraphic);
   })

   // Các tỉnh
   ProvicesCoordinates.features.map((item) => {
      const color = random_rgba()
      const itemSymbol = {
         type: "simple-fill",
         color: color,
         outline: {
            color: [255, 255, 255],
            width: 1
         }
      };

      const popupTemplate = {
         title: "{Name}",
         content: `Diện tích: {Area} km2 | Dân số: {Population} người (Năm 2021)`
      }

      const attributes = {
         Name: item.properties.ten_tinh,
         Description: item.properties.ten_tinh,
         Population: item.properties.population,
         Area: item.properties.area
      }

      item.geometry.coordinates.map((i) => {
         const itemPolygon = {
            type: 'polygon',
            rings: i
         }

         const itemGraphic = new Graphic({
            geometry: itemPolygon,
            symbol: itemSymbol,

            attributes: attributes,
            popupTemplate: popupTemplate
         });

         graphicsLayer.add(itemGraphic);
      })
   })

   // Quốc lộ
   Routes.features.map((item) => {
      const polyline = {
         type: "polyline",
         paths: item.geometry.coordinates[0][0]
      };

      const simpleLineSymbol = {
         type: "simple-line",
         color: random_rgba_route(),
         width: 2
      };

      const attributes = {
         Name: item.properties.ten_quoc_lo,
         Description: item.properties.ten_quoc_lo
      }

      const popupTemplate = {
         title: "{Name}",
         content: "{Description}"
      }

      const polylineGraphic = new Graphic({
         geometry: polyline,
         symbol: simpleLineSymbol,
         attributes: attributes,
         popupTemplate: popupTemplate
      });

      graphicsLayer.add(polylineGraphic);
   })

   // Các thành phố
   Cities.features.map((item) => {
      const point = {
         type: "point",
         longitude: item.geometry.coordinates.longitude,
         latitude: item.geometry.coordinates.latitude
      };

      const simpleMarkerSymbol = {
         type: "picture-marker",
         url: "./assets/icon/cityIcon.png",
         width: "24px",
         height: "24px"
      };

      const popupTemplate = {
         title: "{Name}",
         content: "{Description}"
      }

      const attributes = {
         Name: item.properties.ten_thanh_pho,
         Description: item.properties.ten_thanh_pho,
      }

      const pointGraphic = new Graphic({
         geometry: point,
         symbol: simpleMarkerSymbol,

         attributes: attributes,
         popupTemplate: popupTemplate
      });
      graphicsLayer.add(pointGraphic);
   })

   // Các huyện
   Districts.features.map((item) => {
      const point = {
         type: "point",
         longitude: item.geometry.coordinates.longitude,
         latitude: item.geometry.coordinates.latitude
      };

      const simpleMarkerSymbol = {
         type: "picture-marker",
         url: "./assets/icon/district.png",
         width: "24px",
         height: "24px"
      };

      const popupTemplate = {
         title: "{Name}",
         content: "{Description}"
      }

      const attributes = {
         Name: item.properties.ten_huyen,
         Description: item.properties.ten_huyen,
      }

      const pointGraphic = new Graphic({
         geometry: point,
         symbol: simpleMarkerSymbol,

         attributes: attributes,
         popupTemplate: popupTemplate
      });
      graphicsLayer.add(pointGraphic);
   })

   // Các thị xã
   Towns.features.map((item) => {
      const point = {
         type: "point",
         longitude: item.geometry.coordinates.longitude,
         latitude: item.geometry.coordinates.latitude
      };

      const simpleMarkerSymbol = {
         type: "picture-marker",
         url: "./assets/icon/townIcon.png",
         width: "24px",
         height: "24px"
      };

      const popupTemplate = {
         title: "{Name}",
         content: "{Description}"
      }

      const attributes = {
         Name: item.properties.ten_thi_xa,
         Description: item.properties.ten_thi_xa,
      }

      const pointGraphic = new Graphic({
         geometry: point,
         symbol: simpleMarkerSymbol,

         attributes: attributes,
         popupTemplate: popupTemplate
      });
      graphicsLayer.add(pointGraphic);
   })

   // Các thành viên
   Members.features.map((item) => {
      const point = {
         type: "point",
         longitude: item.geometry.coordinates.longitude,
         latitude: item.geometry.coordinates.latitude
      };

      const simpleMarkerSymbol = {
         type: "picture-marker",
         url: item.properties.image,
         width: "36px",
         height: "36px",
      };

      const popupTemplate = {
         title: "{Name}",
         content: "{Description}"
      }

      const attributes = {
         Name: item.properties.ten_member,
         Description: item.properties.ten_member,
      }

      const pointGraphic = new Graphic({
         geometry: point,
         symbol: simpleMarkerSymbol,

         attributes: attributes,
         popupTemplate: popupTemplate
      });
      graphicsLayer.add(pointGraphic);
   })
});