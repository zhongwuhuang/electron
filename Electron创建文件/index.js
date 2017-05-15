var fs = require('fs'),
    oinput = document.getElementsByTagName('input')[0],
    otextarea = document.getElementsByTagName('textarea')[0],
    obutton = document.getElementsByTagName('button')[0];

function writeFile() {
    var text1 = './newFile/'+oinput.value;
    var text2 = otextarea.value;

    // 将text2 以utf-8编码方式写入text1文件中
    // alert(typeof(fs.writeFileSync(text1,text2, 'utf8')));
    if(!fs.writeFileSync(text1,text2, 'utf8')){
      alert('生成'+oinput.value+'成功!');
    }else{
      alert('生成'+oinput.value+'失败!');
    }
}

obutton.onclick = writeFile;
