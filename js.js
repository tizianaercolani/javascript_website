// you can enter your JS here!
var currentSlide=1;
var timeCarousel;
function initialize() {
	  var myLatLng = new google.maps.LatLng(48.833651,2.318547);
	  var myOptions = {
	      zoom:20,
	      center: myLatLng,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	  }
	  var map = new google.maps.Map(document.getElementById("gmaps-canvas"), myOptions);
	  
	  
	  var marker = new google.maps.Marker({
	        position: myLatLng, 
	        map: map,
	        title:"Hotel Fantastique"
	    });
		
	    var contentString = '<em>Hotel Fantastique</em>';
	    var infoWindow = new google.maps.InfoWindow({
	        content: contentString
	    });
		
	    google.maps.event.addListener(marker, 'click', function() {
	        infoWindow.open(map,marker);
	    });   
}
var similiarHotels = [
                 {"name":"Hotel Perfect", "image":"img/11_thumb.jpg","star":"★★","desc":"Beautiful place..."},
                 {"name":"Hotel Stars", "image":"img/4_thumb.jpg","star":"★★★","desc":"Beautiful place..."},
                 {"name":"Hotel La Luna", "image":"img/8_thumb.jpg","star":"★★","desc":"Beautiful place..."}
             ];

var similiar={
		HotelsDisplay:function(){
			var innerHotel="";
			for(var i=0;i<similiarHotels.length;i++){
				
				innerHotel+="<div class='hotels'><img class='imghotel' src='"+similiarHotels[i].image+"'/><span class='titleH'>"+similiarHotels[i].name+"</span><span class='star'>"+similiarHotels[i].star+"</span><br><span class='descH'>"+similiarHotels[i].desc+"</span></div><hr>"
				
			}
			document.getElementById('hotelSimiliar').innerHTML=innerHotel;
			
			
		}
		
		
		
		
}
	
var carousel={
		  caroselManual:function(){
			  $('#photos,#prevCarousel,#nextCarousel').hover(function() {
				    $('#prevCarousel').show();
				    $('#nextCarousel').show();
				    clearTimeout(timeCarousel);
				    $('.imageDescription').css('opacity','0.2');
				},function() {
				    $('#prevCarousel').hide();
				    $('#nextCarousel').hide();
				    timeCarousel=setTimeout(carousel.automaticCarousel, 3000); 
				    $('.imageDescription').css('opacity','1');
				});
			  
		    },
          caroselScrollerNext:function(){
        	  if(currentSlide==14){
        	  currentSlide=0;
          		$("#photos").scrollLeft ( 700* 0);
          		
        	  }else{
        	  currentSlide=currentSlide+1;
        		$("#photos").animate({
        			scrollLeft : 700* (currentSlide)
        			},250);
        	  }
        	  
          },
		    caroselScrollerPrev:function(){
		    	 if(currentSlide==0){
		        	  currentSlide=14;
		          		$("#photos").scrollLeft ( 700*14);
		          		
		        	  }else{
	        	       currentSlide=currentSlide-1;
	        	        $("#photos").animate({
	        			  scrollLeft : 700* (currentSlide)
	        			},250);
		        	  }
	      },
            automaticCarousel:function(){
               carousel.caroselScrollerNext()
        	   timeCarousel=setTimeout(carousel.automaticCarousel, 3000); 
        	}
		
}

var pagination={
		
		calculatePoint:function(){
			var num=Math.round($('.one_review').length/5);
			var innerPaginate='';
			for(var i=0;i<=num;i++){
				var j= i+1;
					
				innerPaginate+="<div class='no-choosePage' id="+i+" onclick='pagination.blockPagination("+j+")' >"+j+"</div>"
			}
			document.getElementById('point').innerHTML=innerPaginate;
			$('#0').removeClass('no-choosePage');
			$('#0').addClass('choosePage');
		},
		
        blockPagination:function(currentPage){
        	$('.active').removeClass('active').addClass('one_review');
		    var end= currentPage*5;
		    var idPoint=currentPage-1;
		    var start=end-5;
        	$('.one_review').slice(start, end).removeClass('one_review').addClass('active');
        	$('.choosePage').removeClass('choosePage').addClass('no-choosePage');
        	
        	$('#'+idPoint+'').removeClass('no-choosePage');
			$('#'+idPoint+'').addClass('choosePage');
		    
        },
sortReview:function(ul,desc) {
        	
        	var list = $('#'+ul+'');
        	var li=list.find('li');
        	var listItems = li.sort(function(a,b){ return $(a).attr('data-sort') - $(b).attr('data-sort'); });
        	//list.find('li').remove();
        	if(desc)
        		var listItems = li.sort(function(a,b){ return $(b).attr('data-sort')-$(a).attr('data-sort') ; });
        	list.html(listItems);
        	pagination.blockPagination("1");  
        }
               
            
        
		
}
var desc=false;
var roomTotal={
		
		subtotal:function(select,price){
			
			$('#subTotal').show();
			var e = document.getElementById(select);
			var strUser = e.options[e.selectedIndex].text;
            var multi=parseInt(strUser);
			var subtotal=multi*price;
			var total=Math.round(subtotal*100) / 100;
			
			document.getElementById('subTotalprice').innerHTML='&euro;'+ total;
			
			
		},
	    sortTable:function(numCell){
		    var tbl = document.getElementById("rooms_table").tBodies[0];
		    var store = [];
		    for(var i=0, len=tbl.rows.length; i<len; i++){
		        var row = tbl.rows[i];
		        var sortnr = parseFloat(row.cells[numCell].textContent || row.cells[numCell].innerText);
		        if(!isNaN(sortnr)) store.push([sortnr, row]);
		    }
		    store.sort(function(x,y){
		        return x[0] - y[0];
		    });
		    
		    if(desc)
		    	store.reverse();
		    for(var i=0, len=store.length; i<len; i++){
		        tbl.appendChild(store[i][1]);
		    }
		    store = null;
		    desc = !desc;
		}
		
		
		
		
		
}



$(document).ready(function(){
	
	carousel.caroselManual();
	similiar.HotelsDisplay();
	carousel.automaticCarousel();
	pagination.calculatePoint();
	
	 var desc = false;
     document.getElementById("sortingButton").onclick = function() {
       pagination.sortReview("reviews_list", desc);
       desc = !desc;
       return false;
     }
   	
})