{
  "targets": [
    {
      "target_name": "xmptoolkit_nan_addon",
      "sources": [ "xmptoolkit_nan.cpp" ], 
      "include_dirs" : [
        "<!(node -e \"require('nan')\")",
        "include"
      ],
       "libraries": [
        "\"..\libraries\windows_x64\Release\XMPCoreStatic.lib\"",
        "\"..\libraries\windows_x64\Release\XMPFilesStatic.lib\""
      ],
      "configurations": {
            "Debug": {
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
}