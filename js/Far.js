function Far() {
    let texture = PIXI.Texture.fromImage("resources/background/bg-far.png");

    let sprite = PIXI.extras.TilingSprite.call(this, texture, Main.WIDTH, Main.HEIGHT);
    sprite.scale.y = 1.96;
    sprite.scale.x = 1.5;

    this.position.x = 0;
    this.position.y = 0;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;

    this.viewportX = 0;
}

Far.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

Far.DELTA_X = 0.064;

Far.prototype.setViewportX = function (newViewportX) {
    let distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * Far.DELTA_X);
};
