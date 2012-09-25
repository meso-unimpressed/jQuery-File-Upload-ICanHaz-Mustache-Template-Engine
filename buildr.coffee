# Requires
buildr  = require 'buildr'
util    = require 'util'

# Options
options =
  watch: false
  compress: true

# Configs
configs =
  standard:
    # Options
    name: 'standard'
    watch: options.watch

    # Paths
    srcPath: __dirname+'/scripts/src'

    # Checking
    checkScripts: true
    jshintOptions:
      browser: true
      laxbreak: true
      boss: true
      undef: true
      onevar: true
      strict: true
      noarg: true

    # Compression (without outPath only the generated bundle files are compressed)
    compressScripts: options.compress # Array or true or false
  other: [
    # --------------------------------------------------------------------------------
    # compressed icanhaz-mustache

    {
      # Options
      name: 'icanhaz-mustache'
      watch: options.watch

      # Paths
      srcPath: __dirname+'/scripts/src'

      # Compression (without outPath only the generated bundle files are compressed)
      compressScripts: options.compress # Array or true or false

      # Order
      scriptsOrder: [
        'icanhaz-mustache.js'
      ]

      # Bundling
      bundleScriptPath: __dirname+'/scripts/compressed/icanhaz-mustache.js'

    },
    # --------------------------------------------------------------------------------
    # Compressed and bundled with I18n
    {
      # Options
      name: 'icanhaz-mustache+i18n'
      watch: options.watch

      # Paths
      srcPath: __dirname+'/scripts/src'

      # Compression (without outPath only the generated bundle files are compressed)
      compressScripts: options.compress # Array or true or false

      # Order
      scriptsOrder: [
        'vendor/i18n-js/i18n.js'
        'icanhaz-mustache.js'
      ]

      # Bundling
      bundleScriptPath: __dirname+'/scripts/bundled/icanhaz-mustache+i18n/icanhaz-mustache.i18n.js'
    },
    # --------------------------------------------------------------------------------
    # compressed icanhaz-mustache
    {
      # Options
      name: 'i18n'
      watch: options.watch

      # Paths
      srcPath: __dirname+'/scripts/src'

      # Compression (without outPath only the generated bundle files are compressed)
      compressScripts: options.compress # Array or true or false

      # Order
      scriptsOrder: [
        'vendor/i18n-js/i18n.js'
      ]

      # Bundling
      bundleScriptPath: __dirname+'/scripts/compressed/vendor/i18n-js/i18n.js'
    }
  ]

# Standard
standardConfig = configs.standard
standardConfig.successHandler = ->
  for config in configs.other
    buildrInstance = buildr.createInstance config
    buildrInstance.process()

# Process
standardBuildr = buildr.createInstance configs.standard
standardBuildr.process()