/// <reference path="../types/cocos2dx.d.ts" />

class CockroachPig extends TrendScroll {
    constructor(rows = 6, columns = 30, tileSize = 8.5, bgColumns = 30) {
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
        this.step = 2;
        this._initTrendScroll(res.small_15x3_bottom_png, res.small_1x3_bottom_png);

        this.data = Array.from({length: 0}, () => Math.floor(Math.random() * 2 + 1));
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
            const bead = new CPMarker(value);
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
        const bead = new CPMarker(type);
        const currentIndex = this.data.length - 1
        bead.x=Math.floor(currentIndex / this.rows) * this.tileSize;
        bead.y=this.height - (currentIndex % this.rows * this.tileSize);

        this.addChild(bead)
    }
}

class CPMarker extends cc.Node {
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
                Marker.drawDot(cc.p(halfTileSize,halfTileSize), Math.floor(halfTileSize) - 2, cc.color.WHITE);
                break;
            case 2:
                Marker.drawDot(cc.p(halfTileSize,halfTileSize), Math.floor(halfTileSize), COLORS.BLUE);
                Marker.drawDot(cc.p(halfTileSize,halfTileSize), Math.floor(halfTileSize) - 2, cc.color.WHITE);
                break;
            default:
                Marker.drawDot(cc.p(halfTileSize,halfTileSize), Math.floor(halfTileSize), COLORS.RED);
                Marker.drawDot(cc.p(halfTileSize,halfTileSize), Math.floor(halfTileSize) - 2, cc.color.WHITE);
                break;
        }
        this.addChild(Marker);


    }
}