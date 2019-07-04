<%-- 
    Document   : managepermissions
    Created on : 06-Mar-2019, 15:28:18
    Author     : ndfmac
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<input type="hidden" value="<%= session.getAttribute("loadedUserID")%>" id="loadedUserID"/>
<input type="hidden" value="<%= session.getAttribute("loadedUserType")%>" id="loadedUserType"/>
<input type="hidden" value="<%= session.getAttribute("loadedUserName")%>" id="loadedUserName"/>
<%@include file="../../../jspf/users/permissions/perm_manage_perms.jspf" %>

