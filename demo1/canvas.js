class Ambience {
    document;
    window;
    canvas;
    Circle;
    circles = [];
    math;
    ctx;
    width;
    height;
    mouse = {
        x: null,
        y: null
    }

    constructor(doc, win, circle, math, width, height) {
        this.document = doc;
        this.window = win;
        this.Circle = circle;
        this.math = math;
        this.width = width;
        this.height = height;
    }

    calcSpace(i, r) {
        return (this.math.random() * (i - r * 2)) + r;
    }

    calcDParam() {
        return this.math.random() - 0.5;
    }

    generateParams() {
        return {
            x: this.calcSpace(this.width, 30),
            y: this.calcSpace(this.height, 30),
            dx: this.calcDParam(),
            dy: this.calcDParam(),
            r: this.math.random() * 50,
            ctx: this.ctx,
            width: this.width,
            height: this.height,
            color: "#" + ((1 << 24) * this.math.random() | 0).toString(16)
        }
    }

    animate() {
        setInterval(() => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.circles.forEach(this.circleActions.bind(this))
        }, 15);
    }

    circleActions(circle) {
        const c = circle.getCoordinate();
        if (
            this.mouse.x - c.x < 100 && this.mouse.x - c.x > -100
            && this.mouse.y - c.y < 100 && this.mouse.y - c.y > -100
        ) {
            return circle.grow();
        } else {
            circle.depletion();
        }

        return circle.move();
    }

    generateCircles(number) {
        for (let i = 0; i < number; i++) {
            const params = this.generateParams();
            this.circles.push(new this.Circle(params));
        }
    }

    createCanvas() {
        this.canvas = this.document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
    }

    appendCanvas() {
        this.document.body.appendChild(this.canvas);

    }

    appendListener() {
        this.window.addEventListener('mousemove', this.setMouseCoordinate.bind(this))
    }

    setMouseCoordinate(e) {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
    }

    run() {
        this.createCanvas();
        this.generateCircles(100);
        this.appendCanvas();
        this.appendListener();
        this.animate();
    }
}

class Circle {
    constructor({ ctx, x, y, r, dx, dy, width, height, color }) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = r;
        this.minR = r;
        this.maxR = r + 50;
        this.dx = dx;
        this.dy = dy;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    validation() {
        if(this.r < 0){
            console.log(`Problem in radius ${this.r}`);
            this.r = 1;
        }
    }

    draw() {
        this.validation();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    getCoordinate() {
        return {
            x: this.x,
            y: this.y,
            r: this.r
        }
    }

    calcParams() {
        if (this.x + this.r > this.width || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > this.height || this.y - this.r < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
    }

    grow() {
        if (this.r < this.maxR) {
            this.r++;
        }
        this.draw();
    }

    depletion() {
        if (this.r > this.minR) {
            this.r--;
        }
        this.draw();
    }

    move() {
        this.calcParams();
        this.draw();
    }
}

new Ambience(document, window, Circle, Math, innerWidth, innerHeight).run();