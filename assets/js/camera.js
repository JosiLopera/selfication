app.camera = {

    init: function(){
       this.view();
       //this.upload();
    },
    
    view: function(){
        window.addEventListener("DOMContentLoaded", function() {
            var video = document.getElementById("video"),
                videoObj = { "video": true },
                errBack = function(error) {
                    console.log("Video capture error: ", error.code); 
                };

            if(navigator.getUserMedia) { 
                navigator.getUserMedia(videoObj, function(stream) {
                    video.src = stream;
                    video.play();
                }, errBack);
            } else if(navigator.webkitGetUserMedia) { 
                navigator.webkitGetUserMedia(videoObj, function(stream){
                    video.src = window.webkitURL.createObjectURL(stream);
                    video.play();
                }, errBack);
            }
            else if(navigator.mozGetUserMedia) { 
                navigator.mozGetUserMedia(videoObj, function(stream){
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                }, errBack);
            }

        }, false);
    },

    context: function(){
        var canvas2 = document.getElementById("canvas2");
        context2 = canvas2.getContext("2d");
        context2.scale(-1, 1);
        context2.translate(-canvas2.width, 0);
        context2.drawImage(video, 0, 45, 275, 206);

        var canvas3 = document.getElementById("canvas3");
        var color = document.getElementById("colorSelect").value;
        var mul = 0.1;
        var opacity = document.getElementById("opacitySelect").value*mul;
        context3 = canvas3.getContext("2d");
        context3.globalAlpha = opacity;
        context3.fillStyle = color;
        context3.fillRect (0, 0, 275, 365);

        var canvas4 = document.getElementById("canvas4");
        context4 = canvas4.getContext("2d");
        var cadreF = document.getElementById("cadre");
        context4.drawImage(cadreF, 0, 0, 275, 365);
        
        var canvas5 = document.getElementById("canvas5");
        context5 = canvas5.getContext("2d");
        context5.drawImage(canvas2, 0, 0);
        context5.drawImage(canvas3, 0, 0);
        context5.drawImage(canvas4, 0, 0);
    },

    clearContext: function(){
        var canvasClear = document.getElementsByClassName("canClear");
        //console.log(canvasClear);
        for (var i = 0; i < canvasClear.length; i++) {
            canvasClear[i].width = canvasClear[i].width;
        };
    },

    download: function(){
        var canvas = document.getElementById("canvas5");
        var img = canvas.toDataURL("image/png");
        //document.write('<img src="'+img+'"/>')
        $("#btnRemake").after('<a id="btnDownload" class="clsLightBox" href="'+img+'" download="MySelfie.png"></a>');

    }

    /*upload: function(){
        var imageLoader = document.getElementById('imageLoader');
            imageLoader.addEventListener('change', handleImage, false);
        var canvas = document.getElementById('imageCanvas');
        var ctx = canvas.getContext('2d');
        function handleImage(e){
            var reader = new FileReader();
            reader.onload = function(event){
                var img = new Image();
                img.onload = function(){
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img,20,20);
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);     
        }
    }*/
};