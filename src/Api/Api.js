import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://www.breakingbadapi.com',
  timeout: 20000,
});
// HTTPS=true
// instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (typeof error.response === 'undefined') {
//             alert(
//                 'A network error occurred. ' +
//                     'This could be a CORS issue or a dropped internet connection. ' +
//                     'It is not possible for us to know.'
//             );
//         }
//         return Promise.reject(error);
//     }
// );

export default class Api {
  _Midurl = '';

  constructor({ endPoint, data, isFormData = false, token }) {
    let sendData = data;
    if (isFormData) {
      sendData = new FormData();
      Object.keys(data).forEach((key) => {
        sendData.append(key, data[key]);
      });
    }

    this.endPoint = endPoint;
    this.data = sendData;
    this.token = token || null;
    this.url = `${this.endPoint}`;
  }

  async send(isAuth = false, endurl = this.url) {
    let result;
    let heads;
    if (isAuth) {
      heads = { Authorization: `Bearer ${this.token}` };
    }
    await instance
      .post(this._Midurl + endurl, this.data, {
        headers: { ...heads },
      })
      .then((res) => {
        result = this.#handleData(res, false);
      })
      .catch((err) => {
        result = this.#handleData(err, true);
      });
    return { error: result[0], data: result[1] };
  }

  async fetch(isAuth = false, endurl = this.url) {
    let result;
    let heads;
    if (isAuth) {
      heads = { Authorization: `Bearer ${this.token}` };
    }

    await instance
      .get(this._Midurl + endurl, {
        headers: { ...heads },
      })
      .then((res) => {
        result = this.#handleData(res, false);
      })
      .catch((err) => {
        result = this.#handleData(err, true);
      });

    return { error: result[0], data: result[1] };
  }

  async update(isAuth = false, endurl = this.url) {
    let result;
    let heads;
    if (isAuth) {
      heads = { Authorization: `Bearer ${this.token}` };
    }
    await instance
      .put(this._Midurl + endurl, this.data, {
        headers: { ...heads },
      })
      .then((res) => {
        result = this.#handleData(res, false);
      })
      .catch((err) => {
        result = this.#handleData(err, true);
      });
    return { error: result[0], data: result[1] };
  }

  async delete(isAuth = false, endurl = this.url) {
    let result;
    let heads;
    if (isAuth) {
      heads = { Authorization: `Bearer ${this.token}` };
    }
    await instance
      .delete(this._Midurl + endurl, this.data, {
        headers: { ...heads },
      })
      .then((res) => {
        result = this.#handleData(res, false);
      })
      .catch((err) => {
        result = this.#handleData(err, true);
      });
    return { error: result[0], data: result[1] };
  }

  #handleData(result, isError) {
    let error = null;
    let response = null;
    if (isError) {
      if (result?.response?.data?.code === 500) {
        error = 'Internal Error Please Reload!';
      } else if (result?.response?.data?.meta?.message) {
        error = result?.response?.data?.meta?.message;
      }
      if (error === null) {
        error = 'Some Bad Happend Check You Data Connection And Reload!';
      }
    } else {
      response = result.data;
    }
    return [error, response];
  }
}
