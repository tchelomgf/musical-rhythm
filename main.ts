input.onButtonPressed(Button.B, function () {
    peak = 0
    maxlevel = 0
    pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
    strip.clear()
    pins.digitalWritePin(DigitalPin.P2, 0)
    strip.show()
})
let num = 0
let mic = 0
let peak = 0
let level = 0
let maxlevel = 0
let strip: neopixel.Strip = null
let temp = 0
pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
pins.setPull(DigitalPin.P1, PinPullMode.PullNone)
strip = neopixel.create(DigitalPin.P2, 24, NeoPixelMode.RGB)
strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Blue))
strip.setBrightness(50)
strip.show()
loops.everyInterval(1000, function () {
    if (peak > 0) {
        peak = peak - 1
    }
})
basic.forever(function () {
    // led.plotBarGraph(pins.analogReadPin(AnalogPin.P1) - offset,400)
    level = input.soundLevel()
    if (level > maxlevel) { maxlevel = level}
    led.plotBarGraph(
    level,
    maxlevel
    )
})
basic.forever(function () {
    pins.analogSetPitchPin(AnalogPin.P1)
    //mic = Math.map(pins.analogReadPin(AnalogPin.P1) - offset, 0, 480, 0, 24)
    mic = Math.map(input.soundLevel(), 0, maxlevel, 0, 24)
    strip.clear()
    while (num < mic && num < 23) {
        strip.setPixelColor(num, neopixel.colors(NeoPixelColors.Blue))
        strip.setBrightness(50)
        strip.show()
        num = num + 1
    }
    if (peak < num) {
        peak = num
        if (peak > 23) {
            peak = 23
        }
    }
    strip.setPixelColor(peak, neopixel.colors(NeoPixelColors.Red))
    strip.show()
    num = 0
    basic.pause(100)
})
