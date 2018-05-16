/// <reference path="../types/cocos2dx.d.ts" />

class CatSprite extends ccs.Sprite {
    constructor(a=0, b=0) {
        super();
        this.node = ccs.load(res.Cat_json).node;
        this.action = ccs.load(res.Cat_json).action;
        this.x = a;
        this.y = b;
    }
    onEnter() {
        super.onEnter();
        this.node.setPosition(this.x, this.y)
        this.addChild(this.node);
        this.node.runAction(this.action);
        this.action.gotoFrameAndPlay(0, true);
    }  
}