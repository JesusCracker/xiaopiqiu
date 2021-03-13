/**
 * Created by XM on 2018/9/3.
 * @email xm@tqzgc.com
 */
import React, { Component } from 'react';
import { Input, Button } from 'antd';

/*
const locationIcon = {
  url: 'http://api0.map.bdimg.com/images/copyright_logo.png',
  size: { width: 100, height: 100 },
};
*/

export default class extends Component {
  constructor(props) {
    super(props);

    this.setMapRef = ref => {
      this.mapContainer = ref;
    };
  }

  componentDidMount() {
    this.createMapScript().then(this.initMap);
  }

  componentWillReceiveProps(nextProps) {
    if (this.inited) return;
    if (!this.mapLoaded) return;
    // console.log(nextProps.value, this.props.value)
    const { value } = nextProps;
    if (value) {
      const { point: position = { lng: undefined, lat: undefined } } = value;
      const { point: prePosition = { lng: undefined, lat: undefined } } = this.props.value || {};
      if (position.lng && position.lat && !prePosition.lng && !prePosition.lat) {
        // console.log(position)
        const point = new global.BMap.Point(position.lng, position.lat);
        this.map.panTo(point);
        if (this.marker) {
          this.marker.setPosition(point);
        } else {
          this.marker = new global.BMap.Marker(point);
          this.map.addOverlay(this.marker);
        }
        this.inited = true;
      }
    }
  }

  shouldComponentUpdate() {
    return !this.inited;
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.removeEventListener('click', this.onMapClick);
      this.map = null;
    }
  }

  onMapClick = event => {
    const { onChange } = this.props;
    const { point } = event;
    // this.setState({ mapCenter: { lng: point.lng, lat: point.lat } });

    this.map.panTo(new global.BMap.Point(point.lng, point.lat));
    if (this.marker) {
      this.marker.setPosition(point);
    } else {
      this.marker = new global.BMap.Marker(point);
      this.map.addOverlay(this.marker);
    }

    const myGeo = new global.BMap.Geocoder();
    myGeo.getLocation(point, result => {
      if (onChange) onChange(result);
    });
  };

  setCity = (city, zoom) => {
    this.map.setCenter(city);
    if (zoom) this.map.setZoom(zoom);
  };

  initMap = BMap => {
    // GL版命名空间为BMapGL

    // this.defaultCenter = getPoint(116.404, 39.915);
    // this.mapContainer = this.mapContainer || this.mapContainerRef.current;
    const { value } = this.props;
    const { point: position } = value || {};

    // console.log(this.props)

    const map = new BMap.Map(this.mapContainer, { enableMapClick: false });
    const marker = new BMap.Marker(new BMap.Point(104.071415, 30.575909));
    map.addOverlay(marker);
    if (Object.keys(map).length === 0) return;
    const point = new BMap.Point(
      (position && position.lng) || 104.071415,
      (position && position.lat) || 30.575909
    );
    map.centerAndZoom(point, 15);
    map.setDefaultCursor('pointer');
    map.disableScrollWheelZoom();
    map.disableDragging(); //禁止拖拽
    map.disableScrollWheelZoom(); //禁止缩放

    // map.addControl(new BMap.OverviewMapControl({ isOpen: true, size: new BMap.Size(140, 110) }));
    // map.addControl(new BMap.NavigationControl({type: global.BMAP_NAVIGATION_CONTROL_ZOOM}));
    // map.addControl(new BMap.NavigationControl());

    // map.addEventListener('tilesloaded', ()=>{
    // });
    if (position && position.lng && position.lat) {
      this.marker = new BMap.Marker(point);
      map.addOverlay(this.marker);
    } else {
      const myCity = new BMap.LocalCity();
      myCity.get(result => {
        // console.log(result)
        // map.setCenter(result.name);
      });
    }
    // map.addEventListener('click', this.onMapClick);

    this.map = map;
    this.mapLoaded = true;
  };

  createMapScript = () => {
    const ak = '9d21c4c10629084f5a5ea30c2a898a53';

    window.BMap = window.BMap || {};
    if (Object.keys(window.BMap).length === 0) {
      window.BMap.b_preload = new Promise(resolve => {
        const $script = document.createElement('script');
        document.body.appendChild($script);
        window.b_initBMap = () => {
          resolve(window.BMap);
          document.body.removeChild($script);
          window.BMap.b_preload = null;
          window.b_initBMap = null;
        };

        $script.src = `https://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=b_initBMap`;
      });
      return window.BMap.b_preload;
    }

    if (!window.BMap.b_preload) {
      return Promise.resolve(window.BMap);
    }
    return window.BMap.b_preload;
  };

  render() {
    const { width = '100%', height = 400, style } = this.props;

    return (
      <div style={{ border: 'solid 1px #e1e1e1', marginBottom: 16, borderRadius: 5 }}>
        <div ref={this.setMapRef} style={{ width, height, ...style }} />
      </div>
    );
  }
}
