const simulate = true
const useKlipper = false

let serialPortID
let baudRate

if (simulate === true) {
  serialPortID = '/tmp/printer-tegh-simulation'
  baudRate = 250000
} else if (useKlipper) {
  // Klipper (requires the klipper host software to be running)
  serialPortID = '/tmp/printer'
  baudRate = 250000
} else {
  // Marlin
  serialPortID = '/dev/serial/by-id/usb-Arduino__www.arduino.cc__Arduino_Mega_2560_749373037363518101E2-if00'
  baudRate = 250000
}

const printerConfig = {
  id: 'aaxcvxcvcxv-bvb-csdf234231',
  components: [
    {
      // Controller must be the first component for driver test mocks
      id: 'bbbserialController',
      modelVersion: 1,
      type: 'CONTROLLER',
      model: {
        interface: 'SERIAL',
        name: 'RAMPS Controller Board',
        serialPortID,
        baudRate,
        simulate,
        delayFromGreetingToReady: 2500,
        temperaturePollingInterval: 1000,
        responseTimeoutTickleAttempts: 3,
        fastCodeTimeout: 30000,
        longRunningCodeTimeout: 60000,
        awaitGreetingFromFirmware: useKlipper === false,
        longRunningCodes: [
          'G4',
          'G28',
          'G29',
          'G30',
          'G32',
          'M226',
          'M400',
          'M600',
        ],
      },
    },
    // {
    //   "id": "aaabxzz",
    //   "modelVersion": 1,
    //   "type": "KINEMATICS",
    //   "subType": "CARTESIAN",
    //   "axeIDs" ['x111', 'y111', 'z111']
    // },
    {
      id: 'x111',
      modelVersion: 1,
      type: 'AXIS',
      model: {
        address: 'x',
        name: 'X',
        feedrate: 150,
      },
    },
    {
      id: 'y111',
      modelVersion: 1,
      type: 'AXIS',
      model: {
        address: 'y',
        name: 'Y',
        feedrate: 150,
      },
    },
    {
      id: 'z111',
      modelVersion: 1,
      type: 'AXIS',
      model: {
        address: 'z',
        name: 'Z',
        feedrate: 4,
      },
    },
    {
      id: 'aaa2qe0',
      modelVersion: 1,
      type: 'TOOLHEAD',
      model: {
        address: 'e0',
        name: 'Extruder 1',
        heater: true,
        feedrate: 3,
        materialID: 'generic/pla',
      },
    },
    {
      id: 'abvwee1',
      modelVersion: 1,
      type: 'TOOLHEAD',
      model: {
        address: 'e1',
        name: 'Extruder 2',
        heater: true,
        feedrate: 3,
        materialID: 'generic/abs',
      },
    },
    {
      id: 'ndrgrwef',
      modelVersion: 1,
      type: 'FAN',
      model: {
        address: 'f0',
        name: 'Hot End Fan',
      },
    },
    {
      id: 'ndrgrwef2',
      modelVersion: 1,
      type: 'FAN',
      model: {
        address: 'f1',
        name: 'Print Fan',
      },
    },
    {
      id: 'bdfbxb',
      modelVersion: 1,
      type: 'BUILD_PLATFORM',
      model: {
        address: 'b',
        name: 'Bed',
        heater: true,
      },
    },
  ],
  plugins: [
    // TODO: move general settings to tegh-core plugin settings
    {
      id: 'asgbvas23',
      modelVersion: 1,
      package: 'tegh-core',
      model: {
        modelID: 'lulzbot/lulzbot-mini-2',
        name: 'Left Home Lulzbot',
      },
    },
    {
      id: 'aaabbbccc333',
      modelVersion: 1,
      package: 'tegh-driver-serial-gcode',
    },
    {
      id: 'aaabbbccc123',
      modelVersion: 1,
      package: 'tegh-macros-default',
      model: {
        macros: [
          '*',
        ],
      },
    },
  ],
}

const hostConfig = {
  id: 'pzxcvkkwn',
  name: 'ExampleLabs FabLab',
  configDirectory: '~/.tegh/',
  log: {
    id: 'lolcatz95',
    modelVersion: 1,
    maxLength: 1000,
    stderr: [
      'info',
      'warning',
      'error',
      'fatal',
    ],
  },
  crashReports: {
    id: 'bfdbdffeews',
    modelVersion: 1,
    directory: '/var/log/tegh',
    uploadCrashReportsToDevs: true,
  },
  server: {
    id: 'vcxbksdkewj',
    modelVersion: 1,
    signallingServer: 'ws://localhost:3000',
    keys: '~/.tegh/dev.development.keys.json',
    webRTC: true,
    tcpPort: 3901,
  },
}

const materials = [
  {
    id: 'generic/pla',
    type: 'FDM_FILAMENT',
    targetExtruderTemperature: 220,
    targetBedTemperature: 60,
  },
  {
    id: 'generic/abs',
    type: 'FDM_FILAMENT',
    targetExtruderTemperature: 200,
    targetBedTemperature: 60,
  },
]

const config = {
  printer: printerConfig,
  host: hostConfig,
  materials,
}

module.exports = config
