/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Managers;

import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import wmengine.Managers.*;
import wmengine.Tables.*;

/**
 *
 * @author Saint
 */
public class ServiceManager {
    public static ArrayList<Integer> GetAllServicesIds() throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        ArrayList<Integer> ServiceIds = DBManager.GetIntArrayList(Tables.Services.ID, Tables.Services.Table, "ORDER by " + Tables.Services.Name + " DESC");
        return ServiceIds;
    }
    
    public static HashMap<String, String> GetAllServiceDetails(int ServiceId) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        HashMap<String, String> Details = DBManager.GetTableData(Tables.Services.Table, "where " + Tables.Services.ID + " = " + ServiceId );
        String catId = Details.get("categoryid");
        int categoryId = Integer.parseInt(catId);
        String Category = GeneralCategoryManager.GetCategoryName(categoryId);
        Details.put("category", Category);
        return Details;
    }
}
