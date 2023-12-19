var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

var c = canvas.getContext('2d');
document.getElementById('canvas').style.backgroundColor = 'rgba(240, 240, 240, 1)';

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth -10;
    canvas.height = window.innerHeight-10;
    init();
});
//Color
var colorTheme1 = [
    '#9591F2',
    '#111BD9',
    '#111BD9',
    '#3876F2',
    '#CEDEF2'
];
var colorTheme2 = [
    '#36BFB1',
    '#038C73',
    '#02735E',
    '#014034',
    '#0D0D0D',
];
var colorTheme3 = [
    '#F2A7D0',
    '#5306BF',
    '#2D0D73',
    '#F2B441',
    '#F28A80',
];
var colorTheme4 = [
    '#970FF2',
    '#0597F2',
    '#49D907',
    '#EAF205',
    '#F24607',
];
var colorThemeArray = [
    colorTheme1, colorTheme2, colorTheme3, colorTheme4
];
var j = 0;
addEventListener('click', function () {
    j = j + 1;
    if (j == colorThemeArray.length) {
        j = 0;
    };
    currentColorTheme = colorThemeArray[j];
    init();
    }
);
var currentColorTheme = colorThemeArray[j];

//여러 개 그리고 싶어요! + 매 번 색이 달랐으면 좋겠어요!
// for (let i = 0; i < 1000; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     var radius = Math.random() * 80;
//     var r = Math.random() * 255;
//     var g = Math.random() * 255;
//     var b = Math.random() * 255;
//     var a = Math.random();

//     c.beginPath();
//     c.arc(x, y, radius, 0, Math.PI * 2, false);
//     c.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
//     c.fill();
// }


//init
var circleArray = [];
function init() {
    circleArray = [];
    for (var i = 0; i < 1000; i++) {
        var dx = (Math.random() - 0.5) * 10;
        var dy = (Math.random() - 0.5) * 10;
        var radius = (Math.random() * 2) + 1;
        var x = Math.random() * (innerWidth - 2 * radius) + radius;
        var y = Math.random() * (innerHeight - 2 * radius) + radius;
        circleArray.push(new Circle(x, y, radius, dx, dy));
    }
}

//Circle 컨스트럭터
function Circle(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.maxRadius = 50;
    this.minRadius = radius;
    this.growVelocity = 10;
    this.shrinkVelocity = 1;    //원의 최소크기보다 작아지는 속도가 크면 안됨!
    this.fillColor = currentColorTheme[Math.floor(Math.random() * currentColorTheme.length)];
    this.strokeColor = currentColorTheme[Math.floor(Math.random() * currentColorTheme.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // this.fillColor = currentColorTheme[Math.floor(Math.random() * currentColorTheme.length)];    //번쩍번쩍
        c.fillStyle = this.fillColor;
        c.strokeStyle = this.strokeColor;
        c.fill();
        c.stroke();
    }

    this.update = function () {
        //튕기기
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        //커지기
        if (mouse.x - this.x < 80 && -80 < mouse.x - this.x
            && mouse.y - this.y < 80 && -80 < mouse.y - this.y) {
            if (this.radius < this.maxRadius) {
                this.radius += this.growVelocity;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= this.shrinkVelocity;
        }

    }
}
// 원 여러개 만들기
var circleArray = [];
for (var i = 0; i < 1000; i++) {
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;
    var radius = (Math.random() * 2) + 1.5;                                 //원의 최소크기 설정
    var x = Math.random() * (innerWidth - 2 * radius) + radius;
    var y = Math.random() * (innerHeight - 2 * radius) + radius;
    circleArray.push(new Circle(x, y, radius, dx, dy));
}


//Animate
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
        circleArray[i].draw();
    }
}
animate();