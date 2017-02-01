import sys
import rdflib

from rdflib import Graph, plugin
from rdflib.serializer import Serializer

testrdf = '''
 @prefix dc: <http://purl.org/dc/terms/> .
<http://example.org/about>
dc:title "Marcs's Homepage"@en .
'''

testrdfxml = '''
 <rdf:RDF xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns#'>
		<rdf:Description rdf:about='' xmlns:dc='http://purl.org/dc/elements/1.1/'>
		<dc:subject>
		<rdf:Bag>
		<rdf:li>XMP</rdf:li>
		<rdf:li>SDK</rdf:li>
		<rdf:li>Test2</rdf:li>
		</rdf:Bag>
		</dc:subject>
		<dc:format>image/tiff</dc:format>
		</rdf:Description>
		</rdf:RDF>
'''

testrdfxml2 = '''
    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
    xmlns:_ns="http://www.mediathek.admin.ch/zem/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:xmp="http://ns.adobe.com/xap/1.0/"
    xmlns:aux="http://ns.adobe.com/exif/1.0/aux/"
    xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"
    xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/"
    xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#"
    xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#"
    xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/"
    xmlns:_ns_9="http://digame.born.ch/"
   _ns:AssetType="PIC"
   _ns:Auftraggeber="Höhere Kaderausbildung der Armee (HKA)"
   _ns:Medientraeger="Digital"
   _ns:Medientyp_Format="Hochformat"
   _ns:Nutzung="freie Nutzung"
   _ns:Produktions-Nr="6605"
   _ns:Produzent="VBS/DDPS - ZEM"
   _ns:Produziert="2016-12-19"
   _ns:Publiziert="2016-12-20"
   _ns:Status="accepted"
   dc:format="image/jpeg"
   xmp:CreatorTool="Adobe Photoshop Camera Raw 9.1.1 (Macintosh)"
   xmp:ModifyDate="2016-12-19T15:22:03+01:00"
   xmp:CreateDate="2016-12-19T08:37:39"
   xmp:Rating="5"
   xmp:MetadataDate="2016-12-19T15:22:03+01:00"
   aux:SerialNumber="2077971"
   aux:ImageNumber="63844"
   photoshop:DateCreated="2016-12-19T08:37:39"
   photoshop:LegacyIPTCDigest="C7ABFB75C32B02A071169FB3216D9C69"
   photoshop:ColorMode="3"
   photoshop:ICCProfile="Adobe RGB (1998)"
   xmpMM:DocumentID="xmp.did:93a6292b-3d23-4710-88c3-6b86f1df1bc1"
   xmpMM:OriginalDocumentID="B1471243154B4C6FD3312E6C08B3F40B"
   xmpMM:InstanceID="xmp.iid:FB9F01172E206811822AD3EC356F991B"
   crs:RawFileName="Keller_Daniel_003.NEF"
   crs:Version="9.1.1"
   crs:ProcessVersion="6.7"
   crs:WhiteBalance="Custom"
   crs:AutoWhiteVersion="134348800"
   crs:Temperature="4900"
   crs:Tint="-9"
   crs:Saturation="+27"
   crs:Sharpness="109"
   crs:LuminanceSmoothing="21"
   crs:ColorNoiseReduction="25"
   crs:VignetteAmount="0"
   crs:ShadowTint="0"
   crs:RedHue="0"
   crs:RedSaturation="0"
   crs:GreenHue="0"
   crs:GreenSaturation="0"
   crs:BlueHue="0"
   crs:BlueSaturation="0"
   crs:Vibrance="0"
   crs:HueAdjustmentRed="0"
   crs:HueAdjustmentOrange="+10"
   crs:HueAdjustmentYellow="+1"
   crs:HueAdjustmentGreen="0"
   crs:HueAdjustmentAqua="0"
   crs:HueAdjustmentBlue="0"
   crs:HueAdjustmentPurple="0"
   crs:HueAdjustmentMagenta="0"
   crs:SaturationAdjustmentRed="-1"
   crs:SaturationAdjustmentOrange="0"
   crs:SaturationAdjustmentYellow="0"
   crs:SaturationAdjustmentGreen="0"
   crs:SaturationAdjustmentAqua="0"
   crs:SaturationAdjustmentBlue="0"
   crs:SaturationAdjustmentPurple="0"
   crs:SaturationAdjustmentMagenta="0"
   crs:LuminanceAdjustmentRed="0"
   crs:LuminanceAdjustmentOrange="0"
   crs:LuminanceAdjustmentYellow="0"
   crs:LuminanceAdjustmentGreen="0"
   crs:LuminanceAdjustmentAqua="0"
   crs:LuminanceAdjustmentBlue="0"
   crs:LuminanceAdjustmentPurple="0"
   crs:LuminanceAdjustmentMagenta="0"
   crs:SplitToningShadowHue="0"
   crs:SplitToningShadowSaturation="0"
   crs:SplitToningHighlightHue="0"
   crs:SplitToningHighlightSaturation="0"
   crs:SplitToningBalance="0"
   crs:ParametricShadows="0"
   crs:ParametricDarks="0"
   crs:ParametricLights="0"
   crs:ParametricHighlights="0"
   crs:ParametricShadowSplit="25"
   crs:ParametricMidtoneSplit="50"
   crs:ParametricHighlightSplit="75"
   crs:SharpenRadius="+0.9"
   crs:SharpenDetail="25"
   crs:SharpenEdgeMasking="0"
   crs:PostCropVignetteAmount="0"
   crs:GrainAmount="0"
   crs:LuminanceNoiseReductionDetail="50"
   crs:ColorNoiseReductionDetail="50"
   crs:LuminanceNoiseReductionContrast="0"
   crs:ColorNoiseReductionSmoothness="50"
   crs:LensProfileEnable="0"
   crs:LensManualDistortionAmount="0"
   crs:PerspectiveVertical="0"
   crs:PerspectiveHorizontal="0"
   crs:PerspectiveRotate="0.0"
   crs:PerspectiveScale="100"
   crs:PerspectiveAspect="0"
   crs:PerspectiveUpright="0"
   crs:AutoLateralCA="0"
   crs:Exposure2012="+0.35"
   crs:Contrast2012="0"
   crs:Highlights2012="0"
   crs:Shadows2012="0"
   crs:Whites2012="0"
   crs:Blacks2012="0"
   crs:Clarity2012="-4"
   crs:DefringePurpleAmount="0"
   crs:DefringePurpleHueLo="30"
   crs:DefringePurpleHueHi="70"
   crs:DefringeGreenAmount="0"
   crs:DefringeGreenHueLo="40"
   crs:DefringeGreenHueHi="60"
   crs:Dehaze="0"
   crs:ToneMapStrength="0"
   crs:ConvertToGrayscale="False"
   crs:ToneCurveName="Medium Contrast"
   crs:ToneCurveName2012="Linear"
   crs:CameraProfile="Adobe Standard"
   crs:CameraProfileDigest="AC58BA900C3A001F052B43DA5615508D"
   crs:LensProfileSetup="LensDefaults"
   crs:HasSettings="True"
   crs:HasCrop="False"
   crs:AlreadyApplied="True"
   _ns_9:Filename="Keller_Daniel_003_13_18cm.jpg"
   _ns_9:AssetId="115593">
   <dc:rights>
    <rdf:Alt>
     <rdf:li xml:lang="de">VBS/DDPS - ZEM</rdf:li>
    </rdf:Alt>
   </dc:rights>
   <dc:description>
    <rdf:Alt>
     <rdf:li xml:lang="de">Divisionär (Div) Daniel Keller</rdf:li>
     <rdf:li xml:lang="fr">Divisionnaire (div) Daniel keller</rdf:li>
     <rdf:li xml:lang="it">Divisionario (div) Daniel Keller</rdf:li>
     <rdf:li xml:lang="en">Major General Daniel Keller</rdf:li>
    </rdf:Alt>
   </dc:description>
   <dc:title>
    <rdf:Alt>
     <rdf:li xml:lang="de">Divisionär (Div) Daniel Keller</rdf:li>
     <rdf:li xml:lang="fr">Divisionnaire (div) Daniel keller</rdf:li>
     <rdf:li xml:lang="it">Divisionario (div) Daniel Keller</rdf:li>
     <rdf:li xml:lang="en">Major General Daniel Keller</rdf:li>
    </rdf:Alt>
   </dc:title>
   <dc:creator>
    <rdf:Seq>
     <rdf:li>Ulrich Liechti</rdf:li>
    </rdf:Seq>
   </dc:creator>
   <dc:subject>
    <rdf:Bag>
     <rdf:li xml:lang="de">Portrait</rdf:li>
     <rdf:li xml:lang="fr">portrait</rdf:li>
     <rdf:li xml:lang="it">ritratto</rdf:li>
     <rdf:li xml:lang="en">portrait</rdf:li>
     <rdf:li xml:lang="de">Divisionär</rdf:li>
     <rdf:li xml:lang="fr">divisionnaire</rdf:li>
     <rdf:li xml:lang="it">divisionario</rdf:li>
     <rdf:li xml:lang="en">major general</rdf:li>
     <rdf:li xml:lang="de">Aufnahmetyp</rdf:li>
     <rdf:li xml:lang="fr">type d'enregistrement</rdf:li>
     <rdf:li xml:lang="it">tipo di fotografia</rdf:li>
     <rdf:li xml:lang="en">type of recording</rdf:li>
     <rdf:li xml:lang="de">Höhere Stabsoffiziere</rdf:li>
     <rdf:li xml:lang="fr">officiers généraux</rdf:li>
     <rdf:li xml:lang="it">alti ufficiali superiori</rdf:li>
     <rdf:li xml:lang="en">senior staff officers</rdf:li>
     <rdf:li xml:lang="de">Dienstgrade</rdf:li>
     <rdf:li xml:lang="fr">grades militaires</rdf:li>
     <rdf:li xml:lang="it">gradi militari</rdf:li>
     <rdf:li xml:lang="en">ranks</rdf:li>
     <rdf:li xml:lang="de">Organisation der Armee</rdf:li>
     <rdf:li xml:lang="fr">organisation de l'armée</rdf:li>
     <rdf:li xml:lang="it">organizzazione dell'esercito</rdf:li>
     <rdf:li xml:lang="en">armed forces organisation</rdf:li>
    </rdf:Bag>
   </dc:subject>
   <xmpMM:History>
    <rdf:Seq>
     <rdf:li
      stEvt:action="saved"
      stEvt:instanceID="xmp.iid:0580117407206811822ABD346375C1B3"
      stEvt:when="2016-12-19T07:36:51+01:00"
      stEvt:softwareAgent="Adobe Photoshop Camera Raw 7.3"
      stEvt:changed="/metadata"/>
     <rdf:li
      stEvt:action="saved"
      stEvt:instanceID="xmp.iid:d58ecd16-565c-4b2f-87ed-48869da593a1"
      stEvt:when="2016-12-19T07:36:51+01:00"
      stEvt:softwareAgent="Adobe Photoshop Camera Raw 7.3 (Macintosh)"
      stEvt:changed="/metadata"/>
     <rdf:li
      stEvt:action="derived"
      stEvt:parameters="converted from image/x-nikon-nef to image/jpeg, saved to new location"/>
     <rdf:li
      stEvt:action="saved"
      stEvt:instanceID="xmp.iid:93a6292b-3d23-4710-88c3-6b86f1df1bc1"
      stEvt:when="2016-12-19T14:31:21+01:00"
      stEvt:softwareAgent="Adobe Photoshop Camera Raw 9.1.1 (Macintosh)"
      stEvt:changed="/"/>
     <rdf:li
      stEvt:action="saved"
      stEvt:instanceID="xmp.iid:FB9F01172E206811822AD3EC356F991B"
      stEvt:when="2016-12-19T15:22:03+01:00"
      stEvt:softwareAgent="Adobe Photoshop CS6 (Macintosh)"
      stEvt:changed="/"/>
    </rdf:Seq>
   </xmpMM:History>
   <xmpMM:DerivedFrom
    stRef:instanceID="xmp.iid:d58ecd16-565c-4b2f-87ed-48869da593a1"
    stRef:documentID="B1471243154B4C6FD3312E6C08B3F40B"
    stRef:originalDocumentID="B1471243154B4C6FD3312E6C08B3F40B"/>
   <crs:ToneCurve>
    <rdf:Seq>
     <rdf:li>0, 0</rdf:li>
     <rdf:li>32, 22</rdf:li>
     <rdf:li>64, 56</rdf:li>
     <rdf:li>128, 128</rdf:li>
     <rdf:li>192, 196</rdf:li>
     <rdf:li>255, 255</rdf:li>
    </rdf:Seq>
   </crs:ToneCurve>
   <crs:ToneCurveRed>
    <rdf:Seq>
     <rdf:li>0, 0</rdf:li>
     <rdf:li>255, 255</rdf:li>
    </rdf:Seq>
   </crs:ToneCurveRed>
   <crs:ToneCurveGreen>
    <rdf:Seq>
     <rdf:li>0, 0</rdf:li>
     <rdf:li>255, 255</rdf:li>
    </rdf:Seq>
   </crs:ToneCurveGreen>
   <crs:ToneCurveBlue>
    <rdf:Seq>
     <rdf:li>0, 0</rdf:li>
     <rdf:li>255, 255</rdf:li>
    </rdf:Seq>
   </crs:ToneCurveBlue>
   <crs:ToneCurvePV2012>
    <rdf:Seq>
     <rdf:li>0, 0</rdf:li>
     <rdf:li>255, 255</rdf:li>
    </rdf:Seq>
   </crs:ToneCurvePV2012>
   <crs:ToneCurvePV2012Red>
    <rdf:Seq>
     <rdf:li>0, 0</rdf:li>
     <rdf:li>255, 255</rdf:li>
    </rdf:Seq>
   </crs:ToneCurvePV2012Red>
   <crs:ToneCurvePV2012Green>
    <rdf:Seq>
     <rdf:li>0, 0</rdf:li>
     <rdf:li>255, 255</rdf:li>
    </rdf:Seq>
   </crs:ToneCurvePV2012Green>
   <crs:ToneCurvePV2012Blue>
    <rdf:Seq>
     <rdf:li>0, 0</rdf:li>
     <rdf:li>255, 255</rdf:li>
    </rdf:Seq>
   </crs:ToneCurvePV2012Blue>
  </rdf:Description>
 </rdf:RDF>
'''


g = Graph().parse(data=testrdfxml2, format='xml')
#print(g.serialize(format='json-ld'))
g.serialize(destination='jsonld.txt', format='json-ld')

with open("jsonld.txt", "rt") as in_file:
    text = in_file.read()
    print(text)

    g2 = Graph().parse(data=text, format='json-ld')
    g.serialize(destination='rdfxml.txt', format='pretty-xml')
