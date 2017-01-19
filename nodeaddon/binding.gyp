{
  "targets": [
    {
      "target_name": "xmptoolkit",
      "sources": [ "xmptoolkit.cc" ],
      "include_dirs" : [
        "<!(node -e \"require('nan')\")", 
        "../include"
      ],
      "libraries": [
        "C:/dev/repo/xmp-toolkit/nodeaddon/libraries/windows_x64/Release/XMPCoreStatic.lib",
        "C:/dev/repo/xmp-toolkit/nodeaddon/libraries/windows_x64/Release/XMPFilesStatic.lib"
      ]
    }
  ]
}