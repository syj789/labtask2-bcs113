$(function()
{
    loadrecipes();    //function will be called off when the page loads
    $("#recipes").on("click","button#del", handledel);
    $("#recipes").on("click","button#edit", handleupdate);
    $("#addbtn").click(addrecipe);
    $("#updatesave").click(function(){
        var id= $("#updateid").val();
        var title= $("#updatetitle").val();
        var body= $("#updatebody").val();
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/recipes/"+id,
            data: {title, body},
            method: "PUT",
            success: function(response)
            {
                console.log(response)
                loadrecipes();
                $("#updatemodal").modal("hide")
            }

        })
    })

});

function addrecipe() {
    var title = $("#title").val();
    var body = $("#body").val();
    $.ajax({
      url: "https://usman-recipes.herokuapp.com/api/recipes",
      method: "POST",
      data: { title, body },
      success: function(response) {
        console.log(response);
        $("#title").val("");
        $("#body").val("");
        loadRecipies();
        $("#addmodal").modal("show");
      }
    });
  }

function handledel(){
    
    var btn=$(this);
    var parentdiv=btn.closest(".recipe");
    let id=parentdiv.attr("data-id");
    console.log(id)
    console.log("handle delete")
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/"+id,
        method: "DELETE",
        success: function(){
            loadrecipes();
            $("#updatemodal").modal("hide")
        }
    });
}

function handleupdate(){

var btn=$(this);
    var parentdiv=btn.closest(".recipe");
    let id=parentdiv.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/recipes/" + id,function(response){
        $("#updateid").val(response._id);
        $("#updatetitle").val(response.title);
        $("#updatebody").val(response.body);
        $("#updatemodal").modal("show")
    })
}


function loadrecipes(){
    $.ajax({            //replacement of $.get() to get ajax request
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "GET",
        error: function(response){
            var recipes= $("#recipes");
            recipes.html("!!!An error has occured!!!")
        },
        success: function(response){
            console.log(response)
            var recipes= $("#recipes");
            recipes.empty();
            for(var i=0;i<response.length;i++)
            {
               var rec=response[i];
               
               // recipes.append("<div><h3>"+rec.title+ "<h6>"+rec.body+ "</h6>"+"</h3></div>")
                  recipes.append(`<div class ="recipe" data-id="${rec._id}"><h3>${rec.title}</h3><p>${rec.body}<br>
                  <button id="edit"class="btn btn-info">Edit</button><button id="del"class="btn btn-danger">Delete</button>
                   <hr>${rec.title.length}</p></div>`)
                 
            }
            
        }
    });
}