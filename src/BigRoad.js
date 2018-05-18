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
        this.predictRed = [0,0];
        this.predictBlue = [0,0];
        this.predictGreen = [0,0];

        this.bend = 6;
        this.tails = 0;
        this.shift = 0;
    }
    onEnter() {
        super.onEnter();
        // this.schedule(this.addColumn, 1, 13, 1);
    }  
    loadData(data=[]) {
        this.data = this.convertData(data);
        console.log(this.data)
        const columnsFilled = this.data.length;
        const viewableFilledColumns = this.columns - 1;
        console.log(viewableFilledColumns, columnsFilled)
        if (columnsFilled > viewableFilledColumns) {
            this.data = this.data.slice((columnsFilled - viewableFilledColumns));
        }

        this.data.forEach((column, colIndex) => {
            Array(column.length).fill(null).forEach((row, rowIndex) => {
                this.fillTile(column, colIndex, rowIndex)
            })
        });
    }
    fillTile(data, col, row) {
        console.log('bend', this.bend)
        const bead = new BRMarker(data.value, data.ties[row + 1]);
        if (data.bend === 1) {
            bead.x=(col + data.shift) * this.tileSize;
            bead.y=this.height;
        } else if (row < data.bend) {
            bead.x=col * this.tileSize;
            bead.y=this.height - (row * this.tileSize);
        } else {
            bead.x=col * this.tileSize + (row - (data.bend - 1)) * this.tileSize;
            bead.y=this.height - ((data.bend - 1) * this.tileSize);
        }
        if (data.value === 1) {
            this.predictRed = [col + data.shift, row + 1],
            this.predictBlue = [col + data.shift + 1, 0],
            this.predictGreen = [col + data.shift, row]      
        } else if (data.value === 2) {
            this.predictBlue = [col + data.shift, row + 1],
            this.predictRed = [col + data.shift + 1, 0],
            this.predictGreen = [col + data.shift, row]      
        }
        this.addChild(bead)
    }

    convertData(data, prevData = []) {
        const newCol = {
            value: null,
            bend: 6,
            offender: 0,
            length: 0,
            tails: {},
            ties: {},
            shift: 0
        }
        return data.reduce((accum, value)=>{
            let workingIndex = accum.length - 1;
            let curObj = accum[workingIndex];

            if (accum.length === 0) {
                if (value === 3) {
                    return [...accum, {...newCol, length: 1, ties: {...newCol.ties, 1: 1}}];
                } else {
                    console.log('init a column')
                    return [...accum, {...newCol, value, length: 1}];
                }
            }
            if (accum.length > 0) {
                if (value === 3) {
                    if (!curObj.ties[curObj.length]) {
                        accum[workingIndex] = {...curObj, ties: {...curObj.ties, [curObj.length]: 1}};
                    } else {
                        accum[workingIndex] = {...curObj, ties: {...curObj.ties, [curObj.length]: curObj.ties[curObj.length] + 1}};
                    }
                    return [...accum];      
                } else if (value !== curObj.value) {
                    if (curObj.value === null) {
                        console.log('create new column after tie')
                        accum[workingIndex] = {...curObj, value}
                        return [...accum];
                    } else {
                        console.log('create new column')
                        let tails = {};
                        Object.keys(curObj.tails).forEach(key=>{
                            tails[key] = curObj.tails[key] - 1;
                        })
                        tails[this.bend] = curObj.length - this.bend
                        console.log('tails', tails)
                        for (let key of Object.keys(tails)) {
                            if (tails[key] > 0 && key != 1) {       
                                console.log('key', key)
                                this.bend = key - 1;
                                break;
                            }
                            this.bend = 6
                            console.log(this.bend)
                        };
                        return [...accum, {...newCol, value, length: 1, bend: this.bend, tails: {...tails}}];
                    }
                } else if (value === curObj.value) {
                    console.log('add to column')
                    let shift = 0;
                    if (this.bend === 1) {
                        console.log('create new column')  
                        let tails = {};
                        Object.keys(curObj.tails).forEach(key=>{
                            tails[key] = curObj.tails[key] - 1;
                        })
                        console.log('tails', tails)
        
                        shift++;
                    }
                    accum[workingIndex] = {...curObj, length: curObj.length + 1, shift: shift };
                    return [...accum];
                } 
            }
        },prevData);
    }

    addMarker(type = 1) {
        this.data = this.convertData([type], this.data);
        if (type === 1) {
            this.fillTile(this.data[this.data.length-1], this.predictRed[0], this.predictRed[1])
        } else if (type === 2) {
            this.fillTile(this.data[this.data.length-1], this.predictBlue[0], this.predictBlue[1])
        } else {
            this.fillTile(this.data[this.data.length-1], this.predictGreen[0], this.predictGreen[1])
        }
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