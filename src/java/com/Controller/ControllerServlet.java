/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Controller;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Saint
 */
@WebServlet(name = "ControllerServlet", urlPatterns = {"/ControllerServlet"})
public class ControllerServlet extends HttpServlet {

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
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            String actionPerformed = request.getParameter("action").trim();           
            switch (actionPerformed) {
                case "Accounts": {
                    getServletContext().getRequestDispatcher("/AccountServlet").forward(request, response);
                    break;
                }
                case "User": {
                    getServletContext().getRequestDispatcher("/UserServlet").forward(request, response);
                    break;
                }
                case "Product": {
                    getServletContext().getRequestDispatcher("/ProductServlet").forward(request, response);
                    break;
                }
                case "Order": {
                    getServletContext().getRequestDispatcher("/OrderServlet").forward(request, response);
                    break;
                }
                case "Service": {
                    getServletContext().getRequestDispatcher("/ServiceServlet").forward(request, response);
                    break;
                }
                case "Favorite": {
                    getServletContext().getRequestDispatcher("/FavoritesServlet").forward(request, response);
                    break;
                }
                case "Link": {
                    getServletContext().getRequestDispatcher("/LinksServlet").forward(request, response);
                    break;
                }
                case "Category": {
                    getServletContext().getRequestDispatcher("/CategoryServlet").forward(request, response);
                    break;
                }
                case "Warrants": {
                    getServletContext().getRequestDispatcher("/WarrantsServlet").forward(request, response);
                    break;
                }
                case "Schemes": {
                    getServletContext().getRequestDispatcher("/SchemesServlet").forward(request, response);
                    break;
                }
                case "Messages": {
                    getServletContext().getRequestDispatcher("/MessageServlet").forward(request, response);
                    break;
                }
                case "Write": {
                    getServletContext().getRequestDispatcher("/WriteServlet").forward(request, response);
                    break;
                }
                case "Permissions": {
                    getServletContext().getRequestDispatcher("/PermissionsServlet").forward(request, response);
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
        processRequest(request, response);
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
        processRequest(request, response);
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
