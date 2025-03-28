let canvas;
function init()
{
    canvas = document.getElementsByTagName('canvas')[0];
}

function getLineLength(x1, y1, x2, y2) {
    // Calculate the distance using the Pythagorean theorem
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function getSlope(x1, y1, x2, y2) {
    return (y2 - y1) / (x2 - x1);
}

let x1=-1, y1=-1, x2=0, y2=0;
let coords=[];
function draw(event){
    canvas = document.getElementsByTagName('canvas')[0];
    let context=canvas.getContext('2d');
    if(x1 == -1 && y1 == -1){
        x1 = event.offsetX;
        y1 = event.offsetY;
    }
    else{
        x2 = event.offsetX;
        y2 = event.offsetY;
        context.strokeStyle = "mintcream";
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.closePath();
        context.stroke()
        let pos= {
            "x1": x1,
            "y1": y1,
            "x2": x2,
            "y2": y2
        }
        coords.push(pos);
        x1=-1;
        y1=-1;
    }
}

function clearThing(){
    let context=canvas.getContext('2d');
    context.fillStyle = "#0a0a0a";
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.closePath()
    context.fill();
    coords = [];
    x1=-1;
    y1=-1;
    x2=-1;
    y2=-1;
}

function drawmid(){
    let textut = document.getElementById("text");
    let context=canvas.getContext('2d');
    let d = document.getElementById("d").value*10;
    
    context.fillStyle = "#00FF00";
    context.beginPath();
    context.arc(canvas.width/2, canvas.height, 20, 0, Math.PI * 2);
    context.closePath();
    context.fill();
    context.strokeStyle = "#FF0000";
    context.fillStyle = "#FF0000";
    console.log(coords);
    let centruX, centruY;
    if(coords.length >= 2){
        /**
         *             if(x0 - x1 < 0 && x0_1 - x1_1 < 0) //sunt indreptati spre dreapta
         *             {
         *                 centruX=(centruX + (centruX + d))/2;
         *             }
         *             else if(x0 - x1 > 0 && x0_1 - x1_1 > 0) //sunt indreptati spre stanga
         *             {
         *                 centruX=(centruX + (centruX - d))/2;
         *             }
         * 
         */
        let x0 = coords[0].x1;
        let y0 = coords[0].y1;
        let x1 = coords[0].x2;
        let y1 = coords[0].y2;
        let x0_1 = coords[1].x1;
        let y0_1 = coords[1].y1;
        let x1_1 = coords[1].x2;
        let y1_1 = coords[1].y2;
       
        
        context.beginPath();
        // context.moveTo(Math.abs(coords[1].x1-coords[0].x1), Math.abs(coords[1].y1-coords[0].y1));
        // context.lineTo(Math.abs(coords[1].x2-coords[0].x2), Math.abs(coords[1].y2-coords[0].y2));
        centruX = ((coords[0].x1+coords[0].x2)/2 + (coords[1].x1+coords[1].x2)/2)/2;
        centruY = canvas.height;//((coords[0].y1+coords[1].y1)/2 + (coords[1].y1+coords[1].y2)/2)/2;
        let s1 = getSlope(x0, y0, x1, y1);
        let s2 = getSlope(x0_1, y0_1, x1_1, y1_1);
        //if(x0-x1 < 0 && x0_1 - x1_1 < 0)
        if(s1 < 0 && s2 < 0)
        {
            centruX=(centruX + (centruX + d))/2;
        }else if(s1 > 0 && s2 > 0){//if(x0 - x1 > 0 && x0_1 - x1_1 > 0){
            centruX=(centruX + (centruX - d))/2;
        }
        context.arc(centruX, centruY, 10, 0, Math.PI * 2);
        // context.moveTo((coords[0].x1+coords[0].x2/2 + coords[1].x1+coords[1].x2/2)/2, (coords[0].y1+coords[0].y2/2 + coords[1].y1+coords[1].y2/2)/2);
        // context.lineTo((coords[0].x1+coords[0].x2/2 + coords[1].x1+coords[1].x2/2)/2, (coords[0].y1+coords[0].y2/2 + coords[1].y1+coords[1].y2/2)/2);
        context.closePath();
        context.fill();
        textut.innerHTML = `CentruX: ${(coords[0].x1+coords[0].x2/2 + coords[1].x1+coords[1].x2/2)/2/10} <br>
    CentruY: ${(coords[0].y1+coords[0].y2/2 + coords[1].y1+coords[1].y2/2)/2/10} <br> s1: ${s1} <br> s2: ${s2}</br>`;
    }
    else if (coords.length === 1) {
        context.beginPath();

        let x1 = coords[0].x1;
        let y1 = coords[0].y1;
        let x2 = coords[0].x2;
        let y2 = coords[0].y2;

        let isPositiveSlope = (y2 - y1) / (x2 - x1) > 0;
        let slope = Math.abs((y2 - y1) / (x2 - x1));
        let midX = (x1 + x2) / 2;
        
        // d = 1/slope * d;
        // Adjust based on slope direction (order-independent)
        centruX = isPositiveSlope ? -d + midX : d + midX;
        centruY = canvas.height;
        if(centruX < 0){
            centruX = 0;
        }
        if(centruX > canvas.width) {
            centruX = canvas.width;
        }
        console.log(isPositiveSlope);
        context.arc(centruX, centruY, 10, 0, Math.PI * 2);
        // context.moveTo((coords[0].x1+coords[0].x2/2 + coords[1].x1+coords[1].x2/2)/2, (coords[0].y1+coords[0].y2/2 + coords[1].y1+coords[1].y2/2)/2);
        // context.lineTo((coords[0].x1+coords[0].x2/2 + coords[1].x1+coords[1].x2/2)/2, (coords[0].y1+coords[0].y2/2 + coords[1].y1+coords[1].y2/2)/2);
        context.closePath();
        context.fill();
        textut.innerHTML = `CentruX: ${centruX / 10} <br>
    CentruY: ${centruY / 10} <br> Slope: ${slope} <br>`;
    }
    let error = 780/2 - centruX;
    context.setLineDash([10, 10]);
    context.beginPath();
    context.moveTo(780/2, canvas.height);
    context.lineTo(780/2-error, canvas.height);
    context.closePath();
    context.stroke()
    context.setLineDash([]);
    textut.innerHTML = textut.innerHTML + `<br> error: ${error/10}`;
    
}