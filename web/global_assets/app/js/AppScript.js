/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var extension = "", userid, type, username, StaffUserID, StaffUserName, usertype, objtype, loadedUserID, loadedUserType, loadedUserName, loadedid, loadedtype, loadedname, actualuserid, actualusertype, actualusername;
var permarray = new Array();
var permarraydata = new Array();
var selectedcategoryid;
userid = $("#userid").val();
actualuserid = $("#actualUserID").val();//for the member or business that is clicked on
actualusertype = $("#actualUserType").val();
actualusername = $("#actualuserName").val();
type = $("#usertype").val();
username = $("#username").val();
var cardblock1 = $('.cardblock');
var cardblock2 = $('.cardblock2');
var cardblock3 = $('.cardblock3');

function performPageActions() {
    verifyUser();
    var page = getCurrentPage();
    if (page === "index.jsp") {

    } else if (page === "login.jsp") {
        extension = "../../";
        $("form").parsley();
    } else if (page === "profile.jsp") {
        extension = "../../../";
        profilePageFundtions();
        $("#prof_det_id").addClass("active");
    } else if (page === "prof_accounts.jsp") {
        extension = "../../../";
        profilePageFundtions();
        $("#prof_acct_id").addClass("active");
    } else if (page === "prof_staff.jsp") {
        extension = "../../../";
        profilePageFundtions();
        sessionStorage.setItem("objtype", "Staff");
        $("#prof_staf_id").addClass("active");
    } else if (page === "prof_messages.jsp") {
        extension = "../../../";
        profilePageFundtions();
        $("#prof_msgs_id").addClass("active");
    } else if (page === "prof_businesses.jsp") {
        extension = "../../../";
        profilePageFundtions();
    } else if (page === "prof_favorites.jsp") {
        extension = "../../../";
        profilePageFundtions();
        $("#prof_fav_id").addClass("active");
    } else if (page === "prof_history.jsp") {
        extension = "../../../";
        profilePageFundtions();
        $("#prof_hist_id").addClass("active");
    } else if (page === "prof_products.jsp") {
        extension = "../../../";
        profilePageFundtions();
        $("#prof_prod_id").addClass("active");
    } else if (page === "prof_services.jsp") {
        extension = "../../../";
        profilePageFundtions();
        $("#prof_serv_id").addClass("active");
    } else if (page === "product_listing.jsp") {
        extension = "../../../";
        $("#id_main_shop").addClass("active");
        $("#id_shop_products_listing").addClass("active bg-white blacktext");
        productListingPageFunctions();
    } else if (page === "prof_listings.jsp") {
        extension = "../../../";
        profilePageFundtions();
        $("#prof_list_id").addClass("active");
    } else if (page === "prof_schemes.jsp") {
        extension = "../../../";
        profilePageFundtions();
        $("#prof_sche_id").addClass("active");
    } else if (page === "prof_permissions.jsp") {
        extension = "../../../";
        profilePageFundtions();
        $("#prof_perm_id").addClass("active");
    } else if (page === "prof_manage_permissions.jsp") {
        extension = "../../../";
        StaffUserID = $("#StaffUserID").val();
        StaffUserName = $("#StaffUserName").val();
        manageStaffPermissionPage();
    } else if (page === "prof_contacts.jsp") {
        extension = "../../../";
        profilePageFundtions();
        sessionStorage.setItem("objtype", "Contact");
        $("#prof_cont_id").addClass("active");
    } else if (page === "accounts.jsp") {
        extension = "../../../";
        accountsPageFunctions();
        $("#id_main_acctandtrans").addClass("active");
        $("#id_acctandtrans_accct").addClass("active bg-white blacktext");
    } else if (page === "transactions.jsp") {
        extension = "../../../";
        accountsPageFunctions();
        $("#id_main_acctandtrans").addClass("active");
        $("#id_acctandtrans_trans").addClass("active bg-white blacktext");
    } else if (page === "dashboard.jsp") {
        extension = "../../../";
        $("#id_dashboard").addClass("active");
    } else if (page === "warrants.jsp") {
        extension = "../../../";
        showLoader();
        warrantsPageFunctions();
        $("#id_main_wm").addClass("active");
        $("#id_wm_warrants").addClass("active bg-white blacktext");
    } else if (page === "mylistings.jsp") {
        extension = "../../../";
        warrantsPageFunctions("My");
        $("#id_main_wm").addClass("active");
        $("#id_wm_mylistings").addClass("active bg-white blacktext");
    } else if (page === "allbids.jsp") {
        extension = "../../../";
        warrantsPageFunctions("My");
        $("#id_main_wm").addClass("active");
        $("#id_wm_allbids").addClass("active bg-white blacktext");
    } else if (page === "warrantsMarket.jsp") {
        extension = "../../../";
        showLoader();
        warrantsPageFunctions("All");
        $("#id_main_wm").addClass("active");
        $("#id_wm_wmarket").addClass("active bg-white blacktext");
    } else if (page === "mybids.jsp") {
        extension = "../../../";
        warrantsPageFunctions();
        $("#id_main_wm").addClass("active");
        $("#id_wm_mybids").addClass("active bg-white blacktext");
    } else if (page === "semple.jsp") {
        extension = "../../../";
        semplePageFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_semple_semple").addClass("active bg-white blacktext");
    } else if (page === "uppep.jsp") {
        extension = "../../../";
        semplePageFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_semple_uppep").addClass("active bg-white blacktext");
    } else if (page === "monetisation.jsp") {
        extension = "../../../";
        semplePageFunctions();
        monetisationPageFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_main_money").addClass("active");
    } else if (page === "commoditisation.jsp") {
        extension = "../../../";
        semplePageFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_main_money").addClass("active");
        $("#id_main_commod").addClass("active bg-white blacktext");
    } else if (page === "monetisation_rules.jsp") {
        extension = "../../../";
        semplePageFunctions();
        monetisationPageFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_main_money").addClass("active");
    } else if (page === "monetisation_verify.jsp") {
        extension = "../../../";
        semplePageFunctions();
        monetisationPageFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_main_money").addClass("active");
    } else if (page === "mansar.jsp") {
        extension = "../../../";
        semplePageFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_semple_mansar").addClass("active bg-white blacktext");
    } else if (page === "mobilisation.jsp") {
        extension = "../../../";
        semplePageFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_main_money").addClass("active");
        $("#id_main_mobi").addClass("active bg-white blacktext");
    } else if (page === "members.jsp") {
        extension = "../../../";
        $(".memberUtype").text("Member");
        userPageFunctions("Member");
        $("#id_main_users").addClass("active");
        $("#id_users_members").addClass("active bg-white blacktext");
    } else if (page === "admins.jsp") {
        extension = "../../../";
        $(".memberUtype").text("Admin");
        userPageFunctions("Admin");
        $("#id_main_users").addClass("active");
        $("#id_users_admins").addClass("active bg-white blacktext");
    } else if (page === "agencies.jsp") {
        extension = "../../../";
        $(".memberUtype").text("Agency");
        agencyPageFunctions("Agency");
        $("#id_main_users").addClass("active");
        $("#id_users_agencies").addClass("active bg-white blacktext");
    } else if (page === "businesses.jsp") {
        extension = "../../../";
        $(".memberUtype").text("Business");
        userPageFunctions("Business");
        $("#id_main_users").addClass("active");
        $("#id_users_businesses").addClass("active bg-white blacktext");
    } else if (page === "messages.jsp") {
        extension = "../../../";
        messagesPageFunctions("inbox");
        $("#id_main_message").addClass("active");
        $("#id_inbox_message").addClass("active bg-white blacktext");
    } else if (page === "sent.jsp") {
        extension = "../../../";
        messagesPageFunctions("sent");
        $("#id_main_message").addClass("active");
        $("#id_sent_message").addClass("active bg-white blacktext");
    } else if (page === "trash.jsp") {
        extension = "../../../";
        messagesPageFunctions("trash");
        $("#id_main_message").addClass("active");
        $("#id_trash_message").addClass("active bg-white blacktext");
    } else if (page === "allmessages.jsp") {
        extension = "../../../";
        messagesPageFunctions("inbox");
        $("#id_main_message").addClass("active");
        $("#id_inbox_message").addClass("active bg-white blacktext");
    } else if (page === "allsent.jsp") {
        extension = "../../../";
        messagesPageFunctions("sent");
        $("#id_main_message").addClass("active");
        $("#id_sent_message").addClass("active bg-white blacktext");
    } else if (page === "alltrash.jsp") {
        extension = "../../../";
        messagesPageFunctions("trash");
        $("#id_main_message").addClass("active");
        $("#id_trash_message").addClass("active bg-white blacktext");
    } else if (page === "compose.jsp") {
        extension = "../../../";
        messagesPageFunctions();
        $("#id_main_message").addClass("active");
        $("#id_compose_message").addClass("active bg-white blacktext");
        var serviceProvEmail = $("#servProvEmail").val();
        var subj = $("#tempText").val();
        if (subj === "" || subj === null) {
            //GetData("Messages", "GetSearchUserDetails", "LoadSearchResultUserDetails", serviceProvEmail);
            $("#msgsubject").val("");
            $("#msgbody").val("");
            $("#msgbody").val("");
        } else {
            GetData("Messages", "GetSearchUserDetails", "LoadSearchResultUserDetails", serviceProvEmail);
            $("#msgsubject").val(subj);
            $("#msgbody").html("");
            $("#msgbody").html("You need to specify Blah, Blah, Blah");
            $("#servProvEmail").val("");
            $("#tempText").val("");
        }
    } else if (page === "permissions.jsp") {
        extension = "../../../";
        permissionsPageFunctions();
        $("#id_main_perms").addClass("active");
        $("#id_perms_allperms").addClass("active bg-white blacktext");
    } else if (page === "permissiongroups.jsp") {
        extension = "../../../";
        permissionsPageFunctions();
        $("#id_main_perms").addClass("active");
        $("#id_perms_permgroups").addClass("active bg-white blacktext");
    } else if (page === "usergroups.jsp") {
        extension = "../../../";
        permissionsPageFunctions();
        $("#id_main_perms").addClass("active");
        $("#id_perms_usergroups").addClass("active bg-white blacktext");
    } else if (page === "managepermissions.jsp") {
        extension = "../../../";
        $("#id_main_perms").addClass("active");
        $("#id_perms_manageperms").addClass("active bg-white blacktext");
        loadedUserID = $("#loadedUserID").val();
        loadedUserType = $("#loadedUserType").val();
        loadedUserName = $("#loadedUserName").val();
        managePermissionsPageFunctions();
    } else if (page === "proposedpermissions.jsp") {
        extension = "../../../";
        $("#id_main_perms").addClass("active");
        $("#id_perms_proposedperms").addClass("active bg-white blacktext");
        permissionsPageFunctions();
    } else if (page === "books.jsp") {
        extension = "../../../";
        writePageFunctions();
        $("#id_main_writes").addClass("active");
        $("#id_writes_books").addClass("active bg-white blacktext");
    } else if (page === "articles.jsp") {
        extension = "../../../";
        writeArticlePageFunctions();
        $("#id_main_writes").addClass("active");
        $("#id_writes_bookmarks").addClass("active bg-white blacktext");
    } else if (page === "bookmarks.jsp") {
        extension = "../../../";
        writeBookmarksPageFunctions();
        $("#id_main_writes").addClass("active");
        $("#id_writes_tags").addClass("active bg-white blacktext");
    } else if (page === "tags.jsp") {
        extension = "../../../";
        writeTagsPageFunctions();
        $("#id_main_writes").addClass("active");
        $("#id_perms_usergroups").addClass("active bg-white blacktext");
    } else if (page === "keywords.jsp") {
        extension = "../../../";
        writeKeywordsPageFunctions();
        $("#id_main_writes").addClass("active");
        $("#id_writes_keywords").addClass("active bg-white blacktext");
    } else if (page === "comments.jsp") {
        extension = "../../../";
        writeCommentsPageFunctions();
        $("#id_main_writes").addClass("active");
        $("#id_writes_comments").addClass("active bg-white blacktext");
    } else if (page === "indexes.jsp") {
        extension = "../../../";
        writeIndexesPageFunctions();
        $("#id_main_writes").addClass("active");
        $("#id_writes_indexes").addClass("active bg-white blacktext");
    } else if (page === "sections.jsp") {
        extension = "../../../";
        writeSectionPageFunctions();
        $("#id_main_writes").addClass("active");
        $("#id_writes_sections").addClass("active bg-white blacktext");
    } else if (page === "shop.jsp") {
        extension = "../../../";
        showLoader();
        shopPageFunctions();
        $("#id_main_shop").addClass("active");
        $("#id_shop_products").addClass("active bg-white blacktext");
    } else if (page === "services.jsp") {
        extension = "../../../";
        showLoader();
        shopPageFunctions();
        ServicePageFunctions();

        //ShowAllServiceListings();
        $("#id_main_shop").addClass("active");
        $("#id_shop_services").addClass("active bg-white blacktext");
    } else if (page === "services_categories.jsp") {
        extension = "../../../";
        showLoader();
        shopPageFunctions();
        //ServicePageFunctions();
        GetData("Service", "GetCategories", "LoadServiceCategories");
    } else if (page === "orders.jsp") {
        extension = "../../../";
        showLoader();
        shopPageFunctions();
        $("#id_main_shop").addClass("active");
        $("#id_shop_orders").addClass("active bg-white blacktext");
    } else if (page === "categories.jsp") {
        extension = "../../../";
        catPageFunctions();
        $("#id_main_shop").addClass("active");
        $("#id_shop_prod_cats").addClass("active bg-white blacktext");
    } else if (page === "suppliers.jsp") {
        extension = "../../../";
        showLoader();
        shopPageFunctions();
        $("#id_main_shop").addClass("active");
        $("#id_shop_suppliers").addClass("active bg-white blacktext");
    } else if (page === "deals.jsp") {
        extension = "../../../";
        showLoader();
        dealPageFunctions();
        $("#id_main_shop").addClass("active");
        $("#id_shop_deals").addClass("active bg-white blacktext");
    } else if (page === "pickup.jsp") {
        extension = "../../../";
        pickupPageFunctions();
        $("#id_main_shop").addClass("active");
        $("#id_shop_pickup").addClass("active bg-white blacktext");
    } else if (page === "complaints.jsp") {
        extension = "../../../";
        showLoader();
        shopPageFunctions();
        $("#id_main_shop").addClass("active");
        $("#id_shop_complaints").addClass("active bg-white blacktext");
    }else if (page === "monetisation_application.jsp") {
        extension = "../../../";
        monetisationPageFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_main_money").addClass("active");
    } else if (page === "monetisation_new_rule.jsp") {
        extension = "../../../";
        monetisationPageFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_main_money").addClass("active");
    } else if (page === "my_monetisation_applications.jsp") {
        extension = "../../../";
        monetisationPageFunctions();
        $("#id_main_semple").addClass("active");
        $("#id_main_money").addClass("active");
    }

    CheckUser();
    btnEvents();
    General();
    AppFunctions();
    GreetingMessage();
}

function GetExtension() {
    return extension;
}

function CheckUser() {

    var result = false;
    if (userid === "null" || userid === "" || userid === null || userid === "undefined" || userid === undefined) {
        result = false;
    } else if (userid !== "null" || userid !== "" || userid !== null || userid !== "undefined" || userid !== undefined) {
        result = true;
    }
    return result;
}

function getLoadedID() {
    var ID = sessionStorage.getItem("loadedid");
    return ID;
}

function getLoadedType() {
    var type = sessionStorage.getItem("loadedtype");
    return type;
}

function getLoadedName() {
    var type = sessionStorage.getItem("loadedname");
    return type;
}

function GreetingMessage() {
    var thehours = new Date().getHours();
    var themessage;
    var morning = ('Good Morning');
    var afternoon = ('Good Afternoon');
    var evening = ('Good Evening');

    if (thehours >= 0 && thehours < 12) {
        themessage = morning;

    } else if (thehours >= 12 && thehours < 17) {
        themessage = afternoon;

    } else if (thehours >= 17 && thehours < 24) {
        themessage = evening;
    }
    $('.greeting').append(themessage);

}

function AppFunctions() {
    GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);
    GetData("Messages", "GetUserUnreadMessages", "LoadUnreadMessages", userid);
}

function showLoader() {
    $.blockUI({
        message: '<div class="blockui-message text-white rounded px-3 py-2"><i class="icon-spinner4 spinner mt-1"></i><span class="font-weight-semibold d-block mt-2">Loading</span></div>',
        overlayCSS: {
            backgroundColor: '#1b2024',
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            border: 0,
            color: '#fff',
            padding: 0,
            backgroundColor: 'transparent'
        }
    });
}

function hideLoader() {
    $.unblockUI({
        onUnblock: function () {
        }
    });
}

function btnEvents() {
    $(".linkprofile").click(function () {
        window.location = extension + "ControllerServlet?action=Link&type=Profile&actualUserID=" + actualuserid + "&actualUserType=" + actualusertype;
    });

    $(".callHeaderLogin").click(function () {
        window.location = extension + "ControllerServlet?action=Link&type=Login";
    });

    $("#CallRegister").click(function () {
        window.location = extension + "ControllerServlet?action=Link&type=Register";
    });

    $("#resetPassword").click(function () {
        window.location = extension + "LinksServlet?type=Reset";
    });

    $("#CallLogin").click(function () {
        window.location = extension + "LinksServlet?type=Login";
    });

    $("#Terms").click(function () {
        window.location = extension + "LinksServlet?type=Terms";
    });

    $("#Validate").click(function () {
        var code = $("#validationcode").val();
        GetData("User", "ValidateAccount", "LoadValidateAccount", code);
    });

    $(".createMemb").click(function () {
        $("#membadm").val("Member");
    });

    $(".createAdm").click(function () {
        $("#membadm").val("Admin");
    });

    $(".CallLogout").click(function () {
        swal({
            title: "Are you sure you want to log out?",
            text: "Press No if you want to continue work. Press Yes to logout current user.",
            type: 'info',
            showCancelButton: true,
            confirmButtonText: '<i class="icon-switch2 mr-2"></i> Yes ',
            cancelButtonText: '<i class="icon-reading mr-2"></i> No',
            confirmButtonClass: 'btn btn-info',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function (dismiss) {
            if (dismiss.value) {
                window.location = extension + "ControllerServlet?action=Link&type=LogOut";
            } else {
                swal({
                    title: 'Safe',
                    text: "Your work is safe!",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });
    });

    $("#newstates").change(function () {
        var stateid = $(this).val();
        GetData("User", "GetLGAs", "LoadLGAs", stateid);
        GetData("User", "GetTowns", "LoadTowns", stateid);
    });

    $("#pickupstates").change(function () {
        var stateid = $(this).val();
        GetData("User", "GetLGAs", "LoadLGAs", stateid);
        GetData("User", "GetTowns", "LoadTowns", stateid);
    });

    $("form[name=loginForm]").submit(function (e) {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var email_phone = $(".email").val();
            var password = $("#pass").val();
            var data = [email_phone, password];
            showLoader();
            GetData("User", "Login", "LoadUserLogin", data);
        } else {
            swal({
                title: "Login Error",
                text: "Please check login details",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!',
                buttonsStyling: false
            });
        }
        e.preventDefault();
    });

    $(".check-input").prop("disabled", true);
    $(".check").prop("checked", false);
    $(".check").click(function () {
        var group = $(this).closest(".check-parent").find(".check-group").text();
        if (this.checked) {
            $(this).closest(".check-parent").find(".check-input").prop("disabled", false);
            $('.' + group).not($(this).closest(".check-parent")).each(function (ind, item) {
                $(item).closest(".check-parent").find(".check-input").prop("disabled", true);
                $(item).closest(".check-parent").find(".check").prop("checked", false);
            });
        } else {
            $(this).closest(".check-parent").find(".check-input").prop("disabled", true);
            $('.' + group).not($(this).closest(".check-parent")).each(function (ind, item) {
                $(item).closest(".check-parent").find(".check-input").prop("disabled", false);
                $(item).closest(".check-parent").find(".check").prop("checked", true);
            });
        }
    });
    $("#listBtn").click(function () {
        var offer_warrants = $("#parinput1").val();
        var offer_reflation = $("#parinput2").val();
        var offer_pcr = $("#parinput3").val();
        var request_warrants = $("#parinput5").val();
        var request_reflation = $("#parinput6").val();
        var request_pcr = $("#parinput7").val();
        var offers = "";
        var requests = "";
        if (offer_warrants !== "")
            offers = offers + "1-" + offer_warrants + ";";
        if (offer_reflation !== "")
            offers = offers + "2-" + offer_reflation + ";";
        if (offer_pcr !== "")
            offers = offers + "3-" + offer_pcr + ";";
        if (request_warrants !== "")
            requests = requests + "1-" + request_warrants + ";";
        if (request_reflation !== "")
            requests = requests + "1-" + request_reflation + ";";
        if (request_pcr !== "")
            requests = requests + "1-" + request_pcr + ";";
        var data = [offers, requests];
        GetData("Warrants", "ListValueForSale", "ListValue", data);
    });

    $("form[name=RegistrationForm]").submit(function (e) {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var firstname = $("#Fname").val();
            var lastname = $("#Lname").val();
            var dob = $(".ValdateFound").val();
            var phonenumber = $("#Phon").val();
            var password = $("#pass").val();
            var emailaddress = $("#Email").val();
            var gender = $("#Gend").val();
            var membadm = $("#membadm").val();
            var data = [firstname, lastname, emailaddress, phonenumber, password, gender, dob];
            showLoader()
            if (membadm === "Admin") {
                GetData("User", "AdminRegistration", "LoadUserRegistration", data);
            } else if (membadm === "Member") {
                GetData("User", "MemberRegistration", "LoadUserRegistration", data);
            }
            $(".register-member-modal").modal("hide");
        } else {
            swal({
                title: "Oop!!!",
                text: "Please check all inputs",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!',
                buttonsStyling: false
            });
        }
        e.preventDefault();
    });

    $(".SendMessage").click(function () {
        var contactid = $("#msguserID").text();
        var subject = $("#msgsubject").val();
        var body = $($(".summernote").summernote("code")).text().trim();
        if (contactid === 0 || contactid === "0" || contactid === "" || contactid === "null" || contactid === undefined) {
            swal({
                title: "Message",
                text: "Please select or search contact",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!',
                onClose: function () {
                }
            });
        } else {
            var data = [userid, contactid, subject, body];
            GetData("Messages", "NewMessage", "LoadNewMessage", data);
        }


    });

    $("form[name=mycacontractform]").submit(function (e) {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var benid = $(".list-id").text();
            var ContractPercentage = $(".mycaContractPerc").val();
            var TotalInventory = $(".mycaTotalInventory").val();
            var MinInventoryPerc = $(".mycaMinInventoryPerc").val();
            var WMMinInventory = $(".mycaWmMinInventory").val();
            var ContractCharges = $(".mycaContractCharges").val();
//            var ContractDuration = $("#contractDuration").val();
            var data = [userid, benid, ContractPercentage, TotalInventory, MinInventoryPerc, WMMinInventory, ContractCharges];
            $(".semple-contract-modal").modal("hide");
            GetData("Schemes", "SendSempleContract", "LoadRegisterAndSendSempleContract", data);
        } else {
            swal({
                title: "Oop!!!",
                text: "Please check all inputs",
                type: "error",
                closeOnConfirm: false,
                closeOnCancel: false,
                showCancelButton: false,
                confirmButtonClass: 'btn-danger waves-effect waves-light w-md',
                confirmButtonText: 'Ok!'
            });
        }
        e.preventDefault();
    });

    $("#GenerateAccount2").click(function () {
        var datepicker = $("#daterangepicker2").val();
        showLoader();
        GetData("Accounts", "GetAllUserTransactions", "LoadAllUserTransactions", datepicker);
        $(".bd-example-tdmodal3").modal("hide");
    });

    $("#GenerateAccount").click(function () {
        var userID = $("#beneficiaryID").val();
        var datepicker = $("#daterangepicker").val();
        var accountDefName = $("#accountDefName").val();
        var data = [userID, accountDefName, datepicker];
        showLoader();
        GetData("Accounts", "GenerateUserTransactionStatement", "LoadGenerateUserTransactionStatement", data);
    });

    $("#ViewAcctStmt").click(function () {
        var acctstmtuserid = sessionStorage.getItem("acctstmtuserid");
        var file_url = extension + "global_assets/app/img/PDFAccountStatements/account-statement-user-" + acctstmtuserid + ".pdf";
        if (imageExists(file_url) === false) {
            swal({
                title: "Account Statement",
                text: "Please Generate Account Statement",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!'
            });
        } else {
            window.open(file_url);
        }

    });

    $("#searchUsers").click(function () {
        var data = $("#quicksearchtext").val();
        showLoader();
        GetData("Accounts", "GetSearchUserDetails", "LoadSearchUserDetails", data);
    });

    $("#SearchUsers").click(function () {
        var data = $("#searchText").val();
        if (data.length > 2) {
            GetData("Messages", "GetSearchUserDetails", "LoadSearchResultUserDetails", data);
        } else {
            swal({
                title: "Message",
                text: "Invalid Email Address",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!',
                onClose: function () {
                }
            });
        }
    });

    $("#QTransferBtn").click(function () {
        $(".bd-example-modaltransfer").modal("show");
    });

    $(".AddNewContact").click(function () {
        $(".bd-example-modal-1").modal("show");
    });

    $(".SMSTransactions").click(function () {
        $(".modal_basic_SMSTransactions").modal("show");
    });

    $(".ListNewBusiness").click(function () {
        $(".bd-example-modalListNewBusiness").modal("show");
    });

    $(".GenerateAcctStmt").click(function () {
        $(".bd-example-tdmodal3").modal("show");
    });

    $(".buyWarrants").click(function () {
        $(".modal_basic_buyWarrants").modal("show");
    });

    $("#findacctBiz").click(function () {
        var data = $("#searchaccttext").val();
        if (data === "") {
        } else {
            GetData("Accounts", "GetSearchUserDetails", "LoadUserSearchDetails", data);
        }
    });

    $("form[name=QuickTransferForm]").submit(function (e) {
        var benid = $(".quicktransbenid").text();
        var AccountDefID = $("input[name=accountdefinition]:checked").val();
        var PIN = $("#PIN").val();
        var TransferAmount = $("#TransferAmount").val();
        var Narration = $("#narration").val();
        var data = [userid, benid, AccountDefID, TransferAmount, PIN, Narration];
        if (benid === "") {
            $(".bd-example-modaltransfer").modal("hide");
        } else {
            $(".bd-example-modaltransfer").modal("hide");
            showLoader();
            GetData("Accounts", "QuickTransfer", "LoadQuickTransfer", data);
        }

        e.preventDefault();
    });

    $("#AddBankInfo").click(function () {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var bkname = $("#BankName").val();
            var bkaccttype = $("#AcctType").val();
            var bkacctno = $("#AcctNumber").val();
            var bkbvn = $("#BVNNumber").val();
            var data = [actualuserid, bkname, bkaccttype, bkacctno, bkbvn];
            GetData("User", "AddBankDetails", "LoadBankDetails", data);
        } else {
            swal({
                title: "Bank Information Error",
                text: "Please check details",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!'
            });
        }
    });

    $(".LoadActualUserID").click(function () {
        $(".loggedinuserid").val(actualuserid);
    });

    $(".LoadActualUserBizID").click(function () {
        var actualuserbizid = sessionStorage.getItem("ActualUserBizID");
        $(".loggedinuserid").val(actualuserbizid);
    });

    $("#usersearch").keyup(function () {
        var txt = $(this).val();
        if (txt.length > 2) {
            GetData("User", "FindMember", "LoadUserContactList", txt);
        }
    });

    $("#confirmOrder").click(function () {
        var orderid = $("#OrderID").text();
        var buyerid = $("#orderBuyerUserID").text();
        var data = [userid, orderid, buyerid];
        swal({
            title: 'Confirm Order?',
            text: "Ensure you have contacted the buyer, you won't be able to revert this, do you wish to continue?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function (dismiss) {
            if (dismiss.value) {
                GetData("Order", "ConfirmOrder", "LoadOrderOption", data);
            } else {
                swal({
                    title: 'Safe',
                    text: "Your order is safe!",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });
    });

    $("#cancelOrder").click(function () {
        var orderid = $("#OrderID").text();
        var data = [userid, orderid];
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function (dismiss) {
            if (dismiss.value) {
                GetData("Product", "CancelOrder", "LoadOrderOption", data);
            } else {
                swal({
                    title: 'Safe',
                    text: "Your order is safe!",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });
    });

    $("#deleteOrder").click(function () {
        var orderid = $("#OrderID").text();
        var data = [userid, orderid];
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function (dismiss) {
            if (dismiss.value) {
                GetData("Order", "DeleteOrder", "LoadOrderOption", data);
            } else {
                swal({
                    title: 'Safe',
                    text: "Your order is safe!",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });

    });

    $("#confirmDelivery").click(function () {
        var orderid = $("#OrderID").text();
        swal({
            title: 'Has this order been delivered to the customer?',
            text: "this order will be marked as delivered once you confirm delivery!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Confirm the delivery!',
            cancelButtonText: 'No, Dont!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
            closeOnConfirm: false,
            closeOnCancel: false
        }).then(function (dismiss) {
            if (dismiss.value) {
                GetData("Order", "ConfirmOrderDelivery", "LoadOrderOption", orderid);
            } else {
                swal({
                    title: 'Safe',
                    text: "Your order is safe!",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });
    });

    $("form[name=newPermissionForm]").submit(function (e) {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var objectid = $("#wmobjects").val();
            var permname = $("#permissionName").val();
            var usergpIDs = $.map($('input[name="objectTypePermCheck"]:checked'), function (c) {
                return c.value;
            });
            var ugrpids = usergpIDs.toString();
            var usergroupids = ugrpids.replace(/,/g, ':');
            var data = [objectid, permname, userid, usergroupids];
            showLoader();
            $(".new-permission-modal").modal("hide");
            GetData("Permissions", "CreatePermission", "LoadGeneralAlert", data);
        } else {
            swal({
                title: "Permission Error",
                text: "Please check input",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!',
                buttonsStyling: false
            });
        }
        e.preventDefault();
    });

    $(".EditPerm").click(function () {
        var permid = $(this).closest(".permdets").find(".PermID").text();
        var permname = $(this).closest(".permdets").find(".permissionname").text();
        swal({
            title: 'Edit Permission Name',
            text: permname,
            input: 'text',
            type: 'success',
            inputPlaceholder: 'Type the new permission name',
            showCancelButton: true,
            inputClass: 'form-control',
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
            inputValidator: function (value) {
                return !value && 'You need to write something!';
            }
        }).then(function (result) {
            if (result.value) {
                var data = [permid, result.value];
                showLoader();
                GetData("Permissions", "EditPermissionName", "LoadGeneralAlert", data);
            } else {
                swal({
                    title: 'Cancel',
                    text: "cancelled!",
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                });
            }
        });
    });

    $(".CreatePermGroup").click(function () {
        var Permids = $(this).closest(".selectecPermList").find(".selectedPermids").text();
        var permids = Permids.replace(/,/g, ':');
        var Userids = $(this).closest(".selectecPermList").find(".selectedPermUserIDS").text();
        var userids = Userids.replace(/,/g, ':');
        var selectedUserGroup = $("#newPermGrpuserGroupList").val();
        var newPermGroup = $("#newPermGroup").val();
        var data = [permids, userids, newPermGroup, selectedUserGroup];
        showLoader();
        GetData("Permissions", "CreatePermissionGroup", "LoadGeneralAlert", data);
    });

    $(".CreateUserGroup").click(function () {
        var permid = $(this).closest(".selectecPermList").find(".selectedPermids").text();
        var permname = $(this).closest(".selectecPermList").find(".selectedPerms").text();
        var permids = permid.replace(/,/g, ':');
        swal({
            title: 'Create User Group Name For:',
            text: permname,
            input: 'text',
            type: 'success',
            inputPlaceholder: 'Type the user group name here',
            showCancelButton: true,
            inputClass: 'form-control',
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
            inputValidator: function (value) {
                return !value && 'You need to write something!';
            }
        }).then(function (result) {
            if (result.value) {
                var data = [permids, result.value];
                showLoader();
                GetData("Permissions", "CreateUserGroup", "LoadGeneralAlert", data);
            } else {
                swal({
                    title: 'Cancel',
                    text: "cancelled!",
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                });
            }
        });
    });

    $("#CreateWmObjectType").click(function () {
        swal({
            title: 'Object Name?',
            input: 'text',
            type: 'success',
            inputPlaceholder: 'Type the object name here (text only) ',
            showCancelButton: true,
            inputClass: 'form-control',
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel!',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
            inputValidator: function (value) {
                return !value && 'You need to write something!';
            }
        }).then(function (result) {
            if (result.value) {
                var data = result.value;
                showLoader();
                GetData("Permissions", "CreateWMObjectType", "LoadGeneralAlert", data);
            } else {
                swal({
                    title: 'Cancel',
                    text: "cancelled!",
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                });
            }
        });
    });

    $("input[name=assignpermto]").click(function () {
        var id = $(this).val();
        var objtypeList = $("#objtypeList");//1
        var usergrpList = $("#usergrpList");//3
        var permgrpList = $("#permgrpList");//2
        if (id === "1" || id === 1) {
            objtypeList.removeClass("hide");
            objtypeList.addClass("show");
            objtypeList.show();
            permgrpList.addClass("hide");
            usergrpList.addClass("hide");
        } else if (id === "2" || id === 2) {
            permgrpList.removeClass("hide");
            permgrpList.addClass("show");
            permgrpList.show();
            objtypeList.addClass("hide");
            usergrpList.addClass("hide");
        }
        if (id === "3" || id === 3) {
            usergrpList.removeClass("hide");
            usergrpList.addClass("show");
            usergrpList.show();
            permgrpList.addClass("hide");
            objtypeList.addClass("hide");
        }
    });

    $(".CreateAssignPerms").click(function () {
        var permid = $(".PermID").text();
        var permtype = $("input[name=assignpermto]:checked").val();
        var objectTypeIDs = "";
        if (permtype === "1" || permtype === 1) {
            objectTypeIDs = $.map($("#ObjTypePermParentList").find('input[name="objectTypePermCheck"]:checked'), function (c) {
                return c.value;
            });
        } else if (permtype === "2" || permtype === 2) {
            objectTypeIDs = $.map($("#PermGrpPermParentList").find('input[name="objectTypePermCheck"]:checked'), function (c) {
                return c.value;
            });
        } else if (permtype === "3" || permtype === 3) {
            objectTypeIDs = $.map($("#UserGrpPermParentList").find('input[name="objectTypePermCheck"]:checked'), function (c) {
                return c.value;
            });
        }
        var ptype = $(".permType").text();
        var objTIDs = objectTypeIDs.toString();
        var objTids = objTIDs.replace(/,/g, ':');
        if (objTIDs === "") {
            swal({
                title: ptype,
                text: "Please make a selection",
                type: 'error',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-danger',
                buttonsStyling: false
            });
        } else {
            var data = [objTids, permid, userid];
            swal({
                title: 'Assign Permission(s)',
                text: "The selected permission(s) will be created under the selected " + ptype + ", do you wish to continue?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false
            }).then(function (dismiss) {
                if (dismiss.value) {
                    showLoader();
                    if (permtype === "1" || permtype === 1) {
                        swal({
                            title: 'Manage Permission',
                            text: "Manage Object Type(s) for the Selected Permission",
                            type: 'warning',
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No',
                            confirmButtonClass: 'btn btn-success',
                            cancelButtonClass: 'btn btn-danger',
                            buttonsStyling: false,
                            input: 'select',
                            inputOptions: {
                                '': '',
                                'CD': 'Create for Selected And Delete from the Previous Object-Type'
//                                'CK': 'Create for Selected And also Keep in the Previous Object-Type'
                            },
                            inputClass: 'form-control select-single',
                            showCancelButton: true,
                            inputValidator: function (value) {
                                return !value && 'You need to select something!';
                            },
                            inputAttributes: {
                                'data-placeholder': 'Manage Object Type Permission'
                            },
                            onOpen: function () {
                                // Initialize Select2
                                $('.swal2-select.select-single').select2({
                                    minimumResultsForSearch: Infinity
                                });
                            }
                        }).then(function (result) {
                            if (result.value) {
                                var manageperm = result.value;

                                swal({
                                    title: 'Select User Group',
                                    text: "Manage User Group for the assign Permission",
                                    type: 'warning',
                                    confirmButtonText: 'Yes',
                                    cancelButtonText: 'No',
                                    confirmButtonClass: 'btn btn-success',
                                    cancelButtonClass: 'btn btn-danger',
                                    buttonsStyling: false,
                                    input: 'select',
                                    inputOptions: {
                                        '1': 'Member',
                                        '2': 'Business',
                                        '3': 'Agency',
                                        '4': 'Admin'
                                    },
                                    inputValue: '1',
                                    inputClass: 'form-control select-multiple',
                                    showCancelButton: true,
                                    inputValidator: function (value) {
                                        return !value && 'You need to select something!';
                                    },
                                    inputAttributes: {
                                        'data-placeholder': 'Select User Group(s)',
                                        'multiple': 'multiple'
                                    },
                                    onOpen: function () {

                                        // Initialize Select2
                                        $('.swal2-select.select-multiple').select2();
                                    }
                                }).then(function (result) {
                                    if (result.value) {
                                        // Display selected values
                                        var ugroups = $('.swal2-select.select-multiple').val();
                                        var ugroup = ugroups.toString();
                                        var usergroups = ugroup.replace(/,/g, ':');
                                        data = [objTids, permid, userid, manageperm, usergroups];
                                        GetData("Permissions", "AssignPermsToObjectTypes", "LoadGeneralAlert", data);
                                    } else {
                                        swal({
                                            title: 'Safe',
                                            text: "Your permission is safe!",
                                            type: 'success',
                                            showCancelButton: false,
                                            confirmButtonText: 'Ok!',
                                            confirmButtonClass: 'btn btn-success',
                                            buttonsStyling: false
                                        });
                                    }
                                });
                            }
                        });
                    } else if (permtype === "2" || permtype === 2) {
                        GetData("Permissions", "AssignPermsToPermGroup", "LoadGeneralAlert", data);
                    } else if (permtype === "3" || permtype === 3) {
                        GetData("Permissions", "AssignPermsToUserGroup", "LoadGeneralAlert", data);
                    }
                } else {
                    swal({
                        title: 'Safe',
                        text: "Your permission is safe!",
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Ok!',
                        confirmButtonClass: 'btn btn-success',
                        buttonsStyling: false
                    });
                }
            });
        }
    });

    $(".DeletePerm").click(function () {
        var permid = $(this).closest(".permdets").find(".PermID").text();
        var permname = $(this).closest(".permdets").find(".permissionname").text();
        swal({
            title: 'Delete and Unlink ' + permname + ' Permission',
            type: 'warning',
            showCancelButton: true,
            text: 'You wont be able to revert this. Do you wish to continue?',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function (dismiss) {
            if (dismiss.value) {
                showLoader();
                GetData("Permissions", "DeletePermission", "LoadGeneralAlert", permid);
            } else {
                swal({
                    title: 'Safe',
                    text: "Your permission is safe!",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });
    });

    $("form[name=newAgencyForm]").submit(function (e) {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var agencytypes = $("#agencytypes1").val();
            var beneficiaryID = $(".loadedlistid").text();
            var agencyName = $(".agencyName").val();
            var agencyEmail = $(".agencyEmail").val();
            var agencyPhone = $(".agencyPhone").val();
            var data = [beneficiaryID, agencyName, agencyEmail, agencyPhone, agencytypes, userid];
            showLoader();
            $(".create-agency-modal").modal("hide");
            GetData("User", "AgencyRegistration", "LoadGeneralAlert", data);
        } else {
            swal({
                title: "Input Error",
                text: "Please check input",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!',
                buttonsStyling: false
            });
        }
        e.preventDefault();
    });
    $("form[name=newAgencyForm2]").submit(function (e) {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var agencytypes = $("#agencytypes2").val();
            var beneficiaryID = $(".agencyownerid").find(".list-id").text();
            var agencyName = $("#agencyName").val();
            var agencyEmail = $("#agencyEmail").val();
            var agencyPhone = $("#agencyPhone").val();
            var data = [beneficiaryID, agencyName, agencyEmail, agencyPhone, agencytypes, userid];
            showLoader();
            $(".create-agency-modal").modal("hide");
            GetData("User", "AgencyRegistration", "LoadGeneralAlert", data);
        } else {
            swal({
                title: "Input Error",
                text: "Please check input",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!',
                buttonsStyling: false
            });
        }
        e.preventDefault();
    });

    $("#states").change(function () {
        var stateid = $(this).val();
        if (stateid === "24" || stateid === "27") {
            $("#lcdaform1").show();
        }
        PopulateLGAs(stateid, ""); //populates the lga section
        PopulateLCDAsFromState(stateid, ""); //populates the lcda section
        PopulateTownsFromState(stateid, "");
    });
    $("#lgas").change(function () {
        var lgaid = $(this).val();
        PopulateLCDAsFromLGA(lgaid, ""); //populates the lcda section
        PopulateTownsFromLGA(lgaid, ""); //populates the town section
        PopulateBstopsFromLGA(lgaid, ""); //populates the busstop section
    });
    $("#lcdas").change(function () {
        var lcdaid = $(this).val();
        PopulateTownsFromLCDA(lcdaid, ""); //populates the town section
        PopulateBstopsFromLCDA(lcdaid, ""); //populates the bstop section

        SetLCDAValues1("state"); //sets the vale of the state to that corresponding to users choice
        SetLCDAValues1("lga"); //sets the value of the lga to that of the coresponding user choice
    });
    $("#towns").change(function () {
        var townid = $(this).val();
        PopulateBstopsFromTown(townid, ""); //populates the bus stop section
        PopulateStreetsFromTown(townid, ""); //populates the street section

        SetTownValues1("state"); //sets the value of the state based on the corresponding user choice
        SetTownValues1("lga"); //sets the value of that LGA section based on the user choice
        SetTownValues1("lcda"); //sets the vale of the LCDA section to that corresponding to the user choice
    });
    $("#busstops").change(function () {
        var bstopid = $(this).val();
        PopulateStreetsFromBstop(bstopid, ""); //populates the  street section

        SetBstopValues1("lga"); //sets the value of the LGA section to that corresponding to the user choic
        SetBstopValues1("lcda"); //sets the value of the LCDA section to that corresponding to the user choice
        SetBstopValues1("town"); //sets the value of the Town to that corresponding to the user choice
    });
    $("#streets").change(function () {
        SetStreetValues1("town"); //sets the value of the town section to that corresponding to the users choice
        SetStreetValues1("bstop"); //sets the value of the bus stop section based on the user choice
    });
    $("#pickup-states").change(function () {
        var stateid = $(this).val();
        if (stateid === "24" || stateid === "27") {
            $("#lcdaform").show();
        }
//        GetData("User", "GetLGAs", "LoadLGAs", stateid);
//        GetData("User", "GetTowns", "LoadTowns", stateid);
        PopulateLGAs(stateid, ""); //populates the lga section
        PopulateLCDAsFromState(stateid, ""); //populates the lcda section
        PopulateTownsFromState(stateid, ""); //populates the town section
    });
    $("#pickup-lgas").change(function () {
        var lgaid = $(this).val();
        PopulateLCDAsFromLGA(lgaid, ""); //populates the lcda section
        PopulateTownsFromLGA(lgaid, ""); //populates the town section
        PopulateBstopsFromLGA(lgaid, ""); //populates the busstop section
    });
    $("#pickup-lcdas").change(function () {
        var lcdaid = $(this).val();
        PopulateTownsFromLCDA(lcdaid, ""); //populates the town section
        PopulateBstopsFromLCDA(lcdaid, ""); //populates the bstop section

        SetLCDAValues("state"); //sets the vale of the state to that corresponding to users choice
        SetLCDAValues("lga"); //sets the value of the lga to that of the coresponding user choice
    });
    $("#pickup-towns").change(function () {
        var townid = $(this).val();
        PopulateBstopsFromTown(townid, ""); //populates the bus stop section
        PopulateStreetsFromTown(townid, ""); //populates the street section

        SetTownValues("state"); //sets the value of the state based on the corresponding user choice
        SetTownValues("lga"); //sets the value of that LGA section based on the user choice
        SetTownValues("lcda"); //sets the vale of the LCDA section to that corresponding to the user choice
    });
    $("#pickup-busstop").change(function () {
        var bstopid = $(this).val();
        PopulateStreetsFromBstop(bstopid, ""); //populates the  street section

        SetBstopValues("lga"); //sets the value of the LGA section to that corresponding to the user choic
        SetBstopValues("lcda"); //sets the value of the LCDA section to that corresponding to the user choice
        SetBstopValues("town"); //sets the value of the Town to that corresponding to the user choice
    });
    $("#pickup-street").change(function () {
        SetStreetValues("town"); //sets the value of the town section to that corresponding to the users choice
        SetStreetValues("bstop"); //sets the value of the bus stop section based on the user choice
    });
    $("._newL").click(function () {
        $('._newlcdas').val("");
        $('._hideL').show();
        $('._newLok').click(function () {
            if ($('._newlcdas').val() === "" || $('._newlcdas').val() === "0") {
                $('._hideL').hide();
            } else {
                $('._hideL').hide();
                InsertMissingSection("lcdas");
            }
        });
    });
    $("._newT").click(function () {
        $('._newtowns').val("");
        $('._hideT').show();
        $('._newTok').click(function () {
            if ($('._newtowns').val() === "" || $('._newtowns').val() === "") {
                $('._hideT').hide();
            } else {
                $('._hideT').hide();
                InsertMissingSection("towns");
            }
        });
    });
    $('._newB').click(function () {
        $('._newbusstop').val("");
        $('._hideB').show();
        var cLcda = $("._lcda").val();
        $('._newBok').click(function () {
            if ($('._newbusstop').val() === "" || $('._newbusstop').val() === "") {
                $('._hideB').hide();
            } else {
                $('._hideB').hide();
                InsertMissingSection("busstop");
            }
        });
    });
    $('._newS').click(function () {
        $('._newstreet').val("");
        $('._hideS').show();
        $('._newSok').click(function () {
            if ($('._newstreet').val() === "" || $('._newstreet').val() === "") {
                $('._hideS').hide();
            } else {
                $('._hideS').hide();
                InsertMissingSection("street");
            }
        });
    });

    $(".getallperms").click(function () {
        showLoader();
        $(".allperms").text("All Permissions");
        $(".selectedPs").addClass("hide");
        $(".allperms").removeClass("hide");
        GetData("Permissions", "GetAllPermissions", "LoadPermissions");
    });

    $("#staffsearch").keyup(function () {
        var txt = $(this).val();
        if (txt.length > 2) {
            GetData("User", "FindMember", "LoadUserStaffList", txt);
        }
    });

    $("input[data-type='currency']").on({
        keyup: function () {
            formatCurrency($(this));
        },
        blur: function () {
            formatCurrency($(this), "blur");
        }
    });

    $("form[name=RequestPermission]").submit(function (e) {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var newPermName = $("#newPermName").val();
            var newPermDesc = $("#newPermDesc").val();
            swal({
                title: 'Request New Permission',
                type: 'warning',
                showCancelButton: true,
                text: 'Your request will undergo administrative approval and you will be notified once it has been approved.',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false
            }).then(function (dismiss) {
                if (dismiss.value) {
                    var data = [actualuserid, newPermName, newPermDesc];
                    showLoader();
                    GetData("Permissions", "AddRequestedPermission", "LoadGeneralAlert", data);
                } else {
                    swal({
                        title: 'Safe',
                        text: "Your permission is safe!",
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Ok!',
                        confirmButtonClass: 'btn btn-success',
                        buttonsStyling: false
                    });
                }
            });
        } else {
            swal({
                title: "Permission Request Error",
                text: "Please check all fields",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!'
            });
        }
        e.preventDefault();
    });
    //services
    $("#serviceSendMessage").click(function () {
        //$(".shop_services_details_modal").modal("hide");
        var subj = $(".msgSubj").val();
        var servprovEmail = $(".tempEmail").val();
        window.location = extension + "ControllerServlet?action=Link&type=Compose1&servProvEmail=" + servprovEmail + "&emailSubject=" + subj;

    });

    $("Form[name=NewServCategory]").submit(function (e) {
        var CatName = $("#categoryName").val();
        var CatDesc = $("#categoryDesc").val();
        var data = [CatName, CatDesc];
        GetData("Service", "CreateNewServiceCategory", "LoadNewServiceCategory", data);
        e.preventDefault();
    });

    $("#addnewprop").click(function () {
        var propname = $("#subPropertyName").val();
        $("#subPropertyName").val("");
        var propValues = $("#newpropvalue").val();
        $("#newpropvalue").val("");
        var newprop = propname + ":" + propValues;
        var storepropname = $("#servproplist").val();
        if (storepropname === "") {
            $("#servproplist").val(newprop).text(newprop);
        } else {
            var addPropToList = storepropname + ";" + newprop;
            $("#servproplist").val(addPropToList).html(newprop);
        }
    });

    $("Form[name=NewServSubCategory]").submit(function (e) {
        var SubCatName = $("#subCategoryName").val();
        var SubCatDesc = $("#subCategoryDesc").val();
        var SubCatParentID = $("#categoryID").val();
        var avgPrice = $("#defaultAvgPrice").val();
        var SubCatPropList = $("#servproplist").val();
        var data = [SubCatName, SubCatDesc, SubCatParentID, avgPrice, SubCatPropList];
        GetData("Service", "CreateNewServiceSubCategory", "LoadNewServiceSubCategory", data);
        e.preventDefault();
    });

    $(".service_create_subcategory_modal").on("show.bs.modal", function () {
        GetData("Service", "GetCategories", "LoadCategoriesSelect");
    });
    $(".service_create_type_modal").on("show.bs.modal", function () {
        GetData("Service", "GetCategories", "LoadCatNSubCatSelecet");
    });
    $("#addnewtypeprop").click(function () {
        var propname = $("#typePropertyName").val();
        $("#typePropertyName").val("");
        var propValues = $("#typepropvalue").val();
        $("#typepropvalue").val("");
        var newprop = propname + ":" + propValues;
        var storepropname = $("#servtypeproplist").val();
        if (storepropname === "") {
            $("#servtypeproplist").val(newprop).text(newprop);
        } else {
            var addPropToList = storepropname + ";" + newprop;
            $("#servtypeproplist").val(addPropToList).html(newprop);
        }
    });
    $("Form[name=NewServType]").submit(function (e) {
        var ServiceTypeName = $("#serviceTypeName").val();
        var ServiceTypeDesc = $("#serviceTypeDesc").val();
        var CatID = $("#typeCatID").val();
        var SubCatID = $("#typeSubCatID").val();
        var TypePropList = $("#servtypeproplist").val();
        var data = [ServiceTypeName, ServiceTypeDesc, CatID, SubCatID, TypePropList];
        GetData("Service", "SaveNewServiceType", "LoadNewServiceType", data);
        e.preventDefault();
    });
    $("#bizindustry2").change(function () {
        var data = $(this).val();
        GetData("User", "GetBusinessTypes", "LoadBusinessTypes", data);
    });
    //Monetisation
    $("Form[name=NewMonetisationRule]").submit(function (e) {
        var schemeType = $("#schemeType").val();
        var ruleName = $("#ruleName").val();
        var ruleDesc = $("#ruleDesc").val();
        var minMonVal = $("#minMonVal").val();
        var maxMonVal = $("#maxMonVal").val();
        var percentToMonetise = $("#monRulePercentMonetised").val();
        var ContractTenor = $("#monRuleExpirationInDays").val();
        var appFeeType = $("input[name='monRuleAppFeeType']:checked").val();
        var appFeeAmount = $("#monRuleApplyFeeAmount").val();
        var appFeeDetail = appFeeType+"-"+appFeeAmount;
        var chargeType = $("input[name='monRuleChargesType']:checked").val();
        var chargeAmount = $("#monRuleChargeAmount").val();
        var chargeDetail = chargeType+"-"+chargeAmount;
        var monRuleAccesibleGroups = $("#monRuleAccesibleGroups").val();
        var monRuleDependentMonetisations = $("#monRuleDependentMonetisations").val();
        var visibility = 1;
        var issueDate = $("#monRuleIssueDateSelect").val();
        var ExpirationDate = $("#monRuleExpirationDateSelect").val();
        if(ExpirationDate === "specific_date"){
            ExpirationDate = $("#MonExpDateRange").val();
        }
        if(issueDate === "specific_date"){
            issueDate = $("#MonIssueDateRange").val();
        }
        if(!$('#monRuleVisibile').is(":checked")){
            visibility = 0;
        }
        var data = [schemeType, ruleName, ruleDesc, minMonVal, maxMonVal, percentToMonetise, ContractTenor, appFeeDetail, chargeDetail, issueDate, ExpirationDate,
        monRuleAccesibleGroups, monRuleDependentMonetisations, visibility];
        GetData("Schemes", "CreateNewMonetisationRule", "LoadNewMonetisationRule", data);
        e.preventDefault();
    });
    $(".callMonApplications").click(function () {
        GetData("Schemes", "GetAllMonetisationApplication", "LoadMonetisationApplications");
    });
    $(".prof_mon_app").click(function(){
        window.location = extension + "ControllerServlet?action=Link&type=MonetisationApplication&actualUserID=" + actualuserid;
    });
    $(".prof_user_mon_apps").click(function(){
        window.location = extension + "ControllerServlet?action=Link&type=MonetisationUserApplications&actualUserID=" + actualuserid;
    });
    $(".monPay").click(function () {
        var data = $("#monSubmitData").val();
        data = JSON.parse(data);
        GetData("Schemes", "SubmitMonetisationApplication", "LoadSubmitMonApp", data);
    });
    $(".monRuleDependency").click(function(){
        $(".monRuleDependencyDiv").removeClass("hide");
    });
    $(".CancelMonRuleDependency").click(function(){
        $(".monRuleDependencyDiv").addClass("hide");
    });
    $(".SetMonRuleDependency").click(function(){
        var dpdSave = "";
        $(".MonDependentOpts").each(function() {
            if(this.checked){
                var val = $(this).val();
                dpdSave += val+",";
            }
        });
        $("#monRuleDependentMonetisations").val(dpdSave);
        $(".monRuleDependencyDiv").addClass("hide");
    });
    
    $(".monRuleAccesibility").click(function(){
        $(".monRuleAccessibilityDiv").removeClass("hide");
    });
    $(".CancelMonRuleAccessibility").click(function(){
        $(".monRuleAccessibilityDiv").addClass("hide");
    });
    $(".SetMonRuleAccessibility").click(function(){
        var accSave = "";
        $(".MonAccessGroupsOpts").each(function() {
            if(this.checked){
                var val = $(this).val();
                accSave += val+",";
            }
        });
        $("#monRuleAccesibleGroups").val(accSave);
        $(".monRuleAccessibilityDiv").addClass("hide");
    });
    $("#monRuleExpirationDateSelect").change(function(){
       if($(this).val() === "specific_date"){
           $(".issuedaterange").removeClass("hide");
       }else{
           $(".issuedaterange").addClass("hide");
       }
    });
    $("#monRuleIssueDateSelect").on('change', function(){
       if($(this).val() === "specific_date"){
           $(".expdaterange").removeClass("hide");
       }else{
           $(".expdaterange").addClass("hide");
       }
    });
    //Monetisation
    $("#ChangeEmail").click(function () {
        var newMail = $('#newMail').val();
        var subject = "Change Email";
        var data = [actualuserid, subject, localStorage.ActualEmail, newMail, "Email"];
        GetData("User", "RequestChangeDetails", "LoadRequestChange", data);
    });
    $("#ChangePhoneNumber").click(function () {
        var newPhone = $('#newPhone').val();
        var subject = "Change Phone Number";
        var data = [actualuserid, subject, localStorage.ActualPhone, newPhone, "Phone"];
        GetData("User", "RequestChangeDetails", "LoadRequestChange", data);
    });
}//end of btnEvents

function profilePageFundtions() {
    showLoader();
    GetData("User", "GetBanks", "LoadBanks");
    PopulateStates("");
    PopulateAddressTypes("");
    showLoader();
    GetData("User", "GetMemberDetails", "LoadActualMemberDetails", actualuserid);
    GetData("Permissions", "GetUserPemissions", "LoadUserPermissions", actualuserid);

    if (actualusertype === "Member" || actualusertype === "Admin") {
        $(".ForAll").show();
        $(".ForAll").removeClass("hide");
        $(".ForAdminAndMember").show();
        $(".ForAdminAndMember").removeClass("hide");
    } else if (actualusertype === "Business") {
        $(".bizonly").removeClass("hide");
        $(".bizonly").show();
        $(".ForAll").show();
        $(".ForAll").removeClass("hide");
        $(".ForBiz").show();
        $(".ForBiz").removeClass("hide");
        GetData("Permissions", "GetUserGroupPermissions", "LoadBusinessPermissions", 2);
    } else if (actualusertype === "Agency") {
        $(".ForAll").show();
        $(".ForAll").removeClass("hide");
        $(".ForAgency").show();
        $(".ForAgency").removeClass("hide");
        GetData("Permissions", "GetUserGroupPermissions", "LoadBusinessPermissions", 3);

    }
    var data = [actualuserid, actualusertype, "Contact"];
    showLoader();
    GetData("Favorite", "GetUserFavorites", "LoadUserContacts", data);
    data = [actualuserid, actualusertype, "Staff"];
    showLoader();
    GetData("Favorite", "GetUserFavorites", "LoadUserStaff", data);
    showLoader();
    GetData("Favorite", "GetUserHistory", "LoadUserHistory", actualuserid);
    showLoader();
    GetData("Product", "GetUserProducts", "LoadUserProducts", actualuserid);
    showLoader();
    GetData("Product", "GetUserOrderedProducts", "LoadUserOrderedProducts", actualuserid);
    showLoader();
    data = [actualuserid, actualusertype, "Business"];
    GetData("Favorite", "GetUserFavorites", "LoadBusinesses", data);

    var data = [actualuserid, "My"];
    showLoader();
    GetData("Warrants", "GetLiveListings", "LoadUserListings", data);
    $(".setMyListings").click(function () {
        var data = [actualuserid, "My"];
        showLoader();
        GetData("Warrants", "GetLiveListings", "LoadUserListings", data);
    });
    $(".setMyBids").click(function () {
        var data = [actualuserid, "My"];
        showLoader();
        GetData("Warrants", "GetLiveListings", "LoadUserListings", data);
    });
    GetData("User", "GetBusinessIndustries", "LoadBusinessIndustries");
    $("#bizindustry").change(function () {
        var data = $(this).val();
        showLoader();
        GetData("User", "GetBusinessTypes", "LoadBusinessTypes", data);
    });

    var daterange = "null";
    var data = [actualuserid, 1, daterange];
    GetData("Accounts", "GetUserAccountBalances", "LoadAccountBalances", data);
    GetData("Accounts", "GetUserTransactions", "LoadTransactions", data);

    $(".setWarrants").click(function () {
        var data = [actualuserid, 1, daterange];
        showLoader();
        GetData("Accounts", "GetUserAccountBalances", "LoadAccountBalances", data);
        GetData("Accounts", "GetUserTransactions", "LoadTransactions", data);
    });
    $(".setRefRights").click(function () {
        var data = [actualuserid, 2, daterange];
        showLoader();
        GetData("Accounts", "GetUserAccountBalances", "LoadAccountBalances", data);
        GetData("Accounts", "GetUserTransactions", "LoadTransactionsRef", data);
    });
    $(".setParRights").click(function () {
        var data = [actualuserid, 3, daterange];
        showLoader();
        GetData("Accounts", "GetUserAccountBalances", "LoadAccountBalances", data);
        GetData("Accounts", "GetUserTransactions", "LoadTransactionsPar", data);
    });
//    var data = [actualuserid, "Book"];
//    GetData("Favorite", "GetUserFavorites", "LoadFavoriteBooks", data);
//    var data = [actualuserid, "Products"];
//    GetData("Favorite", "GetUserFavorites", "LoadFavoriteBooks", data);
//    var data = [actualuserid, "Articles"];
//    GetData("Favorite", "GetUserFavorites", "LoadFavoriteBooks", data);
//    var data = [actualuserid, "Services"];
//    GetData("Favorite", "GetUserFavorites", "LoadFavoriteBooks", data);
    GetData("Category", "GetTopCategories", "LoadTopCategories");
    dropifyScript();
    $("#InboxMsg").click(function () {
        showLoader();
        data = [actualuserid, "inbox", actualusertype];
        GetData("Messages", "GetUserMessages", "LoadMessages", data);
    });
    $("#SentMsg").click(function () {
        showLoader();
        data = [actualuserid, "sent", actualusertype];
        GetData("Messages", "GetUserMessages", "LoadMessages", data);
    });
    $("#TrashMsg").click(function () {
        showLoader();
        data = [actualuserid, "trash", actualusertype];
        GetData("Messages", "GetUserMessages", "LoadMessages", data);
    });
    showLoader();
    data = [actualuserid, "inbox", actualusertype];
    GetData("Messages", "GetUserMessages", "LoadMessages", data);


    $("form[name=AddAddressForm]").submit(function (e) {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var addressType = $("#addressType").val();
            var addressOwner = $("#addressOwner").val();
            var states = $("#states").val();
            var lgas = $("#lgas").val();
            var lcdas = $("#lcdas").val();
            var towns = $("#towns").val();
            var busstop = $("#busstops").val();
            var street = $("#streets").val();
            var desc = $("#desc").val();
            var data = [addressType, states, lgas, lcdas, towns, busstop, street, desc, actualuserid, addressOwner];
            GetData("Product", "AddNewUserAddress", "LoadUserAddress", data);

        } else {
            swal({
                title: "Oop!!!",
                text: "Please check all inputs",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!',
                buttonsStyling: false
            });
        }
        e.preventDefault();
    });

    $(".CreateBizStaffAndAssignPerms").click(function () {
        var objectTypeIDs = $.map($('input[name="objectTypePermCheck"]:checked'), function (c) {
            return c.value;
        });
        var contactid = $(this).closest(".permcontainer").find(".unameid").text();
        var contactname = $(this).closest(".permcontainer").find(".uname").text();
        var objTIDs = objectTypeIDs.toString();
        var objTids = objTIDs.replace(/,/g, ':');
        var data = [actualuserid, contactid, actualusertype, "Staff", objTids];
        if (objTIDs === "") {
            swal({
                title: "Select Permission",
                text: "Please make a selection",
                type: 'error',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-danger',
                buttonsStyling: false
            });
        } else {
            $(".bd-example-modal-addstaff").modal("hide");
            swal({
                title: "My Staff",
                text: "Add " + contactname + " to your staff list",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No!',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false
            }).then(function (dismiss) {
                if (dismiss.value) {
                    showLoader();
                    GetData("User", "AddStaff", "LoadContactAction", data);
                } else {
                    swal({
                        title: 'Cancelled',
                        text: "No action taken!",
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Ok!',
                        confirmButtonClass: 'btn btn-success',
                        buttonsStyling: false
                    });
                }
            });
        }
    });

    $(".SetPermission").click(function () {
        var actualUserName = $("#actualUserName").text();
        ManagePermission(actualuserid, actualusertype, actualUserName);
    });

    GetData("Permissions", "GetUserRequestedPemissions", "LoadUserRequestedPemissions", actualuserid);
    GetData("Permissions", "GetUserRequestedChanges", "LoadUserRequestedChanges", actualuserid);




}

function productListingPageFunctions() {
    GetData("Category", "GetTopCategories", "LoadTopCategories");
    GetData("Product", "GetProductMeasurementUnits", "LoadProductUnits");
    GetData("Product", "GetProductHscodes", "LoadProductHscodes");

    $("#single-btn").click(function () {
        listingDefault();
        $("#single-listing").removeClass("hide");
        $("#single-listing").show();

    });
    $("#batch-btn").click(function () {
        listingDefault();
        $("#batch-listing").removeClass("hide");
        $("#batch-listing").show();
    });
    $(".back").click(function () {
        $(".first-content").show();
        $(".second-content").hide();
    });

    $("#warrantyCheck").click(function () {
        if ($(this).prop("checked") == true) {
            $("#prod-warranty-type").removeClass("hide");
            $("#prod-warranty-type").show();
        } else {
            $("#prod-warranty-type").hide();
        }

    });

    $("#prodSearch").click(function () {

    })
    $("#searchProduct").keyup(function () {
        var txt = $(this).text();
        if (txt.length > 2) {
            alert(txt);
        }
    });
    $('#searchProduct').keypress(function (e) {
        if (e.which === 13) {
            var txt = $(this).text();
            if (txt.length > 2) {
                alert(txt);
            }
        }
    });

    function listingDefault() {
        $("#batch-listing").hide();
        $(".first-content").hide();
        $("#single-listing").hide();
        $(".second-content").show();
    }
}

function manageStaffPermissionPage() {
    $(".staffUserName").text(StaffUserName);
    $(".allperms").text(StaffUserName + "'s Staff Assigned Permissions");
    var data = [StaffUserID, actualuserid, actualusertype];
    GetData("Permissions", "GetUserGroupStaffPermissions", "LoadStaffPermissions", data);
    $(".clearSpecialPerms").click(function () {
        var data = [StaffUserID, actualuserid];
        swal({
            title: 'Clear Staff Permission(s)',
            text: "Clear all staff permissions assigned to " + StaffUserName + ", do you wish to continue?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function (dismiss) {
            if (dismiss.value) {
                showLoader();
                GetData("Permissions", "ClearBusinessStaffPermissions", "LoadGeneralAlert", data);
            } else {
                swal({
                    title: 'Safe',
                    text: "Your permissions are safe!",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });
    });
    $("#getUGrpPerms").click(function () {
        $(".selectedPs").removeClass("hide");
        $(".allperms").addClass("hide");
        $("#UGrpPermissionList").removeClass("hide");
        $("#UGrpPermissionList").show();
        $("#StaffPermissionList").addClass("hide");

        $(".selectedWMObjectType").text(actualusertype + " - Business");
        showLoader();
        GetData("Permissions", "GetUserPemissions", "LoadStaffPermissions2", actualuserid);
    });

    $(".getstaffperms").click(function () {
        $(".allperms").text(StaffUserName + "'s Staff Assigned Permissions");
        $(".selectedPs").addClass("hide");
        $(".allperms").removeClass("hide");
        $("#UGrpPermissionList").addClass("hide");
        $("#UGrpPermissionList").show();
        $("#StaffPermissionList").removeClass("hide");
        showLoader();
        var data = [StaffUserID, actualuserid];
        GetData("Permissions", "GetUserGroupStaffPermissions", "LoadPermissions", data);
    });

}

function accountsPageFunctions() {
    GetData("Accounts", "GetUserAccountDefinitions", "LoadAccountDefinitions");
    GetData("Accounts", "GetAllUserAccountBalances", "LoadAllUsersAccountBalances");
    var daterange = "null";
    showLoader();
    GetData("Accounts", "GetAllUserTransactions", "LoadAllUserTransactions", daterange);
    GetData("Accounts", "GetAllAccountsandTransactionsCount", "LoadAllUserAccountsCount");
    $('input[name="daterange"]').daterangepicker(
            {
                locale: {
                    format: 'YYYY-MM-DD',
                    buttonClasses: ['btn', 'btn-sm'],
                    applyLabel: 'Pick',
                    applyClass: 'btn-success',
                    cancelClass: 'btn-primary',
                    separator: ' : '
                }
            });
    $('input[name="daterange2"]').daterangepicker(
            {
                locale: {
                    format: 'YYYY-MM-DD',
                    buttonClasses: ['btn', 'btn-sm'],
                    applyLabel: 'Pick',
                    applyClass: 'btn-success',
                    cancelClass: 'btn-primary',
                    separator: ' : '
                }
            });
    var data = [userid, "Accounts Page", "Visited Accounts Page", "Visited Accounts Page"];
    GetData("Favorite", "LogActivities", "LoadLogActivities", data);



}

function userPageFunctions(data) {
    showLoader();
    GetData("User", "GetAllUsers", "LoadAllUsers", data);
    GetData("User", "GetAllUsersCounts", "LoadAllUsersCount", data);
    $(".WMUname").text("Members");
    $(".findWMUsers").click(function () {
        var data = $(".searchWMusers").val();
        if (data === "") {
        } else {
            GetData("Accounts", "GetSearchUserDetails", "LoadUserSearchDetails", data);
        }
    });
    GetData("User", "GetBusinessIndustries", "LoadBusinessIndustries");
    $("#bizindustry").change(function () {
        var data = $(this).val();
        GetData("User", "GetBusinessTypes", "LoadBusinessTypes", data);
    });

    $("#findWMUsers2").click(function () {
        var data = $("#searchWMusers2").val();
        if (data === "") {
        } else {
            GetData("Messages", "GetSearchUserDetails", "LoadSearchResultUserDetails", data);
        }
    });
    GetData("User", "GetAgencyTypes", "LoadAgencyTypes");
    dropifyScript();
}

function agencyPageFunctions(data) {
    showLoader();
    GetData("User", "GetAllUsers", "LoadAllUsers", data);
    GetData("User", "GetAllUsersCounts", "LoadAllUsersCount", data);
    GetData("User", "GetAgencyTypes", "LoadAgencyTypes");
    $(".CreateAgencyTypes").click(function () {
        swal({
            title: 'Enter the Agency Type',
            text: 'Please type the Agency Type here',
            input: 'text',
            type: 'info',
            animation: 'slide-from-top',
            inputPlaceholder: 'e.g Franco',
            showCancelButton: true,
            confirmButtonText: 'Submit!',
            cancelButtonText: 'Cancel!',
            closeOnConfirm: false,
            closeOnCancel: false,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-warning',
            inputClass: 'form-control',
            inputValidator: function (value) {
                return !value && 'Invalid input!';
            }
        }).then(function (result) {
            if (result.value) {
                var agencytype = result.value;
                showLoader();
                GetData("User", "CreateAgencyType", "LoadGeneralAlert", agencytype);
            }
        });
    });
    $("#findagent").click(function () {
        var data = $("#searchagenttext").val();
        if (data === "") {
        } else {
            showLoader();
            GetData("Accounts", "GetSearchUserDetails", "LoadAgentUserSearchDetails", data);
        }

    });
}

function messagesPageFunctions(option) {
    var usertype = sessionStorage.getItem("usertype");
    var data = [userid, usertype];
    GetData("Messages", "GetUserMessageCounts", "LoadMessageCounts", data);
    data = [userid, usertype, "Contact"];
    GetData("Favorite", "GetUserFavorites", "LoadUserContacts", data);
    var data = [userid, "Messages Page", "Visited Messages Page", "Visited Messages Page"];
    GetData("Favorite", "LogActivities", "LoadLogActivities", data);
//    $("#SearchMsgUsers").click(function () {
//        var data = $("#searchMsgText").val();
//        GetData("Messages", "GetSearchUserDetails", "LoadSearchResultUserDetails", data);
//    });

    if (option === "inbox") {
        showLoader();
        data = [userid, option, usertype];
        GetData("Messages", "GetUserMessages", "LoadMessages", data);
    } else if (option === "sent") {
        showLoader();
        data = [userid, option, usertype];
        GetData("Messages", "GetUserMessages", "LoadMessages", data);
    } else if (option === "trash") {
        showLoader();
        data = [userid, option, usertype];
        GetData("Messages", "GetUserMessages", "LoadMessages", data);
    }
}

function permissionsPageFunctions() {
    showLoader();
    $(".allperms").text("All Permissions");
    GetData("Permissions", "GetAllPermissions", "LoadPermissions");
    GetData("Permissions", "GetAllPermissions", "LoadPermissions2");

    GetData("Permissions", "GetWMObjectTypes", "LoadWMObjectTypes");
    GetData("Permissions", "GetUserGroupList", "LoadUserGroupList");
    GetData("Permissions", "GetPermGroupList", "LoadPermGroupList");
    BlockDetails(cardblock1);
    BlockDetails(cardblock2);
    BlockDetails(cardblock3);
    GetData("Permissions", "GetAllRequestedPemissions", "LoadAllRequestedPemissions", "");
    GetData("User", "GetAllRequestedChanges", "LoadAllRequestedChanges");

}

function managePermissionsPageFunctions() {
    showLoader();
    $(".allperms").text("Permissions for " + loadedUserName);
    GetData("Permissions", "GetUserPemissions", "LoadPermissions", loadedUserID);
    GetData("Permissions", "GetUserPemissionGroups", "LoadPermGroupList2", loadedUserID);

    GetData("Permissions", "GetWMObjectTypes", "LoadWMObjectTypes");
    GetData("Permissions", "GetUserGroupList", "LoadUserGroupList");
    GetData("Permissions", "GetPermGroupList", "LoadPermGroupList");
    BlockDetails(cardblock1);
    BlockDetails(cardblock2);
    BlockDetails(cardblock3);
    $(".lUserID").text(loadedUserID);
    $(".lUserType").text(loadedUserType);
    $(".lUserName").text(loadedUserName);
    $(".getuserperms").click(function () {
        showLoader();
        $(".allperms").text("Permissions for " + loadedUserName);
        $(".selectedPs").addClass("hide");
        $(".allperms").removeClass("hide");
        GetData("Permissions", "GetUserPemissions", "LoadPermissions", loadedUserID);
    });
    var id = "";
    if (loadedUserType === "Member") {
        id = 1;
    } else if (loadedUserType === "Business") {
        id = 2;
    } else if (loadedUserType === "Agency") {
        id = 3;
    } else if (loadedUserType === "Admin") {
        id = 4;
    }
    $("#getUGrpPerms").click(function () {
        $(".selectedPs").removeClass("hide");
        $(".allperms").addClass("hide");
        $(".selectedWMObjectType").text(loadedUserType);
        loadedtype = "UserGroup";
        loadedid = id;
        showLoader();
        GetData("Permissions", "GetUserGroupPermissions", "LoadPermissions", id);
    });

    $(".clearSpecialPerms").click(function () {
        var data = [loadedUserID, loadedUserType];
        swal({
            title: 'Clear Special Permission(s)',
            text: "Clear all special permissions such as Permission Groups, Specific Permissions and Restrictions EXCEPT User Group Permissions from " + loadedUserName + ", do you wish to continue?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function (dismiss) {
            if (dismiss.value) {
                showLoader();
                GetData("Permissions", "ClearUserSpecialPermissions", "LoadGeneralAlert", data);
            } else {
                swal({
                    title: 'Safe',
                    text: "Your permissions are safe!",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });
    });

    $(".SetPermGroup").click(function () {
        var PermGrpIDs = $.map($("#PermGrpPermParentList2").find('input[name="objectTypePermCheck"]:checked'), function (c) {
            return c.value;
        });
        var pgIDs = PermGrpIDs.toString();
        var PermGroupIDs = pgIDs.replace(/,/g, ':');
        var data = [loadedUserID, loadedUserType, PermGroupIDs, "Permission Group"];
        swal({
            title: 'Add New Permissions',
            text: "Add the selected Permission Group(s) to " + loadedUserType,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        }).then(function (dismiss) {
            if (dismiss.value) {
                showLoader();
                GetData("Permissions", "AddUserPermissionGroup", "LoadGeneralAlert", data);
            } else {
                swal({
                    title: 'Safe',
                    text: "Your permissions are safe!",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });

    });
}

function ServicePageFunctions() {
    GetData("Service", "GetAllServiceListings", "LoadShowAllServiceListings");
//    $("#Service_category").click(function (){
//        $(".Service_category_Modal").on("show.bs.modal", function (){
//            
//        }).modal("show");
//    });

}

function BlockDetails(parent) {
    $(parent).block({
        message: '<div class="font-italic text-capitalize text-dark">Please select an item/object</div>',
        overlayCSS: {
            backgroundColor: '#fff',
            opacity: 1,
            cursor: 'wait'
        },
        css: {
            border: 0,
            padding: 0,
            backgroundColor: 'transparent'
        }
    });
}

function UnBlockDetails(parent) {
    $(parent).unblock({
        onUnblock: function () {
        }
    });
}

function writePageFunctions() {
    var data = ["", 0, 0, ""];// GetBooks("", 0, 0, "");
    showLoader();
    sessionStorage.setItem("bookType", "AllBooks");
    GetData("Write", "GetAllBooks", "LoadAllBooks", data);
    BlockDetails(cardblock1);
    $("#allBooks").click(function () {
        showLoader();
        var data = ["", 0, 0, ""];
        sessionStorage.setItem("bookType", "AllBooks");
        BlockDetails(cardblock1);
        GetData("Write", "GetAllBooks", "LoadAllBooks", data);
    });
    $("#publishedBooks").click(function () {
        showLoader();
        var data = ["", 0, 0, "", 1];
        sessionStorage.setItem("bookType", "PubBooks");
        BlockDetails(cardblock1);
        GetData("Write", "GetUnAndPublishedBooks", "LoadAllBooks", data);
    });
    $("#unpublishedBooks").click(function () {
        showLoader();
        var data = ["", 0, 0, "", 0];
        sessionStorage.setItem("bookType", "UnpubBooks");
        BlockDetails(cardblock1);
        GetData("Write", "GetUnAndPublishedBooks", "LoadAllBooks", data);
    });

    $(".pubBooks").click(function () {
        var bookid = $(this).closest(".cardblock").find(".ObjectID").text();
        UnAndPublishBook(bookid, "Publish");
    });
    $(".unpubBooks").click(function () {
        var bookid = $(this).closest(".cardblock").find(".ObjectID").text();
        UnAndPublishBook(bookid, "UnPublish");
    });



}

function writeArticlePageFunctions() {
    var data = ["", 0, 0, ""];
    showLoader();
    sessionStorage.setItem("bookType", "AllArticles");
    GetData("Write", "GetAllArticles", "LoadAllBooks", data);
    BlockDetails(cardblock1);
    $("#allArticles").click(function () {
        showLoader();
        var data = ["", 0, 0, ""];
        sessionStorage.setItem("bookType", "AllArticles");
        BlockDetails(cardblock1);
        GetData("Write", "GetAllArticles", "LoadAllBooks", data);
    });
    $("#publishedArticles").click(function () {
        showLoader();
        var data = ["", 0, 0, "", 1];
        sessionStorage.setItem("bookType", "PubArticles");
        BlockDetails(cardblock1);
        GetData("Write", "GetUnAndPublishedArticles", "LoadAllBooks", data);
    });
    $("#unpublishedArticles").click(function () {
        showLoader();
        var data = ["", 0, 0, "", 0];
        sessionStorage.setItem("bookType", "UnpubArticles");
        BlockDetails(cardblock1);
        GetData("Write", "GetUnAndPublishedArticles", "LoadAllBooks", data);
    });


    $(".pubArticles").click(function () {
        var bookid = $(this).closest(".cardblock").find(".ObjectID").text();
        UnAndPublishBook(bookid, "Publish");
    });
    $(".unpubArticles").click(function () {
        var bookid = $(this).closest(".cardblock").find(".ObjectID").text();
        UnAndPublishBook(bookid, "UnPublish");
    });



}

function writeSectionPageFunctions() {
    var data = ["", 0, 0, ""];
    showLoader();
    sessionStorage.setItem("sectionType", "AllSections");
    GetData("Write", "GetAllSections", "LoadAllSections", data);
    BlockDetails(cardblock1);
    $("#allSections").click(function () {
        showLoader();
        sessionStorage.setItem("sectionType", "AllSections");
        BlockDetails(cardblock1);
        GetData("Write", "GetAllSections", "LoadAllSections", data);
    });
    $("#chkinSections").click(function () {
        showLoader();
        var data = ["", 0, 0, "", 1];
        sessionStorage.setItem("sectionType", "CheckInSections");
        BlockDetails(cardblock1);
        GetData("Write", "GetCheckedInAndOutSections", "LoadAllSections", data);
    });
    $("#chkoutSections").click(function () {
        showLoader();
        var data = ["", 0, 0, "", 0];
        sessionStorage.setItem("sectionType", "CheckOutSections");
        BlockDetails(cardblock1);
        GetData("Write", "GetCheckedInAndOutSections", "LoadAllSections", data);
    });


    $(".chkInSection").click(function () {
        var sectionid = $(this).closest(".cardblock").find(".ObjectID").text();
        CheckInAndOutSection(sectionid, "Check-In");
    });
    $(".chkOutSection").click(function () {
        var sectionid = $(this).closest(".cardblock").find(".ObjectID").text();
        CheckInAndOutSection(sectionid, "Check-Out");
    });



}

function writeKeywordsPageFunctions() {
    var data = ["", 0, 0, ""];
    showLoader();
    GetData("Write", "GetAllKeywords", "LoadAllKeywords", data);
    BlockDetails(cardblock1);
}

function writeTagsPageFunctions() {
    var data = ["", 0, 0, ""];
    showLoader();
    GetData("Write", "GetAllTags", "LoadAllTags", data);
    BlockDetails(cardblock1);
}

function writeCommentsPageFunctions() {
    var data = ["", 0, 0, ""];
    showLoader();
    GetData("Write", "GetAllComments", "LoadAllComments", data);
    BlockDetails(cardblock1);
}

function writeIndexesPageFunctions() {
    var data = ["", 0, 0, ""];
    showLoader();
    BlockDetails(cardblock1);
    GetData("Write", "GetAllIndexes", "LoadAllIndexes", data);

}

function writeBookmarksPageFunctions() {
    var data = ["", 0, 0, ""];
    showLoader();
    BlockDetails(cardblock1);
    GetData("Write", "GetAllBookmarks", "LoadAllBookmarks", data);

}

function shopPageFunctions() {
    GetData("Product", "GetShopProducts", "LoadShopProducts");
    GetData("Product", "GetListedProduct", "LoadProductsListed");
    var data = "All";
    sessionStorage.setItem("ordertype", "All");
    GetData("Order", "GetShopOrders", "LoadShopOrders", data);
    //GetData("Service", "GetShopServices", "LoadShopServices");
    GetData("Product", "GetWMSuppliers", "LoadWMSuppliers");
    dropifyScript();
    GetData("Category", "GetTopCategories", "LoadTopCategories");
    $("#AllOrds").click(function () {
        var data = "All";
        sessionStorage.setItem("ordertype", "All");
        GetData("Order", "GetShopOrders", "LoadShopOrders", data);
    });
    $("#PendingOrds").click(function () {
        var data = "Pending";
        sessionStorage.setItem("ordertype", "Pending");
        GetData("Order", "GetShopOrders", "LoadShopOrders", data);
    });
    $("#ProocessingOrds").click(function () {
        var data = "Processing";
        sessionStorage.setItem("ordertype", "Processing");
        GetData("Order", "GetShopOrders", "LoadShopOrders", data);
    });
    $("#ShippedOrds").click(function () {
        var data = "Shipped";
        sessionStorage.setItem("ordertype", "Shipped");
        GetData("Order", "GetShopOrders", "LoadShopOrders", data);
    });
    $("#CancelledOrds").click(function () {
        var data = "Cancelled";
        sessionStorage.setItem("ordertype", "Cancelled");
        GetData("Order", "GetShopOrders", "LoadShopOrders", data);
    });
    $("#DeliveredOrds").click(function () {
        var data = "Delivered";
        sessionStorage.setItem("ordertype", "Delivered");
        GetData("Order", "GetShopOrders", "LoadShopOrders", data);
    });
    GetData("Product", "GetAllComplaints", "LoadComplaints");

}

function dealPageFunctions() {
    GetData("Product", "GetPromoProducts", "LoadPromoResults");
    $('input[name="DealDateRangePicker"]').daterangepicker(
            {
                locale: {
                    format: 'YYYY-MM-DD',
                    buttonClasses: ['btn', 'btn-sm'],
                    applyLabel: 'Pick',
                    applyClass: 'btn-success',
                    cancelClass: 'btn-primary',
                    separator: ' : '
                }
            });

    $("#GetDeals").click(function () {
        GetData("Product", "GetPromoProducts", "LoadPromoResults");
    });
    $("form[name=CreateNewDeal]").submit(function (e) {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var name = $("#DealName").val();
            var desc = $("#DealDescription").val();
            var date = $("#DealDateRangePicker").val();
            var data = [name, desc, date];
            GetData("Product", "NewDeal", "LoadNewDeals", data);
        } else {
            swal({
                title: "Oop!!!",
                text: "Please check all inputs",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!',
                buttonsStyling: false
            });
        }
        e.preventDefault();
    });
}

function pickupPageFunctions() {
    showLoader();
    GetData("Product", "GetPickUpCentres", "LoadPickUpCenters");
    GetData("Product", "GetAddressTypes", "LoadAddressTypes");
    PopulateStates("");
    $("form[name=AddPickUpForm]").submit(function (e) {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var checker = $("#checker").val();
            var pickupname = $("#pickup-Centername").val();
            var pickupstates = $("#pickup-states").val();
            var pickuplgas = $("#pickup-lgas").val();
            var pickuplcdas = $("#pickup-lcdas").val();
            var pickuptowns = $("#pickup-towns").val();
            var pickupbusstop = $("#pickup-busstop").val();
            var pickupstreet = $("#pickup-street").val();
            var pickupfees = $("#pickup-fees").val();
            var pickuphours = $("#pickup-hours").val();
            var pickupphone = $("#pickup-phone").val();
            if (checker === "add" || checker === "Add") {
                var data = [pickupname, pickupstates, pickuplgas, pickuplcdas, pickuptowns, pickupbusstop, pickupstreet, pickupfees, pickuphours, pickupphone];
                GetData("Product", "AddNewPickUpCenter", "LoadPickUpCenterOption", data);
            } else {
                var data = [pickupname, pickupstates, pickuplgas, pickuplcdas, pickuptowns, pickupbusstop, pickupstreet, pickupfees, pickuphours, pickupphone, checker];
                GetData("Product", "EditNewPickUpCenter", "LoadPickUpCenterOptionAfterEdit", data);
            }

        } else {
            swal({
                title: "Oop!!!",
                text: "Please check all inputs",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!',
                buttonsStyling: false
            });
        }
        e.preventDefault();
    });
    $("form[name=AddAddressType]").submit(function (e) {
        var f = $(this);
        f.parsley().validate();
        if (f.parsley().isValid()) {
            var checker = $("#checker").val();
            var addresstypename = $("#addresstype-name").val();
            if (checker === "add" || checker === "Add") {
                var data = [addresstypename];
                GetData("Product", "AddAddressTypes", "LoadAddAddressType", data);
            }
        } else {
            swal({
                title: "Oop!!!",
                text: "Please check all inputs",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                confirmButtonText: 'Ok!',
                buttonsStyling: false
            });
        }
        e.preventDefault();
    });
}

function dropifyScript() {
    $('.dropify').dropify({
        messages: {
            'default': 'Drag and drop a file here or click',
            'replace': 'Drag and drop or click to replace',
            'remove': 'Remove',
            'error': 'Ooops, something wrong appended.'
        },
        error: {
            'fileSize': 'The file size is too big (1M max).',
            'imageFormat': 'The image format is not allowed (png) only).'
        }
    });
}

function catPageFunctions() {
    showLoader();
    GetData("Category", "GetAllCategories", "LoadGetAllCategories");
    GetData("Category", "GetTopCategories", "LoadTopCategories");
    dropifyScript();

    $("#addCategory").click(function () {
        var catid = 0;
        var topcat = $("#topcatid").val();
        if (topcat) {
            catid = topcat;
        }
        var cat = $("#catid").val();
        if (cat) {
            catid = cat;
        }
        var subname = $("#catname").val();
        var data = [catid, subname];
        GetData("Product", "AddProductCategory", "LoadAddProductCategory", data);
    });

    $("#addProdCatPropName").click(function () {
        var catid = $(".topcat").val();
        var subname = $("#propname").val();
        var data = [catid, subname];
        GetData("Product", "AddProductCategoryProperty", "LoadAddProductCategoryProperty", data);
    });


}

function warrantsPageFunctions(option) {
    var data = [userid, option];
    GetData("Warrants", "GetLiveListings", "LoadListings", data);
    GetData("Warrants", "GetTotalWarrants", "LoadTotalWarrants");
    GetData("Warrants", "GetWMWarrantsAccount", "LoadWMWarrantsAccount");
    GetData("Warrants", "GetAllWarrantsBalance", "LoadAllWarrantsBalance");
    GetData("Warrants", "GetWarrantsInAccountProperties", "LoadWarrantsInAccountProperties");
    $("#DirectAcct").click(function () {
        GetData("Warrants", "GetWarrantsInAccountProperty", "LoadWarrantsInAccountProperty", "Direct");
        $(".warrants-in-accounts-modal").modal("show");
        $("#WAcctType").text("Direct");
    });
    $("#BlockedAcct").click(function () {
        GetData("Warrants", "GetWarrantsInAccountProperty", "LoadWarrantsInAccountProperty", "Blocked");
        $(".warrants-in-accounts-modal").modal("show");
        $("#WAcctType").text("Blocked");
    });
    $("#EscrowAcct").click(function () {
        GetData("Warrants", "GetWarrantsInAccountProperty", "LoadWarrantsInAccountProperty", "Escrow");
        $(".warrants-in-accounts-modal").modal("show");
        $("#WAcctType").text("Escrow");
    });
    $("#OfflineAcct").click(function () {
        GetData("Warrants", "GetWarrantsInAccountProperty", "LoadWarrantsInAccountProperty", "Offline");
        $(".warrants-in-accounts-modal").modal("show");
        $("#WAcctType").text("Offline");
    });
}

function semplePageFunctions() {
    $(".TotalInventory").keyup(function () {
        var ContractPercentage = $(".contractPerc").val(); //the contracted percentage of the total inventory
        $(".mycaContractPerc").val(ContractPercentage);
        var MinInventoryPercentage = $(".minInventoryPerc").val(); //cash value of min inventory
        $(".mycaMinInventoryPerc").val(MinInventoryPercentage);
        var TotalInventory = $(this).val(); //total inventory value in cash
        var WMMinInventory = $(".wmMinInventory"); //reference to control that will display min inventory 
        var ContractCharge = $(".contractCharges");
        var MinInventory = (MinInventoryPercentage / 100) * TotalInventory;
        WMMinInventory.val(MinInventory);
        $(".mycaWmMinInventory").val(MinInventory);
        var Charge = (ContractPercentage / 100) * TotalInventory; //Find the cash value of the contracted % of total inventory
        Charge = 0.05 * Charge;
        ContractCharge.val(Charge);
        $(".mycaContractCharges").val(Charge);
    });
    $("#findmycaBiz").click(function () {
        var data = $("#searchmycatext").val();
        if (data === "") {
        } else {
            showLoader();
            GetData("Accounts", "GetSearchUserDetails", "LoadUserMYCASearchDetails", data);
        }

    });
    var data = "All";
    CallSempleContract(data);

    GetData("User", "GetBusinessIndustries", "LoadBusinessIndustries");

    $("#mycabizindustry").change(function () {
        var data = $(this).val();
        GetData("User", "GetBusinessTypes", "LoadBusinessTypes", data);
    });

    $("#AllSemple").click(function () {
        var data = "All";
        CallSempleContract(data);
    });
    $("#PendingSemple").click(function () {
        var data = "Pending";
        CallSempleContract(data);
    });
    $("#SignedSemple").click(function () {
        var data = "Signed";
        CallSempleContract(data);
    });
    $("#On-GoingSemple").click(function () {
        var data = "On-Going";
        CallSempleContract(data);
    });
    $("#CompletedSemple").click(function () {
        var data = "Completed";
        CallSempleContract(data);
    });
    $("#RejectedSemple").click(function () {
        var data = "Rejected";
        CallSempleContract(data);
    });

}

function monetisationPageFunctions() {
    GetData("Schemes", "GetAllMonetisationRules", "LoadSystemMonetisationRules");
    GetData("Schemes", "GetNewMonetisationOptionParameters", "LoadNewMonetisationOptionParameters");
    GetData("Schemes", "GetAllMonetisationApplication", "LoadMonetisationApplications");
    GetData("Schemes", "GetAllMonApplyPendingVerification", "LoadMonApplyPendingVerification");
    GetData("Schemes", "GetMyMonApplications", "LoadMyMonApplications", actualuserid);
    $('input[name="mondaterange1"]').daterangepicker(
            {
                singleDatePicker: true,
                showDropdowns: true,
                minYear: 1901,
                maxYear: parseInt(moment().format('YYYY'),10)
            });
    $('input[name="mondaterange2"]').daterangepicker(
            {
                singleDatePicker: true,
                showDropdowns: true,
                minYear: 1901,
                maxYear: parseInt(moment().format('YYYY'),10)
            });
}

function CallSempleContract(data) {
    sessionStorage.setItem("sempleStatus", data);
    GetData("Schemes", "GetSempleContracts", "LoadSempleContracts", data);
}

function UnAndPublishBook(bookid, type) {
    var data = [bookid, type];
    swal({
        title: 'Are you sure?',
        text: "Are you sure, you want to " + type + " this book/article?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
    }).then(function (dismiss) {
        if (dismiss.value) {
            showLoader();
            GetData("Write", "UnAndPublishBook", "LoadUnAndPublishBook", data);
        } else {
            swal({
                title: 'Safe',
                text: "Your book is safe!",
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-success',
                buttonsStyling: false
            });
        }
    });

}

function CheckInAndOutSection(sectionid, type) {
    var data = [sectionid, type];
    swal({
        title: 'Are you sure?',
        text: "Are you sure, you want to " + type + " this section?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
    }).then(function (dismiss) {
        if (dismiss.value) {
            showLoader();
            GetData("Write", "SectionCheckInAndOut", "LoadSectionCheckInAndOut", data);
        } else {
            swal({
                title: 'Safe',
                text: "Your section is safe!",
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-success',
                buttonsStyling: false
            });
        }
    });

}

function payWithPaystack(userID, paymentamount, email, actualamount, PaymentType) {
    var userDetail;
    if (username) {
        userDetail = username;
    } else {
        userDetail = email;
    }
    var handler = PaystackPop.setup({
        key: 'pk_test_b3685f824518679567d6356e2636fc184878e833',
        email: email,
        amount: paymentamount + "00",
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        metadata: {
            custom_fields: [
                {
                    display_name: "Customer Name",
                    variable_name: "Customer Name",
                    value: userDetail
                },
                {
                    display_name: "Payment Type",
                    variable_name: "Payment Type",
                    value: PaymentType
                }
            ]
        },
        callback: function (response) {
            var data = [userID, actualamount, response.reference, response.trans, PaymentType];
            GetData("Accounts", "ValidatePaystackTransaction", "LoadPaymentResponse", data);
        },
        onClose: function () {
            swal({
                title: "PayStack CheckOut!",
                text: "CheckOut closed, transaction terminated",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-danger',
                conffirmButtonText: 'Retry',
                onClose: function () {
                    window.location.reload();
                }
            });
        }
    });
    handler.openIframe();
}

function DisplayUserLogin(data) {
    hideLoader();
    if (data === "Account has not been activated") {
        swal({
            title: "Oops!",
            text: "Your account has not been activated and validated",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Activate Account',
            onClose: function () {
                window.location = extension + "ControllerServlet?action=Link&type=Login";
            }
        });
    } else if (data === "Incorrect Login Details") {
        swal({
            title: "Oops!",
            text: "Incorrect Login Details, Please try again!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry',
            onClose: function () {
                window.location = extension + "ControllerServlet?action=Link&type=Login";
            }
        });
    } else if (data === "Email or Phone Number Entered Doesn't Exist") {
        swal({
            title: "Oops!",
            text: "Email or Phone Number Entered Doesn't Exist!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry',
            onClose: function () {
                window.location = extension + "ControllerServlet?action=Link&type=Login";
            }
        });
    } else if (data === "Please contact the WM-Admin") {
        swal({
            title: "Oops!",
            text: "Please contact the WM-Admin!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location = extension + "ControllerServlet?action=Link&type=Login";
            }
        });
    } else if (data === "Blocked") {
        swal({
            title: "Oops!",
            text: "Your account has been Blocked, please contact WM-Admin!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location = extension + "ControllerServlet?action=Link&type=Login";
            }
        });
    } else {
        swal({
            title: "Welcome to The WealthMarket",
            text: "Successful Login",
            type: "success",
            showCancelButton: false,
            confirmButtonText: '<i class="icon-thumbs-up2 mr-2"></i> Continue ',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false,
            onClose: function () {
                verifyUser();
                window.location = extension + "ControllerServlet?action=Link&type=Dashboard";
            }
        });
    }
}

function DisplayValidateAccount(data) {
    if (data[0] === "success") {
        swal({
            title: "Account Activated",
            text: "Your Account has been activated",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!'
        }, function (isConfirm) {
            if (isConfirm) {
                var email = data[1];
                var password = data[2];
                var data = [email, password];
                GetData("User", "Login", "LoadUserLogin", userdetails);
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Sorry, something went wrong! oohh",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry'
        }, function (isConfirm) {
            if (isConfirm) {
                window.location = extension + "LinksServlet?type=ConfirmEmail";
            }
        });
    }
}

function DisplayActualMemberDetails(data) {
    hideLoader();
    if (data !== "none") {
        var utype = data["usertype"];
        if (utype === "Business") {
            $(".bizinfo").removeClass("hide");
            $(".bizinfo").show();

            $(".bizBusinessLink").addClass("hide");
            $(".bizBusinessLink").hide();
            $(".bizstaffLink").removeClass("hide");
            $(".bizstaffLink").show();
        } else if (utype === "Agency") {
            $(".agencyinfo").removeClass("hide");
            $(".agencyinfo").show();
        } else if (utype === "Member" || utype === "Admin") {
            $(".memberinfo").removeClass("hide");
            $(".memberinfo").show();

            $(".bizstaffLink").addClass("hide");
            $(".bizstaffLink").hide();
        }
        var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + data["userID"] + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
        }
        $(".actualUserImage").attr("src", image_url);
        $(".actualUserFirstName").text(data["first_name"]);
        $(".actualUserLastName").text(data["last_name"]);
        $(".actualUserEmailAddress").text(data["email"]);
        localStorage.ActualEmail = data["email"];
        $(".actualUserPhone").text(data["phone_number"]);
        localStorage.ActualPhone = data["phone_number"];
        $("#actualUserPassword").text(data["password"]);
        $(".actualUserStatus").text(data["status"]);
        $(".actualUserofflineID").text(data["offlineID"]);
        localStorage.UserPass = data["password"];
        $(".actualUserType").text(data["usertype"]);
        $(".actualUserGender").text(data["sex"]);
        $(".actualUserDateJoined").text(data["date_joined"]);
        $(".actualUserDOB").text(data["dob"]);
        $(".actualUserName").text(data["user_name"]);
        loginuseremail = data["email"];
        username = data["user_name"];
        $(".actualbizName").text(data["Name"]);
        $(".actualbizIndustry").text(data["BusinessIndustry"]);
        $(".actualbizType").text(data["BusinessType"]);
        $(".actualbizEmail").text(data["email"]);
        $(".actualbizPhone").text(data["phone_number"]);
        $(".actualbizDateFound").text(data["DateFounded"]);
        $(".actualbizCACNumber").text(data["CACNumber"]);
        $(".actualBizDesc").text(data["Description"]);
        $(".actualBizWebAddress").text(data["Website"]);
        $(".BankName").text(data["BankName"]);
        $(".AccountType").text(data["accountType"]);
        $(".AccountBVN").text(data["bvnNumber"]);
        $(".AccountNumber").text(data["accountNumber"]);

        $(".actualAgnName").text(data["user_name"]);
        $(".actualAgnID").text(data["agency_id"]);
        $(".actualAgnType").text(data["AgencyTypeName"]);
        $(".actualAgnEmail").text(data["email"]);
        $(".actualAgnPhone").text(data["phone_number"]);
        $(".actualAgnCreated").text(data["DateFounded"]);
        $(".actualAgnDateFound").text(data["AGDate"]);
        $(".actualAgnowner").text(data["OwnerName"]);
        $(".actualAgnCreated").text(data["CreatorName"]);

        var acctNumber = data["accountNumber"];
        if (acctNumber === undefined || acctNumber === "undefined") {
            $("#addbkinfo").removeClass("hide");
            $("#addbkinfo").show();
            $(".bankInfo").addClass("hide");
            $(".bankInfo").hide();
        } else {
            $("#addbkinfo").addClass("hide");
            $("#addbkinfo").hide();
            $(".bankInfo").removeClass("hide");
            $(".bankInfo").show();
        }
        var parent = $(".user-addresses");
        var addresses = data["addresses"];

        var count = 0;
        if (addresses.length !== 0) {
            var childclone = parent.find(".clone");
            $.each(addresses, function (ind, item) {
                var newchild = childclone.clone();
                newchild.removeClass("clone");
                count++;
                newchild.find(".address-sn").text(count);
                newchild.find(".addressOwner").text(item["addressOwner"]);
                newchild.find(".addressType").text(item["addressType"] + " Address");
                newchild.find(".UserAddress").text(item["addressString"]);
                var btnDelete = newchild.find(".btnDeleteAdd");
                btnDelete.click(function () {
                    data = item["id"];
                    swal({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, delete it!',
                        cancelButtonText: 'No, cancel!',
                        confirmButtonClass: 'btn btn-success',
                        cancelButtonClass: 'btn btn-danger',
                        buttonsStyling: false
                    }).then(function (dismiss) {
                        if (dismiss.value) {
                            GetData("User", "DeleteUserAddress", "LoadAddress", data);
                        } else {
                            swal({
                                title: 'Safe',
                                text: "Your address is safe!",
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonText: 'Ok!',
                                confirmButtonClass: 'btn btn-success',
                                buttonsStyling: false
                            });
                        }
                    });
                });
                newchild.appendTo(parent);
            });
            $(".useraddressCount").text(count);
            childclone.hide();
        } else {
            parent.text("No address(es)").addClass("text-center bold mt-2 mb-2");
        }

    }
}

function DisplayMemberDetails(data) {
    if (data !== "none") {
        var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + data["userID"] + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
        }
        $(".UserImage").attr("src", image_url);
        $(".UserFirstName").text(data["first_name"]);
        $(".UserLastName").text(data["last_name"]);
        $(".UserEmailAddress").text(data["email"]);
        $(".UserPhone").text(data["phone_number"]);
        $("#UserPassword").text(data["password"]);
        $(".UserType").text(data["usertype"]);
        $(".UserGender").text(data["sex"]);
        $(".UserName").text(data["user_name"]);
        sessionStorage.setItem("usertype", data["usertype"]);
    }
}

function DisplayUpdateUserDetails(data) {
    if (data === "success") {
        swal({
            title: "Detail Updated",
            text: "Your personal detail has been updated",
            type: "success",
            input: "text",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!'
        }, function (isConfirm) {
            if (isConfirm) {
                GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "something went wrong",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry'
        }, function (isConfirm) {
            if (isConfirm) {
                GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);
            }
        });
    }
}

function DisplayBanks(data) {
    var cs = $("#BankName");
    cs.empty();
    if (data === "empty") {
    } else {
        cs.append($('<option/>').val(0).text("Select your Bank Name"));
        $.each(data, function (key, value) {
            cs.append($('<option/>').val(key).text(value));
        });
    }
    var bs = $("#ChangeBankName");
    bs.empty();
    if (data === "empty") {
    } else {
        $.each(data, function (key, value) {
            bs.append($('<option/>').val(key).text(value));
        });
    }
}

function DisplayAddress(data) {
    if (data === "successful") {
        swal({
            title: "Address Deleted",
            text: "Your address has been deleted successfully",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok!',
            grow: 'row',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Address Added",
            text: "Your address has been added successfully",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}

function DisplayPasswordReset(data) {
    if (data === "success") {
        swal({
            title: "Email Sent",
            text: "Please check for an email from The WealthMarket and enter the recovery code in the box below.",
            type: "success",
            input: "text",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!'
        }, function (isConfirm) {
            if (isConfirm) {
                $("#resetInstruction").text("Enter the new recovery code");
                $("#formSendEmail").hide();
                $("#formSendEmail").addClass("hide");
                $("#formValidateEmail").show();
                $("#formValidateEmail").removeClass("hide");
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Please email entered doesn't exist or something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry'
        }, function (isConfirm) {
            if (isConfirm) {
                window.location = extension + "LinksServlet?type=Reset";
            }
        });
    }
}

function DisplayRecovery(data) {
    if (data[0] === "success") {
        swal({
            title: "Set New Password",
            text: "Password recovery/reset was successful, please create new password",
            type: "success",
            input: "text",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!'
        }, function (isConfirm) {
            if (isConfirm) {
                $("#resetInstruction").text("Create new password");
                $("#formSendEmail").hide();
                $("#formSendEmail").addClass("hide");
                $("#formValidateEmail").hide();
                $("#formValidateEmail").addClass("hide");
                $("#formNewPassword").show();
                $("#formNewPassword").removeClass("hide");
                $("#UserMemberID").text(data[1]);
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Invalid recovery code or something went wrong",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry'
        }, function (isConfirm) {
            if (isConfirm) {
                $("#resetInstruction").text("Enter the new recovery code");
                $("#formSendEmail").hide();
                $("#formSendEmail").addClass("hide");
                $("#formValidateEmail").show();
                $("#formValidateEmail").removeClass("hide");
            }
        });
    }
}

function DisplayRegistration(data) {
    if (data === "success") {
        swal({
            title: "Account created",
            text: "Your Account has been created successfully, click Ok to validate and activate your account!",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!'
        }, function (isConfirm) {
            if (isConfirm) {
                window.location = extension + "LinksServlet?type=ConfirmEmail";
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Your registration was not successful, Please try again!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry'
        }, function (isConfirm) {
            if (isConfirm) {
                window.location = extension + "LinksServlet?type=Register";
            }
        });
    }
}

function DisplayListAndUnlistProduct(data) {
    if (data[0] === "Listed") {
        if (data[1] === "success") {
            swal({
                title: "Product Listed",
                text: "Your product has been listed on The WealthMarket Shop",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'Ok!'
            }, function (isConfirm) {
                if (isConfirm) {
                    GetData("Product", "GetUserProducts", "LoadUserProducts", userid);
                }
            });
        } else {
            swal({
                title: "Oops!",
                text: "Sorry, something went wrong! oohh",
                type: "info",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-info',
                confirmButtonText: 'Retry'
            }, function (isConfirm) {
                if (isConfirm) {
                    GetData("Product", "GetUserProducts", "LoadUserProducts", userid);
                }
            });
        }
    } else if (data[0] === "UnListed") {
        if (data[1] === "success") {

            swal({
                title: "Product UnListed",
                text: "Your product has been unlisted from The WealthMarket Shop",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'Ok!'
            }, function (isConfirm) {
                if (isConfirm) {
                    GetData("Product", "GetUserProducts", "LoadUserProducts", userid);
                }
            });
        } else {
            swal({
                title: "Oops!",
                text: "Sorry, something went wrong! oohh",
                type: "info",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-info',
                confirmButtonText: 'Retry'
            }, function (isConfirm) {
                if (isConfirm) {
                    GetData("Product", "GetUserProducts", "LoadUserProducts", userid);
                }
            });
        }
    }


}

function DisplayShopProducts(data) {
    hideLoader();
    var parent = $("#shopTable");
    if (data === "none") {
        parent.text("No result");
    } else {
        var childClone = parent.find(".clone");
        var newcount = 0;
        $.each(data, function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            var image_url = extension + "global_assets/app/img/ProductImages/product-" + id + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProductImages/product-0.png";
            }
            newcount++;
            newchild.find(".shop-productImage").attr("src", image_url);
            newchild.find(".shop-productcount").text(newcount);
            newchild.find(".shop-productName").text(details["name"]);
            newchild.find(".shop-category").text(details["category_name"]);
            newchild.find(".shop-rating").text(details["ProductAverageRating"]);
            var sellingPrice = PriceFormat(details["selling_price"]);
            newchild.find(".shop-price").text(sellingPrice);
            newchild.find(".shop-productDesc").text(details["summary"]);
            var Quantity = parseInt(details["quantity"]);
            if (Quantity < 2) {
                newchild.find(".shop-quantity").text(Quantity).addClass("badge badge-danger");
            } else {
                newchild.find(".shop-quantity").text(Quantity).addClass("badge badge-info");
                newchild.find(".restockProduct").hide();
                newchild.find(".restockProduct").addClass("hide");
            }
            if (details["listed"] === "Listed") {
                newchild.find(".shop-status").text(details["listed"]).addClass("badge badge-success");
                newchild.find(".produnlistbtn").removeClass("hide");
                newchild.find(".produnlistbtn").show();
            } else if (details["listed"] === "Not Listed") {
                newchild.find(".shop-status").text(details["listed"]).addClass("badge bg-orange");
                newchild.find(".prodlistbtn").removeClass("hide");
                newchild.find(".prodlistbtn").show();
            }
            newchild.find(".productDetails").click(function () {
                $(".shop_product-details-image").attr("src", image_url);
                DisplayShopProductDetails(details);
            });
            newchild.find(".EditShopProduct").click(function () {
                // Defaults
                // Defaults
                var setCustomDefaults = function () {
                    swal.setDefaults({
                        buttonsStyling: false,
                        confirmButtonClass: 'btn btn-primary',
                        cancelButtonClass: 'btn btn-light'
                    });
                }
                setCustomDefaults();
                swal.setDefaults({
                    input: 'text',
                    confirmButtonText: 'Next <i class="icon-arrow-right14 ml-2"></i>',
                    showCancelButton: false,
                    inputClass: 'form-control',
                    animation: false,
                    buttonsStyling: false,
                    showCloseButton: true,
                    confirmButtonClass: 'btn btn-primary',
                    progressSteps: ['1', '2', '3', '4']
                });
                // Setup steps
                var steps = [
                    {
                        title: 'Product Name ',
                        text: details["name"],
                        input: 'text',
                        inputClass: 'form-control',
                        inputPlaceholder: 'Enter product name'
                    },
                    {
                        title: 'Product Summary ',
                        text: details["summary"],
                        input: 'textarea',
                        inputClass: 'form-control',
                        inputPlaceholder: 'Enter product summary'
                    },
                    {
                        title: 'Product Description',
                        text: details["description"],
                        input: 'textarea',
                        inputClass: 'form-control',
                        inputPlaceholder: 'Enter product description'
                    },
                    {
                        title: 'Product Price',
                        input: 'number',
                        inputClass: 'form-control',
                        text: sellingPrice,
                        inputPlaceholder: 'Enter product price'
                    }
                ];

                // Initialize
                swal.queue(steps).then(function (result) {
                    swal.resetDefaults();
                    setCustomDefaults();
                    var pname = result.value[0];
                    var psummary = result.value[1];
                    var pdesc = result.value[2];
                    var pprice = result.value[3];
                    var prodid = details["id"];
                    var data = [prodid, pname, psummary, pdesc, pprice];
                    showLoader();
                    GetData("Product", "EditShopProduct", "LoadEditShopProduct", data);
                }, function () {
                    swal.resetDefaults();
                    setCustomDefaults();
                })
            });

            newchild.find(".produnlistbtn").click(function () {
                swal({
                    title: 'Unlist Shop Product?',
                    text: 'Unlist ' + details["name"] + ' from WMShop',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    cancelButtonClass: 'btn btn-warning',
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        var prodid = details["id"];
                        var data = [prodid, "UnList"];
                        showLoader();
                        GetData("Product", "ListAndUnlistShopProduct", "LoadListAndUnlistShopProduct", data);
                    } else {
                        swal({
                            title: 'Safe',
                            text: "Your product is safe!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });

            });
            newchild.find(".prodlistbtn").click(function () {
                swal({
                    title: 'List Shop Product?',
                    text: 'Unlist ' + details["name"] + ' from WMShop',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    cancelButtonClass: 'btn btn-warning',
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        var prodid = details["id"];
                        var data = [prodid, "List"];
                        showLoader();
                        GetData("Product", "ListAndUnlistShopProduct", "LoadListAndUnlistShopProduct", data);
                    } else {
                        swal({
                            title: 'Safe',
                            text: "Your product is safe!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
            });
            newchild.find(".restockProduct").click(function () {
                swal({
                    title: 'ReStock Product!',
                    text: 'Please Enter ' + details["name"] + ' New Quantity',
                    input: 'number',
                    type: 'warning',
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-warning',
                    confirmButtonText: 'Submit',
                    cancelButtonText: 'No',
                    showCancelButton: true,
                    inputPlaceholder: 'Enter new quantity',
                    inputClass: 'form-control',
                    animation: 'slide-from-top',
                    showLoaderOnConfirm: true,
                    preConfirm: function (quantity) {
                        return new Promise(function (resolve) {
                            if (isNaN(quantity)) {
                                swal.showValidationError('Invalid Input.');
                            }
                            resolve();
                        });
                    },
                    allowOutsideClick: false
                }).then(function (result) {
                    if (result.value) {
                        var quantity = result.value;
                        var sprice = details["selling_price"];
                        var newwarrantAmt = parseInt(sprice) * parseInt(quantity);
                        swal({
                            title: 'New Warrants!',
                            confirmButtonClass: 'btn btn-success',
                            cancelButtonClass: 'btn btn-warning',
                            confirmButtonText: 'Yes',
                            cancelButtonText: 'No',
                            closeOnConfirm: false,
                            closeOnCancel: false,
                            showCancelButton: true,
                            buttonsStyling: false,
                            type: 'warning',
                            html: 'Create <span class="font-weight-semibold">' + PriceFormat(newwarrantAmt) + " (" + sprice + " * " + quantity + ') </span> of Warrants for Restocked Product?'
                        }).then(function (dismiss) {
                            if (dismiss.value) {
                                var prodid = details["id"];
                                var data = [prodid, quantity, newwarrantAmt, userid];
                                GetData("Product", "ReStockProductQuantity", "LoadRestockShopProduct", data);
                            } else {
                                swal({
                                    title: 'Cancelled',
                                    text: "Cancelled!",
                                    type: 'error',
                                    showCancelButton: false,
                                    confirmButtonText: 'Ok!',
                                    confirmButtonClass: 'btn btn-success',
                                    buttonsStyling: false
                                });
                            }
                        });
                    }
                });
            });
            newchild.appendTo(parent);
        });
        childClone.hide();
        $(".shopListedProductsNum").text(newcount);
    }
}

function DisplayProductsForPromo(data) {
    hideLoader();
    var proparent = $("#AddshopPromoProd");
    if (data === "none") {
        proparent.text("No result");
    } else {
        var childClone = proparent.find(".clone");
        var newcount = 0;
        $.each(data, function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            var image_url = extension + "global_assets/app/img/ProductImages/product-" + id + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProductImages/product-0.png";
            }
            newcount++;
            newchild.find(".shop-promo-Image").attr("src", image_url);
            newchild.find(".shop-promo-count").text(newcount);
            newchild.find(".shop-promo-name").text(details["name"]);
            newchild.find(".shop-promo-desc").text(details["summary"]);
            if (details["listed"] === "Listed") {
                newchild.find(".shop-promo-status").text(details["listed"]).addClass("badge badge-success");
            } else if (details["listed"] === "Not Listed") {
                newchild.find(".shop-promo-status").text(details["listed"]).addClass("badge bg-orange");
            }


            newchild.find(".shop-promo-category").text(details["category_name"]);
            newchild.find(".shop-promo-rating").text(details["ProductAverageRating"]);
            var sellingPrice = PriceFormat(details["selling_price"]);
            newchild.find(".shop-promo-price").text(sellingPrice);
            newchild.find(".shop-promo-quantity").text(details["quantity"]);

            newchild.find(".addpromoprodbtn").click(function () {
                var promoid = $(".promo-id").text().trim();
                swal({
                    title: 'Add To Promo?',
                    text: 'Add ' + details["name"] + ' to Deal?',
                    type: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Yes!',
                    cancelButtonText: 'No!',
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        var ProID = details["id"];
                        var price = details["selling_price"];
                        var data = [promoid, ProID, price];
                        GetData("Product", "AddPromoProduct", "LoadAddPromoProduct", data);
                    } else {
                        swal({
                            title: 'Safe',
                            text: "Your product is safe!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
            });
            newchild.appendTo(proparent);
        });
        childClone.hide();
    }
}

function DisplayListedProduct(data) {
    var parent = $("#listProduct");
    if (data === "none") {
        parent.text("No result");
    } else {
        var childClone = parent.find(".clone");
        var newcount = 0;
        $.each(data, function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            var image_url = extension + "global_assets/app/img/UnlistedProductImages/product-" + id + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/UnlistedProductImages/product-0.png";
            }
            newcount++;
            newchild.find(".ProductImage").attr("src", image_url);
            newchild.find(".user-productcount").text(newcount);
            newchild.find(".prodName").text(details["product_name"]);
            newchild.find(".shop-category").text(details["CategoryName"]);
            newchild.find(".proposedPrice").text(PriceFormat(details["proposed_price"]));
            newchild.find(".productDesc").text(details["description"]);
            var Quantity = parseInt(details["quantity"]);
            if (Quantity > 0) {
                newchild.find(".quantity").text(Quantity).addClass("badge badge-info");
            } else {
                newchild.find(".quantity").text(Quantity).addClass("badge badge-danger");
            }
            var status = details["status"];
            if (status === "Accepted") {
                newchild.find(".status").text(status).addClass("badge badge-success");
            } else if (status === "Pending") {
                newchild.find(".status").text(status).addClass("badge badge-primary");
            } else if (status === "Declined") {
                newchild.find(".status").text(status).addClass("badge badge-danger");
            }
            var btnDeleteProduct = newchild.find(".btnDeleteProduct");
            var btnViewProductDetatails = newchild.find(".btnViewProductDetatails");

            newchild.find(".productStatus").text(status);
            if (status === "Declined" || status === "Pending") {
                btnDeleteProduct.removeClass("hide");
            } else {
                btnViewProductDetatails.removeClass("hide");
            }
            btnViewProductDetatails.click(function () {
                $(".product-details-image").attr("src", image_url);
                DisplayProductDetails(details, image_url);
            });

            newchild.find(".deleteList").click(function () {
                var ProID = details["id"];
                data = [userid, ProID, "Deleted"];
                swal({
                    title: "Delete Product ",
                    text: "Delete listed Product",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: false,
                    cancelButtonClass: 'btn btn-primary',
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        GetData("Product", "UserListedProductAction", "LoadUserListedProductAction", data);
                    } else {
                        swal({
                            title: 'Safe',
                            text: "Your product is safe!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
            });
            newchild.find(".approveList").click(function () {
                var ObjectID = details["id"]; //product id
                var ObjectType = "Products";
                var SupplierUserID = details["SupplierUserID"];
                var price = details["proposed_price"];
                var qty = details["quantity"];
                var Amount = parseInt(price) * parseInt(qty);
                data = [userid, SupplierUserID, ObjectID, ObjectType, Amount];
                swal({
                    title: "Approve And List Product",
                    text: "Approve product and create " + PriceFormat(Amount) + " (Price * Quantity) Market Warrants equivalent",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: false,
                    cancelButtonClass: 'btn btn-primary',
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        showLoader();
                        GetData("Product", "ApproveUserListedProductAndCreateWarrant", "LoadUserListedProductAction", data);
                    } else {
                        swal({
                            title: 'Safe',
                            text: "Your product is safe!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
            });
            newchild.find(".declineList").click(function () {
                var ProID = details["id"];
                data = [userid, ProID, "Declined"];
                swal({
                    title: "Reject Product",
                    text: "Reject listed product",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: false,
                    cancelButtonClass: 'btn btn-primary',
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        GetData("Product", "UserListedProductAction", "LoadUserListedProductAction", data);
                    } else {
                        swal({
                            title: 'Safe',
                            text: "Your product is safe!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
            });
            newchild.appendTo(parent);
        });
        childClone.hide();
        $(".userListedProductsNum").text(newcount);
    }
}

function DisplayShopOrders(data) {
    hideLoader();
    var ordertype = sessionStorage.getItem("ordertype");
    var parent = "";
    if (ordertype === "All") {
        parent = $("#AllOrders");
    } else if (ordertype === "Pending") {
        parent = $("#PendingOrders");
    } else if (ordertype === "Processing") {
        parent = $("#ProcessingOrders");
    } else if (ordertype === "Shipped") {
        parent = $("#ShippedOrders");
    } else if (ordertype === "Cancelled") {
        parent = $("#CancelledOrders");
    } else if (ordertype === "Delivered") {
        parent = $("#DeliveredOrders");
    }
    if (data[0] === "none") {
        parent.text("No result").addClass("bold mt-2 mb-2 ml-2 mr-2 text-center");
    } else {
        var counter = 0;
        var childClone = parent.find(".clone");
        $.each(data[0], function (id, details) {
            counter++;
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.find(".orderSN").text(counter);
            newchild.find(".orderDate").text(details["bookeddate"]);
            newchild.find(".orderNumber").text("#" + details["ordernumber"]).addClass("bold");

            var proParent = newchild.find(".orderProducts");
            var orderProductIds = data[2][id];
            var subchildClone = proParent.find(".orderProductsClone");
            var count = 0;
            $.each(orderProductIds, function (index, prodid) {
                var prod = data[1][prodid];
                count++;
                var subnewchild = subchildClone.clone();
                subnewchild.removeClass("orderProductsClone");
                subnewchild.removeClass("hide");
                subnewchild.find(".orderProductSN").text(count).addClass("mr-2");
                var name = capitaliseFirstLetter(prod["name"]);
                subnewchild.find(".orderProductName").text(name);
                subnewchild.appendTo(proParent);
            });
            subchildClone.hide();

            newchild.find(".BuyerName").text(details["UserName"]);
            newchild.find(".order-id").text(id);
            newchild.find(".orderAmount").text(PriceFormat(details["amount"]));
            newchild.find(".deliveryaddress").text(details["deliveryaddress"]);
            var status = details["status"];
            var sta = newchild.find(".orderStatus");
            if (status === "Pending") {
                $("<span />", {class: "badge badge-info", text: "Pending Confirmation"}).appendTo(sta);
            } else if (status === "Processing") {
                $("<span />", {class: "badge badge-warning", text: details["status"]}).appendTo(sta);
            } else if (status === "Cancelled") {
                $("<span />", {class: "badge badge-danger", text: details["status"]}).appendTo(sta);
            } else if (status === "Shipped") {
                $("<span />", {class: "badge badge-primary", text: details["status"]}).appendTo(sta);
            } else if (status === "Delivered") {
                $("<span />", {class: "badge badge-success", text: details["status"]}).appendTo(sta);
            }
            var prodDetails = newchild.find(".btnViewProductDetatails");
            prodDetails.click(function () {
                GetData("Order", "GetPlacedOrder", "LoadPlacedOrderDetails", id);

            });
            newchild.appendTo(parent);
        });
        childClone.hide();

    }
}

function DisplaySempleContracts(data) {
    hideLoader();
    var status = sessionStorage.getItem("sempleStatus");
    var parent = "";
    if (status === "All") {
        parent = $("#allSemple");
    } else if (status === "Pending") {
        parent = $("#pendingSemple");
    } else if (status === "Signed") {
        parent = $("#signedSemple");
    } else if (status === "On-Going") {
        parent = $("#ongoingSemple");
    } else if (status === "Completed") {
        parent = $("#completedSemple");
    } else if (status === "Rejected") {
        parent = $("#rejectedSemple");
    }
    if (data[0] === "none") {
        parent.text("No result").addClass("bold mt-2 mb-2 ml-2 mr-2 text-center");
    } else {
        var counter = 0;
        var childClone = parent.find(".clone");
        $.each(data, function (id, details) {
            counter++;
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.find(".sSN").text(counter);
            newchild.find(".sInitiatorName").text(details["initiatorName"]);
            newchild.find(".sRecipientName").text(details["recipientName"]);
            newchild.find(".sDate").text(details["issue_date"]);
            var status = details["status"];
            var sta = newchild.find(".sStatus");
            if (status === "Pending") {
                $("<span />", {class: "badge badge-flat border-info text-info-600", text: details["status"]}).appendTo(sta);
            } else if (status === "On-Going") {
                $("<span />", {class: "badge badge-flat border-primary text-primary-600", text: details["status"]}).appendTo(sta);
            } else if (status === "Completed") {
                $("<span />", {class: "badge badge-flat border-success text-success-600", text: details["status"]}).appendTo(sta);
            } else if (status === "Signed") {
                $("<span />", {class: "badge badge-flat border-grey text-grey-600", text: details["status"]}).appendTo(sta);
                $("#GrandODLine").show();
                $(".GrandODLine").removeClass("hide");
            } else if (status === "Rejected") {
                $("<span />", {class: "badge badge-flat border-danger text-danger-600", text: details["status"]}).appendTo(sta);
            }
            var btn = newchild.find(".mycaBtn");
            btn.unbind("click").click(function () {
                $(".ActualContractID").text(id);
                if (details["status"] === "Pending" || details["status"] === "Rejected") {
                    $(".semple-contract-display1-modal").modal("show");
                    $(".PendingContract").html(details["contract_body"]);
                } else {
                    $(".semple-contract-display2-modal").modal("show");
                    var document_url = extension + "global_assets/app/img/PDFDocuments/" + details["document_Url"] + ".pdf";
                    $(".PDFContainer").attr("src", document_url);
                }
            });

            newchild.appendTo(parent);
        });
        childClone.hide();

    }
    $("#GrandODLine").click(function () {
        swal({
            title: "Grant OverDraft Line!",
            text: "Are you sure you want to Grant OD Line",
            type: "success",
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: "Yes",
            closeOnConfirm: false,
            closeOnCancel: false,
            cancelButtonText: "No",
            cancelButtonClass: 'btn btn-primary',
            buttonsStyling: false
        }).then(function (dismiss) {
            if (dismiss.value) {
                var id = $(".ActualContractID").text();
                var data = [id, userid];
                showLoader();
                GetData("Schemes", "GrantSempleContractODLine", "LoadGrantSempleContractODLine", data);
            } else {
                swal({
                    title: 'Safe',
                    text: "Your address is safe!",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });
    });

}

function DisplayProductSuppliers(data) {
    var parent = $("#alternativeSupplierTable");
    if (data === "none") {
        parent.text("No Results");
    } else {
        parent.find(".c-clone").remove();
        var childClone = parent.find(".alt-clone");
        var count = 0;
        $.each(data, function (id, details) {
            count++;
            var newchild = childClone.clone();
            newchild.addClass("c-clone");
            newchild.removeClass("alt-clone");
            newchild.removeClass("hide");
            newchild.find(".altsp-serial").text(count);
            newchild.find(".altsp-name").text(details["name"]);
            var sellingPrice = PriceFormat(details["selling_price"]);
            newchild.find(".altsp-price").text(sellingPrice);
            newchild.find(".altsp-quantity").text(details["quantity"]);
            newchild.find(".altsup-name").text(details["ProductOwnerName"]);
            newchild.find(".altsup-no").text(details["ProductOwnerPhone"]);
            var NewSupplierID = details["productOnwerID"];
            newchild.find(".assignToAltSupplier").click(function () {
                var OrdID = $(this).closest(".altSupplier").find(".OrderID").text();
                var orderHistoryID = $(this).closest(".altSupplier").find(".OrderHistoryID").text();
                swal({
                    title: 'Assign Product?',
                    html: 'Assign this product after confirming <span class="font-weight-bold">' + details["ProductOwnerName"] + '</span> can deliver the product?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes!',
                    cancelButtonText: 'No!',
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-warning',
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        data = [OrdID, NewSupplierID, orderHistoryID];
                        showLoader();
                        GetData("Order", "ProcessOrder", "LoadOrderOption", data);
                    } else {
                        swal({
                            title: 'Cancelled',
                            text: "Cancelled!",
                            type: 'error',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
            });
            newchild.appendTo(parent).show();
        });
        childClone.hide();
    }
}

function DisplaySupplierProducts(data) {
    var parent = $("#sup-productsTable");
    if (data === "none") {
        parent.text("No result");
    } else {
        var childClone = parent.find(".clone");
        var supplier = "";
        $.each(data, function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.find(".product-name").text(details["name"]);
            supplier = details["SupplierName"];
            newchild.find(".product-category").text(details["category_name"]);
            newchild.find(".product-price").text(PriceFormat(details["selling_price"]));
            newchild.find(".product-quantity").text(details["quantity"]);
            newchild.appendTo(parent);
        });
        childClone.hide();
        $(".supplier-name").text(supplier);
    }
}

function DisplaySupplierOrders(data) {
    var parent = $("#sup-ordersTable");
    if (data === "none") {
        parent.text("No result");
    } else {
        var childClone = parent.find(".clone");
        $.each(data[0], function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            var products = newchild.find(".productsName");
            var quantity = newchild.find(".prodQty");
            var sta = newchild.find(".status");
            var status = details["status"];
            var price = newchild.find(".unitPrice");
            var totalAmnt = newchild.find(".totalPrice");
            var orderProductIds = data[2][id];
            $.each(orderProductIds, function (index, prodid) {
                var prod = data[1][prodid];
                var name = capitaliseFirstLetter(prod["name"]);
                $("<div />", {class: "product-name bold normaltext", text: name}).appendTo(products);
                $("<div />", {text: prod["pquantity"]}).appendTo(quantity);
                $("<div />", {text: PriceFormat(prod["price"])}).appendTo(price);
                var totalPrice = parseInt(prod["pquantity"]) * parseInt(prod["price"]);
                $("<div />", {text: PriceFormat(totalPrice)}).appendTo(totalAmnt);
            });
            newchild.find(".buyerName").text(details["UserName"]);
            if (status === "Pending") {
                $("<span />", {class: "btn-primary btn-sm ", text: details["status"]}).appendTo(sta);
            } else if (status === "Processing") {
                $("<span />", {class: "btn-primary btn-sm ", text: details["status"]}).appendTo(sta);
            } else if (status === "Cancelled") {
                $("<span />", {class: "btn-danger btn-sm ", text: details["status"]}).appendTo(sta);
            } else if (status === "Shipped") {
                $("<span />", {class: "btn-info btn-sm ", text: details["status"]}).appendTo(sta);
            } else if (status === "Delivered") {
                $("<span />", {class: "btn-success btn-sm ", text: details["status"]}).appendTo(sta);
            }
            newchild.appendTo(parent);
        });
        childClone.hide();
    }
}

function DisplayWMSuppliers(data) {
    var parent = $("#WMSuppliers");
    var count = 0;
    if (data === "none") {
        parent.text("No Results");
    } else {
        parent.find(".clearclone").remove();
        var childclone = parent.find(".clone");
        $.each(data, function (id, details) {
            count++;
            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + details["UserID"] + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }

            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.addClass("clearclone");
            newchild.find(".UCount").text(count);
            newchild.find(".UID").text(id);
            newchild.find(".SupImage").attr("src", image_url);
            newchild.find(".SupName").text((details["name"]));
            newchild.find(".SupEmail").text((details["email"]));
            newchild.find(".SupPhone").text((details["phone_number"]));
            newchild.find(".UPCount").text(details["ProductCount"]);
            var btn = newchild.find(".SupUBtn1");
            btn.click(function () {
                var id = details["UserID"];
                $(".prodSupname").text(details["name"]);
                showLoader();
                GetData("Product", "GetUserProducts", "LoadUserProducts", id);
                GetData("Product", "GetUserOrderedProducts", "LoadUserOrderedProducts", id);
            });

            newchild.appendTo(parent).show();
        });
        childclone.hide();
    }
}

function DisplayShopServices(data) {
    var parent = $("#serviceTable");
    if (data === "none") {
        parent.text("Connected Successfully but No Result (empty table)");
    } else {
        var childclone = parent.find(".clone");
        $.each(data, function (id, details) {
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.find(".service-name").text((details["name"]));
            newchild.find(".service-category").text((details["category"]));
            newchild.find(".service-description").text((details["description"]));
            newchild.find(".service-status").text((details["status"]));
            newchild.find(".service-price").text((details["price"]));
            newchild.appendTo(parent);
        });
        childclone.hide();
    }
}

function DisplayAllUsers(data) {
    hideLoader();
    var parent = $(".Userlist");
    var count = 0;
    parent.find(".clearclone").remove();
    var childclone = parent.find(".clone");
    if (data !== "none") {
        $.each(data, function (id, details) {
            count++;
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("clearclone");
            newchild.find(".UCount").text(count);
            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + details["UserID"] + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            newchild.find(".UmrgImage").attr("src", image_url);
            newchild.find(".UID").text(details["UserID"]);
            var namebtn = newchild.find(".UName").text(details["name"]);
            newchild.find(".UEmail").text(details["email"]);
            newchild.find(".UPhone").text(details["phone_number"]);
            newchild.find(".UDateJoined").text(details["date_joined"]);
            newchild.find(".UAType").text(details["AgencyTypeName"]);
            newchild.find(".UAID").text(details["agency_id"]);
            newchild.find(".UAGOwner").text(details["OwnerName"]);
            newchild.find(".AGDate").text(details["AGDate"]);
            var UBtnDetails = newchild.find(".UBtnDetails");
            var UBtnPerm = newchild.find(".UBtnPerm");
            var UBtnBlock = newchild.find(".UBtnBlock");
            var UBtnUnBlock = newchild.find(".UBtnUnBlock");
            var UBtnMakeAgent = newchild.find(".UBtnMakeAgent");
            var UBtnAddBiz = newchild.find(".UBtnAddBiz");
            var UBtnActivate = newchild.find(".UBtnActivate");
            if (details["status"] === "Activated") {
                newchild.find(".UStatus").text(details["status"]).addClass("badge-success");
                UBtnActivate.hide();
            } else {
                newchild.find(".UStatus").text(details["status"]).addClass("badge-danger");
                UBtnActivate.show();
            }
            if (details["blocked_status"] === "1") {
                UBtnBlock.addClass("hide");
            } else if (details["blocked_status"] === "0") {
                UBtnUnBlock.addClass("hide");
            }

            newchild.find(".UBalance").text(PriceFormat(details["AcctBalance"]));
            var wmusertype = details["UserType"];

            UBtnAddBiz.click(function () {
                $(".newUserID").val(details["UserID"]);
            });
            UBtnDetails.click(function () {
                window.location = extension + "ControllerServlet?action=Link&type=Profile&actualUserID=" + details["UserID"] + "&actualUserType=" + wmusertype;
            });
            namebtn.click(function () {
                window.location = extension + "ControllerServlet?action=Link&type=Profile&actualUserID=" + details["UserID"] + "&actualUserType=" + wmusertype;
            });
            UBtnActivate.click(function () {
                swal({
                    title: 'Activate ' + details["name"] + '?',
                    text: "Activate, if validation fees has been paid, do you wish to continue!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes!',
                    cancelButtonText: 'No!',
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        showLoader();
                        GetData("User", "ActivateUser", "LoadActivateUser", details["UserID"]);
                    } else {
                        swal({
                            title: 'Cancelled',
                            text: "cancelled!",
                            type: 'error',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });


            });
            if (wmusertype === "Admin") {
                if (details["UserID"] === 1 || details["UserID"] === "1" || details["UserID"] === 2 || details["UserID"] === "2") {
                    UBtnMakeAgent.hide();
                    UBtnUnBlock.hide();
                    UBtnBlock.hide();
                    UBtnPerm.hide();
                } else {
                    UBtnMakeAgent.hide();
                    UBtnUnBlock.hide();
                    UBtnBlock.hide();
                }
            }
            if (wmusertype === "Agency" || wmusertype === "Business") {
                UBtnAddBiz.hide();
            }

            UBtnMakeAgent.click(function () {
                $("#SearchContainer").hide();
                $(".list-id").text(id);
                $(".list-name").text(details["name"]);
            });

            UBtnPerm.click(function () {
                ManagePermission(id, wmusertype, details["name"]);
            });
            UBtnPerm.click(function () {
                ManualAccountActivation(id);
            });

            UBtnBlock.click(function () {
                UBtnBlock.addClass("hide");
                GetData("User", "BlockAndUnblockUser", "LoadBlockAndUnblockUser", id);
                UBtnUnBlock.removeClass("hide");
                UBtnUnBlock.show();
            });
            UBtnUnBlock.click(function () {
                UBtnUnBlock.addClass("hide");
                GetData("User", "BlockAndUnblockUser", "LoadBlockAndUnblockUser", id);
                UBtnBlock.removeClass("hide");
                UBtnBlock.show();
            });
            newchild.appendTo(parent).show();
        });
        childclone.hide();
    } else {
    }
}

function DisplayAllUserList(data) {
    hideLoader();
    var parent = $(".permGrpUserList");
    var count = 0;
    if (data !== "none") {
        parent.find(".clearclone").remove();
        var childclone = parent.find(".clone");
        $.each(data, function (id, details) {
            count++;
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("clearclone");
            newchild.find(".UID").text(id);
            newchild.find(".UName").val(details["name"]);
            var permit = newchild.find(".permPermit2");
            var permPermitcheck = newchild.find(".permPermitcheck2").val(id);
            permit.click(function () {
                var permid = permPermitcheck.val();
                if (permPermitcheck.is(':checked')) {
                    //delete
                    CreatePermUsers(permid);
                } else {
                    //create 
                    CreatePermUsers(permid);
                }

            });
            newchild.appendTo(parent).show();
        });
        childclone.hide();
    }
}

function CreatePermUsers(id) {
    var divids = $(".selectedPermUserIDS");
    var newid = id + ",";
    var oldid = $.trim(divids.text());
    if (oldid.includes(newid)) {
        oldid = oldid.replace(newid, '');
        divids.text(oldid);
    } else {
        oldid = oldid + newid;
        divids.text(oldid);
    }
}

function DisplayAllUsersCount(data) {
    $("#membercount").text(data[0]);
    $("#admincount").text(data[1]);
    $("#businesscount").text(data[2]);
    $("#agentcount").text(data[3]);
}

function DisplayUserDetails(data) {
    $(".ActualUserName").text(data["name"]);
    $(".ActualUserID").text(data["UserID"]);
    $(".ActualUserEmailAddress").text(data["email"]);
    $(".ActualUserLastName").text(data["last_name"]);
    $(".ActualUserFirstName").text(data["first_name"]);
    $(".ActualUserUserType").text(data["UserType"]);
    var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + data["UserID"] + ".png";
    if (imageExists(image_url) === false) {
        image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
    }
    $(".ActualUserImage").attr("src", image_url);
    $(".ActualUserPhone").text(data["phone_number"]);
    $(".ActualUserGender").text(data["sex"]);
    $(".ActualUserDOB").text(data["dob"]);
    $(".ActualbizName").text(data["Name"]);
    $(".ActualbizIndustry").text(data["BusinessIndustry"]);
    $(".ActualbizType").text(data["BusinessType"]);
    $(".ActualbizEmail").text(data["email"]);
    $(".ActualbizPhone").text(data["phone_number"]);
    $(".ActualbizDateFound").text(data["DateFounded"]);
    $(".ActualbizCACNumber").text(data["CACNumber"]);
    $(".ActualBizDesc").text(data["Description"]);
    $(".ActualBizWebAddress").text(data["Website"]);
    $(".ActualBankName").text(data["BankName"]);
    $(".ActualAccountType").text(data["accountType"]);
    $(".ActualAccountBVN").text(data["bvnNumber"]);
    $(".ActualAccountNumber").text(data["accountNumber"]);
    var acctNumber = data["accountNumber"];
    if (acctNumber === undefined || acctNumber === "undefined") {
        $("#bkinfo").addClass("hide");
        $("#bkinfo").hide();
    } else {
        $("#bkinfo").removeClass("hide");
        $("#bkinfo").show();
    }
    if (data["UserType"] === "Business") {
        $(".bizinfo").removeClass("hide");
        $(".bizinfo").show();
        $(".memberinfo").addClass("hide");
        $(".memberinfo").hide();
    } else {
        $(".memberinfo").removeClass("hide");
        $(".memberinfo").show();
        $(".bizinfo").addClass("hide");
        $(".bizinfo").hide();
    }
    if (data["agencyid"] === undefined || data["agencyid"] === "undefined") {
        $("#ActualAgencyID").hide();
        $("#ActualAgencyID").addClass("hide");
    } else {
        $("#ActualAgencyID").show();
        $("#ActualAgencyID").removeClass("hide");
        $(".ActualAgencyID").text(data["agencyid"]);
    }
    if (data["UserType"] === "Admin") {
        $("#ActualUserPassword").text(data["password"]);
    }
    var addresses = data["addresses"];
    var parent = $(".Actualuser-addresses");
    var childclone = parent.find(".clone");
    parent.find(".clearclone1").remove();
    $.each(addresses, function (ind, item) {
        var newchild = childclone.clone();
        newchild.removeClass("clone");
        newchild.removeClass("hide");
        newchild.addClass("clearclone1");
        newchild.find(".ActualAddress-name").text(item["addressname"]);
        newchild.find(".ActualUserAddress").text(item["street"] + ", " + item["town"] + ", " + item["lga"] + ", " + item["state"]);
        newchild.appendTo(parent);
    });
}

function DisplayMakeAgent(data) {
    if (data === "success") {
        swal({
            title: "Agency",
            text: "The Subscriber has been made an Agent of The WealthMarket",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!'
        }, function (isConfirm) {
            if (isConfirm) {
                var txt = "Agency";
                $(".WMUname").text(txt);
                GetData("User", "GetAllUsers", "LoadAllUsers", txt);
                GetData("User", "GetAllUsersCounts", "LoadAllUsersCount", txt);
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Sorry, something went wrong! oohh",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok'
        }, function (isConfirm) {
            if (isConfirm) {
                var txt = "Agency";
                $(".WMUname").text(txt);
                GetData("User", "GetAllUsers", "LoadAllUsers", txt);
                GetData("User", "GetAllUsersCounts", "LoadAllUsersCount", txt);
            }
        });
    }
}

function DisplayBusinessIndustries(data) {
    var cs = $("#mycabizindustry");
    cs.empty();
    if (data === "empty") {
    } else {
        $.each(data, function (key, value) {
            cs.append($('<option/>').val(key).text(value));
        });
    }
    var cs = $("#bizindustry");
    cs.empty();
    if (data === "empty") {
    } else {
        cs.append($('<option/>').val(0).text("Select Business Industry"));
        $.each(data, function (key, value) {
            cs.append($('<option/>').val(key).text(value));
        });
    }
    var cs2 = $("#bizindustry2");
    cs2.empty();
    if (data === "empty") {
    } else {
        cs2.append($('<option/>').val(0).text("Select Business Industry"));
        $.each(data, function (key, value) {
            cs2.append($('<option/>').val(key).text(value));
        });
    }
}

function DisplayBusinessTypes(data) {
    hideLoader();
    var cs = $("#mycabiztype");
    cs.empty();
    if (data === "empty") {
    } else {
        $.each(data, function (key, value) {
            cs.append($('<option/>').val(key).text(value));
        });
    }
    var ulist = $("#biztype");
    ulist.empty();
    if (data === "empty") {
    } else {
        $.each(data, function (key, value) {
            ulist.append($('<option/>').val(key).text(value));
        });
    }

    var ulist2 = $("#biztype2");
    ulist2.empty();
    if (data === "empty") {
    } else {
        $.each(data, function (key, value) {
            ulist2.append($('<option/>').val(key).text(value));
        });
    }
}

function DisplayRegisterAndSendSempleContract(data) {
    if (data === "success") {
        swal({
            title: "Semple Contract",
            text: "SEMPLE Contract sucessfully created. Awaiting Confirmation",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: data,
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}

function DisplayUserRegistration(data) {
    hideLoader();
    if (data === "success") {
        swal({
            title: "Account Creation",
            text: "Successful",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!'
        }, function (isConfirm) {
            if (isConfirm) {
                var data = $("#membadm").val();
                GetData("User", "GetAllUsers", "LoadAllUsers", data);
                GetData("User", "GetAllUsersCounts", "LoadAllUsersCount", data);
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: data,
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok'
        }, function (isConfirm) {
            if (isConfirm) {
                var data = $("#membadm").val();
                GetData("User", "GetAllUsers", "LoadAllUsers", data);
            }
        });
    }
}

function DisplayGrantSempleContractODLine(data) {
    hideLoader();
    if (data === "success") {
        swal({
            title: "ODLine Granted",
            text: "ODLine has been sucessfully.",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: data,
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}

function DisplayUserSearchDetails(data, parent) {
    hideLoader();
    parent.find(".newclone").remove();
    if (data["BeneficiaryName"] === "none") {
        parent.text("No Members match your search");
    } else {
        var childclone = parent.find(".verifyclone");
        var newchild = childclone.clone();
        newchild.removeClass("clone");
        newchild.removeClass("hide");
        newchild.addClass("newclone");
        var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + data["Beneficiaryid"] + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
        }
        newchild.find(".list-Image").attr("src", image_url);
        newchild.find(".list-name").text(data["BeneficiaryName"]);
        newchild.find(".list-phone").text(data["BeneficiaryPhone"]);
        newchild.find(".list-email").text(data["BeneficiaryEmail"]);
        newchild.find(".list-id").text(data["Beneficiaryid"]);
        newchild.appendTo(parent).show();
        childclone.hide();
    }
}

function DisplayMembersList(data, parent) {
    parent.children().not(".clone").remove();
    if (data === "none") {
//        parent.text("No Members match your search");
        var newchild = parent.find(".clone").clone();
        newchild.removeClass("clone");
        newchild.removeClass("hide");
        newchild.find(".noData").removeClass("hide").show();
        newchild.find(".hasdata").addClass("hide");
        newchild.addClass("clearclone1");
        newchild.appendTo(parent).show();
    } else {
        parent.find(".clearclone1").remove();
        $.each(data, function (id, details) {
            var newchild = parent.find(".clone").clone();
            newchild.removeClass("hide");
            newchild.removeClass("clone");
            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + details["userID"] + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            newchild.find(".user-list-Image").attr("src", image_url);
            newchild.find(".user-list-name").text(details["user_name"]);
            newchild.find(".user-list-email").text(details["email"]);
            newchild.find("#user-list-userid").text(details["userID"]);
            newchild.find(".startmycacontract").click(function () {
                $(".searchedbizid").text(details["userID"]);
                $(".user-list-name2").text(details["user_name"]);
                $(".contractform").removeClass("hide");
                $(".searchcontainer").addClass("hide");
            });

            var objtype = sessionStorage.getItem("objtype");
            if (objtype === "Contact") {
                newchild.find(".addcontactbtn").removeClass("hide");
                newchild.find(".addstaffbtn").addClass("hide");
            } else if (objtype === "Staff") {
                newchild.find(".addcontactbtn").addClass("hide");
                newchild.find(".addstaffbtn").removeClass("hide");

            }

            newchild.find(".addcontactbtn").click(function () {
                var contactid = details["userID"];
                var data = [actualuserid, contactid, actualusertype, objtype];
                $("#usersearch").val('');
                swal({
                    title: "My Contact(s)/Staff List",
                    text: "Do you want to add " + details["user_name"] + " to your contact/staff list",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes!',
                    cancelButtonText: 'No!',
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        GetData("User", "addUser", "LoadContactAction", data);
                    } else {
                        swal({
                            title: 'Cancelled',
                            text: "No action taken!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
            });
            newchild.find(".addstaffbtn").click(function () {
                $(".searchcontainer").addClass("hide");
                $(".permcontainer").removeClass("hide");
                $(".uname").text(details["user_name"]);
                $(".unameid").text(details["userID"]).hide();
            });
            newchild.find(".sendmsgbtn").click(function () {
                window.location = extension + "ControllerServlet?action=Link&type=Compose";
            });

            newchild.appendTo(parent);
        });
//        parent.find(".clone-item").remove();
    }
}

function DisplayMessages(data) {
    hideLoader();
    if (data !== "none") {
        var parent = "";
        if (data[2] === "inbox") {
            parent = $(".message-list-inbox");
        } else if (data[2] === "sent") {
            parent = $(".message-list-sent");
        } else if (data[2] === "trash") {
            parent = $(".message-list-trash");
        }
        parent.find(".clone-child").remove();
        var ids = data[0];
        var msgdetails = data[1];
        var childclone = parent.find(".clone").removeClass("hide");
        $.each(ids, function (index, id) {
            var result = msgdetails[id];
            var newchild = childclone.clone();
            var isread = result["is_read"];
            newchild.removeClass("clone");
            newchild.addClass("clone-child");
            newchild.find(".chk").prop("id", "chk" + index);
            newchild.find(".toggle").prop("for", "chk" + index);

            if (data[2] === "inbox") {
                var uid = result["from_member_id"];
                var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + uid + ".png";
                if (imageExists(image_url) === false) {
                    image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
                }
                newchild.find(".messageImage").attr("src", image_url);
                newchild.find(".sender-name").text(result["SenderName"]);
            } else if (data[2] === "sent") {
                var uid = result["to_member_id"];
                var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + uid + ".png";
                if (imageExists(image_url) === false) {
                    image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
                }
                newchild.find(".messageImage").attr("src", image_url);
                newchild.find(".sender-name").text(result["RecieverName"]);
            } else if (data[2] === "trash") {
                var uid = result["from_member_id"];
                var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + uid + ".png";
                if (imageExists(image_url) === false) {
                    image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
                }
                newchild.find(".messageImage").attr("src", image_url);
                newchild.find(".sender-name").text(result["SenderName"]);
            }

            newchild.find(".subject-title").text(result["subject"]);
            newchild.find(".body").text(result["body"]);
            newchild.find(".message-time").text(result["msgtime"]);
            if (isread !== "0")
                newchild.removeClass("unread");
            newchild.click(function () {
                var msgid = result["id"];
                GetData("Messages", "MarkAsRead", "", msgid);
                $(".ReadMessage").removeClass("hide");
                $(".ReadMessage").show();

                $(".InboxMessage").addClass("hide");
                $(".InboxMessage").hide();
                $(".TrashMessage").addClass("hide");
                $(".TrashMessage").hide();
                $(".SentMessage").addClass("hide");
                $(".SentMessage").hide();
                DisplayMessageDetails(result, data[2]);
            });
            newchild.appendTo(parent).show();
        });
        childclone.hide();
    } else {
        $("<li />", {class: "wide center clone-child text-center", text: "No Result", colspan: "6"}).appendTo(parent);
    }
}

function DisplayMessageCounts(data) {
    $(".all_inboxcount").text(data[0]);
    $(".all_sentcount").text(data[1]);
    $(".all_trashcount").text(data[2]);
    $(".inboxcount").text(data[3]);
    $(".sentcount").text(data[4]);
    $(".trashcount").text(data[5]);
}

function DisplayMessageDetails(data, option) {
    if (option === "inbox") {
        $("#msgHeader").text("Inbox");
        var uid = data["from_member_id"];
        var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + uid + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
        }
        $(".senderName").text(data["SenderName"]);
        $(".SenderEmail").text(data["SenderEmail"]);
        $(".recievercnt").addClass("hide");
        $(".msg-Image").attr("src", image_url);
    } else if (option === "sent") {
        $("#msgHeader").text("Sent");
        var uid = data["to_member_id"];
        var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + uid + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
        }
        $(".recipientName").text(data["RecieverName"]);
        $(".RecieverEmail").text(data["RecieverEmail"]);
        $(".sendercnt").addClass("hide");
        $(".msg-Image").attr("src", image_url);
    } else if (option === "trash") {
        $("#msgHeader").text("Trash");
        var uid = data["from_member_id"];
        var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + uid + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
        }
        $(".senderName").text(data["SenderName"]);
        $(".SenderEmail").text(data["SenderEmail"]);
        $(".recievercnt").addClass("hide");
        $(".msg-Image").attr("src", image_url);
    }

    $(".msg-title").text(data["subject"]);
    $(".date-time").text(data["msgdate"] + " at " + data["msgtime"]);
    $(".msg-bdy").html(data["body"]);
    var recover = $(".btnRecoverMessage");
    var trashmsg = $(".btnTrashMessage");
    var trashbox = $(".trashbox");
    var sentbox = $(".sentbox");
    if (option === "trash") {
        trashbox.removeClass("hide");
        trashbox.show();
        sentbox.addClass("hide");
        sentbox.hide();
        trashmsg.click(function () {
            var MsgId = data["id"];
            data = [MsgId, option];
            swal({
                title: "Trash Message!",
                text: "Are you sure you want to delete this message, it cannot be restored",
                type: "info",
                showCancelButton: true,
                confirmButtonClass: 'btn btn btn-success',
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                cancelButtonClass: 'btn btn-warning'
            }).then(function (dismiss) {
                if (dismiss.value) {
                    GetData("Messages", "TrashMessage", "LoadTrashMessage", data);
                } else {
                    swal({
                        title: 'Safe',
                        text: "Your message is safe!",
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Ok!',
                        confirmButtonClass: 'btn btn-success',
                        buttonsStyling: false
                    });
                }
            });

        });
        recover.click(function () {
            var MsgId = data["id"];
            data = [MsgId, option];
            swal({
                title: "Restore Message!",
                text: "Are you sure you want to restore this message?",
                type: "info",
                showCancelButton: true,
                confirmButtonClass: 'btn btn btn-success',
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                cancelButtonClass: 'btn btn-warning'
            }).then(function (dismiss) {
                if (dismiss.value) {
                    GetData("Messages", "RecoverMessage", "LoadRecoveredMessage", data);

                } else {
                    swal({
                        title: 'Safe',
                        text: "Your message is safe!",
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Ok!',
                        confirmButtonClass: 'btn btn-success',
                        buttonsStyling: false
                    });
                }
            });
        });
    }
    $(".btnDeleteMessage").click(function () {
        var MsgId = data["id"];
        data = [MsgId, option];
        swal({
            title: "Delete Message!",
            text: "Are you sure you want to delete this message?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: 'btn btn btn-success',
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            cancelButtonClass: 'btn btn-warning'
        }).then(function (dismiss) {
            if (dismiss.value) {
                GetData("Messages", "TrashMessage", "LoadTrashMessage", data);
            } else {
                swal({
                    title: 'Safe',
                    text: "Your message is safe!",
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });

    });
    $(".showInboxMessage").click(function () {
        window.location.reload();
    });



}

function DisplayTrashMessage(data) {
    if ((data[0] === "success") || (data[0] === "successful")) {
        swal({
            title: "Message",
            text: "Message Deleted!",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn btn-success',
            confirmButtonText: "Ok",
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Sorry, something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}

function DisplayRecoveredMessage(data) {
    if ((data[0] === "success") || (data[0] === "successful")) {
        swal({
            title: "Message",
            text: "Message Recovered!",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn-success',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Sorry, something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}

function DisplayNewMessage(data) {
    if (data === "success" || data === "successful") {
        swal({
            title: "Message",
            text: "Message Sent!",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location = extension + "ControllerServlet?action=Link&type=Sent";
            }
        });
    }

}

function DisplayAccountDefinitions(data) {
    if (data !== "none") {
        var cs = $("#accountDefName");
        cs.empty();
        if (data === "empty") {
        } else {
            cs.append($('<option/>').val(0).text("Select Account Type"));
            $.each(data, function (key, value) {
                cs.append($('<option/>').val(key).text(value["name"]));
            });
        }
    }
}

function DisplayAccountBalanaces(data) {
    hideLoader();
    if (data !== "none") {
        $(".ActualAcctAccountNameWar").text(data["AccountName"]);
        $(".ActualAcctAccountTypeWar").text(data["AccountDefinitionName"]);
        $(".ActualAcctAccountNumberWar").text(data["AccountNumber"]);
        $(".ActualAcctLedgerBalanceWar").text(PriceFormat(data["Ledger_Balance"]));
        $(".ActualAcctDirectBalanceWar").text(PriceFormat(data["Available_Balance"]));
        $(".ActualAcctODLineBalanceWar").text(PriceFormat(data["Blocked_Balance"]));
        $(".ActualAcctBlockedBalanceWar").text(PriceFormat(data["ODLine_Balance"]));
        $(".ActualAcctOfflineBalanceWar").text(PriceFormat(data["Offline_Balance"]));
        $(".ActualAcctEscrowBalanceWar").text(PriceFormat(data["Escrow_Balance"]));

        $(".ActualAcctAccountNameRef").text(data["AccountName"]);
        $(".ActualAcctAccountTypeRef").text(data["AccountDefinitionName"]);
        $(".ActualAcctAccountNumberRef").text(data["AccountNumber"]);
        $(".ActualAcctLedgerBalanceRef").text(PriceFormat(data["Ledger_Balance"]));
        $(".ActualAcctDirectBalanceRef").text(PriceFormat(data["Available_Balance"]));
        $(".ActualAcctODLineBalanceRef").text(PriceFormat(data["Blocked_Balance"]));
        $(".ActualAcctBlockedBalanceRef").text(PriceFormat(data["ODLine_Balance"]));
        $(".ActualAcctOfflineBalanceRef").text(PriceFormat(data["Offline_Balance"]));
        $(".ActualAcctEscrowBalanceRef").text(PriceFormat(data["Escrow_Balance"]));

        $(".ActualAcctAccountNamePar").text(data["AccountName"]);
        $(".ActualAcctAccountTypePar").text(data["AccountDefinitionName"]);
        $(".ActualAcctAccountNumberPar").text(data["AccountNumber"]);
        $(".ActualAcctLedgerBalancePar").text(PriceFormat(data["Ledger_Balance"]));
        $(".ActualAcctDirectBalancePar").text(PriceFormat(data["Available_Balance"]));
        $(".ActualAcctODLineBalancePar").text(PriceFormat(data["Blocked_Balance"]));
        $(".ActualAcctBlockedBalancePar").text(PriceFormat(data["ODLine_Balance"]));
        $(".ActualAcctOfflineBalancePar").text(PriceFormat(data["Offline_Balance"]));
        $(".ActualAcctEscrowBalancePar").text(PriceFormat(data["Escrow_Balance"]));
    } else {

    }
}

function DisplayAllUserTransactions(data, parent) {
    hideLoader();
    parent.find(".newclone").remove();
    if (data !== "none") {
        var ids = data[0];
        var details = data[1];
        var count = 0;
        var childclone = parent.find(".transclone");
        $.each(ids, function (index, id) {
            count++;
            var result = details[id];
            var newchild = childclone.clone();
            newchild.removeClass("hide");
            newchild.addClass("newclone");
            var type = result["OtherTransactionType"];
            newchild.find(".transCount").text(count);
            newchild.find(".transID").text(result["TransactionRef"]);
            newchild.find(".transName").text(result["NameOfTransaction"]);
            newchild.find(".transDate").text(result["NewDate"]);
            var ViewTransDetails = newchild.find(".ViewTransDetails");
            newchild.find(".transTool").text(result["ValueType"]);
            if (type === "Debit") {
                newchild.find(".transAmount").text(PriceFormat(result["DebitAmount"]));
            } else if (type === "Credit") {
                newchild.find(".transAmount").text(PriceFormat(result["CreditAmount"]));
            }
            ViewTransDetails.click(function () {
                DisplayTransactionDetails(result);
            });

            newchild.appendTo(parent).show();
        });
        $(".transTotalCount").text(count);
        childclone.hide();
    } else {
        parent.text("No Results");
        $(".transTotalCount").text(0);
    }

}

function DisplayTransactionDetails(data) {
    $(".SenderName").text(data["PrimaryAccountName"]);
    $(".DebitAccountNumber").text(data["DebitAccountNumber"]);
    $(".DebitAccountDefinitionName").text(data["AccountDefinitionName"]);
    $(".RecieverName").text(data["OtherAccountName"]);
    $(".CreditAccountNumber").text(data["CreditAccountNumber"]);
    $(".CreditAccountDefinitionName").text(data["AccountDefinitionName"]);
    $(".TransactionId").text(data["TransactionRef"]);
    $(".TransactionType").text(data["NameOfTransaction"]);
    $(".Transaction").text(data["OtherTransactionType"]);
    $(".DebitAmount").text(PriceFormat(data["DebitAmount"]));
    $(".CreditAmount").text(PriceFormat(data["CreditAmount"]));
    $(".Amount").text(PriceFormat(data["Amount"]));
    $(".Description").text(data["Description"]);
    $(".ChargesAmount").text(PriceFormat(data["AppliedCharge"]));
    $(".Comment").text(data["Comment"]);
    $(".Date").text(data["NewDate"]);
    $(".Time").text(data["NewTime"]);
    $(".transtool").text(data["ValueType"]);
    $(".TransactionAmount").text(data["TransactionAmount"]);
    if (data["ValueType"] === "Warrants") {
        $(".ttools").removeClass("hide");
        $(".SenderBal").text(PriceFormat(data["FromUserNewBalance"]));
        $(".RecieverBal").text(PriceFormat(data["ToUserNewBalance"]));
    }
}

function DisplayAllUsersAccountBalances(data) {
    var parent = $("#AllAccounts");
    var count = 0;
    parent.find(".clearclone1").remove();
    if (data === "none") {
        var newchild = parent.find(".clone").clone();
        newchild.removeClass("clone");
        newchild.removeClass("hide");
        newchild.find(".noData").removeClass("hide").show();
        newchild.find(".hasdata").addClass("hide");
        newchild.addClass("clearclone1");
        newchild.appendTo(parent).show();
        $(".acctTotalCount").text(0);
        $(".transTotalCount").text(count);
    } else {
        parent.find(".clearclone1").remove();
        var childclone = parent.find(".clone");
        $.each(data, function (id, details) {
            count++;
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("clearclone1");
            newchild.find(".acctCount").text(count);
            newchild.find(".acctID").text(id);
            newchild.find(".acctName").text(details["AccountName"]);
            newchild.find(".WacctBalances").text(PriceFormat(details["WarrantBalance"]));
            newchild.find(".RacctBalances").text(PriceFormat(details["ReflationBalance"]));
            newchild.find(".PacctBalances").text(PriceFormat(details["ParBalance"]));
            newchild.find(".DailyLimit").text(details["dailyLim"]);
            newchild.find(".DebitLimit").text(PriceFormat(parseInt(details["debitLim"])));
            newchild.find(".CreditLimit").text(PriceFormat(parseInt(details["creditLim"])));
            var total = parseInt(details["WarrantBalance"]) + parseInt(details["ReflationBalance"]) + parseInt(details["ParBalance"]);
            newchild.find(".TotalBalances").text(PriceFormat(total));
            var detailsBtn = newchild.find(".acctDetailBtn");
            var limitsBtn = newchild.find(".changeLimitsBtn");
            var stmtBtn = newchild.find(".generateStmtBtn");
            detailsBtn.unbind("click").click(function () {
                $(".bd-account-details").modal("show");
                var userid = details["userId"];
                GetData("Accounts", "GetUserAccountBalanceDetails", "LoadUserAccountBalanceDetails", userid);
            });
            limitsBtn.unbind("click").click(function () {
                $(".change-transaction-limit-modal").on("show.bs.modal", function () {
                    $("#DailyTransLimit").val(details["dailyLim"]).html(details["dailyLim"]);
                    $("#DebitTransLimit").val(parseInt(details["debitLim"])).html(PriceFormat(parseInt(details["debitLim"])));
                    $("#CreditTransLimit").val(parseInt(details["creditLim"])).html(PriceFormat(parseInt(details["creditLim"])));
                    $("#DailyTransInput").val(details["dailyLim"]);
                    $("#DebitLimitInput").val(details["debitLim"]);
                    $("#CreditLimitInput").val(details["creditLim"]);
                }).modal("show");
                $("form[name=ChangeLimits]").submit(function (e) {
                    var userid = details["userId"];
                    var daily = $("#DailyTransInput").val();
                    var debitt = $("#DebitLimitInput").val();
                    var creditt = $("#CreditLimitInput").val();
                    var debit = debitt.replace(/,/g, '');
                    var credit = creditt.replace(/,/g, '');
                    var data = [userid, daily, debit, credit];
                    GetData("Accounts", "SetNewTransactionlimits", "LoadNewTranslimits", data);
                    e.preventDefault();
                });
            });
            stmtBtn.unbind("click").click(function () {
                $(".bd-example-tdmodal3").on("show.bs.modal", function () {
                    $("#beneficiaryID").val(details["userId"]);
                    $("#benName").html(details["AccountName"]);
                }).modal("show");
            });
            newchild.appendTo(parent).show();

        });
        childclone.hide();
        $(".acctTotalCount").text(count);
    }








}

function DisplayUserAccountBalanceDetails(data) {
    var parent = $("#acctDetailDisplay");
    var DefList = data[0];
    var DefBal = data[1];
    var test = 0;
    parent.find(".clearclone1").remove();
    if (DefList === "none") {
        var newchild = parent.find(".clone").clone();
        newchild.removeClass("clone");
        newchild.removeClass("hide");
        newchild.find(".noData").removeClass("hide").show();
        newchild.find(".hasdata").addClass("hide");
        newchild.addClass("clearclone1");
        newchild.appendTo(parent).show();
    } else {
        parent.find(".clearclone1").remove();
        var childclone = parent.find(".clone");
        $.each(DefList, function (id, def) {
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("clearclone1");
            if (test === 0)
                newchild.find(".openfirst").addClass("accordion-expanded");
            newchild.find(".acctDetailType").text(def["name"]);
            var DefBals = DefBal[id];
            $.each(DefBals, function (balid, baldetails) {
                newchild.find("#AccountName").text(baldetails["AccountName"]);
                newchild.find("#AccountNumber").text(baldetails["AccountNumber"]);
                newchild.find("#AvBal").text(baldetails["Available_Balance"]);
                newchild.find("#DiBalance").text(baldetails["Available_Balance"]);
                newchild.find("#BlBalance").text(baldetails["Blocked_Balance"]);
                newchild.find("#EsBalance").text(baldetails["Escrow_Balance"]);
                newchild.find("#OfBalance").text(baldetails["Offline_Balance"]);
                newchild.find("#OdBalance").text(baldetails["ODLine_Balance"]);
            });
            newchild.appendTo(parent).show();
            test++;
        });
        childclone.hide();
    }
    Accordion();

}

function DisplayAllUserAccountsCount(data) {
    $("#allaccountcounts").text(data[0]);
    $("#alltranscounts").text(data[1]);
}

function DisplayTotalWarrants(data) {
    hideLoader();
    var parent = $("#createdWarrantsTable");
    var count = 0;
    parent.find(".clearclone1").remove();
    if (data === "none") {
        var newchild = parent.find(".clone").clone();
        newchild.removeClass("clone");
        newchild.removeClass("hide");
        newchild.find(".noData").removeClass("hide").show();
        newchild.find(".hasdata").addClass("hide");
        newchild.addClass("clearclone1");
        newchild.appendTo(parent).show();
    } else {
        parent.find(".clearclone1").remove();
        var childclone = parent.find(".clone");
        $.each(data, function (id, details) {
            count++;
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("clearclone1");
            newchild.find(".warrantsCount").text(count);
            newchild.find(".warrantsID").text(id);
            newchild.find(".warrantsCreateBy").text(details["creatorName"]);
            newchild.find(".warrantsAmount").text(PriceFormat(details["Value"]));
            newchild.find(".warrantsCreatedFor").text(details["recipientName"]);
            newchild.find(".warrantsDate").text(details["IssueDate"]);
            newchild.find(".warrantsTime").text(details["IssueTime"]);
            var btn = newchild.find(".warrantsBtn");
            btn.unbind("click").click(function () {
                GetData("Warrants", "GetWarrantsLifeCycle", "LoadWarrantsLifeCycle", id);
                $(".bd-example-modal-warrants_cycle").modal("show");
            });
            var btn2 = newchild.find(".warrantsBtn2");
            btn2.unbind("click").click(function () {
                swal({
                    title: "Warrants Life Cycle!",
                    text: "Please Login to The WealthMarket Inventory Manager!",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonClass: 'btn btn-success',
                    confirmButtonText: 'Ok!',
                    onClose: function () {

                    }
                });
            });
            newchild.appendTo(parent).show();
        });
        childclone.hide();
    }
}

function DisplayWMWarrantsAccount(data) {
    $(".wmaccountbal").text(PriceFormat(data));
}

function DisplayAllWarrantsBalance(data) {
    $(".allwarrantsbal").text(PriceFormat(data));
}

function DisplayWarrantsInAccountProperties(data) {
    $(".WDirectBalance").text(PriceFormat(data[0]));
    $(".WEscrowBalance").text(PriceFormat(data[1]));
    $(".WBlockedBalance").text(PriceFormat(data[2]));
    $(".WOfflineBalance").text(PriceFormat(data[3]));
}

function DisplayWarrantsLifeCycle(data) {
    var parent = $("#WarrantsLifeCycle");
    var count = 0;
    parent.find(".clearclone1").remove();
    if (data === "none") {
        var newchild = parent.find(".clone").clone();
        newchild.removeClass("clone");
        newchild.removeClass("hide");
        newchild.find(".noData").removeClass("hide").show();
        newchild.find(".hasdata").addClass("hide");
        newchild.addClass("clearclone1");
        newchild.appendTo(parent).show();
    } else {
        parent.find(".clearclone1").remove();
        var childclone = parent.find(".clone");
        $.each(data, function (id, details) {
            count++;
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("clearclone1");
            newchild.find(".cycleCount").text(count);
            newchild.find(".cycleAcctName").text(details["AccountName"]);
            newchild.find(".cycleAcctNumber").text(details["AccountNumber"]);
            newchild.find(".cycleAmount").text(PriceFormat(details["WarrantAmount"]));
            newchild.appendTo(parent).show();
        });
        childclone.hide();
    }

}

function DisplayWarrantsInAccountProperty(data) {
    var parent = $("#WarrantsInAccounts");
    var count = 0;
    parent.find(".clearclone1").remove();
    if (data === "none") {
        var newchild = parent.find(".clone").clone();
        newchild.removeClass("clone");
        newchild.removeClass("hide");
        newchild.find(".noData").removeClass("hide").show();
        newchild.find(".hasdata").addClass("hide");
        newchild.addClass("clearclone1");
        newchild.appendTo(parent).show();
    } else {
        parent.find(".clearclone1").remove();
        var childclone = parent.find(".clone");
        $.each(data, function (id, details) {
            count++;
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("clearclone1");
            newchild.find(".cycleCount").text(count);
            newchild.find(".cycleAcctName").text(details["AccountName"]);
            newchild.find(".cycleAcctNumber").text(details["AccountNumber"]);
            newchild.find(".cycleAmount").text(PriceFormat(details["WarrantBalance"]));
            newchild.appendTo(parent).show();
        });
        childclone.hide();
    }

}

function MakeAdmin(id, name) {
    swal({
        title: "Make Admin!",
        text: "Are you sure you want to make " + name + " Administrator?",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonClass: 'btn btn-success',
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        cancelButtonClass: 'btn btn-primary'
    }, function (isConfirm) {
        if (isConfirm) {
            GetData("User", "MakeAdmin", "LoadMakeAdmin", id);
        } else {
            swal('Cancelled', 'Message not deleted! )', 'error');
        }
    });
}

function DisplayMakeAdmin(data) {
    if (data === "success") {
        swal({
            title: "Administrator",
            text: "Successful",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!'
        }, function (isConfirm) {
            if (isConfirm) {
                var text = "Admin";
                $(".WMUname").text(text);
                GetData("User", "GetAllUsers", "LoadAllUsers", text);
                GetData("User", "GetAllUsersCounts", "LoadAllUsersCount", text);
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Sorry, something went wrong! oohh",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok'
        }, function (isConfirm) {
            if (isConfirm) {
                var text = "Admin";
                $(".WMUname").text(text);
                GetData("User", "GetAllUsers", "LoadAllUsers", text);
                GetData("User", "GetAllUsersCounts", "LoadAllUsersCount", text);
            }
        });
    }
}

function DisplayRemoveAdminOrAgencyAccount(id, name) {
    swal({
        title: "Remove Admin / Agency Account!",
        text: "Are you sure you want to remove " + name + "?",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonClass: 'btn btn-success',
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        cancelButtonClass: 'btn btn-primary'
    }, function (isConfirm) {
        if (isConfirm) {
            GetData("User", "RemoveAdminOrAgencyAccount", "LoadRemoveAdminOrAgencyAccount", id);
        } else {
            swal('Cancelled', 'Message not deleted! )', 'error');
        }
    });
}

function DisplayAddProductCategory(data) {
    $("#catid").val(data);
    $(".add-cat-image-modal").modal("show");

}

function DisplayAddProductCategoryProperty(data) {
    if (data === "success") {
        swal({
            title: "Added!",
            text: "Successful!",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                $(".add-cat-prop-modal").modal("hide");
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Sorry, something went wrong! oohh",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok',
            onClose: function () {
                $(".add-cat-prop-modal").modal("hide");
            }
        });
    }
}

function DisplayUserListedProductAction(data) {
    hideLoader();
    if (data[1] === "success" || data[1] === "successful") {
        swal({
            title: "Product " + data[0],
            text: "Successful!",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: data[1],
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}

function DisplayPromoProducts(data) {
    hideLoader();
    var promoList = data[0];
    var promoProd = data[1];
    var parentPromo = $("#PromoProducts");
    if (data === "none") {
        parentPromo.text("No Result");
    } else {
        var counter = 0;
        var childclone = parentPromo.find(".clone");
        $.each(promoList, function (id, promo) {
            var promoid = id;
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            counter++;
            newchild.addClass("category-clone");
            newchild.find(".promo-name").text(capitaliseFirstLetter(promo["name"]));

            newchild.find(".promo-desc").text(capitaliseFirstLetter(promo["description"]));
            var promobtn = newchild.find("#promoprodbtn").click(function () {
                $(".add-promo-product-modal").find(".pname").text(capitaliseFirstLetter(promo["name"]));
                $(".add-promo-product-modal").find(".promo-id").text(promoid);
                showLoader();
                GetData("Product", "GetShopProducts", "LoadProductsForPromo");
            });
            promobtn.tooltip({
                position: {
                    my: "center bottom-40", // the "anchor point" in the tooltip element
                    at: "center top" // the position of that anchor point relative to selected element
                }
            });
            var subParent = newchild.find(".PromoProd");
            var subchildclone = subParent.find(".promoclone");
            var PromoProducts = promoProd[id];
            var count = 0;
            $.each(PromoProducts, function (id, data) {
                var newsubchild = subchildclone.clone();
                newsubchild.removeClass("promoclone");
                newsubchild.removeClass("hide");
                count++;
                newsubchild.addClass("sub-category-clone");
                var image_url = extension + "global_assets/app/img/ProductImages/product-" + data["product_id"] + ".png";
                if (imageExists(image_url) === false) {
                    image_url = extension + "global_assets/app/img/ProductImages/product-0.png";
                }
                newsubchild.find(".promoprod-count").text(count);
                newsubchild.find(".promoprod-image").attr("src", image_url);
                newsubchild.find(".promoprod-name").text(capitaliseFirstLetter(data["name"]));
                newsubchild.find(".promoprod-desc").text(data["description"]);
                var price = data["selling_price"];
                var newprice = PriceFormat(price);
                var pprice = data["price"];
                var newpprice = PriceFormat(pprice);
                newsubchild.find(".promoprod-price").text(newprice);
                newsubchild.find(".promoprod-prodprice").text(newpprice);
                newsubchild.find(".promoprod-catname").text(data["category_name"]);
                newsubchild.find(".promoprod-quantity").text(data["quantity"]);
                var btn = newsubchild.find(".promoprodbtn");
                btn.click(function () {
                    $(".product-details-image").attr("src", image_url);
                    DisplayProductDetails(data, image_url);
                });
                var btn2 = newsubchild.find(".editPricebtn");
                btn2.unbind().click(function () {
                    var prodid = data["product_id"];
                    ConfirmNewPromoProductPrice(promoid, prodid);
                });
                newsubchild.appendTo(subParent);
            });
            newchild.appendTo(parentPromo);
        });
        $(".numberofPromoProducts").text(counter);
        childclone.hide();
    }
    Accordion();
}

function DisplayPickUpCenters(data) {
    hideLoader();
    var stateList = data[0];
    var Centers = data[1];
    var parentPromoPickup = $("#PickupCenters");
    if (data === "none") {
        parentPromoPickup.text("No Result");
    } else {
        var counter = 0;
        var childclone = parentPromoPickup.find(".clone");
        $.each(stateList, function (id, promo) {
            var promoid = id;
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            counter++;
            newchild.find(".pickup-name").text(capitaliseFirstLetter(promo["stateName"]) + " State");

            var subParent = newchild.find(".PickCenters");
            var subchildclone = subParent.find(".pickupclone");
            var PromoProducts = Centers[id];
            var count = 0;
            $.each(PromoProducts, function (id, data) {
                var data_name = data["name"];
                var data_address = data["address"];
                var data_working_hours = data["working_hours"];
                var data_phone = data["phone"];
                var data_state_id = data["state_id"];
                var data_id = data["id"];
                var data_bstop = data["Bstop_id"];
                var data_street = data["street_id"];
                var data_lga = data["lga_id"];
                var data_lcda = data["lcda_id"];
                var data_town = data["town_id"];


                var newsubchild = subchildclone.clone();
                newsubchild.removeClass("pickupclone");
                newsubchild.removeClass("hide");
                count++;
                newsubchild.find(".centre-count").text(count);
                newsubchild.find(".centre-name").text(capitaliseFirstLetter(data_name));
                newsubchild.find(".centre-address").text(data_address);
                var price = data["fees"];
                var newprice = PriceFormat(price);
                newsubchild.find(".centre-fees").text(newprice);
                newsubchild.find(".centre-working_hours").text(data_working_hours);
                newsubchild.find(".centre-phone").text(data_phone);
                var btn2 = newsubchild.find(".editcentrebtn");

                btn2.unbind().click(function () {
                    $(".add-pickup-centre-modal").on("show.bs.modal", function () {
                        PopulateStates(data_state_id);
                        PopulateLGAs(data_state_id, data_lga); //populates the lga section
                        if (data_state_id === "24" || data_state_id === "27") {
                            $("#lcdaform").show();
                        }
                        PopulateLCDAsFromState(data_state_id, data_lcda); //populates the lcda section
                        PopulateTownsFromState(data_state_id, data_town);
                        PopulateBstopsFromTown(data_town, data_bstop); //populates the bus stop section
                        PopulateStreetsFromTown(data_town, data_street); //populates the street section
                        $("#pickup-Centername").val(data_name);
                        $("#pickup-fees").val(price);
                        $("#pickup-hours").val(data_working_hours);
                        $("#pickup-phone").val(data_phone);
                        $("#checker").val(data_id);
                        $("#pickupbtn").html('Edit').button("refresh");
                        //$( ".selector" ).button("option", "label", "Edit");
                    });
                });
                newsubchild.appendTo(subParent);
            });
            newchild.appendTo(parentPromoPickup);
        });
        childclone.hide();
    }
    Accordion();
}
function DisplayAddressTypes(data) {
    hideLoader();
    var parent = $(".addresstypeclone");
    if (data === "none") {
        parent.text("No result");
    } else {
        var childClone = parent.find(".clone");
        var newcount = 0;
        $.each(data, function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newcount++;
            newchild.find(".addtype-count").text(newcount);
            newchild.find(".addtype-name").text(details["name"]);
            var deleteaddtype = newchild.find(".deleteaddtype");
            deleteaddtype.click(function () {
                swal({
                    title: "Delete Address Type",
                    text: "This action is irreversible!",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-danger',
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    cancelButtonClass: 'btn btn-primary'
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        var ID = [id];
                        GetData("Product", "DeleteAddressTypes", "LoadDeleteAddressTypes", ID);
                    } else {
                        swal({
                            title: 'Safe',
                            text: "Address Type is safe!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
            });
            newchild.appendTo(parent);
        });
        childClone.hide();
    }

}

function DisplayNewDeals(data) {
    if (data === "success") {
        swal({
            title: "Promo Created!",
            text: "Successful!",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Sorry, something went wrong! oohh",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
            }
        });
    }

}

function DisplayAddPromoProduct(data) {
    if (data === "success") {
        swal({
            title: "Product added to Promo!",
            text: "Successful!",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {

            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Sorry, something went wrong! or product has already been added to promo",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok',
            onClose: function () {

            }
        });
    }

}

function ConfirmNewPromoProductPrice(promoid, prodid) {
    swal({
        title: 'Product Promo Price',
        text: 'Please Enter New Price',
        input: 'number',
        type: 'info',
        animation: 'slide-from-top',
        inputPlaceholder: 'New Promo Price',
        showCancelButton: true,
        confirmButtonText: 'Submit!',
        cancelButtonText: 'Cancel!',
        closeOnConfirm: false,
        closeOnCancel: false,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-warning',
        inputClass: 'form-control',
        inputValidator: function (value) {
            return !value && 'Invalid input!';
        }
    }).then(function (result) {
        if (result.value) {
            var price = result.value;
            var data = [promoid, prodid, price];
            showLoader();
            GetData("Product", "UpdatePromoProductDetail", "LoadUpdatePromoProductDetail", data);
        }
    });
}

function DisplayUpdatePromoProductDetail(data) {
    hideLoader();
    if (data === "success") {
        swal({
            title: "Product Price Updated!",
            text: "Successful!",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Sorry, something went wrong! or product has already been added to the promo",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
            }
        });
    }

}

function DisplayGenerateUserTransactionStatement(data) {
    hideLoader();
    if (data[0] === "success") {
        swal({
            title: "Account Statement Generated",
            text: "Successful",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                sessionStorage.setItem("acctstmtuserid", data[1]);
                $("#ViewAcctStmt").click();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: data[1],
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}

function DisplayUserContacts(data, parent, objecttype) {
    if (data === "none") {
        parent.text("No Contacts or Staff").css("text-align", "center");
    } else {
        var cs = $("#MyContactslist");
        cs.empty();
        if (data === "empty") {
        } else {
            cs.append($('<option/>').val(0).text("Select the user from your contact list here"));
            $.each(data, function (key, value) {
                var info = value["user_name"] + " - " + value["email"] + " - " + value["phone_number"];
                cs.append($('<option/>').val(key).text(info));
            });
            cs.change('select2:select', function () {
                //Use $option (with the "$") to see that the variable is a jQuery object
                var option = $(this).find('option:selected');
                //Added with the EDIT
                var id = option.val(); //to get content of "value" attrib
                var text = option.text(); //to get <option>Text</option> content
                $("#msguserEmail").val(text);
                $("#msguserID").text(id);
            });
        }

        parent.find(".newclone").remove();
        $.each(data, function (id, details) {
            var childclone = parent.find(".contactclone");
            var newchild = childclone.clone();
            newchild.removeClass("contactclone");
            newchild.removeClass("hide");
            newchild.addClass("newclone");
            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + id + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            var contactid = id;
            newchild.find(".UsercontactImage").attr("src", image_url);
            newchild.find(".UsercontactName").text(details["user_name"]);
            newchild.find(".UsercontactType").text(details["usertype"]);
            newchild.find(".UsercontactPhone").text(details["phone_number"]);
            newchild.find(".UsercontactEmail").text(details["email"]);
            var btnSendContactMsg = newchild.find(".btnSendContactMsg");
            btnSendContactMsg.tooltip({
                position: {
                    my: "center bottom-40", // the "anchor point" in the tooltip element
                    at: "center top" // the position of that anchor point relative to selected element
                }
            });
            btnSendContactMsg.click(function () {
                $("#msguserEmail").val(details["user_name"] + "  -  " + details["email"] + "  -  " + details["phone_number"]);
                $("#msguserID").text(id);
            });
            var btntransfer = newchild.find(".btntransfer");
            btntransfer.tooltip({
                position: {
                    my: "center bottom-40",
                    at: "center top"
                }
            });
            btntransfer.click(function () {
                $("#QTransferBtn").click();
            });
            var btndelete = newchild.find(".btnDeleteContact");
            btndelete.tooltip({
                position: {
                    my: "center bottom-40",
                    at: "center top"
                }
            });
            btndelete.click(function () {
                swal({
                    title: "My Contact(s)/Staff List",
                    text: "Do you want to remove " + details["user_name"] + " from your List",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        var data = [actualuserid, contactid, actualusertype, objecttype];
                        GetData("User", "removeUser", "LoadContactAction", data);
                    } else {
                        swal({
                            title: 'Safe',
                            text: "No action taken!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
            });
            var btnSetPermission = newchild.find(".btnSetPermission");
            btnSetPermission.tooltip({
                position: {
                    my: "center bottom-40",
                    at: "center top"
                }
            });
            btnSetPermission.click(function () {
                window.location = extension + "ControllerServlet?action=Link&type=Profile-ManagePermissions&StaffUserID=" + id + "&StaffUserName=" + details["user_name"];
            });
            newchild.appendTo(parent).show();
            childclone.hide();
        });
    }
}

function DisplaySearchResultUserDetails(data) {
    var parent = $(".verifymsg-list");
    parent.find(".newclone").remove();
    if (data["BeneficiaryName"] === "none") {
        $("#msguserEmail").val("No Members match your search");
        parent.text("No Members match your search");
    } else {
        var childclone = parent.find(".verifyclone");
        var newchild = childclone.clone();
        newchild.removeClass("clone");
        newchild.addClass("newclone");
        var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + data["Beneficiaryid"] + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
        }
        newchild.find(".msg-list-Image").attr("src", image_url);
        newchild.find(".msg-list-name").text(data["BeneficiaryName"]);
        newchild.find(".msg-list-phone").text(data["BeneficiaryPhone"]);
        newchild.find(".msg-list-email").text(data["BeneficiaryEmail"]);
        newchild.find(".msg-list-id").text(data["Beneficiaryid"]);
        $("#msguserEmail").val(data["BeneficiaryName"] + "  -  " + data["BeneficiaryEmail"] + "  -  " + data["BeneficiaryPhone"]);
        $("#msguserID").text(data["Beneficiaryid"]);
        newchild.appendTo(parent).show();
        childclone.hide();
    }
}

function DisplaySearchUserDetails(data) {
    hideLoader();
    var parent = $(".verifyUser-list");
    parent.find(".newclone").remove();
    if (data["BeneficiaryName"] === "none") {
        parent.text("No Members match your search");
    } else {
        var childclone = parent.find(".verifyclone");
        var newchild = childclone.clone();
        newchild.removeClass("verifyclone");
        newchild.addClass("newclone");
        var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + data["Beneficiaryid"] + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
        }
        newchild.find(".user-list-Image").attr("src", image_url);
        newchild.find(".user-list-name").text(data["BeneficiaryName"]);
        newchild.find(".user-list-phone").text(data["BeneficiaryPhone"]);
        newchild.find(".user-list-email").text(data["BeneficiaryEmail"]);
        newchild.find(".user-list-id").text(data["Beneficiaryid"]);
        newchild.appendTo(parent).show();
        childclone.hide();
    }
}

function DisplayQuickTransfer(data) {
    hideLoader();
    var acctdefid = data[1];
    if (data[0] === "success") {
        swal({
            title: "Transfer Successful",
            text: "Transfer Completed!",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                accountsPageFunctions();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: data[0],
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Ok',
            onClose: function () {
                accountsPageFunctions();
            }
        });
    }

}

function DisplayBankDetails(data) {
    if (data === "success") {
        swal({
            title: "Bank Details",
            text: "Bank details added successfully",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'OK!',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Sorry, something went wrong! oohh",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}

function DisplayUserHistory(data, parent) {
    hideLoader();
    parent.find(".clearclone1").remove();
    if (data === "none") {
        parent.text("No History");
    } else {
        $.each(data, function (id, details) {
            var newchild = parent.find(".clone").clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("clearclone1");
            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + details["userId"] + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            newchild.find(".histUserImage").attr("src", image_url);
            newchild.find(".histUserName").text(details["user_name"]);
            newchild.find(".histUserType").text(details["usertype"]);
            newchild.find(".histTitle").text(details["Topic"]);
            newchild.find(".histDetails").text(details["Details"]);
            newchild.find(".histDate").text(details["Date"]);
            newchild.find(".histTime").text(details["Time"]);
            newchild.appendTo(parent).show();
        });
    }
}

function DisplayUserProducts(data, parent) {
    hideLoader();
    parent.find(".clone-child").remove();
    if (data === "none") {
//        $("<div />", {class: "padding", text: "No Product"}).appendTo(parent);
        $(".listedProductsNum").text(0);
    } else {
        var count = 0;
        var childclone = parent.find(".clone");
        $.each(data, function (id, details) {
            count++;
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("clone-child");
            var image_url = extension + "global_assets/app/img/UnlistedProductImages/product-" + id + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProductImages/product-0.png";
            }
            newchild.find(".productSN").text(count);
            newchild.find(".productImage").attr("src", image_url);
            var name = capitaliseFirstLetter(details["product_name"]);
            newchild.find(".productName").text(name);
            newchild.find(".productDesc").text(details["description"]);
            newchild.find(".productCategory").text(details["category_name"]);
            newchild.find(".productSummary").text(details["summary"]);
            var price = details["proposed_price"];
            var newprice = PriceFormat(price);
            newchild.find(".productPrice").text(newprice);
            var Quantity = parseInt(details["quantity"]);
            if (Quantity > 0) {
                newchild.find(".productQuantity").text(Quantity).addClass("badge badge-info");
            } else {
                newchild.find(".productQuantity").text(Quantity).addClass("badge badge-danger");
            }
            var status = details["status"];
            if (status === "Accepted") {
                newchild.find(".productStatus").text(status).addClass("badge badge-success");
            } else if (status === "Pending") {
                newchild.find(".productStatus").text(status).addClass("badge badge-primary");
            } else if (status === "Declined") {
                newchild.find(".productStatus").text(status).addClass("badge badge-danger");
            }
            var btnDeleteProduct = newchild.find(".btnDeleteProduct");
            var btnViewProductDetatails = newchild.find(".btnViewProductDetatails");
            newchild.find(".productStatus").text(status);
            if (status === "Declined" || status === "Pending") {
                btnDeleteProduct.removeClass("hide");
            } else {
                btnViewProductDetatails.removeClass("hide");
            }
            btnViewProductDetatails.click(function () {
                $(".product-details-image").attr("src", image_url);
                DisplayProductDetails(details, image_url);
            });
            btnDeleteProduct.click(function () {
                var pid = details["product_id"];
                swal({
                    title: 'My Products(s)',
                    text: "Do you want to remove - " + name + " - from your Product List",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel it!',
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        GetData("Product", "RemoveFromPool", "LoadRemoveFromPool", pid);
                    } else {
                        swal({
                            title: 'Safe',
                            text: "Your product is safe!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
            });
            newchild.appendTo(parent).show();
        });
        $(".listedProductsNum").text(count);
        var image_url1 = extension + "global_assets/images/placeholders/product-0.png";
        $(".imagepopup").attr("href", image_url1);
        childclone.hide();
    }
}

function DisplayUserOrderedProducts(data, parent) {
    hideLoader();
    parent.find(".clone-child").remove();
    if (data === "none") {
        $(".listedOrderedProductsNum").text(0);
//        $("<div />", {class: "padding", text: "No Product"}).appendTo(parent);
    } else {
        var count = 0;
        var childclone = parent.find(".clone");
        $.each(data, function (id, details) {
            count++;
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("clone-child");
            var image_url = extension + "global_assets/app/img/ProductImages/product-" + details["product_id"] + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProductImages/product-0.png";
            }
            newchild.find(".productSN").text(count);
            newchild.find(".productImage").attr("src", image_url);
            var name = capitaliseFirstLetter(details["name"]);
            newchild.find(".productName").text(name);
            newchild.find(".productDesc").text(details["description"]);
            newchild.find(".productCategory").text(details["category_name"]);
            newchild.find(".productSummary").text(details["summary"]);
            newchild.find(".productOrderNumber").text("#" + details["OrderNumber"]);
            newchild.find(".productSerialNumber").text(details["serial_number"]);
            var price = details["productprice"];
            var newprice = PriceFormat(price);
            newchild.find(".productPrice").text(newprice);
            var Quantity = parseInt(details["productquantity"]);
            newchild.find(".productQuantity").text(Quantity).addClass("badge badge-info");
            var status = details["OrderStatus"];
            if (status === "Shipped") {
                newchild.find(".productStatus").text(status).addClass("badge badge-success");
            } else if (status === "Cancelled") {
                newchild.find(".productStatus").text(status).addClass("badge badge-primary");
            } else if (status === "Processing") {
                newchild.find(".productStatus").text(status).addClass("badge badge-danger");
            } else if (status === "Delivered") {
                newchild.find(".productStatus").text(status).addClass("badge badge-warning");
            }
            newchild.appendTo(parent).show();
        });
        $(".listedOrderedProductsNum").text(count);
        var image_url1 = extension + "global_assets/images/placeholders/product-0.png";
        $(".imagepopup").attr("href", image_url1);
        childclone.hide();
    }
}

function DisplayBusinessList(data) {
    var parent = $(".bizcontainer");
    parent.find(".newclone").remove();
    if (data === "none") {
        var childclone = parent.find(".bizclone");
        var newchild = childclone.clone();
        newchild.removeClass("bizclone");
        newchild.addClass("newclone");
        newchild.find(".businessName").text("No Businesses");
        newchild.appendTo(parent).show();
        childclone.hide();
    } else {
        $.each(data, function (id, details) {
            var childclone = parent.find(".bizclone");
            var newchild = childclone.clone();
            newchild.removeClass("bizclone");
            newchild.addClass("newclone");
            newchild.find(".businessName").text(details["Name"]);
            newchild.click(function () {
                data = [id, details["type"], "Staff"];
                GetData("Favorite", "GetUserFavorites", "LoadUserStaff", data);
                GetData("Favorite", "GetUserHistory", "LoadBusinessHistory", id);
                DisplayBusinessDetails(details);
            });
            newchild.appendTo(parent).show();
            childclone.hide();
        });
    }
    var image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
    $(".bizImage").attr("src", image_url);
    $(".profile-cover-img").css("background-image", "url('" + image_url + "')");
}

function DisplayBusinessDetails(data) {
    var bizid = data["userId"];
    var bizname = data["Name"];
    var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + bizid + ".png";
    if (imageExists(image_url) === false) {
        image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
    }
    sessionStorage.setItem("ActualUserBizID", bizid);
    sessionStorage.setItem("actualUserType", "Business");
    $(".bizImage").attr("src", image_url);
    $(".profile-cover-img").css("background-image", "url('" + image_url + "')");
    $(".bizname").text(bizname);
    $(".bizindus").text(data["BusinessIndustry"]);
    $(".biztyp").text(data["BusinessType"]);
    $(".bizdescriptn").text(data["Description"]);
    $(".bizdatefd").text(data["DateFounded"]);
    $(".bizcacnumb").text(data["CACNumber"]);
    $(".bizweb").text(data["Website"]);
    $(".bizemail").text(data["email"]);
    $(".bizphone").text(data["phone_number"]);
}

function DisplayBusinessStaffList(data) {
    var parent = $(".bizStaffList");
    if (data !== "none") {
        parent.find(".newclone").remove();
        var count = 0;
        $.each(data, function (id, details) {
            count++;
            var childclone = parent.find(".staffclone");
            var newchild = childclone.clone();
            newchild.removeClass("staffclone");
            newchild.removeClass("hide");
            newchild.addClass("newclone");
            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + id + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            newchild.find(".staff-image").attr("src", image_url);
            newchild.find(".staff-name").text(details["user_name"]);
            newchild.find(".staff-phone").text(details["phone_number"]);
            newchild.find(".staff-email").text(details["email"]);
            newchild.appendTo(parent).show();
            childclone.hide();
        });
        $(".biz-staff-count").text(count);
    } else {
        $(".biz-staff-count").text(0);
    }
}

function DisplayProductDetails(data, image_url) {
    var imagepopup = $(".imagepopup");
    imagepopup.click(function () {
        $(".product-details-image").attr("src", image_url);
        $(".imagepopup").attr("href", image_url);
    });
    var name = capitaliseFirstLetter(data["product_name"]);
    $(".product-detail-name").text(name);
    var price = PriceFormat(data["proposed_price"]);
    if (data["proposed_price"] === undefined) {
        price = PriceFormat(data["selling_price"]);
        $(".product-detail-price").text(price);
    } else {
        $(".product-detail-price").text(price);
    }
    $(".product-details-description").text(data["description"]);
    $(".product-detail-quantity").text(data["quantity"]);
    $(".product-id-gen").text(data["product_id"]);
    $(".product-detail-categoryname").text(data["category_name"]);
    $(".product-details-summary").text(data["summary"]);
    $(".product-details-ratings").text(data["ProductAverageRating"]);
    $(".product-details-reviews").text(data["reviewNumber"]);
    if (data["UserName"] !== undefined) {
        $(".product-details-owner-name").text(data["UserName"]);
    }
    if (data["SupplierName"] !== undefined) {
        $(".product-details-owner-name").text(data["SupplierName"]);
    }
    if (data["ProductOwnerName"] !== undefined) {
        $(".product-details-owner-name").text(data["ProductOwnerName"]);
    }
    if (data["UserPhone"] !== undefined) {
        $(".product-details-owner-phone").text(data["UserPhone"]);
    }
    if (data["SupplierPhone"] !== undefined) {
        $(".product-details-owner-phone").text(data["SupplierPhone"]);
    }
    if (data["ProductOwnerPhone"] !== undefined) {
        $(".product-details-owner-phone").text(data["ProductOwnerPhone"]);
    }



}

function DisplayShopProductDetails(data) {
    var id = data["product_id"];
    var image_url = extension + "global_assets/app/img/ProductImages/product-" + id + ".png";
    if (imageExists(image_url) === false) {
        image_url = extension + "global_assets/app/img/ProductImages/product-0.png";
    }
    var imagepopup = $(".shop_product_imagepopup");
    imagepopup.click(function () {
        $(".shop_product-details-image").attr("src", image_url);
        $(".shop_product_imagepopup").attr("href", image_url);
    });
    var name = capitaliseFirstLetter(data["name"]);
    $(".shop_product-detail-name").text(name);
    var price = PriceFormat(data["selling_price"]);
    $(".shop_product-detail-price").text(price);
    $(".shop_product-details-description").text(data["description"]);
    $(".shop_product-detail-quantity").text(data["quantity"]);
    $(".shop_product-id-gen").text(data["product_id"]);
    $(".shop_product-detail-categoryname").text(data["category_name"]);
    $(".shop_product-details-summary").text(data["summary"]);
    $(".shop_product-details-ratings").text(data["ProductAverageRating"]);
    $(".shop_product-details-reviews").text(data["reviewNumber"]);
    $(".shop_product-details-date").text(data["date_added"]);
    $(".shop_product-details-supplier-name").text(data["SupplierName"]);
    $(".shop_product-details-supplier-phone").text(data["SupplierPhone"]);
    $(".shop_product-details-approvedby").text(data["VerifiedByName"]);
    $(".shop_product-details-owner-name").text(data["ProductOwnerName"]);
    $(".shop_product-details-owner-phone").text(data["ProductOwnerPhone"]);
}

function DisplayContactAction(data) {
    swal({
        title: "Contact/Staff!",
        text: data,
        type: "success",
        showCancelButton: false,
        confirmButtonClass: 'btn btn-success',
        confirmButtonText: 'Ok!',
        onClose: function () {
            window.location.reload();
        }
    });
}

function listProduct() {//call this function from custom.js
    var PName = $("#prodName").val();
    var category = $("#prodCategories").val();
    var Summary = $("#prodSummary").val();
    var Description = $("#prodDesc").val();
    var quantity = $("#prod-prop-quantity").val();
    var price = $("#prod-prop-price").val();
    var tags = $("#prodtags").val();
    var properties = "";
    $.each($(".properties-group"), function (ind, item) {
        var propTxt = $(this).find(".prop-name").text();
        var propVal = $(this).find(".prop-val").val();
        properties = properties + propTxt + "-" + propVal + ";";
    });
    var data = [actualuserid, PName, category, Summary, Description, quantity, price, properties, tags];
    GetData("Product", "ListMemberProduct", "UploadProductImage", data);
}

function listBusiness() {//call this function from custom.js
    var bizindustry = $("#bizindustry").val();
    var biztype = $("#biztype").val();
    var bizname = $("#bizname").val();
    var bizdfound = $("#dateFound").val();
    var bizcacnumber = $(".bizCACNumber").val();
    var bizemail = $(".bizEmail").val();
    var bizphone = $(".bizPhone").val();
    var bizwebadd = $("#bizWebaddress").val();
    var bizdescription = $(".bizDesc").val();
    var data = [actualuserid, bizindustry, biztype, bizname, bizdfound, bizcacnumber, bizemail, bizphone, bizwebadd, bizdescription];
    GetData("User", "BusinessRegistration", "UploadUserImage", data);
}
function listBusiness2() {//call this function from custom.js
    var bizindustry = $("#bizindustry2").val();
    var biztype = $("#biztype2").val();
    var bizname = $(".BizName").val();
    var bizdfound = $("#dateFound").val();
    var bizcacnumber = $(".BizCacNumber").val();
    var bizemail = $(".BizEmail").val();
    var bizphone = $(".BizPhone").val();
    var bizwebadd = $(".BizWebAddress").val();
    var bizdescription = $(".BizDesc").val();
    var newUserID = $(".newUserID").val();
    var data = [newUserID, bizindustry, biztype, bizname, bizdfound, bizcacnumber, bizemail, bizphone, bizwebadd, bizdescription];
    GetData("User", "BusinessRegistration", "UploadUserImage2", data);
}

function DisplayTopCategories(data, parent) {
    parent.empty();
    if (data === "none") {
    } else {
        parent.append($('<option/>').val(0).text("Select Category"));
        $.each(data, function (id, name) {
            $("<option />", {text: capitaliseFirstLetter(name), value: id}).appendTo(parent);
        });
        parent.change(function () {
            var catid = $(this).val();
//            var catname = $('#prodTopCategories :selected').text();
            GetData("Category", "GetCategories", "LoadCategories", catid);
            GetData("Category", "GetCategoryProperties", "LoadCategoryProps", catid);
            GetData("Category", "GetCategoryProperties", "LoadCategoryVariants", catid);
        });
        var topcat = $(".topcat");
        topcat.empty();
        topcat.append($('<option/>').val(0).text("Select Category"));
        $.each(data, function (id, name) {
            $("<option />", {text: capitaliseFirstLetter(name), value: id}).appendTo(topcat);
        });
        topcat.change(function () {
            var catid = $(this).val();
//            var catname = $('#prodTopCategories :selected').text();
            GetData("Category", "GetCategories", "LoadCategories", catid);
        });
    }
}

function DisplayCategories(data, parent) {
    parent.empty();
    if (data === "none") {
        $(".prod-cat-info").addClass("hide");
        $(".prod-cat-info").hide();
        $(".prod-info").addClass("hide");
        $(".prod-info").hide();
    } else {
        parent.append($('<option/>').val(0).text("Select Category"));
        $.each(data, function (id, name) {
            $("<option />", {text: capitaliseFirstLetter(name), value: id}).appendTo(parent);
        });
        $(".prod-cat-info").removeClass("hide");
        $(".prod-cat-info").show();
        $(".prod-info").removeClass("hide");
        $(".prod-info").show();
        parent.change(function () {
            var catid = $(this).val();
            GetData("Category", "GetSubCategories", "LoadSubCategory", catid);
        });
        var cat = $(".cat");
        cat.empty();
        cat.append($('<option/>').val(0).text("Select Category"));
        $.each(data, function (id, name) {
            $("<option />", {text: capitaliseFirstLetter(name), value: id}).appendTo(cat);
        });
        cat.change(function () {
            var catid = $(this).val();
            GetData("Category", "GetSubCategories", "LoadSubCategory", catid);
        });
    }
}

function DisplaySubCategories(data, parent) {
    parent.empty();
    if (data === "none") {
        $(".prod-sub-cat-info").addClass("hide");
        $(".prod-sub-cat-info").hide();
    } else {
        parent.append($('<option/>').val(0).text("Select Category"));
        $.each(data, function (id, name) {
            $("<option />", {text: capitaliseFirstLetter(name), value: id}).appendTo(parent);
        });
        $(".prod-sub-cat-info").removeClass("hide");
        $(".prod-sub-cat-info").show();
        var subcat = $(".subcat");
        subcat.empty();
        subcat.append($('<option/>').val(0).text("Select Category"));
        $.each(data, function (id, name) {
            $("<option />", {text: capitaliseFirstLetter(name), value: id}).appendTo(subcat);
        });
    }
}

function DisplayCategoryProps(data, parent) {

    parent.empty();
    if (data === "none") {
    } else {
        $.each(data, function (id, name) {
            var group = $("<div />", {class: "form-group parts-top marginright halfwide-minus-padding properties-group"}).appendTo(parent);
            $("<label />", {for : "#prod-prop" + id, text: capitaliseFirstLetter(name)}).appendTo(group);
            $("<input />", {class: "form-control prop-val", placeholder: "Nil", id: "prod-prop" + id}).appendTo(group);
            $("<div />", {class: "prop-name", text: name}).appendTo(group).hide();
        });
    }
}

function DisplayProductCategoryVariants(data, parent) {
//        parent.empty();
    if (data === "none") {
    } else {
        var variant = (".variantSelect");
        var variant1 = parent.find("#variantSelect1");
        var variant2 = parent.find("#variant2Select");
        var variantValue = parent.find(".variantValueSelect");
        var variantValue1 = parent.find("#variantValueSelect1");
        var variantValue2 = parent.find("#variant2ValueSelect");
        $.each(data, function (id, name) {
            $("<option />", {
                text: capitaliseFirstLetter(name),
                value: id
            }).appendTo(variant);
        });
        variant1.change(function () {
            var variantID = variant1.val();
            GetData("Category", "GetCategoryVariantValues", "LoadCategoryVariantValues", variantID);
        });
    }
}

function DisplayProductCategoryVariantValues(data, parent) {
//        parent.empty();
    if (data === "none") {
    } else {
        var values = data["values"].split(",");
        $.each(values, function (id, value) {
            $("<option />", {
                text: value,
                value: id
            }).appendTo(parent);
        });
    }
}

function DisplayProductUnits(data, parent) {
    parent.empty();
    if (data == "none") {
        parent.text("No Units");
    } else {
        parent.append($('<option/>').val(0).text("Select Unit"));
        $.each(data, function (id, Unit) {
            var unitName = Unit["abbreviation"] + " - " + " (" + Unit["name"] + ") " + " : " + Unit["description"];
            $("<option />", {
                text: capitaliseFirstLetter(unitName),
                value: id
            }).appendTo(parent);
        });
    }
}

function DisplayProductHscodes(data, parent) {
    parent.empty();
    if (data == "none") {
        parent.text("No codes");
    } else {
        parent.append($('<option/>').val(0).text("type hscode or product name"));
        $.each(data, function (id, code) {
            var code = code["hscode"] + " - " + code["description"]
            $("<option />", {
                text: capitaliseFirstLetter(unitName),
                value: id
            }).appendTo(parent);
        });
    }
}

function DisplayUnreadMessages(data) {
    var parent = $(".unreadmessagelist");
    parent.find(".newclone").remove();
    if (data !== "none") {
        var ids = data[0];
        var msgdetails = data[1];
        var childclone = parent.find(".unreadclone").removeClass("hide");
        $.each(ids, function (index, id) {
            var result = msgdetails[id];
            var newchild = childclone.clone();
            newchild.removeClass("unreadclone");
            newchild.addClass("newclone");
            var uid = result["from_member_id"];
            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + uid + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            newchild.find(".unreadMsgImage").attr("src", image_url);
            var btndetails = newchild.find(".unreadMsgSubject").text(result["subject"]);
            newchild.find(".unreadMsgBody").text(result["body"]);
            newchild.find(".unreadMsgTime").text(result["msgtime"]);
//            btndetails.click(function () {
//                var msgid = result["id"];
//                GetData("Messages", "MarkAsRead", "", msgid);
//                $("#ReadMessage").removeClass("hide");
//                $("#ReadMessage").show();
//
//                $("#InboxMessage").addClass("hide");
//                $("#InboxMessage").hide();
//                $("#TrashMessage").addClass("hide");
//                $("#TrashMessage").hide();
//                $("#SentMessage").addClass("hide");
//                $("#SentMessage").hide();
//                DisplayMessageDetails(result, data[2]);
//            });
            newchild.appendTo(parent).show();
        });
        $(".unreadcount").text(data[2]);
        childclone.hide();
    } else {
        $("<li />", {class: "wide center clone-child", text: "No Result", colspan: "6"}).appendTo(parent);
    }
}

function DisplayListAndUnlistShopProduct(data) {
    hideLoader();
    if (data === "success") {
        swal({
            title: "List / Unlist Product!",
            text: "Succesful",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "List / Unlist Product",
            text: "Oops!, something went wrong, please try again.",
            type: "error",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    }

}

function DisplayRestockShopProduct(data) {
    hideLoader();
    if (data === "success") {
        swal({
            title: "Restock Product!",
            text: "Succesful",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Restock Product",
            text: "Oops!, something went wrong, please try again.",
            type: "error",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    }

}

function DisplayEditShopProduct(data) {
    hideLoader();
    if (data === "success") {
        swal({
            title: "Shop Product!",
            text: "Succesful update",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Shop Product",
            text: "Oops!, something went wrong, please try again.",
            type: "error",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    }

}

function DisplayPlacedOrderDetails(data) {
    if (data[0] !== "none") {
        $.each(data[0], function (id, order) {
            $("#orderDetailNumber").text(order["ordernumber"]);
            $("#orderDetailDate").text(order["bookeddate"]);
            $(".orderDetailUserName").text(order["UserName"]);
            $("#orderBuyerUserID").text(order["BuyerUserID"]);
            $("#orderDetailAddress").text(order["deliveryaddress"]);
            $("#orderDetailPhone").text(order["UserPhone"]);
            $("#orderDetailEmail").text(order["UserEmail"]);
            var stats = order["status"];
            var ordercnt = $("#orderDetailStatus");
            ordercnt.empty();
            if (stats === "Pending") {
                ordercnt.addClass("badge badge-info  badge-rounded").text("Pending Confirmation");
                $("#cancelOrder").removeClass("hide");
                $("#cancelOrder").show();
                $("#confirmOrder").removeClass("hide");
                $("#confirmOrder").show();
                $(".orderDetsupName").addClass("hide");
                $(".orderDetsupName").hide();
                $(".orderDetActn").addClass("hide");
                $(".orderDetActn").hide();
                $("#confirmDelivery").addClass("hide");
                $("#confirmDelivery").show();
            } else if (stats === "Processing") {
                ordercnt.addClass("badge badge-warning  badge-rounded").text("Processing");
                $("#cancelOrder").addClass("hide");
                $("#cancelOrder").hide();
                $("#confirmOrder").addClass("hide");
                $("#confirmOrder").hide();
                $("#confirmDelivery").addClass("hide");
                $("#confirmDelivery").hide();
                $(".orderDetsupName").removeClass("hide");
                $(".orderDetsupName").show();
                $(".orderDetActn").removeClass("hide");
                $(".orderDetActn").show();
                $(".sumbitIncomplete").removeClass("hide");
                $(".sumbitIncomplete").show();
            } else if (stats === "Cancelled") {
                ordercnt.addClass("badge badge-danger  badge-rounded").text("Cancelled");
                $("#cancelOrder").addClass("hide");
                $("#cancelOrder").hide();
                $("#confirmOrder").addClass("hide");
                $("#confirmOrder").hide();
                $("#confirmDelivery").addClass("hide");
                $("#confirmDelivery").hide();
                $(".orderDetsupName").removeClass("hide");
                $(".orderDetsupName").show();
                $(".orderDetActn").removeClass("hide");
                $(".orderDetActn").show();
            } else if (stats === "Shipped") {
                ordercnt.addClass("badge badge-primary  badge-rounded").text("Shipped");
                function shipped() {
                    $("#cancelOrder").removeClass("hide");
                    $("#cancelOrder").show();
                    $("#confirmOrder").addClass("hide");
                    $("#confirmOrder").hide();
                    $("#confirmDelivery").removeClass("hide");
                    $("#confirmDelivery").show();
                    $(".orderDetsupName").removeClass("hide");
                    $(".orderDetsupName").show();
                    $(".orderDetActn").removeClass("hide");
                    $(".orderDetActn").show();
                }
                //function to allow verifier to confirm delivery or not using his location
                navigator.geolocation.getCurrentPosition(
                        function success(position) {
                            $.ajax('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyCNBHWAnRGzp1k_q6pev8LcIW8hWnXeKic')
                                    .then(
                                            function success(response) {
                                                if (response.status === "OK") {
                                                    var BusStop = response.results[0].address_components[0].long_name;
//                                                    var BusStop = "Suberu Town";
                                                    if (order["deliveryaddress"].includes("Pick")) {
                                                        //Verifier can confirm order because the address is in the pickup centre
                                                        shipped();
                                                    } else if (order["deliveryaddress"].includes(BusStop)) {
                                                        //Verifier can confirm order because he is in  the location
                                                        shipped();
                                                    } else {
                                                        //Verifier can not confirm order if he is not in  the location
                                                        $("#cancelOrder").removeClass("hide");
                                                        $("#cancelOrder").show();
                                                        $("#confirmOrder").addClass("hide");
                                                        $("#confirmOrder").hide();
                                                        $("#confirmDelivery").removeClass("hide");
                                                        $("#confirmDelivery").hide();
                                                        $(".orderDetsupName").removeClass("hide");
                                                        $(".orderDetsupName").show();
                                                        $(".orderDetActn").removeClass("hide");
                                                        $(".orderDetActn").show();
                                                    }
                                                } else {
                                                    //Verifier can confirm order because geolocation did not work probably the key did not work
                                                    shipped();
                                                }
                                            },
                                            function fail(status) {
                                                //Verifier can confirm order because geolocation did not work probably due to network
                                                shipped();
                                            }
                                    );
                        },
                        function error(error_message) {
                            //Verifier can confirm order because geolocation will not work due to user not allowing google location activation
                            shipped();
                        }
                );
            } else if (stats === "Delivered") {
                ordercnt.addClass("badge badge-success  badge-rounded").text("Delivered");
                $("#cancelOrder").addClass("hide");
                $("#cancelOrder").hide();
                $("#confirmOrder").addClass("hide");
                $("#confirmOrder").hide();
                $("#confirmDelivery").addClass("hide");
                $("#confirmDelivery").hide();
                $(".orderDetsupName").removeClass("hide");
                $(".orderDetsupName").show();
                $(".orderDetActn").removeClass("hide");
                $(".orderDetActn").show();
            }

            var deliveryfees = order["deliveryfee"];
            var Deliveryfees = PriceFormat(deliveryfees);
            $("#DeliDetailFees").text(Deliveryfees);
            var amt = order["amount"];
            var totalamt = PriceFormat(amt);
            var subtotal = amt - deliveryfees;
            $("#subDetailTotal").text(PriceFormat(subtotal));
            $(".totalDetailAmount").text(totalamt);
            $("#OrderID").text(id);
            var orderProductIds = data[2][id];
            var parent = $("#ProductOrderDetails");
            parent.find(".newclone").remove();
            var childclone = parent.find(".orderDetailsClone");
            var count = 0;
            $.each(orderProductIds, function (index, prodid) {
                var prod = data[1][prodid];
                var newchild = childclone.clone();
                count++;
                newchild.removeClass("orderDetailsClone");
                newchild.removeClass("hide");
                newchild.addClass("newclone");
                var name = capitaliseFirstLetter(prod["name"]);
                newchild.find(".orderDetSn").text(count);
                newchild.find(".orderDetPName").text(name);
                newchild.find(".orderDetDesc").text(prod["description"]);
                var qty = parseInt(prod["pquantity"]);
                newchild.find(".orderDetQuantity").text(qty);
                newchild.find(".orderDetSerialNum").text(prod["serial_number"]);
                var price = parseInt(prod["pamount"]);
                var unitprice = parseInt(prod["price"]);
                newchild.find(".orderDetUnitPrice").text(PriceFormat(unitprice));
                newchild.find(".orderDetPrice").text(PriceFormat(price));
                if (prod["accepted_by_id"] === "0") {
                    newchild.find(".orderDetProcessed").text("No").addClass("badge badge-danger");
                    newchild.find(".assignSupplier").removeClass("hide");
                    newchild.find(".assignSupplier").show();
                    newchild.find(".SupplierDetails").addClass("hide");
                    newchild.find(".SupplierDetails").hide();
                } else {
                    newchild.find(".orderDetProcessed").text("Yes").addClass("badge badge-success");
                    newchild.find(".orderSupplierName").text(prod["SupName"]);
                    newchild.find(".orderSupplierPhone").text(prod["SupPhone"]);
                    newchild.find(".assignSupplier").addClass("hide");
                    newchild.find(".assignSupplier").hide();
                    newchild.find(".SupplierDetails").removeClass("hide");
                    newchild.find(".SupplierDetails").show();
                }
                newchild.find(".assignSupplier").click(function () {
                    DefaultShopProductSupplier(prod);
                });
                newchild.find(".SupplierDetails").click(function () {
                    var id = prod["accepted_by_id"];
                    $(".prodSupname").text(prod["SupName"]);
                    GetData("Product", "GetUserProducts", "LoadUserProducts", id);
                    GetData("Product", "GetUserOrderedProducts", "LoadUserOrderedProducts", id);
                });
                newchild.appendTo(parent).show();
            });
            childclone.hide();
        });
    }
}

function DefaultShopProductSupplier(data) {
    $(".defaultPName").text(data["name"]);
    $(".defaultPrice").text(PriceFormat(data["selling_price"]));
    $(".defaultQuantity").text(data["quantity"]);
    $(".defaultSupplierName").text(data["ProductOwnerName"]);
    $(".defaultSupplierPhone").text(data["ProductOwnerPhone"]);
    $(".defaultSupplierID").text(data["productOnwerID"]);
    $(".OrderID").text(data["OrderID"]);
    $(".OrderHistoryID").text(data["orderHistoryID"]);
    var OrdID = data["OrderID"];
    var productOnwerID = data["productOnwerID"];
    var orderHistoryID = data["orderHistoryID"];
    $(".GetAltSupplier").click(function () {
        $(".altSupplier").show();
        $(".altSupplier").removeClass("hide");
        GetData("Product", "GetProductSuppliers", "LoadProductSuppliers", data["name"]);
    });
    $(".assignToDefSupplier").click(function () {
        swal({
            title: 'Assign Product?',
            html: 'Assign this product after confirming that <span class="font-weight-bold">' + data["ProductOwnerName"] + '</span> can deliver the product?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No!',
            closeOnConfirm: false,
            closeOnCancel: false,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-warning',
            buttonsStyling: false
        }).then(function (dismiss) {
            if (dismiss.value) {
                data = [OrdID, productOnwerID, orderHistoryID];
                showLoader();
                GetData("Order", "ProcessOrder", "LoadOrderOption", data);
            } else {
                swal({
                    title: 'Cancelled',
                    text: "Cancelled!",
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'Ok!',
                    confirmButtonClass: 'btn btn-success',
                    buttonsStyling: false
                });
            }
        });
    }
    );
}

function DisplayOrderOption(data) {
    hideLoader();
    if (data[0] === "Cancel") {
        if (data[1] === "success") {
            swal({
                title: "Cancel Orders",
                text: "Your order has been cancelled",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success btn-sm',
                confirmButtonText: "Ok",
                onClose: function () {
                    $(".orderdetails-modal").modal("hide");
                    window.location.reload();
                }
            });
        } else {
            swal({
                title: "Oops!",
                text: "Something went wrong!",
                type: "info",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-info btn-sm',
                confirmButtonText: 'Ok',
                onClose: function () {
                    $(".orderdetails-modal").modal("hide");
                    window.location.reload();
                }
            });
        }
    } else if (data[0] === "Delete") {
        if (data[1] === "successful" || data[1] === "success") {
            swal({
                title: "My Orders",
                text: "Your order has been deleted",
                type: "success",
                confirmButtonClass: 'btn btn-success btn-sm',
                confirmButtonText: "Ok",
                onClose: function () {
                    $(".orderdetails-modal").modal("hide");
                    window.location.reload();
                }
            });
        } else {
            swal({
                title: "Oops!",
                text: "Something went wrong",
                type: "info",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-info btn-sm',
                confirmButtonText: 'Ok',
                onClose: function () {
                    $(".orderdetails-modal").modal("hide");
                    window.location.reload();
                }
            });
        }
    } else if (data[0] === "Confirm") {
        if (data[1] === "successful" || data[1] === "success") {
            swal({
                title: "Orders",
                text: "The order has been Confirmed",
                type: "success",
                confirmButtonClass: 'btn btn-success btn-sm',
                confirmButtonText: "Ok",
                onClose: function () {
                    $(".orderdetails-modal").modal("hide");
                    window.location.reload();
                }
            });
        } else {
            swal({
                title: "Oops!",
                text: "Something went wrong",
                type: "info",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-info btn-sm',
                confirmButtonText: 'Ok',
                onClose: function () {
                    window.location.reload();
                }
            });
        }
    } else if (data[0] === "Delivered") {
        if (data[1] === "successful" || data[1] === "success") {
            swal({
                title: "Orders",
                text: "The order has been Delivered",
                type: "success",
                confirmButtonClass: 'btn btn-success btn-sm',
                confirmButtonText: "Ok",
                onClose: function () {
                    $(".orderdetails-modal").modal("hide");
                    window.location.reload();
                }
            });
        } else {
            swal({
                title: "Oops!",
                text: "Something went wrong",
                type: "info",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-info btn-sm',
                confirmButtonText: 'Ok',
                onClose: function () {
                    window.location.reload();
                }
            });
        }
    } else if (data[0] === "Assigned") {
        if (data[1] === "successful" || data[1] === "success") {
            swal({
                title: "Orders",
                text: "The product has been assigned.",
                type: "success",
                confirmButtonClass: 'btn btn-success btn-sm',
                confirmButtonText: "Ok",
                onClose: function () {
                    window.location.reload();
                }
            });
        } else {
            swal({
                title: "Oops!",
                text: "Something went wrong",
                type: "info",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-info btn-sm',
                confirmButtonText: 'Ok',
                onClose: function () {
                    window.location.reload();
                }
            });
        }
    }
}

function DisplayPickUpCenterOption(data) {
    hideLoader();
    if (data === "success") {
        swal({
            title: "Pick-Up Center Added",
            text: "Successful",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success btn-sm',
            confirmButtonText: "Ok",
            onClose: function () {
                $(".add-pickup-centre-modal").modal("hide");
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info btn-sm',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
                $(".add-pickup-centre-modal").modal("hide");
            }
        });
    }
}
function DisplayAddAddressType(data) {
    hideLoader();
    if (data === "success") {
        swal({
            title: "Address Type  Added",
            text: "Successful",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success btn-sm',
            confirmButtonText: "Ok",
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info btn-sm',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}
function DisplayDeleteAddressTypes() {
    hideLoader();
    swal({
        title: "Address Type  Deleted",
        text: "Successful",
        type: "success",
        showCancelButton: false,
        confirmButtonClass: 'btn btn-success btn-sm',
        confirmButtonText: "Ok",
        onClose: function () {
            window.location.reload();
        }
    });
}

function DisplayGetAllCategories(data) {
    hideLoader();
    var List = data[0];
    var CatIDs = data[1];
    var SubCatIDs = data[2];
    var parent = $("#all-cat-list");
    if (data === "none") {
        parent.text("No Result");
    } else {
//-------------------TOp Categery Start----------------------//
        var childclone = parent.find(".clone");
        $.each(List, function (topcatid, details) {
            var newchild = childclone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("topcategory-clone");
            var btntopcatname = newchild.find(".top-cat-name").text(capitaliseFirstLetter(details["name"]));
            btntopcatname.click(function () {
//                LoadProductPage(topcatid);
            });
            //-------------------Categery Start----------------------//
            var Categories = CatIDs[topcatid];
            var catParent = newchild.find(".cat-list");
            var catclone = catParent.find(".cat-clone");
            $.each(Categories, function (cid, catdetails) {
                var catid = catdetails["id"];
                var catchild = catclone.clone();
                catchild.removeClass("cat-clone");
                catchild.removeClass("hide");
                catchild.addClass("category-clone");
                var btncatname = catchild.find(".cat-name").text(capitaliseFirstLetter(catdetails["name"]));
                btncatname.click(function () {
//                    LoadProductPage(catid);
                });
                //-------------------Sub Categery Start----------------------//
                var SubCategories = SubCatIDs[catid];
                var subcatParent = newchild.find(".sub-cat-list");
                var subcatclone = subcatParent.find(".sub-cat-clone");
                $.each(SubCategories, function (sid, subcatdetails) {
                    var subid = subcatdetails["id"];
                    var subcatchild = subcatclone.clone();
                    subcatchild.removeClass("sub-cat-clone");
                    subcatchild.removeClass("hide");
                    subcatchild.addClass("subcategory-clone");
                    var subbtncatname = subcatchild.find(".sub-cat-name").text(capitaliseFirstLetter(subcatdetails["name"]));
                    subbtncatname.click(function () {
//                        LoadProductPage(subid);
                    });
                    subcatchild.appendTo(subcatParent);
                });
                subcatclone.hide();
                //-------------------Sub Categery End----------------------//

                catchild.appendTo(catParent);
            });
            catclone.hide();
            //-------------------Categery End----------------------//

            newchild.appendTo(parent);
        });
        childclone.hide();
        //-------------------Top Categery End----------------------//
    }
    Accordion();
}

function DisplayListings(data, parent) {
    hideLoader();
    if (data === "none") {
        parent.text("No Listing");
    } else {
        var ids = data[0];
        parent.find(".newclone").remove();
        var count = 0;
        $.each(ids, function (index, id) {
            var details = data[1][id];
            count++;
            var childclone = parent.find(".listclone");
            var newchild = childclone.clone();
            newchild.removeClass("listclone");
            newchild.removeClass("hide");
            newchild.addClass("newclone");
            newchild.find(".list-fullname").text(details["fullname"]);
            newchild.find(".list-time").text(details["time_listed"]);
            newchild.find(".list-date").text(details["date_listed"]);
            newchild.find(".list-bid-count").text(details["bid_count"] + " Bid(s)");
            newchild.find(".list-status").text(capitaliseFirstLetter(details["status"]));
            var parentlistoffer = newchild.find(".parentlist-offer");
            var offered = details["offered"].split(";");
            var newoffered = cleanArray(offered);
            parentlistoffer.find(".newofferclone").remove();
            $.each(newoffered, function (ind, item) {
                var chilofferclone = parentlistoffer.find(".list-offer-clone");
                var newofferchild = chilofferclone.clone();
                newofferchild.removeClass("list-offer-clone");
                newofferchild.removeClass("d-none");
                newofferchild.addClass("newofferclone");
                var o_defId = item.split("-")[0];
                var o_value = item.split("-")[1];
                var o_cls = "";
                if (o_defId === "1") {
                    o_cls = "Market Warrants";
                } else if (o_defId === "2") {
                    o_cls = "Reflation Rights";
                } else if (o_defId === "3") {
                    o_cls = "Par Cash Rights";
                }
                if (o_defId !== "") {
                    newofferchild.find(".list-offer").text(o_cls);
                    var r_amt = PriceFormat(o_value);
                    newofferchild.find(".list-offer-value").text(r_amt);
                }

                newofferchild.appendTo(parentlistoffer).show();
                chilofferclone.hide();
            });
            var parentlistexpect = newchild.find("#parentlist-expect");
            var requested = details["requested"].split(";");
            var newrequested = cleanArray(requested);
            parentlistexpect.find(".newexpectclone").remove();
            $.each(newrequested, function (ind, item) {
                var childexpectclone = parentlistexpect.find(".list-expect-clone");
                var newexpectchild = childexpectclone.clone();
                newexpectchild.removeClass("list-expect-clone");
                newexpectchild.removeClass("d-none");
                newexpectchild.addClass("newexpectclone");
                var r_defId = item.split("-")[0];
                var r_value = item.split("-")[1];
                var r_cls = "";
                if (r_defId === "1") {
                    r_cls = "Market Warrants";
                } else if (r_defId === "2") {
                    r_cls = "Reflation Rights";
                } else if (r_defId === "3") {
                    r_cls = "Par Cash Rights";
                }
                if (r_defId !== "") {
                    newexpectchild.find(".list-expect").text(r_cls);
                    var r_amt = PriceFormat(r_value);
                    newexpectchild.find(".list-expect-value").text(r_amt);
                }

                newexpectchild.appendTo(parentlistexpect).show();
                childexpectclone.hide();
            });
            newchild.appendTo(parent).show();
            childclone.hide();
        });
    }
}

function RegisterSempleMemberAndBusiness() {
    var firstname = $("#mycafirstname").val();
    var lastname = $("#mycalastname").val();
    var dob = $("#datepicker-myca").val();
    var phonenumber = $("#mycaphone").val();
    var password = $("#mycapassword").val();
    var emailaddress = $("#mycaemail").val();
    var gender = $("#mycagender").val();
    var bizindustry = $("#mycabizindustry").val();
    var biztype = $("#mycabiztype").val();
    var bizname = $("#mycabizname").val();
    var bizdfound = $("#datepicker-biz-myca").val();
    var bizcacnumber = $("#mycabizCACNumber").val();
    var bizemail = $("#mycabizEmail").val();
    var bizphone = $("#mycabizPhone").val();
    var bizwebadd = $("#mycabizWebaddress").val();
    var bizdescription = $("#mycabizDesc").val();
    var ContractPercentage = $(".mycaContractPerc").val();
    var TotalInventory = $(".mycaTotalInventory").val();
    var MinInventoryPerc = $(".mycaMinInventoryPerc").val();
    var WMMinInventory = $(".mycaWmMinInventory").val();
    var ContractCharges = $(".mycaContractCharges").val();
//            var ContractDuration = $("#contractDuration").val();
    var data = [firstname, lastname, emailaddress, phonenumber, password, gender, dob,
        userid, bizindustry, biztype, bizname, bizdfound, bizcacnumber, bizemail, bizphone, bizwebadd, bizdescription,
        ContractPercentage, TotalInventory, MinInventoryPerc, WMMinInventory, ContractCharges];
    $(".register-semple-business-modal").modal("hide");
    GetData("User", "RegisterAndSendSempleContract", "LoadRegisterAndSendSempleContract", data);
}

function DisplayActivateUser(data) {
    hideLoader();
    swal({
        title: "Manual Activation!",
        text: data,
        type: "success",
        showCancelButton: false,
        confirmButtonClass: 'btn btn-success',
        confirmButtonText: 'Ok!',
        onClose: function () {
            window.location.reload();
        }
    });
}

function DisplayUnAndPublishBook(data) {
    hideLoader();
    if (data[1] === "Publish") {
        if (data[0] === "success") {
            swal({
                title: " Book/Article " + data[1] + "ed",
                text: "Book/Article has been listed on Magazine",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'Ok!',
                onClose: function () {
                    window.location.reload();
                }
            });
        } else {
            swal({
                title: data[1] + " Book/Article",
                text: "Oops! Something went wrong, please try again.",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'Ok!',
                onClose: function () {
                    window.location.reload();
                }
            });
        }
    } else {
        if (data[0] === "success") {
            swal({
                title: " Book/Article " + data[1] + "ed",
                text: "Book/Article has been unlisted From Magazine",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'Ok!',
                onClose: function () {
                    window.location.reload();
                }
            });
        } else {
            swal({
                title: data[1] + " Book/Article",
                text: "Oops! Something went wrong, please try again.",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'Ok!',
                onClose: function () {
                    window.location.reload();
                }
            });
        }
    }


}

function DisplaySectionCheckInAndOut(data) {
    hideLoader();
    if (data[1] === "Check-In") {
        if (data[0] === "success") {
            swal({
                title: "Section",
                text: "Section has been Checked-In",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'Ok!',
                onClose: function () {
                    window.location.reload();
                }
            });
        } else {
            swal({
                title: "Section",
                text: "Oops! Something went wrong, please try again.",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'Ok!',
                onClose: function () {
                    window.location.reload();
                }
            });
        }
    } else {
        if (data[0] === "success") {
            swal({
                title: "Section",
                text: "Section has been Checked-Out",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'Ok!',
                onClose: function () {
                    window.location.reload();
                }
            });
        } else {
            swal({
                title: "Section",
                text: "Oops! Something went wrong, please try again.",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'Ok!',
                onClose: function () {
                    window.location.reload();
                }
            });
        }
    }


}

function DisplayAllBooks(data) {
    hideLoader();
    var status = sessionStorage.getItem("bookType");
    var parent = "";
    if (status === "AllBooks") {
        parent = $("#AllBookList");
    } else if (status === "PubBooks") {
        parent = $("#AllPubBookList");
    } else if (status === "UnpubBooks") {
        parent = $("#AllUnPubBookList");
    } else if (status === "AllArticles") {/////articles
        parent = $("#AllArticlesList");
    } else if (status === "PubArticles") {
        parent = $("#AllPubArticlesList");
    } else if (status === "UnpubArticles") {
        parent = $("#AllUnPubArticlesList");
    }
    if (data === "none") {
        parent.text("No Books");
    } else {
        var counter = 0;
        var childClone = parent.find(".clone");
        $.each(data, function (id, details) {
            counter++;
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            var image_url = extension + "global_assets/app/img/BookImages/book-" + id + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/BookImages/book-0.png";
            }
            newchild.find(".bkImage").attr("src", image_url);
            newchild.find(".bkName").text(details["Title"]);
            newchild.find(".bkSummary").text(details["Summary"]);
            newchild.find(".bkDateCreated").text(details["DateCreated"]);
            var status = details["Status"];
            var sta = newchild.find(".bkStatus");
            if (status === "1" || status === 1) {
                $("<span />", {class: "badge badge-flat border-success text-success-600", text: "Published"}).appendTo(sta);
            } else if (status === "0" || status === 1) {
                $("<span />", {class: "badge badge-flat border-danger text-danger-600", text: "UnPublished"}).appendTo(sta);
            }
            var btn = newchild.find(".ViewObject");
            btn.unbind("click").click(function () {
                UnBlockDetails(cardblock1);
                BookDetailsDisplay(details, image_url, "Book");
            });
            newchild.appendTo(parent);
        });
        childClone.hide();
    }
    var image_url1 = extension + "global_assets/app/img/BookImages/book-0.png";
    $(".ObjectImage").attr("src", image_url1);
}

function BookDetailsDisplay(data, image_url, object) {
    $(".ObjectName").text(data["Title"]);
    $(".ObjectImage").attr("src", image_url);
    $(".ObjectSummary").text(data["Summary"]);
    $(".ObjectCreatorName").text(data["CreatorName"]);
    $(".ObjectCategoryName").text(data["CategoryName"]);
    $(".ObjectDateDateCreated").text(data["DateCreated"]);
    $(".ObjectEditorName").text(data["EditorName"]);
    $(".ObjectLastUpdatedDate").text(data["LastUpdatedDate"]);
    $(".ObjectLastUpdatedTime").text(data["LastUpdatedTime"]);
    $(".ObjectObjectType").text(object);
    $(".ObjectSectionCounts").text(data["Sections"]);
    $(".ObjectIndexCounts").text(data["Indexes"]);
    $(".ObjectCommentCounts").text(data["Comments"]);
    $(".ObjectTagCounts").text(data["Tags"]);
    $(".ObjectBookmarkCounts").text(data["Bookmarks"]);
    $(".ObjectID").text(data["BookID"]);
    var status = data["Status"];
    if (status === 1 || status === "1") {
        $(".pubBooks").addClass("hide");
        $(".unpubBooks").removeClass("hide");
        $(".pubArticles").addClass("hide");
        $(".unpubArticles").removeClass("hide");
    } else if (status === 0 || status === "0") {
        $(".unpubBooks").addClass("hide");
        $(".pubBooks").removeClass("hide");
        $(".unpubArticles").addClass("hide");
        $(".pubArticles").removeClass("hide");
    }

}

function DisplayAllSections(data) {
    hideLoader();
    var status = sessionStorage.getItem("sectionType");
    var parent = "";
    if (status === "AllSections") {
        parent = $("#AllSectionList");
    } else if (status === "CheckInSections") {
        parent = $("#AllCheckInSectionList");
    } else if (status === "CheckOutSections") {
        parent = $("#AllCheckOutSectionList");
    }

    if (data === "none") {
        parent.text("No Books");
    } else {
        var counter = 0;
        var childClone = parent.find(".clone");
        $.each(data, function (id, details) {
            counter++;
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.find(".sectionName").text(details["Name"]);
            newchild.find(".sectionlastEdited").text(details["last_edited"]);
            var status = details["check_status"];
            var sta = newchild.find(".bkStatus");
            if (status === "1" || status === 1) {
                $("<span />", {class: "badge badge-flat border-success text-success-600", text: "Checked-In"}).appendTo(sta);
            } else if (status === "0" || status === 1) {
                $("<span />", {class: "badge badge-flat border-danger text-danger-600", text: "Checked-Out"}).appendTo(sta);
            }
            var btn = newchild.find(".ViewObject");
            btn.unbind("click").click(function () {
                UnBlockDetails(cardblock1);
                SectionDetails(details);
            });
            newchild.appendTo(parent);
        });
        childClone.hide();
    }
}

function SectionDetails(data) {
    $(".ObjectName").text(data["Name"]);
    $(".ObjectsectionBookTitle").text(data["sectionBookTitle"]);
    $(".ObjectIndexNumber").text(data["indexNum"]);
    $(".ObjectLastUpdatedDate").text(data["last_edited"]);
    $(".ObjectIndexCounts").text(data["Indexes"]);
    $(".ObjectCommentCounts").text(data["Comments"]);
    $(".ObjectBookmarkCounts").text(data["Bookmarks"]);
    $(".ObjectTagCounts").text(data["Tags"]);
    $(".ObjectID").text(data["id"]);
    var status = data["check_status"];
    if (status === 1 || status === "1") {
        $(".chkInSection").addClass("hide");
        $(".chkOutSection").removeClass("hide");
    } else if (status === 0 || status === "0") {
        $(".chkOutSection").addClass("hide");
        $(".chkInSection").removeClass("hide");
    }
}

function DisplayAllKeywords(data) {
    hideLoader();
    var parent = $("#AllKeywordList");
    if (data === "none") {
        parent.text("No Keywords");
    } else {
        var counter = 0;
        var Ids = data[0];
        var Names = data[1];
        var childClone = parent.find(".clone");
        $.each(Ids, function (index, id) {
            counter++;
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            var objectView = newchild.find(".keyName").text(Names[id]);
            objectView.unbind("click").click(function () {
                UnBlockDetails(cardblock1);
                KeywordDetails(Names[id], id);
            });
            newchild.appendTo(parent);
        });
        childClone.hide();
    }
}

function KeywordDetails(name, id) {
    $(".ObjectkeyName").text(name);
    $(".ObjectkeyID").text(id);
}

function DisplayAllTags(data) {
    hideLoader();
    var parent = $("#AllTagList");
    if (data === "none") {
        parent.text("No tags");
    } else {
        var counter = 0;
        var childClone = parent.find(".clone");
        $.each(data, function (id, details) {
            counter++;
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            var objectView = newchild.find(".TagName").text(details["name"]);
            objectView.unbind("click").click(function () {
                UnBlockDetails(cardblock1);
                TagDetails(details);
            });
            newchild.appendTo(parent);
        });
        childClone.hide();
    }
}

function TagDetails(details) {
    $(".ObjectTagName").text(details["name"]);
    $(".ObjectTagID").text(details["id"]);
    $(".ObjectTagComments").text(details["Comments"]);
    $(".ObjectTagBookmarks").text(details["Bookmarks"]);
    $(".ObjectTagSections").text(details["Sections"]);
    $(".ObjectTagBooks").text(details["Books"]);
    $(".ObjectTagIndexes").text(details["Indexes"]);
}

function DisplayAllComments(data) {
    hideLoader();
    var parent = $("#AllCommentList");
    if (data === "none") {
        parent.text("No tags");
    } else {
        var counter = 0;
        var childClone = parent.find(".clone");
        $.each(data, function (id, details) {
            counter++;
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            var image_url = extension + "global_assets/app/img/ProfilePicture/user-" + details["UserID"] + ".png";
            if (imageExists(image_url) === false) {
                var image_url = extension + "global_assets/app/img/ProfilePicture/user-0.png";
            }
            newchild.find(".commUserImage").attr("src", image_url);
            newchild.find(".commUserName").text(details["UserName"]);
            newchild.find(".commComment").text(details["comment"]);
            newchild.find(".commTime").text(details["time"]);
            newchild.find(".commLike").text(details["likes"]);
            newchild.find(".commDislike").text(details["dislikes"]);
            var objectView = newchild.find(".commObjectView");
            objectView.unbind("click").click(function () {
                UnBlockDetails(cardblock1);
                CommentDetails(details);
            });
            newchild.appendTo(parent);
        });
        childClone.hide();
    }
}

function CommentDetails(details) {
    $(".objectCommcomment").text(details["comment"]);
    $(".ObjectD").text(details["id"]);
    $(".ObjectUserName").text(details["UserName"]);
    $(".ObjectDateCreated").text(details["date"]);
    $(".ObjectTimeCreated").text(details["time"]);
    $(".ObjectLikes").text(details["likes"]);
    $(".ObjectDislikes").text(details["dislikes"]);
    $(".ObjectCommBookmark").text(details["Bookmarks"]);
    $(".ObjectCommSection").text(details["Sections"]);
    $(".ObjectCommBooks").text(details["Books"]);
    $(".ObjectCommIndex").text(details["Indexes"]);
    $(".ObjectCommTag").text(details["Tags"]);
}

function DisplayAllIndexes(data) {
    hideLoader();
    var parent = $("#AllIndexList");
    if (data === "none") {
        parent.text("No indexes");
    } else {
        var counter = 0;
        var childClone = parent.find(".clone");
        $.each(data, function (id, details) {
            counter++;
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.find(".indexHeader").text(details["header"]);
            newchild.find(".indexSubHeader").text(details["subheader"]);
            newchild.find(".indexContent").text(details["body_text"]);
            var objectView = newchild.find(".indexObjectView");
            objectView.unbind("click").click(function () {
                UnBlockDetails(cardblock1);
                IndexDetails(details);
            });
            newchild.appendTo(parent);
        });
        childClone.hide();
    }
}

function IndexDetails(details) {
    $(".objectindexHeader").text(details["header"]);
    $(".objectindexSubHeader").text(details["subheader"]);
    $(".ObjectD").text(details["id"]);
    $(".ObjectindexText").text(details["body_text"]);
    $(".ObjectindexBookmark").text(details["Bookmarks"]);
    $(".ObjectindexSection").text(details["Sections"]);
    $(".ObjectindexBook").text(details["Books"]);
    $(".ObjectindexComment").text(details["Comments"]);
    $(".ObjectindexTag").text(details["Tags"]);
}

function DisplayAllBookmarks(data) {
    hideLoader();
    var parent = $("#AllBookmarkList");
    if (data === "none") {
        parent.text("No BookMarks");
    } else {
        var counter = 0;
        var childClone = parent.find(".clone");
        $.each(data, function (id, details) {
            counter++;
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.find(".bkmkName").text(details["object_text"]);
            var objectView = newchild.find(".bkmkObjectView");
            objectView.unbind("click").click(function () {
                UnBlockDetails(cardblock1);
                BookmarkDetails(details);
            });
            newchild.appendTo(parent);
        });
        childClone.hide();
    }
}

function BookmarkDetails(details) {
    $(".ObjectD").text(details["id"]);
    $(".ObjectbkmkName").text(details["object_text"]);
    $(".ObjectbkmkIndexes").text(details["Indexes"]);
    $(".ObjectbkmkSections").text(details["Sections"]);
    $(".ObjectbkmkBooks").text(details["Books"]);
    $(".ObjectbkmkComments").text(details["Comments"]);
    $(".ObjectbkmkTags").text(details["Tags"]);
}

function DisplayWMObjectTypes(data) {
    var parent = $("#wmObjectTypeList");
    hideLoader();
    if (data === "none") {
        parent.text("No Objects");
    } else {
        var counter = 0;
        var childClone = parent.find(".clone");
        $.each(data, function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.find(".objTypeIcon").attr("class", "icon-" + details["icon_class"]);
            newchild.find(".objTypeName").text(details["name"]);
            newchild.find(".objTypeCount").text(details["object_count"]);
            newchild.click(function () {
                UnBlockDetails(cardblock1);
                $(".selectedPs").removeClass("hide");
                $(".allperms").addClass("hide");
                $(".selectedWMObjectType").text(details["name"]);
                loadedtype = "WMObject";
                loadedid = id;
                showLoader();
                GetData("Permissions", "GetPermissions", "LoadPermissions", id);
            });
            var count = parseInt(details["object_count"]);
            counter += +count;
            newchild.appendTo(parent);
        });
        childClone.hide();
    }
    $(".TotalobjTypeCount").text(counter);
}

function DisplayWMObjectCategory(data) {
    var par = $("#wmobjects");
    par.empty();
    if (data === "none") {
    } else {
        par.append($('<option/>').val(0).text("Select WM-Object"));
        $.each(data, function (id, det) {
            $("<option />", {text: capitaliseFirstLetter(det["name"]), value: id}).appendTo(par);
        });
    }
}

function DisplayPermissions(data, parent) {
    hideLoader();
    parent.find(".newclone").remove();
    if (data === "none") {
        parent.text("No Permissions").addClass("bold");
    } else {
        var childClone = parent.find(".perm-clone");
        $.each(data, function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("perm-clone");
            newchild.removeClass("hide");
            newchild.addClass("newclone");
            var permit = newchild.find(".permPermit");
            var permPermitcheck = newchild.find(".permPermitcheck").val(id);
            var permName = newchild.find(".permName").val(details["permName"]);
            var restrict = newchild.find(".permRestrictcheck");
            var setPerms = newchild.find("#setPerms");
            var setRestrict = newchild.find("#setRestrict");
            permName.click(function () {
                UnBlockDetails(cardblock2);
                cardblock3.addClass("hide");
                cardblock2.removeClass("hide");
                DisplayPermDetails(details);
            });
            permit.click(function () {
                var permid = permPermitcheck.val();
                UnBlockDetails(cardblock3);
                cardblock2.addClass("hide");
                cardblock3.removeClass("hide");
                if (permPermitcheck.is(':checked')) {
                    CreatePermissionList(permid); //remove
                } else {
                    CreatePermissionList(permid); //add 
                }

            });
            restrict.click(function () {
                var lid = loadedid;
                var ltype = loadedtype;
                var name = details["permName"];
                RemoveLoadedObjectPermission(id, name, lid, ltype);
            });
            setPerms.click(function () {
                var extra = "Add " + details["permName"] + " as an additional permission to the list of assigned permissions";
                SetSpecialPerms(loadedUserID, loadedUserType, "Permission", id, extra);
            });
            setRestrict.click(function () {
                var extra = "Remove " + details["permName"] + " from the list of assigned permissions";
                SetSpecialPerms(loadedUserID, loadedUserType, "Restriction", id, extra);
            });
            newchild.appendTo(parent).show();
        });
        childClone.hide();
    }
}

function SetSpecialPerms(loadedUserID, loadedUserType, action, permid, extra) {
    var data = [loadedUserID, loadedUserType, permid, action];
    swal({
        title: 'Update Permission',
        text: extra,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
    }).then(function (dismiss) {
        if (dismiss.value) {
            showLoader();
            GetData("Permissions", "AddUserSpecialPermissions", "LoadGeneralAlert", data);
        } else {
            swal({
                title: 'Safe',
                text: "Your permissions are safe!",
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-success',
                buttonsStyling: false
            });
        }
    });
}

function RemoveLoadedObjectPermission(selectedid, selectedtype, loadedid, loadedtype) {
    var data = [selectedid, loadedid, loadedtype];
    swal({
        title: 'Remove - ' + selectedtype + ' Permission',
        type: 'warning',
        showCancelButton: true,
        text: 'You wont be able to revert this. Do you wish to continue?',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
    }).then(function (dismiss) {
        if (dismiss.value) {
            showLoader();
            GetData("Permissions", "RemoveLoadedObjectPermission", "LoadGeneralAlert", data);
        } else {
            swal({
                title: 'Safe',
                text: "Your permission is safe!",
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-success',
                buttonsStyling: false
            });
        }
    });
}

function DisplayPermDetails(details) {
    $(".PermID").text(details["permID"]);
    $(".permissionname").text(details["permName"]);
    $(".permCreator").text(details["permCreatedBy"]);
    $(".permTime").text(details["time"]);
    $(".permDate").text(details["date"]);
    $(".ObjectTypeName").text(details["ObjectTypeName"]);
    var usergroupParent = $("#uGroupList");
    usergroupParent.find(".unewclone").remove();
    var usergroupdata = details["userGroups"];
    if (usergroupdata === "none") {
        usergroupParent.text("No User Groups");
    } else {
        var childClone = usergroupParent.find(".clone");
        $.each(usergroupdata, function (id, name) {
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("unewclone");
            var ubtn = newchild.find(".ugroupName").text(name);
            ubtn.click(function () {
                $(".selectedPs").removeClass("hide");
                $(".allperms").addClass("hide");
                $(".selectedWMObjectType").text(name);
                loadedtype = "UserGroup";
                loadedid = id;
                showLoader();
                GetData("Permissions", "GetUserGroupPermissions", "LoadPermissions", id);
            });
            newchild.appendTo(usergroupParent).show();
        });
        childClone.hide();
    }

    var permgroupParent = $("#pGroupList");
    permgroupParent.find(".pnewclone").remove();
    var permgroupdata = details["permGroups"];
    if (permgroupdata !== "none") {
        var ChildClone = permgroupParent.find(".clone");
        $.each(permgroupdata, function (id, name) {
            var newchild = ChildClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.addClass("pnewclone");
            var pbtn = newchild.find(".pgroupName").text(name);
            pbtn.click(function () {
                $(".selectedPs").removeClass("hide");
                $(".allperms").addClass("hide");
                $(".selectedWMObjectType").text(name);
                loadedtype = "PermissionGroup";
                loadedid = id;
                showLoader();
                GetData("Permissions", "GetPermGroupPermissions", "LoadPermissions", id);
            });
            newchild.appendTo(permgroupParent).show();
        });
        ChildClone.hide();
    }
}

function DisplayGeneralAlert(data) {
    hideLoader();
    swal({
        title: data[2],
        text: data[0],
        type: data[1],
        showCancelButton: false,
        confirmButtonClass: 'btn btn-' + data[1],
        confirmButtonText: 'Ok!',
        onClose: function () {
            window.location.reload();
        }
    });
}

function DisplayPermGroupList(data, parent) {
//    var parent = $("#permGroupList");
    hideLoader();
    if (data === "none") {
        parent.text("No Objects");
    } else {
        var counter = 0;
        var childClone = parent.find(".clone");
        $.each(data, function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.find(".objTypeName").text(details["name"]);
            newchild.find(".objTypeCount").text(details["permsCount"]);
            newchild.click(function () {
                UnBlockDetails(cardblock1);
                $(".selectedPs").removeClass("hide");
                $(".allperms").addClass("hide");
                $(".selectedWMObjectType").text(details["name"]);
                showLoader();
                loadedtype = "PermissionGroup";
                loadedid = id;
                GetData("Permissions", "GetPermGroupPermissions", "LoadPermissions", id);
            });
            counter++;
            newchild.appendTo(parent);
        });
        childClone.hide();
    }
    $(".TotalPermGroupCount").text(counter);
}

function DisplayUserGroupList(data) {
    var parent = $("#userGroupList");
    hideLoader();
    if (data === "none") {
        parent.text("No Objects");
    } else {
        var counter = 0;
        var childClone = parent.find(".clone");
        $.each(data, function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.find(".objTypeName").text(details["name"]);
            newchild.find(".objTypeCount").text(details["permsCount"]);
            newchild.click(function () {
                UnBlockDetails(cardblock1);
                $(".selectedPs").removeClass("hide");
                $(".allperms").addClass("hide");
                $(".selectedWMObjectType").text(details["name"]);
                showLoader();
                loadedtype = "UserGroup";
                loadedid = id;
                GetData("Permissions", "GetUserGroupPermissions", "LoadPermissions", id);
            });
            counter++;
            newchild.appendTo(parent);
        });
        childClone.hide();
    }
    $(".TotalUgroupCount").text(counter);
    var par = $("#newPermGrpuserGroupList");
    par.empty();
    if (data !== "none") {
        par.append($('<option/>').val(0).text("Select User Group"));
        $.each(data, function (id, det) {
            $("<option />", {text: capitaliseFirstLetter(det["name"]), value: id}).appendTo(par);
        });
        par.change('select2:select', function () {
            //Use $option (with the "$") to see that the variable is a jQuery object
            var option = $(this).find('option:selected');
            //Added with the EDIT
            var id = option.val(); //to get content of "value" attrib
            var text = option.text(); //to get <option>Text</option> content
            showLoader();
            GetData("User", "GetAllUsers", "LoadAllUserList", text);
        });
    }

}

function CreatePermissionList(id) {
    var divids = $(".selectedPermids");
    var newid = id + ",";
    var oldid = $.trim(divids.text());
    if (oldid.includes(newid)) {
        oldid = oldid.replace(newid, '');
        divids.text(oldid);
    } else {
        oldid = oldid + newid;
        divids.text(oldid);
    }
}

function DisplayPermParent(data, par) {
    hideLoader();
    if (data === "none") {
        par.text("No Objects");
    } else {
        var ChildClone = par.find(".clone");
        $.each(data, function (id, details) {
            var newchild = ChildClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.find(".objName").text(details["name"]);
            newchild.find(".objectTypePermCheck").val(id);
            newchild.appendTo(par);
        });
        ChildClone.hide();
    }
}

function DisplayAgencyTypes(data) {
    var parent = $("#agencyTypesList");
    hideLoader();
    if (data !== "none") {
        var childClone = parent.find(".clone");
        $.each(data, function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.find(".agencyTypeName").text(details["name"]);
            newchild.find(".agencyTypeCount").text(details["count"]);
            newchild.click(function () {
                showLoader();
                var data = [id, "Agency"];
                GetData("User", "GetAgencies", "LoadAllUsers", data);
            });
            newchild.appendTo(parent).show();
        });
        childClone.hide();
    } else {

    }

    var cs = $(".agencytypes");
    cs.empty();
    if (data === "empty") {
    } else {
        cs.append($('<option/>').val(0).text("Select Agency Type"));
        $.each(data, function (key, value) {
            cs.append($('<option/>').val(key).text(value["name"]));
        });
    }
}

function ManagePermission(loadedUserID, loadedUserType, loadedUserName) {
    window.location = extension + "ControllerServlet?action=Link&type=ManagePermissions&loadedUserID=" + loadedUserID + "&loadedUserType=" + loadedUserType + "&loadedUserName=" + loadedUserName;
}

function PopulateAddressTypes(returnValue) {
    var Section = "AddressType";
    var value = "0";
    var data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadUserAddressTypes", data);
}

function PopulateStates(returnValue) {
    var Section = "State";
    var value = "157";
    var data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadStates", data);
}

function PopulateLGAs(value, returnValue) {
    var data;
    var Section = "LGA";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadLGAs", data);
}

function PopulateLCDAsFromState(value, returnValue) {
    var data;
    var Section = "LCDAfromState";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadLCDAs", data);
}

function PopulateLCDAsFromLGA(value, returnValue) {
    var data;
    var Section = "LCDAfromLGA";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadLCDAs", data);
}

function PopulateTownsFromState(value, returnValue) {
    var data;
    var Section = "TownfromState";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadTowns", data);
}

function PopulateTownsFromLCDA(value, returnValue) {
    var data;
    var Section = "TownfromLCDA";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadTowns", data);
}

function PopulateTownsFromLGA(value, returnValue) {
    var data;
    var Section = "TownfromLGA";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadTowns", data);
}

function PopulateBstopsFromLGA(value, returnValue) {
    var data;
    var Section = "BstopfromLGA";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadBusStops", data);
}

function PopulateBstopsFromLCDA(value, returnValue) {
    var data;
    var Section = "BstopfromLCDA";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadBusStops", data);
}

function PopulateBstopsFromTown(value, returnValue) {
    var data;
    var Section = "BstopfromTown";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadBusStops", data);
}

function PopulateStreetsFromTown(value, returnValue) {
    var data;
    var Section = "StreetfromTown";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadStreets", data);
}

function PopulateStreetsFromBstop(value, returnValue) {
    var data;
    var Section = "StreetfromBstop";
    data = [value, Section, returnValue];
    GetData("User", "Populate", "LoadStreets", data);
}

function InsertMissingSection(Section) {
    var data;
    var LGAValue = $('#pickup-lgas').val();
    var StateValue = $('#pickup-states').val();
    var TownValue = $('#pickup-towns').val();
    var BStopValue = $('#pickup-busstop').val();
    var LCDAValue = $('#pickup-lcdas').val();
    var NewAddition = $('#_new' + Section).val();
    switch (Section) {
        case "lcdas":
        {
            data = [Section, NewAddition, LGAValue, StateValue];
            break;
        }
        case "towns":
        {
            if (LCDAValue === "0" || LCDAValue === "Select Your LCDA") {
                data = [Section, NewAddition, LGAValue, StateValue];
            } else {
                data = [Section, NewAddition, LCDAValue, LGAValue, StateValue];
            }
            break;
        }
        case "busstop":
        {
            if (LCDAValue === "0" || LCDAValue === "Select Your LCDA") {
                data = [Section, NewAddition, TownValue, LGAValue];
            } else {
                data = [Section, NewAddition, TownValue, LCDAValue, LGAValue];
            }
            break;
        }
        case "street":
        {
            data = [Section, NewAddition, BStopValue, TownValue];
            break;
        }

    }
    GetData("User", "InsertSection", "LoadNewSection", data);
    $('#_new' + Section).val("");
}

function SetLCDAValues(section) {
    var value = $("#pickup-lcda").children("option:selected").val();
    //var value = $("#pickup-lcda").children("option:selected").val();
    var data = [value, section, "LCDA"];
    GetData("User", "GetValues", "Show" + section + "Value", data);
}

function SetTownValues(section) {
    var value = $("#pickup-towns").children("option:selected").val();
    var data = [value, section, "Town"];
    GetData("User", "GetValues", "Show" + section + "Value", data);
}

function SetBstopValues(section) {
    var value = $("#pickup-busstop").children("option:selected").val();
    var data = [value, section, "Bstop"];
    GetData("User", "GetValues", "Show" + section + "Value", data);
}

function SetStreetValues(section) {
    var value = $("#pickup-street").children("option:selected").val();
    var data = [value, section, "Street"];
    GetData("User", "GetValues", "Show" + section + "Value", data);
}

function SetLCDAValues1(section) {
    var value = $("#lcdas").children("option:selected").val();
    //var value = $("#pickup-lcda").children("option:selected").val();
    var data = [value, section, "LCDA"];
    GetData("User", "GetValues", "Show" + section + "Value", data);
}

function SetTownValues1(section) {
    var value = $("#towns").children("option:selected").val();
    var data = [value, section, "Town"];
    GetData("User", "GetValues", "Show" + section + "Value", data);
}

function SetBstopValues1(section) {
    var value = $("#busstops").children("option:selected").val();
    var data = [value, section, "Bstop"];
    GetData("User", "GetValues", "Show" + section + "Value", data);
}

function SetStreetValues1(section) {
    var value = $("#streets").children("option:selected").val();
    var data = [value, section, "Street"];
    GetData("User", "GetValues", "Show" + section + "Value", data);
}

function DisplayLGAValue(params) {
    var SectionOptions = $("#pickup-lgas").children();
    SectionOptions.find("option:selected").removeAttr('selected');
    var value = params.toString();
    $.each(SectionOptions, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });
    var SectionOptions1 = $("#lgas").children();
    SectionOptions1.find("option:selected").removeAttr('selected');
    var value = params.toString();
    $.each(SectionOptions1, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });
}

function DisplayStateValue(params) {
    var StateSectionOptions = $("#pickup-states").children();
    StateSectionOptions.find("option:selected").removeAttr('selected');
    var value = params.toString();
    $.each(StateSectionOptions, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });
    var StateSectionOptions1 = $("#states").children();
    StateSectionOptions1.find("option:selected").removeAttr('selected');
    var value = params.toString();
    $.each(StateSectionOptions1, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });
}

function DisplayLCDAValue(params) {
    var SectionOptions = $("#pickup-lcdas").children();
    SectionOptions.find("option:selected").removeAttr('selected');
    var value = params.toString();
    $.each(SectionOptions, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });
    var SectionOptions1 = $("#lcdas").children();
    SectionOptions1.find("option:selected").removeAttr('selected');
    var value = params.toString();
    $.each(SectionOptions1, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });
}

function DisplayTownValue(params) {
    var SectionOptions = $("#pickup-towns").children();
    SectionOptions.find("option:selected").removeAttr('selected');
    var value = params.toString();
    $.each(SectionOptions, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });
    var SectionOptions1 = $("#towns").children();
    SectionOptions1.find("option:selected").removeAttr('selected');
    var value = params.toString();
    $.each(SectionOptions1, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });
}

function DisplayBstopValue(params) {
    var SectionOptions = $("#pickup-busstop").children();
    SectionOptions.find("option:selected").removeAttr('selected');
    var value = params.toString();
    $.each(SectionOptions, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });
    var SectionOptions1 = $("#busstops").children();
    SectionOptions1.find("option:selected").removeAttr('selected');
    var value = params.toString();
    $.each(SectionOptions1, function () {
        if ($(this).val() === value) {
            $(this).attr('selected', 'selected');
        }
    });
}

function DisplayNewSection(params) {
    var pickupsection;
    var Section = params[0];
    var Section_Name = params[1];
    var value = params[2];
    switch (Section) {
        case "lcdas":
        {
            pickupsection = "#pickup-lcdas";
        }
        case "towns":
        {
            pickupsection = "#pickup-towns";
        }
        case "bustopstop":
        {
            pickupsection = "#pickup-busstop";
        }
        case "street":
        {
            pickupsection = "#pickup-street";
        }
    }
//$("<option>").val(value).text(Section_Name).attr('selected', 'selected').appendTo(pickupsection);
//pickupsection.append($('<option/>').val(value).text(Section_Name).attr('selected', 'selected'));
    $("<option>").val(value).text(Section_Name).attr('selected', 'selected').appendTo(pickupsection);
}
function DisplayUserAddressTypes(data) {
//    hideLoader();
    var ds = $("#addressType");
    ds.empty();
    if (data === "empty") {
    } else {
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ds);
            });
            if (index === "") {

            } else {
                var fx = ds.children();
                $.each(fx, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });
    }
}

function DisplayStates(data) {
    var ds = $("#states");
    ds.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select State").appendTo(ds);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ds);
            });
            if (index === "") {

            } else {
                var fx = ds.children();
                $.each(fx, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });
    }

    var ps = $("#pickup-states");
    ps.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select State").appendTo(ps);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ps);
            });
            if (index === "") {

            } else {
                var px = ps.children();
                $.each(px, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });
    }

    hideLoader();
}

function Displaylgas(data) {
    var ds = $("#lgas");
    ds.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select LGA").appendTo(ds);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ds);
            });
            if (index === "") {

            } else {
                var fx = ds.children();
                $.each(fx, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });
    }

    var ps = $("#pickup-lgas");
    ps.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select LGA").appendTo(ps);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ps);
            });
            if (index === "") {

            } else {
                var px = ps.children();
                $.each(px, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });
    }

    hideLoader();
}

function DisplayLCDAs(data) {
    var ds = $("#lcdas");
    ds.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select LCDA").appendTo(ds);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ds);
            });
            if (index === "") {

            } else {
                var fx = ds.children();
                $.each(fx, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });
    }

    var ps = $("#pickup-lcdas");
    ps.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select LCDA").appendTo(ps);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ps);
            });
            if (index === "") {

            } else {
                var px = ps.children();
                $.each(px, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });
    }

    hideLoader();
}

function DisplayTowns(data) {
    var ds = $("#towns");
    ds.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select Town").appendTo(ds);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ds);
            });
            if (index === "") {

            } else {
                var fx = ds.children();
                $.each(fx, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });
    }

    var ps = $("#pickup-towns");
    ps.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select Town").appendTo(ps);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ps);
            });
            if (index === "") {

            } else {
                var px = ps.children();
                $.each(px, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });
    }

    hideLoader();
}

function DisplayBusStops(data) {
    var ds = $("#busstops");
    ds.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select Bus Stop").appendTo(ds);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ds);
            });
            if (index === "") {

            } else {
                var fx = ds.children();
                $.each(fx, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });
    }

    var ps = $("#pickup-busstop");
    ps.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select Bus Stop").appendTo(ps);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ps);
            });
            if (index === "") {

            } else {
                var px = ps.children();
                $.each(px, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });
    }

    hideLoader();
}

function DisplayStreets(data) {
    var ds = $("#streets");
    ds.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select Street").appendTo(ds);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ds);
            });
            if (index === "") {

            } else {
                var fx = ds.children();
                $.each(fx, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });
    }

    var ps = $("#pickup-street");
    ps.empty();
    if (data === "empty") {
    } else {
        $('<option/>').val("0").text("Select Street").appendTo(ps);
        $.each(data, function (index, value) {
            $.each(value, function (key, value) {
                $('<option>').val(key).text(value).appendTo(ps);
            });
            if (index === "") {

            } else {
                var px = ps.children();
                $.each(px, function () {
                    if ($(this).val() === index) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
        });
    }

    hideLoader();
}

function DisplayAddUserAddress(data) {
    if (data === "success") {
        swal({
            title: "Address Added",
            text: "Successful",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success btn-sm',
            confirmButtonText: "Ok",
            onClose: function () {
                $(".bd-example-modaladdress").modal("hide");
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info btn-sm',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
                $(".bd-example-modaladdress").modal("hide");
            }
        });
    }
}

function DisplayAddUserAddressAfterEdit(data) {
    hideLoader();
    if (data === "success") {
        swal({
            title: "Address Editted",
            text: "Successful",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success btn-sm',
            confirmButtonText: "Ok",
            onClose: function () {
                $(".bd-example-modaladdress").modal("hide");
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info btn-sm',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
                $(".bd-example-modaladdress").modal("hide");
            }
        });
    }
}

function DisplayPickUpCenterOptionAfterEdit(data) {
    hideLoader();
    if (data === "success") {
        swal({
            title: "Pick-Up Center Editted",
            text: "Successful",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success btn-sm',
            confirmButtonText: "Ok",
            onClose: function () {
                $(".add-pickup-centre-modal").modal("hide");
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info btn-sm',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
                $(".add-pickup-centre-modal").modal("hide");
            }
        });
    }
}

function DisplayBlockAndUnblockUser(params) {
    if (params === "success") {
        swal({
            title: "Block / Unblock User Account",
            text: "Action Completed",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success btn-sm',
            confirmButtonText: "Ok",
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info btn-sm',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}

function DisplayBusinessPermissions(data) {
    var par = $(".BusinessPermissionsList");
    hideLoader();
    if (data === "none") {
        par.text("No Objects");
    } else {
        var ChildClone = par.find(".clone");
        $.each(data, function (id, details) {
            var newchild = ChildClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.find(".objName").text(details["name"]);
            newchild.find(".objectTypePermCheck").val(id);
            newchild.appendTo(par);
        });
        ChildClone.hide();
    }
}

function DisplayNewTranslimits(params) {
    if (params === "success") {
        swal({
            title: "Set New Transaction Limits",
            text: "Action Completed",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success btn-sm',
            confirmButtonText: "Ok",
            onClose: function () {
                GetData("Accounts", "GetAllUserAccountBalances", "LoadAllUsersAccountBalances");
                $(".change-transaction-limit-modal").hide();
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info btn-sm',
            confirmButtonText: 'Ok',
            onClose: function () {
                GetData("Accounts", "GetAllUserAccountBalances", "LoadAllUsersAccountBalances");
                $(".change-transaction-limit-modal").hide();
                window.location.reload();
            }
        });
    }
}

function DisplayUserPermissions(data) {
    var par = $("#UserPerms");
    hideLoader();
    if (data === "none") {
        par.text("No Objects");
    } else {
        var ChildClone = par.find(".clone");
        $.each(data, function (id, details) {
            var newchild = ChildClone.clone();
            newchild.removeClass("clone");
            newchild.removeClass("hide");
            newchild.find(".PermName").text(details["name"]);
            newchild.appendTo(par);
        });
        ChildClone.hide();
    }
}

function DisplayUserRequestedPemissions(data) {
    var par = $("#RequestedPermissions");
    hideLoader();
    if (data === "none") {
        par.text("No Objects");
    } else {
        var count = 0;
        var ChildClone = par.find(".clone");
        $.each(data, function (id, details) {
            var newchild = ChildClone.clone();
            newchild.removeClass("clone");
            count++;
            newchild.removeClass("hide");
            newchild.find(".newPermCount").text(count);
            newchild.find(".newPermUserName").text(details["Username"]);
            newchild.find(".newPermName").text(details["perm_name"]);
            newchild.find(".newPermDesc").text(details["perm_description"]);
            var status = details["status"];
            if (status === "Pending") {
                newchild.find(".newPermStatus").text(details["status"]).addClass("badge badge-primary");
            } else if (status === "In-Progress") {
                newchild.find(".newPermStatus").text(details["status"]).addClass("badge badge-info");
            } else if (status === "Completed") {
                newchild.find(".newPermStatus").text(details["status"]).addClass("badge badge-success");
            } else if (status === "Rejected") {
                newchild.find(".newPermStatus").text(details["status"]).addClass("badge badge-danger");
            }

            newchild.find(".newPermDateAndTime").text(details["DateTime"]);
            newchild.find(".newPermDateAndTime").text(details["DateTime"]);
            var approveNewPerm = newchild.find(".approveNewPerm");
            approveNewPerm.click(function () {
                UpdateRequestedPermission(id, "Approve");
            });
            var rejectNewPerm = newchild.find(".rejectNewPerm");
            rejectNewPerm.click(function () {
                UpdateRequestedPermission(id, "Reject");
            });
            var completeNewPerm = newchild.find(".completeNewPerm");
            completeNewPerm.click(function () {
                UpdateRequestedPermission(id, "Complete");
            });
            var completeNewPerm = newchild.find(".deleteNewPerm");
            completeNewPerm.click(function () {
                UpdateRequestedPermission(id, "Delete");
            });
            newchild.appendTo(par).show();
        });
        ChildClone.hide();
    }
}

function DisplayStaffPermissions(data, parent) {
    hideLoader();
    parent.find(".newclone").remove();
    if (data === "none") {
        parent.text("No Permissions").addClass("bold");
    } else {
        var childClone = parent.find(".perm-clone");
        $.each(data, function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("perm-clone");
            newchild.removeClass("hide");
            newchild.addClass("newclone");
            var permName = newchild.find(".permName").val(details["permName"]);
            var setPerms = newchild.find("#setPerms");
            var setRestrict = newchild.find("#setRestrict");
            permName.click(function () {
                DisplayPermDetails(details);
            });
            setPerms.click(function () {
                var extra = "Add " + details["permName"] + " as an new permission to the list of " + StaffUserName + "'s assigned permissions";
                SetSpecialPerms(StaffUserID, userid, id, extra, "Add");
            });
            setRestrict.click(function () {
                var extra = "Remove " + details["permName"] + " from the list of " + StaffUserName + "'s assigned permissions";
                SetSpecialPerms(StaffUserID, userid, id, extra, "Remove");
            });
            newchild.appendTo(parent).show();
        });
        childClone.hide();
    }
}

function UpdateRequestedPermission(RequestedID, Action) {
    swal({
        title: 'Update Requested Permission Status',
        type: 'warning',
        showCancelButton: true,
        text: 'Update the requested permission status, do you wish to continue?',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
    }).then(function (dismiss) {
        if (dismiss.value) {
            var data = [RequestedID, Action];
            showLoader();
            GetData("Permissions", "UpdateRequestedPermission", "LoadGeneralAlert", data);
        } else {
            swal({
                title: 'Safe',
                text: "Your permission is safe!",
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-success',
                buttonsStyling: false
            });
        }
    });
}

function DisplayAllRequestedPemissions(data) {
    var par = $("#AllRequestedPermissions");
    hideLoader();
    if (data === "none") {
        par.text("No Objects");
    } else {
        var count = 0;
        var ChildClone = par.find(".clone");
        $.each(data, function (id, details) {
            var newchild = ChildClone.clone();
            newchild.removeClass("clone");
            count++;
            newchild.removeClass("hide");
            newchild.find(".newPermCount").text(count);
            newchild.find(".newPermUserName").text(details["Username"]);
            newchild.find(".newPermName").text(details["perm_name"]);
            newchild.find(".newPermDesc").text(details["perm_description"]);
            var status = details["status"];
            if (status === "Pending") {
                newchild.find(".newPermStatus").text(details["status"]).addClass("badge badge-primary");
            } else if (status === "In-Progress") {
                newchild.find(".newPermStatus").text(details["status"]).addClass("badge badge-info");
            } else if (status === "Completed") {
                newchild.find(".newPermStatus").text(details["status"]).addClass("badge badge-success");
            } else if (status === "Rejected") {
                newchild.find(".newPermStatus").text(details["status"]).addClass("badge badge-danger");
            }

            newchild.find(".newPermDateAndTime").text(details["DateTime"]);
            newchild.find(".newPermDateAndTime").text(details["DateTime"]);
            var approveNewPerm = newchild.find(".approveNewPerm");
            approveNewPerm.click(function () {
                UpdateRequestedPermission(id, "Approve");
            });
            var rejectNewPerm = newchild.find(".rejectNewPerm");
            rejectNewPerm.click(function () {
                UpdateRequestedPermission(id, "Reject");
            });
            var completeNewPerm = newchild.find(".completeNewPerm");
            completeNewPerm.click(function () {
                UpdateRequestedPermission(id, "Complete");
            });
            var completeNewPerm = newchild.find(".deleteNewPerm");
            completeNewPerm.click(function () {
                UpdateRequestedPermission(id, "Delete");
            });
            newchild.appendTo(par);
        });
        ChildClone.hide();
    }
}

function DisplayPaymentResponse(data) {
    if (data[0] === "Buy Warrants With Cash" || data[0] === "Inspection Fees") {
        swal({
            title: "Payment Advice",
            text: data[2],
            type: data[1],
            showCancelButton: false,
            confirmButtonClass: 'btn btn-' + data[1],
            confirmButtonText: 'Continue',
            onClose: function () {
                $(".modal_basic_buyWarrants").modal("hide");
                window.location.reload();
            }
        });
    } else if (data[0] === "Validation Fees") {
        DisplayValidateAccount(data);
    } else if (data[0] === "Monetisation Application Fee") {
        DisplayMonPayAppFee(data);
    }
}


//Services
function DisplayListOfServiceCategories(params) {
    var Parent = $("#CategoryParent");
    var SubParent = $("#SubCategoryParent");
    if (params !== "")
    {
        Parent.find(".clearclone").remove();
        var ChildClone = Parent.find(".clone");
        SubParent.find(".clearclone").remove();
        var SubClone = SubParent.find(".clone");
        $.each(params, function (key, value) //for each category
        {
            var ThisChild = ChildClone.clone();
            ThisChild.removeClass("clone");
            ThisChild.removeClass("hide");
            ThisChild.addClass("clearclone");
            ThisChild.find(".IDTB").val(value["ID"]);
            ThisChild.find(".TitleTB").val(value["Name"]);
            ThisChild.find(".DescriptionTB").val(value["Description"]);
            var SubCategories = value["SubCategories"];
            if (SubCategories !== null)
            {
                $.each(SubCategories, function (i, SubCategory) //For each sub category
                {
                    var Child = SubClone.clone();
                    Child.removeClass("clone");
                    Child.removeClass("hide");
                    Child.addClass("clearclone");
                    Child.find(".NameTB").val(SubCategory["Name"]);
                    Child.find(".DescriptionTB").val(SubCategory["Description"]);
                    var Props = SubCategory["Properties"]; //Gets all properties of this sub category
                    var StringBuilder = "";
                    if (Props != null)
                    {
                        $.each(Props, function (index, Value)
                        {
                            StringBuilder += Value["Name"]; //Name of this property
                            var ValuesArray = Value["Values"]; //List of possible values this property can have
                            StringBuilder += ": ";
                            $.each(ValuesArray, function (SerialNo, Options)
                            {
                                StringBuilder += Options + ", "; /*This will get out each possible value of the
                                 property as a separate entry. You can remove the string that adds a comma at
                                 the end and capture each value in a separate UI element
                                 */
                            });
                        });
                    }
                    Child.find(".PropertiesTB").val(StringBuilder);
                    Child.appendTo(SubParent).show();
                });
                SubClone.hide();
            }

            ThisChild.appendTo(Parent).show();
        });
        ChildClone.hide();
        $("#MyTextBox").html("List of service Categories on our market:");
    }
}
function DisplayShowAllServiceTypes(params) {
    var Parent = $("#ServiceTypeParent");
    if (params !== "")
    {
        Parent.find(".clearclone").remove();
        var ChildClone = Parent.find(".clone");
        $.each(params, function (key, value)
        {
            var ThisChild = ChildClone.clone();
            ThisChild.removeClass("clone");
            ThisChild.removeClass("hide");
            ThisChild.addClass("clearclone");
            ThisChild.find(".ServiceNameTB").val(value["ServiceTypeName"]);
            var LastUpdated = value["LastUpdatedDate"] + " ";
            LastUpdated += value["LastUpdatedTime"];
            ThisChild.find(".LastUpdatedTB").val(LastUpdated);
            var Props = value["Properties"]; //Gets all properties of this service
            var StringBuilder = "";
            if (Props != null)
            {
                $.each(Props, function (index, Value)
                {
                    StringBuilder += Value["Name"]; //Name of this property
                    var ValuesArray = Value["Values"]; //List of possible values this property can have
                    StringBuilder += ": ";
                    $.each(ValuesArray, function (SerialNo, Options)
                    {
                        StringBuilder += Options + ", "; /*This will get out each possible value of the
                         property as a separate entry. You can remove the string that adds a comma at
                         the end and capture each value in a separate UI element
                         */
                    });
                });
            }
            ThisChild.find(".PropertiesTB").val(StringBuilder);
            ThisChild.appendTo(Parent).show();
        });
        ChildClone.hide();
        $("#MyTextBox").html("Types of Services on our market:");
    }
}
function DisplayShowAllServiceListings(params) {
    var Parent = $("#ServiceListingParent");
    if (params !== "")
    {
        GlobalTestVar = params;
        Parent.find(".clearclone").remove();
        var ChildClone = Parent.find(".clone");
        var DisplayString = "";
        var count = 0;
        $.each(params, function (key, value)
        {
            count++;
            var ThisChild = ChildClone.clone();
            var ViewServiceDetailsModalButton = ThisChild.find(".ViewServiceDetailsModalButton");
            var ApproveListing = ThisChild.find(".approveServListing");
            var DeclineListing = ThisChild.find(".declineList");
            var DeleteListing = ThisChild.find(".deleteList");
            var data = value["ID"];
            ThisChild.removeClass("clone");
            ThisChild.removeClass("hide");
            ThisChild.addClass("clearclone");
            ThisChild.find(".shop-servicecount").text(count);
            ThisChild.find(".ServiceTypeNameTB").val(value["ServiceTypeName"]);
            ThisChild.find(".ServiceNameTB").val(value["Name"]);
            ThisChild.find(".SummaryTB").val(value["Summary"]);
            ThisChild.find(".DetailedDescriptionTB").val(value["DetailedDescription"]);
            ThisChild.find(".PriceTB").val(value["Price"]);
            ThisChild.find(".UpperPriceTB").val(value["UpperPrice"]);
            ThisChild.find(".LowerPriceTB").val(value["LowerPrice"]);
            ThisChild.find(".DeliveryTimeTB").val(value["DeliveryTimeInHours"]);
            //So that we can use either input elements or other HTML elements in the UI and it will always work,
            ThisChild.find(".ServiceTypeNameTB").text(value["ServiceTypeName"]);
            ThisChild.find(".ServiceNameTB").text(value["Name"]);
            ThisChild.find(".SummaryTB").text(value["Summary"]);
            ThisChild.find(".DetailedDescriptionTB").text(value["DetailedDescription"]);
            ThisChild.find(".PriceTB").text(value["Price"]);
            ThisChild.find(".UpperPriceTB").text(value["UpperPrice"]);
            ThisChild.find(".LowerPriceTB").text(value["LowerPrice"]);
            ThisChild.find(".DeliveryTimeTB").text(value["WaitTime"] + " [" + value["WaitTimeLabel"] + "]");
            var LastUpdated = value["LastUpdatedDate"] + " ";
            LastUpdated += value["LastUpdatedTime"];
            ThisChild.find(".LastUpdatedTB").val(LastUpdated);
            var Props = value["Properties"]; //Gets all properties of this service
            var StringBuilder = "";
            if (Props != null)
            {
                $.each(Props, function (index, Value)
                {
                    StringBuilder += Value["Name"]; //Name of this property
                    var ValuesArray = Value["Values"]; //List of possible values this property can have
                    StringBuilder += ": ";
                    $.each(ValuesArray, function (SerialNo, Options)
                    {
                        StringBuilder += Options + ", "; /*This will get out each possible value of the
                         property as a separate entry. You can remove the string that adds a comma at
                         the end and capture each value in a separate UI element
                         */
                    });
                });
            }
            ThisChild.find(".PropertiesTB").val(StringBuilder);
            //On click of details
            ViewServiceDetailsModalButton.click(function ()
            {
                DisplayServiceDetails(value);
            });
            ApproveListing.click(function () {
                ApproveServiceList(data);
            });
            DeclineListing.click(function () {
                DeclineServiceList(data);
            });
            DeleteListing.click(function () {
                DeleteServiceList(data);
            });
            ThisChild.appendTo(Parent).show();
        });
        ChildClone.hide();
        $("#MyTextBox").html("Services Listed on our market:");
    }
}

function DisplayServiceDetails(value) {
    $(".shop_services_details_modal").on("shown.bs.modal", function () {
        $(".service-detail-name").text(value[""]);
        $(".service-detail-name").text(value["Name"]);
//                            $(".modal-service-type").text(value["ServiceTypeName"]); 
        $(".service-summarry").text(value[""]);
        $(".ServiceDescription").text(value[""]);
        $(".service-summarry").text(value["Summary"]);
        $(".ServiceDescription").text(value["DetailedDescription"]);
        $(".shop_service-details-supplier-name").text(value["ServiceProviderName"]);
        $(".shop_service-details-supplier-email").text(value["ServiceProviderEmail"]);
        $(".shop_serv_provider_ID").val(value["ServiceProviderID"]);
//                            $(".modal-service-fixed-price").text(PriceFormat(value["Price"])); 
        $(".lowerRange").text(PriceFormat(value[" "]));
        $(".UpperRange").text(PriceFormat(value[" "]));
        $(".lowerRange").text(PriceFormat(value["UpperPrice"]));
        $(".UpperRange").text(PriceFormat(value["LowerPrice"]));
        $(".msgSubj").val("Issues Concerning your Service Listing on the Wealth Market");
        $(".tempEmail").val(value["ServiceProviderEmail"]);
        var prop = value["Properties"];
        var propertyParent = $("#service-property");
        propertyParent.find(".clearclone").remove();
        var ChildClone = propertyParent.find(".cloneProp");
        $.each(prop, function (ind, option) {
            var ThisChild = ChildClone.clone();
            ThisChild.removeClass("cloneProp");
            ThisChild.removeClass("hide");
            ThisChild.addClass("clearclone");
            var valPropName0 = option["Name"];
            var valPropName = $.trim(valPropName0);
            ThisChild.find(".service-propName").text(valPropName);
            var values = option["Values"];
            var propOptionParent = ThisChild.find(".service-propOptions");
            var OptionClone = propOptionParent.find(".clonePropOpt");
            if (values !== "") {
                $.each(values, function (ind, val) {
                    var valPropID = val + ind;
                    var valPropClass = "optionCheckInput" + ind;
                    var optChild = OptionClone.clone();
                    optChild.removeClass("hide");
                    optChild.removeClass("clonePropOpt");
                    optChild.addClass(valPropClass);
                    optChild.find(".optionCheckInput").attr('id', valPropID);
                    optChild.find(".optionCheckInput").attr('name', valPropName);
                    optChild.find(".optionLabel").attr('for', valPropID);
                    optChild.find(".optionLabel").text($.trim(val));
                    optChild.appendTo(propOptionParent);
                });
                OptionClone.hide();
            } else {
                OptionClone.text("No Values");
            }

            ThisChild.appendTo(propertyParent).show();
        });
        ChildClone.hide();
        $(".approveServListing1").click(function () {
            var data = value["ID"];
            swal({
                title: "Approve!",
                text: "Approve listing?",
                type: 'info',
                showCancelButton: true,
                confirmButtonText: 'Yes ',
                cancelButtonText: 'No',
                confirmButtonClass: 'btn btn-info',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false
            }).then(function (dismiss) {
                if (dismiss.value) {
                    GetData("Service", "ApproveListingByID", "LoadApproveServiceListing", data);
                } else {
                    swal({
                        title: 'No Action Taken!',
                        text: "Listing not approved",
                        type: 'info',
                        showCancelButton: false,
                        confirmButtonText: 'Ok!',
                        confirmButtonClass: 'btn btn-info',
                        buttonsStyling: false
                    });
                }
            });
        });
    }).modal("show");
}
function ApproveServiceList(ListingID) {
    swal({
        title: "Approve!",
        text: "Approve listing?",
        type: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes ',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-info',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
    }).then(function (dismiss) {
        if (dismiss.value) {
            GetData("Service", "ApproveListingByID", "LoadApproveServiceListing", ListingID);
        } else {
            swal({
                title: 'No Action Taken!',
                text: "Listing not approved",
                type: 'info',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-info',
                buttonsStyling: false
            });
        }
    });
}
function DeclineServiceList(ListingID) {
    swal({
        title: "Decline!",
        text: "Decline listing?",
        type: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes ',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-info',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
    }).then(function (dismiss) {
        if (dismiss.value) {
            GetData("Service", "DeclineListingByID", "LoadDeclineServiceListing", ListingID);
        } else {
            swal({
                title: 'No Action Taken!',
                text: "Listing not declined",
                type: 'info',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-info',
                buttonsStyling: false
            });
        }
    });
}
function DeleteServiceList(ListingID) {
    swal({
        title: "Delete!",
        text: "Delete listing?",
        type: 'danger',
        showCancelButton: true,
        confirmButtonText: 'Yes ',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-info',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
    }).then(function (dismiss) {
        if (dismiss.value) {
            GetData("Service", "DeleteListingByID", "LoadDeleteServiceListing", ListingID);
        } else {
            swal({
                title: 'No Action Taken!',
                text: "Listing not declined",
                type: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-info',
                buttonsStyling: false
            });
        }
    });
}
function DisplayListedServices(params) {
    var Parent = $("#ServiceListedInShopParent");
    if (params !== "")
    {
        GlobalTestVar = params;
        Parent.find(".clearclone").remove();
        var ChildClone = Parent.find(".clone");
        var DisplayString = "";
        $.each(params, function (key, value)
        {
            var count = 0;
            if (value["Listed"] === 0)
            {

            } else if (value["Listed"] === 1)
            {
                count++;
                var ThisChild = ChildClone.clone();
                var ViewServiceDetailsModalButton = ThisChild.find(".ViewServiceDetailsModalButton");
                var ApproveListing = ThisChild.find(".approveServListing");
                var DeclineListing = ThisChild.find(".declineList");
                var DeleteListing = ThisChild.find(".deleteList");
                var data = value["ID"];
                ThisChild.removeClass("clone");
                ThisChild.removeClass("hide");
                ThisChild.addClass("clearclone");
                ThisChild.find(".shop-servicecount").text(count);
                ThisChild.find(".ServiceTypeNameTB").val(value["ServiceTypeName"]);
                ThisChild.find(".ServiceNameTB").val(value["Name"]);
                ThisChild.find(".SummaryTB").val(value["Summary"]);
                ThisChild.find(".DetailedDescriptionTB").val(value["DetailedDescription"]);
                ThisChild.find(".PriceTB").val(value["Price"]);
                ThisChild.find(".UpperPriceTB").val(value["UpperPrice"]);
                ThisChild.find(".LowerPriceTB").val(value["LowerPrice"]);
                ThisChild.find(".DeliveryTimeTB").text(value["WaitTime"] + " [" + value["WaitTimeLabel"] + "]");
                //So that we can use either input elements or other HTML elements in the UI and it will always work,
                ThisChild.find(".ServiceTypeNameTB").text(value["ServiceTypeName"]);
                ThisChild.find(".ServiceNameTB").text(value["Name"]);
                ThisChild.find(".SummaryTB").text(value["Summary"]);
                ThisChild.find(".DetailedDescriptionTB").text(value["DetailedDescription"]);
                ThisChild.find(".PriceTB").text(value["Price"]);
                ThisChild.find(".UpperPriceTB").text(value["UpperPrice"]);
                ThisChild.find(".LowerPriceTB").text(value["LowerPrice"]);
                ThisChild.find(".DeliveryTimeTB").text(value["DeliveryTimeInHours"]);
                var LastUpdated = value["LastUpdatedDate"] + " ";
                LastUpdated += value["LastUpdatedTime"];
                ThisChild.find(".LastUpdatedTB").val(LastUpdated);
                var Props = value["Properties"]; //Gets all properties of this service
                var StringBuilder = "";
                if (Props != null)
                {
                    $.each(Props, function (index, Value)
                    {
                        StringBuilder += Value["Name"]; //Name of this property
                        var ValuesArray = Value["Values"]; //List of possible values this property can have
                        StringBuilder += ": ";
                        $.each(ValuesArray, function (SerialNo, Options)
                        {
                            StringBuilder += Options + ", "; /*This will get out each possible value of the
                             property as a separate entry. You can remove the string that adds a comma at
                             the end and capture each value in a separate UI element
                             */
                        });
                    });
                }
                ThisChild.find(".PropertiesTB").val(StringBuilder);
                //On click of details
                ViewServiceDetailsModalButton.click(function ()
                {
                    DisplayServiceDetails(value);
                });
                ApproveListing.click(function () {
                    ApproveServiceList(data);
                });
                DeclineListing.click(function () {
                    DeclineServiceList(data);
                });
                DeleteListing.click(function () {
                    DeleteServiceList(data);
                });
                ThisChild.appendTo(Parent).show();
            }

        });
        ChildClone.hide();
        $("#MyTextBox").html("Services Listed on our market:");
    }
}
function DisplayUnlistedServices(params) {
    var Parent = $("#ServiceListedForApprovalParent");
    if (params !== "")
    {
        GlobalTestVar = params;
        Parent.find(".clearclone").remove();
        var ChildClone = Parent.find(".clone");
        var DisplayString = "";
        var count = 0;
        $.each(params, function (key, value)
        {
            if (value["Listed"] === 1)
            {

            } else if (value["Listed"] === 0)
            {
                count++;
                var ThisChild = ChildClone.clone();
                var ViewServiceDetailsModalButton = ThisChild.find(".ViewServiceDetailsModalButton");
                var ApproveListing = ThisChild.find(".approveServListing");
                var DeclineListing = ThisChild.find(".declineList");
                var DeleteListing = ThisChild.find(".deleteList");
                var data = value["ID"];
                ThisChild.removeClass("clone");
                ThisChild.removeClass("hide");
                ThisChild.addClass("clearclone");
                ThisChild.find(".shop-servicecount").text(count);
                ThisChild.find(".ServiceTypeNameTB").val(value["ServiceTypeName"]);
                ThisChild.find(".ServiceNameTB").val(value["Name"]);
                ThisChild.find(".SummaryTB").val(value["Summary"]);
                ThisChild.find(".DetailedDescriptionTB").val(value["DetailedDescription"]);
                ThisChild.find(".PriceTB").val(value["Price"]);
                ThisChild.find(".UpperPriceTB").val(value["UpperPrice"]);
                ThisChild.find(".LowerPriceTB").val(value["LowerPrice"]);
                ThisChild.find(".DeliveryTimeTB").text(value["WaitTime"] + " [" + value["WaitTimeLabel"] + "]");
                //So that we can use either input elements or other HTML elements in the UI and it will always work,
                ThisChild.find(".ServiceTypeNameTB").text(value["ServiceTypeName"]);
                ThisChild.find(".ServiceNameTB").text(value["Name"]);
                ThisChild.find(".SummaryTB").text(value["Summary"]);
                ThisChild.find(".DetailedDescriptionTB").text(value["DetailedDescription"]);
                ThisChild.find(".PriceTB").text(value["Price"]);
                ThisChild.find(".UpperPriceTB").text(value["UpperPrice"]);
                ThisChild.find(".LowerPriceTB").text(value["LowerPrice"]);
                ThisChild.find(".DeliveryTimeTB").text(value["DeliveryTimeInHours"]);
                var LastUpdated = value["LastUpdatedDate"] + " ";
                LastUpdated += value["LastUpdatedTime"];
                ThisChild.find(".LastUpdatedTB").val(LastUpdated);
                var Props = value["Properties"]; //Gets all properties of this service
                var StringBuilder = "";
                if (Props != null)
                {
                    $.each(Props, function (index, Value)
                    {
                        StringBuilder += Value["Name"]; //Name of this property
                        var ValuesArray = Value["Values"]; //List of possible values this property can have
                        StringBuilder += ": ";
                        $.each(ValuesArray, function (SerialNo, Options)
                        {
                            StringBuilder += Options + ", "; /*This will get out each possible value of the
                             property as a separate entry. You can remove the string that adds a comma at
                             the end and capture each value in a separate UI element
                             */
                        });
                    });
                }
                ThisChild.find(".PropertiesTB").val(StringBuilder);
                //On click of details
                ViewServiceDetailsModalButton.click(function ()
                {
                    DisplayServiceDetails(value);
                });
                ApproveListing.click(function () {
                    var data = value["ID"];
                    ApproveServiceList(data);
                });
                DeclineListing.click(function () {
                    var data = value["ID"];
                    DeclineServiceList(data);
                });
                DeleteListing.click(function () {
                    DeleteServiceList(data);
                });
                ThisChild.appendTo(Parent).show();
            }

        });
        ChildClone.hide();
        $("#MyTextBox").html("Services Listed on our market:");
    }
}
function DisplayCreateCategoryInputs(params) {
    if (params !== "")
    {
        var CategoriesDropdownList = $("#ServiceCategoriesTB");
        var SubDropDownList = $("#ServiceSubCategoriesTB");
        $("<option />", {text: "--Please select a category--", value: 0}).appendTo(CategoriesDropdownList);
        $.each(params, function (index, Value)
        {
            var SubCategories = Value["SubCategories"];
            $("<option />", {text: capitaliseFirstLetter(Value["Name"]), value: Value["ID"],
                click: function ()
                {
                    SubDropDownList.empty();
                    $.each(SubCategories, function (i, Val)
                    {
                        $("<option />", {text: capitaliseFirstLetter(Val["Name"]), value: Val["ID"]}).
                                appendTo(SubDropDownList);
                    });
                }
            }).appendTo(CategoriesDropdownList);
        });
    }
}
function DisplaySaveNewServiceType(params) {
    if (params !== "")
    {
        alert(params);
    }
}
function DisplayCreateListingInput(params) {
    if (params !== "")
    {
        var CategoriesDropdownList = $("#ServiceCategoriesTB2");
        var SubDropDownList = $("#ServiceSubCategoriesTB2");
        $("<option />", {text: "--Please select a category--", value: 0}).appendTo(CategoriesDropdownList);
        $.each(params, function (index, Value)
        {
            var SubCategories = Value["SubCategories"];
            $("<option />", {text: capitaliseFirstLetter(Value["Name"]), value: Value["ID"],
                click: function ()
                {
                    SubDropDownList.empty();
                    $("<option />", {text: "--Select a sub category--", value: 0}).appendTo(SubDropDownList);
                    $.each(SubCategories, function (i, Val)
                    {
                        $("<option />", {text: capitaliseFirstLetter(Val["Name"]), value: Val["ID"]}).
                                appendTo(SubDropDownList);
                    });
                }
            }).appendTo(CategoriesDropdownList);
        });
    }
}
function DisplayShowAllServiceTypesBySubCategoryID(params) {
    if (params !== "")
    {
        var Container = $("#SelectPropertiesContainer");
        Container.empty();
        Parent.children(".clearclone").remove();
        var PropertiesNameDiv = Parent.find(".PropertiesNameDiv");
        PropertiesNameDiv.children(".clearclone").remove();
        var ServicesDropdownList = $(".ServiceTypesTB");
        ServicesDropdownList.empty();
        var AddOnDropdownList = $(".AddOnServiceTypesTB");
        $("<option />", {text: "--Please select a type of Service--", value: 0}).appendTo(ServicesDropdownList);
        $("<option />", {text: "--Please select an add-on Service--", value: 0}).appendTo(AddOnDropdownList);
        $.each(params, function (index, Value)
        {
            $("<option />", {text: capitaliseFirstLetter(Value["ServiceTypeName"]), value: Value["ID"],
                click: function ()
                {
                    var Props = Value["Properties"]; //Gets all the properties of this service type
                    if (Props != null)
                    {
                        $.each(Props, function (key, value)
                        {
                            var ChildClone = Parent.children(".clone");
                            var PropertyNameContainer = ChildClone.clone();
                            PropertyNameContainer.removeClass("clone");
                            PropertyNameContainer.removeClass("hide");
                            PropertyNameContainer.addClass("clearclone");
                            PropertyNameContainer.find(".PropertiesNameDiv").text((value["Name"]).trim()).addClass("bold");
                            PropertyNameContainer.find(".PropertiesNameTB").val((value["Name"]).trim()); //hidden textbox
                            var ValuesArray = value["Values"];
                            $.each(ValuesArray, function (SerialNo, Options)
                            {
                                var PropertiesNameLabel = PropertiesNameDiv.find(".clone");
                                var CheckBoxClone = PropertiesNameLabel.clone();
                                CheckBoxClone.removeClass("clone");
                                CheckBoxClone.removeClass("hide");
                                CheckBoxClone.addClass("clearclone");
                                CheckBoxClone.find(".PropertiesValueCheckBox")[0].name = Options;
                                CheckBoxClone.find(".PropertiesValueCheckBox").val(Options);
                                CheckBoxClone.find(".LabelText").html(Options);
                                CheckBoxClone.appendTo(PropertyNameContainer).show();
                            });
                            PropertyNameContainer.appendTo(Container).show();
                        });
                    }
                }
            }).appendTo(ServicesDropdownList);
            $("<option />", {text: capitaliseFirstLetter(Value["ServiceTypeName"]), value: Value["ID"]}).appendTo(AddOnDropdownList);
        });
    }
}
function DisplaySaveNewServiceListing(params) {
    if (params !== "")
    {
        alert(params);
    }
}
function DisplayApproveServiceListing(params) {
    if (params === "success") {
        swal({
            title: "Service Listing Approved!!!",
            text: "Action Completed",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success btn-sm',
            confirmButtonText: "Ok",
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info btn-sm',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}
function DisplayDeleteServiceListing(params) {
    if (params === "success") {
        swal({
            title: "Service Listing Deleted!!!",
            text: "Action Completed",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success btn-sm',
            confirmButtonText: "Ok",
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info btn-sm',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}
function DisplayDeclineServiceListing(params) {
    if (params === "success") {
        swal({
            title: "Service Listing Declined!!!",
            text: "Action Completed",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success btn-sm',
            confirmButtonText: "Ok",
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info btn-sm',
            confirmButtonText: 'Ok',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}
function DisplayNewServiceCategory(params) {
    if (params === "success") {
        swal({
            title: "Created!",
            text: "New service category created",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success btn-sm',
            confirmButtonText: "Ok",
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info btn-sm',
            confirmButtonText: 'Ok',
            onClose: function () {

            }
        });
    }
}
function DisplayNewServiceSubCategory(params) {
    if (params === "success") {
        swal({
            title: "Created!",
            text: "New service sub category created",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success btn-sm',
            confirmButtonText: "Ok",
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info btn-sm',
            confirmButtonText: 'Ok',
            onClose: function () {

            }
        });
    }
}
function DisplayLoadServiceCategories(params) {
    if (params !== "") {
        var mainParent = $("#categoryAccordion");
        var newChild = mainParent.find(".CategoryMain");
        var count = 0;
        $.each(params, function (index, value) {
            count++;
            var newId = "heading" + count;
            var newhref = "collapseO_" + count;
            var newClone = newChild.clone();
            newClone.find(".headingOne1").attr("id", newId);
            newClone.find(".controller_anchor").attr("href", "#" + newhref);
            newClone.find(".controller_anchor").attr("aria-controls", "#" + newhref);
            newClone.find(".Cat_Name").text(value["Name"]);
            newClone.find(".DESC-Serv").text(value["Description"]);
            newClone.find(".subcat-house").attr("id", newhref);
            var subCatParent = newClone.find(".subcat");
            var subCatChild = subCatParent.find(".subcat_clone");
            var subCats = value["SubCategories"];
            $.each(subCats, function (ind, val) {
                var subClone = subCatChild.clone();
                subClone.text(val["Name"]);
                subClone.click(function () {
                    showOnRight(val);
                });
                subClone.appendTo(subCatParent).show();
            });
            subCatChild.hide();
            newClone.appendTo(mainParent).show();
        });
        newChild.hide();
    }
}
function showOnRight(value) {
    $(".sCName").text(value["Name"]);
    $(".subcat-desc").text(value["Description"]);
    $("#subcatId").val(value["ID"]);
    $("#subParentCatId").val(value["CategoryID"]);
    var property = value["Properties"];
    $("#propColRight").empty();
    $("#propColLeft").empty();
    $.each(property, function (key, opt) {
        key += 2;
        if (key % 2 === 0) {
            createLeftButton(key, opt);
        } else if (key % 2 !== 0) {
            createRightButton(key, opt);
        }
    });
}
function createLeftButton(key, property) {
    var propParentLeft = $("#propColLeft");
    var pName = property["Name"];
    var pValues = property["Values"];
    var contClass = "groupL" + key;
    var dropClass = "vals-divL" + key;
    var propDiv = $('<div class="btn-group-justified groupL p-2 mb-2 "></div>');
    propParentLeft.append(propDiv);
    var dropBtn = $('<button type="button" class="dropdown-toggle btn btn-outline-secondary subCatPropNameL" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>').text(pName);
    var dropDiv = $('<div class="dropdown-menu form-control vals-divL"></div');
    $.each(pValues, function (ind, values) {
        var value = $.trim(values);
        var dropItem = $('<a class="dropdown-item valsL" href="#"></a>').text(value);
        dropDiv.append(dropItem);
    });
    propDiv.append(dropBtn);
    propDiv.append(dropDiv);
//    var dropButton = $('<button></button>').text(pName);
//    propParentRight.append(dropButton);
}
function createRightButton(key, property) {
    var propParentRight = $("#propColRight");
    var pName = property["Name"];
    var pValues = property["Values"];
    var contClass = "groupL" + key;
    var dropClass = "vals-divL" + key;
    var propDiv = $('<div class="btn-group-justified groupL p-2 mb-2 "></div>');
    propParentRight.append(propDiv);
    var dropBtn = $('<button type="button" class="dropdown-toggle btn btn-outline-secondary subCatPropNameL" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>').text(pName);
    var dropDiv = $('<div class="dropdown-menu form-control vals-divL"></div');
    $.each(pValues, function (ind, values) {
        var value = $.trim(values);
        var dropItem = $('<a class="dropdown-item valsL" href="#"></a>').text(value);
        dropDiv.append(dropItem);
    });
    propDiv.append(dropBtn);
    propDiv.append(dropDiv);
//   var dropButton = $('<button></button>').text(pName);
//   propParentRight.append(dropButton);
}
function DisplayLoadCategoriesSelect(params) {
    var select = $("#categoryID");
    $.each(params, function (key, value) {
        var opt = $('<option>').text(value["Name"]).val(value["ID"]);
        select.append(opt);
    });
}
function DisplayLoadCatNSubCatSelecet(params) {
    var select = $("#typeCatID");
    select.empty();
    $.each(params, function (key, value) {
        var opt = $('<option></options>').text(value["Name"]).val(value["ID"]);
        select.append(opt);
    });
    select.change(function () {
        var val = parseInt(select.val());
        var select2 = $("#typeSubCatID");
        select2.empty();
        $.each(params, function (key, value) {
            if (value["ID"] === val) {
                var subCats = value["SubCategories"];
                $.each(subCats, function (index, values) {
                    var opts = $('<option></option>').text(values["Name"]).val(values["ID"]);
                    select2.append(opts);
                });
            }
        });
    });
}
function DisplayLoadNewServiceType(params) {
    if (params === "success") {
        swal({
            title: "Created!",
            text: "New service type created",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success btn-sm',
            confirmButtonText: "Ok",
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info btn-sm',
            confirmButtonText: 'Ok',
            onClose: function () {

            }
        });
    }
}
//Services


//Monetisation
function DisplayMonetisationRules(params) {
    alert(params);
    if (params === "success") {
        swal({
            title: "Created!",
            text: "New rule created",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success btn-sm',
            confirmButtonText: "Ok",
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "Something went wrong!",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info btn-sm',
            confirmButtonText: 'Ok',
            onClose: function () {

            }
        });
    }
}
function DisplaySystemNewMonetisationRule(params) {
    if (params != "nuil") {
        var parent = $("#MonOptionParent");
        var childCard = parent.find(".MonOptionClone");
        $.each(params, function (key, value) {
            var title = key.split("-")[1];
            var newCard = childCard.clone();
            newCard.removeClass("hide");
            newCard.removeClass("MonOptionClone");
            var bg = "bg-secondary-400";
            var minVal = PriceFormat(parseInt(value["MinimumValue"]));
            var maxVal = PriceFormat(parseInt(value["MaximumValue"]));
            var PercentageMonetisation = parseInt(value["PercentageMonetisation"])+"%";
            var ContractTenor = value["ContractTenor"];
            var ChargeAmt = parseInt(value["ChargeAmt"]);
            var ApplicationFeeAmt = parseInt(value["ApplicationFeeAmt"]);
            var ChargeType = value["ChargeType"];
            if(ChargeType === "fixed"){
                ChargeAmt = PriceFormat(ChargeAmt);
            }else{
                ChargeAmt+="%";
            }
            var ApplicationFeeType = value["ApplicationFeeType"];
            if(ApplicationFeeType === "fixed"){
                ApplicationFeeAmt = PriceFormat(ApplicationFeeAmt);
            }else{
                ApplicationFeeAmt+="%";
            }
            var RuleName = value["RuleName"];
            var RuleDescription = value["RuleDescription"];
            var ID = value["optionId"];
            
            
            var AccessibleGroups = value["AccessibleGroups"];
            var DependentMonetisations = value["DependentMonetisations"];
            var chkAcc = AccessibleGroups[0];
            var chkDpd = DependentMonetisations[0];
            
            var visibility = "ON";
            var Visibility = parseInt(value["Visibility"]);
            if(Visibility == 0){
                visibility = "OFF";
            }
            title === "Monetisation" ? bg = "bg-violet-400" : title === "Commoditisation" ? bg = "bg-brown-400" : bg = "bg-primary-400";
            newCard.find(".card-heading0").addClass(bg);
            newCard.find(".MonOptionType").text(title);
            newCard.find(".MonOptionVisibility").text(visibility);
            newCard.find(".MonOptionName").text(RuleName);
            newCard.find(".MonOptionDesc").text(RuleDescription);
            newCard.find(".MonOptionMinVal").text(minVal);
            newCard.find(".MonOptionMaxVal").text(maxVal);
            newCard.find(".MonOptionPercentMonetised").text(PercentageMonetisation);
            newCard.find(".MonOptionAppFeeType").text(ApplicationFeeType);
            newCard.find(".MonOptionAppFeeAmt").text(ApplicationFeeAmt);
            newCard.find(".MonOptionExpDays").text(ContractTenor);
            newCard.find(".MonOptionChargesType").text(ChargeType);
            newCard.find(".MonOptionChargesAmt").text(ChargeAmt);
            if(chkAcc === "0-none"){
                newCard.find(".MonOptionNoAcc").removeClass("hide");
            }else{
                var accParent = newCard.find(".MonOptionAccParent");
                var accClone = newCard.find(".MonOptionAccClone");
                $.each(AccessibleGroups, function(index, val){
                    var newAccClone = accClone.clone();
                    newAccClone.removeClass("hide");
                    newAccClone.removeClass("MonOptionAccClone");
                    newAccClone.text(val.split("-")[1]);
                    accParent.append(newAccClone);
                });
                accParent.removeClass("hide");
            }
            if(chkDpd === "0-none"){
                newCard.find(".MonOptionNoDpdc").removeClass("hide");
            }else{
                var dpdParent = newCard.find(".MonOptionDpdcParent");
                var dpdClone = newCard.find(".MonOptionAccClone");
                $.each(DependentMonetisations, function(index, val){
                    var newDpdClone = dpdClone.clone();
                    newDpdClone.removeClass("hide");
                    newDpdClone.removeClass("MonOptionAccClone");
                    newDpdClone.text(val.split("-")[1]);
                    dpdParent.append(newDpdClone);
                });
                dpdParent.removeClass("hide");
            }
            
            var SwapVisibility = newCard.find(".SwapOptVisibility");
            var DeleteMonOption = newCard.find(".MonDeleteOption");
            SwapVisibility.click(function(){
                if(Visibility == 0){
                    Visibility = 1;
                    visibility = "ON";
                }else{
                    Visibility = 0;
                    visibility = "OFF";
                }
                var data = [ID, Visibility];
                GetData("Schemes", "ChangeMonOptionVisibility", "LoadMonOptionVisibility", data);
                newCard.find(".MonOptionVisibility").text(visibility);
            });
            DeleteMonOption.click(function(){
                swal({
                    title: "Delete?!",
                    text: "Do you want to proceed to delete this Monetisation Option?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '<i class="icon-checkmark3 mr-2"></i> Yes ',
                    cancelButtonText: '<i class="icon-reading mr-2"></i> No',
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        var data = [ID, 1];
                        GetData("Schemes", "DeleteMonetisationOption", "LoadDeleteMonetisationOption", data);
                    } else {
                        swal({
                            title: 'Not Deleted',
                            text: "No action taken!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
                
            });
            parent.prepend(newCard);
        });
    }
}
function DisplayMonetisationApplications(params) {
    var monAppParent = "";
    var child = $(".monAppClone");
    var count, count1, count2, count3, count4, count5, r;
    count = count1 = count2 = count3 = count4 = count5 = r = 1;
    if (params.length == 0 || params == "") {
        $("<div>").text("No monetisation data").addClass("text-center").appendTo(monAppParent);
    } else {
        $.each(params, function (ind, val) {
            var status = ind.split("-")[1];
            var newChild = child.clone();
            newChild.removeClass("monAppClone");
            newChild.removeClass("hide");
            newChild.addClass(ind);
            var DetailsButton = newChild.find(".ViewMonetisationGoods");
            var ApproveMonetisation = newChild.find(".ApproveMonetisation");
            var DeclineMonetisation = newChild.find(".DeclineMonetisation");
            var ReverifyGoods = newChild.find(".MonRequestReverification");
            var AppStatus = "";
            switch(status){
                case "pending":
                    count = count1++;
                    monAppParent = $("#monApplicationParent-Pending");
                    AppStatus = "Pending";
                    break;
                case "approved":
                    count = count2++;
                    monAppParent = $("#monApplicationParent-approved");
                    ApproveMonetisation.hide();
                    DeclineMonetisation.hide();
                    ReverifyGoods.hide();
                    AppStatus = "Approved";
                    break;
                case "declined":
                    count = count3++;
                    monAppParent = $("#monApplicationParent-declined");
                    AppStatus = "Declined";
                    ApproveMonetisation.hide();
                    DeclineMonetisation.hide();
                    ReverifyGoods.hide();
                    break;
                case "completed":
                    count = count4++;
                    monAppParent = $("#monApplicationParent-completed");
                    AppStatus = "Warrants Disbursed";
                    ApproveMonetisation.hide();
                    DeclineMonetisation.hide();
                    ReverifyGoods.hide();
                    break;
                case "settled":
                    count = count5++;
                    monAppParent = $("#monApplicationParent-settled");
                    AppStatus = "ODLine Settled";
                    ApproveMonetisation.hide();
                    DeclineMonetisation.hide();
                    ReverifyGoods.hide();
                    break;
            }
            
            var image_url = "../../../global_assets/app/img/ProfilePicture/user-" + val["userid"] + ".png";
            if (imageExists(image_url) === false) {
                image_url = "../../../global_assets/app/img/ProfilePicture/user-0.png";
            }
            newChild.find(".monAppUserImg").attr("src", image_url);
            var Name = val["UserName"];
            newChild.find(".MonApplCount").text(count);
            newChild.find(".monAppUserName").text(Name);
            newChild.find(".monAppDateTime").text(val["date_applied"]);
            newChild.find(".monUserID").val(val["userid"]);
            newChild.find(".userUsedMonRuleName").text(val["monName"]);
            newChild.find(".userUsedMonRuleID").text(val["monRuleId"]);
            var maxVal = PriceFormat(parseInt(val["warrants_calculated"]));
            newChild.find(".monExWarrants").text(PriceFormat(parseInt(val["calculated_goods_value"])));
            newChild.find(".monAppFeePd").text(PriceFormat(parseInt(val["amount_paid"])));
            newChild.find(".monAppFeeStatus").text(val["payment_status"]);
            newChild.find(".monAppAmtToMonitise").text(PriceFormat(parseInt(val["warrants_calculated"])));
            var appStatus = val["application_status"];
            var goodsVerifed = val["verified"];
            if (goodsVerifed == 1) {
                newChild.find(".verifiedBadge").removeClass("badge-secondary").addClass("badge-success").text("verified");
                newChild.find(".ApproveMonetisation").removeClass("disableClick");
            } else if (goodsVerifed == 2) {
                newChild.find(".verifiedBadge").removeClass("badge-secondary").addClass("badge-danger").text("Rejected");
            }
            newChild.find(".monAppStatus").text(AppStatus);
            newChild.find(".monAppUserPayRef").text(val["payment_reference"]);
            
            //Details Button
            DetailsButton.click(function () {
                $(".modal-view-monetisation-goods").on("show.bs.modal", function () {
                    MonetisationGoodsDetails(val);
                }).modal("show");
            });
            ApproveMonetisation.click(function () {
                swal({
                    title: "Approve this monetisation ?!",
                    text: "Approve the sum of " + maxVal + " to be paid to " + Name + "?",
                    type: 'info',
                    showCancelButton: true,
                    confirmButtonText: '<i class="icon-checkmark3 mr-2"></i> Yes ',
                    cancelButtonText: '<i class="icon-reading mr-2"></i> No',
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        var data = [val["id"], userid, "approved"];
                        GetData("Schemes", "ApproveMonApllication", "LoadMonApplicationApprove", data);
                    } else {
                        swal({
                            title: 'Not Approved',
                            text: "The request has not been approved!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
            });
            DeclineMonetisation.click(function () {
                swal({
                    title: "Decline Application ?!",
                    text: "Application will be declined",
                    type: 'info',
                    showCancelButton: true,
                    confirmButtonText: '<i class="icon-checkmark3 mr-2"></i> Yes ',
                    cancelButtonText: '<i class="icon-reading mr-2"></i> No',
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        var data = [val["id"], userid, "declined"];
                        GetData("Schemes", "ApproveMonApllication", "LoadMonApplicationApprove", data);
                    } else {
                        swal({
                            title: 'Not Approved',
                            text: "The request has not been approved!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
            });
            ReverifyGoods.click(function(){
                swal({
                    title: 'Send for Reverification',
                    text: "Do you want to request that these products be reverified?",
                    type: 'info',
                    showCancelButton: true,
                    confirmButtonText: '<i class="icon-checkmark3 mr-2"></i> Yes ',
                    cancelButtonText: '<i class="icon-reading mr-2"></i> No',
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        var ID = val["id"];
                        GetData("Schemes", "RequestMonGoodsReverification", "LoadUnerifyMonetisationListing", ID);
                    } else {
                        swal({
                            title: "Cancelled!!",
                            text: "No action taken",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
            });
            newChild.appendTo(monAppParent).show();
        });
        child.hide();
    }
}
function MonetisationGoodsDetails(details) {
    var parent = $("#mon-inv-property");
    parent.empty();
    var child = $(".monGoodClone");
    var productDetails = details['ProductDetails'];
    var count = 0;
    var grandTotal = 0;
    var verified = details["verified"];
    $.each(productDetails, function (index, product) {
        count++;
        var newChild = child.clone();
        newChild.removeClass("monGoodClone");
        newChild.removeClass("hide");
        newChild.addClass(index);
        var image_url = extension + "global_assets/app/img/UnlistedProductImages/product-" + index + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProductImages/product-0.png";
        }
        newChild.find(".monGoodCount").text(count);
        newChild.find(".monGoodImage").attr("src", image_url);
        newChild.find(".monGoodImage").attr("alt", "Product " + count + " Listied by " + details["UserName"] + " on the wealth market");
        var name = capitaliseFirstLetter(product["product_name"]);
        newChild.find(".monGoodName").text(name);
        newChild.find(".monGoodDesc").text(product["description"]);
        var price = parseInt(product["proposed_price"]);
        var newprice = PriceFormat(price);
        newChild.find(".monGoodPrice").text(newprice);
        var availQuantity = parseInt(product["quantity"]);
        var appliedQuantity = parseInt(product["ProdAppliedQuant"]);
        newChild.find(".monGoodAvailQuantity").text(availQuantity);
        newChild.find(".monGoodAppliedQuantity").text(appliedQuantity);
        var subTotal = price * appliedQuantity;
        grandTotal += subTotal;
        newChild.find(".monGoodSubtotal").text(PriceFormat(subTotal));
        newChild.appendTo(parent).show();
    });
    $("#gTotal").text(PriceFormat(grandTotal));
    var monetisationPercent = parseInt(details["MonetisationDetails"]["percent"]);
    var percentAmt = (monetisationPercent / 100) * grandTotal;
    var amtPaid = parseInt(details["amount_paid"]);
    var calcWarrants = parseInt(details["warrants_calculated"]);
    $(".amt-paid").text(PriceFormat(amtPaid));
    $(".calc-percent").text(PriceFormat(percentAmt));
    $(".calc-warrants").text(PriceFormat(calcWarrants));
    if (verified == 1) {
        $(".mon-verification").text("Verified on " + details["date_verified"]).removeClass("text-muted").addClass("text-success");
    } else if (verified == 2) {
        $(".mon-verification").text("Goods were not verified by the agent.").removeClass("text-muted").addClass("text-danger");
    } else {
        $(".mon-verification").text("waiting for verification").removeClass("text-success").addClass("text-muted");
    }
    
}
function DisplayMonApplyPendingVerification(params) {
    var parent = $("#monVerifyParent");
    var child = $(".monVerifyChild");
    if (params === "" || params === null || params.length === 0) {
        $("<div></div>").text("No pending verification").appendTo(parent);
    } else {
        $.each(params, function (index, value) {
            var thisChild = child.clone();
            thisChild.removeClass("monVerifyChild");
            thisChild.removeClass("hide");
            thisChild.addClass("monVerify" + index);
            var image_url = "../../../global_assets/app/img/ProfilePicture/user-" + value["userid"] + ".png";
            if (imageExists(image_url) === false) {
                image_url = "../../../global_assets/app/img/ProfilePicture/user-0.png";
            }
            thisChild.find(".monVerifyUserImg").attr("src", image_url);
            thisChild.find(".monVerifyUserName").text(value["UserName"]);
            thisChild.find(".monVerifyUserID").val(value["userid"]);
            var applicationID = value['Id'];
            thisChild.find(".monVerifyAppID").val(applicationID);
            thisChild.find(".monVerifyUserAppDate").text(value["aplliedDate"]);
            thisChild.find(".monVerifysuccessApps").text(value["successfulApplys"]);
            thisChild.find(".monverifyDeclinedApps").text(value["declinedApplys"]);
            var monetisationRuleName = value["MonDetails"]["rule_name"];
            thisChild.find(".VerifyUsedMonRuleName").text(monetisationRuleName);
            var viewDetails = thisChild.find(".ViewMonGoodsVerify");
            var DeclineAll = thisChild.find(".ViewMonGoodsVerify");
            viewDetails.click(function () {
                VerifyMonetisationGoods(value, applicationID);
            });
            thisChild.appendTo(parent).show();
        });
        child.hide();
    }

}
function VerifyMonetisationGoods(details, applicationID) {
    $(".modal-view-mon-verify-goods").on("show.bs.modal", function () {
        var parent = $("#mon-inv-verify");
        parent.empty();
        var child = $(".monVerifyClone");
        var ProductDetails = details["InvDetails"];
        var count = 0;
        var Total = 0;
        $.each(ProductDetails, function (index, value) {
            count++;
            var childClone = child.clone();
            childClone.removeClass("monVerifyClone");
            childClone.removeClass("hide");
            childClone.addClass(index);
            var prodId = value["id"];
            var image_url = extension + "global_assets/app/img/UnlistedProductImages/product-" + prodId + ".png";
            if (imageExists(image_url) === false) {
                image_url = extension + "global_assets/app/img/ProductImages/product-0.png";
            }
            var prodName = value["InvDetail"]["product_name"];
            var listedQty = value["InvDetail"]["quantity"];
            var ProdDesc = value["InvDetail"]["description"];
            var PropPrice = value["InvDetail"]["proposed_price"];
            var appliedQty = value["appliedQuant"];
            var subTotal = parseInt(PropPrice) * parseInt(appliedQty);
            childClone.find(".monVerifyCount").text(count);
            childClone.find(".monVerifyImage").attr("src", image_url);
            childClone.find(".monVerifyName").text(prodName);
            childClone.find(".monVerifyDesc").text(ProdDesc);
            childClone.find(".monVerifyAvailQuantity").text(listedQty);
            childClone.find(".monVerifyAppliedQuantity").text(appliedQty);
            childClone.find(".monVerifyPrice").text(PriceFormat(PropPrice));
            childClone.find(".monVerifySubtotal").text(PriceFormat(subTotal));
            childClone.find(".monVerifyCheck").attr("id", index);
            childClone.find(".monVerifyCheck").val(prodId + "-" + listedQty);
            childClone.find(".monVerifyCheckLabel").attr("for", index);
            //Total += subTotal;

            childClone.find("").text();
            childClone.appendTo(parent).show();
        });
        //$("").text(PriceFormat(Total));
        $("#verifyMonInv").click(function () {
            var selectedIDs = "";
            $.each($("input[name='monSelectedVerify']:checked"), function () {
                var selectedID = $(this).val();
                selectedIDs += ":" + selectedID;
            });
            if (selectedIDs == "") {
                alert("Select at least one product");
            } else {
                swal({
                    title: "Only selected goods will be verified!",
                    text: "Do you wish to proceed?",
                    type: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'Yes ',
                    cancelButtonText: 'No',
                    confirmButtonClass: 'btn btn-info',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false,
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        var data = [selectedIDs, applicationID, userid];
                        GetData("Schemes", "VerifyMonetisationListing", "LoadVerifyMonetisationListing", data);
                    } else {
                        swal({
                            title: 'Cancelled',
                            text: "No listing approved!",
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-success',
                            buttonsStyling: false
                        });
                    }
                });
            }

        });
        $("#declineMonInv").click(function () {
            swal({
                title: "No goods will be verified!",
                text: "Do you wish to proceed?",
                type: 'info',
                showCancelButton: true,
                confirmButtonText: 'Yes ',
                cancelButtonText: 'No',
                confirmButtonClass: 'btn btn-info',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false
            }).then(function (dismiss) {
                if (dismiss.value) {
                    var data = [applicationID, userid];
                    GetData("Schemes", "UnverifyMonetisationListing", "LoadUnerifyMonetisationListing", data);
                } else {
                    swal({
                        title: 'Cancelled',
                        text: "No action taken!",
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Ok!',
                        confirmButtonClass: 'btn btn-success',
                        buttonsStyling: false
                    });
                }
            });
        });
    }).modal("show");
}
function DisplayVerifyMonetisationListing(data) {
    if (data == "failed") {
        swal({
            title: 'Oops',
            text: "Something went wrong!",
            type: 'info',
            showCancelButton: false,
            confirmButtonText: 'Ok!',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false,
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: 'Success!!',
            text: "The product/service has been verified!",
            type: 'success',
            showCancelButton: false,
            confirmButtonText: 'Ok!',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false,
            onClose: function () {
                window.location.reload();
            }
        });
    }
}
function DisplayUnerifyMonetisationListing(data) {
    if (data == "success") {
        swal({
            title: 'Success!!',
            text: "Action Taken!",
            type: 'success',
            showCancelButton: false,
            confirmButtonText: 'Ok!',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false,
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: 'Oops',
            text: "Something went wrong!",
            type: 'info',
            showCancelButton: false,
            confirmButtonText: 'Ok!',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false,
            onClose: function () {
                window.location.reload();
            }
        });
    }
}
function DisplayMonApplicationApprove(params) {
    var data = params[0];
    var action = params[1];
    if (data == "success") {
        swal({
            title: 'Success!!',
            text: "The monetisation has been " + action + "!",
            type: 'success',
            showCancelButton: false,
            confirmButtonText: 'Ok!',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false,
            onClose: function () {
                window.location.reload();
            }
        });
    }else if(data === "Products confirmation failed"){
        swal({
            title: 'Error!!!',
            text: "The products used for this application was not confirmed by the system! Kindly decline the application",
            type: 'danger',
            showCancelButton: false,
            confirmButtonText: 'Ok!',
            confirmButtonClass: 'btn btn-warning',
            buttonsStyling: false,
            onClose: function () {
                window.location.reload();
            }
        });
    }else if(data === "Insufficient Balance to grant this monetisation Rights"){
        swal({
            title: 'Not Completed',
            html: "You do not have sufficient balance to grant this monetisation Rights!<br>Add warrants and Try again",
            type: 'warning',
            showCancelButton: false,
            confirmButtonText: 'Ok!',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false,
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: 'Oops',
            text: "Something went wrong!",
            type: 'info',
            showCancelButton: false,
            confirmButtonText: 'Ok!',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false,
            onClose: function () {
                window.location.reload();
            }
        });
    }
}
function DisplayApprovedMonApplications(params) {
    $(".mon-table-title").text(params[1] + " Monetisation Applications");
    var monAppParent = $("#monApplicationParent");
    var child = $(".monAppClone");
    if (params[0].length == 0 || params[0] == "") {
        $("<div>").text("No data available").addClass("text-center").appendTo(monAppParent);
    } else {
        monAppParent.empty();
        $.each(params[0], function (ind, val) {
            var newChild = child.clone();
            newChild.removeClass("monAppClone");
            newChild.removeClass("hide");
            newChild.addClass(ind);
            var image_url = "../../../global_assets/app/img/ProfilePicture/user-" + val["userid"] + ".png";
            if (imageExists(image_url) === false) {
                image_url = "../../../global_assets/app/img/ProfilePicture/user-0.png";
            }
            newChild.find(".monAppUserImg").attr("src", image_url);
            var Name = val["UserName"];
            newChild.find(".monAppUserName").text(Name);
            newChild.find(".monAppDateTime").text(val["date_applied"]);
            newChild.find(".monUserID").val(val["userid"]);
            newChild.find(".userUsedMonRuleName").text(val["monName"]);
            newChild.find(".userUsedMonRuleID").text(val["monRuleId"]);
            var maxVal = PriceFormat(parseInt(val["warrants_calculated"]));
            newChild.find(".monExWarrants").text(maxVal);
            newChild.find(".monAppFeePd").text(PriceFormat(parseInt(val["amount_paid"])));
            newChild.find(".monAppFeeStatus").text(val["payment_status"]);
            newChild.find(".monAppUserPayRef").text(val["payment_reference"]);
            var appStatus = val["application_status"];
            var goodsVerifed = val["verified"];
            if (goodsVerifed == 1) {
                newChild.find(".verifiedBadge").removeClass("badge-secondary").addClass("badge-success").text("verified");
                newChild.find(".ApproveMonetisation").removeClass("disableClick");
            } else if (goodsVerifed == 2) {
                newChild.find(".verifiedBadge").removeClass("badge-secondary").addClass("badge-danger").text("Rejected");
            }
            var AppStatus = "";
            appStatus == 0 ? AppStatus = "pending" : appStatus == 1 ? AppStatus = "Approved" : appStatus == 2 ? AppStatus = "Declined" : AppStatus = "Not Recognised!!!";
            newChild.find(".monAppStatus").text(AppStatus);
            newChild.find(".monAppUserPayRef").text(val["payment_reference"]);
            var DetailsButton = newChild.find(".ViewMonetisationGoods");
            var ApproveMonetisation = newChild.find(".ApproveMonetisation");
            var DeclineMonetisation = newChild.find(".DeclineMonetisation");
            //Details Button
            DetailsButton.click(function () {
                $(".modal-view-monetisation-goods").on("show.bs.modal", function () {
                    MonetisationGoodsDetails(val);
                }).modal("show");
            });
            ApproveMonetisation.hide();
            DeclineMonetisation.hide();
            newChild.appendTo(monAppParent).show();
        });
        child.hide();
    }
}
function DisplayNewMonetisationOptionParameters(params){
    var dependencies = params["DependencyParameters"];
    var accessibilities = params["AccessParameters"];
    if(dependencies.length >= 1){
        var chooseMonOptDpdParent1 = $("#monRuleChooseDependencies1");
        var chooseMonOptDpdParent2 = $("#monRuleChooseDependencies2");
        var chooseMonOptClone = $(".MonRuleDpdClone");
        $.each(dependencies, function(index, value){
            var key = parseInt(value.split("-")[1]);
            var Child = chooseMonOptClone.clone();
            Child.removeClass("MonRuleDpdClone");
            Child.removeClass("hide");
            Child.find(".monOptionDpdCheckbox").attr("id", "thisDpdChechBox"+key).val(key);
            Child.find(".monOptionDpdCheckbox").addClass("MonDependentOpts");
            Child.find(".monOptionDpdChkbxLabel").attr("for", "thisDpdChechBox"+key).text(value.split("-")[0]);
            var parent;
            if(index%2 === 0){
                parent = chooseMonOptDpdParent1;
            }else{
                parent = chooseMonOptDpdParent2;
            }
            parent.append(Child);
        });
    }else{
        $("<div></div>").text("No existent Monetisation options yet").appendTo($(".monRuleChooseDependencies1"));
    }
    if(accessibilities.length >= 1){
        var chooseMonAccesibilitiesParent = $("#monRuleChooseAccessibilitiesParent");
        var chooseMonAccClone = $(".MonRuleChooseAccessClone");
        $.each(accessibilities, function(index, value){
            var key = parseInt(value.split("-")[1]);
            var Child = chooseMonAccClone.clone();
            Child.removeClass("MonRuleChooseAccessClone");
            Child.removeClass("hide");
            Child.find(".MonRuleChooseAccChkbx").attr("id", "thisAccChechBox"+key).val(key);
            Child.find(".MonRuleChooseAccChkbx").addClass("MonAccessGroupsOpts");
            Child.find(".MonRuleChooseAccChkbxLabel").attr("for", "thisAccChechBox"+key).text(value.split("-")[0]);
            
            chooseMonAccesibilitiesParent.append(Child);
        });
    }else{
        $("<div></div>").text("No user groups created yet").appendTo($(".monRuleChooseDependencies1"));
    }
}
function DisplayMonOptionVisibility(params){
    if(params[0] === "success"){
        $.notify({
            title: "<strong>Visibility: </strong>",
            message: params[1]
        },{
            type: 'success'
        });
    }else{
        $.notify({
            title: "<strong>Something went wrong</strong>",
            message: "Try again"
        },{
            type: 'danger'
        });
    }
}
function DisplayDeleteMonetisationOption(params){
    if(params === "success"){
        swal({
            title: "Deleted!",
            text: "Monetisation Option been deleted!!.",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    }else{
        swal({
            title: "Oops!!!",
            text: "Something went wrong.",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}
function DisplayNewMonetisationRule(params){
    if(params === "success"){
        swal({
            title: "Created !!!",
            text: "New monetisation option created.",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    }else{
        swal({
            title: "Oops!!!",
            text: "Something went wrong.",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}

////portal-features
function schmVal(val) {
    $(".schmVal").val(val);
    var data = [actualuserid, val];
    GetData("Schemes", "GetUserQualifiedMonOptions", "LoadUserQualifiedMonetisationOption", data);
//    if(val === "Monetisation"){
//        GetData("Product", "GetUserProducts", "LoadUserProductsMon", userid);
//    }else if (schmVal === "Mobilisation" || schmVal === "Commoditisation") {
//        //GetData("Product", "GetUserProducts", "LoadUserProductsMon", userid);
//    }
    $(".monStep1").hide();
    $(".monStep2").removeClass("hide");
    $(".monSteps").text("Step 2");

}
function DisplayUserQualifiedMonetisationOption(params) {
    var parent = $("#monetisation-options-parent");
    if(jQuery.isEmptyObject(params)){
        $("<div></div>").html("<div class='text-center w-100'><b>Nothing to Show here yet! <br> Check back Later.</b></div>").appendTo(parent);
        $(".MonOptNext").hide();
    }else{
        parent.find(".newCloneElement").hide();
        var cloneThis = parent.find(".monetisation-options-clone");
        var schmVal = $(".schmVal").val();
        $.each(params, function (ind, value) {
        var schm = ind.split("-")[1];
        if (schm === schmVal) {
            var childClone = cloneThis.clone();
            childClone.addClass("newCloneElement");
            childClone.removeClass("monRulesClone");
            childClone.removeClass("hide");
            
            var minVal = PriceFormat(parseInt(value["MinimumValue"]));
            var maxVal = PriceFormat(parseInt(value["MaximumValue"]));
            var PercentageMonetisation = parseInt(value["PercentageMonetisation"])+"%";
            var ContractTenor = value["ContractTenor"];
            var ChargeAmt = parseInt(value["ChargeAmt"]);
            var ApplicationFeeAmt = parseInt(value["ApplicationFeeAmt"]);
            var ChargeType = value["ChargeType"];
            if(ChargeType === "fixed"){
                ChargeAmt = PriceFormat(ChargeAmt);
            }else{
                ChargeAmt+="%";
            }
            var ApplicationFeeType = value["ApplicationFeeType"];
            if(ApplicationFeeType === "fixed"){
                ApplicationFeeAmt = PriceFormat(ApplicationFeeAmt);
            }else{
                ApplicationFeeAmt+="%";
            }
            var RuleName = value["RuleName"];
            var RuleDescription = value["RuleDescription"];
            var ID = value["optionId"];
            
            childClone.find(".MonOptName-p").html("<b>"+RuleName+"</b>");
            childClone.find(".MonOptPercentMometised-p").text(PercentageMonetisation);
            childClone.find(".MonOptDesc-p").text(RuleDescription);
            childClone.find(".MonOptMinVal-p").text(minVal);
            childClone.find(".MonOptMaxVal-p").text(maxVal);
            childClone.find(".MonOptTenor-p").text(ContractTenor);
            childClone.find(".MonOptCharges-p").text(ChargeAmt);
            childClone.find(".MonOptAppFee-p").text(ApplicationFeeAmt);
            childClone.find(".MonOptId-p").text(ID);
            var Select = childClone.find(".MonOptSelectMon-p");
            Select.click(function(){
                GetData("Schemes", "GetUserEligibleMonetisationProducts", "LoadUserProductsMon", actualuserid);
                var val = JSON.stringify(value);
                $(".MonOptSelected-p").val(val);
                $(".monSteps").text("Step 3");
                $(".monStep2").addClass("hide");
                $(".monStep3").removeClass("hide");
                $(".monStep4").addClass("hide");
            });
            childClone.appendTo(parent).show();
        }
        cloneThis.hide();
    });
    }
    
}
function monStep4() {
    var toMonitize = [];
    var totalValue = 0;
    var StringifiedValue = "";
    $.each($("input[name='monSelectedGoods']:checked"), function () {
        toMonitize.push($(this).val());
    });
    if (toMonitize.length === 0) {
        //monStep3();
    } else {
        if (minValue > totalValue) {

        } else {
            $.each(toMonitize, function (index, value) {
                var item = JSON.parse(toMonitize[index]);
                totalValue += item[4];
                StringifiedValue += "" + item[0] + ">" + item[1] + ">" + item[2] + ">" + item[3] + ">" + item[4];
                if (index < (toMonitize.length - 1)) {
                    StringifiedValue += ":";
                }
            });
            var selectedMonRule = $(".MonOptSelected-p").val();
            var monRule = JSON.parse(selectedMonRule);
            var minValue = monRule["MinimumValue"];
            var maxValue = monRule["MaximumValue"];
            var percentMonitized = parseInt(monRule["PercentageMonetisation"]);
            var CashType = monRule["ApplicationFeeType"];
            var ChargeType = monRule["ChargeType"];
            var CashAmt = parseInt(monRule["ApplicationFeeAmt"]);
            var ChargeAmt = parseInt(monRule["ChargeAmt"]);
            var monRuleID = monRule["optionId"];
            var monetisationAmt = Math.ceil((percentMonitized / 100) * totalValue);
            var appFee;
            if(CashType === "fixed"){
                appFee = CashAmt;
            }else if(CashType === "percent"){
                appFee = Math.ceil((CashAmt / 100) * monetisationAmt);
            }
            var charge;
            if(ChargeType === "fixed"){
                charge = ChargeAmt;
            }else if(ChargeType === "percent"){
                charge = Math.ceil((ChargeAmt / 100) * monetisationAmt);
            }
            $(".monAppFee").text(PriceFormat(appFee));
            $(".monAppCharge").text(PriceFormat(charge));
            $(".monProdTotVal").text(PriceFormat(totalValue));
            $(".monWarrant").text(PriceFormat(monetisationAmt));
            var schmVal = $(".schmVal").val();
            $(".schemeType").text(schmVal);
            if (minValue > totalValue && maxValue < totalValue) {
                $(".monProdTotVal").removeClass("text-primary");
                $(".monProdTotVal").addClass("text-danger");
                $(".monPay").addClass("hide");
                $(".errMsg").removeClass("hide");
            } else {
                $(".monPay").removeClass("hide");
                $(".errMsg").addClass("hide");
                $(".monProdTotVal").addClass("text-primary");
                $(".monProdTotVal").removeClass("text-danger");
            }
            $(".monSteps").text("Step 4");
            $(".monStep3").addClass("hide");
            $(".monStep4").removeClass("hide");
            var data = [StringifiedValue, monRuleID, actualuserid];
            data = JSON.stringify(data);
            $("#monSubmitData").val(data);
        }

    }

}
function DisplaySubmitMonApplication(params){
    if(params === "success"){
        swal({
            title: "Submitted!",
            text: "Application submitted and awaiting approval.",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}
function DisplayUserProductsMon(params) {
    var parent = $("#monGoodParent");
    parent.find(".clone-child").remove();
    var selectedMonRule = $(".MonOptSelected-p").val();
    var monOptionSelected = JSON.parse(selectedMonRule);
    var minValue = monOptionSelected["MinimumValue"];
    var maxValue = monOptionSelected["MaximumValue"];
    if (params === "none") {
        $("<div />", {class: "padding", text: "No Product"}).appendTo(parent);
    } else {
        var count = 0;
        var childclone = parent.find(".monGoodClone");
        $.each(params, function (id, details) {
            var status = details["status"];
            if (status === "Accepted") {
                count++;
                var newchild = childclone.clone();
                newchild.removeClass("monGoodClone");
                newchild.removeClass("hide");
                newchild.addClass("clone-child");
                var image_url = extension + "global_assets/app/img/UnlistedProductImages/product-" + id + ".png";
                if (imageExists(image_url) === false) {
                    image_url = extension + "global_assets/app/img/ProductImages/product-0.png";
                }
                newchild.find(".monGoodCount").text(count);
                newchild.find(".MonGoodProductId").addClass("MonGoodProductId"+count).val(id);
                newchild.find(".monGoodImage").attr("src", image_url);
                newchild.find(".monGoodImage").attr("alt", "Product " + count + " Listied by " + id + " on the wealth market");
                var name = capitaliseFirstLetter(details["product_name"]);
                newchild.find(".monGoodName").addClass("monGoodName"+id).text(name);
                newchild.find(".monGoodDesc").text(details["description"]);
                var checkid = "check-" + id;
                newchild.find(".monGoodCheck").attr("id", checkid);
                newchild.find(".monGoodCheck").addClass("MonGoodCheckbox").addClass("MonGoodCheckbox"+id);
                newchild.find(".monGoodCheckLabel").attr("for", checkid);
                newchild.find(".monGoodQuantity").addClass("monGoodQuantity"+id);
                newchild.find(".monGoodSubtotal").addClass("monGoodSubtotal"+id);
                var price = details["proposed_price"];
                var newprice = PriceFormat(price);
                newchild.find(".monGoodPrice").text(newprice);
                newchild.find(".hiddenMonPrice").addClass("hiddenMonPrice"+id).val(price);
                var Quantity = parseInt(details["quantity"]);
                newchild.find(".hiddenListedQuantity").addClass("hiddenListedQuantity"+id).val(Quantity);
                var subTotal;
                if (Quantity > 0) {
                    newchild.find(".monGoodQuantity").text(Quantity).val(Quantity).attr("max", Quantity);
                    subTotal = Quantity * parseInt(price);
                    newchild.find(".monGoodSubtotal"+id).text(PriceFormat(subTotal));
                    newchild.find(".hiddenMonSubtotal").addClass("hiddenMonSubtotal"+id).val(subTotal);
                } else {
                    newchild.find(".monGoodQuantity").text("Invalid").prop("disabled", true);
                }

                var quantInput = newchild.find(".monGoodQuantity"+id);
                var goodChecked = newchild.find("#" + checkid);
                quantInput.change(function () {
                    var quant = parseInt($(this).val());
                    if (quant > Quantity) {
                        $(this).val(Quantity);
                    } else {
                        var amt = parseInt(price);
                        var subTtl = quant * amt;
                        newchild.find(".monGoodSubtotal"+id).text(PriceFormat(subTtl));
                        newchild.find(".hiddenMonSubtotal"+id).val(subTtl);
                        //goodChecked.click();
                    }
                });
                goodChecked.click(function () {
                    var checked = !this.checked;
                    var thisClass = ".MonGoodCheckbox"+id;
                    MarkCheck(id, thisClass, checked, minValue, maxValue);
                });
                newchild.appendTo(parent).show();
            }
        });
        $(".selectAllMonProducts").click(function(){
            $(".MonGoodCheckbox").each(function() {
                var thisId = $(this).attr('id');
                var id = thisId.split("-")[1];
                var checked = this.checked;
                var thisClass = ".MonGoodCheckbox"+id;
                MarkCheck(id, thisClass, checked, minValue, maxValue);
                this.checked = !this.checked;
            });
        });
    }
}
function MarkCheck(id, thisClass, checked, minValue, maxValue){
    var quant = parseInt($(".monGoodQuantity"+id).val());
    var Total = parseInt($("#gTotalHidden").val());
    var subTotal = parseInt($(".hiddenMonSubtotal"+id).val());
    var image_url = extension + "global_assets/app/img/UnlistedProductImages/product-" + id + ".png";
    if (imageExists(image_url) === false) {
        image_url = extension + "global_assets/app/img/ProductImages/product-0.png";
    }
    if (!checked) {
        var arr = new Array();
        arr[0] = id;
        arr[1] = $(".monGoodName"+id).text();
        arr[2] = parseInt($(".hiddenMonPrice"+id).val());
        arr[3] = parseInt($(".monGoodQuantity"+id).val());
        arr[4] = subTotal;
        var value = JSON.stringify(arr);
        $(thisClass).val(value);
        var vl = $(thisClass).val();
        vl = JSON.parse(vl);
        $(".monGoodQuantity"+id).prop('disabled', true);
        Total += subTotal;
        minValue = parseInt(minValue);
        maxValue = parseInt(maxValue);
        var txtColor = "text-danger";
        if(Total > minValue && Total < maxValue){
            $(".MonApplGoToSummary").removeClass("hide");
            txtColor = "text-success";
        }else{
            $(".MonApplGoToSummary").addClass("hide");
        }
        $("#gTotalHidden").val(Total);
        $("#gTotal").text(PriceFormat(Total));
        $.notify({
            title: "<strong>Name:</strong> "+vl[1],
            message: "<br/> <strong>Quantities added:</strong> "+quant+
                    "<br/><strong>SubTotal:</strong> "+PriceFormat(vl[4])+"<hr/><strong>Total Added: </strong><span class='"+txtColor+"'>"+
                    PriceFormat(Total)+
                    "</span><br/> <strong>Minimum Value:</strong> "+PriceFormat(minValue)+"<br/> <strong>Maximum Value:</strong> "+PriceFormat(maxValue)
        },{
            type: 'success'
        });
    } else {
        $(".monGoodQuantity"+id).prop('disabled', false);
        Total -= subTotal;
        minValue = parseInt(minValue);
        maxValue = parseInt(maxValue);
        var txtColor = "text-danger";
        if(Total < minValue && Total > maxValue){
            $(".MonApplGoToSummary").removeClass("hide");
            txtColor = "text-success";
        }else{
            $(".MonApplGoToSummary").addClass("hide");
        }
        $("#gTotalHidden").val(Total);
        $("#gTotal").text(PriceFormat(Total));
        $.notify({
            title: "<strong>Total:</strong>",
            message: "<strong>Total Added: </strong><span class='"+txtColor+"'>"+
                    PriceFormat(Total)+
                    "</span><br/> <strong>Minimum Value:</strong> "+PriceFormat(minValue)+"<br/> <strong>Maximum Value:</strong> "+PriceFormat(maxValue),
            allow_dismiss: true,
            placement: {
                from: 'top',
                align: 'left'
            }
        });
    }
}
function DisplayMonetisationAppFee(data) {
    if (data[2] == "Successful") {
        swal({
            title: data[2],
            text: data[0],
            type: data[1],
            showCancelButton: false,
            confirmButtonClass: 'btn btn-' + data[1],
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: data[2],
            text: "The Monetisation Apllicaton Failed, Contact an Admin",
            type: "danger",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-' + data[1],
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    }
}
function DisplayMyMonApplications(params){
    var monAppParent = $("#myMonApplicationParent");
    var child = $(".myMonAppClone");
    if(params.length == 0 || params == ""){
        $("<div>").text("No pending monetisation applications").addClass("text-center").appendTo(monAppParent);
    }else{
        monAppParent.empty();
        $.each(params, function(ind, val){
            var newChild = child.clone();
            newChild.removeClass("myMonAppClone");
            newChild.removeClass("hide");
            newChild.addClass(ind);
            var image_url = "../../../global_assets/app/img/ProfilePicture/user-" + val["userid"] + ".png";
            if (imageExists(image_url) === false) {
                image_url = "../../../global_assets/app/img/ProfilePicture/user-0.png";
            }
            newChild.find(".monAppUserImg").attr("src", image_url);
            var Name = val["UserName"];
            newChild.find(".monAppUserName").text(Name);
            newChild.find(".monAppDateTime").text(val["date_applied"]);
            newChild.find(".monUserID").val(val["userid"]);
            newChild.find(".userUsedMonRuleName").text(val["monName"]);
            newChild.find(".userUsedMonRuleID").text(val["monRuleId"]);
            var maxVal = PriceFormat(parseInt(val["calculated_goods_value"]));
            var actualamountMonetised = parseInt(val["warrants_calculated"]);
            newChild.find(".monAppGoodsVal").text(maxVal);
            newChild.find(".monAppAmtMonetised").text(PriceFormat(actualamountMonetised));
            newChild.find(".monAppFeePd").text(PriceFormat(parseInt(val["amount_paid"])));
            newChild.find(".monAppFeeStatus").text(val["payment_status"]);
            newChild.find(".monAppUserPayRef").text(val["payment_reference"]);
            var appStatus = val["application_status"];
            var paymentamount = parseInt(val["AppFee_Calculated"]);
            var goodsVerifed = val["verified"];
            if(goodsVerifed == 1){
                newChild.find(".verifiedBadge").removeClass("badge-secondary").addClass("badge-success").text("verified");
                newChild.find(".ApproveMonetisation").removeClass("disableClick");
            }else if(goodsVerifed == 2){
                newChild.find(".verifiedBadge").removeClass("badge-secondary").addClass("badge-danger").text("Rejected");
            }
            var AppStatus = "";
            appStatus == 0 ? AppStatus = "pending" : appStatus == 1 ? AppStatus = "Approved" : appStatus == 2 ? AppStatus = "Declined": appStatus == 3 ? AppStatus = "Rights Granted": appStatus == 4 ? AppStatus = "Completed": AppStatus = "Not Recognised!!!";
            newChild.find(".monAppStatus").text(AppStatus);
            newChild.find(".monAppUserPayRef").text(val["payment_reference"]);
            var DetailsButton = newChild.find(".ViewMonetisationGoods");
            var PayButton = newChild.find(".PayMonAppFee");
            if(appStatus == 1){
                PayButton.removeClass("hide").removeClass("disableClick");
            }
            //Details Button
            DetailsButton.click(function(){
                $(".modal-view-user-monetisation-goods").on("show.bs.modal", function(){
                    MonetisationGoodsDetailsP(val);
                }).modal("show");

            });
            PayButton.click(function(){
                payWithPaystack(val["id"], paymentamount, val["UserEmail"], paymentamount, "Monetisation Application Fee");
            });
            newChild.appendTo(monAppParent).show();
        });
        child.hide();
    }
}
function MonetisationGoodsDetailsP(details){
    var parent = $("#mon-inv-details");
    parent.empty();
    var child = $(".monGoodCloneP");
    var productDetails = details['ProductDetails'];
    var count = 0;
    var grandTotal = 0;
    var verified = details["verified"];
    $.each(productDetails, function(index, product){
        count++;
        var newChild = child.clone();
        newChild.removeClass("monGoodClone");
        newChild.removeClass("hide");
        newChild.addClass(index);
        var image_url = extension + "global_assets/app/img/UnlistedProductImages/product-" + index + ".png";
        if (imageExists(image_url) === false) {
            image_url = extension + "global_assets/app/img/ProductImages/product-0.png";
        }
        newChild.find(".monGoodCount").text(count);
        newChild.find(".monGoodImage").attr("src", image_url);
        newChild.find(".monGoodImage").attr("alt", "Product "+ count+ " Listied by " + details["UserName"] + " on the wealth market");
        var name = capitaliseFirstLetter(product["product_name"]);
        newChild.find(".monGoodName").text(name);
        newChild.find(".monGoodDesc").text(product["description"]);
        var price = parseInt(product["proposed_price"]);
        var newprice = PriceFormat(price);
        newChild.find(".monGoodPrice").text(newprice);
        var availQuantity = parseInt(product["quantity"]);
        var appliedQuantity = parseInt(product["ProdAppliedQuant"]);
        newChild.find(".monGoodAvailQuantity").text(availQuantity);
        newChild.find(".monGoodAppliedQuantity").text(appliedQuantity);
        var subTotal = price * appliedQuantity;
        grandTotal += subTotal;
        newChild.find(".monGoodSubtotal").text(PriceFormat(subTotal));
        newChild.appendTo(parent).show();
    });
    $("#gTotalP").text(PriceFormat(grandTotal));
    
    var monetisationPercent = parseInt(details["MonetisationDetails"]["percent"]);
    var percentAmt = (monetisationPercent/100) * grandTotal;
    var amtPaid = parseInt(details["amount_paid"]);
    var calcWarrants = parseInt(details["warrants_calculated"]);
    $(".amt-paid").text(PriceFormat(amtPaid));
    $(".calc-percent").text(PriceFormat(percentAmt));
    $(".calc-warrants").text(PriceFormat(calcWarrants));
    if(verified == 1){
        $(".mon-verification").text("Verified on "+details["date_verified"]).removeClass("text-muted").addClass("text-success");
    }else if(verified == 2){
        $(".mon-verification").text("Goods were not verified by the agent.").removeClass("text-muted").addClass("text-danger");
    }else{
        $(".mon-verification").text("waiting for verification").removeClass("text-success").addClass("text-muted");
        
    }
    
}
function DisplayMonPayAppFee(data){
    swal({
        title: data[0],
        text: data[2],
        type: data[1],
        showCancelButton: false,
        confirmButtonClass: 'btn btn-' + data[1],
        confirmButtonText: 'Continue',
        onClose: function () {
            window.location.reload();
        }
    });
}
//Monetisation

//complaints and change details

function DisplayShopComplaints(data) {
    hideLoader();
    var parent = $(".complainList");
    if (data === "none") {
        parent.text("No result");
    } else {
        var childClone = parent.find(".clone");
        var newcount = 0;
        $.each(data, function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newcount++;
            newchild.find(".complainSN").text(newcount);
            newchild.find(".complainOrderNumber").text(details["ordernumber"]);
            newchild.find(".complainSubject").text(details["subject"]);
            newchild.find(".complainDescription").text(details["description"]);
            newchild.find(".complainDate").text(details["date"]);
//            newchild.find(".complainStatus").text(details["status"]);
            if (details["status"] === "Unresolved") {
                newchild.find(".complainStatus").text(details["status"]).addClass("badge bg-orange");
                newchild.find(".complainResolve").show();
            } else {
                newchild.find(".complainStatus").text(details["status"]).addClass("badge badge-success");
//                newchild.find(".complainResolve").removeClass("hide");
                newchild.find(".complainResolve").hide();
            }

            newchild.find(".complainResolve").click(function () {
                swal({
                    title: 'Resolve?',
                    text: 'Resolve ' + details["ordernumber"] + ' complain',
                    type: 'success',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    cancelButtonClass: 'btn btn-warning',
                    closeOnConfirm: true,
                    closeOnCancel: false,
                    buttonsStyling: false
                }).then(function (dismiss) {
                    if (dismiss.value) {
                        var prodid = details["id"];
                        var data = [prodid, "List"];
                        showLoader();
                        GetData("Product", "ResolveComplaint", "ResolveComplaint", data);
                    } else {
                        swal({
                            title: 'Unresolved',
                            text: "Complain Unresolved!",
                            type: 'warning',
                            showCancelButton: false,
                            confirmButtonText: 'Ok!',
                            confirmButtonClass: 'btn btn-warning',
                            buttonsStyling: false
                        });
                    }
                });
            });
            newchild.appendTo(parent);
        });
        childClone.hide();
    }
}
function ResolveComplaint(data) {
    hideLoader();
    if (data === "success") {
        swal({
            title: "Resolve Complaint!",
            text: "Succesful",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    } else {
        swal({
            title: "Resolve Complaint",
            text: "Oops!, something went wrong, please try again.",
            type: "error",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
            }
        });
    }

}

function DisplayUserRequestedChanges(data) {
    hideLoader();
    var parent = $(".UserRequestedChanges");
    if (data === "none") {
        parent.text("No result");
    } else {
        var childClone = parent.find(".clone");
        var newcount = 0;
        $.each(data, function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newcount++;
            newchild.removeClass("hide");
            newchild.find(".UserreqchangesCount").text(newcount);
            newchild.find(".UserreqchangesSubject").text(details["subject"]);
            newchild.find(".UserreqchangesOld").text(details["old_detail"]);
            newchild.find(".UserreqchangesNew").text(details["new_detail"]);
            newchild.find(".UserreqchangesDateAndTime").text(details["date"]);
            newchild.find(".UserreqchangesStatus").text(details["status"]);
            if (details["status"] === "Pending") {
                newchild.find(".UserreqchangesStatus").text(details["status"]).addClass("badge bg-orange");
            } else if (details["status"] === "Rejected") {
                newchild.find(".UserreqchangesStatus").text(details["status"]).addClass("badge badge-danger");
            } else if (details["status"] === "Approved") {
                newchild.find(".UserreqchangesStatus").text(details["status"]).addClass("badge badge-success");
            }
            newchild.appendTo(parent);
        });
        $(".UserreqchangesCounticon").text(newcount);
        childClone.hide();
    }
}

function DisplayRequestChange(data) {
    if (data === "success") {
        swal({
            title: "Request Success",
            text: "Your Request has been made",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'Ok!',
            onClose: function () {
                window.location.reload();
//                GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);
            }
        });
    } else {
        swal({
            title: "Oops!",
            text: "something went wrong",
            type: "info",
            showCancelButton: false,
            confirmButtonClass: 'btn btn-info',
            confirmButtonText: 'Retry',
            onClose: function () {
                window.location.reload();
//                GetData("User", "GetMemberDetails", "LoadMemberDetails", userid);
            }
        });
    }
}
function DisplayRequestedChanges(data) {
    hideLoader();
    var parent = $(".RequestedChanges");
    if (data === "none") {
        parent.text("No result");
    } else {
        var childClone = parent.find(".clone");
        var newcount = 0;
        $.each(data, function (id, details) {
            var newchild = childClone.clone();
            newchild.removeClass("clone");
            newcount++;
            newchild.find(".reqchangesCount").text(newcount);
            newchild.find(".reqchangesSubject").text(details["subject"]);
            newchild.find(".reqchangesOld").text(details["old_detail"]);
            newchild.find(".reqchangesNew").text(details["new_detail"]);
            newchild.find(".reqchangesDateAndTime").text(details["date"]);
            newchild.find(".reqchangesStatus").text(details["status"]);
            if (details["status"] === "Pending") {
                newchild.find(".reqchangesStatus").text(details["status"]).addClass("badge bg-orange");
                newchild.find(".reqaction").show();
            } else if (details["status"] === "Rejected") {
                newchild.find(".reqchangesStatus").text(details["status"]).addClass("badge badge-danger");
                newchild.find(".reqaction").hide();
            } else if (details["status"] === "Approved") {
                newchild.find(".reqchangesStatus").text(details["status"]).addClass("badge badge-success");
                newchild.find(".reqaction").hide();
            }
            var approveChanges = newchild.find(".approvechange");
            approveChanges.click(function () {
                ApproveRequestedChanges(id, details["new_detail"], details["subject"], "Approved", details["userid"]);
            });
            var rejectChanges = newchild.find(".rejectchange");
            rejectChanges.click(function () {
                RejectRequestedChanges(id, details["subject"], details["userid"], "Rejected");
            });
            newchild.appendTo(parent);
        });
        $(".reqchangesCounticon").text(newcount);
        childClone.hide();
    }
}
function ApproveRequestedChanges(RequestedID, new_detail, subject, Status, Userid) {
    swal({
        title: 'Approve Change Request',
        type: 'warning',
        showCancelButton: true,
        text: 'Approve the requested changes, do you wish to continue?',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
    }).then(function (dismiss) {
        if (dismiss.value) {
            var data = [RequestedID, new_detail, subject, Status, Userid];
            showLoader();
            GetData("User", "ApproveRequestedChanges", "LoadGeneralAlert", data);
        } else {
            swal({
                title: 'Error',
                text: "No changes made!",
                type: 'error',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-error',
                buttonsStyling: false
            });
        }
    });
}
function RejectRequestedChanges(RequestedID, Status, subject, Userid) {
    swal({
        title: 'Reject Change Request',
        text: 'Reject the requested changes, do you wish to continue?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        cancelButtonClass: 'btn btn-warning',
        closeOnConfirm: true,
        closeOnCancel: false,
        buttonsStyling: false
    }).then(function (dismiss) {
        if (dismiss.value) {
            var data = [RequestedID, Status, subject, Userid];
            showLoader();
            GetData("User", "RejectRequestedChanges", "LoadGeneralAlert", data);
        } else {
            swal({
                title: 'Unresolved',
                text: "Requested Changes Unresolved!",
                type: 'error',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                confirmButtonClass: 'btn btn-warning',
                buttonsStyling: false
            });
        }
    });
}
//complaints and change details
function linkToFunction(action, params) {
    switch (action) {
        case "LoadUserAddressTypes":
        {
            DisplayUserAddressTypes(params);
            break;
        }
        case "LoadStates":
        {
            DisplayStates(params);
            break;
        }
        case "LoadLGAs":
        {
            Displaylgas(params);
            break;
        }
        case "LoadTowns":
        {
            DisplayTowns(params);
            break;
        }
        case "LoadLCDAs":
        {
            DisplayLCDAs(params);
            break;
        }
        case "LoadBusStops":
        {
            DisplayBusStops(params);
            break;
        }
        case "LoadStreets":
        {
            DisplayStreets(params);
            break;
        }
        case "ShowstateValue":
        {
            DisplayStateValue(params);
            break;
        }
        case "ShowlgaValue":
        {
            DisplayLGAValue(params);
            break;
        }
        case "ShowlcdaValue":
        {
            DisplayLCDAValue(params);
            break;
        }
        case "ShowtownValue":
        {
            DisplayTownValue(params);
            break;
        }
        case "ShowbstopValue":
        {
            DisplayBstopValue(params);
            break;
        }
        case "LoadNewSection":
        {
            DisplayNewSection(params);
            break;
        }
        case "LoadUserAddress":
        {
            DisplayAddUserAddress(params);
        }
        case "LoadAddUserAddressAfterEdit":
        {
            DisplayAddUserAddressAfterEdit(params);
        }
        case "LoadPickUpCenterOptionAfterEdit":
        {
            DisplayPickUpCenterOptionAfterEdit(params);
            hideLoader();
            break;
        }
        case "LoadBanks":
        {
            DisplayBanks(params);
            break;
        }
        case "LoadAddress":
        {
            DisplayAddress(params);
            break;
        }
        case "LoadRecovery":
        {
            DisplayRecovery(params);
            break;
        }
        case "LoadAfterPasswordReset":
        {
            DisplayUserLogin(params);
            break;
        }
        case "LoadRegistration":
        {
            DisplayRegistration(params);
            break;
        }
        case "LoadValidateAccount":
        {
            DisplayValidateAccount(params);
            break;
        }
        case "LoadUserLogin":
        {
            DisplayUserLogin(params);
            break;
        }
        case "LoadMemberDetails":
        {
            DisplayMemberDetails(params);
            break;
        }
        case "LoadActualMemberDetails":
        {
            DisplayActualMemberDetails(params);
            break;
        }
        case "LoadUserDetails":
        {
            DisplayUpdateUserDetails(params);
            break;
        }
        case "LoadPassword":
        {
            DisplayPasswordReset(params);
            break;
        }
        case "LoadListAndUnlistProduct":
        {
            DisplayListAndUnlistProduct(params);
            break;
        }
        case "LoadShopProducts":
        {
            DisplayShopProducts(params);
            break;
        }
        case "LoadProductsForPromo":
        {
            DisplayProductsForPromo(params);
            break;
        }
        case "LoadShopOrders":
        {
            DisplayShopOrders(params);
            break;
        }
        case "LoadProductsListed":
        {
            DisplayListedProduct(params);
            break;
        }
        case "LoadProductSuppliers":
        {
            DisplayProductSuppliers(params);
            break;
        }
        case "LoadSupplierProducts":
        {
            DisplaySupplierProducts(params);
            break;
        }
        case "LoadSupplierOrders":
        {
            DisplaySupplierOrders(params);
            break;
        }
        case "LoadShopServices":
        {
            DisplayShopServices(params);
            break;
        }
        case "LoadAllUsers":
        {
            DisplayAllUsers(params);
            break;
        }
        case "LoadAllUserList":
        {
            DisplayAllUserList(params);
            break;
        }
        case "LoadAllUsersCount":
        {
            DisplayAllUsersCount(params);
            break;
        }
        case "LoadMakeAgent":
        {
            DisplayMakeAgent(params);
            break;
        }
        case "LoadBusinessIndustries":
        {
            DisplayBusinessIndustries(params);
            break;
        }
        case "LoadBusinessTypes":
        {
            DisplayBusinessTypes(params);
            break;
        }
        case "LoadRegisterAndSendSempleContract":
        {
            DisplayRegisterAndSendSempleContract(params);
            break;
        }
        case "LoadUserRegistration":
        {
            DisplayUserRegistration(params);
            break;
        }
        case "LoadUserMYCASearchDetails":
        {
            DisplayUserSearchDetails(params, $("#verifyMYCA-list"));
            break;
        }
        case "LoadUserSearchDetails":
        {
            DisplayUserSearchDetails(params, $(".verifyAcct-list"));
            break;
        }
        case "LoadAgentUserSearchDetails":
        {
            DisplayUserSearchDetails(params, $("#verifyAgent-list"));
            break;
        }
        case "LoadSearchResultUserDetails":
        {
            DisplaySearchResultUserDetails(params);
            break;
        }
        case "LoadSearchUserDetails":
        {
            DisplaySearchUserDetails(params);
            break;
        }
        case "LoadUsersList":
        {
            DisplayMembersList(params, $(".members-list"));
            break;
        }
        case "LoadUserContactList":
        {
            DisplayMembersList(params, $("#contact-list"));
            break;
        }
        case "LoadUserStaffList":
        {
            DisplayMembersList(params, $(".staff-list"));
            break;
        }
        case "LoadGrantSempleContractODLine":
        {
            DisplayGrantSempleContractODLine(params);
            break;
        }
        case "LoadMessages":
        {
            DisplayMessages(params);
            break;
        }
        case "LoadMessageCounts":
        {
            DisplayMessageCounts(params);
            break;
        }
        case "LoadTrashMessage":
        {
            DisplayTrashMessage(params);
            break;
        }
        case "LoadRecoveredMessage":
        {
            DisplayRecoveredMessage(params);
            break;
        }
        case "LoadNewMessage":
        {
            DisplayNewMessage(params);
            break;
        }
        case "LoadAccountDefinitions":
        {
            DisplayAccountDefinitions(params);
            break;
        }
        case "LoadAccountBalances":
        {
            DisplayAccountBalanaces(params);
            break;
        }
        case "LoadAllUsersAccountBalances":
        {
            DisplayAllUsersAccountBalances(params);
            break;
        }
        case "LoadUserAccountBalanceDetails":
        {
            DisplayUserAccountBalanceDetails(params);
            break;
        }
        case "LoadAllUserAccountsCount":
        {
            DisplayAllUserAccountsCount(params);
            break;
        }
        case "LoadAllUserTransactions":
        {
            DisplayAllUserTransactions(params, $("#RecentTransDisplay"));
            break;
        }
        case "LoadTransactions":
        {
            DisplayAllUserTransactions(params, $(".ActualRecentTransDisplay"));
            break;
        }
        case "LoadTransactionsRef":
        {
            DisplayAllUserTransactions(params, $(".ActualRecentTransDisplayRef"));
            break;
        }
        case "LoadTransactionsPar":
        {
            DisplayAllUserTransactions(params, $(".ActualRecentTransDisplayPar"));
            break;
        }
        case "LoadTotalWarrants":
        {
            DisplayTotalWarrants(params);
            break;
        }
        case "LoadWMWarrantsAccount":
        {
            DisplayWMWarrantsAccount(params);
            break;
        }
        case "LoadAllWarrantsBalance":
        {
            DisplayAllWarrantsBalance(params);
            break;
        }
        case "LoadWarrantsInAccountProperties":
        {
            DisplayWarrantsInAccountProperties(params);
            break;
        }
        case "LoadWarrantsLifeCycle":
        {
            DisplayWarrantsLifeCycle(params);
            break;
        }
        case "LoadWarrantsInAccountProperty":
        {
            DisplayWarrantsInAccountProperty(params);
            break;
        }
        case "LoadMakeAdmin":
        {
            DisplayMakeAdmin(params);
            break;
        }
        case "LoadRemoveAdminOrAgencyAccount":
        {
            DisplayRemoveAdminOrAgencyAccount(params);
            break;
        }
        case "LoadAddProductCategory":
        {
            DisplayAddProductCategory(params);
            break;
        }
        case "LoadAddProductCategoryProperty":
        {
            DisplayAddProductCategoryProperty(params);
            break;
        }
        case "LoadUserListedProductAction":
        {
            DisplayUserListedProductAction(params);
            break;
        }
        case "LoadPromoResults":
        {
            DisplayPromoProducts(params);
            break;
        }
        case "LoadPickUpCenters":
        {
            DisplayPickUpCenters(params);
            break;
        }
        case "LoadAddressTypes":
        {
            DisplayAddressTypes(params);
            break;
        }
        case "LoadDeleteAddressTypes":
        {
            DisplayDeleteAddressTypes(params);
            break;
        }
        case "LoadNewDeals":
        {
            DisplayNewDeals(params);
            break;
        }
        case "LoadAddPromoProduct":
        {
            DisplayAddPromoProduct(params);
            break;
        }
        case "LoadUpdatePromoProductDetail":
        {
            DisplayUpdatePromoProductDetail(params);
            break;
        }
        case "LoadGenerateUserTransactionStatement":
        {
            DisplayGenerateUserTransactionStatement(params);
            break;
        }
        case "LoadWMSuppliers":
        {
            DisplayWMSuppliers(params);
            break;
        }
        case "LoadUserContacts":
        {
            DisplayUserContacts(params, $(".profile_userContacts"), "Contact");
            break;
        }
        case "LoadUserStaff":
        {
            DisplayUserContacts(params, $(".profile_userStaff"), "Staff");
            DisplayBusinessStaffList(params);
            break;
        }
        case "LoadQuickTransfer":
        {
            DisplayQuickTransfer(params);
            break;
        }
        case "LoadBankDetails":
        {
            DisplayBankDetails(params);
            break;
        }
        case "LoadUserHistory":
        {
            DisplayUserHistory(params, $("#userHistory"));
            break;
        }
        case "LoadUserProducts":
        {
            DisplayUserProducts(params, $("#ProductsList"));
            break;
        }
        case "LoadUserOrderedProducts":
        {
            DisplayUserOrderedProducts(params, $("#OrderedProductsList"));
            break;
        }
        case "LoadBusinesses":
        {
            DisplayBusinessList(params);
            break;
        }
        case "LoadBusinessHistory":
        {
            DisplayUserHistory(params, $("#businessHistory"));
            break;
        }
        case "LoadContactAction":
        {
            DisplayContactAction(params);
            break;
        }
        case "UploadProductImage":
        {
            $("#prodid").val(params);
            $(".listUserProductForm").addClass("hide");
            $(".listUserProductForm").hide();
            $(".listProductImageForm").removeClass("hide");
            $(".listProductImageForm").show();
            break;
        }
        case "UploadUserImage":
        {
            $(".loggedinuserid").val(params);
            $(".listUserBusinessForm").addClass("hide");
            $(".listUserBusinessForm").hide();
            $(".listBusinessImageForm").removeClass("hide");
            $(".listBusinessImageForm").show();
            break;
        }
        case "UploadUserImage2":
        {
            $(".loggedinuserid").val(params);
            $(".listUserBusinessForm2").addClass("hide");
            $(".listUserBusinessForm2").hide();
            $(".listBusinessImageForm2").removeClass("hide");
            $(".listBusinessImageForm2").show();
            break;
        }
        case "LoadTopCategories":
        {
            DisplayTopCategories(params, $("#prodTopCategories"));
            break;
        }
        case "LoadCategories":
        {
            DisplayCategories(params, $("#prodCategories"));
            break;
        }
        case "LoadSubCategory":
        {
            DisplaySubCategories(params, $("#prodSubCategories"));
            break;
        }
        case "LoadCategoryProps":
        {
            DisplayCategoryProps(params, $("#prod-props"));
            break;
        }
        case "LoadProductUnits":
        {
            DisplayProductUnits(params, $(".unitSelect"));
            break;
        }
        case "LoadProductHscodes":
        {
            DisplayProductHscodes(params, $("#searchProduct"));
            break;
        }
        case "LoadCategoryVariants":
        {
            DisplayProductCategoryVariants(params, $("#prodVariants"));
            break;
        }
        case "LoadCategoryVariantValues":
        {
            DisplayProductCategoryVariantValues(params, $(".variantValueSelect"));
            break;
        }
        case "LoadUnreadMessages":
        {
            DisplayUnreadMessages(params);
            break;
        }
        case "LoadListAndUnlistShopProduct":
        {
            DisplayListAndUnlistShopProduct(params);
            break;
        }
        case "LoadRestockShopProduct":
        {
            DisplayRestockShopProduct(params);
            break;
        }
        case "LoadEditShopProduct":
        {
            DisplayEditShopProduct(params);
            break;
        }
        case "LoadPlacedOrderDetails":
        {
            DisplayPlacedOrderDetails(params);
            break;
        }
        case "LoadOrderOption":
        {
            DisplayOrderOption(params);
            break;
        }
        case "LoadPickUpCenterOption":
        {
            DisplayPickUpCenterOption(params);
            break;
        }
        case "LoadAddAddressType":
        {
            DisplayAddAddressType(params);
            break;
        }
        case "LoadGetAllCategories":
        {
            DisplayGetAllCategories(params);
            break;
        }
        case "LoadListings":
        {
            DisplayListings(params, $("#listings"));
            break;
        }
        case "LoadUserListings":
        {
            DisplayListings(params, $("#mylistings"));
            break;
        }
        case "LoadActivateUser":
        {
            DisplayActivateUser(params);
            break;
        }
        case "ListValue":
        {
            swal({
                title: "Listing Posted",
                text: "Your listing has been posted on the market, awaiting a buyer!",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'Continue',
                onClose: function () {
                    window.location.reload();
                }
            });
            break;
        }
        case "LoadSempleContracts":
        {
            DisplaySempleContracts(params);
            break;
        }
        case "LoadAllBooks":
        {
            DisplayAllBooks(params);
            break;
        }
        case "LoadAllSections":
        {
            DisplayAllSections(params);
            break;
        }
        case "LoadUnAndPublishBook":
        {
            DisplayUnAndPublishBook(params);
            break;
        }
        case "LoadSectionCheckInAndOut":
        {
            DisplaySectionCheckInAndOut(params);
            break;
        }
        case "LoadAllKeywords":
        {
            DisplayAllKeywords(params);
            break;
        }
        case "LoadAllTags":
        {
            DisplayAllTags(params);
            break;
        }
        case "LoadAllComments":
        {
            DisplayAllComments(params);
            break;
        }
        case "LoadAllIndexes":
        {
            DisplayAllIndexes(params);
            break;
        }
        case "LoadAllBookmarks":
        {
            DisplayAllBookmarks(params);
            break;
        }
        case "LoadWMObjectTypes":
        {
            DisplayWMObjectTypes(params);
            DisplayWMObjectCategory(params);
            DisplayPermParent(params, $("#ObjTypePermParentList"));
            break;
        }
        case "LoadPermissions":
        {
            DisplayPermissions(params, $("#PermissionList"));
            break;
        }
        case "LoadPermissions2":
        {
            DisplayPermissions(params, $("#PermissionList2"));
            break;
        }
        case "LoadGeneralAlert":
        {
            DisplayGeneralAlert(params);
            break;
        }
        case "LoadPermGroupList":
        {
            DisplayPermGroupList(params, $("#permGroupList"));
            DisplayPermParent(params, $("#PermGrpPermParentList"));
            DisplayPermParent(params, $("#PermGrpPermParentList2"));
            break;
        }
        case "LoadPermGroupList2":
        {
            DisplayPermGroupList(params, $("#permGroupList2"));
            DisplayPermParent(params, $("#PermGrpPermParentList"));
            break;
        }
        case "LoadUserGroupList":
        {
            DisplayUserGroupList(params);
            DisplayPermParent(params, $("#UserGrpPermParentList"));
            DisplayPermParent(params, $(".UserGroupList"));
            break;
        }
        case "LoadAgencyTypes":
        {
            DisplayAgencyTypes(params);
            break;
        }
        case "LoadBlockAndUnblockUser":
        {
            DisplayBlockAndUnblockUser(params);
            break;
        }
        case "LoadBusinessPermissions":
        {
            DisplayBusinessPermissions(params);
            break;
        }
        case "LoadNewTranslimits":
        {
            DisplayNewTranslimits(params);
            break;
        }
        case "LoadUserPermissions":
        {
            DisplayUserPermissions(params);
            break;
        }
        case "LoadUserRequestedPemissions":
        {
            DisplayUserRequestedPemissions(params);
            break;
        }
        case "LoadAllRequestedPemissions":
        {
            DisplayAllRequestedPemissions(params);
            break;
        }
        case "LoadRequestChange":
        {
            DisplayRequestChange(params);
            break;
        }
        case "LoadUserRequestedChanges":
        {
            DisplayUserRequestedChanges(params);
            break;
        }
        case "LoadStaffPermissions":
        {
            DisplayStaffPermissions(params, $("#StaffPermissionList"));
            break;
        }
        case "LoadStaffPermissions2":
        {
            DisplayStaffPermissions(params, $("#UGrpPermissionList"));
            break;
        }
        case "LoadNewMonetisationRule":
        {
            DisplayNewMonetisationRule(params);
            break;
        }
        case "LoadSystemMonetisationRules":
        {
            DisplaySystemNewMonetisationRule(params);
            break;
        }
        case "LoadMonetisationApplications":
        {
            DisplayMonetisationApplications(params);
            break;
        }
        case "LoadShowAllServiceListings":
        {
            DisplayShowAllServiceListings(params);
            DisplayUnlistedServices(params);
            DisplayListedServices(params);
            break;
        }
        case "LoadServiceCategories":
        {
            DisplayLoadServiceCategories(params);
            break;
        }
        case "LoadCategoriesSelect":
        {
            DisplayLoadCategoriesSelect(params);
            break;
        }
        case "LoadCatNSubCatSelecet":
        {
            DisplayLoadCatNSubCatSelecet(params);
            break;
        }
        case "LoadNewServiceType":
        {
            DisplayLoadNewServiceType(params);
            break;
        }
        case "LoadApproveServiceListing":
        {
            DisplayApproveServiceListing(params);
            break;
        }
        case "LoadDeclineServiceListing":
        {
            DisplayDeclineServiceListing(params);
            break;
        }
        case "LoadDeleteServiceListing":
        {
            DisplayDeleteServiceListing(params);
            break;
        }
        case "LoadNewServiceSubCategory":
        {
            DisplayNewServiceSubCategory(params);
            break;
        }
        case "LoadNewServiceCategory":
        {
            DisplayNewServiceCategory(params);
            break;
        }
        case "LoadMonApplyPendingVerification":
        {
            DisplayMonApplyPendingVerification(params);
            break;
        }
        case "LoadComplaints":
        {
            DisplayShopComplaints(params);
            break;
        }
        case "ResolveComplaint":
        {
            ResolveComplaint(params);
            break;
        }
        case "LoadAllRequestedChanges":
        {
            DisplayRequestedChanges(params);
            break;
        }
        case "LoadVerifyMonetisationListing":
        {
            DisplayVerifyMonetisationListing(params);
            break;
        }
        case "LoadUnerifyMonetisationListing":
        {
            DisplayUnerifyMonetisationListing(params);
            break;
        }
        case "LoadMonApplicationApprove":
        {
            DisplayMonApplicationApprove(params);
            break;
        }
        case "LoadApprovedMonApplications":
        {
            DisplayApprovedMonApplications(params);
            break;
        }
        case "LoadUserQualifiedMonetisationOption":
        {
            DisplayUserQualifiedMonetisationOption(params);
            break;
        }
        case "LoadUserProductsMon":
        {
            DisplayUserProductsMon(params);
            break;
        }
        case "LoadSubmitMonApp":
        {
            DisplaySubmitMonApplication(params);
            break;
        }
        case "LoadMyMonApplications":
        {
            DisplayMyMonApplications(params);
            break;
        }
        case "LoadPaymentResponse":
        {
            DisplayPaymentResponse(params);
            break;
        }
        case "LoadNewMonetisationOptionParameters":
        {
            DisplayNewMonetisationOptionParameters(params);
            break;
        }
        case "LoadMonOptionVisibility":
        {
            DisplayMonOptionVisibility(params);
            break;
        }
        case "LoadDeleteMonetisationOption":
        {
            DisplayDeleteMonetisationOption(params);
            break;
        }
    }
}

