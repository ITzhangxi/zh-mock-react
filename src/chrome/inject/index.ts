// alert(1)
debugger;
const eventSource = new EventSource('http://localhost:9080/reload/');
eventSource.addEventListener('compiled successfully', () => {
  console.log('compiled successfully');
  debugger;
});

eventSource.onmessage = function (event) {
  console.log('event', event);

  console.log('compiled successfully');
  debugger;
};

addEventListener('error', function (e) {
  console.log('error', e); //Also fires every couple of seconds
  debugger;
});
