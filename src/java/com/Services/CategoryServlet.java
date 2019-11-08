/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import wmengine.Managers.GeneralCategoryManager;
import wmengine.Managers.GeneralProductManager;

/**
 *
 * @author Stephen
 */
public class CategoryServlet extends HttpServlet {

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
            throws ServletException, IOException, ClassNotFoundException, SQLException, UnsupportedEncodingException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            HttpSession session = request.getSession(true);
            String temp = "" + session.getAttribute("Id");
            String json = "";
            String json1 = "";
            String json2 = "";
            String json3 = "";
            String type = request.getParameter("type").trim();
            String empty = "none";
            switch (type) {
                case "GetShopCategories": {
                    HashMap<Integer, HashMap<String, String>> CategoryList = new HashMap<>();
                    HashMap<Integer, HashMap<String, String>> Subcategories = new HashMap<>();
                    HashMap<Integer, ArrayList<Integer>> categorySubs = new HashMap<>();
                    ArrayList<Integer> CategoryIds = GeneralCategoryManager.GetAllCategoriesIds();
                    if (!CategoryIds.isEmpty()) {
                        HashMap<String, String> Details = new HashMap<>();
                        for (int categoryId : CategoryIds) {
                            Details = GeneralCategoryManager.GetCategoryDetails(categoryId);
                            CategoryList.put(categoryId, Details);
                            ArrayList<Integer> subCategoryIds = GeneralCategoryManager.GetSubCategoryIds(categoryId);
                            if (!subCategoryIds.isEmpty()) {
                                for (int subcategoryId : subCategoryIds) {
                                    HashMap<String, String> Subdetails = GeneralCategoryManager.GetSubCategoryDetails(subcategoryId);
                                    Subcategories.put(subcategoryId, Subdetails);
                                }
                            }
                            categorySubs.put(categoryId, subCategoryIds);
                        }
                        json1 = new Gson().toJson(CategoryList);
                        json2 = new Gson().toJson(Subcategories);
                        json3 = new Gson().toJson(categorySubs);
                        json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetTopCategories": {
                    ArrayList<Integer> TopCatIds = GeneralProductManager.GetAllTopCatategoryIDs();
                    HashMap<Integer, String> data = new HashMap<>();
                    if (!TopCatIds.isEmpty()) {
                        for (int catid : TopCatIds) {
                            String catName = GeneralCategoryManager.GetCategoryName(catid);
                            data.put(catid, catName);
                        }
                        json = new Gson().toJson(data);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetCategories": {
                    String cid = request.getParameter("data");
                    int catId = Integer.parseInt(cid);
                    ArrayList<Integer> CatIds = GeneralProductManager.getTopCategoryWithoutLimit(catId);
                    HashMap<Integer, String> List = new HashMap<>();
                    if (!CatIds.isEmpty()) {
                        for (int catid : CatIds) {
                            String catName = GeneralCategoryManager.GetCategoryName(catid);
                            List.put(catid, catName);
                        }
                        json = new Gson().toJson(List);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetSubCategories": {
                    String catid = request.getParameter("data");
                    int catId = Integer.parseInt(catid);
                    ArrayList<Integer> SubCatIds = GeneralProductManager.getCat_SubCatIDsWithoutLimit(catId);
                    HashMap<Integer, String> list = new HashMap<>();
                    if (!SubCatIds.isEmpty()) {
                        for (int subcatid : SubCatIds) {
                            String SubCatName = GeneralCategoryManager.GetCategoryName(subcatid);
                            list.put(subcatid, SubCatName);
                        }
                        json = new Gson().toJson(list);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetCategoryProperties": {
                    String catid = request.getParameter("data");
                    int catId = Integer.parseInt(catid);
                    HashMap<String, String> List = new HashMap<>();
                    ArrayList<String> catProps = GeneralCategoryManager.GetCategoryProperties(catId);
                    if (!catProps.isEmpty()) {
                        for (String propid : catProps) {
                            int pid = Integer.parseInt(propid);
                            String catName = GeneralCategoryManager.GetCategoryPropertyName(pid);
                            List.put(propid, catName);
                        }
                        json = new Gson().toJson(List);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetAllCategories": {
                    ArrayList<Integer> topcatids = GeneralProductManager.GetAllTopCatategoryIDs();
                    HashMap<Integer, HashMap<String, String>> List = new HashMap<>();
                    HashMap<Integer, ArrayList<HashMap<String, String>>> Categories = new HashMap<>();
                    HashMap<Integer, ArrayList<HashMap<String, String>>> SubCategories = new HashMap<>();
                    if (!topcatids.isEmpty()) {
                        for (int topcatid : topcatids) {
                            HashMap<String, String> topcatdetails = GeneralProductManager.GetProductCatDetails(topcatid);
                            if (!topcatdetails.isEmpty()) {
                                ArrayList<HashMap<String, String>> CatIds = new ArrayList<>();
                                List.put(topcatid, topcatdetails);
                                ArrayList<Integer> catids = GeneralProductManager.getTopCategoryWithoutLimit(topcatid);
                                if (!catids.isEmpty()) {
                                    for (int catid : catids) {
                                        HashMap<String, String> catdetails = GeneralProductManager.GetProductCatDetails(catid);
                                        if (!catdetails.isEmpty()) {
                                            CatIds.add(catdetails);
                                            ArrayList<HashMap<String, String>> SubCatIds = new ArrayList<>();
                                            ArrayList<Integer> subids = GeneralProductManager.getCat_SubCatIDsWithoutLimit(catid);
                                            if (!subids.isEmpty()) {
                                                for (int subid : subids) {
                                                    HashMap<String, String> subdetails = GeneralProductManager.GetProductCatDetails(subid);
                                                    if (!subdetails.isEmpty()) {
                                                        SubCatIds.add(subdetails);
                                                    }
                                                }
                                                SubCategories.put(catid, SubCatIds);
                                            }
                                        }
                                    }
                                    Categories.put(topcatid, CatIds);
                                }
                            }
                        }
                        json1 = new Gson().toJson(List);
                        json2 = new Gson().toJson(Categories);
                        json3 = new Gson().toJson(SubCategories);
                        json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }

                case "GetCategoryVariantValues": {
                    String variantid = request.getParameter("data");
                    int variantId = Integer.parseInt(variantid);
                    HashMap<String, String> List = new HashMap<>();
                    String Values = GeneralCategoryManager.GetCategoryPropertyValues(variantId);
                    if (Values == "none") {
                        json = new Gson().toJson(empty);
                    } else {
                        List.put("values", Values);
                        json = new Gson().toJson(List);
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
            Logger.getLogger(CategoryServlet.class
                    .getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(CategoryServlet.class
                    .getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(CategoryServlet.class
                    .getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(CategoryServlet.class
                    .getName()).log(Level.SEVERE, null, ex);
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
