/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;

import com.Managers.ServiceManager;
import com.Managers.ProductManager;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
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
import wmengine.Extra.Category;
import wmengine.Extra.Service;
import wmengine.Managers.DBManager;
import wmengine.Managers.ServicesManager;
import wmengine.Tables.Tables;
import wmengine.Tables.Tables.ServiceListings;
import wmengine.Tables.Tables.ServicesType;

/**
 *
 * @author Stephen
 */
public class ServicesServlet extends HttpServlet {

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
            throws ServletException, IOException, ClassNotFoundException, SQLException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            HttpSession session = request.getSession(true);
            String temp = "" + session.getAttribute("Id");
            String json = "";
            String type = request.getParameter("type").trim();
            String empty = "none";
            switch (type) {
                case "GetCategories":
                {
                    ArrayList <Integer> IDs = ServicesManager.GetAllServiceCategoryIDs();
                    ArrayList <Category> Categories = new ArrayList<>();
                    for (Integer ID : IDs) 
                    {
                        Category ThisCategory = new Category(ServicesManager.GetCategoryDetails(ID));
                        ThisCategory.GetSubCategories();
                        Categories.add(ThisCategory);
                    }
                    GsonBuilder JSONBuilder = new GsonBuilder();
                    Gson GsonObj = JSONBuilder.setPrettyPrinting().create();
                    json = GsonObj.toJson(Categories);
                    break;
                }
                case "SaveNewServiceType":
                {
                    GsonBuilder JSONBuilder = new GsonBuilder();
                    Gson GsonObj = JSONBuilder.setPrettyPrinting().create();
                    try
                    {
                        String Name = request.getParameter("name");
                        int SubCategoryID = Integer.parseInt(request.getParameter("SubCategoryId"));
                        String PropertiesString = request.getParameter("Properties");
                        PropertiesString = PropertiesString.replaceAll(",", "|");
                        HashMap Data = new HashMap();
                        Data.put(ServicesType.Name, Name);
                        Data.put(ServicesType.Properties, PropertiesString);
                        int ServicesTypesID = DBManager.insertTableDataReturnID(ServicesType.Table, Data, "");
                        DBManager.UpdateCurrentDate
                        (ServicesType.Table, ServicesType.LastUpdatedDate, "where " + ServicesType.ID + "=" + ServicesTypesID);
                        DBManager.UpdateCurrentTime
                        (ServicesType.Table, ServicesType.LastUpdatedTime, "where " + ServicesType.ID + "=" + ServicesTypesID);

                        HashMap JoinData = new HashMap();
                        JoinData.put(Tables.ServicesJoin.ItemOneType, "SubCategory");
                        JoinData.put(Tables.ServicesJoin.ItemOneID, SubCategoryID);
                        JoinData.put(Tables.ServicesJoin.ItemTwoType, "ServiceType");
                        JoinData.put(Tables.ServicesJoin.ItemTwoID, ServicesTypesID);
                        int JoinTableID = DBManager.insertTableDataReturnID(Tables.ServicesJoin.Table, JoinData, "");
                        DBManager.UpdateCurrentDate
                        (Tables.ServicesJoin.Table, Tables.ServicesJoin.Last_Updated_Date, "where " + Tables.ServicesJoin.ID + "=" + JoinTableID);
                        DBManager.UpdateCurrentTime
                        (Tables.ServicesJoin.Table, Tables.ServicesJoin.Last_Updated_Time, "where " + Tables.ServicesJoin.ID + "=" + JoinTableID);
                        json = GsonObj.toJson("Success!");    
                    }
                    catch(Exception e)
                    {
                        json = GsonObj.toJson("Failed!");    
                    }
                    break;
                }
                case "SaveNewServiceListing":
                {
                    GsonBuilder JSONBuilder = new GsonBuilder();
                    Gson GsonObj = JSONBuilder.setPrettyPrinting().create();
                    try
                    {
                        int MemberID = Integer.parseInt(request.getParameter("MemberID"));
                        String ServiceTypeID = request.getParameter("Service_TypeID");
                        String Name = request.getParameter("name");
                        String Summary = request.getParameter("Summary");
                        String Description = request.getParameter("Description");
                        boolean PriceRequestBool = Boolean.valueOf(request.getParameter("PriceQuoteRequested"));
//                        boolean x = Boolean.parseBoolean(PriceQuoteRequested);
                        String PurchaseLabel = request.getParameter("PurchaseLabelText");
                        int StreetID = Integer.parseInt(request.getParameter("StreetID"));
                        String WaitTime = request.getParameter("Wait_Time");
                        String WaitTimeLabel = request.getParameter("Wait_TimeLabel");
                        String AvailabilityStartTime = request.getParameter("Availability_StartTime");
                        String AvailabilityEndTime = request.getParameter("Availability_EndTime");
                        String PropertiesString = request.getParameter("Properties");
                        PropertiesString = PropertiesString.replaceAll(",", "|");
                        String AvailableDays = request.getParameter("Available_Days");
                        String AddOnIDs = request.getParameter("AddOn_IDs");
                        
                        HashMap Data = new HashMap();
                        Data.put(Tables.ServicesJoin.ItemOneID, MemberID);
                        Data.put(Tables.ServicesJoin.ItemTwoID, ServiceTypeID);
                        Data.put(Tables.ServicesJoin.ItemOneType, "User");
                        Data.put(Tables.ServicesJoin.ItemTwoType, "ServiceType");
                        Data.put(ServiceListings.NameOfService, Name);
                        Data.put(ServiceListings.summary, Summary);
                        Data.put(ServiceListings.Desciption, Description);
                        Data.put(ServiceListings.Price_Requested_Bool, PriceRequestBool);
                        Data.put(ServiceListings.Purchase_Label, PurchaseLabel);
                        //address system
                        Data.put(ServiceListings.Addresses, StreetID);
                        Data.put(ServiceListings.Wait_Time, WaitTime);
                        Data.put(ServiceListings.Wait_Time_Label, WaitTimeLabel);
                        Data.put(ServiceListings.Availability_Start_Time, AvailabilityStartTime);
                        Data.put(ServiceListings.Availabilty_End_Time, AvailabilityEndTime);
                        Data.put(ServiceListings.PropertiesOfService, PropertiesString);
                        Data.put(ServiceListings.Available_Days, AvailableDays);
                        Data.put(ServiceListings.Add_On_IDs, AddOnIDs);
                        int ServicesJoinID = DBManager.insertTableDataReturnID(Tables.ServicesJoin.Table, Data, "");
                        if (ServicesJoinID != 0) 
                        {
                            DBManager.UpdateCurrentDate
                            (Tables.ServicesJoin.Table, Tables.ServicesJoin.Last_Updated_Date, "where " + Tables.ServicesJoin.ID + "=" + ServicesJoinID);
                            DBManager.UpdateCurrentTime
                            (Tables.ServicesJoin.Table, Tables.ServicesJoin.Last_Updated_Time, "where " + Tables.ServicesJoin.ID + "=" + ServicesJoinID);

                            json = GsonObj.toJson("Success!");    
                        }
                        else { json = GsonObj.toJson("Failed!"); }
                        
                    }
                    catch(Exception e)
                    {
                        json = GsonObj.toJson("Failed!");    
                    }
                    break;
                }
               case "GetAllServiceTypes":
               {
                   ArrayList <Integer> IDs = ServicesManager.GetAllServiceTypeIDs();
                   ArrayList <Service> Services = new ArrayList<>();
                   for (Integer ID : IDs) 
                   {
                       Service ThisService = new Service(ServicesManager.GetServiceTypeDetails(ID), "ServiceType");
                       Services.add(ThisService);
                   }
                   GsonBuilder JSONBuilder = new GsonBuilder();
                   Gson GsonObj = JSONBuilder.setPrettyPrinting().create();
                    
                   json = GsonObj.toJson(Services);
                   break;
               }
               case "GetAllServiceListings":
               {    //TO DO: If there are more than 100 listings, continue fetching
                   ArrayList <Service> ServiceListings = new ArrayList<>();
                   ServiceListings = ServicesManager.GetAllServiceListings(0, 100);
                   GsonBuilder JSONBuilder = new GsonBuilder();
                   Gson GsonObj = JSONBuilder.setPrettyPrinting().create();
                    
                   json = GsonObj.toJson(ServiceListings);
                   break;
               }
               case "ApproveListingByID":
               {
                   String data = request.getParameter("data");
                   int ServiceListingID = Integer.parseInt(data);
                   String result = DBManager.UpdateIntData(Tables.ServiceListings.ListedBool, 1, Tables.ServiceListings.Table, "where " + Tables.ServiceListings.ID + "=" + ServiceListingID);
                   GsonBuilder JSONBuilder = new GsonBuilder();
                   Gson GsonObj = JSONBuilder.setPrettyPrinting().create();
                   json = GsonObj.toJson(result);
                   break;
               }
               case "UnapproveListingByID":
               {
                   String data = request.getParameter("data");
                   int ServiceListingID = Integer.parseInt(data);
                   String result = DBManager.UpdateIntData(Tables.ServiceListings.ListedBool, 0, Tables.ServiceListings.Table, "where " + Tables.ServiceListings.ID + "=" + ServiceListingID);
                   GsonBuilder JSONBuilder = new GsonBuilder();
                   Gson GsonObj = JSONBuilder.setPrettyPrinting().create();
                   json = GsonObj.toJson(result);
                   break;
               }
               case "DeclineListingByID":
               {
                   String data = request.getParameter("data");
                   int ServiceListingID = Integer.parseInt(data);
                   String result = DBManager.UpdateIntData(Tables.ServiceListings.ListedBool, 2, Tables.ServiceListings.Table, "where " + Tables.ServiceListings.ID + "=" + ServiceListingID);
                   GsonBuilder JSONBuilder = new GsonBuilder();
                   Gson GsonObj = JSONBuilder.setPrettyPrinting().create();
                   json = GsonObj.toJson(result);
                   break;
               }
               case "DeleteListingByID":
               {
                   String data = request.getParameter("data");
                   int ServiceListingID = Integer.parseInt(data);
                   String result = DBManager.UpdateIntData(Tables.ServiceListings.ListedBool, 3, Tables.ServiceListings.Table, "where " + Tables.ServiceListings.ID + "=" + ServiceListingID);
                   GsonBuilder JSONBuilder = new GsonBuilder();
                   Gson GsonObj = JSONBuilder.setPrettyPrinting().create();
                   json = GsonObj.toJson(result);
                   break;
               }
//               case "GetAllServiceListings": REFACTOR TO GET SERVICE LISTINGS BY SERVICE TYPE
//               {
//                   ArrayList <Integer> ServiceTypeIDs = ServicesManager.GetAllServiceTypeIDs();
//                   ArrayList <Service> ServiceListings = new ArrayList<>();
//                   for (Integer ID : ServiceTypeIDs) 
//                   {
//                       ArrayList <Service> ListingsForThisServiceType = new ArrayList<>();
//                       ListingsForThisServiceType = ServicesManager.GetServiceListingDetails(ID, 0, 10);
//                       for (int i = 0; i < ListingsForThisServiceType.size(); i++) 
//                       {
//                           ServiceListings.add(ListingsForThisServiceType.get(i));
//                       }
//                   }
//                   GsonBuilder JSONBuilder = new GsonBuilder();
//                   Gson GsonObj = JSONBuilder.setPrettyPrinting().create();
//                    
//                   json = GsonObj.toJson(ServiceListings);
//                   break;
//               }
               case "GetServiceTypesBySubCategories":
               {
                   String data = request.getParameter("data");
                   int SubCategoryID = Integer.parseInt(data);
                   ArrayList <Integer> IDs = ServicesManager.GetServicesIDsByTypeID(SubCategoryID);
                   ArrayList <Service> Services = new ArrayList<>();
                   for (Integer ID: IDs)
                   {
                       Service ThisService = new Service(ServicesManager.GetServiceTypeDetails(ID), "ServiceType");
                       Services.add(ThisService);
                   }
                   
                   GsonBuilder JSONBuilder = new GsonBuilder();
                   Gson GsonObj = JSONBuilder.setPrettyPrinting().create();
                   json = GsonObj.toJson(Services);
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
            Logger.getLogger(ServicesServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(ServicesServlet.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(ServicesServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(ServicesServlet.class.getName()).log(Level.SEVERE, null, ex);
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
