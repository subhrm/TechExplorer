var $ = require('jquery');
const HostURL = "http://10.74.18.40:5000";

function PostRequest(path, reqdata){
  var data;
  var url = HostURL + path;
  $.ajax({
            url:url,
            type:'POST',
            data:reqdata,
            contentType:'application/json',
            async:false,
            success:function(retObj){
                data=retObj;
            },
            error:function(err){
                data=err;
            }
        });
  return data;
}

function GetRequest(path, reqdata){
    var data;
    var url = HostURL + path;
    $.ajax({
              url:url,
              type:'GET',
              contentType:'application/json',
              data:reqdata,
              async:false,
              success:function(retObj){
                  data=retObj;
              },
              error:function(err){
                  data=err;
              }
          });
    return data;
  }

function PutRequest(path, reqdata){
    var data;
    var url = HostURL + path;
    $.ajax({
              url:url,
              type:'PUT',
              contentType:'application/json',
              data:reqdata,
              async:false,
              success:function(retObj){
                  data=retObj;
              },
              error:function(err){
                  data=err;
              }
          });
    return data;
  }  
  

module.exports={
    signup:PutRequest,

    login:PostRequest,
    saveprofile:PostRequest,
    savepreferences:PostRequest,
    logout:PostRequest,

    getcategories:GetRequest,
    gettechnologies:GetRequest,
    checkemail:GetRequest
}
