class Ambience {
    canvas;
    Circle;
    circles = [];
    document;
    math;
    ctx;
    width;
    height;

    constructor(doc, circle, math, width, height) {
        this.document = doc;
        this.Circle = circle;
        this.math = math;
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
            r: 30,
            color: "#" + ((1 << 24) * this.math.random() | 0).toString(16)
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
            this.circles.push(new this.Circle(this.ctx, p.x, p.y, p.r, p.dx, p.dy, this.width, this.height, p.color));
        }
    }

    createCanvas() {
        this.canvas = this.document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
    }

    append() {
        this.document.body.appendChild(this.canvas);
    }

    run() {
        this.createCanvas();
        this.generateCircles(40);
        this.append();
        this.animate();
    }
}

class Circle {
    constructor(ctx, x, y, r, dx, dy, width, height, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
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

    update() {
        this.calcParams();
        this.draw();
    }
}

const s = new Ambience(document, Circle, Math, innerWidth, innerHeight)
s.run()