import Vue from 'vue';
import App from './App';
import { registerApplication, start } from '@mini-single-spa/esm';
import { $, pathPrefix } from './utils';

function render() {
  new Vue({
    el: '#app',
    render(h) {
      return h(App);
    },
  });
}

render();

registerApplication({
  name: 'vue',
  pageEntry: 'http://localhost:8001',
  activeRule: pathPrefix('/vue'),
  container: document.getElementById('subapp-viewport'),
});

registerApplication({
  name: 'react',
  pageEntry: 'http://localhost:8002',
  activeRule: pathPrefix('/react'),
  container: document.getElementById('subapp-viewport'),
});

console.log('finish');

start();
