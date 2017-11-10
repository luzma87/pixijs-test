function ItemsSpritesPool() {
    this.createGoldCoin();
}

ItemsSpritesPool.prototype.createGoldCoin = function () {
    this.goldCoins = [];
    for (let j = 0; j < 10; j++) {
        let frames = [];

        for (let i = 1; i < 11; i++) {
            let sprite = PIXI.Texture.fromFrame("Gold_" + i);
            frames.push(sprite);
        }

        this.goldCoins.push(new PIXI.extras.AnimatedSprite(frames));
    }
};

ItemsSpritesPool.prototype.borrowGoldCoin = function () {
    return this.goldCoins.shift();
};

ItemsSpritesPool.prototype.returnGoldCoin = function (sprite) {
    this.goldCoins.push(sprite);
};

