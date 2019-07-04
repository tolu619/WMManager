/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Models;

import wmengine.Managers.ServicesManager;
import java.util.ArrayList;
import java.util.HashMap;
import wmengine.Tables.Tables;

/**
 *
 * @author KOWinUltra
 */
public class Category 
{
        public int ID;
        public String Name;
        public String Description;
        public ArrayList<ServiceSubCategory> SubCategories = new ArrayList<>();
        
        public Category(HashMap<String, String> Map)
        {
            ID = Integer.parseInt(Map.get(Tables.ServiceCategories.ID));
            Name = Map.get(Tables.ServiceCategories.Title);
            Description = Map.get(Tables.ServiceCategories.Description);
        }
        
        public boolean GetSubCategories()
        {
            boolean success = false;
            try
            {
                ArrayList <Integer> SubCatIDs = ServicesManager.GetServiceSubCategoryIDs(ID);
                for (Integer ID: SubCatIDs)
                {
                    try
                    {
                        ServiceSubCategory ThisSub = new ServiceSubCategory(ServicesManager.GetSubCategoryDetails(ID));
                        SubCategories.add(ThisSub);
                        success = true;
                    }
                    catch(Exception e)
                    {}
                }
            }
            catch(Exception e)
            {
                String Message = e.getMessage();
            }
            finally
            {

            }
            return success;
        }
        
}
