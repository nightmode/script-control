<js>
    const theme = args[0]
    const icon  = args[1]
    const page  = 'about'
</js><!doctype html>
<html lang="en" id="html">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="/css/shared.css?version=2025.1.2.0">
    <link rel="preload" href="/fonts/inter.woff?version=2025.1.2.0" as="font" crossorigin>
    <link rel="preload" href="/fonts/inter-medium.woff?version=2025.1.2.0" as="font" crossorigin>
    <link rel="preload" href="/fonts/inter-semibold.woff?version=2025.1.2.0" as="font" crossorigin>
    <link rel="preload" href="/fonts/inter-bold.woff?version=2025.1.2.0" as="font" crossorigin>
    <link rel="preload" href="/fonts/kufam.woff?version=2025.1.2.0" as="font" crossorigin>
    <link rel="icon" href="/images/icon/logo/logo-<js>write(icon)</js>-32.png?version=2025.1.2.0" type="image/png">
    <title>Script Control</title>
</head>
<body class="<js>write(theme)</js>">

    <div class="wrapper">
        <header>
            <js>include('/images/-logo.svg')</js>
            <h1>Script Control</h1>
        </header>

        <nav>
            <ul>
                <li>
                    <a class="page" href="/page/<js>write(theme)</js>/<js>write(icon)</js>/options.html">
                        <span>Options</span>
                    </a>
                </li>
                <li>
                    <a class="page" href="/page/<js>write(theme)</js>/<js>write(icon)</js>/preferences.html">
                        <span>Preferences</span>
                    </a>
                </li>
                <li class="active">
                    <a class="page active" tabindex="-1">
                        <span>About</span>
                    </a>
                </li>
            </ul>
        </nav>

        <div id="loading" class="loading">
            <div>
                <js>include('/images/-loading.svg')</js>
                Loading
            </div>
        </div><!-- loading -->

        <div id="content" class="content visibility-hidden">
            <js>include('/page/include/-permissions.html.jss')</js>

            <js>include('/page/include/-show-message.html.jss')</js>

            <h1>About</h1>

            <div class="box">
                <div class="box-inner">
                    <p>
                        You are running Script Control version
                        <strong id="about-version">1.0</strong>
                        <span id="about-browser"></span>
                    </p>

                    <p>
                        This software is provided under a no-contact and no-support model. Do not contact the author, for any reason, even if you think it would benefit the author.
                    </p>
                </div><!-- box-inner -->
            </div><!-- box -->

            <h2>Change Log</h2>

            <div class="box">
                <div class="box-inner">
                    <h3>January 2, 2025</h3>

                    <p>
                        Updated license to be in the public domain.
                    </p>
                </div><!-- box-inner -->
            </div><!-- box -->

            <div class="box">
                <div class="box-inner">
                    <h3>April 1, 2024</h3>

                    <p>
                        Updated to a no-contact and no-support model.
                    </p>
                </div><!-- box-inner -->
            </div><!-- box -->

            <div class="box">
                <div class="box-inner">
                    <h3>October 24, 2023</h3>

                    <ul>
                        <li>
                            Official support for Mozilla Firefox.
                        </li>
                        <li>
                            Updated country code based second level domains.
                        </li>
                        <li>
                            Fixed an issue that could open multiple option pages.
                        </li>
                        <li>
                            Fixed an issue with identifying new tabs.
                        </li>
                    </ul>
                </div><!-- box-inner -->
            </div><!-- box -->

            <div class="box">
                <div class="box-inner">
                    <h3>November 24, 2022</h3>

                    <ul>
                        <li>
                            New global warning preference. Display a visual warning when a site without specific rules is allowed globally.
                        </li>
                        <li>
                            Improved warning system.
                        </li>
                        <li>
                            Updated contact information.
                        </li>
                    </ul>
                </div><!-- box-inner -->
            </div><!-- box -->

            <div class="box">
                <div class="box-inner">
                    <h3>July 2, 2022</h3>

                    <p>
                        Script Control is now free.
                    </p>
                </div><!-- box-inner -->
            </div><!-- box -->

            <div class="box">
                <div class="box-inner">
                    <h3>January 4, 2022</h3>

                    <p>
                        Official support for Microsoft Edge.
                    </p>
                </div><!-- box-inner -->
            </div><!-- box -->

            <div class="box">
                <div class="box-inner">
                    <h3>December 3, 2021</h3>

                    <ul>
                        <li>
                            New unlock option. Keep using Script Control without support with any previous membership.
                        </li>
                        <li>
                            Fixed an issue with newer versions of Chrome and sites that should always be allowed.
                        </li>
                        <li>
                            Fixed an issue which could move or in extreme cases, hide the popup controls for long domain names.
                        </li>
                    </ul>
                </div><!-- box-inner -->
            </div><!-- box -->

            <div class="box">
                <div class="box-inner">
                    <h3>May 1, 2021</h3>

                    <p>
                        Script Control officially launches.
                    </p>
                </div><!-- box-inner -->
            </div><!-- box -->

            <h2>Troubleshooting</h2>

            <div class="box">
                <div class="box-inner">
                    <p>
                        The information below is what Script Control sees behind the scenes. It may be useful for troubleshooting and as long as this page is open, it will continually update to reflect any changes.
                    </p>

                    <hr>

                    <p>
                        <strong>Options</strong><br>
                        <span id="trouble-options" class="word-break-all">Unknown</span>
                    </p>

                    <p>
                        <strong>Script Control Version</strong><br>
                        <span id="trouble-version">1.0</span>
                    </p>

                    <p>
                        <strong>Web Browser Version</strong><br>
                        <span id="trouble-browser">Unknown</span>
                    </p>

                    <hr>

                    <div>
                        <input id="trouble-copy" type="button" value="Copy Information" class="button smaller">
                        <input id="trouble-copy-busy" type="button" value="Copied" class="button hidden smaller" disabled>
                    </div>
                </div><!-- box-inner -->
            </div><!-- box -->
        </div><!-- content -->
    </div><!-- wrapper -->

    <js>include('/page/include/-scroll-nav.html')</js>

    <script src="/js/browser-polyfill.js?version=2025.1.2.0"></script>
    <script src="/js/shared.js?version=2025.1.2.0"></script>
    <script src="/js/page/about.js?version=2025.1.2.0"></script>

</body>
</html>