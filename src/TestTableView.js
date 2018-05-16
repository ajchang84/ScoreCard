
var CustomTableViewCell = cc.TableViewCell.extend({  
    draw: function (ctx) {  
        this._super(ctx);  
    }  
});  

var RankList = cc.Layer.extend({  
    ctor: function () {  
        this._super();  
        this.init();  
    },  
    init: function () {  
        var winSize = cc.director.getWinSize();  
  
        var bg = new cc.Sprite(res.rankBg);  
        bg.attr({  
            x: winSize.width/2,  
            y: winSize.height/2  
        });  
        this.addChild(bg);  
  
        //创建一个tableview  
        console.log(this)
        var tableView = new cc.TableView(this, cc.size(150, 100));  
  
        //设置tableview的滑动的方向  
        //cc.SCROLLVIEW_DIRECTION_HORIZONTAL 水平  
        //cc.SCROLLVIEW_DIRECTION_VERTICAL 竖直  
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);  
        tableView.x = 100;  
        tableView.y = 200;  
  
        // 设置委托  
        tableView.setDelegate(this);  
        console.log(tableView)
        tableView.setColor(cc.color(255, 0, 0, 0.2))
        // tableView.setColCount(4)
        //tableView填充方式  (cc.TABLEVIEW_FILL_BOTTOMUP)  
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);  
        this.addChild(tableView);  
  
        //更新tableview  
        tableView.reloadData();  
  
        return true;  
    },  
  
    //TableView继承ScrollView有这俩个方法，不需要添加任何内容  
    //scrollViewDidScroll: function (view) {  
    //},  
    //scrollViewDidZoom: function (view) {  
    //},  
    //设置点击cell后的回调函数  
    tableCellTouched: function (table, cell) {  
        cc.log("cell touched at index: " + cell.getIdx());  
    },  
  
    //设置cell大小  
    tableCellSizeForIndex: function (table, idx) {  
        return cc.size(34, 34);  
    },  
    //添加Cell  
    tableCellAtIndex: function (table, idx) {  
        var strValue = idx.toFixed(0);  
  
        //获得一个cell，滑动cell的时候会执行这个方法，把没有显示（没渲染）的cell拿过来，更改内容，为了减小内存的开销  
  
        var cell = table.dequeueCell();  
        var label;  
        if (!cell) {  
  
            cell = new CustomTableViewCell();  
            //添加图片  
            var sprite = new cc.Sprite(res.red_sprite_png);  
            sprite.anchorX = 0;  
            sprite.anchorY = 0;  
            sprite.x = 0;  
            sprite.y = 0;  
            cell.addChild(sprite);  
            // 添加文本  
            label = new cc.LabelTTF(strValue, "Helvetica", 30);  
            label.x = 0;  
            label.y = 0;  
            label.anchorX = 0.5;  
            label.anchorY = 0.5;  
            label.color = cc.color(255, 255, 0, 255);  
            label.tag = 123;  
            cell.addChild(label);  
        } else {  
            //更改文本信息  
            label = cell.getChildByTag(123);  
            label.setString(strValue);  
        }  
  
        return cell;  
    },  
    //设置cell个数  
    numberOfCellsInTableView: function (table) {  
        return 100;  
    }  
});  