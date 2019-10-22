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
 * @author Saint
 */
public class UserServlet extends HttpServlet {

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
                case "Login": {
                    String[] data = request.getParameterValues("data[]");
                    String Email_PhoneNumber = data[0].trim();
                    String Password = data[1].trim();
                    String UserStatus = "";
                    int UserID = 0;
                    if (GeneralUserManager.checkEmailAddressOrPhoneNumberExist(Email_PhoneNumber)) {
                        UserID = GeneralUserManager.checkPasswordEmailMatch(Password, Email_PhoneNumber);
                        if (UserID != 0) {
                            int blocked = GeneralUserManager.CheckUserBlockedStatus(UserID);
                            if (blocked == 0) {
                                if (GeneralUserManager.CheckUserGroupByUserID(UserID)) {
                                    UserStatus = GeneralUserManager.getUserStatus(UserID);
                                    if (UserStatus.equals("Activated")) {
                                        GeneralUserManager.UpdateUserStatus(UserID, "Online");
                                        session.setAttribute("UserOnlineOrOffline", "Online");
                                        session.setAttribute("Id", UserID);
                                        String UserName = GeneralUserManager.getUserName(UserID);
                                        if (UserName.equals("null") || UserName.equals("none none") || UserName.equals("none")) {
                                            UserName = "Guest";
                                        }
                                        session.setAttribute("UserName", UserName);
                                        result = "success";
                                        json = new Gson().toJson(result);
                                    } else {
                                        result = "Account has not been activated";
                                        json = new Gson().toJson(result);
                                    }
                                } else {
                                    result = "Please contact the WM-Admin";
                                    json = new Gson().toJson(result);
                                }
                            } else {
                                result = "Blocked";
                                json = new Gson().toJson(result);
                            }
                        } else {
                            result = "Incorrect Login Details";
                            json = new Gson().toJson(result);
                        }
                    } else {
                        result = "Email or Phone Number Entered Doesn't Exist";
                        json = new Gson().toJson(result);

                    }
                    break;
                }
                case "MemberRegistration": {
                    String[] data = request.getParameterValues("data[]");
                    String userfirstname = data[0].trim();
                    String userlastname = data[1].trim();
                    String useremail = data[2].trim();
                    String userphone = data[3].trim();
                    String userpassword = data[4].trim();
                    String usergender = data[5].trim();
                    String userdob = data[6].trim();

                    Date DateOfBirth = UtilityManager.getSqlDateFromString(userdob);
                    java.sql.Date DateCreated = UtilityManager.CurrentDate();

                    String Status = "Not Activated";
                    String Subclass = "Member";
                    int UsergroupId = GeneralUserManager.getUserGroupIDByName(Subclass);
                    if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(useremail)) {
                        if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(userphone)) {
                            String MembOfflineID = GeneralAccountManager.generateRandomNumber(8);
                            int MemberUserID = GeneralUserManager.CreateUser(useremail, userphone, userpassword, DateCreated, Status, UsergroupId, DateCreated, MembOfflineID);
                            if (MemberUserID != 0) {
                                GeneralUserManager.UpdateActivationDate(MemberUserID);
                                GeneralUserManager.CreateMember(userfirstname, userlastname, DateOfBirth, usergender, MemberUserID);
                                String membermsgbdy = "Congratulations!!! You have been successfully registered as a member of The WealthMarket.";
                                GeneralMessageManager.sendMemberMessage(GeneralAccountManager.WealthMarketUserID, membermsgbdy, "Member Created", MemberUserID);
                                result = GeneralAccountManager.CreateAccountRecord(MemberUserID);
//                                String emailmsg = "Congratulations!!! You have been successfully registered as a member of The WealthMarket. Welcome to the WealthMarket";
//                                SMSManager.sendMsg(emailmsg, userphone);
//                                MessageManager.SendSimpleMessage(useremail, "Welcome to The WealthMarket", emailmsg);
                                json = new Gson().toJson(result);

                            } else {
                                result = "Something went wrong while creating Account";
                                json = new Gson().toJson(result);
                            }
                        } else {
                            result = "Account with Phone Number already Exists";
                            json = new Gson().toJson(result);
                        }
                    } else {
                        result = "Account with Email Address already Exists";
                        json = new Gson().toJson(result);
                    }
                    break;
                }
                case "AdminRegistration": {
                    String[] data = request.getParameterValues("data[]");
                    String userfirstname = data[0].trim();
                    String userlastname = data[1].trim();
                    String useremail = data[2].trim();
                    String userphone = data[3].trim();
                    String userpassword = data[4].trim();
                    String usergender = data[5].trim();
                    String userdob = data[6].trim();

                    Date DateOfBirth = UtilityManager.getSqlDateFromString(userdob);
                    java.sql.Date DateCreated = UtilityManager.CurrentDate();

                    String Status = "Activated";
                    String Subclass = "Admin";
                    int UsergroupId = GeneralUserManager.getUserGroupIDByName(Subclass);
                    if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(useremail)) {
                        if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(userphone)) {
                            String MembOfflineID = GeneralAccountManager.generateRandomNumber(8);
                            int AdminUserID = GeneralUserManager.CreateUser(useremail, userphone, userpassword, DateCreated, Status, UsergroupId, DateCreated, MembOfflineID);
                            if (AdminUserID != 0) {
                                GeneralUserManager.UpdateActivationDate(AdminUserID);
                                GeneralUserManager.CreateAdminAccount(userfirstname, userlastname, DateOfBirth, usergender, AdminUserID);
                                String membermsgbdy = "Congratulations!!! You have been successfully registered as an Admin of The WealthMarket.";
                                GeneralMessageManager.sendMemberMessage(GeneralAccountManager.WealthMarketUserID, membermsgbdy, "Admin Created", AdminUserID);
                                result = GeneralAccountManager.CreateAccountRecord(AdminUserID);
//                                String emailmsg = "Congratulations!!! You have been successfully registered as a member of The WealthMarket. Welcome to the WealthMarket";
//                                SMSManager.sendMsg(emailmsg, userphone);
//                                MessageManager.SendSimpleMessage(useremail, "Welcome to The WealthMarket", emailmsg);
                                json = new Gson().toJson(result);

                            } else {
                                result = "Something went wrong while creating Account";
                                json = new Gson().toJson(result);
                            }
                        } else {
                            result = "Account with Phone Number already Exists";
                            json = new Gson().toJson(result);
                        }
                    } else {
                        result = "Account with Email Address already Exists";
                        json = new Gson().toJson(result);
                    }
                    break;
                }
                case "BusinessRegistration": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String bizindustry = data[1].trim();
                    String biztype = data[2].trim();
                    String bizname = data[3].trim();
                    String bizdfound = data[4].trim();
                    String bizcacnumber = data[5].trim();
                    String bizemail = data[6].trim();
                    String bizphone = data[7].trim();
                    String bizwebadd = data[8].trim();
                    String BizDescription = data[9].trim();

                    int BizIndustryID = Integer.parseInt(bizindustry);
                    int BizTypeID = Integer.parseInt(biztype);
                    Date DateFounded = UtilityManager.getSqlDateFromString(bizdfound);
                    java.sql.Date DateCreated = UtilityManager.CurrentDate();
                    String Subclass2 = "Business";
                    String Status = "Activated";
                    int UserID = 0;
                    int BizgroupId = GeneralUserManager.getUserGroupID(Subclass2);
                    if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(bizemail)) {
                        if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(bizphone)) {
                            String OfflineID = GeneralAccountManager.generateRandomNumber(8);
                            UserID = Integer.parseInt(userid);
                            int BizUserID = GeneralUserManager.CreateUser(bizemail, bizphone, "", DateCreated, Status, BizgroupId, DateCreated, OfflineID);
                            if (BizUserID != 0) {
                                GeneralUserManager.UpdateActivationDate(BizUserID);
                                GeneralUserManager.CreateBusiness(BizUserID, bizname, BizTypeID, DateFounded, bizcacnumber, BizIndustryID, bizwebadd, BizDescription);
                                GeneralUserManager.LinkToUser(UserID, BizUserID, "Member", "Business");
                                String membermsgbdy = "Congratulations!!! You have successfully registered your business on The WealthMarket.";
                                GeneralMessageManager.sendMemberMessage(GeneralAccountManager.WealthMarketUserID, membermsgbdy, "Business Created", BizUserID);
                                result = GeneralAccountManager.CreateAccountRecord(BizUserID);
                                String emailmsg = "Congratulations!!! You have successfully registered your business on The WealthMarket. Welcome to the WealthMarket";
//                                String emailmsg = "Congratulations!!! You have been successfully registered as a member of The WealthMarket. Activation Code: " + regCode;
//                                MessageManager.SendSimpleMessage(useremail, "Welcome to The WealthMarket", emailmsg);
                                GeneralHistoryManager.LogActivity(BizUserID, "Registration", "Business Registration", "Registered on The WealthMarket");
                                json = new Gson().toJson(BizUserID);
                            } else {
                                result = "Something went wrong while creating Business Account";
                                json = new Gson().toJson(result);
                            }
                        } else {
                            result = "Account with Phone Number already Exists";
                            json = new Gson().toJson(result);
                        }
                    } else {
                        result = "Account with Email Address already Exists";
                        json = new Gson().toJson(result);
                    }
                    break;
                }
                case "AgencyRegistration": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String AgencyName = data[1].trim();
                    String agencyEmail = data[2].trim();
                    String agencyPhone = data[3].trim();
                    String agencytypeid = data[4].trim();
                    String creator_userid = data[5].trim();
                    String Subclass = "Agency";
                    int AgencyAdminUserID = Integer.parseInt(userid);
                    int AgencyTypeID = Integer.parseInt(agencytypeid);
                    int CreatedByID = Integer.parseInt(creator_userid);
                    java.sql.Date DateCreated = UtilityManager.CurrentDate();
                    String Status = "Activated";
                    int AgencyGroupId = GeneralUserManager.getUserGroupIDByName(Subclass);
                    String AgencyID = GeneralUserManager.CreateAgencyID(AgencyTypeID);
                    if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(agencyEmail)) {
                        if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(agencyPhone)) {
                            String OfflineID = GeneralAccountManager.generateRandomNumber(8);
                            int AgencyUserID = GeneralUserManager.CreateUser(agencyEmail, agencyPhone, "", DateCreated, Status, AgencyGroupId, DateCreated, OfflineID);
                            if (AgencyUserID != 0) {
                                GeneralUserManager.UpdateActivationDate(AgencyUserID);
                                GeneralUserManager.CreateAgency(AgencyUserID, AgencyName, AgencyID, AgencyTypeID, CreatedByID);
                                GeneralUserManager.LinkToUser(AgencyAdminUserID, AgencyUserID, "Member", "Agency");
                                String membermsgbdy = "Congratulations!!! You have beenn successfully registered as an Agent of The WealthMarket.";
                                GeneralMessageManager.sendMemberMessage(GeneralAccountManager.WealthMarketUserID, membermsgbdy, "Agency Created", AgencyUserID);
                                result = GeneralAccountManager.CreateAccountRecord(AgencyUserID);
                                String emailmsg = "Congratulations!!! You have been successfully registered as an Agent of The WealthMarket. Welcome to the WealthMarket";
//                                String emailmsg = "Congratulations!!! You have been successfully registered as a member of The WealthMarket. Activation Code: " + regCode;
//                                MessageManager.SendSimpleMessage(useremail, "Welcome to The WealthMarket", emailmsg);
//                                GeneralHistoryManager.LogActivity(AgencyUserID, "Registration", "Agency Registration", "Agency Registered on The WealthMarket");
                                json1 = new Gson().toJson("Successful.");
                                json2 = new Gson().toJson("success");
                            } else {
                                result = "Something went wrong while creating Agency Account";
                                json1 = new Gson().toJson(result);
                                json2 = new Gson().toJson("warning");
                            }
                        } else {
                            result = "Account with Phone Number already Exists";
                            json1 = new Gson().toJson(result);
                            json2 = new Gson().toJson("warning");
                        }
                    } else {
                        result = "Account with Email Address already Exists";
                        json1 = new Gson().toJson(result);
                        json2 = new Gson().toJson("warning");
                    }
                    json3 = new Gson().toJson("Create New Agency");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "GetMemberDetails": {
                    String userid = request.getParameter("data");
                    int id = Integer.parseInt(userid);
                    HashMap<String, Object> memberdetails = GeneralUserManager.getUserDetails(id);
                    json = new Gson().toJson(memberdetails);
                    break;
                }
                case "GetPickUpCentres": {
                    ArrayList<Integer> CIDs = GeneralUserManager.getPickUpCentreIds();
                    HashMap<Integer, HashMap<String, String>> CenterList = new HashMap<>();
                    if (!CIDs.isEmpty()) {
                        for (int id : CIDs) {
                            HashMap<String, String> centerdetails = GeneralUserManager.getPickUpCenterDetails(id);
                            CenterList.put(id, centerdetails);
                        }
                        json = new Gson().toJson(CenterList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "ResetNewPassword": {
                    String[] params = request.getParameterValues("data");
                    String[] data = null;
                    for (String param : params) {
                        data = param.split(",");
                    }
                    int UserID = Integer.parseInt(data[0]);
                    String userpass = data[1];
                    result = GeneralUserManager.UpdatePassword(UserID, userpass);
                    if (result.equals("success")) {
                        GeneralMessageManager.sendMemberMessage(GeneralAccountManager.WealthMarketUserID, "Password reset occurred on your account", "Password Reset", UserID);
//                         String bdy = "New Password: " + userpass;
//                        MessageManager.SendEmail(email, "Password Recovery Code", bdy);
//                        String UserPhoneNumber = DBManager.GetString(Tables.UserTable.PhoneNumber, Tables.UserTable.Table, "where" + Tables.UserTable.ID + " = " + MemberUserID);
//                        SmsManager.SendSMS(regCode, UserPhoneNumber);
                        String email = GeneralUserManager.GetMemberEmail(UserID);
                        String password = GeneralUserManager.GetMemberPassword(UserID);
                        json1 = new Gson().toJson(result);
                        json2 = new Gson().toJson(email);
                        json3 = new Gson().toJson(password);
                        json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    } else {
                        json1 = new Gson().toJson("failed");
                        json = "[" + json1 + "]";
                    }
                    break;
                }

                case "UpdateUserDetails": {
                    String[] params = request.getParameterValues("data");
                    String[] data = null;
                    for (String param : params) {
                        data = param.split(",");
                    }
                    int UserID = Integer.parseInt(data[0]);
                    String NewValue = data[1];
                    String action = data[2];
                    if (action.equals("Email")) {
                        result = GeneralUserManager.UpdateEmail(UserID, NewValue);
                    } else if (action.equals("Password")) {
                        result = GeneralUserManager.UpdatePassword(UserID, NewValue);
                    }
                    json = new Gson().toJson(result);
                    break;
                }
                case "GetAllUsers": {
                    String usertype = request.getParameter("data");
                    ArrayList<Integer> ids = GeneralUserManager.GetAllUsers(usertype);
                    HashMap<Integer, HashMap<String, Object>> users = new HashMap<>();
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            try {
                                HashMap<String, Object> det = GeneralUserManager.GetUserDetails(usertype, id);
                                int WarrantBalance = GeneralAccountManager.GetUserAvailableBalance(id, 1);
                                det.put("AcctBalance", "" + WarrantBalance);
                                users.put(id, det);
                            } catch (Exception ex) {

                            }
                        }
                        json = new Gson().toJson(users);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetAllUsersCounts": {
                    String usertype = request.getParameter("data");
                    ArrayList<Integer> idsmembers = GeneralUserManager.GetAllUsers("Member");
                    ArrayList<Integer> idsadmins = GeneralUserManager.GetAllUsers("Admin");
                    ArrayList<Integer> idsbusinesses = GeneralUserManager.GetAllUsers("Business");
                    ArrayList<Integer> idsagencies = GeneralUserManager.GetAllUsers("Agency");
                    json1 = new Gson().toJson(idsmembers.size());
                    json2 = new Gson().toJson(idsadmins.size());
                    json3 = new Gson().toJson(idsbusinesses.size());
                    json4 = new Gson().toJson(idsagencies.size());
                    json = "[" + json1 + "," + json2 + "," + json3 + "," + json4 + "]";
                    break;
                }
                case "GetBusinessIndustries": {
                    ArrayList<Integer> BIDs = GeneralUserManager.getBusinessIndustryIds();
                    HashMap<Integer, String> contlist = new HashMap<>();
                    if (!BIDs.isEmpty()) {
                        for (int id : BIDs) {
                            String name = GeneralUserManager.GetBusinessIndustryName(id);
                            contlist.put(id, name);
                        }
                        contlist = UtilityManager.SortHashMapIntStringByValues(contlist);
                        json = new Gson().toJson(contlist);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "GetBusinessTypes": {
                    String industryid = request.getParameter("data");
                    int IndustryID = Integer.parseInt(industryid);
                    ArrayList<Integer> BIDs = GeneralUserManager.getBizTypesIds(IndustryID);
                    HashMap<Integer, String> contlist = new HashMap<>();
                    if (!BIDs.isEmpty()) {
                        for (int id : BIDs) {
                            String name = GeneralUserManager.GetBusinessTypeName(id);
                            contlist.put(id, name);
                        }
                        contlist = UtilityManager.SortHashMapIntStringByValues(contlist);
                        json = new Gson().toJson(contlist);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "RegisterAndSendSempleContract": {
                    String[] data = request.getParameterValues("data[]");
                    String userfirstname = data[0].trim();
                    String userlastname = data[1].trim();
                    String useremail = data[2].trim();
                    String userphone = data[3].trim();
                    String userpassword = data[4].trim();
                    String usergender = data[5].trim();
                    String userdob = data[6].trim();

                    String initiatorid = data[7].trim();
                    String bizindustry = data[8].trim();
                    String biztype = data[9].trim();
                    String bizname = data[10].trim();
                    String bizdfound = data[11].trim();
                    String bizcacnumber = data[12].trim();
                    String bizemail = data[13].trim();
                    String bizphone = data[14].trim();
                    String bizwebadd = data[15].trim();
                    String BizDescription = data[16].trim();

                    String contractPercentage = data[17].trim();
                    String totalInventory = data[18].trim();
                    String minInventoryPerc = data[19].trim();
                    String wMMinInventory = data[20].trim();
                    String contractCharges = data[21].trim();
//                    String contractDuration = data[22].trim();

                    int BizIndustryID = Integer.parseInt(bizindustry);
                    int BizTypeID = Integer.parseInt(biztype);

                    Date DateFounded = UtilityManager.getSqlDateFromString(bizdfound);
                    Date DateOfBirth = UtilityManager.getSqlDateFromString(userdob);
                    java.sql.Date DateCreated = UtilityManager.CurrentDate();
                    String Status = "Activated";
                    String Subclass = "Member";
                    String Subclass2 = "Business";
                    int UsergroupId = GeneralUserManager.getUserGroupIDByName(Subclass);
                    int BizgroupId = GeneralUserManager.getUserGroupIDByName(Subclass2);
                    if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(useremail) || !GeneralUserManager.checkEmailAddressOrPhoneNumberExist(userphone)) {
                        if (!GeneralUserManager.checkEmailAddressOrPhoneNumberExist(bizemail) || !GeneralUserManager.checkEmailAddressOrPhoneNumberExist(bizphone)) {
                            String MembOfflineID = GeneralAccountManager.generateRandomNumber(8);
                            String BizOfflineID = GeneralUserManager.generateRegCode(8);
                            int MemberUserID = GeneralUserManager.CreateUser(useremail, userphone, userpassword, DateCreated, Status, UsergroupId, DateCreated, MembOfflineID);
                            if (MemberUserID != 0) {
                                GeneralUserManager.UpdateActivationDate(MemberUserID);
                                GeneralUserManager.CreateMember(userfirstname, userlastname, DateOfBirth, usergender, MemberUserID);
                                String membermsgbdy = "Congratulations!!! You have been successfully registered as a member of The WealthMarket.";
                                GeneralMessageManager.sendMemberMessage(GeneralAccountManager.WealthMarketUserID, membermsgbdy, "Member Created", MemberUserID);
                                GeneralAccountManager.CreateAccountRecord(MemberUserID);
//                                String emailmsg = "Congratulations!!! You have been successfully registered as a member of The WealthMarket. Welcome to the WealthMarket";
//                                SMSManager.sendMsg(emailmsg, userphone);
//                                MessageManager.SendSimpleMessage(useremail, "Welcome to The WealthMarket", emailmsg);
                                int BizUserID = GeneralUserManager.CreateUser(bizemail, bizphone, "", DateCreated, "Activated", BizgroupId, DateCreated, BizOfflineID);
                                if (BizUserID != 0) {
                                    GeneralUserManager.UpdateActivationDate(BizUserID);
                                    GeneralUserManager.CreateBusiness(BizUserID, bizname, BizTypeID, DateFounded, bizcacnumber, BizIndustryID, bizwebadd, BizDescription);
                                    GeneralUserManager.LinkToUser(MemberUserID, BizUserID, "Member", "Business");
                                    String bizmsgbdy = "Congratulations!!! You have been successfully registered your business of The WealthMarket.";
                                    GeneralMessageManager.sendMemberMessage(GeneralAccountManager.WealthMarketUserID, bizmsgbdy, "Business Created", BizUserID);
                                    GeneralAccountManager.CreateAccountRecord(BizUserID);
//                                    String bizemailmsg = "Congratulations!!! You have been successfully your business on The WealthMarket. Welcome to the WealthMarket";
//                                  SMSManager.sendMsg(bizemailmsg, bixphone);
//                                  MessageManager.SendSimpleMessage(bizemail, "Welcome to The WealthMarket", emailmsg);

                                    // Send Semple Contract
                                    int InitiatorUserID = Integer.parseInt(initiatorid);
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
                                    result = GeneralSchemesManager.CreateMycaContract(BizUserID, Subclass2, InventoryValuation, DateCreated, expiryDate, ContractedPercentage, WmMinimumInventory, MinInventoryPerc,
                                            ContractDuration, Expired, Confirmed, Charge, "", InitiatorUserID, bizname, IntitiatorName);

                                    json = new Gson().toJson(result);
                                } else {
                                    result = "Something went wrong while creating Business Account";
                                    json = new Gson().toJson(result);
                                }
                            } else {
                                result = "Something went wrong while creating Business Account";
                                json = new Gson().toJson(result);
                            }
                        } else {
                            result = "Account with Phone Number already Exists";
                            json = new Gson().toJson(result);
                        }
                    } else {
                        result = "Account with Email Address already Exists";
                        json = new Gson().toJson(result);
                    }
                    break;
                }
                case "FindBusiness": {
                    String searchtxt = request.getParameter("data").trim();
                    ArrayList<Integer> ids = GeneralUserManager.findBusiness(searchtxt);
                    HashMap<Integer, HashMap<String, Object>> det = new HashMap<>();
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, Object> details = GeneralUserManager.getUserDetails(id);
                            det.put(id, details);
                        }
                        json = new Gson().toJson(det);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "FindMember": {
                    String searchtxt = request.getParameter("data").trim();
                    ArrayList<Integer> ids = GeneralUserManager.findMember(searchtxt);
                    HashMap<Integer, HashMap<String, Object>> det = new HashMap<>();
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, Object> details = GeneralUserManager.getUserDetails(id);
                            det.put(id, details);
                        }
                        json = new Gson().toJson(det);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "ActivateUser": {
                    String userid = request.getParameter("data").trim();
                    int UserId = Integer.parseInt(userid);
                    int Amt = 1500;
                    result = GeneralUserManager.ActivateUser(UserId, Amt, "Manual", "Manual", "Validation Fees");
                    if (result.equals("success")) {
                        json = new Gson().toJson(result);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetBanks": {
                    ArrayList<Integer> BIDs = GeneralUserManager.getBankIds();
                    HashMap<Integer, String> bklist = new HashMap<>();
                    if (!BIDs.isEmpty()) {
                        for (int id : BIDs) {
                            String name = GeneralUserManager.getBankName(id);
                            bklist.put(id, name);
                        }
                        bklist = UtilityManager.SortHashMapIntStringByValues(bklist);
                        json = new Gson().toJson(bklist);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "AddBankDetails": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String bknameid = data[1].trim();
                    String bkaccttype = data[2].trim();
                    String bkacctno = data[3].trim();
                    String bkbvn = data[4].trim();
                    int UserID = Integer.parseInt(userid);
                    int BankID = Integer.parseInt(bknameid);
                    result = GeneralUserManager.AddBankDetails(UserID, BankID, bkaccttype, bkacctno, bkbvn);
                    json = new Gson().toJson(result);
                    break;
                }
                case "ChangeTransactionPIN": {
                    String[] data = request.getParameterValues("data[]");
                    String userid = data[0].trim();
                    String pin = data[1].trim();
                    int UserID = Integer.parseInt(userid);
                    int PIN = Integer.parseInt(pin);
                    result = GeneralUserManager.UpdateTransactionPIN(UserID, PIN);
                    String msgbox = "Your New Transaction Pin is: " + PIN;
                    GeneralMessageManager.sendMemberMessage(GeneralAccountManager.WealthMarketUserID, msgbox, "New Transaction Pin", UserID);
                    GeneralHistoryManager.LogActivity(UserID, "Transaction PIN", "Changed Transaction PIN", "Changed Transaction PIN");
                    json = new Gson().toJson(result);
                    break;
                }
                case "addUser": {
                    String[] data = request.getParameterValues("data[]");
                    int UserID = Integer.parseInt(data[0]);
                    int ContactID = Integer.parseInt(data[1].trim());
                    String ObjectType1 = data[2].trim();
                    String ObjectType2 = data[3].trim();
                    int linkid = GeneralUserManager.LinkToUser(UserID, ContactID, ObjectType1, ObjectType2);
                    String name = GeneralUserManager.getUserName(ContactID);
                    if (linkid != 0) {
                        String message = name + " has been added to your list";
                        GeneralHistoryManager.LogActivity(UserID, ObjectType1, "Added Contact/Staff", message);
                        json = new Gson().toJson(message);
                    } else {
                        String message = name + " already exist on your list";
                        json = new Gson().toJson(message);
                    }
                    break;
                }
                case "AddStaff": {
                    String[] data = request.getParameterValues("data[]");
                    int UserID = Integer.parseInt(data[0]);
                    int ContactID = Integer.parseInt(data[1].trim());
                    String Objecttype1 = data[2].trim();
                    String Objecttype2 = data[3].trim();
                    String permids = data[4];
                    String PermIds = permids.replaceAll(":", ",");
                    int linkid = GeneralUserManager.LinkToUser(UserID, ContactID, Objecttype1, Objecttype2);
                    String name = GeneralUserManager.getUserName(ContactID);
                    if (linkid != 0) {
                        GeneralUserManager.CreateUserGroupStaff(linkid, PermIds);
                        String message = name + " has been added to your list";
//                        HistoryManager.LogActivity(UserID, "Staff", "Added Staff", message);
                        json = new Gson().toJson(message);
                    } else {
                        String message = name + " already exist on your list";
                        json = new Gson().toJson(message);
                    }
                    break;
                }
                case "removeUser": {
                    String[] data = request.getParameterValues("data[]");
                    int UserID = Integer.parseInt(data[0]);
                    int ContactID = Integer.parseInt(data[1].trim());
                    String ObjectType1 = data[2].trim();
                    String ObjectType2 = data[3].trim();
                    result = GeneralUserManager.RemoveContact(UserID, ContactID, ObjectType1, ObjectType2);
                    String name = GeneralUserManager.getUserName(ContactID);
                    if (result.equals("successful")) {
                        String message = name + " has been removed from your list";
                        GeneralHistoryManager.LogActivity(UserID, "Contact", "Removed Contact/Staff", message);
                        json = new Gson().toJson(message);
                    } else {
                        String message = "Something went wrong! try again Later";
                        json = new Gson().toJson(message);
                    }
                    break;
                }

                case "CreateAgencyType": {
                    String typename = request.getParameter("data");
                    result = GeneralUserManager.CreateAgencyTypes(typename);
                    if (result.equals("successful") || result.equals("success")) {
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    json3 = new Gson().toJson("Create Agency Type");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "GetAgencyTypes": {
                    ArrayList<Integer> IDs = GeneralUserManager.getAgencyTypesIds();
                    HashMap<Integer, HashMap<String, String>> det = new HashMap<>();
                    if (!IDs.isEmpty()) {
                        for (int id : IDs) {
                            HashMap<String, String> details = GeneralUserManager.getAgencyTypeDetails(id);
                            det.put(id, details);
                        }
                        json = new Gson().toJson(det);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetAgencies": {
                    String[] data = request.getParameterValues("data[]");
                    int agtypeid = Integer.parseInt(data[0]);
                    String usertype = data[1];
                    ArrayList<Integer> ids = GeneralUserManager.GetAgenciesByAgencyTypeID(agtypeid);
                    HashMap<Integer, HashMap<String, Object>> users = new HashMap<>();
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            int userid = GeneralUserManager.GetAgencyUserIDBYAgencyID(id);
                            HashMap<String, Object> det = GeneralUserManager.GetUserDetails(usertype, userid);
                            int WarrantBalance = GeneralAccountManager.GetUserAvailableBalance(userid, 1);
                            det.put("AcctBalance", "" + WarrantBalance);
                            users.put(id, det);
                        }
                        json = new Gson().toJson(users);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "Populate": {
                    String[] data = request.getParameterValues("data[]");
                    int val = Integer.parseInt(data[0]);
                    String Section = data[1];
                    String value = data[2];
                    HashMap<Integer, String> nameset = GeneralAddressManager.GetTableOptions(val, Section);
                    HashMap<String, HashMap<Integer, String>> resend = new HashMap<>();
                    resend.put(value, nameset);
                    json = new Gson().toJson(resend);
                    break;
                }
                case "GetValues": {
                    String[] data = request.getParameterValues("data[]");
                    int val = Integer.parseInt(data[0]);
                    String section = data[1];
                    String Case = data[2];
                    int value = GeneralAddressManager.GetValue(Case, section, val);
                    json = new Gson().toJson(value);
                    break;
                }
                case "InsertSection": {
                    int value;
                    String[] data = request.getParameterValues("data[]");
                    String Section = data[0];
                    String AdditionName = data[1];
                    String[] resend = new String[3];
                    value = GeneralAddressManager.InsertNewSection(AdditionName, Section, data);
                    resend[0] = Section;
                    resend[1] = AdditionName;
                    resend[2] = "" + value;
                    json = new Gson().toJson(resend);
                }
                case "BlockAndUnblockUser": {
                    String data = request.getParameter("data");
                    int userid = Integer.parseInt(data);
                    result = GeneralUserManager.BlockOrUnBlockUser(userid);
                    json = new Gson().toJson(result);
                    break;
                }
                case "GetAllRequestedChanges": {
                    HashMap<Integer, Object> List = new HashMap<>();
                    ArrayList<Integer> IDs = GeneralUserManager.GetAllRequestedChanges();
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
                case "ApproveRequestedChanges": {
                    String[] data = request.getParameterValues("data[]");
                    String reqid = data[0];
                    String new_detail = data[1];
                    String subject = data[2];
                    String Status = data[3];
                    String userid = data[4];
                    int ReqID = Integer.parseInt(reqid);
                    int UserID = Integer.parseInt(userid);

                    if (subject == null) {
                        result = "failed";
                    } else {
                        switch (subject) {
                            case "Change Phone Number":
                                result = GeneralUserManager.UpdatePhoneNumber(UserID, new_detail);
                                break;
                            case "Change Email":
                                result = GeneralUserManager.UpdateEmail(UserID, new_detail);
                                break;
                        }
                    }
                    if (result.equals("successful") || result.equals("success")) {
                        result = GeneralUserManager.UpdateRequestedChanges(ReqID, Status);
                        if (result.equals("successful") || result.equals("success")) {
                            String body = "Your Request to " + subject + " was Approved";
                            GeneralMessageManager.sendMemberMessage(GeneralAccountManager.WealthMarketUserID, body, subject, UserID);
                            json1 = new Gson().toJson("Successful.");
                            json2 = new Gson().toJson("success");
                        }
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    json3 = new Gson().toJson("Requested Change Approved");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "RejectRequestedChanges": {
                    String[] data = request.getParameterValues("data[]");
                    String cid = data[0];
                    String Status = data[3];
                    String subject = data[1];
                    String userid = data[2];
                    int UserID = Integer.parseInt(userid);
                    int Id = Integer.parseInt(cid);
                    result = GeneralUserManager.UpdateRequestedChanges(Id, Status);
                    if (result.equals("successful") || result.equals("success")) {
                        String body = "Your Request to " + subject + " was Rejected";
                        GeneralMessageManager.sendMemberMessage(GeneralAccountManager.WealthMarketUserID, body, subject, UserID);
                        json1 = new Gson().toJson("Successful.");
                        json2 = new Gson().toJson("success");
                    } else {
                        json1 = new Gson().toJson("Oop! something went wrong, please try again.");
                        json2 = new Gson().toJson("warning");
                    }
                    json3 = new Gson().toJson("Requested Change Rejected");
                    json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    break;
                }
                case "RequestChangeDetails": {
                    String[] data = request.getParameterValues("data[]");
                    int UserID = Integer.parseInt(data[0]);
                    String changeSubject = (data[1]);
                    String oldDetail = (data[2]);
                    String newDetail = (data[3]);
                    result = GeneralUserManager.ChangeDetails(UserID, changeSubject, oldDetail, newDetail);
                    json = new Gson().toJson(result);
                    break;
                }

                case "DeleteUserAddress": {
                    String params = request.getParameter("data");
                    int AddressID = Integer.parseInt(params);
//                    HistoryManager.LogActivity(UserID, "Address", "Deleted Address", "Deleted Address");
                    result = GeneralAddressManager.DeleteUserAddress(AddressID);
                    json = new Gson().toJson(result);
                }

                case "SearchMembers": {
                    String searchtxt = request.getParameter("data");
                    ArrayList<Integer> ids = GeneralUserManager.findMember(searchtxt);
                    HashMap<Integer, HashMap<String, Object>> det = new HashMap<>();
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, Object> details = GeneralUserManager.getUserDetails(id);
                            det.put(id, details);
                        }
                        json = new Gson().toJson(det);
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
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(UserServlet.class.getName()).log(Level.SEVERE, null, ex);
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
