import api from '../../utils/api';
import { setAlert } from './alert';
import {
  GET_EVENTS,
  EVENT_ERROR,
  UPDATE_ATTENDEES,
  DELETE_EVENT,
  ADD_EVENT,
  GET_EVENT,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

// Get events
export const getEvents = () => async dispatch => {
  try {
    const res = await api.get('/events');

    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add attend
export const addAttend = id => async dispatch => {
  try {
    const res = await api.put(`/events/attend/${id}`);

    dispatch({
      type: UPDATE_ATTENDEES,
      payload: { id, attendees: res.data }
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Remove attend
export const removeAttend = id => async dispatch => {
  try {
    const res = await api.put(`/events/unattend/${id}`);

    dispatch({
      type: UPDATE_ATTENDEES,
      payload: { id, attendees: res.data }
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete post
export const deleteEvent = id => async dispatch => {
  try {
    await api.delete(`/events/${id}`);

    dispatch({
      type: DELETE_EVENT,
      payload: id
    });

    dispatch(setAlert('Event Removed', 'success'));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add event
export const addEvent = formData => async dispatch => {
  try {
    const res = await api.post('/events', formData);

    dispatch({
      type: ADD_EVENT,
      payload: res.data
    });

    dispatch(setAlert('Event Created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get event
export const getEvent = id => async dispatch => {
  try {
    const res = await api.get(`/events/${id}`);

    dispatch({
      type: GET_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (eventId, formData) => async dispatch => {
  try {
    const res = await api.post(`/events/comment/${eventId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (eventId, commentId) => async dispatch => {
  try {
    await api.delete(`/events/comment/${eventId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
