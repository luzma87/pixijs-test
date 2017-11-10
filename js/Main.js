function Main() {
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(
        Main.WIDTH,
        Main.HEIGHT,
        {antialias : false, transparent : true, resolution : 1}
    );
    // this.renderer.view.style.border = "1px dashed white";
    // this.renderer.backgroundColor = 0xffffff;

    document.body.appendChild(this.renderer.view);

    this.scrollSpeed = Main.MIN_SCROLL_SPEED;

    this.loadSpriteSheet();
}

Main.WIDTH = 1024;
Main.HEIGHT = 500;

Main.MIN_SCROLL_SPEED = 5;
Main.MAX_SCROLL_SPEED = 15;
Main.SCROLL_ACCELERATION = 0.005;

Main.prototype.update = function () {
    this.scroller.moveViewportXBy(this.scrollSpeed);

    this.speedMeUp();

    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.speedMeUp = function () {
    this.scrollSpeed += Main.SCROLL_ACCELERATION;
    if (this.scrollSpeed > Main.MAX_SCROLL_SPEED) {
        this.scrollSpeed = Main.MAX_SCROLL_SPEED;
    }
};

Main.prototype.loadSpriteSheet = function () {
    let loader = PIXI.loader;
    loader.add("wall", "resources/wall.json");
    loader.add("gold_coin_1", "resources/coins/gold_coin_1.json");
    loader.add("bg-mid", "resources/background/bg-mid.png");
    loader.add("bg-far", "resources/background/bg-far.png");
    loader.once("complete", this.spriteSheetLoaded.bind(this));
    loader.load();
};

Main.prototype.spriteSheetLoaded = function () {
    this.scroller = new Scroller(this.stage);
    requestAnimationFrame(this.update.bind(this));
};
