import React, { useState } from 'react';
var UserProfile = (function() {
    var userName = "";
    var role = "";
    var password = "";
  
    var getUserName = function() {
      return userName; 
    };
    var setUserName = function(username: string) {
       userName = username;     
    };
    var getRole = function() {
      return role;
    };
    var setRole = function(role: string) {
      role = role;
    };
    var getPassword = function() {
      return password;
    };
    var setPassword = function(password: string) {
      password = password;
    };

  
    return {
        getUserName: getUserName,
        setUserName: setUserName,
        getRole: getRole,
        setRole: setRole,
        getPassword: getPassword,
        setPassword: setPassword
    }
  
  })();
  
  export default UserProfile;