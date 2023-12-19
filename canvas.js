var canvas = document.querySelector('canvas');
//캔버스 크기
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

var c = canvas.getContext('2d');
document.getElementById('canvas').style.backgroundColor = 'rgba(240, 240, 240, 1)';

//마우스 좌표
var mouse = {
    x: undefined,
    y: undefined
}

//Color 테마들
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

//화면 크기를 조절할 때마다 캔버스 크기를 맞춰줌
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;
    init();
});
//마우스 위치를 변수로 가져옴
window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });
//클릭할 때 색상테마 변경
var themeNumber = 0;
var currentColorTheme = colorThemeArray[themeNumber];
window.addEventListener('click', function () {
    themeNumber = themeNumber + 1;
    if (themeNumber == colorThemeArray.length) {
        themeNumber = 0;
    };
    currentColorTheme = colorThemeArray[themeNumber];
    init();
}
);
//더블클릭 하면 반짝이게 변경
var glitterToggle = false;
window.addEventListener('dblclick', function () {
    glitterToggle = !glitterToggle;
    init();
}
);

//init
function init() {
    circleArray = [];
    makeCircle(1000);
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
    this.glitter = false;
    this.fillColor = currentColorTheme[Math.floor(Math.random() * currentColorTheme.length)];
    this.strokeColor = currentColorTheme[Math.floor(Math.random() * currentColorTheme.length)];
    //그리기 매소드
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        if (this.glitter == true) { this.fillColor = currentColorTheme[Math.floor(Math.random() * currentColorTheme.length)] };
        c.fillStyle = this.fillColor;
        c.strokeStyle = this.strokeColor;
        c.fill();
        c.stroke();
    }
    //업데이트 매소드
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
// 원 여러개 만들기 함수
var circleArray = [];
function makeCircle(circleNumber) {
    for (var circleNumber = 0; circleNumber < 1000; circleNumber++) {
        var dx = (Math.random() - 0.5) * 10;
        var dy = (Math.random() - 0.5) * 10;
        var radius = (Math.random() * 2) + 1.5;     //원의 최소크기 설정
        var x = Math.random() * (innerWidth - 2 * radius) + radius;
        var y = Math.random() * (innerHeight - 2 * radius) + radius;
        circleArray.push(new Circle(x, y, radius, dx, dy));
        if (glitterToggle == true) {
            circleArray[circleNumber].glitter = true;
        }
    }
}
makeCircle(1000);


//Animate
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
        circleArray[i].draw();
    }
}
animate();