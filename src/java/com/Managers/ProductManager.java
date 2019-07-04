/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Managers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.*;
import wmengine.Managers.*;
import wmengine.Tables.*;

/**
 *
 * @author Saint
 */
public class ProductManager {

    public static int AddCategory(String SubName, String Type) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        int result = 0;
        HashMap<String, Object> tableData = new HashMap<>();
        tableData.put(Tables.Product_Category.Name, SubName);
        tableData.put(Tables.Product_Category.Type, Type);
        result = DBManager.insertTableDataReturnID(Tables.Product_Category.Table, tableData, "");
        return result;
    }

    public static int AddSubCategory(int CatID, String SubName) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        int subcatid = 0;
        String subcattype = "";
        String catType = DBManager.GetString(Tables.Product_Category.Type, Tables.Product_Category.Table, "where " + Tables.Product_Category.ID + " = " + CatID);
        if (catType.equals("TopCategory")) {
            subcattype = "Category";
            subcatid = AddCategory(SubName, subcattype);
        } else if (catType.equals("Category")) {
            subcattype = "SubCategory";
            subcatid = AddCategory(SubName, subcattype);
        }
        HashMap<String, Object> tableData = new HashMap<>();
        tableData.put(Tables.ProductJoin.ItemOneID, CatID);
        tableData.put(Tables.ProductJoin.ItemTwoID, subcatid);
        tableData.put(Tables.ProductJoin.ItemOneType, catType);
        tableData.put(Tables.ProductJoin.ItemTwoType, subcattype);
        tableData.put(Tables.ProductJoin.LinkID, 1);
        String result = DBManager.insertTableData(Tables.ProductJoin.Table, tableData, "");
        return subcatid;
    }

    public static String AddProductCategoryProp(int CatID, String propName) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        String result = "";
        HashMap<String, Object> tableData = new HashMap<>();
        tableData.put(Tables.Product_Category_Properties.Name, propName);
        int propid = DBManager.insertTableDataReturnID(Tables.Product_Category_Properties.Table, tableData, "");

        String oldcatprop = DBManager.GetString(Tables.Product_Category.Properties, Tables.Product_Category.Table, "where " + Tables.Product_Category.ID + " = " + CatID);
        if ((oldcatprop == null) || (oldcatprop.equals("null")) || (oldcatprop.equals("none"))) {
            result = DBManager.UpdateStringData(Tables.Product_Category.Table, Tables.Product_Category.Properties, propid + "", "where " + Tables.Product_Category.ID + " = " + CatID);
        } else {
            String newcatprop = oldcatprop + "," + propid + ",";
            result = DBManager.UpdateStringData(Tables.Product_Category.Table, Tables.Product_Category.Properties, newcatprop, "where " + Tables.Product_Category.ID + " = " + CatID);
        }
        return result;
    }

    public static int getOutOfStockVal() throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        String outofStockVal = DBManager.GetString(Tables.WealthMarketParameters.ParameterValue, Tables.WealthMarketParameters.Table,
                "where " + Tables.WealthMarketParameters.ParameterName + " = 'out of stock'");
        int val = Integer.parseInt(outofStockVal);
        return val;
    }

    public static String DeclineUserListedProduct(int Id) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        String res = "";
        String status = DBManager.GetString(Tables.ProductPool.Status, Tables.ProductPool.Table, "where " + Tables.ProductPool.ID + " = " + Id);
        if (status.equals("Accepted")) {
            res = "Product exists on the Shop and cannot be rejected";
        } else {
            res = DBManager.UpdateStringData(Tables.ProductPool.Table, Tables.ProductPool.Status, "Declined", "where " + Tables.ProductPool.ID + " = " + Id);
        }
        return res;
    }

    public static String ApproveUserListedProduct(int AdminUserid, int SupplierUserID, int ProdPoolID, String ObjectType, int Amount) throws ClassNotFoundException, SQLException, ParseException, UnsupportedEncodingException, IOException {
        String result = "";
        String status = DBManager.GetString(Tables.ProductPool.Status, Tables.ProductPool.Table, "where " + Tables.ProductPool.ID + " = " + ProdPoolID);
        if (status.equals("Accepted")) {
            result = "Product has already been listed or approved";
        } else if (status.equals("Declined")) {
            result = "Product was rejected and cannot be listed on the Shop";
        } else {
            DBManager.UpdateStringData(Tables.ProductPool.Table, Tables.ProductPool.Status, "Accepted", "where " + Tables.ProductPool.ID + " = " + ProdPoolID);
            HashMap<String, String> details = DBManager.GetTableData(Tables.ProductPool.Table, "where " + Tables.ProductPool.ID + " = " + ProdPoolID);

            String pname = details.get(Tables.ProductPool.ProductName);
            String category = details.get(Tables.ProductPool.CategoryID);
            String summary = details.get(Tables.ProductPool.Summary);
            String productQuantity = details.get(Tables.ProductPool.Quantity);
            String description = details.get(Tables.ProductPool.Description);
            String properties = details.get(Tables.ProductPool.Properties);
            String price = details.get(Tables.ProductPool.ProposedPrice);
            String SupplierUserid = details.get(Tables.ProductPool.UserID);
            String prodTags = details.get(Tables.ProductPool.Tags);

            HashMap<String, Object> tableData = new HashMap<>();
            tableData.put(Tables.Product_Definition.Name, pname);
            tableData.put(Tables.Product_Definition.Category, category);
            tableData.put(Tables.Product_Definition.Summary, summary);
            tableData.put(Tables.Product_Definition.Description, description);
            tableData.put(Tables.Product_Definition.SellingPrice, price);
            tableData.put(Tables.Product_Definition.Listed, 1);
            tableData.put(Tables.Product_Definition.Tags, prodTags);
            int proddefID = DBManager.insertTableDataReturnID(Tables.Product_Definition.Table, tableData, "");
            boolean moveproductimagestovariouslocations = MoveProductImage(ProdPoolID, proddefID);

            String SerialNumber = GeneralAccountManager.generateRandomNumber(6);
            String additionalData = SupplierUserid + "-" + proddefID;
            String newSerialNumber = additionalData + "-" + SerialNumber;
            String prodSerialNum = GeneralProductManager.CheckGeneratedNumberInDB(newSerialNumber, "ProductRecord", additionalData);

            HashMap<String, Object> tableData2 = new HashMap<>();
            Date addeddate = UtilityManager.CurrentDate();
            tableData2.put(Tables.ProductRecord.DateAdded, addeddate);
            tableData2.put(Tables.ProductRecord.ProductDefID, proddefID);
            tableData2.put(Tables.ProductRecord.Price, price);
            tableData2.put(Tables.ProductRecord.Quantity, productQuantity);
            tableData2.put(Tables.ProductRecord.Properties, properties);
//            tableData2.put(Tables.ProductRecord.Supplierid, SupplierUserid);//use this supplier userid for wm store 
            tableData2.put(Tables.ProductRecord.Supplierid, 1);//use wm id as the supplier for wm shop
            tableData2.put(Tables.ProductRecord.Product_ListedBy_ID, SupplierUserid);//capture the supplierid here for any reason you might need it
            tableData2.put(Tables.ProductRecord.verified_by_ID, AdminUserid); //Userid of the admin that verifies the product
            tableData2.put(Tables.ProductRecord.Ratings, 0);
            tableData2.put(Tables.ProductRecord.SerialNumber, "WM-" + prodSerialNum);
            result = DBManager.insertTableData(Tables.ProductRecord.Table, tableData2, "");
            GeneralAccountManager.CreateNewInventory(SupplierUserID, AdminUserid, Amount, "", "", "", proddefID, ObjectType);//confirm that the AdminUserID approving product can also create warrants
//            DBManager.DeleteObject(Tables.ProductPool.Table, "where " + Tables.ProductPool.ID + " = " + ProdPoolID);
        }

        return result;
    }

    public static boolean MoveProductImage(int prodpoolid, int proddefID) throws UnsupportedEncodingException, IOException {
        boolean result = false;
        String ImageDir = FilePathManager.getInstance().getManagerUnlistedProductImageAddress();
        String SourceDir = ImageDir + "product-" + prodpoolid + ".png";
        // File (or Directory) to be moved
        File sourceFile = new File(SourceDir);

        // Destination directory
        String managerDestDir = FilePathManager.getInstance().getManagerProductImageAddress();
        String portalDestDir = FilePathManager.getInstance().getPortalProductImageAddress();
        String shopDestDir = FilePathManager.getInstance().getShopProductImageAddress();

        File targetManagerDir = new File(managerDestDir);
        File targetShopDir = new File(shopDestDir);
        File targetportalDir = new File(portalDestDir);

        result = MoveFile(SourceDir, shopDestDir, targetShopDir, sourceFile, proddefID);
        result = MoveFile(SourceDir, managerDestDir, targetManagerDir, sourceFile, proddefID);
        result = MoveFile(SourceDir, portalDestDir, targetportalDir, sourceFile, proddefID);
        return result;
    }

    public static boolean MoveFile(String SourceDir, String AppDestDir, File targetAppDir, File sourceFile, int proddefID) throws UnsupportedEncodingException, IOException {
        boolean result = false;
        InputStream in = null;
        OutputStream out = null;
        try {

            if (targetAppDir.exists()) {
                String ActualSourceFile = sourceFile.getName().split("-")[0];
                String newSourceFileName = ActualSourceFile + "-" + proddefID + ".png";

                String newFilePath = AppDestDir + File.separator + newSourceFileName;
//                String newFilePath = AppDestDir + File.separator + sourceFile.getName();
                File movedFile = new File(newFilePath);
                if (movedFile.exists()) {
                    movedFile.delete();
                }
                File oldFile = new File(SourceDir);
                File newFile = new File(newFilePath);

                in = new FileInputStream(oldFile);
                out = new FileOutputStream(newFile);

                byte[] moveBuff = new byte[1024];
                int butesRead;
                while ((butesRead = in.read(moveBuff)) > 0) {
                    out.write(moveBuff, 0, butesRead);
                }

                in.close();
                out.close();
                result = true;
                System.out.println("The File was successfully moved to the new folder");

            } else {
                System.out.println("unable to move file " + sourceFile.getName() + " to directory " + AppDestDir + " -> target directory does not exist");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    public static ArrayList<Integer> GetSameNameProductIDs(String name) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        ArrayList<Integer> result = DBManager.GetIntArrayList(Tables.Product_Definition.ID, Tables.Product_Definition.Table, "where " + Tables.Product_Definition.Name + " like " + "'%" + name + "%'");
        return result;
    }

    public static ArrayList<Integer> GetSupplierProductIDs(int supplierId) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        ArrayList<Integer> result = DBManager.GetIntArrayList(Tables.ProductRecord.ID, Tables.ProductRecord.Table, "where " + Tables.ProductRecord.Supplierid + " = " + supplierId);
        return result;
    }

    public static String RemoveShopProduct(int Id) throws ClassNotFoundException, SQLException, UnsupportedEncodingException, IOException {
        String res = "";
        //delete from prod def table 
        res = DBManager.DeleteObject(Tables.Product_Definition.Table, "where " + Tables.Product_Definition.ID + " = " + Id);
        //delete from prod record table
        DBManager.DeleteObject(Tables.ProductRecord.Table, "where " + Tables.ProductRecord.ProductDefID + " = " + Id);
        //delete the image from listed folder on the shop
        GeneralProductManager.DeleteProductImage(Id);

        return res;
    }

    public static String AddNewDeal(String name, String desc, Date StartDate, Date EndDate) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        String result = "";
        HashMap<String, Object> tableData = new HashMap<>();
        tableData.put(Tables.Promo.Name, name);
        tableData.put(Tables.Promo.Description, desc);
        tableData.put(Tables.Promo.StartDate, StartDate);
        tableData.put(Tables.Promo.EndDate, EndDate);
        result = DBManager.insertTableData(Tables.Promo.Table, tableData, "");
        return result;
    }

    public static String AddPromoProductDetail(int promoid, int prodid, int price) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        String result = "";
        String proddetails = prodid + ":" + price;
        String ProductDetails = DBManager.GetString(Tables.Promo.ProductDetails, Tables.Promo.Table, "where " + Tables.Promo.ID + " = " + promoid);
        if (ProductDetails != null) {
            String details[] = ProductDetails.split(";");
            for (String record : details) {
                String productid = record.split(":")[0];
                int ProductID = Integer.parseInt(productid);
                if (ProductID == prodid) {
                    return result = "failed";
                } else {
                    String productdetails = ProductDetails + ";" + proddetails;
                    result = DBManager.UpdateStringData(Tables.Promo.Table, Tables.Promo.ProductDetails, productdetails, "where " + Tables.Promo.ID + " = " + promoid);
                }
            }
        } else {
            result = DBManager.UpdateStringData(Tables.Promo.Table, Tables.Promo.ProductDetails, proddetails, "where " + Tables.Promo.ID + " = " + promoid);
        }
        return result;
    }

    public static String UpdatePromoProductDetail(int promoid, int prodid, int price) throws ClassNotFoundException, SQLException, UnsupportedEncodingException {
        String result = "";

        String ProductDetails = DBManager.GetString(Tables.Promo.ProductDetails, Tables.Promo.Table, "where " + Tables.Promo.ID + " = " + promoid);
        if (ProductDetails != null) {
            String details[] = ProductDetails.split(";");
            for (String record : details) {
                String productid = record.split(":")[0];
                int ProductID = Integer.parseInt(productid);
                if (ProductID == prodid) {
                    String newproddetails = prodid + ":" + price;
                    ProductDetails = ProductDetails.replace(record, newproddetails);
                    result = DBManager.UpdateStringData(Tables.Promo.Table, Tables.Promo.ProductDetails, ProductDetails, "where " + Tables.Promo.ID + " = " + promoid);
                }
            }
        }
        return result;
    }

    public static String ReStockProduct(int prodid, int quantity, int Amount, int AdminUserID) throws ClassNotFoundException, SQLException, UnsupportedEncodingException, ParseException {
        String result = "";
        int ProductSupplierID = DBManager.GetInt(Tables.ProductRecord.Product_ListedBy_ID, Tables.ProductRecord.Table, "where " + Tables.ProductRecord.ProductDefID + " = " + prodid);
        int currentQty = DBManager.GetInt(Tables.ProductRecord.Quantity, Tables.ProductRecord.Table, "where " + Tables.ProductRecord.ProductDefID + " = " + prodid);
        int newQty = currentQty + quantity;
        result = DBManager.UpdateIntData(Tables.ProductRecord.Quantity, newQty, Tables.ProductRecord.Table, "where " + Tables.ProductRecord.ProductDefID + " = " + prodid);
        GeneralAccountManager.CreateNewInventory(ProductSupplierID, AdminUserID, Amount, "", "", "", prodid, "Products");
        return result;
    }

}
