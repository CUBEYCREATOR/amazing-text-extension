(function(Scratch) {
  const vm = Scratch.vm;
  let rt
  if (vm) {
      rt = vm.runtime
  }

  let text = []
  var text2 = []
  let font = "arial"
  let sz = 2
  var col = "#000000"
  let align = "left"
  let wowowowoowowowowo = 0
  let aaaaaaaaa = 0
  var awesomefreakingvariabvle = false

  function whereismario() {
      if (!rt || !rt.targets) return null
      for (let i=0; i<rt.targets.length; i++) {
          if (!rt.targets[i].isStage && rt.targets[i].getName && rt.targets[i].getName().toLowerCase().startsWith("mario")) {
              return rt.targets[i]
          }
      }
      return null;
  }

  function maketheletter(letterrr, fontthing, thecolor) {
    aaaaaaaaa++
    var bigcanvas = document.createElement("canvas")
    bigcanvas.width = 108
    bigcanvas.height = 108
    var ctx = bigcanvas.getContext("2d")

    var bg = "white"
    var s = ("" + thecolor).trim().toLowerCase()
    if (s == "white" || s == "#ffffff" || s == "#fff") {
        bg = "black"
    }

    if (bg == "white") ctx.fillStyle = "rgb(245,245,242)"
    else ctx.fillStyle = "rgb(30,30,34)"
    ctx.fillRect(0, 0, 108, 108)

    let ff = "Arial"
    if (fontthing == "comic sans") ff = "Comic Sans MS"
    if (fontthing == "times new roman") ff = "Times New Roman"
    if (fontthing == "courier") ff = "Courier New"
    if (fontthing == "papyrus") ff = "Papyrus"
    if (fontthing == "impact") ff = "Impact"

    ctx.font = "28px " + ff
    ctx.textAlign = "center"
    ctx.fillStyle = "#ff00ff"
    if (s == "black" || s == "white" || s == "red" || s == "blue" || s == "green" || s == "yellow" || s == "purple" || s == "orange" || s[0] == "#") {
        ctx.fillStyle = s
    }
    ctx.fillText(letterrr, 20, 33)

    var img = ctx.getImageData(0, 0, 108, 108)
    var d = img.data
    var checkthing = bg == "white" ? "6,6,6" : "1,1,1"

    for (var i = 0; i < d.length; i += 4) {
        var rgb = [Math.round(d[i] / 42), Math.round(d[i + 1] / 42), Math.round(d[i + 2] / 42)].join(",")
        if (rgb == checkthing) {
            d[i + 3] = 0
        } else {
            d[i] = parseInt(d[i] / 16) * 16
            d[i + 1] = parseInt(d[i + 1] / 16) * 16
            d[i + 2] = parseInt(d[i + 2] / 16) * 16
            d[i + 3] = 255
        }
    }
    ctx.putImageData(img, 0, 0)

    let smallboy = document.createElement('canvas')
    smallboy.width = 20
    smallboy.height = 22
    let ctx2 = smallboy.getContext('2d')
    ctx2.drawImage(bigcanvas, 0, 0, 40, 44, 0, 0, 20, 22)

    let stuff = ctx2.getImageData(0, 0, 20, 22)
    for (let k = 0; k < stuff.data.length; k += 4) {
      if (stuff.data[k + 3] > 120) stuff.data[k + 3] = 255
      else stuff.data[k + 3] = 0
    }
    return stuff
  }

  function drawthething(thingy, plzwork) {
      if (!rt || !rt.renderer) return
      const ren = rt.renderer
      let s = ("" + thingy.text).trim()
      if (s.length > 35) s = s.substring(0, 35)

      let px = thingy.size * 12
      let totalW = 0

      let stupidcanvas = document.createElement("canvas")
      let mctx = stupidcanvas.getContext("2d")
      let ff = "Arial"
      if (thingy.font == "comic sans") ff = "Comic Sans MS"
      if (thingy.font == "times new roman") ff = "Times New Roman"
      if (thingy.font == "courier") ff = "Courier New"
      if (thingy.font == "papyrus") ff = "Papyrus"
      if (thingy.font == "impact") ff = "Impact"
      mctx.font = px + "px " + ff

      let wwwwww = []
      for (let i=0;i<s.length;i++) {
          let w = 0
          if (s[i] == " ") w = px * 0.36
          else if (s[i] == "i" || s[i] == "l" || s[i] == "!" || s[i] == ".") w = px * 0.38
          else {
              w = mctx.measureText(s[i]).width * 1.04
              if (!w) w = px * 0.6
              if (s[i] == "m" || s[i] == "w") w = w * 0.88
          }
          wwwwww.push(w)
          totalW += w
      }

      let x=parseInt(thingy.x)
      if (thingy.align == "middle") x = parseInt(thingy.x - totalW / 2.3)
      if (thingy.align == "right") x = parseInt(thingy.x - totalW * 0.92)
      let startX = x
      let y=parseInt(thingy.y)

      let changed = thingy.oldFont != thingy.font || thingy.oldCol != thingy.col
      thingy.oldFont = thingy.font
      thingy.oldCol = thingy.col

      let m = whereismario()
      let ok = awesomefreakingvariabvle && m != null && m.visible !== false

      for (let i = 0; i < s.length; i++) {
          let ch = s[i]
          if (i >= thingy.d.length) {
              let data = maketheletter(ch, thingy.font, thingy.col)
              let sk = ren.createBitmapSkin(data, 1, [10, 11])
              let dr = ren.createDrawable(thingy.layer)
              ren.updateDrawableSkinId(dr, sk)
              thingy.s.push(sk)
              thingy.d.push(dr)
              thingy.c.push(ch)
              thingy.tx.push(0)
              thingy.ty.push(0)
          } else if (thingy.c[i] != ch || changed) {
              thingy.c[i] = ch
              let data = maketheletter(ch, thingy.font, thingy.col)
              ren.updateBitmapSkin(thingy.s[i], data, 1, [10, 11])
          } else if (!plzwork && (i + wowowowoowowowowo) % 2 == 0 && aaaaaaaaa < 11) {
              let data = maketheletter(ch, thingy.font, thingy.col)
              ren.updateBitmapSkin(thingy.s[i], data, 1, [10, 11])
          }

          let scale = (px / 14) * 100
          let dx = x + wwwwww[i] / 2 + thingy.tx[i]
          let dy = y - i * 0.16 + thingy.ty[i]

          if (ch == "\n") {
              x = startX
              y = y - px * 1.18
          } else {
              x += wwwwww[i]
          }

          ren.updateDrawableProperties(thingy.d[i], {
              position: [dx, dy],
              scale: [scale, scale],
              direction: 90,
              visible: ok && ch != "\n"
          })
      }

      ren.dirty = true
      if (rt.requestRedraw) rt.requestRedraw()
  }

  function bye(uhh) {
    if (!rt || !rt.renderer || !uhh) return
    for (var i = 0; i < uhh.d.length; i++) {
      rt.renderer.destroyDrawable(uhh.d[i], uhh.layer)
      rt.renderer.destroySkin(uhh.s[i])
    }
    uhh.d = []
    uhh.s = []
    uhh.c = []
  }


  if (rt && rt.on) {
    rt.on("AFTER_EXECUTE", () => {
      wowowowoowowowowo++
      aaaaaaaaa = 0

      let m = whereismario()
      let ok = awesomefreakingvariabvle && m != null && m.visible !== false
      if (!ok) {
        for (let i = 0; i < text.length; i++) {
          for (let j = 0; j < text[i].d.length; j++) {
            rt.renderer.updateDrawableProperties(text[i].d[j], { visible: false })
          }
        }
        for (let i = 0; i < text2.length; i++) {
          for (let j = 0; j < text2[i].d.length; j++) {
            rt.renderer.updateDrawableProperties(text2[i].d[j], { visible: false })
          }
        }
        return
      }

      for (let i = 0; i < text.length; i++) {
          for (let j = 0; j < text[i].tx.length; j++) {
              if (Math.random() < 0.02) {
                  text[i].tx[j] = Math.floor(Math.random() * 5) - 2
                  text[i].ty[j] = Math.floor(Math.random() * 3) - 1
              } else if (Math.random() < 0.28) {
                  text[i].tx[j] = 0
                  text[i].ty[j] = 0
              }
          }
          drawthething(text[i], false)
      }

      for (let i = 0; i < text2.length; i++) {
          for (let j = 0; j < text2[i].tx.length; j++) {
              if (Math.random() < 0.015) {
                  text2[i].tx[j] = Math.floor(Math.random() * 3) - 1
                  text2[i].ty[j] = Math.floor(Math.random() * 3) - 1
              } else if (Math.random() < 0.3) {
                  text2[i].tx[j] = 0
                  text2[i].ty[j] = 0
              }
          }
          drawthething(text2[i], false)
      }
    })

    rt.on("PROJECT_START", function() {
      for (var i = 0; i < text.length; i++) bye(text[i])
      for (var j = 0; j < text2.length; j++) bye(text2[j])
      text = []
      text2 = []
      awesomefreakingvariabvle = false
    })

    rt.on("targetWasRemoved", function(t) {
        if (!t) return
        if (!t.isStage && t.getName && t.getName().toLowerCase().startsWith("mario")) {
            awesomefreakingvariabvle = false
            for (let i = 0; i < text.length; i++) bye(text[i])
            for (let i = 0; i < text2.length; i++) bye(text2[i])
            text = []
            text2 = []
            return
        }
        for (let i = text.length - 1; i >= 0; i--) {
            if (text[i].id == t.id) {
                bye(text[i])
                text.splice(i, 1)
            }
        }
    })
  }


  class awesometextextension {
    getInfo() {
      return {
        id: 'awesometextextension',
        name: 'awesome text extension',
        color1: '#6b8e3d',
        color2: '#567330',
        color3: '#425924',
        blocks: [
          {
            opcode: 'write',
            blockType: Scratch.BlockType.COMMAND,
            text: 'write [T] at y: [Y] x: [X]',
            arguments: {
              T: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello world' },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: -70 }
            }
          },
          {
            opcode: 'typewrite',
            blockType: Scratch.BlockType.COMMAND,
            text: 'type [T] at y: [Y] x: [X] speed: [S]',
            arguments: {
              T: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello world' },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: -70 },
              S: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0.1 }
            }
          },
          {
            opcode: 'stamp',
            blockType: Scratch.BlockType.COMMAND,
            text: 'stamp [T] at x: [X] y: [Y]',
            arguments: {
              T: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello' },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: 'clr',
            blockType: Scratch.BlockType.COMMAND,
            text: 'clear text'
          },
          {
            opcode: 'clrStmp',
            blockType: Scratch.BlockType.COMMAND,
            text: 'clear stamped'
          },
          {
            opcode: 'setFont',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set font [F]',
            arguments: {
              F: { type: Scratch.ArgumentType.STRING, menu: 'fonts', defaultValue: 'arial' }
            }
          },
          {
            opcode: 'setSize',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set size [S]',
            arguments: {
              S: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
            }
          },
          {
            opcode: 'setColor',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set color [C]',
            arguments: {
              C: { type: Scratch.ArgumentType.STRING, defaultValue: '#000000' }
            }
          },
          {
            opcode: 'setAlign',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set align [A]',
            arguments: {
              A: { type: Scratch.ArgumentType.STRING, menu: 'aligns', defaultValue: 'left' }
            }
          },
          {
            opcode: 'widthOf',
            blockType: Scratch.BlockType.REPORTER,
            text: 'width of [T]',
            arguments: {
              T: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello world' }
            }
          },
          {
            opcode: 'mario',
            blockType: Scratch.BlockType.COMMAND,
            text: 'mario'
          }
        ],
        menus: {
          fonts: {
            acceptReporters: false,
            items: ['arial', 'comic sans', 'times new roman', 'courier', 'papyrus', 'impact']
          },
          aligns: {
            acceptReporters: false,
            items: ['left', 'middle', 'right']
          }
        }
      }
    }

    mario() {
        if (!rt) return
        let m = whereismario()
        if (m) {
            awesomefreakingvariabvle = true
            if (m.setVisible) m.setVisible(true)
            if (m.setSize) m.setSize(100)
            if (m.setXY) m.setXY(Math.floor(Math.random() * 200 - 100), Math.floor(Math.random() * 140 - 70))
            return
        }
        if (vm && vm.addSprite) {
            let old = vm.editingTarget ? vm.editingTarget.id : null
            const mariomariomario = '{"isStage":false,"name":"mario","variables":{},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"assetId":"00000000000000000000000000000000","name":"mario","bitmapResolution":1,"md5ext":"00000000000000000000000000000000.svg","dataFormat":"svg","rotationCenterX":24,"rotationCenterY":24}],"sounds":[],"volume":100,"layerOrder":1,"visible":true,"x":' + Math.floor(Math.random() * 180 - 90) + ',"y":' + Math.floor(Math.random() * 120 - 60) + ',"size":100,"direction":90,"draggable":false,"rotationStyle":"all around"}'
            return vm.addSprite(mariomariomario).then(() => {
                awesomefreakingvariabvle = true
                if (old && vm.setEditingTarget) vm.setEditingTarget(old)
            })
        }
    }

    write(args, util) {
      if (!rt || !awesomefreakingvariabvle) return
      let m = whereismario()
      if (!m || m.visible === false) return

      var id = (util && util.target) ? util.target.id : "stage"
      var text3 = args.T || "text"
      var y = (Number(args.Y) || 0) * -1
      var x = Number(args.X) || 0

      var thing = null
      for (var i = 0; i < text.length; i++) {
        if (text[i].id == id) thing = text[i]
      }

      if (!thing) {
        thing = {
          id: id,
          text: "" + text3,
          x: x,
          y: y,
          font: font,
          size: sz,
          col: col,
          align: align,
          oldFont: "",
          oldCol: "",
          layer: "sprite",
          d: [],
          s: [],
          c: [],
          tx: [],
          ty: []
        }
        text.push(thing)
      } else {
        thing.text = "" + text3
        thing.x = x
        thing.y = y
        thing.font = font
        thing.size = sz
        thing.col = col
        thing.align = align
      }
      drawthething(thing, true)
    }

    typewrite(args, util) {
        if (!rt || !awesomefreakingvariabvle) return
        let ggggggggg = "" + (args.T || "text")
        let s = Number(args.S)
        if (!s || s < 0) s = 0.1
        if (s > 3) s = 3

        return new Promise((resolve) => {
            let n = 0
            let next = () => {
                if (!awesomefreakingvariabvle) { resolve(); return }
                n++
                if (Math.random() < 0.15 && n < ggggggggg.length) n++
                this.write({ T: ggggggggg.slice(0, n), Y: args.Y, X: args.X }, util)
                if (n >= ggggggggg.length) {
                    resolve()
                    return
                }
                setTimeout(next, (Math.random() < 0.2 ? s * 2.2 : s) * 1000)
            }
            next()
        })
    }

    stamp(args, util) {
      if (!rt || !awesomefreakingvariabvle) return
      let m = whereismario()
      if (!m || m.visible === false) return

      if (text2.length > 24) {
        bye(text2.shift())
      }

      var boing = {
        id: (util && util.target) ? util.target.id : "stage",
        text: "" + (args.T || "text"),
        x: Number(args.X) || 0,
        y: Number(args.Y) || 0,
        font: font,
        size: sz,
        col: col,
        align: align,
        oldFont: "",
        oldCol: "",
        layer: "pen",
        d: [],
        s: [],
        c: [],
        tx: [],
        ty: []
      }
      text2.push(boing)
      drawthething(boing, true)
    }

    clr() {
      for (var i = 0; i < text.length; i++) {
        bye(text[i])
      }
      text = []
    }

    clrStmp() {
      for (var i = 0; i < text2.length; i++) {
        bye(text2[i])
        text2.splice(i, 1)
      }
    }

    setFont(args) {
      font = ("" + args.F).toLowerCase()
    }

    setSize(args) {
      var number1 = parseInt(args.S)
      if (!number1 || number1 < 1) number1 = 1
      if (number1 > 12) number1 = 12
      sz = number1
    }

    setColor(args) {
      col = "" + args.C
    }

    setAlign(args) {
      align = ("" + args.A).toLowerCase()
    }

    widthOf(args) {
      var s = "" + (args.T || "")
      return Math.floor(s.length * sz * 12 * 0.55 + 3) + "px"
    }
  }

  Scratch.extensions.register(new awesometextextension())
})(Scratch);
