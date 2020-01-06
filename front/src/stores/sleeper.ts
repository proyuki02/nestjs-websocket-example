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

export function sleepRest(time: number) {
  return async function (dispatch: Function) {
    try {
      dispatch(setMessage(''));
      const res = await axios.request({
        method: 'POST',
        url: '/api/sleep',
        timeout: 5000,
        data: { time }
      })
      dispatch(setSleep(res.data.sleep));
    } catch (err) {
      console.error(err);
      dispatch(setMessage(err.message));
    }
  }
}

export function sleepSocket(time: number) {
  return async function (dispatch: Function) {
    try {
      dispatch(setMessage(''));
      const res = await socket.request({
        event: 'postSleep',
        message: { time }
      });
      console.log(res)
      dispatch(setSleep(res.sleep));
    } catch (err) {
      console.error(err);
      dispatch(setMessage(err.message));
    }
  }
}
