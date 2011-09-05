/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.gfx.vml"]||(dojo._hasResource["dojox.gfx.vml"]=!0,dojo.provide("dojox.gfx.vml"),dojo.require("dojox.gfx._base"),dojo.require("dojox.gfx.shape"),dojo.require("dojox.gfx.path"),dojo.require("dojox.gfx.arc"),dojo.require("dojox.gfx.gradient"),function(){function p(a,b,c){c=c||j.global;b.call(c,a);(a instanceof h.Surface||a instanceof h.Group)&&j.forEach(a.children,function(a){p(a,b,c)})}var j=dojo,h=dojox.gfx,l=h.matrix,k=h.shape,i=h.vml;i.xmlns="urn:schemas-microsoft-com:vml";
i.text_alignment={start:"left",middle:"center",end:"right"};i._parseFloat=function(a){return a.match(/^\d+f$/i)?parseInt(a)/65536:parseFloat(a)};i._bool={t:1,"true":1};j.declare("dojox.gfx.vml.Shape",k.Shape,{setFill:function(a){if(!a)return this.fillStyle=null,this.rawNode.filled="f",this;var b,c,d;if(typeof a=="object"&&"type"in a){switch(a.type){case "linear":var e=this._getRealMatrix(),f=this.getBoundingBox(),g=this._getRealBBox?this._getRealBBox():this.getTransformedBoundingBox();d=[];if(this.fillStyle!==
a)this.fillStyle=h.makeParameters(h.defaultLinearGradient,a);a=h.gradient.project(e,this.fillStyle,{x:f.x,y:f.y},{x:f.x+f.width,y:f.y+f.height},g[0],g[2]);c=a.colors;c[0].offset.toFixed(5)!="0.00000"&&d.push("0 "+h.normalizeColor(c[0].color).toHex());for(b=0;b<c.length;++b)d.push(c[b].offset.toFixed(5)+" "+h.normalizeColor(c[b].color).toHex());b=c.length-1;c[b].offset.toFixed(5)!="1.00000"&&d.push("1 "+h.normalizeColor(c[b].color).toHex());b=this.rawNode.fill;b.colors.value=d.join(";");b.method="sigma";
b.type="gradient";b.angle=(270-l._radToDeg(a.angle))%360;b.on=!0;break;case "radial":this.fillStyle=a=h.makeParameters(h.defaultRadialGradient,a);var e=parseFloat(this.rawNode.style.left),f=parseFloat(this.rawNode.style.top),g=parseFloat(this.rawNode.style.width),i=parseFloat(this.rawNode.style.height),k=isNaN(g)?1:2*a.r/g;c=[];a.colors[0].offset>0&&c.push({offset:1,color:h.normalizeColor(a.colors[0].color)});j.forEach(a.colors,function(a){c.push({offset:1-a.offset*k,color:h.normalizeColor(a.color)})});
for(b=c.length-1;b>=0&&c[b].offset<0;)--b;if(b<c.length-1){d=c[b];var o=c[b+1];o.color=j.blendColors(d.color,o.color,d.offset/(d.offset-o.offset));for(o.offset=0;c.length-b>2;)c.pop()}b=c.length-1;d=[];for(c[b].offset>0&&d.push("0 "+c[b].color.toHex());b>=0;--b)d.push(c[b].offset.toFixed(5)+" "+c[b].color.toHex());b=this.rawNode.fill;b.colors.value=d.join(";");b.method="sigma";b.type="gradientradial";b.focusposition=isNaN(g)||isNaN(i)||isNaN(e)||isNaN(f)?"0.5 0.5":((a.cx-e)/g).toFixed(5)+" "+((a.cy-
f)/i).toFixed(5);b.focussize="0 0";b.on=!0;break;case "pattern":this.fillStyle=a=h.makeParameters(h.defaultPattern,a);b=this.rawNode.fill;b.type="tile";b.src=a.src;if(a.width&&a.height)b.size.x=h.px2pt(a.width),b.size.y=h.px2pt(a.height);b.alignShape="f";b.position.x=0;b.position.y=0;b.origin.x=a.width?a.x/a.width:0;b.origin.y=a.height?a.y/a.height:0;b.on=!0}this.rawNode.fill.opacity=1;return this}this.fillStyle=h.normalizeColor(a);(b=this.rawNode.fill)||(b=this.rawNode.ownerDocument.createElement("v:fill"));
b.method="any";b.type="solid";b.opacity=this.fillStyle.a;if(d=this.rawNode.filters["DXImageTransform.Microsoft.Alpha"])d.opacity=Math.round(this.fillStyle.a*100);this.rawNode.fillcolor=this.fillStyle.toHex();this.rawNode.filled=!0;return this},setStroke:function(a){if(!a)return this.strokeStyle=null,this.rawNode.stroked="f",this;if(typeof a=="string"||j.isArray(a)||a instanceof j.Color)a={color:a};a=this.strokeStyle=h.makeParameters(h.defaultStroke,a);a.color=h.normalizeColor(a.color);var b=this.rawNode;
b.stroked=!0;b.strokecolor=a.color.toCss();b.strokeweight=a.width+"px";if(b.stroke)b.stroke.opacity=a.color.a,b.stroke.endcap=this._translate(this._capMap,a.cap),typeof a.join=="number"?(b.stroke.joinstyle="miter",b.stroke.miterlimit=a.join):b.stroke.joinstyle=a.join,b.stroke.dashstyle=a.style=="none"?"Solid":a.style;return this},_capMap:{butt:"flat"},_capMapReversed:{flat:"butt"},_translate:function(a,b){return b in a?a[b]:b},_applyTransform:function(){var a=this._getRealMatrix();if(a){var b=this.rawNode.skew;
if(typeof b=="undefined")for(var c=0;c<this.rawNode.childNodes.length;++c)if(this.rawNode.childNodes[c].tagName=="skew"){b=this.rawNode.childNodes[c];break}if(b){b.on="f";var c=a.xx.toFixed(8)+" "+a.xy.toFixed(8)+" "+a.yx.toFixed(8)+" "+a.yy.toFixed(8)+" 0 0",a=Math.floor(a.dx).toFixed()+"px "+Math.floor(a.dy).toFixed()+"px",d=this.rawNode.style,e=parseFloat(d.left),f=parseFloat(d.top),g=parseFloat(d.width),d=parseFloat(d.height);isNaN(e)&&(e=0);isNaN(f)&&(f=0);if(isNaN(g)||!g)g=1;if(isNaN(d)||!d)d=
1;e=(-e/g-0.5).toFixed(8)+" "+(-f/d-0.5).toFixed(8);b.matrix=c;b.origin=e;b.offset=a;b.on=!0}}this.fillStyle&&this.fillStyle.type=="linear"&&this.setFill(this.fillStyle);return this},_setDimensions:function(){return this},setRawNode:function(a){a.stroked="f";a.filled="f";this.rawNode=a},_moveToFront:function(){this.rawNode.parentNode.appendChild(this.rawNode);return this},_moveToBack:function(){var a=this.rawNode,b=a.parentNode,c=b.firstChild;b.insertBefore(a,c);c.tagName=="rect"&&c.swapNode(a);return this},
_getRealMatrix:function(){return this.parentMatrix?new h.Matrix2D([this.parentMatrix,this.matrix]):this.matrix}});dojo.declare("dojox.gfx.vml.Group",i.Shape,{constructor:function(){k.Container._init.call(this)},_applyTransform:function(){for(var a=this._getRealMatrix(),b=0;b<this.children.length;++b)this.children[b]._updateParentMatrix(a);return this},_setDimensions:function(a,b){var c=this.rawNode,d=c.style,e=this.bgNode.style;d.width=a;d.height=b;c.coordsize=a+" "+b;e.width=a;e.height=b;for(c=0;c<
this.children.length;++c)this.children[c]._setDimensions(a,b);return this}});i.Group.nodeType="group";dojo.declare("dojox.gfx.vml.Rect",[i.Shape,k.Rect],{setShape:function(a){a=this.shape=h.makeParameters(this.shape,a);this.bbox=null;var b=Math.min(1,a.r/Math.min(parseFloat(a.width),parseFloat(a.height))).toFixed(8),c=this.rawNode.parentNode,d=null;if(c){if(c.lastChild!==this.rawNode)for(var e=0;e<c.childNodes.length;++e)if(c.childNodes[e]===this.rawNode){d=c.childNodes[e+1];break}c.removeChild(this.rawNode)}j.isIE>
7?(e=this.rawNode.ownerDocument.createElement("v:roundrect"),e.arcsize=b,e.style.display="inline-block",this.rawNode=e):this.rawNode.arcsize=b;c&&(d?c.insertBefore(this.rawNode,d):c.appendChild(this.rawNode));b=this.rawNode.style;b.left=a.x.toFixed();b.top=a.y.toFixed();b.width=typeof a.width=="string"&&a.width.indexOf("%")>=0?a.width:a.width.toFixed();b.height=typeof a.width=="string"&&a.height.indexOf("%")>=0?a.height:a.height.toFixed();return this.setTransform(this.matrix).setFill(this.fillStyle).setStroke(this.strokeStyle)}});
i.Rect.nodeType="roundrect";dojo.declare("dojox.gfx.vml.Ellipse",[i.Shape,k.Ellipse],{setShape:function(a){a=this.shape=h.makeParameters(this.shape,a);this.bbox=null;var b=this.rawNode.style;b.left=(a.cx-a.rx).toFixed();b.top=(a.cy-a.ry).toFixed();b.width=(a.rx*2).toFixed();b.height=(a.ry*2).toFixed();return this.setTransform(this.matrix)}});i.Ellipse.nodeType="oval";dojo.declare("dojox.gfx.vml.Circle",[i.Shape,k.Circle],{setShape:function(a){a=this.shape=h.makeParameters(this.shape,a);this.bbox=
null;var b=this.rawNode.style;b.left=(a.cx-a.r).toFixed();b.top=(a.cy-a.r).toFixed();b.width=(a.r*2).toFixed();b.height=(a.r*2).toFixed();return this}});i.Circle.nodeType="oval";dojo.declare("dojox.gfx.vml.Line",[i.Shape,k.Line],{constructor:function(a){a&&a.setAttribute("dojoGfxType","line")},setShape:function(a){a=this.shape=h.makeParameters(this.shape,a);this.bbox=null;this.rawNode.path.v="m"+a.x1.toFixed()+" "+a.y1.toFixed()+"l"+a.x2.toFixed()+" "+a.y2.toFixed()+"e";return this.setTransform(this.matrix)}});
i.Line.nodeType="shape";dojo.declare("dojox.gfx.vml.Polyline",[i.Shape,k.Polyline],{constructor:function(a){a&&a.setAttribute("dojoGfxType","polyline")},setShape:function(a,b){a&&a instanceof Array?(this.shape=h.makeParameters(this.shape,{points:a}),b&&this.shape.points.length&&this.shape.points.push(this.shape.points[0])):this.shape=h.makeParameters(this.shape,a);this.bbox=null;this._normalizePoints();var c=[],d=this.shape.points;if(d.length>0&&(c.push("m"),c.push(d[0].x.toFixed(),d[0].y.toFixed()),
d.length>1)){c.push("l");for(var e=1;e<d.length;++e)c.push(d[e].x.toFixed(),d[e].y.toFixed())}c.push("e");this.rawNode.path.v=c.join(" ");return this.setTransform(this.matrix)}});i.Polyline.nodeType="shape";dojo.declare("dojox.gfx.vml.Image",[i.Shape,k.Image],{setShape:function(a){a=this.shape=h.makeParameters(this.shape,a);this.bbox=null;this.rawNode.firstChild.src=a.src;return this.setTransform(this.matrix)},_applyTransform:function(){var a=this._getRealMatrix(),b=this.rawNode,c=b.style,d=this.shape,
a=a?l.multiply(a,{dx:d.x,dy:d.y}):l.normalize({dx:d.x,dy:d.y});if(a.xy==0&&a.yx==0&&a.xx>0&&a.yy>0)c.filter="",c.width=Math.floor(a.xx*d.width),c.height=Math.floor(a.yy*d.height),c.left=Math.floor(a.dx),c.top=Math.floor(a.dy);else{var e=b.parentNode.style;c.left="0px";c.top="0px";c.width=e.width;c.height=e.height;a=l.multiply(a,{xx:d.width/parseInt(c.width),yy:d.height/parseInt(c.height)});(b=b.filters["DXImageTransform.Microsoft.Matrix"])?(b.M11=a.xx,b.M12=a.xy,b.M21=a.yx,b.M22=a.yy,b.Dx=a.dx,b.Dy=
a.dy):c.filter="progid:DXImageTransform.Microsoft.Matrix(M11="+a.xx+", M12="+a.xy+", M21="+a.yx+", M22="+a.yy+", Dx="+a.dx+", Dy="+a.dy+")"}return this},_setDimensions:function(a,b){var c=this.rawNode;return c.filters["DXImageTransform.Microsoft.Matrix"]?(c=c.style,c.width=a,c.height=b,this._applyTransform()):this}});i.Image.nodeType="rect";dojo.declare("dojox.gfx.vml.Text",[i.Shape,k.Text],{constructor:function(a){a&&a.setAttribute("dojoGfxType","text");this.fontStyle=null},_alignment:{start:"left",
middle:"center",end:"right"},setShape:function(a){this.shape=h.makeParameters(this.shape,a);this.bbox=null;var b=this.rawNode,a=this.shape,c=a.x,d=a.y.toFixed();switch(a.align){case "middle":c-=5;break;case "end":c-=10}for(var d="m"+c.toFixed()+","+d+"l"+(c+10).toFixed()+","+d+"e",e=null,c=null,f=b.childNodes,g=0;g<f.length;++g){var j=f[g].tagName;if(j=="path"){if(e=f[g],c)break}else if(j=="textpath"&&(c=f[g],e))break}e||(e=b.ownerDocument.createElement("v:path"),b.appendChild(e));c||(c=b.ownerDocument.createElement("v:textpath"),
b.appendChild(c));e.v=d;e.textPathOk=!0;c.on=!0;b=i.text_alignment[a.align];c.style["v-text-align"]=b?b:"left";c.style["text-decoration"]=a.decoration;c.style["v-rotate-letters"]=a.rotated;c.style["v-text-kern"]=a.kerning;c.string=a.text;return this.setTransform(this.matrix)},_setFont:function(){for(var a=this.fontStyle,b=this.rawNode.childNodes,c=0;c<b.length;++c)if(b[c].tagName=="textpath"){b[c].style.font=h.makeFontString(a);break}this.setTransform(this.matrix)},_getRealMatrix:function(){var a=
this.inherited(arguments);a&&(a=l.multiply(a,{dy:-h.normalizedLength(this.fontStyle?this.fontStyle.size:"10pt")*0.35}));return a},getTextWidth:function(){var a=this.rawNode,b=a.style.display;a.style.display="inline";var c=h.pt2px(parseFloat(a.currentStyle.width));a.style.display=b;return c}});i.Text.nodeType="shape";dojo.declare("dojox.gfx.vml.Path",[i.Shape,h.path.Path],{constructor:function(a){a&&!a.getAttribute("dojoGfxType")&&a.setAttribute("dojoGfxType","path");this.vmlPath="";this.lastControl=
{}},_updateWithSegment:function(a){var b=j.clone(this.last);this.inherited(arguments);if(!(arguments.length>1))b=this[this.renderers[a.action]](a,b),typeof this.vmlPath=="string"?(this.vmlPath+=b.join(""),this.rawNode.path.v=this.vmlPath+" r0,0 e"):Array.prototype.push.apply(this.vmlPath,b)},setShape:function(a){this.vmlPath=[];this.lastControl.type="";this.inherited(arguments);this.vmlPath=this.vmlPath.join("");this.rawNode.path.v=this.vmlPath+" r0,0 e";return this},_pathVmlToSvgMap:{m:"M",l:"L",
t:"m",r:"l",c:"C",v:"c",qb:"Q",x:"z",e:""},renderers:{M:"_moveToA",m:"_moveToR",L:"_lineToA",l:"_lineToR",H:"_hLineToA",h:"_hLineToR",V:"_vLineToA",v:"_vLineToR",C:"_curveToA",c:"_curveToR",S:"_smoothCurveToA",s:"_smoothCurveToR",Q:"_qCurveToA",q:"_qCurveToR",T:"_qSmoothCurveToA",t:"_qSmoothCurveToR",A:"_arcTo",a:"_arcTo",Z:"_closePath",z:"_closePath"},_addArgs:function(a,b,c,d){for(b=b instanceof Array?b:b.args;c<d;++c)a.push(" ",b[c].toFixed())},_adjustRelCrd:function(a,b,c){var b=b instanceof Array?
b:b.args,d=b.length,e=Array(d),f=0,g=a.x,a=a.y;typeof g!="number"&&(e[0]=g=b[0],e[1]=a=b[1],f=2);if(typeof c=="number"&&c!=2)for(var h=c;h<=d;){for(;f<h;f+=2)e[f]=g+b[f],e[f+1]=a+b[f+1];g=e[h-2];a=e[h-1];h+=c}else for(;f<d;f+=2)e[f]=g+=b[f],e[f+1]=a+=b[f+1];return e},_adjustRelPos:function(a,b){for(var c=b instanceof Array?b:b.args,d=c.length,e=Array(d),f=0;f<d;++f)e[f]=a+=c[f];return e},_moveToA:function(a){var b=[" m"],a=a instanceof Array?a:a.args,c=a.length;this._addArgs(b,a,0,2);c>2&&(b.push(" l"),
this._addArgs(b,a,2,c));this.lastControl.type="";return b},_moveToR:function(a,b){return this._moveToA(this._adjustRelCrd(b,a))},_lineToA:function(a){var b=[" l"],a=a instanceof Array?a:a.args;this._addArgs(b,a,0,a.length);this.lastControl.type="";return b},_lineToR:function(a,b){return this._lineToA(this._adjustRelCrd(b,a))},_hLineToA:function(a,b){for(var c=[" l"],d=" "+b.y.toFixed(),e=a instanceof Array?a:a.args,f=e.length,g=0;g<f;++g)c.push(" ",e[g].toFixed(),d);this.lastControl.type="";return c},
_hLineToR:function(a,b){return this._hLineToA(this._adjustRelPos(b.x,a),b)},_vLineToA:function(a,b){for(var c=[" l"],d=" "+b.x.toFixed(),e=a instanceof Array?a:a.args,f=e.length,g=0;g<f;++g)c.push(d," ",e[g].toFixed());this.lastControl.type="";return c},_vLineToR:function(a,b){return this._vLineToA(this._adjustRelPos(b.y,a),b)},_curveToA:function(a){for(var b=[],a=a instanceof Array?a:a.args,c=a.length,d=this.lastControl,e=0;e<c;e+=6)b.push(" c"),this._addArgs(b,a,e,e+6);d.x=a[c-4];d.y=a[c-3];d.type=
"C";return b},_curveToR:function(a,b){return this._curveToA(this._adjustRelCrd(b,a,6))},_smoothCurveToA:function(a,b){var c=[],d=a instanceof Array?a:a.args,e=d.length,f=this.lastControl,g=0;if(f.type!="C")c.push(" c"),this._addArgs(c,[b.x,b.y],0,2),this._addArgs(c,d,0,4),f.x=d[0],f.y=d[1],f.type="C",g=4;for(;g<e;g+=4)c.push(" c"),this._addArgs(c,[2*b.x-f.x,2*b.y-f.y],0,2),this._addArgs(c,d,g,g+4),f.x=d[g],f.y=d[g+1];return c},_smoothCurveToR:function(a,b){return this._smoothCurveToA(this._adjustRelCrd(b,
a,4),b)},_qCurveToA:function(a){for(var b=[],a=a instanceof Array?a:a.args,c=a.length,d=this.lastControl,e=0;e<c;e+=4)b.push(" qb"),this._addArgs(b,a,e,e+4);d.x=a[c-4];d.y=a[c-3];d.type="Q";return b},_qCurveToR:function(a,b){return this._qCurveToA(this._adjustRelCrd(b,a,4))},_qSmoothCurveToA:function(a,b){var c=[],d=a instanceof Array?a:a.args,e=d.length,f=this.lastControl,g=0;if(f.type!="Q")c.push(" qb"),this._addArgs(c,[f.x=b.x,f.y=b.y],0,2),f.type="Q",this._addArgs(c,d,0,2),g=2;for(;g<e;g+=2)c.push(" qb"),
this._addArgs(c,[f.x=2*b.x-f.x,f.y=2*b.y-f.y],0,2),this._addArgs(c,d,g,g+2);return c},_qSmoothCurveToR:function(a,b){return this._qSmoothCurveToA(this._adjustRelCrd(b,a,2),b)},_arcTo:function(a,b){for(var c=[],d=a.args,e=d.length,f=a.action=="a",g=0;g<e;g+=7){var i=d[g+5],j=d[g+6];f&&(i+=b.x,j+=b.y);for(var k=h.arc.arcAsBezier(b,d[g],d[g+1],d[g+2],d[g+3]?1:0,d[g+4]?1:0,i,j),l=0;l<k.length;++l){c.push(" c");var m=k[l];this._addArgs(c,m,0,m.length);this._updateBBox(m[0],m[1]);this._updateBBox(m[2],
m[3]);this._updateBBox(m[4],m[5])}b.x=i;b.y=j}this.lastControl.type="";return c},_closePath:function(){this.lastControl.type="";return["x"]}});i.Path.nodeType="shape";dojo.declare("dojox.gfx.vml.TextPath",[i.Path,h.path.TextPath],{constructor:function(a){a&&a.setAttribute("dojoGfxType","textpath");this.fontStyle=null;if(!("text"in this))this.text=j.clone(h.defaultTextPath);if(!("fontStyle"in this))this.fontStyle=j.clone(h.defaultFont)},setText:function(a){this.text=h.makeParameters(this.text,typeof a==
"string"?{text:a}:a);this._setText();return this},setFont:function(a){this.fontStyle=typeof a=="string"?h.splitFontString(a):h.makeParameters(h.defaultFont,a);this._setFont();return this},_setText:function(){this.bbox=null;for(var a=this.rawNode,b=this.text,c=null,d=null,e=a.childNodes,f=0;f<e.length;++f){var g=e[f].tagName;if(g=="path"){if(c=e[f],d)break}else if(g=="textpath"&&(d=e[f],c))break}c||(c=this.rawNode.ownerDocument.createElement("v:path"),a.appendChild(c));d||(d=this.rawNode.ownerDocument.createElement("v:textpath"),
a.appendChild(d));c.textPathOk=!0;d.on=!0;a=i.text_alignment[b.align];d.style["v-text-align"]=a?a:"left";d.style["text-decoration"]=b.decoration;d.style["v-rotate-letters"]=b.rotated;d.style["v-text-kern"]=b.kerning;d.string=b.text},_setFont:function(){for(var a=this.fontStyle,b=this.rawNode.childNodes,c=0;c<b.length;++c)if(b[c].tagName=="textpath"){b[c].style.font=h.makeFontString(a);break}}});i.TextPath.nodeType="shape";dojo.declare("dojox.gfx.vml.Surface",k.Surface,{constructor:function(){k.Container._init.call(this)},
setDimensions:function(a,b){this.width=h.normalizedLength(a);this.height=h.normalizedLength(b);if(!this.rawNode)return this;var c=this.clipNode.style,d=this.rawNode,e=d.style,f=this.bgNode.style,g=this._parent.style;g.width=a;g.height=b;c.width=a;c.height=b;c.clip="rect(0px "+a+"px "+b+"px 0px)";e.width=a;e.height=b;d.coordsize=a+" "+b;f.width=a;f.height=b;for(c=0;c<this.children.length;++c)this.children[c]._setDimensions(a,b);return this},getDimensions:function(){var a=this.rawNode?{width:h.normalizedLength(this.rawNode.style.width),
height:h.normalizedLength(this.rawNode.style.height)}:null;if(a.width<=0)a.width=this.width;if(a.height<=0)a.height=this.height;return a}});i.createSurface=function(a,b,c){if(!b&&!c)var d=j.position(a),b=b||d.w,c=c||d.h;typeof b=="number"&&(b+="px");typeof c=="number"&&(c+="px");var d=new i.Surface,a=j.byId(a),e=d.clipNode=a.ownerDocument.createElement("div"),f=d.rawNode=a.ownerDocument.createElement("v:group"),g=e.style,k=f.style;if(j.isIE>7)k.display="inline-block";d._parent=a;d._nodes.push(e);
a.style.width=b;a.style.height=c;g.position="absolute";g.width=b;g.height=c;g.clip="rect(0px "+b+" "+c+" 0px)";k.position="absolute";k.width=b;k.height=c;f.coordsize=(b==="100%"?b:parseFloat(b))+" "+(c==="100%"?c:parseFloat(c));f.coordorigin="0 0";var g=d.bgNode=f.ownerDocument.createElement("v:rect"),l=g.style;l.left=l.top=0;l.width=k.width;l.height=k.height;g.filled=g.stroked="f";f.appendChild(g);e.appendChild(f);a.appendChild(e);d.width=h.normalizedLength(b);d.height=h.normalizedLength(c);return d};
var n=k.Container,q={add:function(a){if(this!=a.getParent()){var b=a.getParent();b&&b.remove(a);this.rawNode.appendChild(a.rawNode);n.add.apply(this,arguments);p(this,function(a){typeof a.getFont=="function"&&(a.setShape(a.getShape()),a.setFont(a.getFont()));typeof a.setFill=="function"&&(a.setFill(a.getFill()),a.setStroke(a.getStroke()))})}return this},remove:function(a,b){this==a.getParent()&&(this.rawNode==a.rawNode.parentNode&&this.rawNode.removeChild(a.rawNode),n.remove.apply(this,arguments));
return this},clear:function(){for(var a=this.rawNode;a.firstChild!=a.lastChild;)a.firstChild!=this.bgNode&&a.removeChild(a.firstChild),a.lastChild!=this.bgNode&&a.removeChild(a.lastChild);return n.clear.apply(this,arguments)},_moveChildToFront:n._moveChildToFront,_moveChildToBack:n._moveChildToBack},r={createGroup:function(){var a=this.createObject(i.Group,null),b=a.rawNode.ownerDocument.createElement("v:rect");b.style.left=b.style.top=0;b.style.width=a.rawNode.style.width;b.style.height=a.rawNode.style.height;
b.filled=b.stroked="f";a.rawNode.appendChild(b);a.bgNode=b;return a},createImage:function(a){if(!this.rawNode)return null;var b=new i.Image,c=this.rawNode.ownerDocument,d=c.createElement("v:rect");d.stroked="f";d.style.width=this.rawNode.style.width;d.style.height=this.rawNode.style.height;c=c.createElement("v:imagedata");d.appendChild(c);b.setRawNode(d);this.rawNode.appendChild(d);b.setShape(a);this.add(b);return b},createRect:function(a){if(!this.rawNode)return null;var b=new i.Rect,c=this.rawNode.ownerDocument.createElement("v:roundrect");
if(j.isIE>7)c.style.display="inline-block";b.setRawNode(c);this.rawNode.appendChild(c);b.setShape(a);this.add(b);return b},createObject:function(a,b){if(!this.rawNode)return null;var c=new a,d=this.rawNode.ownerDocument.createElement("v:"+a.nodeType);c.setRawNode(d);this.rawNode.appendChild(d);switch(a){case i.Group:case i.Line:case i.Polyline:case i.Image:case i.Text:case i.Path:case i.TextPath:this._overrideSize(d)}c.setShape(b);this.add(c);return c},_overrideSize:function(a){var b=this.rawNode.style,
c=b.width,b=b.height;a.style.width=c;a.style.height=b;a.coordsize=parseInt(c)+" "+parseInt(b)}};j.extend(i.Group,q);j.extend(i.Group,k.Creator);j.extend(i.Group,r);j.extend(i.Surface,q);j.extend(i.Surface,k.Creator);j.extend(i.Surface,r);h.loadAndSwitch==="vml"&&(h.switchTo("vml"),delete h.loadAndSwitch)}());