import { Map, OrderedMap } from 'immutable';

const initialState = {
  onlineCounter: Map(),
  presence: Map(),
  monitor: 1,
  player: null,
  players: [
    { src: "2O0QlJz8EFc" },
    { src: "JTIWNoUDHP4" },
    { src: "RHmH_uq9Ops" },
    { src: "EyepEXOlRmY" },
    { src: "GLE9_LwzDjs" },
    { src: "eH7hBiY9xkg" },
    { src: "mx6t6E24SSM" },
    { src: "2WMnw14bHbM" },
    { src: "8B3jQP9gNyg" },
    { src: "KF47Za1lfjM" }
  ],
  showChat: true,
  records: OrderedMap(),
  willScroll: true,
  fireRef: null
};

export default initialState;
