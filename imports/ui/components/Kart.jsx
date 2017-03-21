import React from 'react';
import L from 'leaflet';
import '../stylesheets/leaflet.scss';

export default class Kart extends React.Component {
  constructor(props) {
    super(props);

    this.mymap = {};
    this.points = [];

    this.addMap = this.addMap.bind(this);
  }

  componentDidMount() {
    this.addMap();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.points.length === this.props.points.length) {
      for (let i = 0; i < prevProps.points.length; i++) {
        if (prevProps.points[i].active ? !this.props.points[i].active : this.props.points[i].active) {
          if (this.props.points[i].active) {
            this.points[i].setStyle({ fillColor: '#b11b11', color: '#b11b11' });
          } else {
            this.points[i].setStyle({ fillColor: 'grey', color: 'grey' });
          }
        }
      }
    }
    if (prevProps.points.length < this.props.points.length) {
      const point = this.props.points[this.props.points.length - 1];
      const circle = L.circle([point.long, point.lat], this.getOptions(point)).addTo(this.mymap);
      circle.id = point._id;
      this.points.push(circle);
      circle.bindPopup(point.label);
    }
    if (prevProps.points.length > this.props.points.length) {
      this.points.forEach((point) => {
        this.mymap.removeLayer(point);
      });
    }
  }

  getOptions(point) {
    const options = {
      fillOpacity: 0.9,
      radius: 5,
      stroke: false,
    };
    if (point.active) {
      options.color = '#b11b11';
      options.fillColor = '#b11b11';
    } else {
      options.color = 'grey';
      options.fillColor = 'grey';
    }
    return options;
  }

  addPoints() {
    for (let i = 0; i < this.props.points.length; i++) {
      const point = this.props.points[i];
      const circle = L.circle([point.lat, point.long], this.getOptions(point)).addTo(this.mymap);
      circle.id = point._id;
      this.points.push(circle);
      const status = point.active ? 'Ikke funnet' : 'Funnet';
      const customPopup = '<p>Hint: ' + point.label + '</p><p>Status: ' + status + '</p>';
      circle.bindPopup(customPopup);
    }
  }

  click(e) {
    console.log(e.latlng);
  }

  addMap() {
    this.mymap = L.map('mapid', { zoomControl: false, attributionControl: false }).setView([63.418, 10.403], 16);
    L.tileLayer('https://api.mapbox.com/styles/v1/jowies/cizsbztnx008f2rkwdtl6c910/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam93aWVzIiwiYSI6ImNpeWt3MHRyYzAwMXgyeHFsY2V1em93YmEifQ.XeeFjGAlq5WE2jB_tQtVvw',
      {
        maxZoom: 21,
        minZoom: 15,
      }).addTo(this.mymap);
    L.control.zoom({
      position: 'bottomright',
    }).addTo(this.mymap);
    L.control.attribution({
      position: 'bottomleft',
    }).addTo(this.mymap);
    const attribution = this.mymap.attributionControl;
    attribution.setPrefix('<a href="http://jubileum.abakus.no"><img style="height: 75px; width: 225px"src="logo.svg"></a>');
    this.addPoints();
    this.mymap.on('click', this.click);
  }

  render() {
    return (
      <div id="mapid" style={{ height: this.props.height, width: this.props.width }} >
      </div>
    );
  }
}

Kart.propTypes = {
  points: React.PropTypes.array,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
};
