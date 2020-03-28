class Word {
    components;
    document;
    window;
    canvas;
    ctx;

    constructor(document, window, components){
        this.components = components;
        this.window = window;
        this.document = document;
    }

    createCanvas() {
        this.canvas = this.document.createElement('canvas');
        this.canvas.width =  this.window.innerWidth;
        this.canvas.height = this.window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
    }

    init() {
        this.createCanvas();

        return this.canvas;
    }
}

const word = new Word(document, window);
document.body.appendChild(word.init())