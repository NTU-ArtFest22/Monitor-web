import { Map, List, Record, OrderedMap } from 'immutable';
import Cookies from 'cookies-js';

const PlayerRec = Record({
  src: "http://108.61.200.60:5001/stream",
  thumbnail: "http://108.61.200.60:5001/snapshot",
  ws: "ws://108.61.200.60:6001",
  frames: List(),
  error: false
});

const HOST = window.location.hostname === 'localhost'
  ? '140.112.91.176:8'
  : '104.199.152.44:1';

const initialState = {
  onlineCounter: Map(),
  presence: Map(),
  monitor: "1",
  player: null,
  pause: false,
  loading: false,
  players: Map({
    '1': new PlayerRec({
      src: `http://${HOST}001/stream`,
      thumbnail: `http://${HOST}001/snapshot`,
      ws: `ws://${HOST}001`
    }),
    '2': new PlayerRec({
      src: `http://${HOST}002/stream`,
      thumbnail: `http://${HOST}002/snapshot`,
      ws: `ws://${HOST}002`
    }),
    '3': new PlayerRec({
      src: `http://${HOST}003/stream`,
      thumbnail: `http://${HOST}003/snapshot`,
      ws: `ws://${HOST}003`
    }),
    '4': new PlayerRec({
      src: `http://${HOST}004/stream`,
      thumbnail: `http://${HOST}004/snapshot`,
      ws: `ws://${HOST}004`
    }),
    '5': new PlayerRec({
      src: `http://${HOST}005/stream`,
      thumbnail: `http://${HOST}005/snapshot`,
      ws: `ws://${HOST}005`
    }),
    '6': new PlayerRec({
      src: `http://${HOST}006/stream`,
      thumbnail: `http://${HOST}006/snapshot`,
      ws: `ws://${HOST}006`
    }),
    '7': new PlayerRec({
      src: `http://${HOST}007/stream`,
      thumbnail: `http://${HOST}007/snapshot`,
      ws: `ws://${HOST}007`
    }),
    '8': new PlayerRec({
      src: `http://${HOST}008/stream`,
      thumbnail: `http://${HOST}008/snapshot`,
      ws: `ws://${HOST}008`
    }),
    '9': new PlayerRec({
      src: `http://${HOST}009/stream`,
      thumbnail: `http://${HOST}009/snapshot`,
      ws: `ws://${HOST}009`
    })
  }),
  showChat: true,
  records: OrderedMap(),
  willScroll: true,
  fireRef: null,
  showLegalHint: !Cookies.get('readLegalHint'),
  widnowLoaded: false
};

export default initialState;
