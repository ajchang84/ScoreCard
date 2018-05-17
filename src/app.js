var nodeAction = new cc.JumpTo( 2, cc.p( 50, 100 ), 50, 4 );


var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    count: 1,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
        var mainscene = ccs.load(res.MainScene_json);
        
        // cc.spriteFrameCache.addSpriteFrames(res.Cat_sprite);
        // var coolSprite = new cc.Sprite( cc.spriteFrameCache.getSpriteFrame('tile000.png'));
        var button = mainscene.node.getChildByName("Move");
        var cat = mainscene.node.getChildByName("Cat");
        // console.log(mainscene.action)
        button.runAction( nodeAction );
        button.addTouchEventListener(this.touchEvent, this);
        cat.runAction( mainscene.action );
        mainscene.action.gotoFrameAndPlay(0, false);
        // var action = mainscene.action;
        // if(action){
        //     mainscene.node.runAction(action);
        //     action.gotoFrameAndPlay(0, true);
        // }
        this.schedule(this.addCats, 1, 3, 1);
        // console.log(mainscene.node.getChildByName('FileNode_6').getChildByName('Map_1'));
        this.addChild(mainscene.node);

        // this.addChild(coolSprite);

        // this.addChild(new cc.Sprite(main.node);

        /* you can create scene with following comment code instead of using csb file.
        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        */

        return true;
    },
    addCats: function() {
        console.log(ccs)
        // var cat = new ccs.KittyCat();
        var cat = new CatSprite(this.count*50, this.count*50);
        this.addChild(cat);
        this.count++;
    },
    touchEvent: function(sender, type) {
        console.log(sender)
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                var nodeAction = new cc.JumpTo( 2, cc.p( 100, 300 ), 50, 4 );
                sender.runAction( nodeAction );
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED: 
                break;
            case ccui.Widget.TOUCH_CANCELLED:
                break;                
        }
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

const TestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        const layer = new cc.Layer();

        const Bead_Plate = new BeadPlate();
        const Big_Road = new BigRoad();
        const Big_Eye_Boy = new BigEyeBoy();
        const Small_Road = new SmallRoad();
        const Cockroach_Pig = new CockroachPig();
        Bead_Plate.attr({
            x: 10,
            y: 10,
            // scale: 0.922
        })
        Big_Road.attr({
            x: 350,
            y: 112,
        })
        Big_Eye_Boy.attr({
            x: 350,
            y: 61,
        })
        Small_Road.attr({
            x: 350,
            y: 10,
        })
        Cockroach_Pig.attr({
            x: 605,
            y: 10,
        })

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
        })
        button2.attr({
            x: 450,
            y: 400
        })
        button3.attr({
            x: 500,
            y: 400
        })

        button1.addClickEventListener(()=>{
            Big_Road.addMarker(1);
        })
        button2.addClickEventListener(()=>{
            Bead_Plate.addMarker(2);
        })
        button3.addClickEventListener(()=>{
            Big_Eye_Boy.addMarker(3);
        })

        const backgroundLayer = new cc.LayerColor(cc.color.WHITE);
        layer.addChild(backgroundLayer);

        layer.addChild(Bead_Plate);
        layer.addChild(Big_Road)
        layer.addChild(Big_Eye_Boy)
        layer.addChild(Small_Road)
        layer.addChild(Cockroach_Pig)
        layer.addChild(button1);
        layer.addChild(button2);
        layer.addChild(button3);
        
        layer.attr({
            // scale: 0.922
            scale: 1
        })

        this.addChild(layer);
    }
});

const TestTableView = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new RankList();
        this.addChild(layer);
    }
});
