// Description Box;

var postBox = function(){
	// when the user clicks the post button, the page should create the post including the time it was posted, a side picture of the profile's image in the post, and the actual post itself. The post should has a maximum of 500 characters.
	$('.postBtn').click(function(){	 	
	var post = $('.status-box').val();
	//creating the mini profile image
	$('<li>').prepend('<p class="myPost">' + post +'</p>').prepend('<image id="miniProfilePic"src="ProfilePic.jpg"> </image>').prepend('<div id ="timePost"> </div>').prependTo('.post');
	var timePostDiv= document.getElementById('timePost');
		
		
	//geting the time of each post	
	function displayTime(){
	var date = new Date();
	var hr= date.getHours();
	var min= date.getMinutes();
	var sec= date.getSeconds();
	var day=date.getDate();
	var month= date.getMonth();	
	var meridiem = '';	
	var month = new Array;
		month[0] = "Jan";
		month[1] = "Feb";
		month[2] = "Mar";
		month[3] = "Apr";
		month[4] = "May";
		month[5] = "Jun";
		month[6] = "Jul";
		month[7] = "Aug";
		month[8] = "Sep";
		month[9] = "Oct";
		month[10] = "Nov";
		month[11] = "Dec";

			if (min < 10 ){
				min = "0"+min;
				meridiem="AM";
			}
			if(hr>12){
				hr = hr-12;
				meridiem= "PM";	
			}
	
		timePostDiv.innerHTML = month[date.getMonth()] + " " + day+ "  " + hr+":"+min+' '+meridiem;
	}
	// activating the time functin	
	displayTime();
	
		
	$('.characterCounter').text(140);
	$('.status-box').val('');
	$('.btn').attr('disabled','disabled');	
		
	
	})
	
	$('.status-box').keyup(updateCount);
	$('.stat-box').keydown(updateCount);
	
	function updateCount(){
	var cs = 140- $(this).val().length;	
	$('.characterCounter').text(cs);	
		if(cs<=0 || cs == 140){
			$('.btn').attr('disabled', 'disabled');
		}
		else{
			$('.btn').removeAttr('disabled');	
		}
	};
	$('.btn').attr('disabled', 'disabled');
	
}



// when pressing edit Button it should switch the profile's span of age and name into an input element


$(document).ready(postBox);
var switchToInput = function(){
	$('.editBtn').click(function(){
		
		// this section sets up the input for the name
		var nameInput=$('<input>', {val: $('.profileName').text(), type:"text"});
		nameInput.addClass("profileNameInput");
		$('.profileName').replaceWith(nameInput);
	
		// this section sets up the input for the age	
		var ageInput=$('<input>',{val: $('.profileAge').text(),type:"number"});
		ageInput.addClass("profileAgeInput");
		$('.profileAge').replaceWith(ageInput);
								  
		// this section replaces the edit button with a save button 						  
		var saveBtn = $('<button>',{text:"save", type:"button"}).prepend('<span class = "glyphicon glyphicon-saved"> </span>');
		saveBtn.addClass("saveBtn");
		$(this).replaceWith(saveBtn);
		switchToSpan();	
		

	});
	
	
};

// when the save button is clicked: it should update the users profile name and age

var switchToSpan = function(){
	
	
	$('.saveBtn').click(function() {
		// this section changes the input back to a span element
		var nameSpan = $('<span>',{text: $('.profileNameInput').val(), type:"text"});
		nameSpan.addClass("profileName");
		$('.profileNameInput').replaceWith(nameSpan);
		
		//this section repalces the ageInput with the the span age input
		var ageSpan = $('<span>',{text: $('.profileAgeInput').val(), type:"text"});
		ageSpan.addClass("profileAge");
		$('.profileAgeInput').replaceWith(ageSpan);
		
		//this section replaces the save button back to the edit button
		var editButton = $('<button class="editBtn" type="button">').text("Edit").prepend('<span class= " glyphicon glyphicon-edit" </span>');
		$(this).replaceWith(editButton);
		switchToInput();
	})
};
		

$(document).ready(switchToInput);
$(document).ready(switchToSpan);

// my Photo section

$('.myPhoto').click(function(e){
   var image_href=($(this).attr('src'));
    e.preventDefault();
     
    var lightbox = 
    '<div class = "lightBox"></div>';
    $('body').append(lightbox);

        
    var popupImage = '<img class="popupImage"    src="'+image_href+'">'; //+
       // '<p class="close"> CLOSE </p>';    
   
    $('body').append(popupImage);
    //to close everything if the user clicks on anything besides the popup image 
    $('.lightBox,.close').click(function(){
       closeImage(); 
    });

    
});


function closeImage(){
    $('.lightBox').remove();
    $('.close').remove();
    $('.popupImage').remove();  
}


// option box response

$('#photoBtn').click(function(){
    document.querySelector('.pictureSection').style.display = "inline";
    document.querySelector('.userPost').style.display="none";
    document.querySelector('.setting').style.display="none";
});

$('#dashboardBtn').click(function(){
    document.querySelector('.pictureSection').style.display="none";
    document.querySelector('.userPost').style.display="inline";
    document.querySelector('.setting').style.display="none";
});

$('#settingBtn').click(function(){
    document.querySelector('.setting').style.display ="inline";
    document.querySelector('.pictureSection').style.display="none";
    document.querySelector(".userPost").style.display="none";
    document.querySelector(".inputBackgroundImage").style.display="none";
    document.getElementsByName('.inputBackgroundColor').disabled = true;
    
});

//settings section

// checks which option the user picks
function checkBackground(){

var inputType = document.getElementById("backgroundType").value;
    
    if(inputType=="Background Color"){
      $(".inputBackgroundImage").css("display","none");
      $(".inputBackgroundColor").css("display","inline");
        document.getElementsByName('.inputBackgroundImage').disabled = true;
        document.getElementsByName('.inputBackgroundColor').disabled= false; 
        
        $('.set').click(function(){
            document.body.style.backgroundImage = 'none';
            var colorValue = $('.inputBackgroundColor').val();
            document.body.style.backgroundColor= colorValue;
        });
    }        
   else{
        $('.inputBackgroundImage').css("display","inline");
        $('.inputBackgroundColor').css('display','none');
        document.getElementsByName('.inputBackgroundColor').disabled = true;
       document.getElementsByName('.inputBackgroundImage').disabled = false;
       
       // once the user clicks set button, adjust the background to the image
       $('.set').click(function(){
           document.body.style.backgroundColor = "none";
           var imageValue = $('.inputBackgroundImage').val();
           document.body.style.backgroundImage = "url("+imageValue+")";

       })
    }
}


// friend search
function searchFriend(){
    var input, filter, ul, li, a, i;
    input = document.getElementById("FriendSearchBar");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        p = li[i].getElementsByTagName("p")[0];
        if (p.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}