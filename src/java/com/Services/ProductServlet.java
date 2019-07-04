/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;

import com.Managers.ProductManager;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
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
 * @author Saint
 */
public class ProductServlet extends HttpServlet {

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
            HttpSession session = request.getSession(true);
            String temp = "" + session.getAttribute("Id");
            String cart = "" + session.getAttribute("cart");
            String json = "";
            String json1 = "";
            String json2 = "";
            String type = request.getParameter("type").trim();
            String empty = "none";
            String result = "";
            switch (type) {
                case "GetUserOrderedProducts": {
                    String userid = request.getParameter("data");
                    ArrayList<Integer> HistIds = new ArrayList<>();
                    HashMap<Integer, HashMap<String, String>> OrderedProdDetailsList = new HashMap<>();
                    int UserID = Integer.parseInt(userid);
                    HistIds = GeneralProductManager.GetSellerOrderHistoryProductIds(UserID);
                    if (!HistIds.isEmpty()) {
                        for (int hid : HistIds) {
                            HashMap<String, String> orderedDet = GeneralProductManager.GetOrderHistoryDetails(hid);
                            int orderID = GeneralProductManager.GetOrderIDByOrderHistoryID(hid);
                            String OrderStatus = GeneralProductManager.getOrderStatus(orderID);
                            String OrderNumber = GeneralProductManager.getOrderNumber(orderID);
                            orderedDet.put("OrderStatus", OrderStatus);
                            orderedDet.put("OrderNumber", OrderNumber);
                            int prodID = GeneralProductManager.GetProductIDByOrderHistoryID(hid);
                            HashMap<String, String> proddet = GeneralProductManager.GetProductDetails(prodID);
                            orderedDet.putAll(proddet);
                            OrderedProdDetailsList.put(hid, orderedDet);
                        }
                        json = new Gson().toJson(OrderedProdDetailsList);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetUserProducts": {
                    String userid = request.getParameter("data");
                    ArrayList<Integer> proIds = new ArrayList<>();
                    HashMap<Integer, HashMap<String, String>> ProdDetailsList = new HashMap<>();
                    int UserID = Integer.parseInt(userid);
                    proIds = GeneralProductManager.GetSellerProductIds(UserID);
                    if (!proIds.isEmpty()) {
                        for (int pid : proIds) {
                            HashMap<String, String> res = GeneralProductManager.GetPoolProductDetails(pid);
                            ProdDetailsList.put(pid, res);
                        }
                        json = new Gson().toJson(ProdDetailsList);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetAllProductCategories": {
                    ArrayList<Integer> topcatids = GeneralProductManager.GetProductCatIDs();
                    HashMap<Integer, HashMap<String, String>> catList = new HashMap<>();
                    HashMap<Integer, Object> TopCatSubs = new HashMap<>();
                    if (!topcatids.isEmpty()) {
                        for (int topcatid : topcatids) {
                            HashMap<String, String> topcatdetails = GeneralProductManager.GetProductCatDetails(topcatid);
                            catList.put(topcatid, topcatdetails);
                            ArrayList<Integer> subcatids = new ArrayList<>();
                            subcatids = GeneralProductManager.getTopCategory_SubCategories(topcatid, 0, 4);
                            if (!subcatids.isEmpty()) {
                                for (int subcatid : subcatids) {
                                    HashMap<String, String> subcatdetails = GeneralProductManager.GetProductCatDetails(subcatid);
                                    catList.put(subcatid, subcatdetails);
                                }
                            }
                            TopCatSubs.put(topcatid, subcatids);
                        }
                        json1 = new Gson().toJson(catList);
                        json2 = new Gson().toJson(TopCatSubs);
                        json = "[" + json1 + "," + json2 + "]";
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetCategoryProducts": {
                    String[] data = request.getParameterValues("data[]");
                    String catIdstr = data[0].trim();
                    int catId = Integer.parseInt(catIdstr);
                    ArrayList<String> productNames = new ArrayList<>();
                    ArrayList<Integer> ids = GeneralCategoryManager.GetCategoryProductIds(catId, 0, 1000);
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            String name = GeneralProductManager.GetProductName(id);
                            productNames.add(name);
                        }
                        json1 = new Gson().toJson(ids);
                        json2 = new Gson().toJson(productNames);
                        json = "[" + json1 + "," + json2 + "]";
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }

                case "AddProductCategory": {
                    String[] data = request.getParameterValues("data[]");
                    String ID = data[0];
                    String SubName = data[1];
                    int catid = 0;
                    if (ID.equals("0")) {
                        catid = ProductManager.AddCategory(SubName, "TopCategory");
                    } else {
                        int SubCatID = Integer.parseInt(ID);
                        catid = ProductManager.AddSubCategory(SubCatID, SubName);
                    }
                    json = new Gson().toJson(catid);
                    break;
                }
                case "AddProductCategoryProperty": {
                    String[] data = request.getParameterValues("data[]");
                    String catID = data[0];
                    String propName = data[1];
                    int CatID = Integer.parseInt(catID);
                    result = ProductManager.AddProductCategoryProp(CatID, propName);
                    json = new Gson().toJson(result);
                    break;
                }
                case "ListNewProduct": {
                    String[] data = request.getParameterValues("data[]");
                    String useridstr = data[0].trim();
                    int userid = Integer.parseInt(useridstr);
                    String Name = data[1].trim();
                    int category = Integer.parseInt(data[2].trim());
                    String Summary = data[3].trim();
                    String Description = data[4].trim();
                    int quantity = Integer.parseInt(data[5].trim());
                    int price = Integer.parseInt(data[6].trim());
                    String properties = data[7].trim();
                    String tags = data[8].trim();
                    String punit = data[9].trim();
                    String variants = data[10].trim();
                    int id = GeneralProductManager.listUserProduct(userid, Name, category, Summary, Description, quantity, price, properties, tags, punit, variants);
                    json = new Gson().toJson(id);
                    break;
                }
                case "GetShopProducts": {
                    ArrayList<Integer> ids = GeneralProductManager.GetAllProducts("", 0, 1000);
                    HashMap<Integer, HashMap<String, String>> products = new HashMap<>();
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, String> details = GeneralProductManager.GetProductDetails(id);
                            products.put(id, details);
                        }
                        json = new Gson().toJson(products);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }

                case "GetListedProduct": {
                    ArrayList<Integer> pid = GeneralProductManager.GetProductListed("", 0, 1000);
                    HashMap<Integer, HashMap<String, String>> productsList = new HashMap<>();
                    if (!pid.isEmpty()) {
                        for (int id : pid) {
                            HashMap<String, String> details = GeneralProductManager.GetProductListedDetails(id);
                            int UserID = Integer.parseInt(details.get(Tables.ProductPool.UserID));
                            String UserName = GeneralUserManager.getUserName(UserID);
                            String UserPhone = GeneralUserManager.getUserPhone(UserID);
                            details.put("SupplierUserID", "" + UserID);
                            details.put("UserName", UserName);
                            details.put("UserPhone", UserPhone);
                            int SubCatID = Integer.parseInt(details.get(Tables.ProductPool.CategoryID));
//                            int CatID = ProductManager.getCategoryName(SubCatID);
                            String CatName = GeneralCategoryManager.GetCategoryName(SubCatID);
                            details.put("CategoryName", CatName);
                            productsList.put(id, details);
                        }
                        json = new Gson().toJson(productsList);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "UserListedProductAction": {
                    String[] data = request.getParameterValues("data[]");
                    int userid = Integer.parseInt(data[0]);
                    int ProdID = Integer.parseInt(data[1]);
                    String action = data[2];
                    if (action.equals("Declined")) {
                        result = ProductManager.DeclineUserListedProduct(ProdID);
                    } else if (action.equals("Deleted")) {
                        result = GeneralProductManager.DeleteUserListedProduct(ProdID);
                    }
                    json1 = new Gson().toJson(action);
                    json2 = new Gson().toJson(result);
                    json = "[" + json1 + "," + json2 + "]";
                    break;
                }
                case "ApproveUserListedProductAndCreateWarrant": {//[userid, SupplierUserID, ObjectID, ObjectType, Amount];
                    String[] data = request.getParameterValues("data[]");
                    int AdminUserid = Integer.parseInt(data[0]);
                    int SupplierUserID = Integer.parseInt(data[1]);
                    int ObjectID = Integer.parseInt(data[2]);//ProductID
                    String ObjectType = data[3];//Product
                    int Amount = Integer.parseInt(data[4]);//Amount
                    result = ProductManager.ApproveUserListedProduct(AdminUserid, SupplierUserID, ObjectID, ObjectType, Amount);
                    json1 = new Gson().toJson("Approved and Listed");
                    json2 = new Gson().toJson(result);
                    json = "[" + json1 + "," + json2 + "]";
                    break;
                }
                case "GetProductSuppliers": {
                    String prodName = request.getParameter("data");
                    HashMap<Integer, HashMap<String, String>> otherProducts = new HashMap<>();
                    ArrayList<Integer> otherProductIDs = ProductManager.GetSameNameProductIDs(prodName);
                    if (!otherProductIDs.isEmpty()) {
                        for (int productID : otherProductIDs) {
                            HashMap<String, String> productdetails = GeneralProductManager.GetProductDetails(productID);
                            otherProducts.put(productID, productdetails);
                        }
                        json = new Gson().toJson(otherProducts);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "GetSupplierProducts": {
                    String supId = request.getParameter("data");
                    int supID = Integer.parseInt(supId);
                    HashMap<Integer, HashMap<String, String>> supProducts = new HashMap<>();
                    ArrayList<Integer> supProductIDs = ProductManager.GetSupplierProductIDs(supID);
                    if (!supProductIDs.isEmpty()) {
                        for (int productID : supProductIDs) {
                            HashMap<String, String> productdetails = GeneralProductManager.GetProductDetails(productID);
                            supProducts.put(productID, productdetails);
                        }
                        json = new Gson().toJson(supProducts);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }

                case "RemoveShopProduct": {
                    String pid = request.getParameter("data");
                    int Id = Integer.parseInt(pid);
                    result = ProductManager.RemoveShopProduct(Id);
                    json = new Gson().toJson(result);
                    break;
                }
                case "ListAndUnlistShopProduct": {
                    String[] data = request.getParameterValues("data[]");
                    String pid = data[0];
                    String check = data[1];
                    int Id = Integer.parseInt(pid);
                    if (check.equals("List")) {
                        result = GeneralProductManager.ListAndUnListProduct(Id, 1);
                    } else {
                        result = GeneralProductManager.ListAndUnListProduct(Id, 0);
                    }
                    json = new Gson().toJson(result);
                    break;
                }
                case "GetPickUpCentres": {
                    ArrayList<Integer> PickupStateIDs = GeneralUserManager.getPickUpCentreStateIDs();
                    HashMap<Integer, HashMap<String, String>> StateList = new HashMap<>();
                    HashMap<Integer, ArrayList<HashMap<String, String>>> StatePickUpCenters = new HashMap<>();
                    if (!PickupStateIDs.isEmpty()) {
                        for (int stateid : PickupStateIDs) {
                            HashMap<String, String> statedetails = GeneralUserManager.getStateDetails(stateid);
                            StateList.put(stateid, statedetails);
                            ArrayList<HashMap<String, String>> CenterIds = new ArrayList<>();
                            ArrayList<Integer> PickupCenterIDs = GeneralUserManager.getPickUpCentreByStateId(stateid);
                            if (!PickupCenterIDs.isEmpty()) {
                                for (int pickupid : PickupCenterIDs) {
                                    HashMap<String, String> centerdetails = GeneralUserManager.getPickUpCenterDetails(pickupid);
                                    if (!centerdetails.isEmpty()) {
                                        CenterIds.add(centerdetails);
                                    }
                                }
                            }
                            StatePickUpCenters.put(stateid, CenterIds);
                        }
                        json1 = new Gson().toJson(StateList);
                        json2 = new Gson().toJson(StatePickUpCenters);
                        json = "[" + json1 + "," + json2 + "]";
                    } else {
                        String none = new Gson().toJson(empty);
                        json = "[" + 0 + "," + none + "]";
                    }
                    break;
                }
                case "GetPromoProducts": {
                    ArrayList<Integer> ids = new ArrayList<>();
                    HashMap<String, ArrayList<String>> property_Value = new HashMap<>();
                    HashMap<Integer, HashMap<String, String>> Property_Value = new HashMap<>();
                    HashMap<Integer, HashMap<String, String>> ProductsList = new HashMap<>();
                    HashMap<Integer, HashMap<String, String>> PromoList = new HashMap<>();
                    HashMap<Integer, ArrayList<HashMap<String, String>>> PromoProducts = new HashMap<>();

                    ids = GeneralProductManager.GetPromoIDS();
                    if (!ids.isEmpty()) {
                        for (int promoid : ids) {
                            HashMap<String, String> PromoDetails = GeneralProductManager.GetPromoDetails(promoid);
                            if (!PromoDetails.isEmpty()) {
                                ArrayList<HashMap<String, String>> productIds = new ArrayList<>();
                                PromoList.put(promoid, PromoDetails);
                                String proddetails = PromoDetails.get(Tables.Promo.ProductDetails);
                                if (proddetails != null) {
                                    String details[] = proddetails.split(";");
                                    for (String record : details) {
                                        String productid = record.split(":")[0];
                                        int ProductID = Integer.parseInt(productid);
                                        HashMap<String, String> res = GeneralProductManager.GetProductDetails(ProductID);
                                        productIds.add(res);
                                        ArrayList<String> values = new ArrayList<>();
                                        HashMap<String, String> prod_prop_val = new HashMap<>();
                                        String prop = res.get(Tables.ProductRecord.Properties);
                                        String[] arr = prop.split(";");
                                        for (String prop_val : arr) {
                                            String properties = prop_val.substring(0, prop_val.indexOf("-"));
                                            prod_prop_val.put(properties, prop_val.substring(prop_val.indexOf("-") + 1, prop_val.length()));
                                            if (property_Value.containsKey(properties)) {
                                                ArrayList<String> value = property_Value.get(properties);
                                                value.add(prop_val.substring(prop_val.indexOf("-") + 1, prop_val.length()).trim());
                                                Set<String> hs = new HashSet<>();
                                                hs.addAll(value);
                                                value.clear();
                                                value.addAll(hs);
                                                property_Value.put(properties, value);
                                            } else {
                                                values.add(prop_val.substring(prop_val.indexOf("-") + 1, prop_val.length()).trim());
                                                property_Value.put(properties, values);
                                            }
                                        }
                                        ProductsList.put(ProductID, res);
                                        Property_Value.put(ProductID, prod_prop_val);
                                    }
                                }
                                PromoProducts.put(promoid, productIds);

                            }
                        }
                        String prop1 = new Gson().toJson(property_Value);
                        String prop2 = new Gson().toJson(Property_Value);
                        String prop = "[" + prop1 + "," + prop2 + "]";

                        json1 = new Gson().toJson(PromoList);
                        json2 = new Gson().toJson(PromoProducts);
                        String json3 = new Gson().toJson(prop);
                        json = "[" + json1 + "," + json2 + "," + json3 + "]";
                    } else {
                        String none = new Gson().toJson(empty);
                        json = "[" + 0 + "," + none + "," + none + "]";
                    }
                    break;
                }
                case "GetProductDetails": {
                    String proIdstr = request.getParameter("data");
                    int proId = Integer.parseInt(proIdstr);
                    HashMap<String, String> res = GeneralProductManager.GetProductDetails(proId);
                    if (!res.isEmpty()) {
                        json = new Gson().toJson(res);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "NewDeal": {
                    String[] data = request.getParameterValues("data[]");
                    String name = data[0].trim();
                    String desc = data[1];
                    String dealdate = data[2];
                    Date StartDate = null;
                    Date EndDate = null;
                    String sDate = "";
                    String eDate = "";

                    if (!dealdate.equals("null")) {
                        String DateRange = dealdate.trim();
                        sDate = DateRange.split(":")[0].trim();
                        eDate = DateRange.split(":")[1].trim();
                    }
                    StartDate = UtilityManager.getSqlDateFromString(sDate);
                    EndDate = UtilityManager.getSqlDateFromString(eDate);
                    result = ProductManager.AddNewDeal(name, desc, StartDate, EndDate);
                    json = new Gson().toJson(result);
                    break;
                }
                case "AddPromoProduct": {
                    String[] data = request.getParameterValues("data[]");
                    String promoid = data[0].trim();
                    String prodid = data[1];
                    String price = data[2];
                    int PromoID = Integer.parseInt(promoid);
                    int ProdID = Integer.parseInt(prodid);
                    int Price = Integer.parseInt(price);
                    result = ProductManager.AddPromoProductDetail(PromoID, ProdID, Price);
                    json = new Gson().toJson(result);
                    break;
                }
                case "UpdatePromoProductDetail": {
                    String[] data = request.getParameterValues("data[]");
                    String promoid = data[0].trim();
                    String prodid = data[1];
                    String price = data[2];
                    int PromoID = Integer.parseInt(promoid);
                    int ProdID = Integer.parseInt(prodid);
                    int Price = Integer.parseInt(price);
                    result = ProductManager.UpdatePromoProductDetail(PromoID, ProdID, Price);
                    json = new Gson().toJson(result);
                    break;
                }
                case "ReStockProductQuantity": {
                    String[] data = request.getParameterValues("data[]");
                    String prodid = data[0];
                    String quantity = data[1];
                    String newwarrantAmt = data[2];
                    String adminUserid = data[3];
                    int ProdID = Integer.parseInt(prodid);
                    int Quantity = Integer.parseInt(quantity);
                    int warrantAmt = Integer.parseInt(newwarrantAmt);
                    int AdminUserID = Integer.parseInt(adminUserid);
                    result = ProductManager.ReStockProduct(ProdID, Quantity, warrantAmt, AdminUserID);
                    json = new Gson().toJson(result);
                    break;
                }
                case "GetWMSuppliers": {
                    ArrayList<Integer> ids = GeneralUserManager.GetWMSuppliers();
                    HashMap<Integer, HashMap<String, Object>> suppliers = new HashMap<>();
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            String usertype = GeneralUserManager.GetUserGroupNameByUserID(id);

                            HashMap<String, Object> det = GeneralUserManager.GetUserDetails(usertype, id);
                            if (!det.isEmpty()) {
                                ArrayList<Integer> ProductCount = GeneralUserManager.GetWMSupplierNumberOfProducts(id);
                                det.put("ProductCount", ProductCount.size());
                                suppliers.put(id, det);
                            }

                        }
                        json = new Gson().toJson(suppliers);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }
                case "ListMemberProduct": {
                    String[] data = request.getParameterValues("data[]");
                    String useridstr = data[0].trim();
                    int userid = Integer.parseInt(useridstr);
                    String Name = data[1].trim();
                    int category = Integer.parseInt(data[2].trim());
                    String Summary = data[3].trim();
                    String Description = data[4].trim();
                    int quantity = Integer.parseInt(data[5].trim());
                    int price = Integer.parseInt(data[6].trim());
                    String properties = data[7].trim();
                    String ptags = data[8].trim();
                    String punit = data[9].trim();
                    String variants = data[10].trim();
                    int id = GeneralProductManager.listUserProduct(userid, Name, category, Summary, Description, quantity, price, properties, ptags, punit, variants);
                    json = new Gson().toJson(id);
                    break;
                }

                case "EditShopProduct": {//[prodid, pname, psummary, pprice];
                    String[] data = request.getParameterValues("data[]");
                    String pid = data[0].trim();
                    String pname = data[1];
                    String psum = data[2];
                    String pdesc = data[3];
                    String pprice = data[4];
                    int prodid = Integer.parseInt(pid);
                    result = GeneralProductManager.EditShopProduct(prodid, pname, psum, pdesc, pprice);
                    json = new Gson().toJson(result);
                    break;
                }

                case "GetProductMeasurementUnits": {
                    ArrayList<Integer> ids = GeneralProductManager.GetAllProductUnits("", 0, 1000);
                    HashMap<Integer, HashMap<String, String>> productUnits = new HashMap<>();
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, String> details = GeneralProductManager.GetProductUnitsDetails(id);
                            productUnits.put(id, details);
                        }
                        json = new Gson().toJson(productUnits);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }

                case "GetProductHscodes": {
                    ArrayList<Integer> ids = GeneralProductManager.GetAllProductHscodes("", 0, 1000);
                    HashMap<Integer, HashMap<String, String>> productCodes = new HashMap<>();
                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, String> details = GeneralProductManager.GetProductHscodeDetails(id);
                            productCodes.put(id, details);
                        }
                        json = new Gson().toJson(productCodes);
                    } else {
                        json = new Gson().toJson(empty);
                    }
                    break;
                }

                case "AddNewPickUpCenter": {
                    int lcdaid;
                    String[] data = request.getParameterValues("data[]");
                    String pickupname = data[0];
                    int stateid = Integer.parseInt(data[1].trim());
                    int lgaid = Integer.parseInt(data[2].trim());
                    String lcda1 = data[3].trim();
                    if ("".equals(lcda1) || "Select LCDA".equals(lcda1) || "0".equals(lcda1)) {
                        lcdaid = 0;
                    } else {
                        lcdaid = Integer.parseInt(lcda1);
                    }
                    int townid = Integer.parseInt(data[4].trim());
                    int bstopid = Integer.parseInt(data[5].trim());
                    int streetid = Integer.parseInt(data[6].trim());
                    int pickupfees = Integer.parseInt(data[7].trim());
                    String workinghours = data[8].trim();
                    String phone = data[9].trim();
                    result = GeneralAddressManager.AddPickUpAddress(pickupname, stateid, lgaid, lcdaid, townid, bstopid, streetid, pickupfees, workinghours, phone);
                    json = new Gson().toJson(result);
                    break;
                }
                case "EditNewPickUpCenter": {
                    int lcdaid;
                    String[] data = request.getParameterValues("data[]");
                    String pickupname = data[0];
                    int stateid = Integer.parseInt(data[1].trim());
                    int lgaid = Integer.parseInt(data[2].trim());
                    String lcda1 = data[3].trim();
                    if ("".equals(lcda1) || "Select LCDA".equals(lcda1) || "0".equals(lcda1)) {
                        lcdaid = 0;
                    } else {
                        lcdaid = Integer.parseInt(lcda1);
                    }
                    int townid = Integer.parseInt(data[4].trim());
                    int bstopid = Integer.parseInt(data[5].trim());
                    int streetid = Integer.parseInt(data[6].trim());
                    int pickupfees = Integer.parseInt(data[7].trim());
                    String workinghours = data[8].trim();
                    String phone = data[9].trim();
                    int pickupcenterID = Integer.parseInt(data[10].trim());
                    result = GeneralAddressManager.EditPickUpAddress(pickupname, stateid, lgaid, lcdaid, townid, bstopid, streetid, pickupfees, workinghours, phone, pickupcenterID);
                    json = new Gson().toJson(result);
                    break;
                }
                case "AddNewUserAddress": {
                    int lcdaid;
                    String[] data = request.getParameterValues("data[]");
                    int addresstype = Integer.parseInt(data[0]);
                    int stateid = Integer.parseInt(data[1].trim());
                    int lgaid = Integer.parseInt(data[2].trim());
                    String lcda1 = data[3].trim();
                    if ("".equals(lcda1) || "Select LCDA".equals(lcda1) || "0".equals(lcda1)) {
                        lcdaid = 0;
                    } else {
                        lcdaid = Integer.parseInt(lcda1);
                    }
                    int townid = Integer.parseInt(data[4].trim());
                    int bstopid = Integer.parseInt(data[5].trim());
                    int streetid = Integer.parseInt(data[6].trim());
                    String desc = data[7];
                    int userid = Integer.parseInt(data[8].trim());
                    String addressowner = data[9];
                    result = GeneralAddressManager.AddUserAddress(addresstype, stateid, lgaid, lcdaid, townid, bstopid, streetid, desc, userid, addressowner);
                    json = new Gson().toJson(result);
                    break;
                }
                case "EditNewUserAddress": {
                    int lcdaid;
                    String[] data = request.getParameterValues("data[]");
                    String addresstype = data[0];
                    int stateid = Integer.parseInt(data[1].trim());
                    int lgaid = Integer.parseInt(data[2].trim());
                    String lcda1 = data[3].trim();
                    if ("".equals(lcda1) || "Select LCDA".equals(lcda1) || "0".equals(lcda1)) {
                        lcdaid = 0;
                    } else {
                        lcdaid = Integer.parseInt(lcda1);
                    }
                    int townid = Integer.parseInt(data[4].trim());
                    int bstopid = Integer.parseInt(data[5].trim());
                    int streetid = Integer.parseInt(data[6].trim());
                    String desc = data[7];
                    int addressid = Integer.parseInt(data[8]);
                    int addid = Integer.parseInt(data[8].trim());
                    result = GeneralAddressManager.EditUserAddress(addresstype, stateid, lgaid, lcdaid, townid, bstopid, streetid, desc, addressid); //GeneralAddressManager.EditUserAddress(addresstype, stateid, lgaid, lcdaid, townid, bstopid, streetid, desc, addid, addressid);
                    json = new Gson().toJson(result);
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
            Logger.getLogger(ProductServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(ProductServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(ProductServlet.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(ProductServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(ProductServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ParseException ex) {
            Logger.getLogger(ProductServlet.class.getName()).log(Level.SEVERE, null, ex);
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
