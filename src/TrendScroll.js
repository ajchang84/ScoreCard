/// <reference path="../types/cocos2dx.d.ts" />

class TrendScroll extends ccui.ScrollView {
    constructor() {
        super();
        this.initialBg = null;
        this.appendBg = null;
        this.step = 1;
        this.totalColumnsLoaded = 0;
        this.lastViewableColumn = 0;
    }
    onEnter() {
        super.onEnter();
        const background = cc.Sprite.create(this.initialBg);
        background.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0,
        })
        this.addChild(background);

        this._appendBackground()
    }  
    _initTrendScroll(initialBg, appendBg) {
        this.initialBg = initialBg;
        this.appendBg = appendBg
    }
    _appendBackground(offset = this.tileSize * this.bgColumns) {
        if (this.lastViewableColumn > this.totalColumnsLoaded) {
            const newCol = cc.Sprite.create(this.appendBg);
            console.log('append')
            newCol.attr({
                anchorX: 0,
                anchorY: 0,
                x: offset,
                y: 0,
            })
            this.addChild(newCol);
            this.totalColumnsLoaded += this.step;
            this._appendBackground(this.tileSize * this.totalColumnsLoaded);
        }
    }
    addColumn() {
        this.innerWidth = this.innerWidth + this.tileSize * this.step;
        this.scrollToPercentHorizontal(100, 1, true);
        this.lastViewableColumn += this.step;
        this._appendBackground(this.tileSize * this.totalColumnsLoaded);
    }
}