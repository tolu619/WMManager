/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import wmengine.Managers.*;

/**
 *
 * @author ndfmac
 */
public class PermissionsServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, ClassNotFoundException, SQLException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            HttpSession session = request.getSession(true);
            String caseType = request.getParameter("type").trim();
            String json = "";
            String json1 = "";
            String json2 = "";
            String result = "";
            switch (caseType) {
                case "GetAllPermissions": {
                    ArrayList<Integer> Ids = GeneralPermissionsManager.GetAllPermissions();
                    HashMap<Integer, Object> PermsList = new HashMap<>();
                    if (!Ids.isEmpty()) {
                        for (int id : Ids) {
                            HashMap<String, Object> perms = GeneralPermissionsManager.GetPermissionDetails(id);
                            if (!perms.isEmpty()) {
                                PermsList.put(id, perms);
                            }
                        }
                        json = new Gson().toJson(PermsList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "GetWMObjectTypes": {
                    ArrayList<Integer> Ids = GeneralPermissionsManager.GetObjectTypeIDS();
                    HashMap<Integer, Object> ObjectList = new HashMap<>();
                    if (!Ids.isEmpty()) {
                        for (int id : Ids) {
                            HashMap<String, String> objectTypes = GeneralPermissionsManager.ObjectTypeDetails(id);
                            if (!objectTypes.isEmpty()) {
                                ObjectList.put(id, objectTypes);
                            }
                        }
                        json = new Gson().toJson(ObjectList);
                    } else {
                        json = new Gson().toJson("empty");
                    }

                    break;
                }
                case "GetPermissions": {
                    String oid = request.getParameter("data");
                    int ObjectID = Integer.parseInt(oid);
                    ArrayList<Integer> Ids = GeneralPermissionsManager.GetObjectsPermission(ObjectID);
                    HashMap<Integer, Object> PermsList = new HashMap<>();
                    if (!Ids.isEmpty()) {
                        for (int id : Ids) {
                            HashMap<String, Object> perms = GeneralPermissionsManager.GetPermissionDetails(id);
                            if (!perms.isEmpty()) {
                                PermsList.put(id, perms);
                            }
                        }
                        json = new Gson().toJson(PermsList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "CreateWMObjectType": {
                    String objecttype = request.getParameter("data");
                    result = GeneralPermissionsManager.CreateWMObjectType(objecttype);
                    if (result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("New WM-Object");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "CreatePermission": {//[objectid, permname, userid];
                    String[] data = request.getParameterValues("data[]");
                    String objectid = data[0];
                    int ObjectID = Integer.parseInt(objectid);
                    String permname = data[1];
                    String userid = data[2];
                    String usergroupids = data[3];
                    String usergrpids = usergroupids.replaceAll(":", ",");
                    int UserID = Integer.parseInt(userid);
                    result = GeneralPermissionsManager.CreatePermission(ObjectID, permname, UserID, usergrpids);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("New Permission");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "EditPermissionName": {//[objectid, permname, userid];
                    String[] data = request.getParameterValues("data[]");
                    String objectid = data[0];
                    int PermID = Integer.parseInt(objectid);
                    String permname = data[1];
                    result = GeneralPermissionsManager.EditPermission(PermID, permname);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("Edit Permission");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "DeletePermission": {
                    String permid = request.getParameter("data");
                    int PermID = Integer.parseInt(permid);
                    result = GeneralPermissionsManager.DeleteObjectTypePermission(PermID);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("Delete Permission");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }

                case "GetPermGroupList": {
                    ArrayList<Integer> Ids = GeneralPermissionsManager.GetPermGroupIDS();
                    HashMap<Integer, Object> permGroupList = new HashMap<>();
                    if (!Ids.isEmpty()) {
                        for (int id : Ids) {
                            HashMap<String, String> det = GeneralPermissionsManager.PermGroupDetails(id);
                            permGroupList.put(id, det);
                        }
                        json = new Gson().toJson(permGroupList);
                    } else {
                        json = new Gson().toJson("empty");
                    }

                    break;
                }
                case "GetUserPemissionGroups": {
                    String userid = request.getParameter("data");
                    int UserID = Integer.parseInt(userid);
                    ArrayList<Integer> Ids = GeneralPermissionsManager.GetUserPermissionGroups(UserID);
                    HashMap<Integer, Object> permGroupList = new HashMap<>();
                    if (!Ids.isEmpty()) {
                        for (int id : Ids) {
                            HashMap<String, String> det = GeneralPermissionsManager.PermGroupDetails(id);
                            permGroupList.put(id, det);
                        }
                        json = new Gson().toJson(permGroupList);
                    } else {
                        json = new Gson().toJson("empty");
                    }

                    break;
                }
                case "GetUserGroupList": {
                    ArrayList<Integer> Ids = GeneralPermissionsManager.GetUserGroupIDS();
                    HashMap<Integer, Object> userGroupList = new HashMap<>();
                    if (!Ids.isEmpty()) {
                        for (int id : Ids) {
                            HashMap<String, String> det = GeneralPermissionsManager.UserGroupDetails(id);
                            userGroupList.put(id, det);
                        }
                        json = new Gson().toJson(userGroupList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }

                case "GetPermGroupPermissions": {
                    String permgroupid = request.getParameter("data");
                    int PermGroupID = Integer.parseInt(permgroupid);
                    HashMap<Integer, Object> PermsList = new HashMap<>();
                    String permissions = GeneralPermissionsManager.GetPermGroupPermIDS(PermGroupID);
                    String[] permarr = permissions.split(",");
                    ArrayList<Integer> permissionIds = new ArrayList<>();
                    for (String permid : permarr) {
                        String pid = permid.split("-")[1];
                        permissionIds.add(Integer.parseInt(pid));
                    }
                    if (!permissionIds.isEmpty()) {
                        for (int id : permissionIds) {
                            HashMap<String, Object> perms = GeneralPermissionsManager.GetPermissionDetails(id);
                            if (!perms.isEmpty()) {
                                PermsList.put(id, perms);
                            }
                        }
                        json = new Gson().toJson(PermsList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "GetUserGroupPermissions": {
                    String usergroupid = request.getParameter("data");
                    int UserGroupID = Integer.parseInt(usergroupid);
                    HashMap<Integer, Object> PermsList = new HashMap<>();
                    String permissions = GeneralPermissionsManager.GetUserGroupPermIDS(UserGroupID);
                    String[] arr = permissions.split(",");
                    ArrayList<Integer> permissionIds = new ArrayList<>();
                    for (String ss : arr) {
                        String pid = ss.split("-")[1];
                        permissionIds.add(Integer.parseInt(pid));
                    }
                    if (!permissionIds.isEmpty()) {
                        for (int id : permissionIds) {
                            HashMap<String, Object> perms = GeneralPermissionsManager.GetPermissionDetails(id);
                            if (!perms.isEmpty()) {
                                PermsList.put(id, perms);
                            }
                        }
                        json = new Gson().toJson(PermsList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "CreatePermissionGroup": {
                    String[] data = request.getParameterValues("data[]");
                    String permids = data[0];
                    String userids = data[1];
                    String permgroupname = data[2];
                    String usergroupid = data[3];
                    String PermIds = permids.replaceAll(":", ",");
                    String UserIds = userids.replaceAll(":", ",");
                    int UserGroupID = Integer.parseInt(usergroupid);
                    result = GeneralPermissionsManager.CreatePermissionGroup(PermIds, UserIds, permgroupname, UserGroupID);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("Create Permission Group");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "CreateUserGroup": {
                    String[] data = request.getParameterValues("data[]");
                    String permids = data[0];
                    String permgroupname = data[1];
                    String PermIds = permids.replaceAll(":", ",");
                    result = GeneralPermissionsManager.CreateUserGroup(PermIds, permgroupname);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("Create User Group");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "AssignPermsToObjectTypes": {
                    String[] data = request.getParameterValues("data[]");
                    String objids = data[0];
                    String ObjIds = objids.replaceAll(":", ",");
                    String permid = data[1];
                    int PermID = Integer.parseInt(permid);
                    String userid = data[2];
                    int UserID = Integer.parseInt(userid);
                    String mperm = data[3];
                    String ugroups = data[4];
                    String UserGroupids = ugroups.replaceAll(":", ",");
                    result = GeneralPermissionsManager.AssignPermToObjectType(ObjIds, PermID, UserID, mperm, UserGroupids);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, or one of the permissions has already been assigned, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("Assign Permission to Object Type(s)");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "AssignPermsToPermGroup": {
                    String[] data = request.getParameterValues("data[]");
                    String objids = data[0];
                    String ObjIds = objids.replaceAll(":", ",");
                    String permid = data[1];
                    String userid = data[2];
                    int UserID = Integer.parseInt(userid);
                    int PermID = Integer.parseInt(permid);
                    result = GeneralPermissionsManager.AssignPermissionToPermissionGroup(ObjIds, PermID, UserID);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, or one of the permissions has already been assigned, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("Assign Permission to Permission Group(s)");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "AssignPermsToUserGroup": {
                    String[] data = request.getParameterValues("data[]");
                    String objids = data[0];
                    String ObjIds = objids.replaceAll(":", ",");
                    String permid = data[1];
                    String userid = data[2];
                    int UserID = Integer.parseInt(userid);
                    int PermID = Integer.parseInt(permid);
                    result = GeneralPermissionsManager.AssignPermToUserGroup(ObjIds, PermID, UserID);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, or one of the permissions has already been assigned, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("Assign Permission to User Group(s)");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "GetUserPemissions": {
                    String userid = request.getParameter("data");
                    int UserID = Integer.parseInt(userid);
                    HashMap<Integer, Object> PermsList = new HashMap<>();
                    ArrayList<String> permissionIds = GeneralPermissionsManager.GetUserPermissions(UserID);
                    if (!permissionIds.isEmpty()) {
                        for (String id : permissionIds) {
                            int pid = Integer.parseInt(id);
                            HashMap<String, Object> perms = GeneralPermissionsManager.GetPermissionDetails(pid);
                            if (!perms.isEmpty()) {
                                PermsList.put(pid, perms);
                            }
                        }
                        json = new Gson().toJson(PermsList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "RemoveLoadedObjectPermission": {
                    String[] data = request.getParameterValues("data[]");
                    String selectedid = data[0];
                    String loadedid = data[1];
                    String loadedtype = data[2];
                    int LoadedID = Integer.parseInt(loadedid);
                    int PermID = Integer.parseInt(selectedid);
                    result = GeneralPermissionsManager.RemoveLoadedObjectPermissions(PermID, LoadedID, loadedtype);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("Remove Permission");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }

                case "ClearUserSpecialPermissions": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0];
                    String usertype = data[1];
                    int UserID = Integer.parseInt(userid);
                    result = GeneralPermissionsManager.ClearUserSpecialPermissions(UserID, usertype);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("Clear Special Permissions");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "AddUserSpecialPermissions": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0];
                    String usertype = data[1];
                    String permid = data[2];
                    String actionType = data[3];
                    int UserID = Integer.parseInt(userid);
                    int PermID = Integer.parseInt(permid);
                    result = GeneralPermissionsManager.AddUserSpecialPermissions(UserID, usertype, PermID, actionType);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, or the permission has already been set, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("Update Permissions");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "AddUserPermissionGroup": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0];
                    String usertype = data[1];
                    String pgids = data[2];
                    String PermGroupIDs = pgids.replaceAll(":", ",");
                    String actionType = data[3];
                    int UserID = Integer.parseInt(userid);
                    result = GeneralPermissionsManager.AddUserPermissionGroup(UserID, usertype, PermGroupIDs, actionType);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, or the permission has already been set, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("Add New Permissions");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "AddRequestedPermission": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0];
                    String permName = data[1];
                    String permDesc = data[2];
                    int UserID = Integer.parseInt(userid);
                    result = GeneralPermissionsManager.AddRequestedPermission(UserID, permName, permDesc);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("Request New Permission");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "GetUserRequestedPemissions": {
                    String userid = request.getParameter("data");
                    int BizUserID = Integer.parseInt(userid);
                    HashMap<Integer, Object> List = new HashMap<>();
                    ArrayList<Integer> IDs = GeneralPermissionsManager.GetRequestedPermissions(BizUserID);
                    if (!IDs.isEmpty()) {
                        for (int id : IDs) {
                            HashMap<String, String> perms = GeneralPermissionsManager.GetRequestedPermissionDetails(id);
                            if (!perms.isEmpty()) {
                                List.put(id, perms);
                            }
                        }
                        json = new Gson().toJson(List);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "GetAllRequestedPemissions": {
                    HashMap<Integer, Object> List = new HashMap<>();
                    ArrayList<Integer> IDs = GeneralPermissionsManager.GetAllRequestedPermissions();
                    if (!IDs.isEmpty()) {
                        for (int id : IDs) {
                            HashMap<String, String> perms = GeneralPermissionsManager.GetRequestedPermissionDetails(id);
                            if (!perms.isEmpty()) {
                                List.put(id, perms);
                            }
                        }
                        json = new Gson().toJson(List);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "GetUserGroupStaffPermissions": {
                    String[] data = request.getParameterValues("data[]");
                    String staffuserid = data[0];
                    String usergroupid = data[1];
                    String usergroup = data[2];
                    int staffUserID = Integer.parseInt(staffuserid);
                    int UserGroupID = Integer.parseInt(usergroupid);
                    HashMap<Integer, Object> PermsList = new HashMap<>();
                    ArrayList<String> permissionIds = GeneralPermissionsManager.GetUserGroupStaffPermissions(usergroup, staffUserID, UserGroupID);
                    if (!permissionIds.isEmpty()) {
                        for (String id : permissionIds) {
                            int pid = Integer.parseInt(id);
                            HashMap<String, Object> perms = GeneralPermissionsManager.GetPermissionDetails(pid);
                            if (!perms.isEmpty()) {
                                PermsList.put(pid, perms);
                            }
                        }
                        json = new Gson().toJson(PermsList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "UpdateRequestedPermission": {
                    String[] data = request.getParameterValues("data[]");
                    String reqid = data[0];
                    String Action = data[1];
                    int ReqID = Integer.parseInt(reqid);
                    if (Action.equals("Approve")) {
                        result = GeneralPermissionsManager.UpdateRequestedPermission(ReqID, "In-Progress");
                    } else if (Action.equals("Delete")) {
                        result = GeneralPermissionsManager.DeleteRequestedPermission(ReqID);
                    } else if (Action.equals("Reject")) {
                        result = GeneralPermissionsManager.UpdateRequestedPermission(ReqID, "Rejected");
                    } else if (Action.equals("Complete")) {
                        String status = GeneralPermissionsManager.GetRequestedPermission(ReqID);
                        if (status.equals("In-Progress")) {
                            result = GeneralPermissionsManager.UpdateRequestedPermission(ReqID, "Completed");
                        }
                    }
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    String json3 = new Gson().toJson("Update Requested Permission Status");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "GetUserRequestedChanges": {
                    String userid = request.getParameter("data");
                    int UserID = Integer.parseInt(userid);
                    HashMap<Integer, Object> List = new HashMap<>();
                    ArrayList<Integer> IDs = GeneralUserManager.GetRequestedChanges(UserID);
                    if (!IDs.isEmpty()) {
                        for (int id : IDs) {
                            HashMap<String, String> changes = GeneralUserManager.GetRequestedChangesDetails(id);
                            if (!changes.isEmpty()) {
                                List.put(id, changes);
                            }
                        }
                        json = new Gson().toJson(List);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
            }
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(PermissionsServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(PermissionsServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(PermissionsServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(PermissionsServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
