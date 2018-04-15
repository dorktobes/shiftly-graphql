import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import {
  selectedWeekSelector,
  scheduleDatesSelector,
  getScheduleId,
  makeScheduleArray,
  makeNeededEmployeeCount,
  getWeeksSchedule,
} from '../containers/selectors';

import EmployeeEditor from '../containers/EmployeeEditor.jsx';
import ScheduleEditor from '../containers/ScheduleEditor.jsx';
import ScheduleGenerator from '../containers/ScheduleGenerator.jsx';
import ScheduleActual from './ScheduleActual.jsx';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'scheduleEditor',
    };
  }
  
  render() {
    let editorView;
    let employeeStyle = 'ratio-col-2 editor-tab clickable';
    let scheduleStyle ='ratio-col-2 editor-tab clickable';
    if(this.state.currentView === 'employeeEditor') {
      editorView = <EmployeeEditor />
      employeeStyle = 'ratio-col-2 editor-tab selected-tab';
    } else {
      editorView = <ScheduleEditor />
      scheduleStyle = 'ratio-col-2 editor-tab selected-tab';
    }

    return (
      <div className="dashboard-container">
        <div className="ratio-col-4 major-component">
          <div className="component-block">
            <div className="editor-header">
              <div className="container clear-fix">
                <div className={employeeStyle} onClick={() => { this.setState({currentView: 'employeeEditor' })}}>Employees</div>
                <div className={scheduleStyle} onClick={() => { this.setState({currentView: 'scheduleEditor' })}}>Shifts</div>
              </div>
            </div>
          {editorView}
          </div>
        </div>
        <div className="ratio-col-4-3 major-component">
          <div className="component-block">
            <ScheduleGenerator
            weekHasActualSchedule={this.props.weekHasActualSchedule}
            weekHasAtLeastOneNeededEmployee={this.props.weekHasAtLeastOneNeededEmployee}/>
            <ScheduleActual
            selectedWeek={this.props.selectedWeek}
            weekHasActualSchedule={this.props.weekHasActualSchedule}
            weekHasAtLeastOneNeededEmployee={this.props.weekHasAtLeastOneNeededEmployee}
            selectedWeekActualSchedule={this.props.selectedWeekActualSchedule}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(makeNeededEmployeeCount(state));
  return {
    selectedWeek: selectedWeekSelector(state),
    selectedWeekScheduleId: getScheduleId(state),
    weekHasActualSchedule: getWeeksSchedule(state).length > 0,
    weekHasAtLeastOneNeededEmployee: true,// makeNeededEmployeeCount(state) > 0,
    selectedWeekActualSchedule: makeScheduleArray(state),
  }
}

  Dashboard.propTypes = {
  selectedWeekScheduleId: PropTypes.number.isRequired,
  weekHasActualSchedule: PropTypes.bool.isRequired,
  weekHasAtLeastOneNeededEmployee: PropTypes.bool.isRequired,
  selectedWeekActualSchedule: PropTypes.array.isRequired,
  selectedWeek: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Dashboard);
