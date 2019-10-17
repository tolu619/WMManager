/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Managers;

import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import wmengine.Managers.DBManager;
import wmengine.Managers.GeneralAccountManager;
import wmengine.Managers.UtilityManager;
import wmengine.Tables.Tables;

/**
 *
 * @author DELL
 */
public class BookKeeper 
{
    public static String CreditAccountTypeID = "CreditAccountTypeID";
    public static String DebitAccountTypeID = "DebitAccountTypeID";
    public static String CreditAccountOwnerIDString = "CreditAccountOwnerID";
    public static String DebitAccountOwnerIDString = "DebitAccountOwnerID";

    public static HashMap<Integer, HashMap<String, String>> GetAllTransactionTypes() throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        return DBManager.GetAllCollumnsLimitNumberOfRows(0, 50, Tables.TransactionType.Table, "");
    }

    public static HashMap<Integer, HashMap<String, String>> GetAccountingEntriesInvolvedInTransaction(int TransactionID) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        return DBManager.GetAllCollumnsLimitNumberOfRows(0, 50, Tables.AccountingEntryDefinitions.Table, "where " + Tables.AccountingEntryDefinitions.transaction_ID + "=" + TransactionID);
    }
    
    public static String RemoveSpecialCharactersExceptColon(String Original)
    {
        Pattern MyRegex = Pattern.compile("[a-zA-Z0-9s:]");
        Matcher match= MyRegex.matcher(Original);
        String Result = "";
        while (match.find())
        {
            String NextCharacter = match.group();
            Result += NextCharacter;
        }
        return Result;
    }

    public static ArrayList<JournalEntry> GetJournalEntriesForMarketOperatorEntity(String CreditAccountIDs, String DebitAccountIDs) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        ArrayList<JournalEntry> JournalEntries = new ArrayList<>();

        String[] ThisID = CreditAccountIDs.split(",");
        for (int i = 0; i < ThisID.length; i++) {
            String A = ThisID[i];
            int SubLedgerID = Integer.parseInt(A);
            HashMap<String, String> SubLedgerDetails = DBManager.GetTableData(Tables.SubLedgerAccounts.Table, "WHERE " + Tables.SubLedgerAccounts.ID + "=" + SubLedgerID);
            int LedgerID = Integer.parseInt(SubLedgerDetails.get(Tables.SubLedgerAccounts.ParentID));
            HashMap<String, String> LedgerDetails = DBManager.GetTableData(Tables.LedgerAccounts.Table, "WHERE " + Tables.LedgerAccounts.ID + "=" + LedgerID);
            JournalEntry ThisEntry = new JournalEntry();
            ThisEntry.AccountType = LedgerDetails.get(Tables.LedgerAccounts.BookKeepingAccountType);
            ThisEntry.LedgerAccount = LedgerDetails.get(Tables.LedgerAccounts.Name);
            ThisEntry.SubLedgerAccount = SubLedgerDetails.get(Tables.SubLedgerAccounts.Name);
            ThisEntry.EntryType = JournalEntry.BookKeepingEntryType.Credit;
            JournalEntries.add(ThisEntry);
        }

        String[] splittwo = DebitAccountIDs.split(",");
        for (int i = 0; i < splittwo.length; i++) {
            int SubLedgerID = Integer.parseInt(splittwo[i]);
            HashMap<String, String> SubLedgerDetails = DBManager.GetTableData(Tables.SubLedgerAccounts.Table, "WHERE " + Tables.SubLedgerAccounts.ID + "=" + SubLedgerID);
            int LedgerID = Integer.parseInt(SubLedgerDetails.get(Tables.SubLedgerAccounts.ParentID));
            HashMap<String, String> LedgerDetails = DBManager.GetTableData(Tables.LedgerAccounts.Table, "WHERE " + Tables.LedgerAccounts.ID + "=" + LedgerID);
            JournalEntry ThisEntry = new JournalEntry();
            ThisEntry.AccountType = LedgerDetails.get(Tables.LedgerAccounts.BookKeepingAccountType);
            ThisEntry.LedgerAccount = LedgerDetails.get(Tables.LedgerAccounts.Name);
            ThisEntry.SubLedgerAccount = SubLedgerDetails.get(Tables.SubLedgerAccounts.Name);
            ThisEntry.EntryType = JournalEntry.BookKeepingEntryType.Debit;
            JournalEntries.add(ThisEntry);
        }

        return JournalEntries;
    }

    public static ArrayList<JournalEntry> GetJournalEntriesForThirdPartyEntities(String CreditAccountIDs, String DebitAccountIDs) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        ArrayList<JournalEntry> JournalEntries = new ArrayList<>();

        String[] split = CreditAccountIDs.split(",");
        for (int i = 0; i < split.length; i++) {
            int SubLedgerID = Integer.parseInt(split[i]);
            HashMap<String, String> SubLedgerDetails = DBManager.GetTableData(Tables.SubLedgerAccounts.Table, "WHERE " + Tables.SubLedgerAccounts.ID + "=" + SubLedgerID);
            int LedgerID = Integer.parseInt(SubLedgerDetails.get(Tables.SubLedgerAccounts.ParentID));
            HashMap<String, String> LedgerDetails = DBManager.GetTableData(Tables.LedgerAccounts.Table, "WHERE " + Tables.LedgerAccounts.ID + "=" + LedgerID);
            JournalEntry ThisEntry = new JournalEntry();
            ThisEntry.AccountType = LedgerDetails.get(Tables.LedgerAccounts.BookKeepingAccountType);
            ThisEntry.LedgerAccount = LedgerDetails.get(Tables.LedgerAccounts.Name);
            ThisEntry.SubLedgerAccount = SubLedgerDetails.get(Tables.SubLedgerAccounts.Name);
            ThisEntry.EntryType = JournalEntry.BookKeepingEntryType.Credit;
            JournalEntries.add(ThisEntry);
        }

        String[] splittwo = DebitAccountIDs.split(",");
        for (int i = 0; i < splittwo.length; i++) {
            int SubLedgerID = Integer.parseInt(splittwo[i]);
            HashMap<String, String> SubLedgerDetails = DBManager.GetTableData(Tables.SubLedgerAccounts.Table, "WHERE " + Tables.SubLedgerAccounts.ID + "=" + SubLedgerID);
            int LedgerID = Integer.parseInt(SubLedgerDetails.get(Tables.SubLedgerAccounts.ParentID));
            HashMap<String, String> LedgerDetails = DBManager.GetTableData(Tables.LedgerAccounts.Table, "WHERE " + Tables.LedgerAccounts.ID + "=" + LedgerID);
            JournalEntry ThisEntry = new JournalEntry();
            ThisEntry.AccountType = LedgerDetails.get(Tables.LedgerAccounts.BookKeepingAccountType);
            ThisEntry.LedgerAccount = LedgerDetails.get(Tables.LedgerAccounts.Name);
            ThisEntry.SubLedgerAccount = SubLedgerDetails.get(Tables.SubLedgerAccounts.Name);
            ThisEntry.EntryType = JournalEntry.BookKeepingEntryType.Debit;
            JournalEntries.add(ThisEntry);
        }

        return JournalEntries;
    }

    public static HashMap<Integer, HashMap<String, String>> GetAllLedgerAccounts() throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        return DBManager.GetAllCollumnsLimitNumberOfRows(0, 50, Tables.LedgerAccounts.Table, "");
    }

    public static HashMap<Integer, HashMap<String, String>> GetSubLedgerAccountsByLedgerID(int LedgerID) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        return DBManager.GetAllCollumnsLimitNumberOfRows(0, 50, Tables.SubLedgerAccounts.Table, "WHERE " + Tables.SubLedgerAccounts.ParentID + "=" + LedgerID);
    }

    public static String DetermineEntryTypeByBookKeepingAccountType(String AccountType, Boolean IsMarketOperatorEntity) {
        String EntryType;
        switch (AccountType) {
            case "Assets": {
                if (IsMarketOperatorEntity) {
                    break;
                }
            }
            case "Expenses": {

                break;
            }
            case "Dividends": {

                break;
            }
            case "Liabilites": {

                break;
            }
            case "Equity": {

                break;
            }
            case "Revenue": {

                break;
            }
        }
        return "";
    }

    public static LinkedHashSet<Integer> GetParametersInvolvedInTransaction(int TransactionID) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        String ThisTransactionInAccountingEntryDef = "where " + Tables.AccountingEntryDefinitions.transaction_ID + "=" + TransactionID;
        ArrayList<Integer> AccountingEntriesIDs = DBManager.GetIntArrayList(Tables.AccountingEntryDefinitions.ID, Tables.AccountingEntryDefinitions.Table, ThisTransactionInAccountingEntryDef);
        LinkedHashSet<Integer> TransactionParameterIDs = new LinkedHashSet<>(); //This datatype automatically screens out duplicate entries
        if (!AccountingEntriesIDs.isEmpty()) {
            for (Integer AccountingEntriesID : AccountingEntriesIDs) {
                TransactionParameterIDs.add(DBManager.GetInt(Tables.AccountingEntryDefinitions.debit_Amount, Tables.AccountingEntryDefinitions.Table, "where " + Tables.AccountingEntryDefinitions.ID + "=" + AccountingEntriesID));
                TransactionParameterIDs.add(DBManager.GetInt(Tables.AccountingEntryDefinitions.credit_Amount, Tables.AccountingEntryDefinitions.Table, "where " + Tables.AccountingEntryDefinitions.ID + "=" + AccountingEntriesID));
            }
        }
        return TransactionParameterIDs;
    }

    public static HashMap<Integer, HashMap<String, String>> GetParamValuesInvolvedInTransaction(LinkedHashSet<Integer> TransactionParameterIDs) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        //HashMap<String, String> ParamValues = new HashMap<>();
        HashMap<Integer, HashMap<String, String>> ParamValuesMegaMap = new HashMap<>();
        for (Integer ParamID : TransactionParameterIDs) {
            HashMap<String, String> ParamValues = new HashMap<>();
            String name = DBManager.GetString(Tables.TransactionParameters.ParamName, Tables.TransactionParameters.Table, "where " + Tables.TransactionParameters.ParamID + "=" + ParamID);
            String value = DBManager.GetString(Tables.TransactionParameters.ParamValue, Tables.TransactionParameters.Table, "where " + Tables.TransactionParameters.ParamID + "=" + ParamID);
//            if (value.contains("[")) //If it's a derived value parameter
//            {
//                //get each ID here and get the numerical value in ReplaceIDsInFormulaString
//            }
            ParamValues.put("name", name);
            if (value == null || value.equals("0")) {
                ParamValues.put("value", "set value");
            } else {
                ParamValues.put("value", value);
            }
            ParamValuesMegaMap.put(ParamID, ParamValues);
        }
        return ParamValuesMegaMap;
    }

    private String ReplaceIDsInFormulaString(String FormulaString) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        StringBuilder strBuilder = new StringBuilder();
        ArrayList<Integer> IDsEmbeddedInFormula = new ArrayList<>();
        for (int i = 0; i < FormulaString.length(); i++) {
            char ThisCharacter = FormulaString.charAt(i);
            if (Character.isDigit(ThisCharacter)) //If it's a number, add it to the stringbuilder
            {
                strBuilder.append(ThisCharacter);
            } else { // (|18| - |2|)  ([18] - [2]) (18-2)
                IDsEmbeddedInFormula.add(Integer.parseInt(strBuilder.toString())); //if it's not a number, add the last number built to the arraylist and clear out the stringbuilder
                strBuilder.delete(0, strBuilder.length());
            }
        }
        for (Integer id : IDsEmbeddedInFormula) {
            FormulaString.replaceFirst("[" + id.toString() + "]", //Get the value of the parameter represented by this ID from the Transactions Paramater table and 
                    DBManager.GetString(Tables.TransactionParameters.ParamValue, Tables.TransactionParameters.Table, //replace the IDs in the formula with the actual values
                            "where" + Tables.TransactionParameters.ParamID + "=" + id));
        }
        return strBuilder.toString();
    }

    public static HashMap<Integer, String> GetAccountsInvolvedInTransaction(int TransactionID) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        HashMap<Integer, String> Accounts = new HashMap<>();
        String ThisTransactionInAccountingEntryDef = "where " + Tables.AccountingEntryDefinitions.transaction_ID + "=" + TransactionID;
        ArrayList<Integer> AccountingEntriesIDs = DBManager.GetIntArrayList(Tables.AccountingEntryDefinitions.ID, Tables.AccountingEntryDefinitions.Table, ThisTransactionInAccountingEntryDef);
        LinkedHashSet<Integer> AccountIDs = new LinkedHashSet<>(); //This datatype automatically screens out duplicate entries
        for (Integer AccountingEntriesID : AccountingEntriesIDs) {
            AccountIDs.add(DBManager.GetInt(Tables.AccountingEntryDefinitions.debit_AccountID,
                    Tables.AccountingEntryDefinitions.Table,
                    "where " + Tables.AccountingEntryDefinitions.ID + "=" + AccountingEntriesID));
            AccountIDs.add(DBManager.GetInt(Tables.AccountingEntryDefinitions.credit_AccountID,
                    Tables.AccountingEntryDefinitions.Table,
                    "where " + Tables.AccountingEntryDefinitions.ID + "=" + AccountingEntriesID));
        }
        for (Integer AccountID : AccountIDs) {
            Accounts.put(AccountID, DBManager.GetString(
                    Tables.SubLedgerAccounts.Name,
                    Tables.SubLedgerAccounts.Table,
                    "where " + Tables.SubLedgerAccounts.ID + "=" + AccountID));
        }
        return Accounts;
    }

    public static String GenerateTransactionID(String TransactionCode, String FromUserID) throws ParseException {
        String FirstTwoCharactersOfTransactionCode = TransactionCode.substring(0, 2);
        String dateNow = "" + UtilityManager.CurrentDate();
        String timeNow = "" + UtilityManager.CurrentTime();
        dateNow = dateNow.replace("-", "");
        timeNow = timeNow.replace(":", "");
        //If the UserID is greater than 4 digits, truncate it to 4 digits. If it's less than, add zeros until it becomes 4 digits
        if (FromUserID.length() > 4) {
            FromUserID = FromUserID.substring(0, 3);
        } else if (FromUserID.length() < 4) {
            int Difference = 4 - FromUserID.length();
            for (int i = FromUserID.length(); i < Difference; i++) {
                FromUserID = "0" + FromUserID;
            }
        }
        String TransactionId = FirstTwoCharactersOfTransactionCode + "" + FromUserID + "" + dateNow + "" + timeNow;
        return TransactionId;
    }

    public static String ExecuteTransactionCode(HashMap<Integer, HashMap<String, Object>> TransactionMap)
            throws ClassNotFoundException, SQLException, ParseException, UnsupportedEncodingException 
    {
        String Result = "";
        //Get each accounting entry out of the transaction code hashmap
        Set<Integer> keys = TransactionMap.keySet();
        Iterator<Integer> iterator = keys.iterator();
        while (iterator.hasNext()) 
        {
            int nextKey = iterator.next();
            HashMap<String, Object> TransactionTableData = TransactionMap.get(nextKey);
            String DebitAccountOwnerID = TransactionTableData.get(Tables.AccountingEntryDefinitions.debit_AccountOwner).toString();
            String CreditAccountOwnerID = TransactionTableData.get(Tables.AccountingEntryDefinitions.credit_AccountOwner).toString();
            String TransactionID = GenerateTransactionID(TransactionTableData.get(Tables.Transaction.TransactionCode).toString(), DebitAccountOwnerID);
            TransactionTableData.put(Tables.Transaction.TransactionID, TransactionID);
            //Get Credit and Debit account numbers
            String CreditAccountNumber = GeneralAccountManager.GetUserAccountNumber(Integer.parseInt(CreditAccountOwnerID), Integer.parseInt(TransactionTableData.get("CreditAccountTypeID").toString()));
            String DebitAccountNumber = GeneralAccountManager.GetUserAccountNumber(Integer.parseInt(DebitAccountOwnerID), Integer.parseInt(TransactionTableData.get("DebitAccountTypeID").toString()));
            TransactionTableData.put(Tables.Transaction.CreditAccountNumber, CreditAccountNumber);
            TransactionTableData.put(Tables.Transaction.DebitAccountNumber, DebitAccountNumber);
            
            HashMap<String, Object> TransactionHistoryTableData = new HashMap<>();
            Result = MoveWarrantsAsDefinedByAccountingEntry(TransactionTableData);
            TransactionHistoryTableData.putAll(TransactionTableData);  //Copy this out before removing some items from it
            TransactionTableData.remove(Tables.AccountingEntryDefinitions.credit_AccountOwner);
            TransactionTableData.remove(Tables.AccountingEntryDefinitions.debit_AccountOwner);
            TransactionTableData.remove(CreditAccountTypeID);
            TransactionTableData.remove(DebitAccountTypeID);
            int TransactionRecordID = DBManager.insertTableDataReturnID(Tables.Transaction.Table, TransactionTableData, "");
            //Log Transaction History
            TransactionHistoryTableData.put(BookKeeper.CreditAccountOwnerIDString, CreditAccountOwnerID);
            TransactionHistoryTableData.put(BookKeeper.DebitAccountOwnerIDString, DebitAccountOwnerID);
            Result += LogTransactionHistory(TransactionHistoryTableData);
            //Get Old balance and new balance
        }
        return Result;
    }
    
    public static String MoveWarrantsAsDefinedByAccountingEntry(HashMap<String, Object> AccountingEntryMap) throws ClassNotFoundException, SQLException, UnsupportedEncodingException
    {
        String result = "failed";
        int FromAmount = Integer.parseInt(AccountingEntryMap.get(Tables.Transaction.DebitAmount).toString());
        int FromUserID = Integer.parseInt(AccountingEntryMap.get(Tables.AccountingEntryDefinitions.debit_AccountOwner).toString());
        int FromLedgerID = Integer.parseInt(AccountingEntryMap.get(DebitAccountTypeID).toString());
        //Check if there is enough in this account to transfer
        int AmountInSendersAccount = GetAccountBalanceBySubledgerID(FromUserID, FromLedgerID);
        if (AmountInSendersAccount < FromAmount)
        {
            return "Insufficient Balance";
        }
        else
        {
            int ToAmount = Integer.parseInt(AccountingEntryMap.get(Tables.Transaction.CreditAmount).toString());
            String FromAccountRecordString = DBManager.GetString(Tables.AccountRecord.AccountBalance, Tables.AccountRecord.Table, "where " + Tables.AccountRecord.UserID + "=" 
                    + AccountingEntryMap.get(Tables.AccountingEntryDefinitions.debit_AccountOwner).toString());
            String ToAccountRecordString = DBManager.GetString(Tables.AccountRecord.AccountBalance, Tables.AccountRecord.Table, "where " + Tables.AccountRecord.UserID + "=" 
                    + AccountingEntryMap.get(Tables.AccountingEntryDefinitions.credit_AccountOwner).toString());
            String ToAccountNewRecordString = ""; 
            String FromAccountNewRecordString = FromAccountRecordString; //Initialize the post-transfer account records to the same value as the pre-transfer records
            int ToUserID = Integer.parseInt(AccountingEntryMap.get(Tables.AccountingEntryDefinitions.credit_AccountOwner).toString());
            int ToLedgerID = Integer.parseInt(AccountingEntryMap.get(CreditAccountTypeID).toString());
            String[] Balances = FromAccountRecordString.split(";"); //All Balances of all Subledgers
            int TotalBalance = 0; int Change = 0;
            for (String ThisBalance : Balances) //Loop through all the Subledgers
            {
                if (ThisBalance.split(":")[0].equals(FromLedgerID + "")) //For the balance in the specific Subledger we are considering,
                {
                    String[] WarrantsArray = ThisBalance.split(":")[1].split("/"); //Get all the warrants that make up the total balance
                    int Counter = 0;
                    while (TotalBalance < FromAmount) 
                    {
                        int AmountLeftToTarget = FromAmount - TotalBalance;
                        int warrantID = Integer.parseInt(WarrantsArray[Counter].split("_")[0]);
                        int warrantValue = Integer.parseInt(WarrantsArray[Counter].split("_")[1]);
                        int warrantParentTransactionID = Integer.parseInt(WarrantsArray[Counter].split("_")[2]);
                        if (AmountLeftToTarget < warrantValue) //If there will be change left after transferring this specific warrant
                        {
                            Change = warrantValue - AmountLeftToTarget;
                            ToAccountNewRecordString += warrantID + "_" + AmountLeftToTarget + "_" + warrantParentTransactionID;
                            //Move only the amount of the warrant needed to the receiver's account
                            FromAccountNewRecordString = FromAccountNewRecordString.replaceAll(WarrantsArray[Counter], 
                                    warrantID + "_" + Change + "_" + warrantParentTransactionID); //replace the record of this warrant in the sender's account with
                            //the amount of change left over in the same warrant
                            TotalBalance += warrantValue;
                            AmountLeftToTarget -= warrantValue;
                        }
                        else if (AmountLeftToTarget >= warrantValue) //There will be no change left over
                        {
                            ToAccountNewRecordString += warrantID + "_" + warrantValue + "_" + warrantParentTransactionID + "/"; 
                            //since there's no change, move the entire thing
                            FromAccountNewRecordString = FromAccountNewRecordString.replaceAll(WarrantsArray[Counter] + "/", ""); 
                            //remove the record of this warrant from the sender's account
                            TotalBalance += warrantValue;
                            AmountLeftToTarget -= warrantValue;
                        }
                        Counter++;
                    }
                    
                    String[] ReceiversBalances = ToAccountRecordString.split(";"); //All Balances of all Subledgers
                    for (String Balance : ReceiversBalances) //Loop through all the Subledgers
                    {
                        if (Balance.split(":")[0].equals(ToLedgerID + "")) //For the balance in the specific Subledger we are considering,
                        {
                            ToAccountNewRecordString = Balance + "/" + ToAccountNewRecordString;
                            ToAccountNewRecordString = ToAccountRecordString.replaceAll(Balance, ToAccountNewRecordString);
                            //Replace the values in this subledger's record with the new record string
                        }
                    }
                    result = DBManager.UpdateStringData(Tables.AccountRecord.Table, Tables.AccountRecord.AccountBalance, FromAccountNewRecordString, 
                            "WHERE " + Tables.AccountRecord.UserID + "=" + FromUserID); //Update the sender's acccount with the correct account balance
                    result += DBManager.UpdateStringData(Tables.AccountRecord.Table, Tables.AccountRecord.AccountBalance, ToAccountNewRecordString, 
                            "WHERE " + Tables.AccountRecord.UserID + "=" + ToUserID); //Update the sender's acccount with the correct account balance
                }
            }
        }
        
        return result;
    }

    public static String[] GetWarrantIDsForTransaction(int UserID, int SubledgerID, int AmountRequired) throws ClassNotFoundException, SQLException, UnsupportedEncodingException 
    {
        String[] Warrants = null;
        if (GetAccountBalanceBySubledgerID(UserID, SubledgerID) < AmountRequired) //Insufficient Funds
        {
            return Warrants;
        } 
        else 
        {
            int TotalBalance = 0;
            String DBText = DBManager.GetString(Tables.AccountRecord.AccountBalance, Tables.AccountRecord.Table, "where " + Tables.AccountRecord.UserID + "=" + UserID);
            String[] Balances = DBText.split(";"); //All Balances of all Subledgers
            String SubledgerIDString = SubledgerID + "";
            for (String ThisBalance : Balances) {
                if (ThisBalance.split(":")[0].equals(SubledgerIDString)) //If it's the particular Subledger we want 
                {
                    String[] WarrantsArray = ThisBalance.split("/");
                    int Counter = 0;
                    while (TotalBalance < AmountRequired) 
                    {
                        int warrantValue = Integer.parseInt(WarrantsArray[Counter].split("_")[1]);
                        TotalBalance += warrantValue;
                        Warrants[Counter] = WarrantsArray[Counter];
                        Counter++;
                    }
                }
            }

            return Warrants;
        }

    }

    public static Integer GetAccountBalanceBySubledgerID(int UserID, int SubledgerID) throws ClassNotFoundException, SQLException, UnsupportedEncodingException 
    {
        int AccountBalance = 0;
        String DBText = DBManager.GetString(Tables.AccountRecord.AccountBalance, Tables.AccountRecord.Table, "where " + Tables.AccountRecord.UserID + "=" + UserID);
        String[] Balances = DBText.split(";"); //All Balances of all Subledgers
        String SubledgerIDString = SubledgerID + "";
        for (String ThisBalance : Balances) {
            if (ThisBalance.split(":")[0].equals(SubledgerIDString)) //If it's the particular Subledger we want 
            {
                if (ThisBalance.contains("/")) //Has more than one warrant making up its total balance
                {
                    AccountBalance = GeneralAccountManager.GetWarrantValueFromWarrants(ThisBalance.split(":")[1]);
                } 
                else 
                {
                    String Temp = ThisBalance.split(":")[1];
                    Temp = Temp.split("_")[1];
                    //Temp = Temp.split("_")[0];
                    AccountBalance = Integer.parseInt(Temp); //get the amount in the person's account
                }
            }
        }

        return AccountBalance;
    }

