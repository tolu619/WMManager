/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
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
public class SchemesServlet extends HttpServlet {

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
            String json = "";
            String type = request.getParameter("type").trim();
            String empty = "none";
            String result = "";
            String json1 = "";
            String json2 = "";
            String json3 = "";
            String json4 = "";
            HttpSession session = request.getSession(true);
            switch (type) {
                case "GetSempleContracts": {
                    String status = request.getParameter("data");
                    ArrayList<Integer> SempleIds = GeneralSchemesManager.getSempleContracts();
                    HashMap<Integer, HashMap<String, String>> sempleList = new HashMap<>();
                    if (!SempleIds.isEmpty()) {
                        for (int sid : SempleIds) {
                            HashMap<String, String> details = new HashMap<>();
                            switch (status) {
                                case "All":
                                    details = GeneralSchemesManager.GetContractDetailsByStatus(sid, status);
                                    break;
                                case "Pending":
                                    details = GeneralSchemesManager.GetContractDetailsByStatus(sid, status);
                                    break;
                                case "Signed":
                                    details = GeneralSchemesManager.GetContractDetailsByStatus(sid, status);
                                    break;
                                case "On-Going":
                                    details = GeneralSchemesManager.GetContractDetailsByStatus(sid, status);
                                    break;
                                case "Completed":
                                    details = GeneralSchemesManager.GetContractDetailsByStatus(sid, status);
                                    break;
                                case "Rejected":
                                    details = GeneralSchemesManager.GetContractDetailsByStatus(sid, status);
                                    break;
                            }
                            if (!details.isEmpty()) {
                                sempleList.put(sid, details);
                            }
                        }
                        json = new Gson().toJson(sempleList);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                
                case "GrantSempleContractODLine": {
                    String[] data = request.getParameterValues("data[]");
                    String contractid = data[0].trim();
                    String userid = data[1].trim();
                    int ContractID = Integer.parseInt(contractid);
                    int UserID = Integer.parseInt(userid);
                    result = GeneralSchemesManager.GrantODLine(ContractID, UserID);
                    json = new Gson().toJson(result);
                    break;
                }
                case "SendSempleContract": {
                    String[] data = request.getParameterValues("data[]");
                    String initiator = data[0].trim();
                    String recipientid = data[1].trim();
                    String contractPercentage = data[2].trim();
                    String totalInventory = data[3].trim();
                    String minInventoryPerc = data[4].trim();
                    String wMMinInventory = data[5].trim();
                    String contractCharges = data[6].trim();

                    int InitiatorUserID = Integer.parseInt(initiator);
                    int RecipientUserID = Integer.parseInt(recipientid);
                    // Send Semple Contract

                    String IntitiatorName = GeneralUserManager.getUserName(InitiatorUserID);
                    Float InventoryValuation = Float.parseFloat(totalInventory);
                    Float ContractedPercentage = Float.parseFloat(contractPercentage);
                    Float WmMinimumInventory = Float.parseFloat(wMMinInventory);
                    Float MinInventoryPerc = Float.parseFloat(minInventoryPerc);
//                                    Integer ContractDuration = Integer.parseInt(contractDuration);
                    int ContractDuration = 30;//Integer.parseInt(contractDuration);
                    Float Charge = Float.parseFloat(contractCharges);
                    Date expiryDate = UtilityManager.GetExpiryDate(ContractDuration);

                    String Expired = "false";
                    String Confirmed = "false";
                    String ContractType = "Business";
                    String RecipientName = GeneralUserManager.getUserName(RecipientUserID);
                    java.sql.Date DateCreated = UtilityManager.CurrentDate();
                    result = GeneralSchemesManager.CreateMycaContract(RecipientUserID, ContractType, InventoryValuation, DateCreated, expiryDate, ContractedPercentage, WmMinimumInventory, MinInventoryPerc,
                            ContractDuration, Expired, Confirmed, Charge, "", InitiatorUserID, RecipientName, IntitiatorName);
                    json = new Gson().toJson(result);
                    break;
                }
                case "CreateNewMonetisationRule":{
                    String[] data = request.getParameterValues("data[]");
                    String schemeType = data[0].trim();
                    String ruleName = data[1].trim();
                    String ruleDesc = data[2].trim();
                    int minMonVal = Integer.parseInt(data[3].trim());
                    int maxMonVal = Integer.parseInt(data[4].trim());
                    int percentToMonetise = Integer.parseInt(data[5].trim());
                    int ContractTenor = Integer.parseInt(data[6].trim());
                    String appFeeDetail = data[7].trim();
                    appFeeDetail = appFeeDetail.split("-")[0]+"~"+appFeeDetail.split("-")[1];
                    String chargeDetail = data[8].trim();
                    chargeDetail = chargeDetail.split("-")[0]+"~"+chargeDetail.split("-")[1];
                    String monRuleAccesibleGroups = data[9].trim();
                    String monRuleDependentMonetisations = data[10].trim();
                    int visibility = Integer.parseInt(data[11].trim());
                    result = GeneralSchemesManager.CreateMonetisationRule(schemeType, ruleName, ruleDesc, minMonVal, maxMonVal, percentToMonetise, 
                            ContractTenor, appFeeDetail, chargeDetail, monRuleAccesibleGroups, monRuleDependentMonetisations, visibility);
                    json = new Gson().toJson(result);
                    break;
                }
                case "GetNewMonetisationOptionParameters":{
                    HashMap<String, ArrayList<String>> NewOptParams = new HashMap<>();
                    ArrayList<String> options = GeneralSchemesManager.GetAllMonetisationOptionNames();
                    ArrayList<String> usergroups = GeneralUserManager.GetAllUsergroups();
                    NewOptParams.put("DependencyParameters", options);
                    NewOptParams.put("AccessParameters", usergroups);
                    json = new Gson().toJson(NewOptParams);
                    break;
                }
                case "GetAllMonetisationRules":{
                    HashMap<String, HashMap<String, Object>> options = GeneralSchemesManager.GetMonetisationRules();
                    json = new Gson().toJson(options);
                    break;
                }
                case "GetAllMonetisationApplication":{
                    HashMap<String, HashMap<String, Object>> Applications = GeneralSchemesManager.GetAllMonetisationApplication();
                    json = new Gson().toJson(Applications);
                    break;
                }
                case "GetAllMonApplyPendingVerification":{
                    ArrayList<HashMap<String, Object>> pendingGoods = GeneralSchemesManager.GetPendingVerifiedGoodsForMon();
                    json = new Gson().toJson(pendingGoods);
                    break;
                }
                case "VerifyMonetisationListing":{
                    String[] data = request.getParameterValues("data[]");
                    String GoodIds = data[0];
                    int applicationID = Integer.parseInt(data[1]);
                    int AgentID = Integer.parseInt(data[2]);
                    result = GeneralSchemesManager.VerifyMonetisationListingGoods(GoodIds, applicationID, AgentID);
                    json = new Gson().toJson(result);
                    break;
                }
                case "UnverifyMonetisationListing":{
                    String[] data = request.getParameterValues("data[]");
                    int applicationID = Integer.parseInt(data[0]);
                    int AgentID = Integer.parseInt(data[1]);
                    result = GeneralSchemesManager.UnverifyMonetisationListingGoods(applicationID, AgentID);
                    json = new Gson().toJson(result);
                    break;
                }
                case "ApproveMonApllication":{
                    String[] data = request.getParameterValues("data[]");
                    int applicationID = Integer.parseInt(data[0]);
                    int AdminID = Integer.parseInt(data[1]);
                    String Action = data[2].trim();
                    result = GeneralSchemesManager.ApproveMonetisationApllication(applicationID, AdminID, Action);
                    ArrayList<String> res = new ArrayList<>();
                    res.add(result);
                    res.add(Action);
                    json = new Gson().toJson(res);
                    break;
                }
                case "GetCompletedMonApplications":{
                    String[] lists = request.getParameterValues("data[]");
                    int data = Integer.parseInt(lists[0]);
                    String req = lists[1];
                    HashMap<String, HashMap<String, Object>> applications = GeneralSchemesManager.GetAllCompletedMonApplications(data);
                    json1 = new Gson().toJson(applications);
                    json2 = new Gson().toJson(req);
                    json = "[" + json1 + ", " + json2 + "]"; 
                    break;
                }
                //portal features
                case "SubmitMonetisationApplication":{
                    String[] data = request.getParameterValues("data[]");
                    String appData = data[0];
                    int MonRuleID = Integer.parseInt(data[1]);
                    int userid = Integer.parseInt(data[2]);
                    result = GeneralSchemesManager.SubmitMonetisationApplication(appData, MonRuleID, userid);
                    json = new Gson().toJson(result);
                    break;
                }
                case "GetMyMonApplications":{
                    int data = Integer.parseInt(request.getParameter("data"));
                    HashMap<String, HashMap<String, Object>> applications = GeneralSchemesManager.GetUserMonetisationApplications(data);
                    json = new Gson().toJson(applications);
                    break;
                }
                case "ChangeMonOptionVisibility":{
                    String[] data = request.getParameterValues("data[]");
                    int Id = Integer.parseInt(data[0]);
                    int visible = Integer.parseInt(data[1]);
                    String update = GeneralSchemesManager.ChangeMonetisationVisibility(Id, visible);
                    String visibility = "";
                    if(visible == 0){
                        visibility = "ON";
                    }else{
                        visibility = "OFF";
                    }
                    json1 = "["+ update + ", " + visible + "]";
                    json = new Gson().toJson(json1);
                    break;
                }
                case "DeleteMonetisationOption":{
                    String[] data = request.getParameterValues("data[]");
                    int Id = Integer.parseInt(data[0]);
                    int delete = Integer.parseInt(data[1]);
                    String update = GeneralSchemesManager.DeleteMonetisationOption(Id, delete);
                    json = new Gson().toJson(update);
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
            Logger.getLogger(SchemesServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(SchemesServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(SchemesServlet.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(SchemesServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(SchemesServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(SchemesServlet.class.getName()).log(Level.SEVERE, null, ex);
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
