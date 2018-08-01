// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var cfgMgr = require('cfgMgr');
cc.Class({
    extends: cc.Component,

    properties: {
        player:{
            type:cc.Node,
            default:null
        },
        background:{
            type:cc.Node,
            default:null
        },
        isCfgInitFinish:false,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw;
        this.roleCtrl = this.player.getComponent("roleCtrl");
        this.rewardCtrl = this.node.getComponent("rewardGenerator");
        this.background.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.background.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        cfgMgr._instance.init(this.configInitFinish,this);
        this.schedule(this.genReward,1);
    },
    genReward(){
        if(this.isCfgInitFinish){
            if(this.rewardCtrl.checkLastCoinInside()){
                var randIndex = Math.floor(cfgMgr._instance.posArr.length *Math.random());
                this.rewardCtrl.pushAfter(cfgMgr._instance.posArr[randIndex]);
            }else{

            }
           
        }
      
    },
    configInitFinish(self){
        self.isCfgInitFinish = true;
    },
    onTouchStart(e){
        this.roleCtrl.onTouchStartAct();
       
    },
    onTouchEnd(e){
       // this.roleCtrl.onTouchEndAct();
    }
    // update (dt) {},
});
