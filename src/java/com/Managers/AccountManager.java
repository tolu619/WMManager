/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Managers;

import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.HashMap;
import wmengine.Managers.*;
import wmengine.Tables.*;

/**
 *
 * @author Saint
 */
public class AccountManager {

    public static int WealthMarketUserID = 1; // Assuming the wealth market id is 1 in account definition table.

    public static int warrantAccountID = 1; // Assuming the warrant account definition id is 1 in account definition table.
    public static int reflationAccountID = 2; // Assuming the Reflation Rights account definition id is 2 in account definition table.
    public static int pcrAccountID = 3; // Assuming the Par Cash Rights account definition id is 3 in account definition table.

    public static int directPropertyID = 1; // Assuming the direct account definition id is 1 in account properties table.
    public static int blockedPropertyID = 2; // Assuming the blocked account definition id is 2 in account properties table.
    public static int escrowProperty = 3; // Assuming the escrow account definition id is 3 in account properties table.
    public static int offlineProperty = 4; // Assuming the offline account definition id is 4 in account properties table.

   
    
    public static int GetUserOverDraftLine(int UserID) throws ClassNotFoundException, SQLException, UnsupportedEncodingException, ParseException {
        int result = DBManager.GetInt(Tables.OverDraft.ODAmount, Tables.OverDraft.Table, "where " + Tables.OverDraft.RecipientID + " = " + UserID);
        return result;
    }

    public static HashMap<String, String> GetCurrentReflationRate() throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        HashMap<String, String> ref = DBManager.GetTableData(Tables.ReflationRates.Table, "where " + Tables.ReflationRates.Status + " = 'active'");
        return ref;
    }

}
