var $ = require('jquery');
const HostURL = "http://10.74.18.40:5000";

function PostRequest(path, reqdata){
  var data;
  var url = HostURL + path;
  $.ajax({
            url:url,
            type:'POST',
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

function GetRequest(path, reqdata){
    var data;
    var url = HostURL + path;
    $.ajax({
              url:url,
              type:'GET',
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
    logout:PostRequest,

    getcategories:GetRequest,
    gettechnologies:GetRequest,
    checkemail:GetRequest
}
