app.canvas={
    initUpload: function(){
        //création du stage
        app.settings.stage = new Kinetic.Stage({
          width: 435,
          height: 550,
          container: 'canvas'
        });
        //création du layer (qui va contenir les images)
        app.settings.layer = new Kinetic.Layer();
        // ajout du layer au stage
        app.settings.stage.add(app.settings.layer);
        
    },
    initStream: function(){
       alert('ok');
        
    },

    generateCadre: function(imgUrl){
        var imageObj = new Image();
        
        imageObj.onload = function() {
            // instensiation de l'image 
            app.settings.cadre = new Kinetic.Image({
                x:0,
                y:0,
                image:imageObj,
                name:'cadre',
                width: 435,
                height: 550
            });
            //Ajout de l'image au layer dans la scene
            app.settings.layer.add(app.settings.cadre);
            app.settings.stage.add(app.settings.layer);
            console.log(app.settings.cadre);
            };
        imageObj.src = imgUrl;


        
        
    } 
}