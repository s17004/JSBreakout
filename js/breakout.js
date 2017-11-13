window.addEventListener('DOMContentLoaded', () => {
    console.log("breakout initializing...");
    // 定数値
    const DRAW_INTERVAL = 1000 / 60;
    const PADDLE_WIDTH = 100;
    const PADDLE_HEIGHT = 10;
    const PADDLE_COLOR = '#4169e1';     // royalblue

    // 初期化
    const canvas = document.getElementById('board');
    const breakout = new Breakout(canvas, DRAW_INTERVAL,
        PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_COLOR);
});

class Breakout {
    static set width(w) {
        Breakout.gameWidth = w;
    }

    static get width() {
        return Breakout.gameWidth;
    }

    static set height(h) {
        Breakout.gameHight = h;
    }

    static get height() {
        return Breakout.gameHight;
    }

    constructor(canvas, interval, pw, ph, pc) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.leftKey = false;
        this.rightKey = false;
        Breakout.width = canvas.width;
        Breakout.height = canvas.height;
        this.paddle = new Paddle(pw, ph, pc);
        this.paddle.setPosition(Breakout.width / 2,
            Breakout.height * 8 / 9);
        this.paddle.setSpeed(Breakout.width / 100);
        setInterval(this.draw.bind(this), interval);

        window.addEventListener('keydown', this.keydown.bind(this));
        window.addEventListener('keyup',this.keyup.bind(this));
    }

    keydown(evt) {
        if (evt.code === 'ArrowLeft' /* ひだりキー */) {
            this.leftKey = true;
        } else if (evt.code === 'ArrowRight' /* みぎキー */) {
            this.rightKey = true;
        }
    }

    keyup(evt) {
        if (evt.code === 'ArrowLeft' /* ひだりキー */) {
            this.leftKey = false;
        } else if (evt.code === 'ArrowRight' /* みぎキー */) {
            this.rightKey = false;
        }
    }

    draw() {
        this.context.clearRect(0, 0, Breakout.width, Breakout.height);
        if (this.leftKey) {
            this.paddle.moveLeft();
        }
        if (this.rightKey) {
            this.paddle.moveRight();
        }
        this.paddle.draw(this.context);
    }
}

class Paddle {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = 0;
        this.y = 0;
        this.speed = 0;
    }

    /**
     * 描画処理するメソッド
     *
     * @param context CanvasRenderingContext2D
     */
    draw(context) {
        context.save();

        context.translate(this.x, this.y);
        context.fillStyle = this.color;
        context.fillRect(-(this.width / 2), -(this.height / 2),
            this.width, this.height);

        context.restore();
    }

    /**
     * 位置を指定した座標へ移動する
     * @param x
     * @param y
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.fixPosition();
    }

    /**
     * 移動スピードを指定する
     * @param speed
     */
    setSpeed(speed) {
        this.speed = speed;
    }

    /**
     * ひだりへ移動する
     */
    moveLeft() {
        this.x -= this.speed;
        this.fixPosition();
    }

    /**
     * みぎへ移動する
     */
    moveRight() {
        this.x += this.speed;
        this.fixPosition();
    }

    /**
     * はみ出ないように位置を調整する
     */
    fixPosition() {
        const left = this.x - (this.width / 2);
        if (left < 0) {
            this.x += Math.abs(left);
        }

        const right = this.x + (this.width / 2);
        if (right > Breakout.width) {
            this.x -= right - Breakout.width;
        }
    }
}
class Ball {
    constructor(radius, color) {
        this.radius = radius;
        this.color = color;
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
    }

    /**
     *移動速度と向きを指定する
     * @param speed
     * @param direction
     */
    setSpeed(speed,direction){
        const rad = direction * Math.PI / 180;
        this.dx = Math.cos(rad)*speed;
        this.dy = Math.sin(rad)*speed;
    }

    /**
     * 移動のメソッド
     */
    move(){
        this.x += this.dx;
        this.y += this.dy;
    }
    /**
     * はみ出ないように位置を調整する
     */
    fixPosition() {
       const left = this.x - this.radius;
       if (left < 0){
           this.x += Math.ads(left);
           this.reflectionX();
       }
       const top = this.y - this.radius;
       if(top < 0 ){
           this.y += Math.ads(top);
           this.reflectionY();
       }
       const right = this.x + this.radius;
       if(right > Breakout.width){
           this.x -= right - Breakout.width;
           this.reflectionX();
       }
       const bottom = this.y + this.radius;
       if(bottom > Breakout.height){
           this.y -= bottom - Breakout.height;
           this.reflectionY();
       }
    }

    /**
     * 移動スピードの左右反転
     */
    reflectionX(){
        this.dx *= -1;
    }

    /**
     * 移動スピードの上下反転
     */
    reflectionY(){
        this.dy *= -1;
    }

    /**
     * 描画処理をするメソッド
     *
     * @param context CanvasRenderinyContext
     */
    draw(context){
        this.move();
        this.fixPosition();

        context.save();

        context.fillStyle = this.color;
        context.translate(this.x , this.y);
        context.arc(0,0, this.radius, 0,2 * Math.PI);
        context.fill();

        context.restore()
    }

}
