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
      src: "http://140.112.202.156:1001/stream",
      thumbnail: "http://140.112.202.156:1001/snapshot",
      ws: "ws://140.112.202.156:1001"
    }),
    2: new PlayerRec({
      src: "http://140.112.202.156:1002/stream",
      thumbnail: "http://140.112.202.156:1002/snapshot",
      ws: "ws://140.112.202.156:1002"
    }),
    3: new PlayerRec({
      src: "http://140.112.202.156:1003/stream",
      thumbnail: "http://140.112.202.156:1003/snapshot",
      ws: "ws://140.112.202.156:1003"
    }),
    4: new PlayerRec({
      src: "http://140.112.202.156:1004/stream",
      thumbnail: "http://140.112.202.156:1004/snapshot",
      ws: "ws://140.112.202.156:1004"
    })
  }),
  showChat: true,
  records: OrderedMap(),
  willScroll: true,
  fireRef: null
};

export default initialState;
