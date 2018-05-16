/// <reference path="../types/cocos2dx.d.ts" />

class BeadPlate extends TrendScroll {
    constructor(rows = 6, columns = 10, tileSize = 34, bgColumns = 10) {
        super();
        this.rows = rows;
        this.columns = columns;
        this.tileSize = tileSize;
        this.bgColumns = bgColumns;

        // ScrollView class properties
        this.touchEnabled = false;
        this.innerWidth = columns * tileSize;
        this.innerHeight = rows * tileSize; 
        this.width = columns * tileSize;
        this.height = rows * tileSize;
        this.setDirection(ccui.ScrollView.DIR_HORIZONTAL)

        // BeadPlate class properties
        this.totalColumnsLoaded = this.bgColumns;
        this.lastViewableColumn = this.columns;
        this._initTrendScroll(res.large_10x6_png, res.large_1x6_png);
        this.data = Array.from({length: 910}, () => Math.floor(Math.random() * 3 + 1));
    }
    onEnter() {
        super.onEnter();
        this._loadBeads();
        // this.schedule(this.addColumn, 1, 13, 1);
    }  
    _loadBeads() {
        const columnsFilled = Math.ceil(this.data.length / this.rows);
        const viewableFilledColumns = this.columns - 1;
        if (columnsFilled > viewableFilledColumns) {
            this.data.splice(0, (columnsFilled - viewableFilledColumns) * this.rows);
        }
        this.data.forEach((value, index) => {   
            const bead = new Bead(value);
            bead.x=Math.floor(index / this.rows) * this.tileSize;
            bead.y=this.height - (index % this.rows * this.tileSize);
            this.addChild(bead)
        });
    }
    addBead(type = 1) {
        this.data.push(type);
        if (Math.ceil(this.data.length / this.rows) === this.lastViewableColumn) {
            this.addColumn();
        } 
        const bead = new Bead(type);
        const currentIndex = this.data.length - 1
        bead.x=Math.floor(currentIndex / this.rows) * this.tileSize;
        bead.y=this.height - (currentIndex % this.rows * this.tileSize);

        this.addChild(bead)
    }
}

class Bead extends cc.Sprite {
    constructor(type=1) {
        super();
        let text;
        switch(type) {
            case 1:
                this.initWithFile(res.banker_sprite_png)
                text = cc.LabelTTF.create("庄", "Arial", 14);
                break;
            case 2:
                this.initWithFile(res.player_sprite_png)
                text = cc.LabelTTF.create("闲", "Arial", 14);
                break;
            case 3:
                this.initWithFile(res.tie_sprite_png)
                text = cc.LabelTTF.create("和", "Arial", 14);
                break;
        }
        this.attr({
            anchorX: 0,
            anchorY: 1,
            zIndex: 1
        });
        text.attr({
            x: this.width / 2,
            y: this.height / 2
        })
        this.addChild(text)
    }
    onEnter() {
        super.onEnter();
        const RedPair = new cc.DrawNode();
        RedPair.drawDot(cc.p(0,0), 4, cc.color.WHITE);
        RedPair.drawDot(cc.p(0,0), 3, COLORS.RED);
        RedPair.attr({
            x: this.width * 0.15,
            y: this.height * 0.85
        });
        const BluePair = new cc.DrawNode();
        BluePair.drawDot(cc.p(0,0), 4, cc.color.WHITE);
        BluePair.drawDot(cc.p(0,0), 3, COLORS.BLUE);
        BluePair.attr({
            x: this.width * 0.85,
            y: this.height * 0.15
        });


        this.addChild(RedPair);
        this.addChild(BluePair);

    }  
}