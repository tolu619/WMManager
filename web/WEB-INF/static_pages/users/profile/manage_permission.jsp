<%-- 
    Document   : manage_permission
    Created on : 16-Apr-2019, 15:07:10
    Author     : ndfmac
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<input type="hidden"  value="<%= session.getAttribute("StaffUserID")%>" id="StaffUserID"/>
<input type="hidden"  value="<%= session.getAttribute("StaffUserName")%>" id="StaffUserName"/>

<%@include file="../../../jspf/users/profile/profile_manage_permission.jspf" %>

