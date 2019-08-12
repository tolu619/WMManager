/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Models;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import wmengine.Managers.GeneralUserManager;

/**
 *
 * @author Saint
 */
@WebServlet(name = "LinksServlet", urlPatterns = {"/LinksServlet"})
public class LinksServlet extends HttpServlet {

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
            String type = request.getParameter("type");
            switch (type) {
                case "Login": {
                    response.sendRedirect("index.jsp");
                    break;
                }
                case "Offline": {
                    response.sendRedirect("pages/general/offline.jsp");
                    break;
                }
                case "Dashboard": {
                    response.sendRedirect("pages/users/dashboard/dashboard.jsp");
                    break;
                }
                case "Messages": {
                    response.sendRedirect("pages/users/messages/messages.jsp");
                    break;
                }
                case "Compose": {
                    session.setAttribute("servProvEmail", "");
                    session.setAttribute("tempText", "");
                    response.sendRedirect("pages/users/messages/compose.jsp");
                    break;
                }
                case "Compose1": {
                    session.setAttribute("servProvEmail", request.getParameter("servProvEmail"));
                    session.setAttribute("tempText", request.getParameter("emailSubject"));
                    response.sendRedirect("pages/users/messages/compose.jsp");
                    break;
                }
                case "Sent": {
                    response.sendRedirect("pages/users/messages/sent.jsp");
                    break;
                }
                case "Trash": {
                    response.sendRedirect("pages/users/messages/trash.jsp");
                    break;
                }
                case "AllMessages": {
                    response.sendRedirect("pages/users/messages/allmessages.jsp");
                    break;
                }
                case "AllSent": {
                    response.sendRedirect("pages/users/messages/allsent.jsp");
                    break;
                }
                case "AllTrash": {
                    response.sendRedirect("pages/users/messages/alltrash.jsp");
                    break;
                }
                case "Shop": {
                    response.sendRedirect("pages/users/shop/shop.jsp");
                    break;
                }
                case "Products-Listing": {
                    response.sendRedirect("pages/users/shop/product_listing.jsp");
                    break;
                }
                case "Services": {
                    response.sendRedirect("pages/users/shop/services.jsp");
                    break;
                }
                case "Services_Categories": {
                    response.sendRedirect("pages/users/shop/services_categories.jsp");
                    break;
                }
                case "Complaints": {
                    response.sendRedirect("pages/users/shop/complaints.jsp");
                    break;
                }
                case "Orders": {
                    response.sendRedirect("pages/users/shop/orders.jsp");
                    break;
                }
                case "Categories": {
                    response.sendRedirect("pages/users/shop/categories.jsp");
                    break;
                }
                case "Suppliers": {
                    response.sendRedirect("pages/users/shop/suppliers.jsp");
                    break;
                }
                case "Deals": {
                    response.sendRedirect("pages/users/shop/deals.jsp");
                    break;
                }
                case "PickUp": {
                    response.sendRedirect("pages/users/shop/pickup.jsp");
                    break;
                }
                case "Members": {
                    response.sendRedirect("pages/users/members/members.jsp");
                    break;
                }
                case "Business": {
                    response.sendRedirect("pages/users/members/businesses.jsp");
                    break;
                }
                case "Agencies": {
                    response.sendRedirect("pages/users/members/agencies.jsp");
                    break;
                }
                case "Admins": {
                    response.sendRedirect("pages/users/members/admins.jsp");
                    break;
                }
                case "Permissions": {
                    response.sendRedirect("pages/users/permissions/permissions.jsp");
                    break;
                }
                case "PermissionGroups": {
                    response.sendRedirect("pages/users/permissions/permissiongroups.jsp");
                    break;
                }
                case "UserGroups": {
                    response.sendRedirect("pages/users/permissions/usergroups.jsp");
                    break;
                }
                case "ManagePermissions": {
                    session.setAttribute("loadedUserID", request.getParameter("loadedUserID"));
                    session.setAttribute("loadedUserType", request.getParameter("loadedUserType"));
                    session.setAttribute("loadedUserName", request.getParameter("loadedUserName"));
                    response.sendRedirect("pages/users/permissions/managepermissions.jsp");
                    break;
                }
                case "ProposedPermissions": {
                    response.sendRedirect("pages/users/permissions/proposedpermissions.jsp");
                    break;
                }
                case "Profile": {
                    session.setAttribute("actualUserID", request.getParameter("actualUserID"));
                    session.setAttribute("actualUserType", request.getParameter("actualUserType"));
                    session.setAttribute("actualUserName", request.getParameter("actualUserName"));
                    response.sendRedirect("pages/users/profile/profile.jsp");
                    break;
                }
                case "Profile-Accounts": {
                    response.sendRedirect("pages/users/profile/prof_accounts.jsp");
                    break;
                }
                case "Profile-Staff": {
                    response.sendRedirect("pages/users/profile/prof_staff.jsp");
                    break;
                }
                case "Profile-Messages": {
                    response.sendRedirect("pages/users/profile/prof_messages.jsp");
                    break;
                }
                case "Profile-Businesses": {
                    response.sendRedirect("pages/users/profile/prof_businesses.jsp");
                    break;
                }
                case "Profile-Favorites": {
                    response.sendRedirect("pages/users/profile/prof_favorites.jsp");
                    break;
                }
                case "Profile-History": {
                    response.sendRedirect("pages/users/profile/prof_history.jsp");
                    break;
                }
                case "Profile-Products": {
                    response.sendRedirect("pages/users/profile/prof_products.jsp");
                    break;
                }
                case "Profile-Services": {
                    response.sendRedirect("pages/users/profile/prof_services.jsp");
                    break;
                }
                case "Profile-Listings": {
                    response.sendRedirect("pages/users/profile/prof_listings.jsp");
                    break;
                }
                case "Profile-Schemes": {
                    response.sendRedirect("pages/users/profile/prof_schemes.jsp");
                    break;
                }
                case "Profile-Permissions": {
                    response.sendRedirect("pages/users/profile/prof_permissions.jsp");
                    break;
                }
                case "Profile-Contacts": {
                    response.sendRedirect("pages/users/profile/prof_contacts.jsp");
                    break;
                }
                case "Profile-ManagePermissions": {
                    session.setAttribute("StaffUserID", request.getParameter("StaffUserID"));
                    session.setAttribute("StaffUserName", request.getParameter("StaffUserName"));
                    response.sendRedirect("pages/users/profile/prof_manage_permissions.jsp");
                    break;
                }
                case "MyBids": {
                    response.sendRedirect("pages/users/warrantsMarket/mybids.jsp");
                    break;
                }
                case "AllBids": {
                    response.sendRedirect("pages/users/warrantsMarket/allbids.jsp");
                    break;
                }
                case "WarrantsMarket": {
                    response.sendRedirect("pages/users/warrantsMarket/warrantsMarket.jsp");
                    break;
                }
                case "MyListings": {
                    response.sendRedirect("pages/users/warrantsMarket/mylistings.jsp");
                    break;
                }
                case "Warrants": {
                    response.sendRedirect("pages/users/warrantsMarket/warrants.jsp");
                    break;
                }
                case "Accounts": {
                    response.sendRedirect("pages/users/accounts/accounts.jsp");
                    break;
                }
                case "Transactions": {
                    response.sendRedirect("pages/users/accounts/transactions.jsp");
                    break;
                }
                case "Semple": {
                    response.sendRedirect("pages/users/schemes/semple.jsp");
                    break;
                }
                case "UPPEP": {
                    response.sendRedirect("pages/users/schemes/uppep.jsp");
                    break;
                }
                case "MANSAR": {
                    response.sendRedirect("pages/users/schemes/mansar.jsp");
                    break;
                }
                case "Mobilisation": {
                    response.sendRedirect("pages/users/schemes/mobilisation.jsp");
                    break;
                }
                case "Commoditisation": {
                    response.sendRedirect("pages/users/schemes/commoditisation.jsp");
                    break;
                }
                case "Monetisation": {
                    response.sendRedirect("pages/users/schemes/monetisation.jsp");
                    break;
                }
                case "Books": {
                    response.sendRedirect("pages/users/write/books.jsp");
                    break;
                }
                case "Articles": {
                    response.sendRedirect("pages/users/write/articles.jsp");
                    break;
                }
                case "Bookmarks": {
                    response.sendRedirect("pages/users/write/bookmarks.jsp");
                    break;
                }
                case "Keywords": {
                    response.sendRedirect("pages/users/write/keywords.jsp");
                    break;
                }
                case "Sections": {
                    response.sendRedirect("pages/users/write/sections.jsp");
                    break;
                }
                case "Tags": {
                    response.sendRedirect("pages/users/write/tags.jsp");
                    break;
                }
                case "Comments": {
                    response.sendRedirect("pages/users/write/comments.jsp");
                    break;
                }
                case "Indexes": {
                    response.sendRedirect("pages/users/write/indexes.jsp");
                    break;
                }
                case "MonetisationRules": {
                    response.sendRedirect("pages/users/schemes/monetisation_rules.jsp");
                    break;
                }
                case "MonetisationNewRule": {
                    response.sendRedirect("pages/users/schemes/monetisation_new_rule.jsp");
                    break;
                }
                case "MonetisationVerify": {
                    response.sendRedirect("pages/users/schemes/monetisation_verify.jsp");
                    break;
                }
                case "MonetisationApplication": {
                    session.setAttribute("actualUserID", request.getParameter("actualUserID"));
                    response.sendRedirect("pages/users/schemes/monetisation_application.jsp");
                    break;
                }
                case "MonetisationUserApplications": {
                    session.setAttribute("actualUserID", request.getParameter("actualUserID"));
                    response.sendRedirect("pages/users/schemes/my_monetisation_applications.jsp");
                    break;
                }

                case "Search": {
                    session.setAttribute("categoryID", request.getParameter("cat"));
                    session.setAttribute("query", request.getParameter("query"));
                    response.sendRedirect("pages/products/products.jsp");
                    break;
                }
                case "LogOut": {
                    session.removeAttribute("Id");
                    session.removeAttribute("UserType");
                    session.removeAttribute("userName");
                    session.removeAttribute("subclass");
                    response.sendRedirect("index.jsp");
                    break;
                }
                case "Index": {
                    int UserID = Integer.parseInt("" + session.getAttribute("Id"));
                    GeneralUserManager.UpdateUserStatus(UserID, "Offline");
                    session.setAttribute("UserOnlineOrOffline", "");
                    GeneralUserManager.UpdateUserTime(UserID);
                    session.removeAttribute("Id");
                    session.removeAttribute("UserType");
                    session.removeAttribute("userName");
                    session.removeAttribute("subclass");
                    response.sendRedirect("index.jsp");
                    break;
                }
                default: {
                    response.sendRedirect(request.getHeader("referer"));
                }
            }
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
            Logger.getLogger(LinksServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(LinksServlet.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(LinksServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(LinksServlet.class.getName()).log(Level.SEVERE, null, ex);
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
