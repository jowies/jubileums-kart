import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import GlassContainer from '../../ui/containers/GlassContainer.jsx';

FlowRouter.route('/', {
  action() {
    mount(GlassContainer);
  },
});
