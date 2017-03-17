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

  $(document).on("click", ".delete-user-button", deleteUser);

  $(document).on("click", ".delete-category-button", deleteCategory);


  $(document).on("click", ".update-category-button", modCategory);

    $(document).on("click", ".update-user-button", modUser);

  var userdata;
  var categorydata;

  // This is what changes the result that is displayed for the result for user search
  // You can change this
  // ============================================================================
  function userinitializeRows(name, email, isAdmin, id, img, dob, created) {
    userSearchResult.empty();
    userSearchResult.append("<img src = '"+img+"' height = '200px' width ='auto'>");
    userSearchResult.append("<h3>"+name+"</h3>");
    userSearchResult.append("<ul> Email : "+email+"</ul>");
    userSearchResult.append("<ul> Admin Status : "+isAdmin+"</ul>");
    userSearchResult.append("<ul> Unique User Id : "+id+"</ul>");
    userSearchResult.append("<ul> Date of Birth : "+dob+"</ul>");
    userSearchResult.append("<ul> Account Created : "+created+"</ul>");    
  }
// ================================================================================

// This actually looks for the user
// Do not change this
  function userSearch(event) {
    event.preventDefault();
    var user = userToSearch.val().trim();

    $.get("/admin/user/search/"+user, function() {
    	console.log("pinging the server")
    }).then(function(data){
      if (data){
      console.log("User data :", data);
      userdata = data;
// You can change this next line to take in more / less arguments
// ======================================================================================================
      userinitializeRows(data.username, data.email, data.isAdmin, data.id, data.img_url, data.dob, data.created_at);
      // ====================================================================================================
    }else{
      alert("That is not a registered user");
    }
// Do not change anything after this line
    });
    userToSearch.val("");
  }


  // This is what changes the result that is displayed for the result for catergories
  // You can change this
  // ============================================================================
  function categoryinitializeRows(name, id, img, description, created) {
    categorySearchResult.empty();
    categorySearchResult.append("<img src = '"+img+"' height = '200px' width ='auto'>");
    categorySearchResult.append("<h3>"+name+"</h3>");
    categorySearchResult.append("<ul> Unique Category Id : "+id+"</ul>");
    categorySearchResult.append("<ul> Description : "+description+"</ul>");
    categorySearchResult.append("<ul> Category Created : "+created+"</ul>");       
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
      if (data){
      console.log("Category data : ", data);
      categorydata = data;
// You can change this next line to take in more / less arguments
// ======================================================================================================
      categoryinitializeRows(data.name,data.id, data.image, data.description, data.created_at);
      // ====================================================================================================
// Do not change anything after this line
    }else{
      alert("That is not a registered category");
    }
    });
    categoryToSearch.val("");
  }
// This updates the user if you updated it on the page do not change this
// ================================================================================================
function updateUser(event){
  event.preventDefault();
  var currentuser = $("#userToModify").val().trim();
  var newimg= $("#modimg_url").val().trim();
  $.ajax({
      method:"PUT",
      url:"/admin/modifyuser",
      data: {
        username: currentuser,
        img_url: newimg
      }
  }).then(function(data) {
    if (!data) {
      return;
    }

    window.location.href = "/admin";
  })
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
  }).then(function(data) {
    if (!data) {
      return;
    }

    window.location.href = "/admin";
  })
} 

function deleteUser(event){
  event.preventDefault();
  var userToDelete = $(this).data();
  console.log(userToDelete.uid);
  $.ajax({
    method:"DELETE",
    url:"/admin/deleteuser",
    data:{
      id: userToDelete.uid
    }
  }).then(function(data) {
    if (!data) {
      return;
    }

    window.location.href = "/admin";
  })
}
function deleteCategory(event){
  event.preventDefault();
  var categoryToDelete = $(this).data();
  console.log(categoryToDelete.uid);
  $.ajax({
    method:"DELETE",
    url:"/admin/deletecategory",
    data:{
      id: categoryToDelete.uid
    }
  }).then(function(data) {
    if (!data) {
      return;
    }

    window.location.href = "/admin";
  })
}

function modCatRows(name, description, image, id){
  $("#category-"+id).empty();
  $("#category-"+id).append("<img class = 'picDisplay' src='"+image+"' height = '150px' width ='auto'>"+
      "<form id ='#modifyCategoryForm'>"+
      "<a class ='nameDisplay' href=''> Current Name: "+name+"</a><br>"+      
      "<input type='text' name='modcat' placeholder='"+name+"' id ='catToModify'></input><br><br>"+
      "<ul class = 'descriptionDisplay'>Description : Current Description: "+ description+"</ul>"+
      "<textarea name='moddescription' placeholder='"+description+"' id ='moddescription'></textarea><br><br>"+
      "<input type='url' name='modimg_url' placeholder='"+image+"' id ='modimg_urlcat'></input><br><br>"+
      "<input id = 'modify-category-submit' type='submit'></input>"+
      "</form>" );


}
function modUserRows(name, email, admin, id, image, dob){
  $("#category-"+id).empty();
  $("#category-"+id).append("<img class = 'picDisplay' src='"+image+"' height = '150px' width ='auto'>"+
  "<form id ='#modifyUserForm'>"+
      "<a class ='nameDisplay' href=''> Current Name: "+name+"</a><br>"+   
    "<input type='text' name='modusername' placeholder='"+name+"' id ='userToModify'></input><br><br>"+
    "<ul class = 'emailDisplay'>Email : "+ email+"</ul>"+
     " <ul class = 'idDisplay'>Unique User Id :"+id+"</ul>"+
      "<ul class = 'adminDisplay'> Admin : "+ admin+"</ul>"+
    "<input type='url' name='modimg_url' placeholder='"+image+"' id ='modimg_url'></input><br><br>"+
    "<input id = 'modify-user-submit' type='submit'></input>"+
  "</form>" );


}

function modUser(event){
  event.preventDefault();
  var userid = $(this).data();
    $.get("/api/users/"+userid, function() {
      console.log("pinging the server")
    }).then(function(data){
      console.log("Data :", data);
      data = data;
// You can change this next line to take in more / less arguments
// ======================================================================================================
      modUserRows(data[0].username, data[0].email, data[0].isAdmin, data[0].id, data[0].img_url, data[0].dob);
      // ====================================================================================================
});
}

function modCategory(event){
  event.preventDefault();
  var catid = $(this).data();
    $.get("/api/categories/"+catid, function() {
      console.log("pinging the server")
    }).then(function(data){
      console.log("Data :", data);
      data = data;
// You can change this next line to take in more / less arguments
// ======================================================================================================
      modCatRows(data[0].name, data[0].description, data[0].image, data[0].id);
      // ====================================================================================================
      console.log(data[0].id);
});
}
});