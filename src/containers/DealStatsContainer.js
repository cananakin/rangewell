import { connect } from 'react-redux';
import DealStats from '../components/DealStats';

const mapStateToProps = state => {
  return {
    stats: state.stats
  };
};

const DealStatsContainer = connect(mapStateToProps)(DealStats);

export default DealStatsContainer;
