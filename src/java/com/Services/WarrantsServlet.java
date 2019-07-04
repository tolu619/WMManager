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
import wmengine.Managers.*;
import wmengine.Tables.*;

/**
 *
 * @author Stephen
 */
public class WarrantsServlet extends HttpServlet {

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
            throws ServletException, IOException, ClassNotFoundException, SQLException, ParseException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            HttpSession session = request.getSession(true);
            String type = request.getParameter("type");
            String json = "";
            String json1 = "";
            String json2 = "";
            String json3 = "";
            String json4 = "";
            String result = "";
            String empty = "none";
            switch (type) {
                case "ListValueForSale": {
                    String[] data = request.getParameterValues("data[]");
                    String offers = data[0].trim();
                    String requests = data[1].trim();
                    int userid = Integer.parseInt("" + session.getAttribute("Id"));
                    result = GeneralWarrantsMarketManager.ListOffer(userid, offers, requests);
                    json = new Gson().toJson(result);
                    break;
                }
                case "GetLiveListings": {
                    HashMap<Integer, HashMap<String, String>> listings = new HashMap<>();
                    ArrayList<Integer> listingIDs = new ArrayList<>();
                    String[] data = request.getParameterValues("data[]");
                    String Userid = data[0].trim();
                    String option = data[1].trim();
                    int userid = Integer.parseInt(Userid);
                    if (option.equals("All")) {
                        listingIDs = GeneralWarrantsMarketManager.GetLiveListings();
                    } else {
                        listingIDs = GeneralWarrantsMarketManager.GetUserLiveListings(userid);
                    }
                    if (!listingIDs.isEmpty()) {
                        for (int id : listingIDs) {
                            HashMap<String, String> det = GeneralWarrantsMarketManager.GetListingDetails(id);
                            if (!det.isEmpty()) {
                                userid = Integer.parseInt(det.get(Tables.WarrantsMarketListings.UserID));
                                String fullname = GeneralUserManager.getUserName(userid);
                                det.put("fullname", fullname);
                                det.put("usertype", "Member");
                                listings.put(id, det);
                            }
                        }
                        json1 = new Gson().toJson(listingIDs);
                        json2 = new Gson().toJson(listings);
                        json = "[" + json1 + "," + json2 + "]";
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetLiveOffers": {
                    String data = request.getParameter("data");
                    HashMap<Integer, HashMap<String, String>> listings = new HashMap<>();
                    ArrayList<Integer> listingIDs = new ArrayList<>();
                    int userid = Integer.parseInt("" + session.getAttribute("Id"));
                    if (data.equals("All")) {
                        listingIDs = GeneralWarrantsMarketManager.GetLiveListings();
                    } else {
                        listingIDs = GeneralWarrantsMarketManager.GetUserLiveListings(userid);
                    }
                    if (!listingIDs.isEmpty()) {
                        for (int id : listingIDs) {
                            HashMap<String, String> det = GeneralWarrantsMarketManager.GetListingDetails(id);
                            if (!det.isEmpty()) {
                                userid = Integer.parseInt(det.get(Tables.WarrantsMarketListings.UserID));
                                String fullname = GeneralUserManager.getUserName(userid);
                                det.put("fullname", fullname);
                                det.put("usertype", "Member");
                                listings.put(id, det);
                            }
                        }
                        json1 = new Gson().toJson(listingIDs);
                        json2 = new Gson().toJson(listings);
                        json = "[" + json1 + "," + json2 + "]";
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetTotalWarrants": {
                    HashMap<Integer, HashMap<String, String>> warrantsList = new HashMap<>();
                    ArrayList<Integer> WIDs = GeneralWarrantsMarketManager.GetWarrantIDs();
                    if (!WIDs.isEmpty()) {
                        for (int wid : WIDs) {
                            HashMap<String, String> wdetails = GeneralWarrantsMarketManager.GetWarrantDetails(wid);
                            warrantsList.put(wid, wdetails);
                        }
                        json = new Gson().toJson(warrantsList);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetWMWarrantsAccount": {
                    int avail = GeneralAccountManager.GetUserAvailableBalance(1, 1);
                    json = new Gson().toJson(avail);

                    break;
                }
                case "GetAllWarrantsBalance": {
                    int totalWarrants = 0;
                    ArrayList<Integer> WIDs = GeneralWarrantsMarketManager.GetWarrantIDs();
                    if (!WIDs.isEmpty()) {
                        for (int wid : WIDs) {
                            HashMap<String, String> wdetails = GeneralWarrantsMarketManager.GetWarrantDetails(wid);
                            int amount = Integer.parseInt(wdetails.get(Tables.Warrants.Amount));
                            totalWarrants += amount;
                        }
                        json = new Gson().toJson(totalWarrants);
                    } else {
                        json = new Gson().toJson(0);
                    }
                    break;
                }
                case "GetWarrantsInAccountProperties": {
                    int totalWarrantsDirectBalance = 0;
                    int totalWarrantsEscrowBalance = 0;
                    int totalWWarrantsBlockedBalance = 0;
                    int totalWarrantsOfflineBalance = 0;
                    ArrayList<Integer> AcctIDS = new ArrayList<>();
                    AcctIDS = GeneralAccountManager.Get_AllUsers_AccountIDs();
                    if (!AcctIDS.isEmpty()) {
                        for (int id : AcctIDS) {
                            HashMap<String, String> acctdetails = GeneralAccountManager.Get_Account_Rec_Details(id);
                            int UserID = Integer.parseInt(acctdetails.get(Tables.AccountRecord.UserID));
                            int WarrantsDirectBalance = GeneralAccountManager.GetUserAvailableBalance(UserID, 1);
                            int WarrantsEscrowBalance = GeneralAccountManager.GetUserEscrowBalance(UserID, 1);
                            int WarrantsBlockedBalance = GeneralAccountManager.GetUserBlockedBalance(UserID, 1);
                            int WarrantsOfflineBalance = GeneralAccountManager.GetUserOfflineBalance(UserID, 1);
                            totalWarrantsDirectBalance += WarrantsDirectBalance;
                            totalWarrantsEscrowBalance += WarrantsEscrowBalance;
                            totalWWarrantsBlockedBalance += WarrantsBlockedBalance;
                            totalWarrantsOfflineBalance += WarrantsOfflineBalance;
                        }
                        json1 = new Gson().toJson(totalWarrantsDirectBalance);
                        json2 = new Gson().toJson(totalWarrantsEscrowBalance);
                        json3 = new Gson().toJson(totalWWarrantsBlockedBalance);
                        json4 = new Gson().toJson(totalWarrantsOfflineBalance);
                        json = "[" + json1 + "," + json2 + "," + json3 + "," + json4 + "]";
                    } else {
                        json = new Gson().toJson(0);
                    }
                    break;
                }

                case "GetWarrantsLifeCycle": {
                    String warrantid = request.getParameter("data");
                    int WarrantID = Integer.parseInt(warrantid);
                    HashMap<Integer, HashMap<String, String>> AccountList = new HashMap<>();
                    ArrayList<Integer> AcctIDS = new ArrayList<>();
                    AcctIDS = GeneralAccountManager.Get_AllUsers_AccountIDs();
                    if (!AcctIDS.isEmpty()) {
                        for (int id : AcctIDS) {
                            HashMap<String, String> acctdetails = GeneralAccountManager.Get_Account_Rec_Details(id);
                            int UserID = Integer.parseInt(acctdetails.get(Tables.AccountRecord.UserID));
                            HashMap<String, String> details = GeneralAccountManager.GetUserAvailableWarrant(UserID, WarrantID);
                            if (!details.isEmpty()) {
                                acctdetails.putAll(details);
                                String UserAccountNumber = GeneralAccountManager.GetUserAccountNumber(UserID, 1);
                                acctdetails.put("AccountNumber", UserAccountNumber);
                                String UserName = GeneralUserManager.getUserName(UserID);
                                acctdetails.put("AccountName", UserName);
                                AccountList.put(id, acctdetails);
                            }
                        }
                        json = new Gson().toJson(AccountList);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetWarrantsInAccountProperty": {
                    String property = request.getParameter("data");
                    HashMap<Integer, HashMap<String, String>> AccountList = new HashMap<>();
                    ArrayList<Integer> AcctIDS = new ArrayList<>();
                    AcctIDS = GeneralAccountManager.Get_AllUsers_AccountIDs();
                    if (!AcctIDS.isEmpty()) {
                        for (int id : AcctIDS) {
                            HashMap<String, String> acctdetails = GeneralAccountManager.Get_Account_Rec_Details(id);
                            int UserID = Integer.parseInt(acctdetails.get(Tables.AccountRecord.UserID));
                            int Balance = 0;
                            if (property.equals("Direct")) {
                                Balance = GeneralAccountManager.GetUserAvailableBalance(UserID, 1);
                            } else if (property.equals("Blocked")) {
                                Balance = GeneralAccountManager.GetUserBlockedBalance(UserID, 1);
                            } else if (property.equals("Escrow")) {
                                Balance = GeneralAccountManager.GetUserEscrowBalance(UserID, 1);
                            } else if (property.equals("Offline")) {
                                Balance = GeneralAccountManager.GetUserOfflineBalance(UserID, 1);
                            }
                            if (Balance != 0) {
                                acctdetails.put("WarrantBalance", "" + Balance);
                                String UserAccountNumber = GeneralAccountManager.GetUserAccountNumber(UserID, 1);
                                acctdetails.put("AccountNumber", UserAccountNumber);
                                String UserName = GeneralUserManager.getUserName(UserID);
                                acctdetails.put("AccountName", UserName);
                                AccountList.put(id, acctdetails);
                            }
                        }
                        if (!AccountList.isEmpty()) {
                            json = new Gson().toJson(AccountList);
                        } else {
                            json = new Gson().toJson(empty);
                        }

                    } else {
                        json = new Gson().toJson(empty);
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
            Logger.getLogger(WarrantsServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(WarrantsServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(WarrantsServlet.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(WarrantsServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(WarrantsServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(WarrantsServlet.class.getName()).log(Level.SEVERE, null, ex);
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
