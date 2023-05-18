import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxLanguage from '@mapbox/mapbox-gl-language'; 
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

mapboxgl.accessToken = 'pk.eyJ1Ijoibml1eSIsImEiOiJjbGNpZXJoYXUwcmh0M3ZwbnhrcjhobzNxIn0.-7WCmLUa_6RD9mOMZ1AFkQ';
export default function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const [ Lng, setLng ] = useState(120.2); // 初始化经度
    // eslint-disable-next-line no-unused-vars
    const [ Lat, setLat ] = useState(30.3);// 初始化纬度
    const [ zoom, setZoom ] = useState(9); // 初始化缩放比例
    const language = new MapboxLanguage({ defaultLanguage: "zh-Hans" }); // 地图显示汉化

    useEffect(() => {
      if(map.current) return;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style:'mapbox://styles/mapbox/streets-v12',
        center: [Lng, Lat],
        zoom: zoom,
        preserveDrawingBuffer: true, //允许地图导出为图片
      });
      map.current.addControl(language);
      map.current.addControl(new mapboxgl.FullscreenControl()); // 全屏控件
      map.current.addControl(new mapboxgl.NavigationControl()); // 地图缩放和旋转控件
      map.current.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true,
        showAccuracyCircle: true,
        showUserLocation: true,
        showUserLocationMarker: true,
      }));
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker:true
        })
      map.current.addControl(geocoder);
    })

    useEffect(() => {
      if(!map.current) return;
      map.current.on('mousemove', () => {
        setLng(map.current.getCenter().Lng.toFixed(2));
        setLat(map.current.getCenter().Lat.toFixed(2));
        setZoom(map.current.getZoom().toFixed(2));
      });
    })

    return (
      <div>
          <div className="sidebar">
        Longitude: {Lng} | Latitude: {Lat} | Zoom: {zoom}
          </div>
            <div ref={mapContainer} className="map-container" />
      </div>
    )

}

