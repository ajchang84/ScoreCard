/// <reference path="../types/cocos2dx.d.ts" />

class TrendChartLayer extends cc.Layer {
    constructor() {
        super();
        this.scale = .922;
        // this.scale = 1
        // this.data = Array.from({length: 0}, () => Math.floor(Math.random() * 3 + 1));
        // this.data = [1,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2];
        // this.data = [1,1,1,1,1,1,2,2,2,2,2,2,1,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2];
        this.data = [1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,2,2,2,2,2,1,1,1,2,2,2,1];
    }

    onEnter() {
        super.onEnter();
        console.log(this.data.length)
        const Bead_Plate = new BeadPlate();
        const Big_Road = new BigRoad();
        const Big_Eye_Boy = new BigEyeBoy();
        const Small_Road = new SmallRoad();
        const Cockroach_Pig = new CockroachPig();
        
        Bead_Plate.setPosition(cc.p(10,10));
        Bead_Plate.loadData(this.data);
        this.addChild(Bead_Plate);

        Big_Road.setPosition(cc.p(350,112));
        Big_Road.loadData(this.data);
        this.addChild(Big_Road);

        Big_Eye_Boy.setPosition(cc.p(350,61));
        Small_Road.setPosition(cc.p(350,10));
        Cockroach_Pig.setPosition(cc.p(605,10));
        this.addChild(Big_Eye_Boy);
        this.addChild(Small_Road);
        this.addChild(Cockroach_Pig);

        const Border = new cc.DrawNode();
        Border.drawRect(cc.p(Bead_Plate.x,Bead_Plate.y), cc.p(Big_Road.x + Big_Road.width,Big_Road.y+Big_Road.height), cc.color.TRANSPARENT, 1, COLORS.GREY);
        this.addChild(Border);

        const button1 = new ccui.Button(
            res.banker_sprite_png,
            res.banker_sprite_png
        );
        const button2 = new ccui.Button(
            res.player_sprite_png,
            res.player_sprite_png
        );
        const button3 = new ccui.Button(
            res.tie_sprite_png,
            res.tie_sprite_png
        );
        button1.attr({
            x: 400,
            y: 400
        });
        button2.attr({
            x: 450,
            y: 400
        });
        button3.attr({
            x: 500,
            y: 400
        });

        button1.addClickEventListener(()=>{
            Bead_Plate.addMarker(1);
            Big_Road.addMarker(1);
        });
        button2.addClickEventListener(()=>{
            Bead_Plate.addMarker(2);
            Big_Road.addMarker(2);
        });
        button3.addClickEventListener(()=>{
            Bead_Plate.addMarker(3);
            Big_Road.addMarker(3);
        });
        this.addChild(button1);
        this.addChild(button2);
        this.addChild(button3);
    }
}