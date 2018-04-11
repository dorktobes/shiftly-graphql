import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  makeDayPartsMap,
  makeEmployeesMap,
} from './selectors';
import EmployeeAvailability from './EmployeeAvailability.jsx';
import EmployeeRoster from '../components/EmployeeRoster.jsx';

class EmployeeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEmployee: null,
    };
  }

  selectEmployee = (employee) => {
    this.setState({
      selectedEmployee: employee
    })
  }

  render() {
    return (
      <div className='ratio-col-1'>
        {this.state.selectedEmployee && <EmployeeAvailability employee={this.state.selectedEmployee} dayPartsMap={this.props.dayPartsMap} />}

        <EmployeeRoster 
          employees={this.props.employees}
          selectEmployee={this.selectEmployee}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    dayPartsMap: makeDayPartsMap(state),
    employees: makeEmployeesMap(state),
  };
  
};

EmployeeEditor.propTypes = {
  dayPartsMap: PropTypes.object.isRequired,
  employees: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(EmployeeEditor);
