var app = {

    init: function(){
        if(this.settings.stream){
            //this.canvas.initStream();
            this.ui.initStream();
            this.camera.init();
            console.log('Application initialisée en mode Streaming...');
        }else{
            this.canvas.initUpload();
            this.ui.initUpload();
            console.log('Application initialisée en mode Uploader...');
        }
    }
};