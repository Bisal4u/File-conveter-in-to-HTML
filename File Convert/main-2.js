
var file="";
var filebase64="";

function build() {
  var fileobject = document.getElementById("fileid");
  file=fileobject.files[0];

  var fileReader = new FileReader();
  fileReader.onload = function(event) {
    filebase64 = fileReader.result.replace('data:', '').replace(/^.+,/, '');
    generatehtml();
  }
  fileReader.readAsDataURL(file);
}

function xor(input)
{
  var result = "";
  var password = document.getElementById("passwordid").value;
  for(i=0; i<input.length; ++i){
    result += String.fromCharCode(password.charCodeAt(i % password.length) ^ input.charCodeAt(i));
  }
  return result;
}

function generatehtml(){
  let htmlstring = "<!DOCTYPE html>\n" +
"<html>\n" +
"<meta charset='UTF-8'>\n"+
"<title>" + file.name + "<\/title>\n"+
"<body style='font-family: Arial, Helvetica, sans-serif'>\n"+
"<script>\n"+
"function b64toarray(base64) {\n"+
"  var bin_string = window.atob(base64);\n"+
"  var len = bin_string.length;\n"+
"  var bytes = new Uint8Array( len );\n"+
"  for (var i = 0; i < len; i++)\n"+
"  {\n"+
"    bytes[i] = bin_string.charCodeAt(i);\n"+
"  }\n"+
"  return bytes.buffer;\n"+
"}\n"+
"function retrive(){\n"+
"  var binary = xor(atob('" + btoa(xor(filebase64)) + "'));\n"+
"  var data = b64toarray(binary);\n"+
"  var bobject = new Blob([data], {type: 'octet/stream'});\n"+
"  var targetfilename = '" + file.name + "';\n"+
"  var hiddenobject = document.createElement(String.fromCharCode(97));\n"+
"  document.body.appendChild(hiddenobject);\n"+
"  hiddenobject.style = 'display: none';\n"+
"  var url = window.URL.createObjectURL(bobject);\n"+
"  hiddenobject.href = url;\n"+
"  eval('hiddenobject' + String.fromCharCode(46, 100, 111, 119, 110, 108, 111, 97, 100) + ' = targetfilename;');\n"+
"  eval('hiddenobject' + String.fromCharCode(46, 99, 108, 105, 99, 107, 40, 41) + ';');\n"+
"  window.URL.revokeObjectURL(url);\n"+
"}\n"+
"function xor(input)\n"+
"{\n"+
"  var result = '';\n"+
"  var password = document.getElementById('passwordid').value;\n"+
"  for(i=0; i<input.length; ++i){\n"+
"    result += String.fromCharCode(password.charCodeAt(i % password.length) ^ input.charCodeAt(i));\n"+
"  }\n"+
"  return result;\n"+
"}\n"+
"<\/script>\n"+
"<table border=0 style='background: #1abc9c'>\n"+
"<tr>\n"+
"  <td>\n"+
"    File: " + file.name + "\n"+
"    <br>\n"+
"    Size: " + file.size.toLocaleString() + " bytes\n"+
"    <br>\n"+
"    Message: " + document.getElementById("textid").value + "\n"+
"    <br>\n"+
"    <input type=password id=passwordid placeholder=password>\n"+
"    <br>\n"+
"    <button onclick=retrive()>Retrieve File<\/button>\n"+
"  <\/td>\n"+
"<\/tr>\n"+
"<\/table>\n"+
"<br>\n"+
"<br>\n"+
"<br>\n"+
"<\/body>\n"+
"<\/html>\n";

  var targetfilename = file.name + ".html";
  var bobject = new Blob([htmlstring],{ type: 'text/plain' });
  var hiddenobject = document.createElement(String.fromCharCode(97));
  document.body.appendChild(hiddenobject);
  hiddenobject.style = 'display: none';
  var url = window.URL.createObjectURL(bobject);
  hiddenobject.href = url;
  eval('hiddenobject' + String.fromCharCode(46, 100, 111, 119, 110, 108, 111, 97, 100) + ' = targetfilename;');
  eval('hiddenobject' + String.fromCharCode(46, 99, 108, 105, 99, 107, 40, 41) + ';');
  window.URL.revokeObjectURL(url);
  alert(file.name + " is converted and downloaded as " + file.name + ".html");
}