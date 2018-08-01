

var cfgMgr = cc.Class({

    statics:{
        _instance:null
    },
    ctor(){
        this.posArr = [];
    },
    init(callBack,target){
        var self = this;
        cc.loader.loadRes("Cfg/rewardCfg.json",function(err,obj){
            var posGroup = obj.reward.posGroup;
            for(var i in obj.reward.posGroup){
                var posList = posGroup[i];
                var arrLs = [];
                for(var j in posList){
                    var posStr = posList[j];
                    var pos = cc.v2(parseInt(posStr.split(',')[0]),parseInt(posStr.split(',')[1]));
                    arrLs.push(pos);
                }
                self.posArr.push(arrLs);
            }
            callBack(target);

        });
    },
  
});

cfgMgr._instance = new cfgMgr();
module.exports = cfgMgr;