//    public Integer SetAccountBalanceBySubledgerID(int UserID, int SubledgerID, int TransactionID) throws ClassNotFoundException, SQLException, UnsupportedEncodingException
//    {
//        int AccountBalance = 0;
//        String DBText = DBManager.GetString(Tables.AccountRecord.AccountBalance, Tables.AccountRecord.Table, "where " + Tables.AccountRecord.UserID + "=" + UserID);
//        String[] Balances = DBText.split("/"); //All Balances of all Subledgers
//        String SubledgerIDString = SubledgerID + "";
//        for (String ThisBalance: Balances)
//        {
//            if (ThisBalance.split(":")[0].equals(SubledgerIDString)) //If it's the particular Subledger we want 
//            {
//                String NewBalanceRecord = 
//                String Temp = ThisBalance.split(":")[1];
//                Temp = Temp.split("-")[1];
//                Temp = Temp.split("_")[0];
//                AccountBalance = Integer.parseInt(Temp); //get the amount in the person's account
//            }
//        }
//        
//        return AccountBalance;
//    }
    public static LinkedHashSet<String> GetPartiesInvolvedInTransaction(int TransactionID) throws ClassNotFoundException, SQLException, ParseException, UnsupportedEncodingException {
        String ThisTransactionInAccountingEntryDef = "where " + Tables.AccountingEntryDefinitions.transaction_ID + "=" + TransactionID;
        ArrayList<Integer> AccountingEntriesIDs = DBManager.GetIntArrayList(Tables.AccountingEntryDefinitions.ID, Tables.AccountingEntryDefinitions.Table, ThisTransactionInAccountingEntryDef);
        LinkedHashSet<String> PartiesInvolvedInTransaction = new LinkedHashSet<>(); //This datatype automatically screens out duplicate entries
        for (Integer AccountingEntriesID : AccountingEntriesIDs) {
            PartiesInvolvedInTransaction.add(DBManager.GetString(Tables.AccountingEntryDefinitions.credit_AccountOwner,
                    Tables.AccountingEntryDefinitions.Table,
                    "where " + Tables.AccountingEntryDefinitions.ID + "=" + AccountingEntriesID));
            PartiesInvolvedInTransaction.add(DBManager.GetString(Tables.AccountingEntryDefinitions.debit_AccountOwner,
                    Tables.AccountingEntryDefinitions.Table,
                    "where " + Tables.AccountingEntryDefinitions.ID + "=" + AccountingEntriesID));
        }
        return PartiesInvolvedInTransaction;
    }

    public static String LogTransactionHistory(HashMap<String, Object> TransactionData) throws SQLException, ClassNotFoundException, UnsupportedEncodingException, ParseException {
        String result = "failed";
        HashMap<String, Object> TransactionHistoryTableData = new HashMap<>();
        String dateNow = "" + UtilityManager.CurrentDate();
        String timeNow = "" + UtilityManager.CurrentTime();
        dateNow = dateNow.replace("-", "");
        timeNow = timeNow.replace(":", "");
        TransactionHistoryTableData.put(Tables.TransactionHistory.Date, dateNow);
        TransactionHistoryTableData.put(Tables.TransactionHistory.Time, timeNow);
        TransactionHistoryTableData.put(Tables.TransactionHistory.TransactionId, TransactionData.get(Tables.TransactionHistory.TransactionId));
        TransactionHistoryTableData.put(Tables.TransactionHistory.TransactionCode, TransactionData.get(Tables.TransactionHistory.TransactionCode));
//        TransactionHistoryTableData.put(Tables.TransactionHistory.Status, "Completed");
        String DebitName = DBManager.GetString(Tables.Member.FirstName, Tables.Member.Table, "where " + Tables.Member.UserID + "=" + TransactionData.get(BookKeeper.DebitAccountOwnerIDString));
        DebitName += " " + DBManager.GetString(Tables.Member.LastName, Tables.Member.Table, "where " + Tables.Member.UserID + "=" + TransactionData.get(BookKeeper.DebitAccountOwnerIDString));
        String CreditName = DBManager.GetString(Tables.Member.FirstName, Tables.Member.Table, "where " + Tables.Member.UserID + "=" + TransactionData.get(BookKeeper.CreditAccountOwnerIDString));
        CreditName += " " + DBManager.GetString(Tables.Member.LastName, Tables.Member.Table, "where " + Tables.Member.UserID + "=" + TransactionData.get(BookKeeper.CreditAccountOwnerIDString));
        String Description = "Debit " + DebitName + " " + TransactionData.get(Tables.Transaction.DebitAmount)
                + " Credit " + CreditName + " " + TransactionData.get(Tables.Transaction.CreditAmount);
        TransactionHistoryTableData.put(Tables.TransactionHistory.Description, Description);
        
        try {
            result = DBManager.insertTableData(Tables.TransactionHistory.Table, TransactionHistoryTableData, "");
        } catch (SQLException e) {
            String error = e.getMessage();
            System.out.print(error);
        }
        return result;
    }

    public static HashMap<Integer, Object> GetAccountBalancesByUserID(int userID, Boolean IsWarrant) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {
        HashMap<Integer, Object> balances = new HashMap<>();
        String userAccountRecord = DBManager.GetString(Tables.AccountRecord.AccountBalance, Tables.AccountRecord.Table, "where " + Tables.AccountRecord.UserID + " = " + userID);
        try {
            String[] records = userAccountRecord.split(";");
            for (String record : records) {
                String SubLedgerID = record.split(":")[0];
                if (IsWarrant) {

                } else {
                    int Value = Integer.parseInt(record.split("-")[1]);
                    balances.put(Integer.parseInt(SubLedgerID), Value);
                }
            }
        } catch (Exception E) {

        }

        return balances;
    }

}

class JournalEntry {

    public String SubLedgerAccount, LedgerAccount, AccountType;

    public enum BookKeepingEntryType {

        Debit, Credit
    }
    public BookKeepingEntryType EntryType;

    public JournalEntry() {

    }
}
