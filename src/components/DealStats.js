import React from 'react';
import PropTypes from 'prop-types';

const DealStats = ({ stats }) => {
  return stats.map((stat, index) => (
    <div key={index}>
      <span>Count : {stat.deals_count}, </span>
      <span>Total Amount : {stat.total_amounts}, </span>
      <span>Avg Amount : {stat.avg_amount}</span>
    </div>
  ));
};

DealStats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      //_id: PropTypes.number.isRequired,
      deals_count: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
};
export default DealStats;
