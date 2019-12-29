import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { SocketUtil } from '../utils/socket-util';
const socket = new SocketUtil('count');

const slice = createSlice({
  name: "counter",
  initialState: { count: 0, message: '' },
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      const count = action.payload;
      return { ...state, count };
    },
    setMessage: (state, action: PayloadAction<string>) => {
      const message = action.payload;
      return { ...state, message };
    },
  }
});

export default slice;
export const { setCount, setMessage } = slice.actions;

export function countUpRest() {
  return async function (dispatch: Function) {
    try {
      dispatch(setMessage(''));
      const res = await axios.request({
        method: 'GET',
        url: '/api/count',
        timeout: 3000,
      })
      dispatch(setCount(res.data.count));
    } catch (err) {
      console.error(err);
      dispatch(setMessage(err.message));
    }
  }
}

export function countUpSocket() {
  return async function (dispatch: Function) {
    try {
      dispatch(setMessage(''));
      const res = await socket.request({ event: 'getCount' });
      console.log(res)
      dispatch(setCount(res.count));
    } catch (err) {
      console.error(err);
      dispatch(setMessage(err.message));
    }
  }
}
