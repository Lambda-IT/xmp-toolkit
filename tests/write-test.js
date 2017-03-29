const test = require('tape');
const path = require('path');
const fs = require('fs-extra')
const xmptoolkit = require('../build/Release/xmptoolkit_nan_addon');

test('read rdf test', function (t) {
    const testfile = path.join(__dirname, './testfiles/Keller_Daniel_003_13_18cm.png');
    const targetFile = path.join(__dirname, './testoutput/Keller_Daniel_003_13_18cm_write_changed.png');

    const testRdfXml = `<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF
   xmlns:ns1="http://ns.adobe.com/camera-raw-settings/1.0/"
   xmlns:ns10="http://ns.adobe.com/photoshop/1.0/"
   xmlns:ns2="http://purl.org/dc/elements/1.1/"
   xmlns:ns3="http://ns.adobe.com/xap/1.0/"
   xmlns:ns4="http://www.mediathek.admin.ch/zem/"
   xmlns:ns5="http://ns.adobe.com/xap/1.0/mm/"
   xmlns:ns6="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#"
   xmlns:ns7="http://ns.adobe.com/exif/1.0/aux/"
   xmlns:ns8="http://ns.adobe.com/xap/1.0/sType/ResourceRef#"
   xmlns:ns9="http://digame.born.ch/"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
>
  <rdf:Description rdf:about="file:///app/">
    <ns1:SaturationAdjustmentYellow>0</ns1:SaturationAdjustmentYellow>
    <ns1:DefringePurpleAmount>0</ns1:DefringePurpleAmount>
    <ns1:PerspectiveUpright>0</ns1:PerspectiveUpright>
    <ns5:DocumentID>xmp.did:079c9694-c04f-4cf1-99ed-d71b5c54ada7</ns5:DocumentID>
    <ns1:ColorNoiseReductionSmoothness>50</ns1:ColorNoiseReductionSmoothness>
    <ns7:ApproximateFocusDistance>150/10</ns7:ApproximateFocusDistance>
    <ns1:HueAdjustmentAqua>0</ns1:HueAdjustmentAqua>
    <ns1:Saturation>+32</ns1:Saturation>
    <ns1:AutoWhiteVersion>134348800</ns1:AutoWhiteVersion>
    <ns1:LuminanceAdjustmentRed>0</ns1:LuminanceAdjustmentRed>
    <ns1:Version>9.7</ns1:Version>
    <ns5:OriginalDocumentID>7C5E9F787695AF23E911EE99779FF80D</ns5:OriginalDocumentID>
    <ns1:AutoLateralCA>1</ns1:AutoLateralCA>
    <ns1:ToneCurveRed rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b7"/>
    <ns9:AssetId>114984</ns9:AssetId>
    <ns1:SharpenRadius>+1.0</ns1:SharpenRadius>
    <ns1:HueAdjustmentYellow>0</ns1:HueAdjustmentYellow>
    <ns1:Dehaze>0</ns1:Dehaze>
    <ns1:LuminanceSmoothing>0</ns1:LuminanceSmoothing>
    <ns1:UprightFourSegmentsCount>0</ns1:UprightFourSegmentsCount>
    <ns1:HueAdjustmentBlue>0</ns1:HueAdjustmentBlue>
    <ns1:LuminanceAdjustmentOrange>0</ns1:LuminanceAdjustmentOrange>
    <ns1:ColorNoiseReductionDetail>50</ns1:ColorNoiseReductionDetail>
    <ns3:CreateDate>2016-10-21T16:10:57.12</ns3:CreateDate>
    <ns1:SplitToningBalance>0</ns1:SplitToningBalance>
    <ns1:RedSaturation>0</ns1:RedSaturation>
    <ns1:Shadows2012>+63</ns1:Shadows2012>
    <ns1:PostCropVignetteAmount>0</ns1:PostCropVignetteAmount>
    <ns1:WhiteBalance>As Shot</ns1:WhiteBalance>
    <ns4:Produktions-Nr>6565</ns4:Produktions-Nr>
    <ns1:ParametricShadows>0</ns1:ParametricShadows>
    <ns1:HueAdjustmentGreen>0</ns1:HueAdjustmentGreen>
    <ns4:Produziert>2016-10-22</ns4:Produziert>
    <ns1:SaturationAdjustmentBlue>0</ns1:SaturationAdjustmentBlue>
    <ns5:InstanceID>xmp.iid:079c9694-c04f-4cf1-99ed-d71b5c54ada7</ns5:InstanceID>
    <ns1:ParametricMidtoneSplit>50</ns1:ParametricMidtoneSplit>
    <ns1:UprightFocalMode>0</ns1:UprightFocalMode>
    <ns1:DefringeGreenHueLo>40</ns1:DefringeGreenHueLo>
    <ns1:Vibrance>+30</ns1:Vibrance>
    <ns1:ToneCurveName>Linear</ns1:ToneCurveName>
    <ns2:description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b3"/>
    <ns1:ParametricHighlights>0</ns1:ParametricHighlights>
    <ns1:SaturationAdjustmentMagenta>0</ns1:SaturationAdjustmentMagenta>
    <ns1:ShadowTint>0</ns1:ShadowTint>
    <ns1:ParametricShadowSplit>25</ns1:ParametricShadowSplit>
    <ns1:ToneCurvePV2012Red rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b8"/>
    <ns4:Status>accepted</ns4:Status>
    <ns2:rights rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b2"/>
    <ns1:PerspectiveRotate>0.0</ns1:PerspectiveRotate>
    <ns4:Produzent>VBS/DDPS - ZEM</ns4:Produzent>
    <ns1:LensProfileEnable>0</ns1:LensProfileEnable>
    <ns7:Lens>70.0-200.0 mm f/2.8</ns7:Lens>
    <ns1:SharpenEdgeMasking>39</ns1:SharpenEdgeMasking>
    <ns1:Contrast2012>+10</ns1:Contrast2012>
    <ns1:UprightTransformCount>6</ns1:UprightTransformCount>
    <ns1:RedHue>0</ns1:RedHue>
    <ns1:DefringePurpleHueHi>70</ns1:DefringePurpleHueHi>
    <ns1:SharpenDetail>25</ns1:SharpenDetail>
    <ns1:HueAdjustmentMagenta>0</ns1:HueAdjustmentMagenta>
    <ns1:VignetteAmount>0</ns1:VignetteAmount>
    <ns9:Filename>6565_240.jpg</ns9:Filename>
    <ns1:HasSettings>True</ns1:HasSettings>
    <ns1:ColorNoiseReduction>25</ns1:ColorNoiseReduction>
    <ns1:DefringeGreenHueHi>60</ns1:DefringeGreenHueHi>
    <ns1:PerspectiveScale>100</ns1:PerspectiveScale>
    <ns2:format>image/jpeg</ns2:format>
    <ns1:ToneCurveGreen rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b12"/>
    <ns3:ModifyDate>2016-10-26T11:07:07+02:00</ns3:ModifyDate>
    <ns1:UprightCenterNormY>0.5</ns1:UprightCenterNormY>
    <ns1:ToneMapStrength>0</ns1:ToneMapStrength>
    <ns1:LuminanceAdjustmentYellow>0</ns1:LuminanceAdjustmentYellow>
    <ns1:ToneCurvePV2012Blue rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b10"/>
    <ns4:Auftraggeber>Heer</ns4:Auftraggeber>
    <ns2:creator rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b4"/>
    <ns1:CameraProfile>Adobe Standard</ns1:CameraProfile>
    <ns1:GreenHue>0</ns1:GreenHue>
    <ns1:BlueHue>0</ns1:BlueHue>
    <ns1:PerspectiveY>0.00</ns1:PerspectiveY>
    <ns1:PerspectiveX>0.00</ns1:PerspectiveX>
    <ns1:Temperature>5100</ns1:Temperature>
    <ns1:ParametricLights>0</ns1:ParametricLights>
    <ns1:GreenSaturation>0</ns1:GreenSaturation>
    <ns1:PerspectiveVertical>0</ns1:PerspectiveVertical>
    <ns1:HueAdjustmentRed>0</ns1:HueAdjustmentRed>
    <ns1:ProcessVersion>6.7</ns1:ProcessVersion>
    <ns1:SplitToningShadowSaturation>0</ns1:SplitToningShadowSaturation>
    <ns1:UprightVersion>151388160</ns1:UprightVersion>
    <ns1:ParametricDarks>0</ns1:ParametricDarks>
    <ns1:UprightCenterNormX>0.5</ns1:UprightCenterNormX>
    <ns1:LuminanceAdjustmentGreen>0</ns1:LuminanceAdjustmentGreen>
    <ns1:Exposure2012>+0.75</ns1:Exposure2012>
    <ns10:DateCreated>2016-10-21T16:10:57.12</ns10:DateCreated>
    <ns1:SaturationAdjustmentAqua>0</ns1:SaturationAdjustmentAqua>
    <ns1:Blacks2012>0</ns1:Blacks2012>
    <ns1:SaturationAdjustmentOrange>0</ns1:SaturationAdjustmentOrange>
    <ns1:GrainAmount>0</ns1:GrainAmount>
    <ns1:LuminanceAdjustmentMagenta>0</ns1:LuminanceAdjustmentMagenta>
    <ns1:ToneCurveBlue rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b13"/>
    <ns1:LensProfileSetup>LensDefaults</ns1:LensProfileSetup>
    <ns1:BlueSaturation>0</ns1:BlueSaturation>
    <ns4:Medientyp_Format>Querformat</ns4:Medientyp_Format>
    <ns1:PerspectiveAspect>0</ns1:PerspectiveAspect>
    <ns1:ToneCurve rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b14"/>
    <ns4:AssetType>PIC</ns4:AssetType>
    <ns1:ParametricHighlightSplit>75</ns1:ParametricHighlightSplit>
    <ns3:MetadataDate>2016-10-26T11:07:07+02:00</ns3:MetadataDate>
    <ns1:LuminanceAdjustmentPurple>0</ns1:LuminanceAdjustmentPurple>
    <ns1:UprightFocalLength35mm>35</ns1:UprightFocalLength35mm>
    <ns1:ToneCurveName2012>Linear</ns1:ToneCurveName2012>
    <ns1:ToneCurvePV2012Green rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b9"/>
    <ns3:CreatorTool>Adobe Photoshop Lightroom 6.7 (Macintosh)</ns3:CreatorTool>
    <ns1:LensManualDistortionAmount>0</ns1:LensManualDistortionAmount>
    <ns1:SplitToningHighlightHue>0</ns1:SplitToningHighlightHue>
    <ns5:History rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b5"/>
    <ns1:SaturationAdjustmentPurple>0</ns1:SaturationAdjustmentPurple>
    <ns1:Clarity2012>+50</ns1:Clarity2012>
    <ns1:Tint>-2</ns1:Tint>
    <ns1:UprightCenterMode>0</ns1:UprightCenterMode>
    <ns7:ImageNumber>7854</ns7:ImageNumber>
    <ns1:PerspectiveHorizontal>0</ns1:PerspectiveHorizontal>
    <ns4:Medientraeger>Digital</ns4:Medientraeger>
    <ns1:ConvertToGrayscale>False</ns1:ConvertToGrayscale>
    <ns1:HasCrop>False</ns1:HasCrop>
    <ns1:ToneCurvePV2012 rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b11"/>
    <ns7:LensInfo>700/10 2000/10 28/10 28/10</ns7:LensInfo>
    <ns1:LuminanceAdjustmentBlue>0</ns1:LuminanceAdjustmentBlue>
    <ns7:LensID>162</ns7:LensID>
    <ns1:DefringeGreenAmount>0</ns1:DefringeGreenAmount>
    <ns1:Whites2012>0</ns1:Whites2012>
    <ns4:Nutzung>freie Nutzung</ns4:Nutzung>
    <ns1:SaturationAdjustmentRed>0</ns1:SaturationAdjustmentRed>
    <ns1:HueAdjustmentPurple>0</ns1:HueAdjustmentPurple>
    <ns2:title rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b1"/>
    <ns1:HueAdjustmentOrange>0</ns1:HueAdjustmentOrange>
    <ns4:Publiziert>2016-11-11</ns4:Publiziert>
    <ns7:SerialNumber>6043966</ns7:SerialNumber>
    <ns1:UprightPreview>False</ns1:UprightPreview>
    <ns1:LuminanceAdjustmentAqua>0</ns1:LuminanceAdjustmentAqua>
    <ns1:SaturationAdjustmentGreen>0</ns1:SaturationAdjustmentGreen>
    <ns1:Highlights2012>-54</ns1:Highlights2012>
    <ns5:DerivedFrom rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b6"/>
    <ns1:DefringePurpleHueLo>30</ns1:DefringePurpleHueLo>
    <ns1:AlreadyApplied>True</ns1:AlreadyApplied>
    <ns1:SplitToningHighlightSaturation>0</ns1:SplitToningHighlightSaturation>
    <ns1:Sharpness>81</ns1:Sharpness>
    <ns1:SplitToningShadowHue>0</ns1:SplitToningShadowHue>
  </rdf:Description>
  <rdf:Description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b7">
    <rdf:_1>0, 0</rdf:_1>
    <rdf:type rdf:resource="http://www.w3.org/1999/02/22-rdf-syntax-ns#Seq"/>
    <rdf:_2>255, 255</rdf:_2>
  </rdf:Description>
  <rdf:Description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b4">
    <rdf:_1>Alexander Kühni / Thomas Gerber</rdf:_1>
    <rdf:type rdf:resource="http://www.w3.org/1999/02/22-rdf-syntax-ns#Seq"/>
  </rdf:Description>
  <rdf:Description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b16">
    <ns6:action>saved</ns6:action>
    <ns6:changed>/</ns6:changed>
    <ns6:when>2016-10-26T11:07:07+02:00</ns6:when>
    <ns6:instanceID>xmp.iid:079c9694-c04f-4cf1-99ed-d71b5c54ada7</ns6:instanceID>
    <ns6:softwareAgent>Adobe Photoshop Lightroom 6.7 (Macintosh)</ns6:softwareAgent>
  </rdf:Description>
  <rdf:Description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b9">
    <rdf:_2>255, 255</rdf:_2>
    <rdf:type rdf:resource="http://www.w3.org/1999/02/22-rdf-syntax-ns#Seq"/>
    <rdf:_1>0, 0</rdf:_1>
  </rdf:Description>
  <rdf:Description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b14">
    <rdf:_1>0, 0</rdf:_1>
    <rdf:type rdf:resource="http://www.w3.org/1999/02/22-rdf-syntax-ns#Seq"/>
    <rdf:_2>255, 255</rdf:_2>
  </rdf:Description>
  <rdf:Description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b11">
    <rdf:type rdf:resource="http://www.w3.org/1999/02/22-rdf-syntax-ns#Seq"/>
    <rdf:_2>255, 255</rdf:_2>
    <rdf:_1>0, 0</rdf:_1>
  </rdf:Description>
  <rdf:Description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b10">
    <rdf:_1>0, 0</rdf:_1>
    <rdf:type rdf:resource="http://www.w3.org/1999/02/22-rdf-syntax-ns#Seq"/>
    <rdf:_2>255, 255</rdf:_2>
  </rdf:Description>
  <rdf:Description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b8">
    <rdf:_2>255, 255</rdf:_2>
    <rdf:type rdf:resource="http://www.w3.org/1999/02/22-rdf-syntax-ns#Seq"/>
    <rdf:_1>0, 0</rdf:_1>
  </rdf:Description>
  <rdf:Description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b3">
    <rdf:type rdf:resource="http://www.w3.org/1999/02/22-rdf-syntax-ns#Alt"/>
    <rdf:_1>Dies ist ein Test@de</rdf:_1>
  </rdf:Description>
  <rdf:Description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b1">
    <rdf:_1 xml:lang="de">Panzer 87 Leopard (Pz 87 Leo) in Fahrt</rdf:_1>
    <rdf:type rdf:resource="http://www.w3.org/1999/02/22-rdf-syntax-ns#Alt"/>
  </rdf:Description>
  <rdf:Description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b15">
    <ns6:parameters>converted from image/x-nikon-nef to image/jpeg, saved to new location</ns6:parameters>
    <ns6:action>derived</ns6:action>
  </rdf:Description>
  <rdf:Description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b13">
    <rdf:_2>255, 255</rdf:_2>
    <rdf:_1>0, 0</rdf:_1>
    <rdf:type rdf:resource="http://www.w3.org/1999/02/22-rdf-syntax-ns#Seq"/>
  </rdf:Description>
  <rdf:Description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b5">
    <rdf:_2 rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b16"/>
    <rdf:_1 rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b15"/>
    <rdf:type rdf:resource="http://www.w3.org/1999/02/22-rdf-syntax-ns#Seq"/>
  </rdf:Description>
  <rdf:Description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b6">
    <ns8:documentID>7C5E9F787695AF23E911EE99779FF80D</ns8:documentID>
    <ns8:originalDocumentID>7C5E9F787695AF23E911EE99779FF80D</ns8:originalDocumentID>
  </rdf:Description>
  <rdf:Description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b2">
    <rdf:_1 xml:lang="de">VBS/DDPS - ZEM</rdf:_1>
    <rdf:type rdf:resource="http://www.w3.org/1999/02/22-rdf-syntax-ns#Alt"/>
  </rdf:Description>
  <rdf:Description rdf:nodeID="f0e1b1a2944044f359cc65ab964f7c259b12">
    <rdf:_1>0, 0</rdf:_1>
    <rdf:type rdf:resource="http://www.w3.org/1999/02/22-rdf-syntax-ns#Seq"/>
    <rdf:_2>255, 255</rdf:_2>
  </rdf:Description>
</rdf:RDF>
`;

const testRdfXml2 = `<rdf:RDF
  xmlns:ns1="http://ns.adobe.com/camera-raw-settings/1.0/"
  xmlns:ns7="http://ns.adobe.com/exif/1.0/aux/"
  xmlns:ns5="http://ns.adobe.com/xap/1.0/mm/"
  xmlns:ns4="http://www.mediathek.admin.ch/zem/"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:ns6="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#"
  xmlns:xmp="http://ns.adobe.com/xap/1.0/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:ns9="http://digame.born.ch/"
  xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"
  xmlns:ns8="http://ns.adobe.com/xap/1.0/sType/ResourceRef#"
>
    <rdf:Description rdf:about="file:///app/">
        <ns1:ToneCurve>
            <rdf:Seq rdf:nodeID="ub1bL105C19">
                <rdf:_1>0, 0</rdf:_1>
                <rdf:_2>255, 255</rdf:_2>
            </rdf:Seq>
        </ns1:ToneCurve>
        <photoshop:DateCreated>2016-10-21T16:10:57.12</photoshop:DateCreated>
        <ns1:UprightTransformCount>6</ns1:UprightTransformCount>
        <ns1:UprightCenterNormX>0.5</ns1:UprightCenterNormX>
        <ns7:ImageNumber>7854</ns7:ImageNumber>
        <ns1:ToneCurveName2012>Linear</ns1:ToneCurveName2012>
        <ns1:BlueHue>0</ns1:BlueHue>
        <ns1:HasCrop>False</ns1:HasCrop>
        <ns1:Sharpness>81</ns1:Sharpness>
        <ns1:GreenSaturation>0</ns1:GreenSaturation>
        <ns1:LuminanceAdjustmentGreen>0</ns1:LuminanceAdjustmentGreen>
        <ns9:Filename>6565_240.jpg</ns9:Filename>
        <ns1:CameraProfile>Adobe Standard</ns1:CameraProfile>
        <ns1:SharpenRadius>+1.0</ns1:SharpenRadius>
        <ns1:DefringeGreenHueHi>60</ns1:DefringeGreenHueHi>
        <ns1:LuminanceAdjustmentYellow>0</ns1:LuminanceAdjustmentYellow>
        <ns1:Tint>-2</ns1:Tint>
        <ns1:Version>9.7</ns1:Version>
        <ns1:SaturationAdjustmentGreen>0</ns1:SaturationAdjustmentGreen>
        <ns1:HueAdjustmentGreen>0</ns1:HueAdjustmentGreen>
        <ns1:UprightPreview>False</ns1:UprightPreview>
        <ns1:SaturationAdjustmentBlue>0</ns1:SaturationAdjustmentBlue>
        <ns7:LensInfo>700/10 2000/10 28/10 28/10</ns7:LensInfo>
        <ns1:LensProfileEnable>0</ns1:LensProfileEnable>
        <ns1:SplitToningHighlightHue>0</ns1:SplitToningHighlightHue>
        <dc:format>image/jpeg</dc:format>
        <ns4:Medientyp_Format>Querformat</ns4:Medientyp_Format>
        <ns1:SaturationAdjustmentAqua>0</ns1:SaturationAdjustmentAqua>
        <ns1:Whites2012>0</ns1:Whites2012>
        <ns4:Produktions-Nr>6565</ns4:Produktions-Nr>
        <ns1:PerspectiveScale>100</ns1:PerspectiveScale>
        <ns4:Medientraeger>Digital</ns4:Medientraeger>
        <ns1:ColorNoiseReduction>25</ns1:ColorNoiseReduction>
        <ns1:DefringePurpleHueHi>70</ns1:DefringePurpleHueHi>
        <ns1:PerspectiveX>0.00</ns1:PerspectiveX>
        <ns1:HueAdjustmentRed>0</ns1:HueAdjustmentRed>
        <ns1:SaturationAdjustmentRed>0</ns1:SaturationAdjustmentRed>
        <ns1:Shadows2012>+63</ns1:Shadows2012>
        <ns1:LuminanceAdjustmentOrange>0</ns1:LuminanceAdjustmentOrange>
        <ns5:OriginalDocumentID>7C5E9F787695AF23E911EE99779FF80D</ns5:OriginalDocumentID>
        <ns1:Exposure2012>+0.75</ns1:Exposure2012>
        <dc:description>
            <rdf:Alt rdf:nodeID="ub1bL172C20">
                <rdf:_1>Dies ist ein Test@de</rdf:_1>
            </rdf:Alt>
        </dc:description>
        <ns9:AssetId>114984</ns9:AssetId>
        <ns1:SplitToningShadowSaturation>0</ns1:SplitToningShadowSaturation>
        <ns1:Highlights2012>-54</ns1:Highlights2012>
        <ns1:SaturationAdjustmentYellow>0</ns1:SaturationAdjustmentYellow>
        <ns1:Blacks2012>0</ns1:Blacks2012>
        <ns1:ToneCurveName>Linear</ns1:ToneCurveName>
        <ns1:WhiteBalance>As Shot</ns1:WhiteBalance>
        <ns1:Saturation>+32</ns1:Saturation>
        <ns1:SharpenEdgeMasking>39</ns1:SharpenEdgeMasking>
        <ns1:SplitToningBalance>0</ns1:SplitToningBalance>
        <ns1:LuminanceAdjustmentBlue>0</ns1:LuminanceAdjustmentBlue>
        <ns1:UprightFocalMode>0</ns1:UprightFocalMode>
        <xmp:ModifyDate>2016-10-26T11:07:07+02:00</xmp:ModifyDate>
        <xmp:MetadataDate>2016-10-26T11:07:07+02:00</xmp:MetadataDate>
        <ns1:PerspectiveY>0.00</ns1:PerspectiveY>
        <ns1:Vibrance>+30</ns1:Vibrance>
        <ns1:UprightFourSegmentsCount>0</ns1:UprightFourSegmentsCount>
        <ns1:LuminanceAdjustmentPurple>0</ns1:LuminanceAdjustmentPurple>
        <ns1:SaturationAdjustmentOrange>0</ns1:SaturationAdjustmentOrange>
        <ns4:Produzent>VBS/DDPS - ZEM</ns4:Produzent>
        <ns1:PostCropVignetteAmount>0</ns1:PostCropVignetteAmount>
        <ns1:LuminanceAdjustmentRed>0</ns1:LuminanceAdjustmentRed>
        <ns1:AutoWhiteVersion>134348800</ns1:AutoWhiteVersion>
        <ns1:ConvertToGrayscale>False</ns1:ConvertToGrayscale>
        <xmp:CreatorTool>Adobe Photoshop Lightroom 6.7 (Macintosh)</xmp:CreatorTool>
        <ns1:HueAdjustmentBlue>0</ns1:HueAdjustmentBlue>
        <ns1:ParametricShadows>0</ns1:ParametricShadows>
        <ns1:SharpenDetail>25</ns1:SharpenDetail>
        <ns1:ParametricMidtoneSplit>50</ns1:ParametricMidtoneSplit>
        <ns1:Clarity2012>+50</ns1:Clarity2012>
        <ns1:LensProfileSetup>LensDefaults</ns1:LensProfileSetup>
        <ns1:ToneCurvePV2012>
            <rdf:Seq rdf:nodeID="ub1bL116C25">
                <rdf:_2>255, 255</rdf:_2>
                <rdf:_1>0, 0</rdf:_1>
            </rdf:Seq>
        </ns1:ToneCurvePV2012>
        <ns1:ProcessVersion>6.7</ns1:ProcessVersion>
        <ns7:ApproximateFocusDistance>150/10</ns7:ApproximateFocusDistance>
        <ns1:GrainAmount>0</ns1:GrainAmount>
        <ns1:SaturationAdjustmentMagenta>0</ns1:SaturationAdjustmentMagenta>
        <xmp:CreateDate>2016-10-21T16:10:57.12</xmp:CreateDate>
        <ns1:ToneCurvePV2012Blue>
            <rdf:Seq rdf:nodeID="ub1bL119C29">
                <rdf:_1>0, 0</rdf:_1>
                <rdf:_2>255, 255</rdf:_2>
            </rdf:Seq>
        </ns1:ToneCurvePV2012Blue>
        <ns1:Contrast2012>+10</ns1:Contrast2012>
        <ns1:ParametricHighlights>0</ns1:ParametricHighlights>
        <ns1:ParametricLights>0</ns1:ParametricLights>
        <ns1:Dehaze>0</ns1:Dehaze>
        <ns1:SplitToningShadowHue>0</ns1:SplitToningShadowHue>
        <ns1:HueAdjustmentPurple>0</ns1:HueAdjustmentPurple>
        <ns1:ParametricShadowSplit>25</ns1:ParametricShadowSplit>
        <ns4:Publiziert>2016-11-11</ns4:Publiziert>
        <ns1:HueAdjustmentOrange>0</ns1:HueAdjustmentOrange>
        <ns1:Temperature>5100</ns1:Temperature>
        <ns1:HasSettings>True</ns1:HasSettings>
        <dc:rights>
            <rdf:Alt rdf:nodeID="ub1bL175C15">
                <rdf:_1 xml:lang="de">VBS/DDPS - ZEM</rdf:_1>
            </rdf:Alt>
        </dc:rights>
        <ns5:DerivedFrom>
            <rdf:Description rdf:nodeID="ub1bL157C21">
                <ns8:documentID>7C5E9F787695AF23E911EE99779FF80D</ns8:documentID>
                <ns8:originalDocumentID>7C5E9F787695AF23E911EE99779FF80D</ns8:originalDocumentID>
            </rdf:Description>
        </ns5:DerivedFrom>
        <ns1:HueAdjustmentYellow>0</ns1:HueAdjustmentYellow>
        <ns1:HueAdjustmentMagenta>0</ns1:HueAdjustmentMagenta>
        <ns4:Produziert>2016-10-22</ns4:Produziert>
        <ns1:PerspectiveAspect>0</ns1:PerspectiveAspect>
        <ns1:ToneCurvePV2012Red>
            <rdf:Seq rdf:nodeID="ub1bL125C28">
                <rdf:_1>0, 0</rdf:_1>
                <rdf:_2>255, 255</rdf:_2>
            </rdf:Seq>
        </ns1:ToneCurvePV2012Red>
        <ns1:DefringeGreenAmount>0</ns1:DefringeGreenAmount>
        <ns1:HueAdjustmentAqua>0</ns1:HueAdjustmentAqua>
        <ns1:ParametricHighlightSplit>75</ns1:ParametricHighlightSplit>
        <ns1:ToneCurveGreen>
            <rdf:Seq rdf:nodeID="ub1bL111C24">
                <rdf:_1>0, 0</rdf:_1>
                <rdf:_2>255, 255</rdf:_2>
            </rdf:Seq>
        </ns1:ToneCurveGreen>
        <ns1:ToneCurveBlue>
            <rdf:Seq rdf:nodeID="ub1bL108C23">
                <rdf:_1>0, 0</rdf:_1>
                <rdf:_2>255, 255</rdf:_2>
            </rdf:Seq>
        </ns1:ToneCurveBlue>
        <ns1:ToneCurvePV2012Green>
            <rdf:Seq rdf:nodeID="ub1bL122C30">
                <rdf:_1>0, 0</rdf:_1>
                <rdf:_2>255, 255</rdf:_2>
            </rdf:Seq>
        </ns1:ToneCurvePV2012Green>
        <ns1:PerspectiveHorizontal>0</ns1:PerspectiveHorizontal>
        <ns7:SerialNumber>6043966</ns7:SerialNumber>
        <ns4:Status>accepted</ns4:Status>
        <ns1:LuminanceAdjustmentAqua>0</ns1:LuminanceAdjustmentAqua>
        <ns1:DefringePurpleHueLo>30</ns1:DefringePurpleHueLo>
        <ns1:DefringePurpleAmount>0</ns1:DefringePurpleAmount>
        <ns1:BlueSaturation>0</ns1:BlueSaturation>
        <ns5:InstanceID>xmp.iid:079c9694-c04f-4cf1-99ed-d71b5c54ada7</ns5:InstanceID>
        <ns1:LensManualDistortionAmount>0</ns1:LensManualDistortionAmount>
        <ns7:LensID>162</ns7:LensID>
        <ns1:LuminanceSmoothing>0</ns1:LuminanceSmoothing>
        <ns1:UprightFocalLength35mm>35</ns1:UprightFocalLength35mm>
        <ns1:UprightCenterMode>0</ns1:UprightCenterMode>
        <ns1:PerspectiveUpright>0</ns1:PerspectiveUpright>
        <ns1:SplitToningHighlightSaturation>0</ns1:SplitToningHighlightSaturation>
        <ns1:AlreadyApplied>True</ns1:AlreadyApplied>
        <dc:creator>
            <rdf:Seq rdf:nodeID="ub1bL170C16">
                <rdf:_1>Alexander Kühni / Thomas Gerber</rdf:_1>
            </rdf:Seq>
        </dc:creator>
        <ns1:SaturationAdjustmentPurple>0</ns1:SaturationAdjustmentPurple>
        <ns1:UprightVersion>151388160</ns1:UprightVersion>
        <ns1:AutoLateralCA>1</ns1:AutoLateralCA>
        <ns1:PerspectiveVertical>0</ns1:PerspectiveVertical>
        <ns1:ColorNoiseReductionSmoothness>50</ns1:ColorNoiseReductionSmoothness>
        <ns1:ToneMapStrength>0</ns1:ToneMapStrength>
        <dc:title>
            <rdf:Alt rdf:nodeID="ub1bL177C14">
                <rdf:_1 xml:lang="de">Panzer 87 Leopard (Pz 87 Leo) in Fahrt</rdf:_1>
            </rdf:Alt>
        </dc:title>
        <ns7:Lens>70.0-200.0 mm f/2.8</ns7:Lens>
        <ns1:GreenHue>0</ns1:GreenHue>
        <ns4:AssetType>PIC</ns4:AssetType>
        <ns1:ToneCurveRed>
            <rdf:Seq rdf:nodeID="ub1bL128C22">
                <rdf:_1>0, 0</rdf:_1>
                <rdf:_2>255, 255</rdf:_2>
            </rdf:Seq>
        </ns1:ToneCurveRed>
        <ns1:LuminanceAdjustmentMagenta>0</ns1:LuminanceAdjustmentMagenta>
        <ns1:ColorNoiseReductionDetail>50</ns1:ColorNoiseReductionDetail>
        <ns1:UprightCenterNormY>0.5</ns1:UprightCenterNormY>
        <ns4:Nutzung>freie Nutzung</ns4:Nutzung>
        <ns5:DocumentID>xmp.did:079c9694-c04f-4cf1-99ed-d71b5c54ada7</ns5:DocumentID>
        <ns1:ShadowTint>0</ns1:ShadowTint>
        <ns1:ParametricDarks>0</ns1:ParametricDarks>
        <ns1:PerspectiveRotate>0.0</ns1:PerspectiveRotate>
        <ns1:VignetteAmount>0</ns1:VignetteAmount>
        <ns5:History>
            <rdf:Seq rdf:nodeID="ub1bL160C17">
                <rdf:_2>
                    <rdf:Description rdf:nodeID="ub1bL163C20">
                        <ns6:changed>/</ns6:changed>
                        <ns6:softwareAgent>Adobe Photoshop Lightroom 6.7 (Macintosh)</ns6:softwareAgent>
                        <ns6:instanceID>xmp.iid:079c9694-c04f-4cf1-99ed-d71b5c54ada7</ns6:instanceID>
                        <ns6:when>2016-10-26T11:07:07+02:00</ns6:when>
                        <ns6:action>saved</ns6:action>
                    </rdf:Description>
                </rdf:_2>
                <rdf:_1>
                    <rdf:Description rdf:nodeID="ub1bL161C20">
                        <ns6:parameters>converted from image/x-nikon-nef to image/jpeg, saved to new location</ns6:parameters>
                        <ns6:action>derived</ns6:action>
                    </rdf:Description>
                </rdf:_1>
            </rdf:Seq>
        </ns5:History>
        <ns1:DefringeGreenHueLo>40</ns1:DefringeGreenHueLo>
        <ns1:RedSaturation>0</ns1:RedSaturation>
        <ns1:RedHue>0</ns1:RedHue>
        <ns4:Auftraggeber>Heer</ns4:Auftraggeber>
    </rdf:Description>
</rdf:RDF>`

    fs.copy(testfile, targetFile, err => {
        if (err) {
            t.fail('file copy failed');
        }

        xmptoolkit.writeXmp(targetFile, testRdfXml2, function (error, outFilename) {
            if (error) {
                t.fail('xmp read failed');
            } else {
                console.log(outFilename);
            }

            t.pass();

            t.end();
        });
    })
});