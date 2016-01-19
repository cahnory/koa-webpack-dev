import compose from 'koa-compose';
import connect from 'koa-connect';
import webpackDev from 'webpack-dev-middleware';

const presetHttpStatus = function * (next) {
  this.previousStatus = this.res.statusCode;
  this.res.statusCode = 200;
  yield next;
};

const resetHttpStatus = function * (next) {
  this.res.statusCode = this.previousStatus;
  yield next;
};

export default function (compiler, options = {}) {
  // compose and return middleware
  return compose([
    presetHttpStatus,
    connect(webpackDev(compiler, options)),
    resetHttpStatus
  ]);
}