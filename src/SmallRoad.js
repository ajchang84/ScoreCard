/// <reference path="../types/cocos2dx.d.ts" />

class SmallRoad extends TrendScroll {
    constructor(rows = 6, columns = 30, tileSize = 8.5, bgColumns = 30) {
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

        // BeadPlate class properties
        this.totalColumnsLoaded = this.bgColumns;
        this.lastViewableColumn = this.columns;
        this.step = 2
        this._initTrendScroll(res.small_15x3_bottom_png, res.small_1x3_bottom_png);
        this.data = [];
        this.predictRed = [0,0];
        this.predictBlue = [0,0];
        this.predictGreen = [0,0];
    }
    onEnter() {
        super.onEnter();
        // this.schedule(this.addColumn, 1, 13, 1);
    }  
    loadData(data=[]) {
        console.log('DATA', data)
        this.data = this.convertData(this.beadPlateToSmallRoad(data));
        console.log(this.data)
        // const columnsFilled = Math.ceil(this.data.length / this.rows);
        // const viewableFilledColumns = this.columns - 1;
        // if (columnsFilled > viewableFilledColumns) {
        //     this.data.splice(0, (columnsFilled - viewableFilledColumns) * this.rows);
        // }
        this.data.forEach((column, colIndex) => {
            Array(column.rows).fill(null).forEach((row, rowIndex) => {
                this.fillTile(column, colIndex, rowIndex)
            })
        });
    }
    fillTile(data, col, row) {
        const bead = new SMMarker(data.value);
        if (row < data.maxRows) {
            bead.x=(col + data.shiftCols) * this.tileSize;
            bead.y=this.height - (row * this.tileSize);
        } else {
            bead.x=(col + data.shiftCols) * this.tileSize + (row - (data.maxRows - 1)) * this.tileSize;
            bead.y=this.height - ((data.maxRows - 1) * this.tileSize);
        }
        if (data.value === 1) {
            this.predictRed = [col, row + 1],
            this.predictBlue = [col + 1, 0],
            this.predictGreen = [col, row]      
        } else if (data.value === 2) {
            this.predictBlue = [col, row + 1],
            this.predictRed = [col + 1, 0],
            this.predictGreen = [col, row]      
        }
        this.addChild(bead)
    }
    beadPlateToSmallRoad(data = []) {
        let prevTwo = {value: null, rows: 0};
        let prevOne = {value: null, rows: 0};
        let current = {value: null, rows: 0};
        return data.reduce((prev, value, index)=>{
            if (!current.rows) {
                console.log('ADD CURRENT')
                current = {...current, value, rows: 1};
                return prev;
            } else if (!prevOne.rows) {
                if (current.value === value) {
                    console.log('ADD CURRENT AGAIN')
                    current = {...current, rows: current.rows + 1};
                } else {
                    console.log('ADD PREVONE')
                    prevOne = {...current};
                    current = {...current, value, rows: 1};
                }
                return prev;
            } else if (current.value === value) {
                console.log('ADD SAME VALUE')

                current = {...current, rows: current.rows + 1};
                if (current.rows <= prevOne.rows || current.rows >= prevOne.rows + 2) {
                    return [...prev, 1];
                } else {
                    return [...prev, 2];
                }
            } else if (current.value !== value) {
                console.log('before', prevTwo, prevOne, current)
                console.log('ADD DIFFERENT VALUE')
                let mark = 1;
                prevTwo = {...prevOne};
                prevOne = {...current};
                if (prevTwo.rows === prevOne.rows) {
                    mark = 1;
                } else {
                    mark = 2;
                }
                current = {...current, value, rows: 1};
                console.log(prevTwo, prevOne, current)
                return [...prev, mark];
            }
        },[]);
    }
    
    convertData(data, prevData = []) {
        const newCol = {
            value: null,
            maxRows: 6,
            rows: 0,
            tails: {},
            shiftCols: 0
        }
        return data.reduce((prev, value, index, array)=>{
            let lastIndex = prev.length - 1;
            let prevObj = prev[lastIndex];

            if (prev.length === 0) { // create first column
                if (value === 3) return [{...newCol, rows: 1, ties: {1: 1}}];
                else return [{...newCol, value, rows: 1}];
            }
            if (prev.length > 0) { // first column exists
                if (value === 3) { // if tie, add tie to row, or accumulate tie to row
                    if (!prevObj.ties[prevObj.rows]) prev[lastIndex] = {...prevObj, ties: {...prevObj.ties, [prevObj.rows]: 1}};
                    else prev[lastIndex] = {...prevObj, ties: {...prevObj.ties, [prevObj.rows]: prevObj.ties[prevObj.rows] + 1}};
                    return [...prev];     
                } else if (value !== prevObj.value) { // new value from previous
                    // if column value still null
                    if (prevObj.value === null) {
                        prev[lastIndex] = {...prevObj, value}
                        return [...prev];
                    // create a new column with value
                    } else {
                        let shiftCols = prevObj.shiftCols;
                        let maxRows = prevObj.maxRows;
                        const didBend = prevObj.rows > maxRows;
                        this._decrementTails(prevObj.tails);
                        if (maxRows === 1) shiftCols += (prevObj.rows - maxRows); // if max rows at 1, increment shift columns
                        if (maxRows > 1 && didBend) prevObj.tails[maxRows] = prevObj.rows - maxRows; // if more rows exceed max, create tail
                        if (Object.keys(prevObj.tails).length) maxRows = Object.keys(prevObj.tails)[0] - 1; // set max to closest tail
                        if (!Object.keys(prevObj.tails).length) maxRows = 6; // if tails are empty, set max row as 6
                        return [...prev, {...newCol, value, rows: 1, maxRows, tails: {...prevObj.tails}, shiftCols}];
                    }
                } else if (value === prevObj.value) { // same value from previous
                    if (prevObj.maxRows === 1) { // if max rows at 1, create pseudo 'new column'
                        this._decrementTails(prevObj.tails);
                        prev[lastIndex] = {...prevObj, rows: prevObj.rows + 1, tails: {...prevObj.tails}};
                        return [...prev]; 
                    } else { // increment rows
                        prev[lastIndex] = {...prevObj, rows: prevObj.rows + 1 };
                        return [...prev];
                    }
                } 
            }
        }, prevData);
    }

    _decrementTails(tails) {
        Object.keys(tails).forEach(key=>{
            if (tails[key] > 1) {
                tails[key] = tails[key] - 1;
            } else {
                delete tails[key]; 
            }
        })
    }

    addMarker(type = 1) {
        this.data.push(type);
        if (Math.ceil(this.data.length / this.rows) === this.lastViewableColumn) {
            this.addColumn();
        } 
        const bead = new SMMarker(type);
        const currentIndex = this.data.length - 1
        bead.x=Math.floor(currentIndex / this.rows) * this.tileSize;
        bead.y=this.height - (currentIndex % this.rows * this.tileSize);

        this.addChild(bead)
    }
}

class SMMarker extends cc.Node {
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
                break;
            case 2:
                Marker.drawDot(cc.p(halfTileSize,halfTileSize), Math.floor(halfTileSize), COLORS.BLUE);
                break;
            default:
                Marker.drawDot(cc.p(halfTileSize,halfTileSize), Math.floor(halfTileSize), COLORS.RED);
                break;
        }
        this.addChild(Marker);


    }
}