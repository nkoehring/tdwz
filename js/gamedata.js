var TD = {
  width: 640,
  height: 400,

  loadingState: {
    progress: 0,
    error: false
  },

  messages: {
    menu: "press space",
    loading: "~loading~",
    error: "something went wrong :("
  },

  titleImage: "title.png",

  sprites: {
    enemy0: {
      walk: {
        sprite_sheet: "sprites/enemy_walk.png",
        frame_size: [28,19],
        frame_duration: 500,
        loop: true,
        orientation: "down",
        speed: 5
      }
      //die: "",
      //attack: ""
    },
    //player: "sprites/player.png"
  },

  levels:  {
    0: [
      "##........",
      ".#.###....",
      ".#.#.#....",
      ".#.#.#....",
      ".#.#.#.###",
      ".#.#.###X#",
      ".###...###"
    ]
  }
}

// load assets
for(i in TD.sprites) jaws.assets.add(TD.sprites.enemy0.walk.sprite_sheet)
