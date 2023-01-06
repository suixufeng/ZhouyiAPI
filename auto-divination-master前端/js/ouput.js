//第二阶段的输出
 async function outputViaDOM(result) {

  let currentGua = result.currentGua;
  let futureGua = result.futureGua;
    let yao = [];
    var importExplain;
    let myObject1;//本卦解释
    let myObject2;//变卦解释
  d3.selectAll("h1").style("opacity", 1);
  let outputSentences = d3.select("div.description").style("width", "100%");

  //变爻序列
  let currentChangedYaoArray = result.currentGua.yaoArray
    .filter(yao => /老/.test(yao.property))


  //概述
    let ifChangeExist = "无变爻。"

  if (currentGua !== futureGua) {
      ifChangeExist = '变爻为<span style = "color:red;">' + currentChangedYaoArray.map(yao => yao.yaoName).join("、") + "</span>" + "<br>" + '<span style="font-weight: bold; font-size: 8px;">如何参考解卦含义：一个变爻，用该变爻的爻辞解卦；' + "</span>" + "<br>" + '<span style="font-weight: bold; font-size: 8px;">两个变爻，用这两个变爻的爻辞解卦，以上爻为主；' + "</span>" + "<br>" + '<span style="font-weight: bold; font-size: 8px;">三个变爻，用本卦卦辞结合变卦卦辞综合考虑；' + "</span>" + "<br>" + '<span style="font-weight: bold; font-size: 8px;">四个变爻，用另外两个静爻的爻辞解卦，以下爻为主;' + "</span>" + "<br>" + '<span style="font-weight: bold; font-size: 8px;">五个变爻，用变卦的静爻爻辞解卦；' + "</span>" + "<br>" + '<span style="font-weight: bold; font-size: 8px;">六爻皆变，乾卦用用九的爻辞解卦，坤卦用用用六的爻辞解卦，其他的用变卦的卦辞解卦；' + "</span>";
     
    //  let yao=[];
      for (var i in currentChangedYaoArray) {
          var yaoname = currentChangedYaoArray[i].yaoName.replace('初九', '一爻').replace('九二', '二爻').replace('九三', '三爻').replace('九四', '四爻').replace('九五', '五爻').replace('上九', '六爻').replace('初六', '一爻').replace('六二', '二爻').replace('六三', '三爻').replace('六四', '四爻').replace('六五', '五爻').replace('上六', '六爻') ;
         // alert(yaoname);
          yao[i]=yaoname;
      }

      //var num = yao.length;
      //var expl = "";
      //if (num == 1) {
      //    alert(num);
      //} else if (num == 2)
      //{
      //    alert(num);
      //} else
      //{
      //    alert(num);
      //} 
  }
  outputSentences
    .append("p").classed("overview", true)
    .html("此次占卜结果：本卦" + currentGua.doubleSymbol + "《" + currentGua.doubleName + "》，之卦" + futureGua.doubleSymbol + "《" + futureGua.doubleName + "》，" + ifChangeExist);
    outputSentences.append("br");
    

 
  //本卦卦辞
  let row = outputSentences.append("div").classed("row", true)
  //5格宽度
  row.append("div").attr("class", "col-lg-6 col-md-6 col-sm-6")
    .append("p").classed("guaSentence", true)
    .text("《" + currentGua.doubleName + "》：" + currentGua.sentence);
  //5格宽度
  row.append("div").attr("class", "col-lg-6 col-md-6 col-sm-6")
    .append("p")
    .classed("guaSentence", true)
    //.text("揣摩爻辞含义，可参考互证的单变爻");
   //   .text("白话文解释");
  //   myObject1 = await  printEasySentence(result.currentGua);//增加白话文解释
    // var uri = 'https://localhost:4433/api/jiegua/' + '999999';
  // await  ajax(uri).then(function onFulfilled(value) {
     await printEasySentence(result.currentGua).then(function onFulfilled(value) {
       //  document.write('内容是：' + value);
       myObject1 =  value;
        // printImportSentence(yao);//增加重点参照白话文解释
     }).catch(function onRejected(error) {
         document.write('错误：' + error);
     });
  //本卦变爻爻辞
  printYaoSentence(result.currentGua);

  //之卦卦辞
  if (currentGua !== futureGua) {
      outputSentences.append("br");
      outputSentences
          .append("p").classed("guaSentence", true)
          .text("《" + futureGua.doubleName + "》：" + futureGua.sentence);
   //  myObject2= printEasySentence(result.futureGua);//增加白话文解释
      await printEasySentence(result.futureGua).then(function onFulfilled(value) {
          //  document.write('内容是：' + value);
          myObject2 = value;
          // printImportSentence(yao);//增加重点参照白话文解释
      }).catch(function onRejected(error) {
           document.write('错误：' + error);
      });
  }

  //之卦变爻爻辞
  if (currentChangedYaoArray.length > 0) {
    printYaoSentence(result.futureGua);
  }

    printImportSentence(yao);//增加重点参照白话文解释
    function _displayItems(data) {
        const remoteResponse = document.getElementById('remoteResponse');
        remoteResponse.innerText = data;
    }
    //打印爻辞的函数
    function printYaoSentence(gua) {
        for (let i = 0; i < 6; i++) {
            //新建一行
            let row = outputSentences.append("div").classed("row", true)
            //本卦爻辞，5格宽度
            row.append("div").attr("class", "col-lg-6 col-md-6 col-sm-6")
                .append("p")
                .text("《" + gua.yaoArray[i].guaName + "》" + gua.yaoArray[i].yaoName + "：" + gua.yaoArray[i].sentence)
                .attr("class", /老/.test(gua.yaoArray[i].property) ? "changedYao" : "unchangedYao")
         
            //相关爻辞，5格宽度
            //row.append("div").attr("class", "col-lg-6 col-md-6 col-sm-6")
            //    .append("p")
            //    .text("《" + gua.corrYaoArray[i].guaName + "》" + gua.corrYaoArray[i].yaoName + "：" + gua.corrYaoArray[i].sentence)
        }
       
    }
  //打印全部卦相关白话文解释的函数

     async  function printEasySentence(gua) {

      var guacode = gua.doubleCode;

      const uri = 'https://localhost:4433/api/jiegua/' + guacode;

      //  fetch(`https://localhost:5001/weatherforecast`,
       // fetch(uri,
       //     {
       //         method: 'get',

       //     }).then(response => {
       //         if (response.ok) {
       //             response.text().then(text => {
       //                 //  remoteResponse.innerText = text;

       //             var    myObject = JSON.parse(text);   //由JSON字符串转换为JSON对象
       //                 let row = outputSentences.append("div").classed("row", true);
       //                 row.append("div").attr("class", "col-lg col-md col-sm")
       //                     .append("p")
       //                     .classed("guaSentence", true)
       //                     .text("《" + gua.doubleName + "》" + "白话文解释");
       //                 for (var p in myObject) {//遍历json对象的每个key/value对,p为key
       //                     //  alert(p + " " + myObject[p]);
       //                     //row.append("div").attr("class", "col-lg col-md col-sm")
       //                     //    .append("p")
       //                     //    .text( myObject[p])

       //                     //本卦爻辞，5格宽度
       //                     row.append("div").attr("class", "col-lg col-md col-sm")
       //                         .append("p")
       //                         .text(myObject[p])

       //                 }
       //                // console.log('--text--'+text);
       //                // return Promise.resolve(text);
       //                 return myObject;
       //             });
       //         }
       //         else {
       //             console.log('-else-text--' + text);
       //             return myObject;
       //             remoteResponse.innerText = response.status;
       //         }
       //     })

       //.catch ((error) => {
       //     console.error('Error:', error);
       // });



         let response = await  fetch(uri);
         let result = await response.text();
         var myObject = await JSON.parse(result);   //由JSON字符串转换为JSON对象
                      //let row = outputSentences.append("div").classed("row", true);
         let outputSentences1 = d3.select("div.easydescription").style("width", "100%");
         let row = outputSentences1.append("div").classed("row", true);
                      row.append("div").attr("class", "col-lg col-md col-sm")
                          .append("p")
                          .classed("guaSentence", true)
                          .text("《" + gua.doubleName + "》" + "白话文解释");
                      for (var p in myObject) {//遍历json对象的每个key/value对,p为key

                          //本卦爻辞，5格宽度
                          row.append("div").attr("class", "col-lg col-md col-sm")
                              .append("p")
                              .text(myObject[p])

                      }


      return myObject;

  }


   //根据变爻显示本卦重点解释
    function printImportSentence(arrbian) {
       // myObject1 = printEasySentence(result.currentGua);//增加白话文解释
        var changeNum = yao.length;
        var expl = "";
        if (typeof (myObject1) != "undefined" && typeof (myObject2) != "undefined") { 
        if (changeNum == 1) {
            importExplain = myObject1[arrbian];
            alert(importExplain);
        } else if (changeNum == 2) {
            importExplain = myObject1[arrbian[0]] + '\n' + myObject1[arrbian[1]];
            alert(importExplain);
        } else if (changeNum == 3) {
            importExplain =myObject1["卦辞"] + myObject2["卦辞"];
            alert(importExplain);
        } else if (changeNum == 4) {
            for (var p in arrbian) {
                delete myObject1[arrbian[p]];//剔除本卦动爻解释

            }
            for (var s in myObject1) {
                var newString = s.indexOf('爻');
                //如果newString等于 - 1，则代表其中不包含"爻"这个字符串
                if (newString != -1) {
                        importExplain += myObject1[s] + '\n';//拼接本卦静爻解释
                }
            }

            alert(importExplain.replace("undefined",""));
        } else if (changeNum == 5) {
            for (var p in arrbian) {
                delete myObject2[arrbian[p]];//剔除变卦动爻解释

            }
            for (var s in myObject2) {
                var newString = s.indexOf('爻');
                //如果newString等于 - 1，则代表其中不包含"爻"这个字符串
                if (newString != -1) {
                    importExplain += myObject2[s] + '\n';//拼接变卦静爻解释
                }
            }

            alert(importExplain.replace("undefined", ""));
        } else if (changeNum == 6) {
            if (myObject1["卦号"] == '999999') {
                importExplain = myObject1["用九用六"];
            } else if (myObject1["卦号"] == '666666') {
                importExplain = myObject1["用九用六"];
            } else {
                importExplain = myObject2["卦辞"];//变卦卦辞
            }
            alert(importExplain.replace("undefined", ""));
        } else {
            alert(changeNum);
        }
        }
    }
    //根据变爻显示本卦重点解释

}
//async function ajax(uri) {
 
//var  a= await   new Promise(function (resolve, reject) {
//        var req = new XMLHttpRequest();
//        req.open('GET', uri, true);
//        req.onload = function () {
//            if (req.status === 200) {
//                resolve(req.responseText);
//            } else {
//                reject(new Error(req.statusText));
//            }
//        };
//        req.onerror = function () {
//            reject(new Error(req.statusText));
//        };
//        req.send();
//});
//    return a;
//}

