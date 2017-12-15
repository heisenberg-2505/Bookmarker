//Listen for form submit
// Important -  THE LOCAL STORAGE ONLY STORES INFORMATION IN THE FORM OF STRING. SO WHENEVER WE STORE INFORMATION IN
// 				LOCAL STORAGE WE CONVERT THE JSON FORMAT TO STRING FORMAT AND VICE VERSA.

document.getElementById('myForm').addEventListener('submit', saveBookmark);

//function to save a bookmark on button submit click
function saveBookmark(event)
{
	// Get values form form
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteURL').value;

	// Error handling or checking whether the input is correct or not.
	// If any of the field in the form is empty then give an alert and return.
	if(!siteName || !siteUrl)
	{
		alert("Please fill the form completely to save the bookmark!!");
		return;
	}

	//Checking if the user entered a valid url in the url field by pattern matching using regex.
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);// Creating a regex object.
	if(!siteUrl.match(regex))// IF the entered url is not valid then alert and return 
	{
		alert("Please enter a valid URL!!");
		return;
	}


	//Making a bookmark object
	var bookmark = {name : siteName, url : siteUrl};

	if(localStorage.getItem('bookmarks') === null)// If there is no bookmark added 
	{
		var bookmarks = [];//Create a bookmark array to store the bookmark object.
		bookmarks.push(bookmark);// Add the new bookmark to the array.
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));// Save to local storage.
	}
	else // If there are bookmarks present.
	{	
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));// Get the old bookmarks.
		bookmarks.push(bookmark);// Add the new bookmark.
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));// Save to local storage.
	}

	// prevent form from submitting
	event.preventDefault();
	//Clear the form fields after saving the bookmark.
	document.getElementById("myForm").reset();
	// Update the list of bookmarks on the app page
	showBookmarks();
}

//function to show bookmarks on index.html
function showBookmarks()
{
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	var bookmarksResult = document.getElementById('bookmarksResult');
	bookmarksResult.innerHTML = "";
	//Iterating over every saved bookmark and displaying it.
	for(var i = 0; i < bookmarks.length; i++)
	{
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		bookmarksResult.innerHTML += '<div class="well">'+'<h3>'
									 + name + ' <a class = "btn btn-default" target = "_blank" href = "' + url + '"> Visit </a>'
									 + ' <a class = "btn btn-danger" href = "#" onclick = "deleteBookmark(\''+url+'\')"> Delete </a>' 
									 + '</h3>' + '</div>';
	}
}

//function to delete a bookmark
function deleteBookmark(url)
{
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	// Iterating over the bookmarks array to find the selected url.
	for(var i = 0; i < bookmarks.length; i++)
	{
		if(bookmarks[i].url == url) // If found then delete it from the object array.
			bookmarks.splice(i, 1);
	}
	//Store the updated array in the local storage.
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	//After deleting update the bookmarks list on the page.
	showBookmarks();
}