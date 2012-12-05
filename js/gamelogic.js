TD.drawTitleImage = function() {
  jaws.context.fillStyle = "#100"
  jaws.context.fillRect(0,0,jaws.width,jaws.height)
  jaws.context.fillStyle = "#900"
  jaws.context.fillRect(
    0,
    jaws.height - (jaws.height * TD.loadingState.progress/100),
    jaws.width,
    jaws.height
  )
  TD.titleImage.draw()
}

TD.drawMessage = function(msg) {
  jaws.context.font = "18px terminal"
  jaws.context.lineWidth = 10
  jaws.context.fillStyle = "#AAA"
  jaws.context.strokeStyle = "rgba(200,200,200,0.0)"
  jaws.context.fillText(msg, 260, 380)
}

TD.drawFPS = function() {
  jaws.context.font = "12px terminal"
  jaws.context.fillStyle = "rgba(255,255,255,.3)"
  jaws.context.strokeStyle = "rgba(200,200,200,0.0)"
  jaws.context.fillRect(jaws.width - 45, 10, 30, 12)
  jaws.context.fillStyle = "#000"
  jaws.context.fillText(jaws.game_loop.fps, jaws.width - 40, 20)
}

TD.newCanvas = function(w,h) {
  var c = document.createElement("canvas")
  c.width = w || jaws.width
  c.height = h || jaws.height
  return c
}

TD.newCanvasContext = function(w,h) {
  var c = TD.newCanvas(w,h)
  return c.getContext('2d')
}

TD.newSprite = function(w,h) {
  var c,s
  c = TD.newCanvas(w,h)
  s = jaws.Sprite({x:0, y:0, anchor:"center", image:c})
  return s
}

TD.initializeEntities = function(callback) {
  //TODO: replace with a loop for all sprites
  var enemy0 = new jaws.Sprite({x:0, y:0, anchor: "center"})
  Object.each(TD.sprites.enemy0, function(k,v) {
    speed = v.speed
    delete v.speed
    enemy0[k] = new jaws.Animation(v)
    enemy0.speed = speed
  })
  TD.sprites.enemy0 = enemy0

  callback()
}

TD.initializeLevels = function(callback) {
  var s, ctx, fields
  fields = {
    blocked: '#333',
    street: '#888',
    fort: '#800'
  }

  Object.each(TD.levels, function(k,v) {
    /*
    var lvl = new jaws.TileMap({
      cell_size: [jaws.width / v[0].length, jaws.height / v.length],
      size: [v[0].length, v.length]
    })

    v.each(function(line, y) {
      line.split("").each(function(tile, x) {
        var s = jaws.Sprite({x:0, y:0, anchor:"center"})
        var ctx = s.asCanvasContext()
        if(tile == "#") {
          ctx.fillStyle = fields.street
        } else if (tile == "X") {
          ctx.fillStyle = fields.fort
        } else {
          ctx.fillStyle = fields.blocked
        }
        ctx.fillRect(0, 0, lvl.cell_size[0], lvl.cell_size[1])
        lvl.pushToCell(x,y,s)
      })
    })
    */

    s = TD.newSprite()
    ctx = s.image.getContext('2d')
    ctx.fillStyle = "#005500"
    ctx.fillRect(0,0,TD.width,TD.height)
    console.log(ctx)
    
    TD.levels[k] = s
  })

  callback()
}

TD.Enemy = function(type, x,y) {
  var enemy = {}
  $ext(enemy, TD.sprites['enemy'+type])
  enemy.x = x
  enemy.y = y
  enemy.angle = 45
  return enemy
}

