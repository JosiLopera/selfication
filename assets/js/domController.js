app.domController = {

    generateCadre: function(imgUrl){
        $('#cadre').remove();
        $('#cCamera').prepend('<img id="cadre" class="large" src='+imgUrl+' />');
    }

};