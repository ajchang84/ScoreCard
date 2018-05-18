/// <reference path="../types/cocos2dx.d.ts" />

class BeadPlate extends TrendScroll {
    constructor(rows = 6, columns = 10, tileSize = 34, bgColumns = 10) {
        super();
        this.rows = rows;
        this.columns = columns;
        this.tileSize = tileSize;
        this.bgColumns = bgColumns;

        // ScrollView class properties
        this.innerWidth = columns * tileSize;
        this.innerHeight = rows * tileSize; 
        this.width = columns * tileSize;
        this.height = rows * tileSize;

        // TrendScroll class properties
        this.totalColumnsLoaded = this.bgColumns;
        this.lastViewableColumn = this.columns;
        this._initTrendScroll(res.large_10x6_png, res.large_1x6_png);
        this.data = [];
    }
    onEnter() {
        super.onEnter();
        // this.schedule(this.addColumn, 1, 13, 1);
    }  
    loadData(data = []) {
        this.data = data;
        const columnsFilled = Math.ceil(this.data.length / this.rows);
        const viewableFilledColumns = this.columns - 1;
        if (columnsFilled > viewableFilledColumns) {
            this.data = this.data.slice((columnsFilled - viewableFilledColumns) * this.rows);
        }
        this.data.forEach((value, index) => {   
            const bead = new BPMarker(value);
            bead.x=Math.floor(index / this.rows) * this.tileSize;
            bead.y=this.height - (index % this.rows * this.tileSize);
            bead.zIndex=1
            this.addChild(bead)
        });
    }
    addMarker(type = 1) {
        this.data.push(type);
        if (Math.ceil(this.data.length / this.rows) === this.lastViewableColumn) {
            this.addColumn();
        } 
        const bead = new BPMarker(type);
        const currentIndex = this.data.length - 1
        bead.x=Math.floor(currentIndex / this.rows) * this.tileSize;
        bead.y=this.height - (currentIndex % this.rows * this.tileSize);
        this.addChild(bead)
    }
}

class BPMarker extends cc.Sprite {
    constructor(type=1) {
        super();
        let text;
        switch(type) {
            case 1:
                this.initWithFile(res.banker_sprite_png)
                text = cc.LabelTTF.create("庄", "Arial Black", 16);
                break;
            case 2:
                this.initWithFile(res.player_sprite_png)
                text = cc.LabelTTF.create("闲", "Arial Black", 16);
                break;
            case 3:
                this.initWithFile(res.tie_sprite_png)
                text = cc.LabelTTF.create("和", "Arial Black", 16);
                break;
        }
        this.attr({
            anchorX: 0,
            anchorY: 1,
        });
        text.attr({
            x: this.width / 2,
            y: this.height / 2
        })
        this.addChild(text)
    }
    onEnter() {
        super.onEnter();
        const isRedPair = Math.random()
        const isBluePair = Math.random()
        if (isRedPair <= 0.0588) {
            const RedPair = new cc.DrawNode();
            RedPair.drawDot(cc.p(0,0), 4, cc.color.WHITE);
            RedPair.drawDot(cc.p(0,0), 3, COLORS.RED);
            RedPair.attr({
                x: this.width * 0.15,
                y: this.height * 0.85
            });  
            this.addChild(RedPair);
        }
        if (isBluePair <= 0.0769) {
            const BluePair = new cc.DrawNode();
            BluePair.drawDot(cc.p(0,0), 4, cc.color.WHITE);
            BluePair.drawDot(cc.p(0,0), 3, COLORS.BLUE);
            BluePair.attr({
                x: this.width * 0.85,
                y: this.height * 0.15
            });
            this.addChild(BluePair);
        }
    }  
}