$(document).ready(function() {
  // global vars 
  var userToSearch = $("input#userToSearch");

  var userSearchResult = $("#user-search-result");

  var categoryToSearch = $("input#categoryToSearch");

  var categorySearchResult = $("#category-search-result");

  $(document).on("submit", "#user-search", userSearch);

  $(document).on("submit", "#category-search", categorySearch);

  $(document).on("click", "#modify-user-submit", updateUser);

  $(document).on("click", "#modify-category-submit", updateCategory);


  var userdata;
  var categorydata;

  // This is what changes the result that is displayed for the result for user search
  // You can change this
  // ============================================================================
  function userinitializeRows(name, email, isAdmin, id, img, dob, created) {
    userSearchResult.empty();
    userSearchResult.append("<img src = '"+img+"' height = '200px' width ='auto'>");
    userSearchResult.append("<h3>"+name+"</h3>");
    userSearchResult.append("<li> Email : "+email+"</li>");
    userSearchResult.append("<li> Admin Status : "+isAdmin+"</li>");
    userSearchResult.append("<li> Unique User Id : "+id+"</li>");
    userSearchResult.append("<li> Date of Birth : "+dob+"</li>");
    userSearchResult.append("<li> Account Created : "+created+"</li>");    
  }
// ================================================================================

// This actually looks for the user
// Do not change this
  function userSearch(event) {
    event.preventDefault();
    var user = userToSearch.val().trim()

    $.get("/admin/user/search/"+user, function() {
    	console.log("pinging the server")
    }).then(function(data){
      console.log("User data :", data);
      userdata = data;
// You can change this next line to take in more / less arguments
// ======================================================================================================
      userinitializeRows(data.username, data.email, data.isAdmin, data.id, data.img_url, data.dob, data.created_at);
      // ====================================================================================================
// Do not change anything after this line
    });
    currentuser = userToSearch.val().trim();
    userToSearch.val("");
  }


  // This is what changes the result that is displayed for the result for catergories
  // You can change this
  // ============================================================================
  function categoryinitializeRows(name, id, img, description, created) {
    categorySearchResult.empty();
    categorySearchResult.append("<img src = '"+img+"' height = '200px' width ='auto'>");
    categorySearchResult.append("<h3>"+name+"</h3>");
    categorySearchResult.append("<li> Unique Category Id : "+id+"</li>");
    categorySearchResult.append("<li> Description : "+description+"</li>");
    categorySearchResult.append("<li> Account Created : "+created+"</li>");       
  }
// ================================================================================

// This actually looks for the category
// Do not change this
  function categorySearch(event) {
    event.preventDefault();

    var category = categoryToSearch.val().trim()

    $.get("/admin/category/search/"+category, function() {
      console.log("pinging the server")
    }).then(function(data){
      console.log("Category data : ", data);
      categorydata = data;
// You can change this next line to take in more / less arguments
// ======================================================================================================
      categoryinitializeRows(data.name,data.id, data.image, data.description, data.created_at);
      // ====================================================================================================
// Do not change anything after this line
    });
    categoryToSearch.val("");
  }
// This updates the user if you updated it on the page do not change this
// ================================================================================================
function updateUser(event){
  event.preventDefault();
  var currentuser = $("#userToModify").val().trim();
  var newpass = $("#modpassword_hash").val().trim();
  var newimg= $("#modimg_url").val().trim();
  $.ajax({
      method:"PUT",
      url:"/admin/modifyuser",
      data: {
        username: currentuser,
        password_hash: newpass,
        img_url: newimg
      }
  }).done(function(){
    console.log("all finished");
  });
} 
// This updates the category if you updated it on the page do not change this
// ==============================================================
function updateCategory(event){
  event.preventDefault();
  var currentcategory = $("#catToModify").val().trim();
  var newdescription = $("#moddescription").val().trim();
  var newimg= $("#modimg_urlcat").val().trim();
  $.ajax({
      method:"PUT",
      url:"/admin/modifycategory",
      data: {
        name: currentcategory,
        description: newdescription,
        image: newimg
      }
  }).done(function(){
    console.log("all finished");
  });
} 


});