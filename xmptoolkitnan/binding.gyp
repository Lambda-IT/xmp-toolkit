{
  "targets": [
    {
      "target_name": "xmptoolkit_nan_addon",
      "sources": [ "xmptoolkit_nan.cpp" ], 
      "include_dirs" : [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}