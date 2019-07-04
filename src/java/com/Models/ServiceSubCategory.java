/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Models;

import java.util.ArrayList;
import java.util.HashMap;
import wmengine.Tables.Tables;

/**
 *
 * @author KOWinUltra
 */
public class ServiceSubCategory 
{
        public int ID;
        public String Name;
        public String Description;
        public int AveragePrice;
        public int CategoryID;
        public ArrayList<ServiceProperty> Properties;
        
        public ServiceSubCategory(HashMap<String, String> Map)
        {
            try
            {
                ID = Integer.parseInt(Map.get(Tables.ServiceSubCategories.ID));
                Name = Map.get(Tables.ServiceSubCategories.Name);
                Description = Map.get(Tables.ServiceCategories.Description);
                AveragePrice = Integer.parseInt(Map.get(Tables.ServiceSubCategories.AveragePrice));
                CategoryID = Integer.parseInt(Map.get(Tables.ServiceSubCategories.CategoryID));
                Properties = new ArrayList<ServiceProperty>();
                String TempString = Map.get(Tables.ServiceSubCategories.Properties);
                String[] PropertyStrings = TempString.split(";");
                for (String PropertyString : PropertyStrings) 
                {
                    ServiceProperty ThisProperty = new ServiceProperty(PropertyString);
                    Properties.add(ThisProperty);
                }
                //        ServiceProviderID = Integer.parseInt(Map.get(ServiceCategories.ServiceProviderID));
            }
            catch(Exception e) 
            { 
                String ErrorMessage = e.getMessage();
            }
        }
}
