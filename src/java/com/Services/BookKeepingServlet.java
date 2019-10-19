/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;

import com.Managers.BookKeeper;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import wmengine.Managers.DBManager;
import wmengine.Tables.Tables;
import java.util.regex.*;

/**
 *
 * @author DELL
 */
public class BookKeepingServlet extends HttpServlet {

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
        try (PrintWriter out = response.getWriter()) 
        {
            HttpSession session = request.getSession(true);
            String type = request.getParameter("type");
            String json = "";
            String json1 = "";
            String json2 = "";
            String json3 = "";
            String empty = "none";
            switch (type) 
            {
                case "GetAllTransactionTypes": 
                {
                    HashMap<Integer, HashMap<String, String>> TransactionTypes = BookKeeper.GetAllTransactionTypes();
                    json = new Gson().toJson(TransactionTypes);
                    break;
                }
                case "GetMOEJournalEntryDetailsForTransactionType": 
                {
                    String Parameters = request.getParameter("data");
                    String[] SubLedgerIDs = Parameters.split("~");
                    ArrayList MOEJournalEntries = BookKeeper.GetJournalEntriesForMarketOperatorEntity(SubLedgerIDs[0], SubLedgerIDs[1]);
                    json = new Gson().toJson(MOEJournalEntries);
                    break;
                }
                case "GetThirdPartyJournalEntryDetailsForTransactionType": {
                    String Parameters = request.getParameter("data");
                    String[] SubLedgerIDs = Parameters.split("~");
                    ArrayList ThirdPartyJournalEntries = BookKeeper.GetJournalEntriesForThirdPartyEntities(SubLedgerIDs[2], SubLedgerIDs[3]);
                    json = new Gson().toJson(ThirdPartyJournalEntries);
                    break;
                }
                case "GetAllLedgerAccounts": 
                {
                    HashMap<Integer, HashMap<String, String>> LedgerAccounts = BookKeeper.GetAllLedgerAccounts();
                    json = new Gson().toJson(LedgerAccounts);
                    break;
                }
                case "GetSubLedgersByLedgerID": 
                {
                    String IDString = request.getParameter("data");
                    Integer LedgerID = Integer.parseInt(IDString);
                    HashMap<Integer, HashMap<String, String>> LedgerAccounts = BookKeeper.GetSubLedgerAccountsByLedgerID(LedgerID);
                    json = new Gson().toJson(LedgerAccounts);
                    break;
                }
                case "GetTransactionParameters": 
                {
                    HashMap<Integer, HashMap<String, String>> TransactionParameters = DBManager.GetAllCollumnsLimitNumberOfRows(0, 50, Tables.TransactionParameters.Table, "");
                    json = new Gson().toJson(TransactionParameters);
                    break;
                }
                case "CreateNewIndependentParam": 
                {
                    String ParamName = request.getParameter("data");
                    String Result = DBManager.InsertStringData(Tables.TransactionParameters.Table, Tables.TransactionParameters.ParamName, ParamName, "");
                    if (Result.equals("success")) {
                        HashMap<Integer, HashMap<String, String>> TransactionParameters = DBManager.GetAllCollumnsLimitNumberOfRows(0, 50, Tables.TransactionParameters.Table, "");
                        json = new Gson().toJson(TransactionParameters);
                    } else {
                        json = new Gson().toJson(Result);
                    }
                    break;
                }
                case "CreateNewFixedParam": 
                {
                    String Data = request.getParameter("data");
                    String ParamName = Data.split(",")[0];
                    String ParamValue = Data.split(",")[1];
                    HashMap<String, Object> ParamData = new HashMap<>();
                    ParamData.put(Tables.TransactionParameters.ParamName, ParamName);
                    ParamData.put(Tables.TransactionParameters.ParamValue, ParamValue);
                    Integer NewParamID = DBManager.insertTableDataReturnID(Tables.TransactionParameters.Table, ParamData, "");
                    if (NewParamID > 0) 
                    {
                        HashMap<Integer, HashMap<String, String>> TransactionParameters = DBManager.GetAllCollumnsLimitNumberOfRows(0, 50, Tables.TransactionParameters.Table, "");
                        json = new Gson().toJson(TransactionParameters);
                    } 
                    else 
                    {
                        json = new Gson().toJson("failed");
                    }
                    break;
                }
                case "CreateNewDerivedParam": {
                    String Data = request.getParameter("data");
                    String ParamName = Data.split(",")[0];
                    String ParamFormula = Data.split(",")[1];
                    HashMap<String, Object> ParamData = new HashMap<>();
                    ParamData.put(Tables.TransactionParameters.ParamName, ParamName);
                    ParamData.put(Tables.TransactionParameters.ParamValue, ParamFormula);
                    Integer NewParamID = DBManager.insertTableDataReturnID(Tables.TransactionParameters.Table, ParamData, "");
                    if (NewParamID > 0) 
                    {
                        HashMap<Integer, HashMap<String, String>> TransactionParameters = DBManager.GetAllCollumnsLimitNumberOfRows(0, 50, Tables.TransactionParameters.Table, "");
                        json = new Gson().toJson(TransactionParameters);
                    } 
                    else 
                    {
                        json = new Gson().toJson("failed");
                    }
                    break;
                }
                case "CreateNewTransactionType": 
                {
                    String[] JSONArray = request.getParameterValues("data[]");
                    HashMap<String, Object> TableDataHashMap = new HashMap<>();
                    TableDataHashMap.put(Tables.TransactionType.NameOfTransaction, JSONArray[0]);
                    TableDataHashMap.put(Tables.TransactionType.TransactionCode, JSONArray[1]);
                    TableDataHashMap.put(Tables.TransactionType.Description, JSONArray[2]);
                    TableDataHashMap.put(Tables.TransactionType.RegulatoryNotes, JSONArray[3]);
                    TableDataHashMap.put(Tables.TransactionType.RisksAndControls, JSONArray[4]);
                    TableDataHashMap.put(Tables.TransactionType.OtherNotes, JSONArray[5]);
                    int NewTransactionID = 0;
                    NewTransactionID = DBManager.insertTableDataReturnID(Tables.TransactionType.Table, TableDataHashMap, "");
                    json = new Gson().toJson(NewTransactionID);
                    break;
                }
                case "NewAccountingEntry": 
                {
                    String[] JSONArray = request.getParameterValues("data[]");
                    HashMap<String, Object> TableDataHashMap = new HashMap<>();
                    TableDataHashMap.put(Tables.AccountingEntryDefinitions.indexNo, JSONArray[0]);
                    TableDataHashMap.put(Tables.AccountingEntryDefinitions.description, JSONArray[1]);
                    TableDataHashMap.put(Tables.AccountingEntryDefinitions.debit_Amount, JSONArray[2]);
                    TableDataHashMap.put(Tables.AccountingEntryDefinitions.debit_AccountID, JSONArray[3]);
                    TableDataHashMap.put(Tables.AccountingEntryDefinitions.debit_AccountOwner, JSONArray[4]);
                    TableDataHashMap.put(Tables.AccountingEntryDefinitions.credit_Amount, JSONArray[5]);
                    TableDataHashMap.put(Tables.AccountingEntryDefinitions.credit_AccountID, JSONArray[6]);
                    TableDataHashMap.put(Tables.AccountingEntryDefinitions.credit_AccountOwner, JSONArray[7]);
                    TableDataHashMap.put(Tables.AccountingEntryDefinitions.transaction_ID, JSONArray[8]);
                    int NewAccountingEntryID = 0;
                    NewAccountingEntryID = DBManager.insertTableDataReturnID(Tables.AccountingEntryDefinitions.Table, TableDataHashMap, "");
                    json = new Gson().toJson(NewAccountingEntryID);
                    break;
                }
                case "GetPartiesInvolvedInTransaction": 
                {
                    String transactiontypeID = request.getParameter("data");
                    int TransactionTypeID = Integer.parseInt(transactiontypeID);
                    LinkedHashSet<String> Parties = BookKeeper.GetPartiesInvolvedInTransaction(TransactionTypeID);
                    if (Parties.isEmpty()) {
                        json = new Gson().toJson(empty);
                    } else {
                        json = new Gson().toJson(Parties);
                    }
                    break;
                }
                case "GetParamsInvolvedInTransaction": //Return IDs of Parameters from transaction parameters table
                {
                    String transactiontypeID = request.getParameter("data");
                    int TransactionTypeID = Integer.parseInt(transactiontypeID);
                    LinkedHashSet<Integer> ParametersInvolvedInTransaction = BookKeeper.GetParametersInvolvedInTransaction(TransactionTypeID);
                    json = new Gson().toJson(ParametersInvolvedInTransaction);
                    break;
                }
                case "GetParamValuesInvolvedInTransaction": //Return map of param names and their values
                {
                    String transactiontypeID = request.getParameter("data");
                    int TransactionTypeID = Integer.parseInt(transactiontypeID);
                    LinkedHashSet<Integer> ParametersInvolvedInTransaction = BookKeeper.GetParametersInvolvedInTransaction(TransactionTypeID);
                    if (!ParametersInvolvedInTransaction.isEmpty()) 
                    {
                        HashMap<Integer, HashMap<String, String>> ParamValues = BookKeeper.GetParamValuesInvolvedInTransaction(ParametersInvolvedInTransaction);
                        json = new Gson().toJson(ParamValues);
                    } 
                    else 
                    {
                        json = "none";
                    }
                    break;
                }
                case "GetAccountsInvolvedInTransaction": 
                {
                    String transactiontypeID = request.getParameter("data");
                    int TransactionTypeID = Integer.parseInt(transactiontypeID);
                    HashMap<Integer, String> AccountIDs = BookKeeper.GetAccountsInvolvedInTransaction(TransactionTypeID);
                    json = new Gson().toJson(AccountIDs);
                    break;
                }
                case "GetAccountingEntriesInvolvedInTransaction": 
                {
                    String transactiontypeID = request.getParameter("data");
                    int TransactionTypeID = Integer.parseInt(transactiontypeID);
                    HashMap<Integer, HashMap<String, String>> AccountingEntries = BookKeeper.GetAccountingEntriesInvolvedInTransaction(TransactionTypeID);
                    json = new Gson().toJson(AccountingEntries);
                    break;
                }
                case "ExecuteAccountingEntries": 
                {
                    String[] JSONArray = request.getParameterValues("data[]");
                    HashMap<Integer, HashMap<String, Object>> TransactionMap = new HashMap<>();
                    for (int i = 0; i < JSONArray.length; i++) 
                    {
                        String[] AccountingEntriesArray = JSONArray[i].split(",");
                        HashMap<String, Object> TableDataHashMap = new HashMap<>();
                        TableDataHashMap.put(Tables.Transaction.TransactionCode, BookKeeper.RemoveSpecialCharactersExceptColon(AccountingEntriesArray[0]).split(":")[1]);
                        TableDataHashMap.put(Tables.Transaction.CreditAmount, BookKeeper.RemoveSpecialCharactersExceptColon(AccountingEntriesArray[1]).split(":")[1]);
                        TableDataHashMap.put(Tables.Transaction.DebitAmount, BookKeeper.RemoveSpecialCharactersExceptColon(AccountingEntriesArray[2]).split(":")[1]);
                        TableDataHashMap.put(BookKeeper.CreditAccountTypeID, BookKeeper.RemoveSpecialCharactersExceptColon(AccountingEntriesArray[3]).split(":")[1]);
                        TableDataHashMap.put(BookKeeper.DebitAccountTypeID, BookKeeper.RemoveSpecialCharactersExceptColon(AccountingEntriesArray[4]).split(":")[1]);
                        TableDataHashMap.put(Tables.Transaction.TransactionID, BookKeeper.RemoveSpecialCharactersExceptColon(AccountingEntriesArray[5]).split(":")[1]);
                        TableDataHashMap.put(Tables.Transaction.Comment, BookKeeper.RemoveSpecialCharactersExceptColon(AccountingEntriesArray[6]).split(":")[1]);
                        TableDataHashMap.put(Tables.AccountingEntryDefinitions.credit_AccountOwner, BookKeeper.RemoveSpecialCharactersExceptColon(AccountingEntriesArray[7]).split(":")[1]);
                        TableDataHashMap.put(Tables.AccountingEntryDefinitions.debit_AccountOwner, BookKeeper.RemoveSpecialCharactersExceptColon(AccountingEntriesArray[8]).split(":")[1]);
                        TransactionMap.put(i, TableDataHashMap);
                    }

                    String result = BookKeeper.ExecuteTransactionCode(TransactionMap);
                    json = new Gson().toJson(result);
                    break;
                }
                case "CreateLedgerAccount":
                {
                    int NewLedgerID = 0;
                    String[] JSONArray = request.getParameterValues("data[]");
                    HashMap<String, Object> NewData = new HashMap<>();
                    String Name = JSONArray[0]; String BookKeepingAccountType = JSONArray[1];
                    NewData.put(Tables.LedgerAccounts.Name, Name);
                    NewData.put(Tables.LedgerAccounts.BookKeepingAccountType, BookKeepingAccountType);
                    NewLedgerID = DBManager.insertTableDataReturnID(Tables.LedgerAccounts.Table, NewData, "");
                    json = new Gson().toJson(NewLedgerID);
                    break;
                }
                case "CreateSubLedgerAccount":
                {
                    int NewSubLedgerID = 0;
                    String[] JSONArray = request.getParameterValues("data[]");
                    HashMap<String, Object> NewData = new HashMap<>();
                    String Name = JSONArray[0]; String ParentType = JSONArray[2];
                    int ParentID = Integer.parseInt(JSONArray[1]);
                    NewData.put(Tables.SubLedgerAccounts.Name, Name);
                    NewData.put(Tables.SubLedgerAccounts.ParentID, ParentID);
                    NewData.put(Tables.SubLedgerAccounts.ParentType, ParentType);
                    NewSubLedgerID = DBManager.insertTableDataReturnID(Tables.SubLedgerAccounts.Table, NewData, "");
                    json = new Gson().toJson(NewSubLedgerID);
                    break;
                }
                default: {
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
            Logger.getLogger(BookKeepingServlet.class.getName()).
                    log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(BookKeepingServlet.class.getName()).
                    log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(BookKeepingServlet.class.getName()).
                    log(Level.SEVERE, null, ex);
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
            Logger.getLogger(BookKeepingServlet.class.getName()).
                    log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(BookKeepingServlet.class.getName()).
                    log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(BookKeepingServlet.class.getName()).
                    log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "This servlet handles bookkeeping, accounting entries, general ledger, etc";
    }// </editor-fold>

}
