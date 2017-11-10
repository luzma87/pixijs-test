function MapBuilder(walls) {
    this.walls = walls;
    this.createMap();
}

MapBuilder.WALL_HEIGHTS = [
    244 + 128, // Lowest slice
    212 + 128,
    180 + 128,
    148 + 128,
    116 + 128  // Highest slice
];

MapBuilder.prototype.createMap = function () {

    let spans = 50;

    let stepChance = 0.3;
    let coinChance = 0.8;

    for (let i = 0; i < spans; i++) {
        const isStepped = Math.random() <= stepChance;
        const minHeight = isStepped ? 2 : 0;
        const height = getRandomInt(minHeight, 4);
        const length = getRandomInt(5, 30);
        const gapLength = getRandomInt(1, 3);

        if (isStepped) {
            const secondLength = getRandomInt(5, 30);
            this.createSteppedWallSpan(height, length, secondLength);
        } else {
            this.createWallSpan(height, length);
        }
        this.createGap(gapLength);
    }
};

MapBuilder.prototype.createGap = function (spanLength) {
    for (let i = 0; i < spanLength; i++) {
        this.walls.addSlice(SliceType.GAP);
    }
};

MapBuilder.prototype.createWallSpan = function (heightIndex, spanLength, noFront, noBack) {
    noFront = noFront || false;
    noBack = noBack || false;

    if (noFront === false && spanLength > 0) {
        this.addWallFront(heightIndex);
        spanLength--;
    }

    let midSpanLength = spanLength - (noBack ? 0 : 1);
    if (midSpanLength > 0) {
        this.addWallMid(heightIndex, midSpanLength)
        spanLength -= midSpanLength;
    }

    if (noBack === false && spanLength > 0) {
        this.addWallBack(heightIndex);
    }
};

MapBuilder.prototype.createSteppedWallSpan = function (heightIndex, spanALength, spanBLength) {
    if (heightIndex < 2) {
        heightIndex = 2;
    }

    this.createWallSpan(heightIndex, spanALength, false, true);
    this.addWallStep(heightIndex - 2);
    this.createWallSpan(heightIndex - 2, spanBLength - 1, true, false);
};

MapBuilder.prototype.addWallFront = function (heightIndex) {
    let y = MapBuilder.WALL_HEIGHTS[heightIndex];
    this.walls.addSlice(SliceType.FRONT, y);
};

MapBuilder.prototype.addWallBack = function (heightIndex) {
    let y = MapBuilder.WALL_HEIGHTS[heightIndex];
    this.walls.addSlice(SliceType.BACK, y);
};

MapBuilder.prototype.addWallMid = function (heightIndex, spanLength) {
    let y = MapBuilder.WALL_HEIGHTS[heightIndex];
    for (let i = 0; i < spanLength; i++) {
        if (i % 2 === 0) {
            this.walls.addSlice(SliceType.WINDOW, y);
        }
        else {
            this.walls.addSlice(SliceType.DECORATION, y);
        }
    }
};

MapBuilder.prototype.addWallStep = function (heightIndex) {
    let y = MapBuilder.WALL_HEIGHTS[heightIndex];
    this.walls.addSlice(SliceType.STEP, y);
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
