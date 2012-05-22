  function gMap(lat, longit) {

    var latlng = new google.maps.LatLng(lat, longit);
    var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  	var marker = new google.maps.Marker({
      position: latlng, 
      map: map, 
      title:"Your package"
  });   
  }

 