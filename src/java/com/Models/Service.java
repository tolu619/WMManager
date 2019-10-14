/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Models;

import wmengine.Tables.Tables.ServicesType;
import wmengine.Tables.Tables.ServicesJoin;
import wmengine.Tables.Tables.ServiceListings;
import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.HashMap;
import wmengine.Managers.UtilityManager;

/**
 *
 * @author KOWinUltra
 */
public class Service 
{
    public int ID;
    public Category ParentService; //Not yet done
    public String ServiceTypeName;
    public String Name;
    public String Summary;
    public String DetailedDescription;
    public int Price;
    public int UpperPrice;
    public int LowerPrice;
    public Boolean PriceRequestedBool;
    public ArrayList<ServiceProperty> Properties;
    public int ServiceTypeID;
    public int ServiceProviderID;
    public String ServiceProviderName;
    public String ServiceProviderEmail;
    public ArrayList<Integer> AddressIds;
    public int WaitTime;
    public String WaitTimeLabel;
    public String AvailabilityStartTime;
    public String AvailabilityEndTime;
    public String AvailableDays;
    public String AvailabilityNotes;
    public String PurchaseLabel;
    public FAQ[] FAQs; //Not yet done
    public ArrayList<Integer> AddOnIds;
    public Date LastUpdatedDate;
    public Time LastUpdatedTime;
    public Service[] AddOns; //Not yet done
    public Integer Listed;
    public Integer ApprovedBy_ManagerID; //Not yet done
    
    public Service()
    {} //Constructor
    
    public Service(HashMap<String, String> Map, String Type)
    {
        if (Type.equalsIgnoreCase("ServiceType")) 
        {
            try
            {
                ID = Integer.parseInt(Map.get(ServicesType.ID));
                ServiceTypeName = Map.get(ServicesType.Name);
                String TempString = Map.get(ServicesType.LastUpdatedDate);
                LastUpdatedDate = UtilityManager.getSqlDateFromString(TempString);

                TempString = "";
                TempString = Map.get(ServicesJoin.Last_Updated_Time);
                LastUpdatedTime = UtilityManager.getSqlTimeFromString(TempString);

                TempString = "";
                TempString = Map.get(ServicesType.Properties);
                if (TempString != null) 
                {
                    if (!TempString.equals("")) 
                    {
                        String[] PropertyStrings = TempString.split(";");
                        Properties = new ArrayList<>();
                        for (int i = 0; i < PropertyStrings.length; i++) 
                        {
                            ServiceProperty ThisProperty = new ServiceProperty(PropertyStrings[i]);
                            if(ThisProperty.Name != null)
                                Properties.add(ThisProperty);
                        }
                    }
                }
            }
            catch(Exception e) 
            { 
                String ErrorMessage = e.getMessage();
                System.out.print(ErrorMessage);
            }
        }
        
        else if (Type.equalsIgnoreCase("ServiceListings"))
        {
            try
            {
                ID = Integer.parseInt(Map.get(ServicesJoin.ID));
                ServiceTypeName = Map.get("ServiceTypeName");
                Name = Map.get(ServiceListings.NameOfService);
                Summary = Map.get(ServiceListings.summary);
                DetailedDescription = Map.get(ServiceListings.Desciption);
                Price = Integer.parseInt(Map.get(ServiceListings.FixedPrice));
                ServiceTypeID = Integer.parseInt(Map.get(ServiceListings.ServiceTypeID));
                UpperPrice = Integer.parseInt(Map.get(ServiceListings.UpperPrice));
                LowerPrice = Integer.parseInt(Map.get(ServiceListings.LowerPrice));
                PriceRequestedBool = Boolean.parseBoolean(Map.get(ServiceListings.Price_Requested_Bool));
                ServiceProviderName = Map.get("ServiceProviderName");
                ServiceProviderEmail = Map.get("ServiceProviderEmail");
                ServiceProviderID = Integer.parseInt(Map.get("ServiceProviderID"));
                Listed = Integer.parseInt(Map.get(ServiceListings.ListedBool));
                WaitTime = Integer.parseInt(Map.get(ServiceListings.Wait_Time));
                WaitTimeLabel = Map.get(ServiceListings.Wait_Time_Label);
                AvailabilityStartTime = Map.get(ServiceListings.Availability_Start_Time);
                AvailabilityEndTime = Map.get(ServiceListings.Availabilty_End_Time);
                AvailableDays = Map.get(ServiceListings.Available_Days);
                AvailabilityNotes = Map.get(ServiceListings.Availability_Notes);
                PurchaseLabel = Map.get(ServiceListings.Purchase_Label);
                
                String TempString = Map.get(ServicesJoin.Last_Updated_Date);
                LastUpdatedDate = UtilityManager.getSqlDateFromString(TempString);                
                TempString = "";
                TempString = Map.get(ServicesJoin.Last_Updated_Time);
                LastUpdatedTime = UtilityManager.getSqlTimeFromString(TempString);            
                
                TempString = "";
                TempString = Map.get(ServiceListings.Add_On_IDs);
                if (TempString != null) 
                {
                    if (!TempString.equals("")) 
                    {
                        String[] AddOnStrings = TempString.split(",");
                        AddOnIds = new ArrayList<>();
                        for (String ThisID: AddOnStrings)
                        {
                            int id = Integer.parseInt(ThisID);
                            AddOnIds.add(id);
                        }
                    }
                }
                
                TempString = "";
                TempString = Map.get(ServiceListings.Addresses);
                if (TempString != null) 
                {
                    if (!TempString.equals("")) 
                    {
                        String[] AddressStrings = TempString.split(",");
                        AddressIds = new ArrayList<>();
                        for (String ThisID: AddressStrings)
                        {
                            int id = Integer.parseInt(ThisID);
                            AddressIds.add(id);
                        }
                    }
                }

                TempString = "";
                TempString = Map.get(ServicesType.Properties);
                if (TempString != null) 
                {
                    if (!TempString.equals("")) 
                    {
                        String[] PropertyStrings = TempString.split(";");
                        Properties = new ArrayList<>();
                        for (int i = 0; i < PropertyStrings.length; i++) 
                        {
                            ServiceProperty ThisProperty = new ServiceProperty(PropertyStrings[i]);
                            Properties.add(ThisProperty);
                        }
                    }
                }
            }
            catch(Exception e) 
            { 
                String ErrorMessage = e.getMessage();
                System.out.print(ErrorMessage);
            }
        }
    }
    
}
