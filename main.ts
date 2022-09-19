input.onButtonPressed(Button.B, function () {
    pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
    strip.clear()
    pins.digitalWritePin(DigitalPin.P2, 0)
    strip.show()
})
let strip: neopixel.Strip = null
pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
pins.setPull(DigitalPin.P1, PinPullMode.PullNone)
let temp = 0
let mic = 0
let num = 0
strip = neopixel.create(DigitalPin.P2, 24, NeoPixelMode.RGB)
strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Blue))
strip.setBrightness(50)
strip.show()
basic.forever(function () {
    pins.analogSetPitchPin(AnalogPin.P1)
    pins.analogPitch(1000, 0)
    mic = Math.map(pins.analogReadPin(AnalogPin.P1), 0, 30, 0, 24)
    while (num < mic) {
        strip.setPixelColor(num, neopixel.colors(NeoPixelColors.Blue))
        strip.setBrightness(50)
        strip.show()
        num = num + 1
    }
    num = 0
    basic.pause(100)
    strip.clear()
})
basic.forever(function () {
    led.plotBarGraph(
    pins.analogReadPin(AnalogPin.P1),
    1023
    )
})
