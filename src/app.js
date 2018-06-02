        var cSize = 60;
        var imgRes = [res.char1, res.char2, res.char7, res.char4,
          res.char5, res.char6, res.char7]

          var This;
          var pickedTiles = []
          var size;
          var scoreText;
          var moves = 0;


          var HelloWorldLayer = cc.Layer.extend({sprite:null,
            ctor:function () {
              this._super();



        size = cc.winSize;

        This = this;


        var gradient  = cc.LayerGradient.create(cc.color(178,254,250,255), cc.color(14, 210, 247, 255))
        this.addChild(gradient)

        //score label
        scoreText = cc.LabelTTF.create("Moves: 0", "Arial", "100",
          cc.TEXT_ALIGNMENT_CENTER);

        this.addChild(scoreText, 5);
        scoreText.setPosition(size.width-190, 50)

        /*var bg = new cc.Sprite(res.bg);

        bg.attr({

          x: size.width/2,

          y: size.height/2

        })

        this.addChild(bg)*/



        for (var i = 0;i<32;i++){
          var tile = new MemoryTitle();
          var pic = imgRes[Math.floor(Math.random()*6)]

          tile.picVal = pic
          this.addChild(tile, 0);

          //tile.setPosition((i*cSize)+(cSize/2), 400-Math.floor(1/4)*74)

          tile.setPosition(((i%8)*2*cSize)+cSize, size.height-((Math.floor(i/8)*cSize*2))-cSize);

        }



        return true;

    }

});



var MemoryTitle = cc.Sprite.extend({

  ctor: function(){

    this._super()

    //new cc.Sprite(imgRes[Math.floor(Math.random()*6)]);

    //this.initWithFile(imgRes[Math.floor(Math.random()*6)]);

    this.initWithFile(res.char3);

    cc.eventManager.addListener(listener.clone(), this)

  }

})



var listener = cc.EventListener.create({
  event: cc.EventListener.TOUCH_ONE_BY_ONE,
  swallowTouches: true,
  onTouchBegan: function(touch, event){

    if (pickedTiles.length < 2){
      var target = event.getCurrentTarget();
      var location = target.convertToNodeSpace(touch.getLocation());
      var targetSize = target.getContentSize()
      var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height)

      if (cc.rectContainsPoint(targetRectangle, location)){

        //alert("I picked a tile!!");

        //target.initWithFile(target.picVal);

        if (pickedTiles.indexOf(target)==-1){
          target.initWithFile(target.picVal);
          pickedTiles.push(target);

          if (pickedTiles.length == 2){checkTiles();
          }

        }

      }

    }



  }

})



function checkTiles(){
  moves++;

  scoreText.setString("Moves: "+moves);

//effect

  var bg_effect = new cc.Sprite(res.bg_effect);
  bg_effect.attr({

    x: size.width/2,
    y: size.height/2+150

  })



  if (pickedTiles[0].picVal==pickedTiles[1].picVal){
    This.addChild(bg_effect, 4);

  }



  var pause = setTimeout(function(){
    if(pickedTiles[0].picVal!=pickedTiles[1].picVal){
      pickedTiles[0].initWithFile(res.char3);
      pickedTiles[1].initWithFile(res.char3);

    }

    else{
      /*setTimeout(function(){

    },1000)*/
    This.removeChild(pickedTiles[0]);
    This.removeChild(pickedTiles[1]);
    This.removeChild(bg_effect);
  }

    pickedTiles = []

  }, 2000);

}



var HelloWorldScene = cc.Scene.extend({
  onEnter:function () {
    this._super();
    var layer = new HelloWorldLayer();
    this.addChild(layer);

    }

});
