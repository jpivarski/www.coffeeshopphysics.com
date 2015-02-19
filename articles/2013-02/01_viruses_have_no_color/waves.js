var virus;
var bacteria;
var isVirus = true;

var canvas;
var context;
var imageData;
var mouseDown = false;
var repeatedly = false;

var HORIZ_CELLS = 160;
var VERT_CELLS = 100;
var CX = 110;
var CY = 50;

var E = new Array();
var Ex = new Array();
var Ey = new Array();
var Et = new Array();
var Exx = new Array();
var Eyy = new Array();
var Ett = new Array();

var spots = [];

function init() {
    virus = document.getElementById("virus");
    bacteria = document.getElementById("bacteria");

    canvas = document.getElementById("drawHere");
    context = canvas.getContext("2d");
    imageData = context.createImageData(4*HORIZ_CELLS, 4*VERT_CELLS);

    for (var i = 0;  i < 4*HORIZ_CELLS;  i++) {
        for (var j = 0;  j < 4*VERT_CELLS;  j++) {
            imageData.data[(i+j*4*HORIZ_CELLS)*4 + 2] = 255;
            imageData.data[(i+j*4*HORIZ_CELLS)*4 + 3] = 255;
        }
    }

    for (var i = 0;  i < HORIZ_CELLS;  i++) {
        E[i] = new Array();
        Ex[i] = new Array();
        Ey[i] = new Array();
        Et[i] = new Array();
        Exx[i] = new Array();
        Eyy[i] = new Array();
        Ett[i] = new Array();

        for (var j = 0;  j < VERT_CELLS;  j++) {
            E[i][j] = 0.0;
            Ex[i][j] = 0.0;
            Ey[i][j] = 0.0;
            Et[i][j] = 0.0;
            Exx[i][j] = 0.0;
            Eyy[i][j] = 0.0;
            Ett[i][j] = 0.0;
        }
    }
    
    canvas.addEventListener("mousedown", function(event) {
        mouseDown = true;
        var x = (event.pageX - findOffsetLeft(canvas)) / 4.0;
        var y = (event.pageY - findOffsetTop(canvas)) / 4.0;
        createSpot(x, y, 3.0);

        if (!repeatedly) {
            repeatedly = true;
            draw();
        }
    });

    canvas.addEventListener("mousemove", function(event) {
        if (mouseDown) {
            var x = (event.pageX - findOffsetLeft(canvas)) / 4.0;
            var y = (event.pageY - findOffsetTop(canvas)) / 4.0;
            createSpot(x, y, 0.1);
        }
    });

    canvas.addEventListener("mouseup", function(event) {
        mouseDown = false;
    });

    canvas.addEventListener("touchstart", function(event) {
        event.preventDefault();
        for (var i in event.changedTouches) {
            var touch = event.changedTouches[i];
            var x = (touch.pageX - findOffsetLeft(canvas)) / 4.0;
            var y = (touch.pageY - findOffsetTop(canvas)) / 4.0;
            createSpot(x, y, 3.0);
        }

        if (!repeatedly) {
            repeatedly = true;
            draw();
        }
    });

    canvas.addEventListener("touchmove", function(event) {
        event.preventDefault();
        for (var i in event.changedTouches) {
            var touch = event.changedTouches[i];
            var x = (touch.pageX - findOffsetLeft(canvas)) / 4.0;
            var y = (touch.pageY - findOffsetTop(canvas)) / 4.0;
            createSpot(x, y, 0.1);
        }
    });

    draw();
}

function findOffsetLeft(obj) {
    var offsetLeft = obj.offsetLeft;
    if (obj.offsetParent) {
        offsetLeft += findOffsetLeft(obj.offsetParent);
    }
    return offsetLeft;
}

function findOffsetTop(obj) {
    var offsetTop = obj.offsetTop;
    if (obj.offsetParent) {
        offsetTop += findOffsetTop(obj.offsetParent);
    }
    return offsetTop;
}

function createSpot(x, y, intensity) {
    spots.push([x, y, intensity, 0]);
}

