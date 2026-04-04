module.exports = {
  testRunner: {
    args: { config: 'e2e/jest.config.js', testTimeout: 120000 },
    jest: { setupTimeout: 120000 }
  },
  apps: {
    'ios.debug': { type: 'ios.app', binaryPath: 'ios/build/debug/linkbeet.app', build: 'xcodebuild' },
    'android.debug': { type: 'android.apk', binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk' }
  },
  devices: {
    simulator: { type: 'ios.simulator', device: { type: 'iPhone 15' } },
    emulator: { type: 'android.emulator', device: { avdName: 'Pixel_6_API_33' } }
  },
  configurations: {
    'ios.sim.debug': { device: 'simulator', app: 'ios.debug' },
    'android.emu.debug': { device: 'emulator', app: 'android.debug' }
  }
}
