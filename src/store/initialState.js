import { Map, List, Record, OrderedMap } from 'immutable';

const PlayerRec = Record({
  src: "http://108.61.200.60:5001/stream",
  thumbnail: "http://108.61.200.60:5001/snapshot",
  ws: "ws://108.61.200.60:6001",
  frames: List(),
  error: false
});

const initialState = {
  onlineCounter: Map(),
  presence: Map(),
  monitor: "1",
  player: null,
  pause: false,
  players: Map({
    1: new PlayerRec({
      src: "http://108.61.200.60:5001/stream",
      thumbnail: "http://108.61.200.60:5001/snapshot",
      ws: "ws://108.61.200.60:6001"
    }),
    2: new PlayerRec({
      src: "http://108.61.200.60:5000/stream",
      thumbnail: "http://108.61.200.60:5000/snapshot",
      ws: "ws://108.61.200.60:6000"
    })
  }),
  showChat: true,
  records: OrderedMap(),
  willScroll: true,
  fireRef: null
};

export default initialState;