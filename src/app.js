/// <reference path="../types/cocos2dx.d.ts" />

const TableScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        const Trend_Chart = new TrendChartLayer();
        const backgroundLayer = new cc.LayerColor(cc.color.WHITE);
        this.addChild(backgroundLayer);

        this.addChild(Trend_Chart);
    }
});