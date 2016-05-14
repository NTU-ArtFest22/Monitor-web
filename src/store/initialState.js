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
  ? '140.112.202.156'
  : '192.168.0.13';

const initialState = {
  onlineCounter: Map(),
  presence: Map(),
  monitor: "1",
  player: null,
  pause: false,
  loading: false,
  players: Map({
    '1': new PlayerRec({
      src: `http://${HOST}:1001/stream`,
      thumbnail: `http://${HOST}:1001/snapshot`,
      ws: `ws://${HOST}:1001`
    }),
    '2': new PlayerRec({
      src: `http://${HOST}:1002/stream`,
      thumbnail: `http://${HOST}:1002/snapshot`,
      ws: `ws://${HOST}:1002`
    }),
    '3': new PlayerRec({
      src: `http://${HOST}:1003/stream`,
      thumbnail: `http://${HOST}:1003/snapshot`,
      ws: `ws://${HOST}:1003`
    }),
    '4': new PlayerRec({
      src: `http://${HOST}:1004/stream`,
      thumbnail: `http://${HOST}:1004/snapshot`,
      ws: `ws://${HOST}:1004`
    }),
    '5': new PlayerRec({
      src: `http://${HOST}:1005/stream`,
      thumbnail: `http://${HOST}:1005/snapshot`,
      ws: `ws://${HOST}:1005`
    })
  }),
  showChat: true,
  records: OrderedMap(),
  willScroll: true,
  fireRef: null,
  showLegalHint: !Cookies.get('readLegalHint')
};

export default initialState;
