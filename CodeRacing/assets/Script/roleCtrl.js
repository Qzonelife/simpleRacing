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

    //state状态 0，正常，1，跳跃中，2，下落中
    properties: {
        state:0,
        accele:0,
        acce2:0.1,
        windowHeight:0
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.state = 2;
        this.windowHeight = cc.view.getVisibleSize().height;
    },

     update (dt) {
         if(this.state == 2){
            var pos = this.node.position;
            pos.y-=this.accele/3;
            this.node.position = pos;
            this.accele +=this.acce2;
            
         }else if(this.state == 1){
            var pos = this.node.position;
            pos.y+=this.accele;
            this.accele-=this.acce2;
            this.node.position = pos;
            if(this.accele<=0){
                this.accele = 0;
                this.state = 2;
            }
         }
     },
     onTouchAct(){
         this.state = 1;
         this.accele = 40
     },
     onCollisionEnter(tar){
         var col = tar.getComponent(cc.Collider);
         if(col.tag == 0){
             var yPos = tar.node.position.y;
             var height = tar.node.height;
             var padd = yPos+height-20;
             zlog.log(padd)
             if(this.node.position.y>padd){
                this.state = 0;
                this.accele = 0;
                var pos = this.node.position;
                pos.y = yPos+height;
                this.node.position = pos;
             }else{
               
               
             }
         }
 
        
     },
     onCollisionExit(){
         if(this.state!=1){
            this.state = 2;
         }
     }

});
