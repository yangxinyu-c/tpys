var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var arguments = process.argv.splice(2);
console.log('压缩图片路径', arguments[0]);
var filePath = arguments[0];
//调用文件遍历方法
fileDisplay(filePath);
/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            // console.log(filedir.indexOf(".png")!=-1);
							if((filedir.indexOf(".png") != -1)&& filedir.indexOf(".meta")==-1){
								// 防止中文乱码
								filedir = decodeURI(encodeURI(filedir));
								console.log("pngquanti --force "+filedir+" --ext .png");
								let cmd = "pngquanti --force "+filedir+" --ext .png";
								exec(cmd, function(err,stdout,stderr){
									if(err) {
										console.log(filedir+'get weather api error:'+stderr);
									} else {
										
									}
								});
							}
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}