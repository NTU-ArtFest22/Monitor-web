import { connect } from 'react-redux';
import { Body as body } from '../Components/App';

const mapStateToProps = (state) => ({
  showChat: state.showChat
});

const Body = connect(mapStateToProps)(body);

export default Body;
