function Mid() {
    let texture = PIXI.Texture.fromImage("resources/background/bg-mid.png");

    let sprite = PIXI.extras.TilingSprite.call(this, texture, Main.WIDTH, Main.HEIGHT);
    sprite.scale.y = 1.2;
    sprite.scale.x = 1.2;

    this.position.x = 0;
    this.position.y = 193;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    this.viewportX = 0;
}

Mid.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Mid.DELTA_X = 0.32;

Mid.prototype.setViewportX = function (newViewportX) {
    let distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * Mid.DELTA_X);
};
