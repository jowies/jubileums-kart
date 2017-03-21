import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Glass } from '../../api/glass/glass.js';
import Main from '../pages/Main.jsx';

const GlassContainer = createContainer(() => {
  const glassHandle = Meteor.subscribe('glass.public');
  const loading = !glassHandle.ready;
  return {
    loading,
    connected: Meteor.status().connected,
    points: Glass.find({}).fetch(),
  };
}, Main);

export default GlassContainer;
