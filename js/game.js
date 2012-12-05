/*
 * http://www.defense-tower.de/games/gemcraft-labyrinth.html
 */

var preLoadingState = {
  setup: function() {
    console.log("preloading")
    this.message = TD.messages.loading
    jaws.assets.load(
      TD.titleImage,
      function() {    // onLoad
        TD.titleImage = new jaws.Sprite({
          x:0, y:0,
          image: jaws.assets.get(TD.titleImage)
        })
        jaws.switchGameState(loadingState)
      },
      function() {this.message = TD.messages.error}  // onError
    )
  },

  update: function() {
  },

  draw: function() {
    TD.drawMessage(TD.messages.loading, false)
  }
}

var loadingState = {
  setup: function() {
    console.log("loading")

    jaws.assets.loadAll({
      onload: function(entity, progress) {
        // loading of assets is only the first half
        TD.loadingState.progress = progress*0.8
      },
      onerror: function(entity, error) {TD.loadingState.error = [entity, error]},
      onfinish: function() {
        TD.loadingState.progress = 80
        TD.initializeEntities(function() {
          TD.loadingState.progress = 90
          TD.initializeLevels(function() {
            jaws.switchGameState(menuState)
          })
        })
      },
    })
  },

  update: function() {
  },

  draw: function() {
    TD.drawTitleImage()
  }
}

var menuState = {
  setup: function() {
    console.log("menuState")
    jaws.on_keydown("space", function(){
      console.log("space")
      jaws.switchGameState(playState)
    })
    jaws.preventDefaultKeys(["space", "up", "down", "left", "right"])
  },

  draw: function() {
    TD.drawTitleImage()
    TD.drawMessage(TD.messages.menu)
  }
}

var playState = {
  setup: function() {
    console.log("playState")

    this.enemies = jaws.SpriteList()
    this.enemies.push(TD.Enemy("0", 20,20))
    this.enemies.push(TD.Enemy("0", 20,50))
    this.enemies.push(TD.Enemy("0", 50,20))
    this.enemies.push(TD.Enemy("0", 50,50))
    //TD.levels[0].push(this.enemies)

    this.viewport = new jaws.Viewport({})
  },

  update: function() {
    var v,fps
    fps = jaws.game_loop.fps
    if(!fps) return

    this.enemies.forEach(function(enemy) {
      v = enemy.speed / fps
      enemy.setImage(enemy.walk.next())
      //if(enemy.angle < 45) enemy.angle += v
      enemy.x += v
      enemy.y += v
    })
  },

  draw: function() {
    jaws.clear()
    //this.viewport.drawTileMap(TD.levels[0])
    this.viewport.draw(TD.levels[0])
    this.viewport.draw(this.enemies)
    //this.enemies.draw()
    TD.drawFPS()
  }
}
