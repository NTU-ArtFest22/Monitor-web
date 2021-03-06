// We only need to import the modules necessary for initial render
import App from '../Containers/App';
import Body from '../Containers/Body';
import { switchMonitor } from '../Actions/Monitors';
import { toggleLoading } from '../Actions/Videos';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: App,
  indexRoute: {
    component: Body
  },
  onEnter: (nextState) => {
    const monitor = store.getState().app.monitor;
    const nextMonitor = nextState.location.query.monitor
    if (nextMonitor && monitor !== nextMonitor) {
      store.dispatch(toggleLoading());
      store.dispatch(switchMonitor(nextMonitor));
      setTimeout(() => {
        store.dispatch(toggleLoading());
      }, 500);
    }
  },
  onChange: (prevState, nextState) => {
    const monitor = store.getState().app.monitor;
    const nextMonitor = nextState.location.query.monitor
    if (nextMonitor && monitor !== nextMonitor) {
      store.dispatch(toggleLoading());
      store.dispatch(switchMonitor(nextMonitor));
      setTimeout(() => {
        store.dispatch(toggleLoading());
      }, 500);
    }
  },
  childRoutes: [
    {
      path: 'chat'
    },
    {
      path: 'monitor/:id',
      component: Body,
      onEnter: nextState => {
        const monitor = store.getState().app.monitor;
        const nextMonitor = nextState.params.id
        if (monitor !== nextMonitor) {
          store.dispatch(toggleLoading());
          store.dispatch(switchMonitor(nextMonitor));
          setTimeout(() => {
            store.dispatch(toggleLoading());
          }, 500);
        }
      }
    }
  ]
});

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
