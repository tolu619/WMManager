<%-- 
    Document   : indexes
    Created on : 15-Jan-2019, 16:31:41
    Author     : ndfmac
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>WM-Manager - Write::Indexes</title>
        <link href="../../../global_assets/css/helpers.css" rel="stylesheet" type="text/css">
        <link rel="icon" type="image/png" href="../../../global_assets/img/wm/favicon-16x16.png"/>

        <!-- Global stylesheets -->
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
        <link href="../../../global_assets/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css"/>
        <link href="../../../global_assets/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <link href="../../../global_assets/css/bootstrap_limitless.min.css" rel="stylesheet" type="text/css">
        <link href="../../../global_assets/css/layout.min.css" rel="stylesheet" type="text/css">
        <link href="../../../global_assets/css/components.min.css" rel="stylesheet" type="text/css">
        <link href="../../../global_assets/css/colors.min.css" rel="stylesheet" type="text/css">
        <link href="../../../global_assets/js/plugins/dropify/css/dropify.min.css" rel="stylesheet" type="text/css"/>
        <!-- /global stylesheets -->

    </head>

    <body class="navbar-top">
        <!-- Main navbar -->
        <%@include file="../../../WEB-INF/jspf/general/header.jspf" %>
        <!-- /main navbar -->

        <!-- Page content -->
        <div class="page-content">
            <!-- Main sidebar -->
            <%@include file="../../../WEB-INF/jspf/general/sidebars/sidebar.jspf" %>
            <%@include file="../../../WEB-INF/jspf/general/sidebars/sidebar_general.jspf" %>
            <!-- /main sidebar -->

            <!-- Main content -->
            <jsp:include page="../../../WEB-INF/static_pages/users/write/indexes.jsp"></jsp:include>
            <!-- /main content -->
        </div>
        <!-- /page content -->


        <!-- Core JS files -->
        <script src="../../../global_assets/js/main/jquery.min.js"></script>
        <script src="../../../global_assets/js/main/bootstrap.bundle.min.js"></script>
        <script src="../../../global_assets/js/plugins/loaders/blockui.min.js"></script>
        <!-- /core JS files -->

        <!-- Theme JS files -->

        <!-- START PRELOADS -->
        <audio id="audio-alert" src="../../../global_assets/audio/alert.mp3" preload="auto"></audio>
        <audio id="audio-fail" src="../../../global_assets/audio/fail.mp3" preload="auto"></audio>
        <!-- END PRELOADS --> 

        <script src="../../../global_assets/js/plugins/forms/styling/uniform.min.js"></script>
        <script src="../../../global_assets/js/plugins/notifications/sweet_alert.min.js"></script>
        <script src="../../../global_assets/js/plugins/forms/selects/select2.min.js"></script>


        <script src="../../../global_assets/js/app.js"></script>
        <script src="../../../global_assets/js/helper.js"></script>
        <script src="../../../global_assets/js/AppScript.js"></script>

        <!-- /theme JS files -->
        <script src="../../../global_assets/js/plugins/dropify/js/dropify.min.js" type="text/javascript"></script>
        <script src="../../../global_assets/js/plugins/parsleyjs/dist/parsley.min.js" type="text/javascript"></script>
        <script src="../../../global_assets/js/custom.js"></script>

    </body>
</html>
