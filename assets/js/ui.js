app.ui = {

    initStream: function(){
        this.goPlay();
        this.gridToDom();
        this.showThumbnail();
        this.showThumbnailBody();
        this.showConfig();
        this.snap();
        this.msnShare();
        this.remake();
        this.backHome();
        this.chageColor();
    },

    initUpload: function(){
        this.gridToCanvas();
    },

    backHome: function(){
        $(".logo").on('click', function(event){
            event.preventDefault();
            if ($(this).attr('data-state')=='on') {
                $(".gerard").removeClass("gerardOn");
                $(".snap").fadeOut('normal');
                $(".paperBoard").removeClass("paperBoardOn");
                $(".showThumbnailCont").removeClass("showThumbnailContOn");
                $("#cCamera").css("display","none");
                $(".cCamera").removeClass("cCameraOn");
                $(".thumbnailContainerBoard").css("display","inherit").attr('data-state','off');
                setTimeout(function(){
                    $(".colRightPlay, .colLeftPlay").css("display","none");
                    $(".colRightHome, .colLeftHome").css("display","inherit");
                }, 500);
                setTimeout(function(){
                    $(".logo").removeClass("logoOn");
                    $(".go").removeClass("goOff");
                    $(".msnCam").removeClass("goOff");
                }, 800);
                $(this).attr('data-state','off').css("cursor", "default").attr('title','');;
            };
        });
    },

    goPlay: function(){
        $(".go").on('click', function(event){
            event.preventDefault();
            console.log('ani ok');
            $(".logo").addClass("logoOn");
            $(".go").addClass("goOff");
            $(".msnCam").addClass("goOff");
            setTimeout(function(){
                $(".colRightHome, .colLeftHome").css("display","none");
                $(".colRightPlay, .colLeftPlay").css("display","inherit");
            }, 500);
            setTimeout(function(){
                $(".gerard").addClass("gerardOn");
                $(".paperBoard").addClass("paperBoardOn");
                $(".thumbnailContainerBoard").addClass("thumbnailContainerBoardOn");
                $(".thumbnailContainerBoard").attr('data-state','on');
                $("#cCamera").css("display","inherit");
            }, 800);
            $(".logo").attr('data-state','on').css("cursor", "pointer").attr('title','Back home');
        });
    },

    showThumbnail: function(){
        $(".showThumbnail").on('click', function(event) {
            event.preventDefault();
            //console.log('pouf');
            if ($(".showThumbnail").attr('data-state')=='off') {
                $(".thumbnailContainer").fadeIn("slow").css("display","inline-block");
                $(".showThumbnail, body").attr('data-state', 'on');
                // au clic on appel la fonction generateCadre avec l'url de l'image en parametre 
            }else{
                $(".thumbnailContainer").fadeOut("slow");
                $(".showThumbnail, body").attr('data-state', 'off');
                // au clic on appel la fonction generateCadre avec l'url de l'image en parametre 
            };
        });
    },

    showThumbnailBody: function(){
        $("body").on('click', function(event){
            if ($("body").attr('data-state')=='on') { 
                if (event.target.className.split(" ")[0] != "thumb") {
                    $(".thumbnailContainer").fadeOut("slow");
                    $(".showThumbnail, body").attr('data-state', 'off');
                } 
            }              
        });
    },

    showConfig: function(){
        $("#config").on('click', function(event) {
            event.preventDefault();
            if ($("#config").attr('data-state')=='off') {
                $("#colorBox").fadeIn("slow").css("display","inline-block");
                $("#config, body").attr('data-state', 'on');
            }else{
                $("#colorBox").fadeOut("slow");
                $("#config, body").attr('data-state', 'off');
            };
        });
    },

    msnShare: function(){
        $('#btnShare').on('click', function(){
            app.camera.clearContext();
            $("#pvc, .clsLightBox").css("display","none");
            $("#btnRemakeOnly").css("display","inherit");
            $("#modalContainer").prepend('<span id="msnShared">Voila qui est fait !<br/ >Merci</span>');
        });
    },

    gridToCanvas: function(){
        // var that = this;
        $("body").on('click', '.thumbnail', function(event) {
            event.preventDefault();
            var imgUrl = $(this).attr('data-url');
            app.canvas.generateCadre(imgUrl);
            // au clic on appel la fonction generateCadre avec l'url de l'image en parametre 
        });
    },

    gridToDom: function(){
        // var that = this;
        $(".thumbnailBoard").on('click', function(event) {
            event.preventDefault();
            var imgUrl = $(this).attr('data-url');
            if ($(".thumbnailContainerBoard").attr('data-state')=='on') {
                $(".thumbnailContainerBoard").removeClass("thumbnailContainerBoardOn");
                setTimeout(function(){
                    $(".thumbnailContainerBoard").css("display","none").attr('data-state','off');
                    $(".snap").fadeIn('normal');
                    $('.paperBoardOn').html('<span>Prenez le cliché</span>')
                    app.domController.generateCadre(imgUrl);
                }, 300);
                setTimeout(function(){
                    $(".cCamera").addClass("cCameraOn"); 
                    $(".showThumbnailCont").addClass("showThumbnailContOn");
                }, 400);
                
            };
            
            // au clic on appel la fonction generateCadre avec l'url de l'image en parametre 
        });
        $(".thumbnail").on('click', function(event) {
            event.preventDefault();
            var imgUrl = $(this).attr('data-url');
            $(".cCamera").removeClass("cCameraOn");
            setTimeout(function(){ 
                app.domController.generateCadre(imgUrl);
                $(".cCamera").addClass("cCameraOn");
            }, 200);           
            // au clic on appel la fonction generateCadre avec l'url de l'image en parametre 
        });
    },

    snap: function(){
        $(".snap").on('click', function(){
            $("#lightbox").fadeIn(1000);
            app.camera.context();
            app.camera.download();
        });
    },

    remake: function(){
        $("#btnRemake").on('click', function() { 
            $("#lightbox").fadeOut(500);
            app.camera.clearContext();
            setTimeout(function(){
                $("#btnDownload").remove();
            },500)
        });

        $("#btnRemakeOnly").on('click', function() { 
            $("#msnShared").remove();
            $(this).css("display", "none");
            $("#lightbox").fadeOut(500);
            $("#btnDownload").remove();
            setTimeout(function(){
                $("#pvc, .clsLightBox").css("display","inline-block");
            },500);        
        });

    },

    chageColor: function(){
        $("#colorSelect").on('change', function (){
            var colorVal= $(this).val();
            console.log(colorVal);
            $("#mask").css({backgroundColor: colorVal});
        });

        $("#opacitySelect").on('change', function (){
            var opacityVal= $(this).val()*0.1;
            console.log(opacityVal);
            $("#mask").css({opacity: opacityVal});
        });
    }


};