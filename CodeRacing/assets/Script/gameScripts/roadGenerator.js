// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        speed:1,
        squairArr:[],
        squairPf:{
            type:cc.Node,
            default:null
        },
        parent:{
            type:cc.Node,
            default:null
        },
        orgY:-600,
        minHeight:400,
        windowWidth:0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.speed = 3;
        this.windowWidth = cc.view.getVisibleSize().width;
        this.generateSquair(-422,cc.v2(672,400));
        this.pushAfter();
        this.pushAfter();
        this.pushAfter();
    

    },
    //在后面增加一个块
    pushAfter(){
        var lastNode = this.squairArr[this.squairArr.length-1];
        var pos = lastNode.position;
        var size = cc.v2(lastNode.width,lastNode.height);
        var newXBase = pos.x + size.x + Math.random()*160;
        var width = 250 + Math.random()*160;
        var height = this.minHeight+Math.random()*200;  
        this.generateSquair(newXBase,cc.v2(width,height));

    },
    
    checkRemvoeFirst(){
        var first = this.squairArr[0];
        var last = this.squairArr[this.squairArr.length-1];
        if(last!=undefined){
            var posX = last.position.x;
            if(posX<this.windowWidth){
                this.pushAfter();
            }
        }

        if(first!=undefined){
            var posX = first.position.x;
            var width = first.width;
            if(posX + width + 100<=-this.windowWidth/2){
                first.destroy();
                this.squairArr.splice(0,1);
            }
        }
    },
    generateSquair(orgX,size){
        var pf = cc.instantiate(this.squairPf);
        pf.setParent(this.parent);
        pf.position = cc.v2(orgX,this.orgY);
        pf.width = size.x;
        pf.height = size.y;
        var col = pf.getComponent(cc.BoxCollider);
        col.offset = cc.v2(size.x/2,size.y/2);
        col.size.width = size.x;
        col.size.height = size.y;
        this.squairArr.push(pf);
    },

     update (dt) {
        for(var i=0;i<this.squairArr.length;i++){
            var pos = this.squairArr[i].position;
            pos.x -= this.speed;
            this.squairArr[i].position = pos;
        }
        this.checkRemvoeFirst();
     },
});
