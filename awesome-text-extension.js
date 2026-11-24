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

    let birdcache = null
    let birdloading = null
    let flappybirdthing = null
    let keythingadded = false
    let canvasthing = null

    function whereismario() {
        if (!rt || !rt.targets) return null
        for (let i = 0; i < rt.targets.length; i++) {
            let t = rt.targets[i]
            if (t && !t.isStage && t.getName && t.getName().toLowerCase().startsWith("mario")) {
                return t
            }
        }
        return null
    }

    function maketheletter(ch, f, c) {
        aaaaaaaaa++
        let c1 = document.createElement("canvas")
        c1.width = 40
        c1.height = 44
        let ctx = c1.getContext("2d")
        ctx.fillStyle = "rgb(245, 245, 242)"
        ctx.fillRect(0, 0, 40, 44)

        let ff = "Arial"
        if (f == "comic sans") ff = "Comic Sans MS"
        if (f == "times new roman") ff = "Times New Roman"
        if (f == "courier") ff = "Courier New"
        if (f == "papyrus") ff = "Papyrus"
        if (f == "impact") ff = "Impact"

        ctx.font = "28px " + ff
        ctx.textAlign = "center"
        ctx.textBaseline = "alphabetic"
        ctx.fillStyle = c || "#000000"
        ctx.fillText(ch, 20, 33)

        let c2 = document.createElement("canvas")
        c2.width = 20
        c2.height = 22
        let ctx2 = c2.getContext("2d")
        ctx2.imageSmoothingEnabled = false
        ctx2.drawImage(c1, 0, 0, 20, 22)

        let stuff = ctx2.getImageData(0, 0, 20, 22)
        for (let k = 0; k < stuff.data.length; k += 4) {
            let r = stuff.data[k]
            let g = stuff.data[k + 1]
            let b = stuff.data[k + 2]
            if (Math.abs(r - 245) < 8 && Math.abs(g - 245) < 8 && Math.abs(b - 242) < 8) {
                stuff.data[k + 3] = 0
            } else if (stuff.data[k + 3] > 120) {
                stuff.data[k + 3] = 255
            } else {
                stuff.data[k + 3] = 0
            }
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
        for (let i = 0; i < s.length; i++) {
            let w = Math.ceil(mctx.measureText(s[i]).width) + 1
            if (s[i] == " ") w = Math.max(4, Math.floor(px * 0.35))
            wwwwww.push(w)
            totalW += w
        }

        let startX = thingy.x
        if (thingy.align == "middle") startX = thingy.x - totalW / 2
        if (thingy.align == "right") startX = thingy.x - totalW

        let x = startX
        let y = thingy.y
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

    function grabbirdfile(p) {
        let ffn = Scratch.fetch ? Scratch.fetch.bind(Scratch) : fetch
        let u1 = "https://cdn.jsdelivr.net/gh/samuelcust/flappy-bird-assets@master/" + p
        let u2 = "https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/" + p
        return ffn(u1).then(function(r) {
            if (!r.ok) throw new Error("nope")
            return r.blob()
        }).catch(function() {
            return ffn(u2).then(function(r) {
                return r.blob()
            })
        })
    }

    function loadbirdpic(p, flip) {
        return grabbirdfile(p).then(function(b) {
            return new Promise(function(res, rej) {
                let u = URL.createObjectURL(b)
                let im = new Image()
                im.onload = function() {
                    let w = im.naturalWidth || im.width
                    let h = im.naturalHeight || im.height
                    let cv = document.createElement("canvas")
                    cv.width = w
                    cv.height = h
                    let cx = cv.getContext("2d")
                    if (flip) {
                        cx.translate(0, h)
                        cx.scale(1, -1)
                    }
                    cx.drawImage(im, 0, 0)
                    URL.revokeObjectURL(u)
                    res({ d: cx.getImageData(0, 0, w, h), w: w, h: h })
                }
                im.onerror = function(e) {
                    URL.revokeObjectURL(u)
                    rej(e)
                }
                im.src = u
            })
        })
    }

    function loadbirdsnd(p) {
        return grabbirdfile(p).then(function(b) {
            let u = URL.createObjectURL(b)
            let a = new Audio(u)
            a.volume = 0.45
            return a
        }).catch(function() {
            return null
        })
    }

    function playbirdsnd(a) {
        if (!a) return
        try {
            let c = a.cloneNode()
            c.volume = 0.45
            c.play().catch(function() {})
        } catch (e) {}
    }

    function getthebirdstuff() {
        if (birdcache) return Promise.resolve(birdcache)
        if (birdloading) return birdloading

        let numJobs = []
        for (let i = 0; i < 10; i++) {
            numJobs.push(loadbirdpic("sprites/" + i + ".png", false))
        }

        birdloading = Promise.all([
            loadbirdpic("sprites/background-day.png", false),
            loadbirdpic("sprites/base.png", false),
            loadbirdpic("sprites/pipe-green.png", false),
            loadbirdpic("sprites/pipe-green.png", true),
            loadbirdpic("sprites/yellowbird-downflap.png", false),
            loadbirdpic("sprites/yellowbird-midflap.png", false),
            loadbirdpic("sprites/yellowbird-upflap.png", false),
            loadbirdpic("sprites/message.png", false),
            loadbirdpic("sprites/gameover.png", false),
            Promise.all(numJobs),
            loadbirdsnd("audio/wing.wav"),
            loadbirdsnd("audio/point.wav"),
            loadbirdsnd("audio/hit.wav"),
            loadbirdsnd("audio/die.wav"),
            loadbirdsnd("audio/swoosh.wav")
        ]).then(function(arr) {
            birdcache = {
                bg: arr[0],
                base: arr[1],
                pbot: arr[2],
                ptop: arr[3],
                b0: arr[4],
                b1: arr[5],
                b2: arr[6],
                msg: arr[7],
                go: arr[8],
                nums: arr[9],
                sfx: {
                    wing: arr[10],
                    point: arr[11],
                    hit: arr[12],
                    die: arr[13],
                    swoosh: arr[14]
                }
            }
            birdloading = null
            return birdcache
        }).catch(function(e) {
            birdloading = null
            throw e
        })

        return birdloading
    }

    function byebird() {
        if (!flappybirdthing || !rt || !rt.renderer) {
            flappybirdthing = null
            return
        }
        let g = flappybirdthing
        flappybirdthing = null
        for (let i = 0; i < g.allDraws.length; i++) {
            rt.renderer.destroyDrawable(g.allDraws[i], "sprite")
        }
        for (let i = 0; i < g.allSkins.length; i++) {
            rt.renderer.destroySkin(g.allSkins[i])
        }
        rt.renderer.dirty = true
        if (rt.requestRedraw) rt.requestRedraw()
    }

    function birdgoflap() {
        let g = flappybirdthing
        if (!g || !birdcache) return
        if (g.state == "ready") {
            g.state = "play"
            g.vy = 6.5
            playbirdsnd(birdcache.sfx.wing)
        } else if (g.state == "play") {
            g.vy = 6.5
            playbirdsnd(birdcache.sfx.wing)
        } else if (g.state == "dead") {
            if (Date.now() - g.deadAt > 380) {
                playbirdsnd(birdcache.sfx.swoosh)
                g.state = "ready"
                g.score = 0
                g.by = 25
                g.vy = 0
                g.dir = 90
                for (let i = 0; i < g.pipes.length; i++) {
                    g.pipes[i].x = 290 + i * 185
                    g.pipes[i].y = -35 + Math.random() * 120
                    g.pipes[i].p = false
                }
            }
        }
    }

    function setupbirdinputs() {
        if (!keythingadded) {
            keythingadded = true
            window.addEventListener("keydown", function(e) {
                if (!flappybirdthing) return
                let tg = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : ""
                if (tg == "input" || tg == "textarea" || (e.target && e.target.isContentEditable)) return
                if (e.code == "Space" || e.key == " " || e.code == "ArrowUp" || e.key == "w" || e.key == "W") {
                    e.preventDefault()
                    if (!e.repeat) birdgoflap()
                }
            })
        }
        if (rt && rt.renderer && rt.renderer.canvas && canvasthing !== rt.renderer.canvas) {
            canvasthing = rt.renderer.canvas
            canvasthing.addEventListener("pointerdown", function() {
                if (!flappybirdthing) return
                birdgoflap()
            })
        }
    }

    function spawnflappy() {
        if (!rt || !rt.renderer || !birdcache) return
        byebird()
        setupbirdinputs()

        const ren = rt.renderer
        let allSkins = []
        let allDraws = []

        function mksk(pic) {
            let sid = ren.createBitmapSkin(pic.d, 1, [pic.w / 2, pic.h / 2])
            allSkins.push(sid)
            return sid
        }
        function mkdr(sid) {
            let did = ren.createDrawable("sprite")
            ren.updateDrawableSkinId(did, sid)
            allDraws.push(did)
            return did
        }

        let skBg = mksk(birdcache.bg)
        let skBase = mksk(birdcache.base)
        let skPTop = mksk(birdcache.ptop)
        let skPBot = mksk(birdcache.pbot)
        let skBird = [mksk(birdcache.b0), mksk(birdcache.b1), mksk(birdcache.b2)]
        let skMsg = mksk(birdcache.msg)
        let skGo = mksk(birdcache.go)
        let skNums = []
        for (let i = 0; i < 10; i++) skNums.push(mksk(birdcache.nums[i]))

        let bg1 = mkdr(skBg)
        let bg2 = mkdr(skBg)
        ren.updateDrawableProperties(bg1, { position: [-120, 20], scale: [85, 85], direction: 90, visible: true })
        ren.updateDrawableProperties(bg2, { position: [120, 20], scale: [85, 85], direction: 90, visible: true })

        let pipes = []
        for (let i = 0; i < 3; i++) {
            pipes.push({
                top: mkdr(skPTop),
                bot: mkdr(skPBot),
                x: 290 + i * 185,
                y: -35 + Math.random() * 120,
                p: false
            })
        }

        let grounds = [mkdr(skBase), mkdr(skBase), mkdr(skBase)]
        let bird = mkdr(skBird[1])
        let msg = mkdr(skMsg)
        let go = mkdr(skGo)
        let digs = [mkdr(skNums[0]), mkdr(skNums[0]), mkdr(skNums[0]), mkdr(skNums[0])]

        flappybirdthing = {
            allSkins: allSkins,
            allDraws: allDraws,
            skBird: skBird,
            skNums: skNums,
            pipes: pipes,
            grounds: grounds,
            bird: bird,
            msg: msg,
            go: go,
            digs: digs,
            bw: birdcache.base.w,
            ph: birdcache.pbot.h,
            state: "ready",
            score: 0,
            by: 25,
            vy: 0,
            dir: 90,
            anim: 1,
            t: 0,
            gscroll: 0,
            deadAt: 0,
            last: Date.now()
        }

        stepbird()
    }

    function stepbird() {
        let g = flappybirdthing
        if (!g || !rt || !rt.renderer || !birdcache) return
        const ren = rt.renderer

        let now = Date.now()
        let dt = (now - g.last) / 1000
        g.last = now
        if (dt <= 0 || dt > 0.1) dt = 1 / 60
        let st = dt * 60
        g.t += st

        if (g.state == "ready") {
            g.gscroll = (g.gscroll + 2.2 * st) % g.bw
            g.by = 25 + Math.sin(g.t * 0.12) * 5
            g.dir = 90
            g.anim = Math.floor(g.t / 7) % 4
        } else if (g.state == "play") {
            g.gscroll = (g.gscroll + 2.2 * st) % g.bw
            g.vy -= 0.37 * st
            if (g.vy < -9.5) g.vy = -9.5
            g.by += g.vy * st
            if (g.by > 172) {
                g.by = 172
                if (g.vy > 0) g.vy = 0
            }
            if (g.vy > 0) {
                g.dir = 65
            } else {
                g.dir = Math.min(180, 65 + (-g.vy / 9) * 115)
            }
            g.anim = g.vy < -4 ? 1 : (Math.floor(g.t / 5) % 4)

            for (let i = 0; i < g.pipes.length; i++) {
                let p = g.pipes[i]
                p.x -= 2.2 * st
                if (!p.p && p.x < -70) {
                    p.p = true
                    g.score++
                    playbirdsnd(birdcache.sfx.point)
                }
                if (Math.abs(-70 - p.x) < 35 && (g.by + 9 > p.y + 49 || g.by - 9 < p.y - 49)) {
                    g.state = "dying"
                    g.vy = 0
                    playbirdsnd(birdcache.sfx.hit)
                    let ref = g
                    setTimeout(function() {
                        if (flappybirdthing === ref) playbirdsnd(birdcache.sfx.die)
                    }, 160)
                }
            }
            for (let i = 0; i < g.pipes.length; i++) {
                let p = g.pipes[i]
                if (p.x < -275) {
                    let mx = Math.max(g.pipes[0].x, g.pipes[1].x, g.pipes[2].x)
                    p.x = mx + 185
                    p.y = -35 + Math.random() * 120
                    p.p = false
                }
            }
            if (g.by <= -119) {
                g.by = -119
                g.dir = 180
                g.state = "dead"
                g.deadAt = now
                playbirdsnd(birdcache.sfx.hit)
            }
        } else if (g.state == "dying") {
            g.vy -= 0.45 * st
            g.by += g.vy * st
            g.dir = Math.min(180, g.dir + 8 * st)
            g.anim = 1
            if (g.by <= -119) {
                g.by = -119
                g.dir = 180
                g.state = "dead"
                g.deadAt = now
            }
        }

        for (let i = 0; i < g.pipes.length; i++) {
            let p = g.pipes[i]
            ren.updateDrawableProperties(p.top, {
                position: [p.x, p.y + 49 + g.ph / 2],
                scale: [100, 100],
                direction: 90,
                visible: true
            })
            ren.updateDrawableProperties(p.bot, {
                position: [p.x, p.y - 49 - g.ph / 2],
                scale: [100, 100],
                direction: 90,
                visible: true
            })
        }

        for (let i = 0; i < g.grounds.length; i++) {
            let gx = -240 + g.bw / 2 - g.gscroll + i * g.bw
            ren.updateDrawableProperties(g.grounds[i], {
                position: [gx, -186],
                scale: [100, 100],
                direction: 90,
                visible: true
            })
        }

        let seq = [0, 1, 2, 1]
        ren.updateDrawableSkinId(g.bird, g.skBird[seq[g.anim % 4]])
        ren.updateDrawableProperties(g.bird, {
            position: [-70, g.by],
            scale: [100, 100],
            direction: g.dir,
            visible: true
        })

        ren.updateDrawableProperties(g.msg, {
            position: [0, 24],
            scale: [82, 82],
            direction: 90,
            visible: g.state == "ready"
        })
        ren.updateDrawableProperties(g.go, {
            position: [0, 52],
            scale: [100, 100],
            direction: 90,
            visible: g.state == "dead"
        })

        let sstr = "" + g.score
        if (sstr.length > 4) sstr = sstr.substring(0, 4)
        let tw = 0
        for (let i = 0; i < sstr.length; i++) {
            let idx = sstr.charCodeAt(i) - 48
            if (idx < 0 || idx > 9) idx = 0
            tw += birdcache.nums[idx].w + 2
        }
        let sx = -tw / 2
        for (let i = 0; i < g.digs.length; i++) {
            if (g.state != "ready" && i < sstr.length) {
                let idx = sstr.charCodeAt(i) - 48
                if (idx < 0 || idx > 9) idx = 0
                let dw = birdcache.nums[idx].w
                ren.updateDrawableSkinId(g.digs[i], g.skNums[idx])
                ren.updateDrawableProperties(g.digs[i], {
                    position: [sx + dw / 2, 136],
                    scale: [95, 95],
                    direction: 90,
                    visible: true
                })
                sx += dw + 2
            } else {
                ren.updateDrawableProperties(g.digs[i], {
                    position: [0, 136],
                    scale: [95, 95],
                    direction: 90,
                    visible: false
                })
            }
        }

        ren.dirty = true
        if (rt.requestRedraw) rt.requestRedraw()
    }

    if (rt && rt.on) {
        rt.on("AFTER_EXECUTE", () => {
            wowowowoowowowowo++
            aaaaaaaaa = 0

            if (flappybirdthing) {
                stepbird()
            }

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
            byebird()
            for (var i = 0; i < text.length; i++) bye(text[i])
            for (var j = 0; j < text2.length; j++) bye(text2[j])
            text = []
            text2 = []
            awesomefreakingvariabvle = false
        })

        rt.on("PROJECT_STOP_ALL", function() {
            byebird()
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
                    },
                    {
                        opcode: 'flappy',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'flappy bird'
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

        flappy() {
            if (!rt || !rt.renderer) return
            return getthebirdstuff().then(function() {
                spawnflappy()
            }).catch(function() {})
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