function draw() {
    for (var i = 0;  i < HORIZ_CELLS;  i++) {
        E[i][0] = 0.0;
        E[i][VERT_CELLS - 1] = 0.0;
    }
    for (var j = 0;  j < VERT_CELLS;  j++) {
        E[0][j] = 0.0;
        E[HORIZ_CELLS - 1][j] = 0.0;
    }

    for (var spotIndex in spots) {
        var x = spots[spotIndex][0];
        var y = spots[spotIndex][1];
        var timestep = spots[spotIndex][3];
        var intensity = spots[spotIndex][2] * Math.sin(timestep * Math.PI / 2.0);

        for (var i = Math.floor(x - 9);  i < Math.ceil(x + 9);  i++) {
            for (var j = Math.floor(y - 9);  j < Math.ceil(y + 9);  j++) {
                var dist2 = Math.pow(i - x, 2) + Math.pow(j - y, 2);
                if (dist2 < 9*9  &&  i >= 0  &&  i < HORIZ_CELLS  &&  j >= 0  &&  j < VERT_CELLS) {
                    E[i][j] -= intensity * Math.exp(-dist2 / 2.0 / 3.0 / 3.0);
                }
            }
        }
    }

    for (var spotIndex in spots) {
        spots[spotIndex][3] += 1;
        if (spots[spotIndex][3] > 2) {
            spots.splice(spotIndex, 1);
        }
    }

    for (var i = 0;  i < HORIZ_CELLS;  i++) {
	for (var j = 0;  j < VERT_CELLS;  j++) {
	    var left = i - 1;
	    if (left < 0) { left = HORIZ_CELLS - 1; }
	    var right = i + 1;
	    if (right >= HORIZ_CELLS) { right = 0; }
	    var up = j - 1;
	    if (up < 0) { up = VERT_CELLS - 1; }
	    var down = j + 1;
	    if (down >= VERT_CELLS) { down = 0; }

	    Ex[i][j] = 0.5*(E[right][j] - E[left][j]);
	    Ey[i][j] = 0.5*(E[i][down] - E[i][up]);
	}
    }
    
    for (var i = 0;  i < HORIZ_CELLS;  i++) {
	for (var j = 0;  j < VERT_CELLS;  j++) {
	    var left = i - 1;
	    if (left < 0) { left = HORIZ_CELLS - 1; }
	    var right = i + 1;
	    if (right >= HORIZ_CELLS) { right = 0; }
	    var up = j - 1;
	    if (up < 0) { up = VERT_CELLS - 1; }
	    var down = j + 1;
	    if (down >= VERT_CELLS) { down = 0; }

	    Exx[i][j] = 0.5*(Ex[right][j] - Ex[left][j]);
	    Eyy[i][j] = 0.5*(Ey[i][down] - Ey[i][up]);
	}
    }
    
    for (var i = 0;  i < HORIZ_CELLS;  i++) {
	for (var j = 0;  j < VERT_CELLS;  j++) {
	    var left = i - 1;
	    if (left < 0) { left = HORIZ_CELLS - 1; }
	    var right = i + 1;
	    if (right >= HORIZ_CELLS) { right = 0; }
	    var up = j - 1;
	    if (up < 0) { up = VERT_CELLS - 1; }
	    var down = j + 1;
	    if (down >= VERT_CELLS) { down = 0; }
	    
	    // the wave equation
	    Ett[i][j] = 0.9 * (Exx[i][j] + Eyy[i][j]);

            // ...with damping near the edges
            var dist = Math.min(i, HORIZ_CELLS - i, j, VERT_CELLS - j);
            if (dist < 16.0) {
                Ett[i][j] -= Math.exp(-dist/4.0) * Et[i][j];
            }

	    Et[i][j] += Ett[i][j];
	    E[i][j] += Et[i][j];
	}
    }

    if (isVirus) {
        for (var i = CX - 50;  i < CX + 50;  i++) {
            for (var j = CY - 50;  j < CY + 50;  j++) {
                var dist2 = Math.pow(CX - i, 2) + Math.pow(CY - j, 2) - 2.0*2.0;
                var suppression = 1.0;
                if (dist2 > 0.0) {
                    suppression = Math.exp(-dist2 / 2.0 / 2.0 / 2.0);
                }
                E[i][j] *= 1.0 - suppression;
            }
        }
    } else {
        for (var i = CX - 50;  i < CX + 50;  i++) {
            for (var j = CY - 50;  j < CY + 50;  j++) {
                var dist2 = Math.pow(CX - i, 2) + Math.pow(CY - j, 2) - 22.0*22.0;
                var suppression = 1.0;
                if (dist2 > 0.0) {
                    suppression = Math.exp(-dist2 / 2.0 / 3.0 / 3.0);
                }
                E[i][j] *= (1.0 - suppression);
            }
        }
    }

    for (var i = 0;  i < HORIZ_CELLS;  i++) {
        for (var j = 0;  j < VERT_CELLS;  j++) {
            var value = Math.max(0, Math.min(255, Math.round(127.0 + (E[i][j] * 127.0))));

            imageData.data[((4*i+0)+(4*j+0)*4*HORIZ_CELLS)*4 + 0] = value;
            imageData.data[((4*i+0)+(4*j+1)*4*HORIZ_CELLS)*4 + 0] = value;
            imageData.data[((4*i+0)+(4*j+2)*4*HORIZ_CELLS)*4 + 0] = value;
            imageData.data[((4*i+0)+(4*j+3)*4*HORIZ_CELLS)*4 + 0] = value;

            imageData.data[((4*i+1)+(4*j+0)*4*HORIZ_CELLS)*4 + 0] = value;
            imageData.data[((4*i+1)+(4*j+1)*4*HORIZ_CELLS)*4 + 0] = value;
            imageData.data[((4*i+1)+(4*j+2)*4*HORIZ_CELLS)*4 + 0] = value;
            imageData.data[((4*i+1)+(4*j+3)*4*HORIZ_CELLS)*4 + 0] = value;

            imageData.data[((4*i+2)+(4*j+0)*4*HORIZ_CELLS)*4 + 0] = value;
            imageData.data[((4*i+2)+(4*j+1)*4*HORIZ_CELLS)*4 + 0] = value;
            imageData.data[((4*i+2)+(4*j+2)*4*HORIZ_CELLS)*4 + 0] = value;
            imageData.data[((4*i+2)+(4*j+3)*4*HORIZ_CELLS)*4 + 0] = value;

            imageData.data[((4*i+3)+(4*j+0)*4*HORIZ_CELLS)*4 + 0] = value;
            imageData.data[((4*i+3)+(4*j+1)*4*HORIZ_CELLS)*4 + 0] = value;
            imageData.data[((4*i+3)+(4*j+2)*4*HORIZ_CELLS)*4 + 0] = value;
            imageData.data[((4*i+3)+(4*j+3)*4*HORIZ_CELLS)*4 + 0] = value;

            //

            imageData.data[((4*i+0)+(4*j+0)*4*HORIZ_CELLS)*4 + 1] = value;
            imageData.data[((4*i+0)+(4*j+1)*4*HORIZ_CELLS)*4 + 1] = value;
            imageData.data[((4*i+0)+(4*j+2)*4*HORIZ_CELLS)*4 + 1] = value;
            imageData.data[((4*i+0)+(4*j+3)*4*HORIZ_CELLS)*4 + 1] = value;

            imageData.data[((4*i+1)+(4*j+0)*4*HORIZ_CELLS)*4 + 1] = value;
            imageData.data[((4*i+1)+(4*j+1)*4*HORIZ_CELLS)*4 + 1] = value;
            imageData.data[((4*i+1)+(4*j+2)*4*HORIZ_CELLS)*4 + 1] = value;
            imageData.data[((4*i+1)+(4*j+3)*4*HORIZ_CELLS)*4 + 1] = value;

            imageData.data[((4*i+2)+(4*j+0)*4*HORIZ_CELLS)*4 + 1] = value;
            imageData.data[((4*i+2)+(4*j+1)*4*HORIZ_CELLS)*4 + 1] = value;
            imageData.data[((4*i+2)+(4*j+2)*4*HORIZ_CELLS)*4 + 1] = value;
            imageData.data[((4*i+2)+(4*j+3)*4*HORIZ_CELLS)*4 + 1] = value;

            imageData.data[((4*i+3)+(4*j+0)*4*HORIZ_CELLS)*4 + 1] = value;
            imageData.data[((4*i+3)+(4*j+1)*4*HORIZ_CELLS)*4 + 1] = value;
            imageData.data[((4*i+3)+(4*j+2)*4*HORIZ_CELLS)*4 + 1] = value;
            imageData.data[((4*i+3)+(4*j+3)*4*HORIZ_CELLS)*4 + 1] = value;
        }
    }

    context.putImageData(imageData, 0, 0);

    if (isVirus) {
        context.drawImage(virus, 4*CX - 14, 4*CY - 14);
    } else {
        context.drawImage(bacteria, 4*CX - 110, 4*CY - 110);
    }

    if (repeatedly) {
        window.setTimeout(draw, 20);
    }
}

function restart() {
    for (var i = 0;  i < HORIZ_CELLS;  i++) {
	for (var j = 0;  j < VERT_CELLS;  j++) {
            E[i][j] = 0.0;
            Ex[i][j] = 0.0;
            Ey[i][j] = 0.0;
            Et[i][j] = 0.0;
            Exx[i][j] = 0.0;
            Eyy[i][j] = 0.0;
            Ett[i][j] = 0.0;
        }
    }

    spots = [];

    isVirus = false;
    obstacles = document.getElementsByName("obstacle");
    for (var i in obstacles) {
        if (obstacles[i].checked  &&  obstacles[i].value == "virus") {
            isVirus = true;
        }
    }

    repeatedly = false;
    draw();
}
