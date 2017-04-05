{
  "targets": [
    {
      "target_name": "xmptoolkit_nan_addon",
      "sources": ["xmptoolkit_nan.cpp" ], 
      "include_dirs" : [
        "<!(node -e \"require('nan')\")",
        "include"
      ],
      'conditions': [
          ['OS=="linux"', 
            {
                "cflags!": [
                    '-fno-exceptions'
                ],
                'cflags_cc!': [
                    '-fno-exceptions'
                ],
                'libraries': [ 
                    '../libraries/i80386linux_x64/release/staticXMPCore.ar',
                    '../libraries/i80386linux_x64/release/staticXMPFiles.ar',
                ],
                'defines': [
                    'UNIX_ENV=1'
                ],
            }
          ],
          ['OS=="mac"', 
            {
                "xcode_settings": {
                    "OTHER_CPLUSPLUSFLAGS" : [ "-std=c++11", "-stdlib=libc++" ],
                    "OTHER_LDFLAGS": [ 
                        "-stdlib=libc++"
                    ],
                    "MACOSX_DEPLOYMENT_TARGET": "10.12",
                    'GCC_ENABLE_CPP_EXCEPTIONS': 'YES'
                },
                'libraries': [ 
                    '../libraries/macintosh/intel_64/Release/libXMPCoreStatic.a',
                    '../libraries/macintosh/intel_64/Release/libXMPFilesStatic.a',
                ],
                'defines': [
                    'MAC_ENV=1'
                ],
            }
          ],
          ['OS=="win"', 
            {
                'defines': [
                    'WIN_ENV=1'
                ],
                'libraries': [ 
                    "..\libraries\windows_x64\Release\XMPCoreStatic.lib",
                    "..\libraries\windows_x64\Release\XMPFilesStatic.lib"
                ],
                'configurations': {
                    'Debug': {
                        "msvs_settings": {
                            "VCCLCompilerTool": {
                                "RuntimeLibrary": "3" # /MDd 	Debug Multithreaded DLL
                            },
                        },
                    },
                    "Release": {
                        "msvs_settings": {
                            "VCCLCompilerTool": {
                                "RuntimeLibrary": "2" # /MD Multithreaded DLL
                            },
                        },
                    },
                },
            }
         ]
      ]
    }
  ]
}