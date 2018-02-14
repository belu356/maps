// create instance
var long = [
  { x: 659, y: 163},
  { x: 477, y: 251},
  { x: 614, y: 309}
];

var  points  =  [];

var heatmapInstance;
let zoomZero = false;
let createHeatMap = false;
var zoomScale = 1;
var zoomScaleMap = 1;
window.onload = function() {

  document.querySelector('.container').onclick = function (ev) {
    console.log(ev.layerX, ev.layerY);
  };
for (var i = 0; i<long.length; i++){
  points.push(long[i]);
}

  var data = { data: points};

  createHeat(data);
 
};

function createHeat(data){
 
  if (createHeatMap === false){
  heatmapInstance = h337.create({
    container: document.querySelector('.heatmap'),
    radius: 90
  });
    createHeatMap = true;
  }
  heatmapInstance.setData(data);
}

function zoom(zoom) {
  console.log( "points", points[0], points[0].x);
  var setPoints = points;
  if (zoom === "+") {
    zoomScale = zoomScale + .1; 
    zoomScaleMap = zoomScaleMap - .1;
    document.getElementById('heatplan').style.transform = 'scale(' + zoomScale + ')';
    $(".heatmap-canvas").css("transform", "scale(" + zoomScale + ")");
    for (var i = 0; i < setPoints.length; i++) {

      let x = setPoints[i].x + 10;
      let y = setPoints[i].y - 5;
      setPoints[i].x = x;
      setPoints[i].y = y;
      zoomZero = false;
    }
  } else {
    zoomScale = zoomScale - .1;
    zoomScaleMap = zoomScaleMap + .1;
    if (zoomScale <= 1) {
      zoomScale = 1;
      zoomScaleMap = 1;
      document.getElementById('heatplan').style.transform = 'scale(' + zoomScale + ')';
      $(".heatmap-canvas").css("transform", "scale(" + zoomScale + ")");
      for (var i = 0; i < setPoints.length; i++) {
        if (zoomZero === false) {
          let x = setPoints[i].x - 10;
        let y = setPoints[i].y + 5;
          setPoints[i].x = x;
          setPoints[i].y = y;
          zoomZero = true;
        }
      }
    } else {
      document.getElementById('heatplan').style.transform = 'scale(' + zoomScale + ')';
      $(".heatmap-canvas").css("transform", "scale(" + zoomScale + ")");
      for (var i = 0; i < setPoints.length; i++) {
        let x = setPoints[i].x - 10;
        let y = setPoints[i].y + 5;
        setPoints[i].x = x;
        setPoints[i].y = y;
      }
    }

  }
  var addPoints = [];
  for (var i = 0; i < setPoints.length; i++) {
    addPoints.push(setPoints[i]);
  }
  var data = { data: addPoints };


  createHeat(data);
  console.log(data);
}