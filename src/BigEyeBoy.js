/// <reference path="../types/cocos2dx.d.ts" />

class BigEyeBoy extends TrendScroll {
    constructor(rows = 6, columns = 60, tileSize = 8.5, bgColumns = 60) {
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

        // TrendScroll class properties
        this.totalColumnsLoaded = this.bgColumns;
        this.lastViewableColumn = this.columns;
        this.step = 2;
        this._initTrendScroll(res.small_30x3_png, res.small_1x3_png);

        this.data = Array.from({length: 1000}, () => Math.floor(Math.random() * 2 + 1));
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
            const bead = new BEBMarker(value);
            bead.x=Math.floor(index / this.rows) * this.tileSize;
            bead.y=this.height - (index % this.rows * this.tileSize);
            this.addChild(bead)
        });
    }
    addMarker(type = 1) {
        this.data.push(type);
        if (Math.ceil(this.data.length / this.rows) === this.lastViewableColumn) {
            this.addColumn();
        } 
        const bead = new BEBMarker(type);
        const currentIndex = this.data.length - 1
        bead.x=Math.floor(currentIndex / this.rows) * this.tileSize;
        bead.y=this.height - (currentIndex % this.rows * this.tileSize);

        this.addChild(bead)
    }
}

class BEBMarker extends cc.Node {
    constructor(type=1, tileSize=8.5) {
        super();
        this.attr({
            width: tileSize,
            height: tileSize,
            anchorX: 0,
            anchorY: 1,
            zIndex: 1
        });

        const Marker = new cc.DrawNode();
        const halfTileSize = tileSize / 2;
        switch(type) {
            case 1:
                Marker.drawDot(cc.p(halfTileSize,halfTileSize), Math.floor(halfTileSize), COLORS.RED);
                Marker.drawDot(cc.p(halfTileSize,halfTileSize), Math.floor(halfTileSize) - 1, cc.color.WHITE);
                break;
            case 2:
                Marker.drawDot(cc.p(halfTileSize,halfTileSize), Math.floor(halfTileSize), COLORS.BLUE);
                Marker.drawDot(cc.p(halfTileSize,halfTileSize), Math.floor(halfTileSize) - 1, cc.color.WHITE);
                break;
            default:
                Marker.drawDot(cc.p(halfTileSize,halfTileSize), Math.floor(halfTileSize), COLORS.RED);
                Marker.drawDot(cc.p(halfTileSize,halfTileSize), Math.floor(halfTileSize) - 1, cc.color.WHITE);
                break;
        }
        this.addChild(Marker);


    }
}