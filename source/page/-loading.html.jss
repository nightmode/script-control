<js>
    const theme = args[0]
    const icon  = args[1]
</js><!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="/css/loading.css?version=2025.1.2.0">
    <!-- no font preloads needed since this page fades in all content -->
    <link rel="icon" href="/images/icon/logo/logo-<js>write(icon)</js>-32.png?version=2025.1.2.0" type="image/png">
    <title>Loading</title>
</head>
<body class="<js>write(theme)</js>">

    <div id="loading">
        <div>
            <js>include('/images/-loading.svg')</js>
            One moment.<br>
            Script Control is cleaning.
        </div>
    </div><!-- loading -->

    <script src="/js/page/loading.js?version=2025.1.2.0"></script>

</body>
</html>