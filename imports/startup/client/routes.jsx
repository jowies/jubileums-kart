import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import Main from '../../ui/pages/Main.jsx';

FlowRouter.route('/', {
  action() {
    mount(Main, { points: [{
      _id: 'lol',
      active: true,
      long: 63.418,
      lat: 10.403,
      label: 'Oppe og nede, nede og opp, blablabla',
    },
    {
      _id: 'lol2',
      active: false,
      long: 63.419,
      lat: 10.403,
      label: 'Oppe og nede, nede og opp, blablabla',
    }] });
  },
});
