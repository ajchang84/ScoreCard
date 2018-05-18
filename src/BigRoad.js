/// <reference path="../types/cocos2dx.d.ts" />

class BigRoad extends TrendScroll {
    constructor(rows = 6, columns = 30, tileSize = 17, bgColumns = 30) {
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
        this._initTrendScroll(res.small_30x6_png, res.small_1x6_png);
        this.data = [];
    }
    onEnter() {
        super.onEnter();
        // this.schedule(this.addColumn, 1, 13, 1);
    }  
    loadData(data=[]) {
        this.data = this.sortData(data);

        const columnsFilled = this.data.length;
        const viewableFilledColumns = this.columns - 1;
        if (columnsFilled > viewableFilledColumns) {
            this.data = this.data.slice((columnsFilled - viewableFilledColumns) * this.rows);
        }
        console.log(this.data)
        // this.data = [
        //     {
        //         value: 1,
        //         bend: 6,
        //         length: 8,
        //         ties: {2: 5}
        //     },
        //     {
        //         value: 2,
        //         bend: 6,
        //         length: 3,
        //         ties: {1: 2}
        //     }
        // ]
        this.data.forEach((column, colIndex) => {
            Array(column.length).fill(null).forEach((row, rowIndex) => {
                this.fillTile(column, colIndex, rowIndex)
            })
        });
    }
    fillTile(data, col, row) {
        const bead = new BRMarker(data.value, data.ties[row + 1]);
        if (row < data.bend) {
            bead.x=col * this.tileSize;
            bead.y=this.height - (row * this.tileSize);
        } else {
            bead.x=col * this.tileSize + (row - (data.bend - 1)) * this.tileSize;
            bead.y=this.height - ((data.bend - 1) * this.tileSize);
        }
        this.addChild(bead)
    }
    sortData(data) {
        const newCol = {
            value: null,
            bend: 6,
            length: 0,
            ties: {}
        }
        return data.reduce((accum, value)=>{
            let curObj = accum[accum.length-1];
            if (value === 3 && accum.length > 0) {
                if (!curObj.ties[curObj.length]) {
                    accum[accum.length-1] = {...curObj, ties: {...curObj.ties, [curObj.length]: 1}};
                } else {
                    accum[accum.length-1] = {...curObj, ties: {...curObj.ties, [curObj.length]: curObj.ties[curObj.length] + 1}};
                }
                return [...accum];
            } else if (accum.length === 0) {
                return [...accum, {...newCol, value, length: 1}];
            } else if (value === curObj.value) {
                accum[accum.length-1] = {...curObj, length: curObj.length + 1 };
                return [...accum];
            } else if (value !== curObj.value) {
                return [...accum, {...newCol, value, length: 1}];
            } else {
                return accum;
            }
        },[]);
    }

    addMarker(type = 1) {
        this.data.push(type);
        if (Math.ceil(this.data.length / this.rows) === this.lastViewableColumn) {
            this.addColumn();
        } 
        const bead = new BRMarker(type);
        const currentIndex = this.data.length - 1;
        bead.x=Math.floor(currentIndex / this.rows) * this.tileSize;
        bead.y=this.height - (currentIndex % this.rows * this.tileSize);

        this.addChild(bead)
    }
}

class BRMarker extends cc.Node {
    constructor(type=1, ties = 0, tileSize=17) {
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
        if (ties > 0) {
            Marker.drawSegment(cc.p(tileSize * 0.23,tileSize * 0.23), cc.p(tileSize * 0.76,tileSize * 0.76), 0.5, COLORS.GREEN);
        }
        if (ties > 1) {
            const text = cc.LabelTTF.create(ties, "Arial", 10);
            text.attr({
                x: this.width / 2,
                y: this.height / 2,
                zIndex: 2
            })
            text.setColor( cc.color.BLACK)
            this.addChild(text)
        }
        this.addChild(Marker);
    }
}