// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var zlog = require("zlog");
var SpriteComponent = cc.Class({
    extends:cc.Component,


    init:function(){
       
        var btn = this.node.getComponent(cc.Button);
        btn.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this.node);
        btn.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this.node);
        btn.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this.node);
    },

    touchStart:function(event){
        zlog.log(this.x+","+this.y)
    },
    touchMove:function(event){
        var delta = event.touch.getDelta();
        this.x+=delta.x;
        this.y+=delta.y;
    },
    touchEnd:function(event){
        zlog.log(this.x+","+this.y)
    }
    // update (dt) {},
});
