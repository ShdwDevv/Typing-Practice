## Learned
* In script tage we use `defer` to run that file after the page is loaded
* we use `autofocus` to automatically focus our cursor in the box when we load the webpage
* To make responsive
```css
width: 700px;
max-width: 90%;
```
* `outline:none;` This make disable the line which will come when we focus the text area
* `resize: none;` this disable the resizing of textarea
* setTimeOut for 1000 ms is not a accurate  1 sec , so use this method
```js
let startTime;
startTime = new Date();
function getTimerTime(){
    return Math.floor((new Date - startTime) / 1000);
}
```