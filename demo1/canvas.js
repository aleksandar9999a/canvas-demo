class Ambience {
    canvas;
    Circle;
    circles = [];
    document;
    window;
    math;
    frame;
    ctx;
    width;
    height;

    constructor(doc, win, circle, math, frame, width, height) {
        this.document = doc;
        this.window = win;
        this.Circle = circle;
        this.math = math;
        this.frame = frame;
        this.width = width;
        this.height = height;
    }

    calc(i) {
        return this.math.random() * i;
    }

    generateParams() {
        return {
            x: this.calc(this.width),
            y: this.calc(this.height),
            dx: (this.math.random() - 0.5) * 10,
            dy: (this.math.random() - 0.5) * 10,
            r: 30
        }
    }

    animate() {
        setInterval(() => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.circles.forEach(circle => circle.update());
        }, 1);
    }

    generateCircles(number) {
        for (let i = 0; i < number; i++) {
            const p = this.generateParams();
            this.circles.push(new this.Circle(this.ctx, p.x, p.y, p.r, p.dx, p.dy));
        }
    }

    createCanvas(){
        this.canvas = this.document.createElement('canvas');
        this.canvas.width = this.window.innerWidth;
        this.canvas.height = this.window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
    }

    append(){
        this.document.body.appendChild(this.canvas);
    }

    run() {
        this.createCanvas();
        this.generateCircles(5);
        this.append();
        this.animate();
    }
}

class Circle {
    constructor(ctx, x, y, r, dx, dy) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke();
    }

    calcParams(){
        if (this.x + this.r > innerWidth || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > innerHeight || this.y - this.r < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
    }

    update() {
        this.calcParams();
        this.draw();
    }
}

const s = new Ambience(document, window, Circle, Math, requestAnimationFrame, innerWidth, innerHeight)
s.run()