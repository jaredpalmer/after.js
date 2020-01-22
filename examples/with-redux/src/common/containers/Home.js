import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as CounterActions from '../actions';
import { fetchCounter } from '../api/counter';

const mapStateToProps = state => ({
  counter: state.counter,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

Counter.getInitialProps = async ({ store }) => {
  const count = await fetchCounter();
  store.dispatch(CounterActions.set(count));
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
