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
        speed:100,
        parent:{
            type:cc.Node,
            default:null
        },
        coinPf:{
            type:cc.Node,
            default:null
        },
        coinPool:[],
        coninArr:[],
        coinLastIndex:[],

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.windowWidth = cc.view.getVisibleSize().width;
        this.speed = 3;

    },
    //检测最后一个组的arr是否在屏幕内
    checkLastCoinInside(){
        if(this.coninArr.length>0){
            var lastGroup = this.coninArr[this.coninArr.length-1];
            var lastIndex = this.coinLastIndex[this.coinLastIndex.length-1];

             var xPos = lastGroup[lastIndex].position.x;
             if(xPos < this.windowWidth/2){
                 return true;
             }else{
                 return false;
             }

        }else{
            return true;
        }
    },
    //在后面增加一个块
    pushAfter(arr){
        if(arr == undefined){
            return;
        }
        if(this.coninArr.length>0){
            var lastGroup = this.coninArr[this.coninArr.length-1];
            var lastIndex = this.coinLastIndex[this.coinLastIndex.length-1];

             var xPos = lastGroup[lastIndex].position.x;
             xPos = xPos+ 200+400*Math.random();
             this.generateByArr(xPos,0,arr);

        }else{
            this.generateByArr(this.windowWidth,0,arr);
        }
      
    },

    //生成一个数组列表
    generateByArr(orgx,orgy,arr){
        var lastArrId = 0;
        var lastX = 0;
        var cArr = [];
        for(var i=0;i<arr.length;i++){
            var xPos = arr[i].x+orgx;
           var coin = this.generateCoin(xPos,arr[i].y+orgy);
            if(lastX<=xPos){
                lastX == xPos;
                lastArrId = i;
            }
            cArr.push(coin);
        }
        this.coninArr.push(cArr);
        this.coinLastIndex.push(lastArrId);
    },
    generateCoin(x,y){
        var coin = this.getCoinInstance();
        coin.setParent(this.parent);
        coin.setPosition(cc.v2(x,y));
        return coin;
    },

    getCoinInstance(){
        var cIns = this.coinPool.pop();
        if(cIns!=undefined){
            cIns.active = true;
            return cIns;
        }
        return cc.instantiate(this.coinPf);
    },
    removeGroupIns(cInsList){
        for(var i=0;i<cInsList.length;i++){
            this.removeCoinInstance(cInsList[i]);
        }
    },
    removeCoinInstance(cIns){
        cIns.active = false;
        this.coinPool.push(cIns);
    },
     update (dt) {
        for(var i=0;i<this.coninArr.length;i++){
            var arr = this.coninArr[i];
            for(var j=0;j<arr.length;j++){
                var pos = arr[j].position;
                pos.x-=this.speed;
                arr[j].position = pos;
            }
        }
        this.checkAndRemoveToPool();

     },
     //检测第一个组的，移除到对象池
     checkAndRemoveToPool(){
       var first = this.coninArr[0];
       if(first!=undefined){
            var lastIndex = this.coinLastIndex[0];
            var posX = first[lastIndex].position.x;
            if(posX < -this.windowWidth/2-50){
                var rmGroup = this.coninArr[0];
                this.coinLastIndex.splice(0,1);
                this.coninArr.splice(0,1);
                this.removeGroupIns(rmGroup);
            }
       }
     }
});
