input.onButtonPressed(Button.B, function () {
    peak = 0
    maxlevel = 0
    run = false
    pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
    strip.clear()
    pins.digitalWritePin(DigitalPin.P2, 0)
    strip.show()
})
let peakcount = 0
let num = 0
let mic = 0
let minlevel = 0
let level = 0
let run = false
let maxlevel = 0
let peak = 0
let strip: neopixel.Strip = null
let temp = 0
pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
pins.setPull(DigitalPin.P1, PinPullMode.PullNone)
strip = neopixel.create(DigitalPin.P2, 24, NeoPixelMode.RGB)
strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Blue))
strip.setBrightness(50)
strip.show()
basic.forever(function () {
    if (run) {
        level = input.soundLevel()
        if (maxlevel < level) {
            maxlevel = level
        } else if (minlevel > level) {
            minlevel = level
        }
        led.plotBarGraph(
        level,
        maxlevel
        )
        mic = Math.map(level, minlevel, maxlevel, 0, 24)
        strip.clear()
        while (num < mic && num < 23) {
            strip.setPixelColor(num, neopixel.colors(NeoPixelColors.Blue))
            strip.setBrightness(50)
            strip.show()
            num = num + 1
        }
        if (peak < num) {
            peak = num
            peakcount = 20
            if (peak > 23) {
                peak = 23
            }
        }
        strip.setPixelColor(peak, neopixel.colors(NeoPixelColors.Red))
        strip.show()
        num = 0
    }
    basic.pause(100)
})
loops.everyInterval(100, function () {
    if (run) {
        if (peakcount > 0) {
            peakcount = peakcount - 1
        } else {
            if (peak > 0) {
                peak = peak - 1
            }
        }
    } else {
        minlevel = input.soundLevel()
        maxlevel = minlevel + 1
        run = true
    }
})
