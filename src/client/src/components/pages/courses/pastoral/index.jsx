/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import propTypes from 'prop-types';
import {
  state as initialState,
  fields as fieldSet,
} from './staticData';
import Form from '../../../abstract/Form';
import Footer from '../../../abstract/footer';
import contextHoc from '../../../abstract/HOC/contextHoc';
import Loading from '../../loading';

class index extends Component {
  state = initialState

  onChange = (event) => {
    const { value, name } = event.target;
    if (name === 'type' || name === 'course_name' || name === 'project_type') return;
    this.setState({ [name]: value });
  };

  updateCourse = async (obj) => {
    const confirm = await swal({
      type: 'warning',
      html: 'Are you sure that you want to update this data ?',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Yes',
      confirmButtonAriaLabel: 'Thumbs up',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i> No ',
      cancelButtonAriaLabel: 'Thumbs down',
    });
    if (confirm.value) {
      const { history, match: { params: { id } } } = this.props;
      const result = await axios(`/api/v2/course/${id}`, {
        method: 'PUT',
        data: {
          courseData: obj,
        },
      });
      if (result.data.error) {
        await swal({
          title: '',
          type: 'warning',
          html: result.data.error,
          confirmButtonText: 'Ok',
        });
      } else {
        await swal({
          title: 'Success',
          type: 'success',
          html: result.data.message,
        });
        this.setState({ ...obj });
        history.push('/courses/view');
      }
    }
  };

  getDetails = async () => {
    const { match: { params: { id } }, context: { dispatch } } = this.props;
    axios(`/api/v2/course/${id}`).then((result) => {
      const { data } = result;
      const startDate = data.course_start.split('T')[0];
      const endDate = data.course_end.split('T')[0];
      this.setState({
        ...data, course_start: startDate, course_end: endDate, loading: false,
      });
    }).catch((error) => {
      dispatch({ type: 'ERROR_PAGE', payload: { ErrorPage: error.response.status } });
    });
  };

  componentDidMount = () => {
    this.getDetails();
  }

  goBack = () => {
    const { history } = this.props;
    history.push('/courses/view');
  };

  onSubmit = (event) => {
    event.preventDefault();
    const fields = { ...this.state };
    this.updateCourse(fields);
  };

  render() {
    const {
      loading,
    } = this.state;
    if (loading) return <Loading />;
    return (
      <div>
        <Form
          title="Pastoral Intervention"
          fields={fieldSet}
          values={this.state}
          onChange={this.onChange}
          btnEvents={[this.onSubmit, this.goBack]}
        />
        <Footer />
      </div>
    );
  }
}
export default contextHoc(index);

index.propTypes = {
  history: propTypes.object.isRequired,
  match: propTypes.object,
};
