/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Cell;
import wmengine.Managers.ExcelManager;
import wmengine.Managers.FilePathManager;

/**
 *
 * @author Joswal
 */
@WebServlet(name = "ProductExcelServlet", urlPatterns = {"/ProductExcelServlet"})
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 10, // 10MB
        maxFileSize = 1024 * 1024 * 10, // 10MB
        maxRequestSize = 1024 * 1024 * 50)   // 50MB
public class ProductExcelServlet extends HttpServlet {

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
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
//             String portaladdress = FilePathManager.getInstance().getPortalexcelAttachmentsAddress();
            String manageraddress = FilePathManager.getInstance().getManagerexcelAttachmentsAddress();

            for (Part part : request.getParts()) {
                String fileName = extractFileName(part);
                if (!fileName.equals("")) {
                    String userid = request.getParameter("userid");
                    String catid = request.getParameter("prodCategories");
//                    int categoryID = Integer.parseInt(catid);
                    int userID = Integer.parseInt(userid);
//                    fileName = new File(fileName).getName();
//                    fileName = "productExcel-" + userID + ".xls";
                    fileName = "productExcel-2.xls";
                    // refines the fileName in case it is an absolute path
//                    FilePathManager.getInstance().deleteOldUserProductExcelFile(fileName, portaladdress);
//                    FilePathManager.getInstance().deleteOldUserProductExcelFile(fileName, manageraddress);

                    try {
//                        String filepath = manageraddress + fileName;
                        String filepath = "C:/Users/DELL/Documents/joseph/ndf_git/wmmanager/web/global_assets/app/img/productExcels/"+ fileName;
//                        part.write(filepath);
                        FileInputStream input = new FileInputStream(filepath);
                        POIFSFileSystem fs = new POIFSFileSystem(input);
                        HSSFWorkbook wb = new HSSFWorkbook(fs);
                        HSSFSheet sheet = wb.getSheetAt(0);
                        Row row;
                        ArrayList<Integer> ids = new ArrayList<>();
                        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                            row = sheet.getRow(i);
                            int categoryID= 1;
                            String name = row.getCell(0).getStringCellValue();
                            String summary = row.getCell(1).getStringCellValue();
                            String decsription = row.getCell(2).getStringCellValue();
//                            int price = (int) row.getCell(3).getNumericCellValue();
//                            int quantity = (int) row.getCell(4).getNumericCellValue();
//                            String properties = row.getCell(5).getStringCellValue();
//                            String tags = row.getCell(6).getStringCellValue();
                            int prodId = ExcelManager.enterProductExcelData(userID, name, categoryID, summary, decsription);
                            ids.add(prodId);
                        }
                        int productLength = ids.size();

                        FilePathManager.getInstance().msgbox("successful added " + productLength + " products");
                    } catch (Exception ex) {
                        String problem = ex.getMessage();
                        System.out.print(problem);
                        FilePathManager.getInstance().msgbox("problem: " + "  " + problem);
                    }

                }

            }
            response.sendRedirect(request.getHeader("referer"));
        }
    }

    private String extractFileName(Part part) {
        String contentDisp = part.getHeader("content-disposition");
        String[] items = contentDisp.split(";");
        for (String s : items) {
            if (s.trim().startsWith("filename")) {
                return s.substring(s.indexOf("=") + 2, s.length() - 1);
            }
        }
        return "";
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
        processRequest(request, response);
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
        processRequest(request, response);
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
