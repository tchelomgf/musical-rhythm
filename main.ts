input.onButtonPressed(Button.B, function () {
    max = 0
    pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
    strip.clear()
    pins.digitalWritePin(DigitalPin.P2, 0)
    strip.show()
})
let num = 0
let mic = 0
let micold = 0
let max = 0
let strip: neopixel.Strip = null
let temp = 0
pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
pins.setPull(DigitalPin.P1, PinPullMode.PullNone)
strip = neopixel.create(DigitalPin.P2, 24, NeoPixelMode.RGB)
strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Blue))
strip.setBrightness(50)
strip.show()
loops.everyInterval(1000, function () {
    if (max > 0) {
        max = max - 1
    }
})
basic.forever(function () {
    led.plotBarGraph(
    pins.analogReadPin(AnalogPin.P1),
    400
    )
})
basic.forever(function () {
    pins.analogSetPitchPin(AnalogPin.P1)
    pins.analogPitch(1000, 0)
    micold = mic
    mic = Math.map(pins.analogReadPin(AnalogPin.P1), 0, 128, 0, 24)
    // filter
    if (micold < 2 && mic > 12 && mic < 14) {
        mic = 0
    }
    strip.clear()
    while (num < mic && num < 23) {
        strip.setPixelColor(num, neopixel.colors(NeoPixelColors.Blue))
        strip.setBrightness(50)
        strip.show()
        num = num + 1
    }
    if (max < num) {
        max = num
        if (max > 23) {
            max = 23
        }
    }
    strip.setPixelColor(max, neopixel.colors(NeoPixelColors.Red))
    strip.show()
    num = 0
    basic.pause(100)
})
