/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Services;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
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
import wmengine.Tables.Tables;

/**
 *
 * @author ndfmac
 */
public class WriteServlet extends HttpServlet {

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
            String caseType = request.getParameter("type").trim();
            String json = "";
            String json1 = "";
            String json2 = "";
            String result = "";
            switch (caseType) {
                case "GetAllBooks": {
                    String[] data = request.getParameterValues("data[]");
                    String searchtxt = data[0].trim();
                    String countstr = data[1].trim();
                    String objectid = data[2].trim();
                    String object = data[3].trim();
                    int linkedID = Integer.parseInt(objectid);
                    int count = Integer.parseInt(countstr);
                    int end = 20;
                    ArrayList<Integer> ids = new ArrayList<>();
                    HashMap<Integer, HashMap<String, String>> BookList = new HashMap<>();
                    if (searchtxt.equals("")) {
                        ids = GeneralWriteManager.getBooksWithoutLimit();
                    } else {
                        ids = GeneralWriteManager.findBooksWithoutLimit(searchtxt);
                    }

                    if (linkedID != 0) {
                        ArrayList<Integer> match = GeneralWriteManager.getLinkedObject(object, linkedID, "Book");
                        ids.retainAll(match);
                    }

                    ids.subList(0, count).clear();
                    if (end < ids.size()) {
                        ids.subList(end, ids.size()).clear();
                    }

                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, String> List = GeneralWriteManager.getBookDetails(id);
                            if (!List.isEmpty()) {
                                BookList.put(id, List);
                            }
                        }
                        json = new Gson().toJson(BookList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "GetUnAndPublishedBooks": {
                    String[] data = request.getParameterValues("data[]");
                    String searchtxt = data[0].trim();
                    String countstr = data[1].trim();
                    String objectid = data[2].trim();
                    String object = data[3].trim();
                    String value = data[4].trim();
                    int linkedID = Integer.parseInt(objectid);
                    int count = Integer.parseInt(countstr);
                    int end = 20;
                    int valuecheck = Integer.parseInt(value);
                    ArrayList<Integer> ids = new ArrayList<>();
                    HashMap<Integer, HashMap<String, String>> BookList = new HashMap<>();
                    if (valuecheck == 1) {
                        if (searchtxt.equals("")) {
                            ids = GeneralWriteManager.getPublishedBooksWithoutLimit();
                        } else {
                            ids = GeneralWriteManager.findPublishedBooksWithoutLimit(searchtxt);
                        }
                    } else if (valuecheck == 0) {
                        if (searchtxt.equals("")) {
                            ids = GeneralWriteManager.getUnPublishedBooksWithoutLimit();
                        } else {
                            ids = GeneralWriteManager.findUnPublishedBooksWithoutLimit(searchtxt);
                        }
                    }
                    if (linkedID != 0) {
                        ArrayList<Integer> match = GeneralWriteManager.getLinkedObject(object, linkedID, "Book");
                        ids.retainAll(match);
                    }

                    ids.subList(0, count).clear();
                    if (end < ids.size()) {
                        ids.subList(end, ids.size()).clear();
                    }

                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, String> List = GeneralWriteManager.getBookDetails(id);
                            if (!List.isEmpty()) {
                                BookList.put(id, List);
                            }
                        }
                        json = new Gson().toJson(BookList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "GetAllArticles": {
                    String[] data = request.getParameterValues("data[]");
                    String searchtxt = data[0].trim();
                    String countstr = data[1].trim();
                    String objectid = data[2].trim();
                    String object = data[3].trim();
                    int linkedID = Integer.parseInt(objectid);
                    int count = Integer.parseInt(countstr);
                    int end = 20;
                    ArrayList<Integer> ids = new ArrayList<>();
                    HashMap<Integer, HashMap<String, String>> ArticleList = new HashMap<>();
                    if (searchtxt.equals("")) {
                        ids = GeneralWriteManager.getArticlesWithoutLimit();
                    } else {
                        ids = GeneralWriteManager.findArticlesWithoutLimit(searchtxt);
                    }

                    if (linkedID != 0) {
                        ArrayList<Integer> match = GeneralWriteManager.getLinkedObject(object, linkedID, "Book");
                        ids.retainAll(match);
                    }

                    ids.subList(0, count).clear();
                    if (end < ids.size()) {
                        ids.subList(end, ids.size()).clear();
                    }

                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, String> List = GeneralWriteManager.getBookDetails(id);
                            if (!List.isEmpty()) {
                                ArticleList.put(id, List);
                            }
                        }
                        json = new Gson().toJson(ArticleList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "GetUnAndPublishedArticles": {
                    String[] data = request.getParameterValues("data[]");
                    String searchtxt = data[0].trim();
                    String countstr = data[1].trim();
                    String objectid = data[2].trim();
                    String object = data[3].trim();
                    String value = data[4].trim();
                    int linkedID = Integer.parseInt(objectid);
                    int count = Integer.parseInt(countstr);
                    int end = 20;
                    int valuecheck = Integer.parseInt(value);
                    ArrayList<Integer> ids = new ArrayList<>();
                    HashMap<Integer, HashMap<String, String>> BookList = new HashMap<>();
                    if (valuecheck == 1) {
                        if (searchtxt.equals("")) {
                            ids = GeneralWriteManager.getPublishedArticlesWithoutLimit();
                        } else {
                            ids = GeneralWriteManager.findPublishedArticlesWithoutLimit(searchtxt);
                        }
                    } else if (valuecheck == 0) {
                        if (searchtxt.equals("")) {
                            ids = GeneralWriteManager.getUnPublishedArticlesWithoutLimit();
                        } else {
                            ids = GeneralWriteManager.findUnPublishedArtilcesWithoutLimit(searchtxt);
                        }
                    }
                    if (linkedID != 0) {
                        ArrayList<Integer> match = GeneralWriteManager.getLinkedObject(object, linkedID, "Book");
                        ids.retainAll(match);
                    }

                    ids.subList(0, count).clear();
                    if (end < ids.size()) {
                        ids.subList(end, ids.size()).clear();
                    }

                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, String> List = GeneralWriteManager.getBookDetails(id);
                            if (!List.isEmpty()) {
                                BookList.put(id, List);
                            }
                        }
                        json = new Gson().toJson(BookList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "UnAndPublishBook": {
                    String[] data = request.getParameterValues("data[]");
                    String bookid = data[0].trim();
                    String check = data[1].trim();
                    int BookID = Integer.parseInt(bookid);
                    if (check.equals("Publish")) {
                        result = GeneralWriteManager.PublishBook(BookID);
                    } else {
                        result = GeneralWriteManager.UnpublishBook(BookID);
                    }
                    json1 = new Gson().toJson(result);
                    json2 = new Gson().toJson(check);
                    json = "[" + json1 + "," + json2 + "]";
                    break;
                }
                case "GetAllSections": {
                    String[] data = request.getParameterValues("data[]");
                    String searchtxt = data[0].trim();
                    String countstr = data[1].trim();
                    String objectid = data[2].trim();
                    String object = data[3].trim();
                    int linkedID = Integer.parseInt(objectid);
                    int count = Integer.parseInt(countstr);
                    int end = 20;
                    ArrayList<Integer> ids = new ArrayList<>();
                    HashMap<Integer, HashMap<String, String>> sectionList = new HashMap<>();
                    if (searchtxt.equals("")) {
                        ids = GeneralWriteManager.getSectionsWithoutLimit();
                    } else {
                        ids = GeneralWriteManager.findSectionsWithoutLimit(searchtxt);
                    }

                    if (linkedID != 0) {
                        ArrayList<Integer> match = GeneralWriteManager.getLinkedObject(object, linkedID, "Section");
                        ids.retainAll(match);
                    }

                    ids.subList(0, count).clear();
                    if (end < ids.size()) {
                        ids.subList(end, ids.size()).clear();
                    }

                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, String> List = GeneralWriteManager.getSectionDetails(id);
                            if (!List.isEmpty()) {
                                sectionList.put(id, List);
                            }
                        }
                        json = new Gson().toJson(sectionList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "GetCheckedInAndOutSections": {
                    String[] data = request.getParameterValues("data[]");
                    String searchtxt = data[0].trim();
                    String countstr = data[1].trim();
                    String objectid = data[2].trim();
                    String object = data[3].trim();
                    String value = data[4].trim();
                    int linkedID = Integer.parseInt(objectid);
                    int count = Integer.parseInt(countstr);
                    int end = 20;
                    ArrayList<Integer> ids = new ArrayList<>();
                    HashMap<Integer, HashMap<String, String>> sectionList = new HashMap<>();
                    int valuecheck = Integer.parseInt(value);
                    if (valuecheck == 1) {
                        if (searchtxt.equals("")) {
                            ids = GeneralWriteManager.getCheckedInSectionsWithoutLimit();
                        } else {
                            ids = GeneralWriteManager.findCheckedInSectionsWithoutLimit(searchtxt);
                        }
                    } else if (valuecheck == 0) {
                        if (searchtxt.equals("")) {
                            ids = GeneralWriteManager.getCheckedOutSectionsWithoutLimit();
                        } else {
                            ids = GeneralWriteManager.findCheckedOutSectionsWithoutLimit(searchtxt);
                        }
                    }
                    if (linkedID != 0) {
                        ArrayList<Integer> match = GeneralWriteManager.getLinkedObject(object, linkedID, "Section");
                        ids.retainAll(match);
                    }

                    ids.subList(0, count).clear();
                    if (end < ids.size()) {
                        ids.subList(end, ids.size()).clear();
                    }

                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, String> List = GeneralWriteManager.getSectionDetails(id);
                            if (!List.isEmpty()) {
                                sectionList.put(id, List);
                            }
                        }
                        json = new Gson().toJson(sectionList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "SectionCheckInAndOut": {
                    String[] data = request.getParameterValues("data[]");
                    String sectionid = data[0].trim();
                    String check = data[1].trim();
                    int SectionID = Integer.parseInt(sectionid);
                    if (check.equals("Check-In")) {
                        result = GeneralWriteManager.CheckInAndOutSection(SectionID, 1);
                    } else if (check.equals("Check-Out")) {
                        result = GeneralWriteManager.CheckInAndOutSection(SectionID, 0);
                    }
                    json1 = new Gson().toJson(result);
                    json2 = new Gson().toJson(check);
                    json = "[" + json1 + "," + json2 + "]";
                    break;
                }
                case "GetAllKeywords": {
                    String[] data = request.getParameterValues("data[]");
                    String searchtxt = data[0].trim();
                    String countstr = data[1].trim();
                    String objectid = data[2].trim();
                    String object = data[3].trim();
                    int linkedID = Integer.parseInt(objectid);
                    int count = Integer.parseInt(countstr);
                    int end = 20;

                    ArrayList<Integer> ids = new ArrayList<>();
                    HashMap<Integer, String> Names = new HashMap<>();
                    if (searchtxt.equals("")) {
                        ids = GeneralWriteManager.getKeywordsWithoutLimit();
                    } else {
                        ids = GeneralWriteManager.findKeywordsWithoutLimit(searchtxt);
                    }

                    if (linkedID != 0) {
                        ArrayList<Integer> match = GeneralWriteManager.getLinkedObject(object, linkedID, "index");
                        ArrayList<Integer> match2 = GeneralWriteManager.getLinkedObject(object, linkedID, "Tag");
                        match.addAll(match2);
                        ids.retainAll(match);
                    }

                    ids.subList(0, count).clear();
                    if (end < ids.size()) {
                        ids.subList(end, ids.size()).clear();
                    }

                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            String name = GeneralWriteManager.getKeywordNameByID(id);
                            Names.put(id, name);
                        }
                        json1 = new Gson().toJson(ids);
                        json2 = new Gson().toJson(Names);
                        json = "[" + json1 + "," + json2 + "]";
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "GetAllTags": {
                    String[] data = request.getParameterValues("data[]");
                    String searchtxt = data[0].trim();
                    String countstr = data[1].trim();
                    String objectid = data[2].trim();
                    String object = data[3].trim();
                    int linkedID = Integer.parseInt(objectid);
                    int count = Integer.parseInt(countstr);
                    int limit = 30;
                    HashMap<Integer, HashMap<String, String>> tagList = new HashMap<>();
                    ArrayList<Integer> ids = new ArrayList<>();
                    if (searchtxt.equals("")) {
                        ids = GeneralWriteManager.getTagsWithoutLimit();
                    } else {
                        ids = GeneralWriteManager.findTagsWithoutLimit(searchtxt);
                    }

                    if (linkedID != 0) {
                        ArrayList<Integer> match = GeneralWriteManager.getLinkedObject(object, linkedID, "Tag");
                        ids.retainAll(match);
                    }

                    ids.subList(0, count).clear();
                    if (limit < ids.size()) {
                        ids.subList(limit, ids.size()).clear();
                    }

                    if (!ids.isEmpty()) {
                        for (int id : ids) {
                            HashMap<String, String> res = GeneralWriteManager.getTagDetail(id);
                            if (!res.isEmpty()) {
                                tagList.put(id, res);
                            }
                        }
                        json = new Gson().toJson(tagList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }

                case "GetAllComments": {
                    String[] data = request.getParameterValues("data[]");
                    String searchtxt = data[0].trim();
                    String countstr = data[1].trim();
                    String objectid = data[2].trim();
                    String object = data[3].trim();
                    int linkedID = Integer.parseInt(objectid);
                    int count = Integer.parseInt(countstr);
                    int end = 30;
                    ArrayList<Integer> commentids = new ArrayList<>();
                    HashMap<Integer, Object> comments = new HashMap<>();
                    if (searchtxt.equals("")) {
                        commentids = GeneralWriteManager.getCommentsWithoutLimit();
                    } else {
                        commentids = GeneralWriteManager.findCommentsWithoutLimit(searchtxt);
                    }

                    if (linkedID != 0) {
                        ArrayList<Integer> match = GeneralWriteManager.getLinkedObject(object, linkedID, "Comment");
                        commentids.retainAll(match);
                    }

                    commentids.subList(0, count).clear();
                    if (end < commentids.size()) {
                        commentids.subList(end, commentids.size()).clear();
                    }

                    if (!commentids.isEmpty()) {
                        for (int cmtid : commentids) {
                            HashMap<String, String> commentData = GeneralWriteManager.getCommentDetails(cmtid);
                            if (!commentData.isEmpty()) {
                                comments.put(cmtid, commentData);
                            }
                        }
                        json = new Gson().toJson(comments);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "GetAllIndexes": {
                    String[] data = request.getParameterValues("data[]");
                    String searchtxt = data[0].trim();
                    String countstr = data[1].trim();
                    String objectid = data[2].trim();
                    String object = data[3].trim();
                    int linkedID = Integer.parseInt(objectid);
                    int count = Integer.parseInt(countstr);
                    int end = 20;
                    ArrayList<Integer> indexids = new ArrayList<>();
                    HashMap<Integer, Object> indexList = new HashMap<>();
                    if (searchtxt.equals("")) {
                        indexids = GeneralWriteManager.getIndexesWithoutLimit();
                    } else {
                        indexids = GeneralWriteManager.findIndexesWithoutLimit(searchtxt);
                    }

                    if (linkedID != 0) {
                        ArrayList<Integer> match = GeneralWriteManager.getLinkedObject(object, linkedID, "index");
                        indexids.retainAll(match);
                    }

                    indexids.subList(0, count).clear();
                    if (end < indexids.size()) {
                        indexids.subList(end, indexids.size()).clear();
                    }

                    if (!indexids.isEmpty()) {
                        for (int index : indexids) {
                            HashMap<String, String> indexDetails = GeneralWriteManager.getIndexDetails(index);
                            if (!indexDetails.isEmpty()) {
                                indexList.put(index, indexDetails);
                            }
                        }
                        json = new Gson().toJson(indexList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }
                case "GetAllBookmarks": {
                    String[] data = request.getParameterValues("data[]");
                    String searchtxt = data[0].trim();
                    String countstr = data[1].trim();
                    String objectid = data[2].trim();
                    String object = data[3].trim();
                    int linkedID = Integer.parseInt(objectid);
                    int count = Integer.parseInt(countstr);
                    int end = 20;
                    ArrayList<Integer> ids = new ArrayList<>();
                    HashMap<Integer, Object> bkmkList = new HashMap<>();
                    if (searchtxt.equals("")) {
                        ids = GeneralWriteManager.getBookmarksWithoutLimit();
                    } else {
                        ids = GeneralWriteManager.findBookmarksWithoutLimit(searchtxt);
                    }

                    if (linkedID != 0) {
                        ArrayList<Integer> match = GeneralWriteManager.getLinkedObject(object, linkedID, "Clip");
                        ids.retainAll(match);
                    }

                    ids.subList(0, count).clear();
                    if (end < ids.size()) {
                        ids.subList(end, ids.size()).clear();
                    }

                    if (!ids.isEmpty()) {
                        for (int index : ids) {
                            HashMap<String, String> bkmkDetails = GeneralWriteManager.getBookmarkDetail(index);
                            if (!bkmkDetails.isEmpty()) {
                                bkmkList.put(index, bkmkDetails);
                            }
                        }
                        json = new Gson().toJson(bkmkList);
                    } else {
                        json = new Gson().toJson("empty");
                    }
                    break;
                }

                case "GetRecentObjects": {
                    String LastAddedBook = DBManager.GetString(Tables.BooksTable.Title, Tables.BooksTable.Table, "");
                    String LastAddedSection = DBManager.GetString(Tables.SectionsTable.Name, Tables.SectionsTable.Table, "");
                    String LastAddedIndex = DBManager.GetString(Tables.Indexes.Header, Tables.Indexes.Table, "");
                    String LastAddedKeyword = DBManager.GetString(Tables.Keywords.Name, Tables.Keywords.Table, "");
                    String LastAddedTag = DBManager.GetString(Tables.Tags.Name, Tables.Tags.Table, "");
                    String LastAddedComment = DBManager.GetString(Tables.Comment.Comment, Tables.Comment.Table, "");

                    json1 = new Gson().toJson(LastAddedBook);
                    json2 = new Gson().toJson(LastAddedSection);
                    String json3 = new Gson().toJson(LastAddedIndex);
                    String json4 = new Gson().toJson(LastAddedKeyword);
                    String json5 = new Gson().toJson(LastAddedTag);
                    String json6 = new Gson().toJson(LastAddedComment);
                    json = "[" + json1 + "," + json2 + "," + json3 + "," + json4 + "," + json5 + "," + json6 + "]";
                    break;
                }
                case "GetObjectStats": {
                    ArrayList<Integer> Books = DBManager.GetIntArrayList(Tables.BooksTable.ID, Tables.BooksTable.Table, "");
                    ArrayList<Integer> Sections = DBManager.GetIntArrayList(Tables.SectionsTable.ID, Tables.SectionsTable.Table, "");
                    ArrayList<Integer> Tags = DBManager.GetIntArrayList(Tables.Tags.ID, Tables.Tags.Table, "");
                    ArrayList<Integer> Indexes = DBManager.GetIntArrayList(Tables.Indexes.ID, Tables.Indexes.Table, "");
                    ArrayList<Integer> Comments = DBManager.GetIntArrayList(Tables.Comment.ID, Tables.Comment.Table, "");
                    ArrayList<Integer> Keywords = DBManager.GetIntArrayList(Tables.Keywords.ID, Tables.Keywords.Table, "");
                    ArrayList<Integer> Perms = DBManager.GetIntArrayList(Tables.PermissionTable.ID, Tables.PermissionTable.Table, "");
                    ArrayList<Integer> PermsGroups = DBManager.GetIntArrayList(Tables.Permissions_Group.ID, Tables.Permissions_Group.Table, "");
                    ArrayList<Integer> UserGroups = DBManager.GetIntArrayList(Tables.UserGroups.ID, Tables.UserGroups.Table, "");
                    json1 = new Gson().toJson(Books.size());
                    json2 = new Gson().toJson(Sections.size());
                    String json3 = new Gson().toJson(Tags.size());
                    String json4 = new Gson().toJson(Indexes.size());
                    String json5 = new Gson().toJson(Comments.size());
                    String json6 = new Gson().toJson(Perms.size());
                    String json7 = new Gson().toJson(PermsGroups.size());
                    String json8 = new Gson().toJson(UserGroups.size());
                    String json9 = new Gson().toJson(Keywords.size());
                    json = "[" + json1 + "," + json2 + "," + json3 + "," + json4 + "," + json5 + "," + json6 + "," + json7 + "," + json8 + "," + json9 + "]";
                    break;
                }

                case "GetLiveObjects": {
//                    ArrayList<Integer> BookIDS = DBManager.GetIntArrayList(Tables.BooksTable.ID, Tables.BooksTable.Table, "where " + Tables.BooksTable.Status + " = 'published'");
//                    ArrayList<Integer> BkSections = new ArrayList();
//                    ArrayList<Integer> BookTags = new ArrayList<>();
//                    ArrayList<Integer> BookIndexes = new ArrayList<>();
//                    ArrayList<Integer> BookComments = new ArrayList<>();
//                    if (!BookIDS.isEmpty()) {
//                        for (int bookid : BookIDS) {
//                            ArrayList<Integer> BookSections = GeneralWriteManager.getBookSections(bookid);
//                            BkSections.add(BookSections.size());
//                            BookTags = GeneralWriteManager.getBookTags(bookid);
//                            BookIndexes = GeneralWriteManager.getBookIndexes(bookid);
//                            BookComments = GeneralWriteManager.getBookComments(bookid);
//                        }
//                    }
//                    json1 = new Gson().toJson(BookIDS.size());
//                    json2 = new Gson().toJson(BkSections.size());
//                    String json3 = new Gson().toJson(BookTags.size());
//                    String json4 = new Gson().toJson(BookIndexes.size());
//                    String json5 = new Gson().toJson(BookComments.size());
//                    json = "[" + json1 + "," + json2 + "," + json3 + "," + json4 + "," + json5 + "]";
                    break;
                }
                case "GetNotifications": {

                    break;
                }
                case "GetHistory": {

                    break;
                }
                case "getBookTitle": {
                    String bookid = "" + session.getAttribute("bookid");
                    int BookID = Integer.parseInt(bookid);
                    String bookTitle = GeneralWriteManager.getBookTitleByID(BookID);
                    json = new Gson().toJson(bookTitle);
                    break;
                }
                case "LastSeen": {
                    String userid = request.getParameter("userid");
                    int UserID = Integer.parseInt(userid);
                    String LastSeen = DBManager.GetString(Tables.UserTable.LastSeen, Tables.UserTable.Table, "where " + Tables.UserTable.ID + " = " + UserID);
                    LastSeen = LastSeen.substring(0, LastSeen.length() - 10);
                    json1 = new Gson().toJson(LastSeen);
                    json = "[" + json1 + "]";
                    break;
                }

                case "GetObjectComments": {
                    String objectid = request.getParameter("id");
                    String object = request.getParameter("object");
                    int objid = Integer.parseInt(objectid);
                    String countstr = request.getParameter("count");
                    int count = Integer.parseInt(countstr);
                    int limit = 50;
                    HashMap<Integer, String> UserNames = new HashMap<>();
                    HashMap<Integer, String> Date = new HashMap<>();
                    HashMap<Integer, String> Time = new HashMap<>();
                    HashMap<Integer, String> Comments = new HashMap<>();
                    HashMap<Integer, Integer> hasSubs = new HashMap<>();
                    HashMap<Integer, Integer> UserIds = new HashMap<>();
                    HashMap<Integer, ArrayList<Integer>> Subs = new HashMap<>();
                    ArrayList<Integer> mainids = GeneralWriteManager.getObjectCommentsWithoutLimit(objid, object);
                    ArrayList<Integer> ids = new ArrayList<>();
                    ids.addAll(mainids);

                    if (!ids.isEmpty()) {
                        while (!ids.isEmpty()) {
                            int id = ids.get(0);
                            HashMap<String, String> commentDetails = DBManager.GetTableData(Tables.Comment.Table, "where " + Tables.Comment.ID + " = " + id);
                            if (!commentDetails.isEmpty()) {
                                int UserID = Integer.parseInt(commentDetails.get("userId"));
                                UserIds.put(id, UserID);
                                String userName = GeneralUserManager.getUserName(UserID);
                                UserNames.put(id, userName);
                                Date.put(id, commentDetails.get("date"));
                                Time.put(id, commentDetails.get("time"));
                                Comments.put(id, commentDetails.get("comment"));
                            }
                            ArrayList<Integer> subids = GeneralWriteManager.getObjectCommentsWithoutLimit(id, "Comment");
                            if (subids.isEmpty()) {
                                hasSubs.put(id, 0);
                            } else {
                                hasSubs.put(id, subids.size());
                                Subs.put(id, subids);
                                ids.addAll(subids);
                            }
                            ids.remove(0);
                        }
                        json1 = new Gson().toJson(mainids);
                        json2 = new Gson().toJson(UserNames);
                        String json3 = new Gson().toJson(Date);
                        String json4 = new Gson().toJson(Time);
                        String json5 = new Gson().toJson(Comments);
                        String json6 = new Gson().toJson(hasSubs);
                        String json7 = new Gson().toJson(Subs);
                        String json8 = new Gson().toJson(UserIds);
                        json = "[" + json1 + "," + json2 + "," + json3 + "," + json4 + "," + json5 + "," + json6 + "," + json7 + "," + json8 + "]";
                    } else {
                        json = new Gson().toJson("empty");
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
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(WriteServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(WriteServlet.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(WriteServlet.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(WriteServlet.class.getName()).log(Level.SEVERE, null, ex);
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
