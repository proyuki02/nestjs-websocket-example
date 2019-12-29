import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { SocketUtil } from '../utils/socket-util';
const socket = new SocketUtil('sleep');

const slice = createSlice({
  name: "sleeper",
  initialState: { sleep: 0, message: '' },
  reducers: {
    setSleep: (state, action: PayloadAction<number>) => {
      const sleep = action.payload;
      return { ...state, sleep };
    },
    setMessage: (state, action: PayloadAction<string>) => {
      const message = action.payload;
      return { ...state, message };
    },
  }
});

export default slice;
export const { setSleep, setMessage } = slice.actions;

export function sleepRest() {
  return async function (dispatch: Function) {
    try {
      dispatch(setMessage(''));
      const res = await axios.request({
        method: 'GET',
        url: '/api/sleep',
        timeout: 3000,
      })
      dispatch(setSleep(res.data.sleep));
    } catch (err) {
      console.error(err);
      dispatch(setMessage(err.message));
    }
  }
}

export function sleepSocket() {
  return async function (dispatch: Function) {
    try {
      dispatch(setMessage(''));
      const res = await socket.request({ event: 'getSleep' });
      console.log(res)
      dispatch(setSleep(res.sleep));
    } catch (err) {
      console.error(err);
      dispatch(setMessage(err.message));
    }
  }
}
