# nestjs-websocket-example

A sample implementation of socket.io with axios like.

## bff

* NestJS

## front

* Create React App
* Redux Toolkit

## run

### console for bff

    cd bff
    npm i
    npm start

### console for front

    cd front
    npm i
    npm start

## sample code of client side

### with axios

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

### with socket.io

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

## refer

* https://stackoverflow.com/questions/51488022/how-to-make-javascript-execution-wait-for-socket-on-function-response
