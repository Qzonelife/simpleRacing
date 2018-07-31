const zlog = require("zlog");
cc.Class({
	extends: cc.Component,
	
	properties: {

		// defaults, set visually when attaching this script to the Canvas
		text: 'Hello, World!',
		tiles:[],
		row:10,
		col:10
	},
	

    // use this for initialization
    onLoad: function () {
		
		cc.loader.loadRes("Prefabs/cocos",
		    function(err, prefab) {
				var scene = cc.director.getScene();
			
				for(var i =0;i<4;i++){
					for(var j=0;j<4;j++){
						
						var newNode = cc.instantiate(prefab);
						scene.addChild(newNode);
						newNode.setPosition(cc.v2(i*150, j*150));
						var sp = newNode.getComponent('SpriteComponent');
						sp.init();
						
					}
				}
		    });


    },
    // called every frame
    update: function (dt) {
	  zlog.log("update");
    },
});
