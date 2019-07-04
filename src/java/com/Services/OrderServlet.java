//old method
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;

import com.Managers.ProductManager;
import com.google.gson.Gson;
import com.twilio.sdk.TwilioRestException;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
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
import wmengine.Tables.*;

/**
 *
 * @author hp 8460p
 */
public class OrderServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     * @throws java.lang.ClassNotFoundException
     * @throws java.sql.SQLException
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, ClassNotFoundException, SQLException, UnsupportedEncodingException, ParseException, TwilioRestException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            HttpSession session = request.getSession(true);
            String temp = "" + session.getAttribute("Id");
            String cart = "" + session.getAttribute("cart");
            String json = "";
            String json1 = "";
            String json2 = "";
            String json3 = "";
            String type = request.getParameter("type").trim();
            String empty = "none";
            String result = "";
            switch (type) {
                case "GetShopOrders": {
                    String ordertype = request.getParameter("data");
                    HashMap<Integer, HashMap<String, String>> ProdDetailsList = new HashMap<>();
                    ArrayList<Integer> OrderId = GeneralProductManager.GetAllOrders("", 0, 1000);
                    HashMap<Integer, HashMap<String, String>> orders = new HashMap<>();
                    HashMap<Integer, ArrayList<Integer>> orderProducts = new HashMap<>();
                    if (!OrderId.isEmpty()) {
                        for (int id : OrderId) {
                            HashMap<String, String> details = new HashMap<>();
                            if (ordertype.equals("All")) {
                                details = GeneralProductManager.GetOrderDetails(id, "");
                            } else {
                                details = GeneralProductManager.GetOrderDetails(id, ordertype);
                            }
                            if (!details.isEmpty()) {
                                String userIds = details.get(Tables.Orders.UserID);
                                String confirmerID = details.get(Tables.Orders.ConfirmByID);
                                int userid = Integer.parseInt(userIds);
                                int confirmerId = Integer.parseInt(confirmerID);
                                String buyerName = GeneralUserManager.getUserName(userid);
                                String confirmer = GeneralUserManager.getUserName(confirmerId);
                                String UserPhone = GeneralUserManager.getUserPhone(userid);
                                details.put("UserName", buyerName);
                                details.put("OrderUserID", "" + userid);
                                details.put("UserPhone", UserPhone);
                                details.put("confirmer", confirmer);
                                orders.put(id, details);
                                ArrayList<Integer> productIds = new ArrayList<>();
                                String productdetails = details.get(Tables.Orders.ProductDetails);
                                if (!productdetails.equals("none")) {
                                    String pdetails[] = productdetails.split(";");
                                    for (String record : pdetails) {
                                        String productid = record.split(":")[0];
                                        int ProductID = Integer.parseInt(productid);
                                        String qty = record.split(":")[1];
                                        String amnt = record.split(":")[2];
                                        productIds.add(ProductID);
                                        HashMap<String, String> res = GeneralProductManager.GetProductDetails(ProductID);
                                        String price = res.get(Tables.Product_Definition.SellingPrice);
                                        res.put("prod-id", "" + ProductID);
                                        res.put("pquantity", qty);
                                        res.put("pamount", amnt);
                                        res.put("price", price);
                                        ProdDetailsList.put(ProductID, res);
                                    }
                                }
                                orderProducts.put(id, productIds);
                            }
                        }

                        json1 = new Gson().toJson(orders);
                        json2 = new Gson().toJson(ProdDetailsList);
                        json3 = new Gson().toJson(orderProducts);
                        json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    } else {
                        json1 = new Gson().toJson(empty);
                        json = "[" + json1 + "]";
                    }
                    break;
                }
                case "GetPlacedOrder": {
                    String params = request.getParameter("data");
                    int OrderID = Integer.parseInt(params);
                    HashMap<Integer, HashMap<String, String>> ProdDetailsList = new HashMap<>();
                    HashMap<Integer, HashMap<String, String>> OrderDetailsList = new HashMap<>();
                    HashMap<Integer, ArrayList<Integer>> orderProducts = new HashMap<>();

                    HashMap<String, String> OrderDetails = GeneralProductManager.GetOrderDetails(OrderID, "");
                    if (!OrderDetails.isEmpty()) {
                        ArrayList<Integer> productIds = new ArrayList<>();
                        int Userid = Integer.parseInt(OrderDetails.get(Tables.Orders.UserID));
                        String UserName = GeneralUserManager.getUserName(Userid);
                        String UserPhone = GeneralUserManager.getUserPhone(Userid);
                        String UserEmail = GeneralUserManager.getUserEmail(Userid);
                        OrderDetails.put("UserName", UserName);
                        OrderDetails.put("UserPhone", UserPhone);
//                        OrderDetails.put("UserEmail", UserEmail);
                        OrderDetails.put("BuyerUserID", "" + Userid);
                        OrderDetailsList.put(OrderID, OrderDetails);
                        String productdetails = OrderDetails.get(Tables.Orders.ProductDetails);
                        if (!productdetails.equals("none")) {
                            String details[] = productdetails.split(";");
                            for (String record : details) {
                                String productid = record.split(":")[0];
                                String qty = record.split(":")[1];
                                String amt = record.split(":")[2];
                                int ProductID = Integer.parseInt(productid);
                                productIds.add(ProductID);
                                HashMap<String, String> res = GeneralProductManager.GetProductDetails(ProductID);
                                HashMap<String, String> historyres = GeneralProductManager.GetOrderHistoryDetailsByProductID(ProductID);
                                String price = res.get(Tables.Product_Definition.SellingPrice);
                                int supid = Integer.parseInt(historyres.get(Tables.OrderHistory.NewSupplierID));
                                String SupName = GeneralUserManager.getUserName(supid);
                                String SupPhone = GeneralUserManager.getUserPhone(Userid);
                                historyres.put("SupName", SupName);
                                historyres.put("SupPhone", SupPhone);
                                historyres.put("OrderID", "" + OrderID);
                                int orderHistoryID = Integer.parseInt(historyres.get(Tables.OrderHistory.ID));
                                historyres.put("orderHistoryID", "" + orderHistoryID);
                                res.putAll(historyres);
                                res.put("pquantity", qty);
                                res.put("pamount", amt);
                                res.put("price", price);
                                ProdDetailsList.put(ProductID, res);
                            }
                        }
                        orderProducts.put(OrderID, productIds);

                        json1 = new Gson().toJson(OrderDetailsList);
                        json2 = new Gson().toJson(ProdDetailsList);
                        json3 = new Gson().toJson(orderProducts);
                        json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    } else {
                        json1 = new Gson().toJson(empty);
                        json = "[" + json1 + "]";
                    }
                    break;
                }
                case "CancelOrder": {
                    String[] data = request.getParameterValues("data[]");
                    int UserID = Integer.parseInt(data[0]);
                    String orderid = data[1].trim();
                    int OrderID = Integer.parseInt(orderid);
                    String Status = GeneralProductManager.getOrderStatus(OrderID);
                    if (!Status.equals("Cancelled")) {
                        String OrderAmount = GeneralProductManager.getOrderAmount(OrderID);
                        result = GeneralProductManager.CancelOrderRequest(OrderID, OrderAmount, UserID);
                        json1 = new Gson().toJson("Cancel");
                        json2 = new Gson().toJson(result);
                        json = "[" + json1 + "," + json2 + "]";
                    } else {
                        json1 = new Gson().toJson("Cancel");
                        json2 = new Gson().toJson(empty);
                        json = "[" + json1 + "," + json2 + "]";
                    }
                    break;
                }

                case "ConfirmOrder": {
                    String[] data = request.getParameterValues("data[]");
                    int ConfirmedByUserID = Integer.parseInt(data[0]);
                    int OrderID = Integer.parseInt(data[1]);
                    int BuyerID = Integer.parseInt(data[2]);
                    String Status = GeneralProductManager.getOrderStatus(OrderID);
                    if (!Status.equals("Processing")) {
                        result = GeneralProductManager.confirmOrder(OrderID, ConfirmedByUserID);
                        if (result.equals("success")) {
                            String OrderNumber = GeneralProductManager.getOrderNumber(OrderID);
                            String Subject = "Order Confirm";
                            String Content = "Order " + OrderNumber + " has been confirmed and its being proccessed";
//                            try {
//                                String PhoneNumber = GeneralUserManager.getUserPhone(BuyerID);
//                                SMSManager.sendSMS(Content, PhoneNumber);
//                            } catch (UnsupportedEncodingException | ClassNotFoundException | SQLException e) {
//                                e.printStackTrace();
//                            }
                            GeneralMessageManager.sendMemberMessage(BuyerID, Content, Subject, 1);
                            json1 = new Gson().toJson("Confirm");
                            json2 = new Gson().toJson(result);
                            json = "[" + json1 + "," + json2 + "]";
                        } else {
                            json1 = new Gson().toJson("Confirm");
                            json2 = new Gson().toJson(empty);
                            json = "[" + json1 + "," + json2 + "]";
                        }
                    } else {
                        json1 = new Gson().toJson("Accept");
                        json2 = new Gson().toJson(empty);
                        json = "[" + json1 + "," + json2 + "]";
                    }
                    break;
                }
                case "DeleteOrder": {
                    String[] data = request.getParameterValues("data[]");
                    int UserID = Integer.parseInt(data[0]);
                    String orderid = data[1];
                    int OrderID = Integer.parseInt(orderid);
                    String Status = GeneralProductManager.getOrderStatus(OrderID);
                    if (Status.equals("Cancelled") || Status.equals("Delivered")) {
                        result = GeneralProductManager.DeleteOrder(OrderID, UserID);
                        json1 = new Gson().toJson("Delete");
                        json2 = new Gson().toJson(result);
                        json = "[" + json1 + "," + json2 + "]";
                    } else {
                        json1 = new Gson().toJson("Delete");
                        json2 = new Gson().toJson(empty);
                        json = "[" + json1 + "," + json2 + "]";
                    }
                    break;
                }
                case "ProcessOrder": {
                    String[] data = request.getParameterValues("data[]");
                    int OrderID = Integer.parseInt(data[0]);
                    int SupplierID = Integer.parseInt(data[1]);
                    int orderHistoryID = Integer.parseInt(data[2]);
                    result = GeneralProductManager.AssignProductToSuppliers(OrderID, orderHistoryID, SupplierID);
                    if (result.equals("success")) {
                        json1 = new Gson().toJson("Assigned");
                        json2 = new Gson().toJson(result);
                        json = "[" + json1 + "," + json2 + "]";
                    } else {
                        json1 = new Gson().toJson("Assigned");
                        json2 = new Gson().toJson(empty);
                        json = "[" + json1 + "," + json2 + "]";
                    }
                    break;
                }

                case "ConfirmOrderDelivery": {
                    String orderid = request.getParameter("data");
                    int OrdId = Integer.parseInt(orderid);
                    result = GeneralProductManager.ConfirmOrderDelivery(OrdId);
                    json1 = new Gson().toJson("Delivered");
                    json2 = new Gson().toJson(result);
                    json = "[" + json1 + "," + json2 + "]";
                    break;
                }
                case "GetSupplierOrders": {
                    String supId = request.getParameter("data");
                    int supID = Integer.parseInt(supId);
                    ArrayList<Integer> supProductIDs = ProductManager.GetSupplierProductIDs(supID);
                    HashMap<Integer, HashMap<String, String>> ProdDetailsList = new HashMap<>();
                    ArrayList<Integer> OrderId = GeneralProductManager.GetAllOrders("", 0, 1000);
                    HashMap<Integer, HashMap<String, String>> orders = new HashMap<>();
                    HashMap<Integer, ArrayList<Integer>> orderProducts = new HashMap<>();
                    if (!OrderId.isEmpty()) {
                        for (int id : OrderId) {
                            HashMap<String, String> details = new HashMap<>();
                            details = GeneralProductManager.GetAllOrderDetails(id);
                            String userIds = details.get("userid");
                            int userid = Integer.parseInt(userIds);
                            String buyerName = GeneralUserManager.getUserName(userid);
                            details.put("UserName", buyerName);
                            orders.put(id, details);
                            ArrayList<Integer> productIds = new ArrayList<>();
                            String productdetails = details.get("productdetails");
                            if (!productdetails.equals("none")) {
                                String pdetails[] = productdetails.split(";");
                                for (String record : pdetails) {
                                    String productid = record.split(":")[0];
                                    int ProductID = Integer.parseInt(productid);
                                    String qty = record.split(":")[1];
                                    String amnt = record.split(":")[2];
                                    for (int prodid : supProductIDs) {
                                        if (prodid == ProductID) {
                                            productIds.add(ProductID);
                                            HashMap<String, String> res = GeneralProductManager.GetProductDetails(ProductID);
                                            String price = res.get("selling_price");
                                            res.put("pquantity", qty);
                                            res.put("pamount", amnt);
                                            res.put("price", price);
                                            ProdDetailsList.put(ProductID, res);
                                        }
                                    }
                                }
                            }
                            orderProducts.put(id, productIds);
                        }

                        json1 = new Gson().toJson(orders);
                        json2 = new Gson().toJson(ProdDetailsList);
                        json3 = new Gson().toJson(orderProducts);
                        json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    } else {
                        json1 = new Gson().toJson(empty);
                        json = "[" + json1 + "]";
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
            throws ServletException, IOException, UnsupportedEncodingException {
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(OrderServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(OrderServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(OrderServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (TwilioRestException ex) {
            Logger.getLogger(OrderServlet.class.getName()).log(Level.SEVERE, null, ex);
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
            throws ServletException, IOException, UnsupportedEncodingException {
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(OrderServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(OrderServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(OrderServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (TwilioRestException ex) {
            Logger.getLogger(OrderServlet.class.getName()).log(Level.SEVERE, null, ex);
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
